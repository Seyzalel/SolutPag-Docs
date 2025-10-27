import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { FiCopy, FiCheck, FiMaximize, FiX } from "react-icons/fi";

export default function CodeExample({
  code = "",
  language = "javascript",
  title = "Exemplo",
  filename,
  theme = "nightOwl",
  description,
  response,
  responses,
}) {
  const [copied, setCopied] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [activeResp, setActiveResp] = useState(0);
  const [respCopied, setRespCopied] = useState(false);
  const preRef = useRef(null);

  const prismLang = useMemo(() => {
    const l = String(language || "").toLowerCase();
    if (l.includes("tsx") || l.includes("typescript")) return "tsx";
    if (l.includes("jsx") || l.includes("react")) return "jsx";
    if (l === "py" || l.includes("python")) return "python";
    if (l.includes("json")) return "json";
    return "javascript";
  }, [language]);

  const activeTheme = useMemo(() => {
    if (theme === "nightOwl") return themes.nightOwl;
    if (theme === "github") return themes.github;
    if (theme === "dracula") return themes.dracula;
    return themes.nightOwl;
  }, [theme]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1200);
    return () => clearTimeout(t);
  }, [copied]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setFullscreen(false);
    };
    if (fullscreen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [fullscreen]);

  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      // fallback
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
    }
  };

  const activeResponseText = useMemo(() => {
    if (Array.isArray(responses) && responses.length) {
      return String(responses[activeResp]?.code || "").trim();
    }
    return String(response || "").trim();
  }, [responses, response, activeResp]);

  const doCopyResponse = async () => {
    const text = activeResponseText;
    try {
      await navigator.clipboard.writeText(text);
      setRespCopied(true);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setRespCopied(true);
    }
  };

  useEffect(() => {
    if (!respCopied) return;
    const t = setTimeout(() => setRespCopied(false), 1200);
    return () => clearTimeout(t);
  }, [respCopied]);

  const langBadge = useMemo(() => {
    const l = String(language || "").toLowerCase();
    if (l.includes("typescript") || l.includes("tsx")) return "TypeScript";
    if (l.includes("react") || l.includes("jsx")) return "React";
    if (l.includes("python") || l === "py") return "Python";
    if (l.includes("java")) return "Java";
    if (l.includes("json")) return "JSON";
    return "JavaScript";
  }, [language]);

  const Shell = ({ children, fullscreenMode = false }) => (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] ${fullscreenMode ? 'h-[90vh] flex flex-col' : ''}`}
    >
      {/* header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-3 text-xs text-white/80">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-green-500/80" />
          <span className="ml-1 font-medium">{title}</span>
          {filename && (
            <span className="ml-1 rounded bg-white/10 px-2 py-0.5 text-[11px] text-white/70">
              {filename}
            </span>
          )}
          <span className="ml-2 rounded-full bg-blue-500/15 px-2 py-0.5 text-[11px] text-blue-300 border border-blue-500/20">
            {langBadge}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={doCopy}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-white/80 hover:bg-white/10"
            aria-label="Copiar código"
            title="Copiar código"
          >
            {copied ? <FiCheck className="w-4 h-4 text-emerald-400" /> : <FiCopy className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setFullscreen(true)}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-white/80 hover:bg-white/10"
            aria-label="Tela cheia"
            title="Tela cheia"
          >
            <FiMaximize className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* code */}
      <div className={`relative ${fullscreenMode ? 'flex-1 min-h-0' : ''}`}>
        {children}
      </div>
    </div>
  );

  const renderCodeBlock = useCallback((fullscreenMode = false) => (
    <Highlight theme={activeTheme} code={code.trim()} language={prismLang}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          ref={preRef}
          className={`${className} m-0 ${fullscreenMode ? 'h-[calc(90vh-44px)]' : 'max-h-[520px]'} overflow-auto p-4 text-[13px] leading-relaxed`}
          style={style}
        >
          {tokens.map((line, i) => {
            const isLastEmpty = i === tokens.length - 1 && line.length === 1 && line[0].content === "";
            if (isLastEmpty) return null;
            const lineNumber = String(i + 1).padStart(2, " ");
            return (
              <div key={i} {...getLineProps({ line })} className="group/code flex">
                <span className="select-none pr-4 text-right text-white/30 w-8">{lineNumber}</span>
                <span className="flex-1">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  ), [activeTheme, code, prismLang]);

  useEffect(() => {
    // Bloqueia rolagem do body em tela cheia
    if (fullscreen) {
      const prevOverflow = document.body.style.overflow;
      document.body.dataset.prevOverflow = prevOverflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = document.body.dataset.prevOverflow || "";
        delete document.body.dataset.prevOverflow;
      };
    }
  }, [fullscreen]);

  return (
    <>
      {/* Descrição opcional */}
      {description && (
        <div className="mb-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
          {description}
        </div>
      )}

      {!fullscreen && (
        <Shell>{renderCodeBlock(false)}</Shell>
      )}

      {/* Respostas (exemplo) */}
      {(Array.isArray(responses) && responses.length > 0) || response ? (
        <div className="mt-4 relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220]">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2 text-xs text-white/80">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-green-500/80" />
              <span className="ml-1 font-medium">Resposta (exemplo)</span>
              {Array.isArray(responses) && responses.length > 1 && (
                <div role="tablist" aria-label="Variações de resposta" className="ml-3 flex gap-1.5">
                  {responses.map((r, idx) => (
                    <button
                      key={idx}
                      role="tab"
                      aria-selected={activeResp === idx}
                      onClick={() => setActiveResp(idx)}
                      className={`rounded-md px-2 py-1 text-[11px] font-medium transition-colors border ${
                        activeResp === idx
                          ? 'bg-white/10 text-white border-white/20'
                          : 'text-white/70 hover:bg-white/10 border-white/10'
                      }`}
                      title={r?.label || `Resposta ${idx+1}`}
                    >
                      {r?.label || `Resp. ${idx+1}`}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={doCopyResponse}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-white/80 hover:bg-white/10"
                aria-label="Copiar resposta"
                title="Copiar resposta"
              >
                {respCopied ? <FiCheck className="w-4 h-4 text-emerald-400" /> : <FiCopy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <Highlight theme={activeTheme} code={activeResponseText} language={"json"}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={`${className} m-0 max-h-[520px] overflow-auto p-4 text-[13px] leading-relaxed`}
                style={style}
              >
                {tokens.map((line, i) => {
                  const isLastEmpty = i === tokens.length - 1 && line.length === 1 && line[0].content === "";
                  if (isLastEmpty) return null;
                  return (
                    <div key={i} {...getLineProps({ line })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  );
                })}
              </pre>
            )}
          </Highlight>
        </div>
      ) : null}

      {fullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setFullscreen(false)}
        >
          <div className="w-[min(96vw,1600px)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end pb-2">
              <button
                onClick={() => setFullscreen(false)}
                className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-white/90 hover:bg-white/10"
                title="Fechar"
              >
                <FiX className="w-4 h-4" /> Fechar
              </button>
            </div>
            <Shell fullscreenMode>{renderCodeBlock(true)}</Shell>
          </div>
        </div>
      )}
    </>
  );
}