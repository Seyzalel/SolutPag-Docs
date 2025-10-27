import React from 'react';
import { FaBullseye, FaLightbulb, FaChartBar, FaMoneyBillWave, FaCalendarAlt, FaExclamationTriangle, FaTools, FaTrophy, FaLock, FaSyncAlt, FaMobileAlt, FaBug } from 'react-icons/fa';

export const conceptsSections = [
  {
    id: 'scopes',
    title: 'Scopes e Permissões',
    category: 'concepts',
    description: 'Entenda as permissões necessárias para cada operação na API.',
    content: (
      <div className="space-y-6">
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-400 mb-3"><FaBullseye className="inline-block w-5 h-5 mr-2" /> Permissões por Funcionalidade</h3>
          <p className="text-green-300">
            Ao criar um API Token, selecione apenas os scopes necessários para sua aplicação.
          </p>
        </div>

        <div className="grid gap-4">
          {[
            {
              scope: 'wallet:read',
              description: 'Consultar saldo e informações das wallets',
              endpoints: ['GET /balance', 'GET /wallets'],
              color: 'blue'
            },
            {
              scope: 'payments:create',
              description: 'Criar novas transações PIX',
              endpoints: ['POST /transactions/pix'],
              color: 'green'
            },
            {
              scope: 'payments:read',
              description: 'Consultar status de transações',
              endpoints: ['GET /transactions/pix/{saleId}'],
              color: 'purple'
            },
            {
              scope: 'withdrawals:write',
              description: 'Criar solicitações de saque',
              endpoints: ['POST /withdrawals'],
              color: 'orange'
            },
            {
              scope: 'withdrawals:read',
              description: 'Consultar saques realizados',
              endpoints: ['GET /withdrawals', 'GET /withdrawals/{wid}'],
              color: 'red'
            }
          ].map((item, index) => (
            <div key={index} className={`bg-${item.color}-500/10 border border-${item.color}-500/20 rounded-xl p-4`}>
              <div className="flex items-center justify-between mb-2">
                <code className={`text-${item.color}-400 font-mono font-semibold`}>
                  {item.scope}
                </code>
                <span className={`text-xs bg-${item.color}-500/20 text-${item.color}-400 px-2 py-1 rounded-full`}>
                  {item.endpoints.length} endpoint(s)
                </span>
              </div>
              <p className={`text-${item.color}-300 text-sm mb-3`}>
                {item.description}
              </p>
              <div className="text-xs text-gray-400">
                <strong>Endpoints:</strong> {item.endpoints.join(', ')}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 rounded-xl p-6">
          <h4 className="font-semibold text-white mb-3"><FaLightbulb className="inline-block w-5 h-5 mr-2" /> Boas Práticas</h4>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>• Use o princípio do menor privilégio - conceda apenas as permissões necessárias</li>
            <li>• Revise periodicamente os tokens ativos e suas permissões</li>
            <li>• Crie tokens específicos para diferentes aplicações</li>
            <li>• Remova tokens não utilizados</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'data-formats',
    title: 'Formatos de Dados',
    category: 'concepts',
    description: 'Entenda os formatos de valores monetários, datas e estruturas de resposta.',
    content: (
      <div className="space-y-6">
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-purple-400 mb-3"><FaChartBar className="inline-block w-5 h-5 mr-2" /> Padrões de Dados</h3>
          <p className="text-purple-300">
            A API utiliza formatos padronizados para garantir consistência e facilidade de integração.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-xl p-6">
            <h4 className="font-semibold text-white mb-4"><FaMoneyBillWave className="inline-block w-5 h-5 mr-2" /> Valores Monetários</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                <span className="text-sm text-gray-400">Valor Real</span>
                <code className="text-green-400 font-mono">R$ 1,00</code>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                <span className="text-sm text-gray-400">Na API</span>
                <code className="text-blue-400 font-mono">100</code>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                <span className="text-sm text-gray-400">R$ 50,00</span>
                <code className="text-blue-400 font-mono">5000</code>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              <FaLightbulb className="inline-block w-4 h-4 mr-2" /> Todos os valores são representados em centavos (inteiros)
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-6">
            <h4 className="font-semibold text-white mb-4"><FaCalendarAlt className="inline-block w-5 h-5 mr-2" /> Datas e Horários</h4>
            <div className="space-y-3">
              <div className="p-3 bg-white/10 rounded-lg">
                <code className="text-blue-400 font-mono text-sm block">
                  2025-10-22T14:00:00Z
                </code>
                <p className="text-xs text-gray-400 mt-1">
                  Formato ISO 8601 UTC
                </p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg">
                <code className="text-blue-400 font-mono text-sm block">
                  2025-10-22T14:00:00-03:00
                </code>
                <p className="text-xs text-gray-400 mt-1">
                  Com timezone específico
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
          <h4 className="font-semibold text-blue-400 mb-3"><FaBullseye className="inline-block w-5 h-5 mr-2" /> Estrutura de Respostas</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-blue-300 mb-2">Sucesso</h5>
              <pre className="bg-blue-500/10 text-blue-300 p-3 rounded-lg text-xs">
                {`{
  "data": { ... },
  "status": "success"
}`}
              </pre>
            </div>
            <div>
              <h5 className="font-medium text-red-300 mb-2">Erro</h5>
              <pre className="bg-red-500/10 text-red-300 p-3 rounded-lg text-xs">
                {`{
  "error": "error_code",
  "detail": { ... }
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'error-handling',
    title: 'Tratamento de Erros',
    category: 'concepts',
    description: 'Aprenda a lidar com códigos de status HTTP e estruturas de erro da API.',
    content: (
      <div className="space-y-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-red-400 mb-3"><FaExclamationTriangle className="inline-block w-5 h-5 mr-2" /> Códigos de Status HTTP</h3>
          <p className="text-red-300">
            A API utiliza códigos HTTP padrão para indicar o resultado das operações.
          </p>
        </div>

        <div className="grid gap-4">
          {[
            { code: '200', description: 'OK - Requisição bem-sucedida', color: 'green' },
            { code: '201', description: 'Created - Recurso criado com sucesso', color: 'green' },
            { code: '202', description: 'Accepted - Requisição aceita para processamento', color: 'blue' },
            { code: '400', description: 'Bad Request - Dados inválidos na requisição', color: 'yellow' },
            { code: '401', description: 'Unauthorized - Token inválido ou ausente', color: 'red' },
            { code: '403', description: 'Forbidden - Permissões insuficientes ou KYC required', color: 'red' },
            { code: '404', description: 'Not Found - Recurso não encontrado', color: 'red' },
            { code: '409', description: 'Conflict - Recurso em conflito/duplicado', color: 'orange' },
            { code: '500', description: 'Internal Server Error - Erro interno do servidor', color: 'red' },
            { code: '502', description: 'Bad Gateway - Erro na comunicação com provedor externo', color: 'red' }
          ].map((item, index) => (
            <div key={index} className={`bg-${item.color}-500/10 border border-${item.color}-500/20 rounded-xl p-4`}>
              <div className="flex items-center space-x-4">
                <span className={`bg-${item.color}-500/20 text-${item.color}-400 px-3 py-1 rounded-full font-mono font-bold`}>
                  {item.code}
                </span>
                <span className={`text-${item.color}-300`}>
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 rounded-xl p-6">
          <h4 className="font-semibold text-white mb-3"><FaTools className="inline-block w-5 h-5 mr-2" /> Estrutura de Erro</h4>
          <div className="space-y-4">
            <div>
              <h5 className="text-sm font-medium text-gray-300 mb-2">Exemplo de Resposta de Erro:</h5>
              <pre className="bg-black/30 text-gray-100 p-4 rounded-lg text-sm">
                {`{
  "error": "invalid_amount",
  "detail": {
    "message": "O valor deve ser maior que zero",
    "code": "VALIDATION_ERROR"
  }
}`}
              </pre>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-gray-300 mb-2">Erros Comuns:</h5>
                <ul className="text-gray-400 space-y-1">
                  <li>• <code>invalid_amount</code> - Valor inválido</li>
                  <li>• <code>insufficient_funds</code> - Saldo insuficiente</li>
                  <li>• <code>invalid_cpf</code> - CPF inválido ou não cadastrado</li>
                  <li>• <code>KYC required</code> - Verificação de identidade necessária</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-300 mb-2">Boas Práticas:</h5>
                <ul className="text-gray-400 space-y-1">
                  <li>• Sempre trate possíveis erros</li>
                  <li>• Use try-catch em todas as chamadas</li>
                  <li>• Logs para debugging em produção</li>
                  <li>• Implemente retry com backoff exponencial</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'best-practices',
    title: 'Boas Práticas',
    category: 'concepts',
    description: 'Conheça as melhores práticas para integração segura e eficiente com a API.',
    content: (
      <div className="space-y-6">
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-400 mb-3"><FaTrophy className="inline-block w-5 h-5 mr-2" /> Práticas Recomendadas</h3>
          <p className="text-green-300">
            Siga estas diretrizes para garantir uma integração robusta e segura.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center mb-3">
                <FaLock className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-white mb-2">Segurança</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Nunca exponha tokens em client-side</li>
                <li>• Use HTTPS em todas as requisições</li>
                <li>• Revogue tokens comprometidos</li>
                <li>• Implemente rate limiting</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center mb-3">
                <FaSyncAlt className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-white mb-2">Idempotência</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Sempre use Idempotency-Key em POSTs</li>
                <li>• UUIDv4 para chaves únicas</li>
                <li>• Guarde as chaves para retentativas</li>
                <li>• Evite cobranças duplicadas</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center mb-3">
                <FaMobileAlt className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-white mb-2">Fluxo de Pagamento</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Só libere produto/serviço quando status = "paid"</li>
                <li>• Use polling com backoff exponencial</li>
                <li>• Guarde saleId para reconciliação</li>
                <li>• Trate expiração de QR Codes</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center mb-3">
                <FaBug className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-white mb-2">Debugging</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Logs das respostas raw dos provedores</li>
                <li>• Monitoramento de status codes</li>
                <li>• Alertas para erros 5xx</li>
                <li>• Documentação de fallbacks</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
          <h4 className="font-semibold text-blue-400 mb-3"><FaExclamationTriangle className="inline-block w-5 h-5 mr-2" /> Checklist para Produção</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <ul className="text-blue-300 space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Tokens armazenados com segurança</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>HTTPS em todas as requisições</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Idempotency-Key implementado</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Tratamento de erro completo</span>
                </li>
              </ul>
            </div>
            <div>
              <ul className="text-blue-300 space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Validação de status de pagamento</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Logs para auditoria</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Monitoramento de webhooks</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Plano de fallback</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

export default conceptsSections;