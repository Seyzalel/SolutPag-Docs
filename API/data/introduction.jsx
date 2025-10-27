import React from 'react';
import { FaRocket, FaCreditCard, FaMoneyBillWave, FaSyncAlt, FaLock, FaClipboardList, FaExclamationTriangle, FaKey } from 'react-icons/fa';

export const introductionSections = [
  {
    id: 'overview',
    title: 'Visão Geral',
    category: 'introduction',
    description: 'Entenda os conceitos fundamentais e como a API SolutPag funciona.',
    content: (
      <div className="space-y-6">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-3"><FaRocket className="inline-block w-5 h-5 mr-2" /> Comece Aqui</h3>
          <p className="text-blue-300">
            A API SolutPag permite integração completa com nossa plataforma de pagamentos.
            Desenvolvida para ser simples, segura e eficiente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-xl p-6">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
              <FaCreditCard className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-white mb-2">Pagamentos PIX</h4>
            <p className="text-gray-400 text-sm">
              Crie cobranças PIX instantâneas com QR Code e receba pagamentos em tempo real.
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-6">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <FaMoneyBillWave className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-white mb-2">Gestão de Saldo</h4>
            <p className="text-gray-400 text-sm">
              Consulte saldos disponíveis, valores bloqueados e gerencie suas finanças.
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-6">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
              <FaSyncAlt className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-white mb-2">Saque Automático</h4>
            <p className="text-gray-400 text-sm">
              Solicite saques automáticos para o CPF cadastrado via transferência PIX.
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-6">
            <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
              <FaLock className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-white mb-2">Segurança</h4>
            <p className="text-gray-400 text-sm">
              Autenticação robusta com API Tokens e criptografia de ponta a ponta.
            </p>
          </div>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
          <h4 className="font-semibold text-purple-400 mb-3"><FaClipboardList className="inline-block w-5 h-5 mr-2" /> Fluxo Básico</h4>
          <ol className="list-decimal list-inside space-y-2 text-purple-300">
            <li>Obtenha seu API Token no painel administrativo</li>
            <li>Configure os headers de autenticação</li>
            <li>Crie cobranças PIX para receber pagamentos</li>
            <li>Consulte status das transações</li>
            <li>Realize saques quando necessário</li>
          </ol>
        </div>
      </div>
    )
  },
  {
    id: 'authentication',
    title: 'Autenticação',
    category: 'introduction',
    description: 'Aprenda a configurar a autenticação com API Tokens e headers necessários.',
    content: (
      <div className="space-y-6">
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-400 mb-3"><FaExclamationTriangle className="inline-block w-5 h-5 mr-2" /> Importante</h3>
          <p className="text-yellow-300">
            Todos os endpoints requerem autenticação via API Token. Mantenha seu token seguro e nunca o exponha em clientes públicos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-xl p-6">
            <h4 className="font-semibold text-white mb-3"><FaKey className="inline-block w-5 h-5 mr-2" /> API Token</h4>
            <p className="text-gray-400 text-sm mb-4">
              Crie e gerencie seus tokens no painel administrativo → API Tokens.
            </p>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• Selecione os scopes necessários</li>
              <li>• Mantenha o token no servidor</li>
              <li>• Use HTTPS sempre</li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-xl p-6">
            <h4 className="font-semibold text-white mb-3"><FaClipboardList className="inline-block w-5 h-5 mr-2" /> Headers Obrigatórios</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-white/10">
                <code className="text-blue-400">Authorization</code>
                <span className="text-gray-400">Bearer TOKEN</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <code className="text-blue-400">Content-Type</code>
                <span className="text-gray-400">application/json</span>
              </div>
              <div className="flex justify-between py-2">
                <code className="text-blue-400">Accept</code>
                <span className="text-gray-400">application/json</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
          <h4 className="font-semibold text-blue-400 mb-3"><FaLock className="inline-block w-5 h-5 mr-2" /> Idempotency Key</h4>
          <p className="text-blue-300 text-sm mb-3">
            Para operações que criam recursos (POST), use sempre Idempotency-Key para evitar duplicações:
          </p>
          <code className="block bg-blue-500/10 text-blue-300 px-3 py-2 rounded-lg text-sm">
            Idempotency-Key: 123e4567-e89b-12d3-a456-426614174000
          </code>
        </div>
      </div>
    ),
    examples: [
      {
        language: 'javascript',
        title: 'Node.js',
        code: `// Configuração básica de autenticação
const headers = {
  'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Idempotency-Key': '123e4567-e89b-12d3-a456-426614174000'
};

// Exemplo de uso com fetch
const response = await fetch('https://api.solutpag.com/api/public/v1/balance', {
  method: 'GET',
  headers: headers
});`
      },
      {
        language: 'python',
        title: 'Python',
        code: `import requests
import uuid

# Configuração dos headers
headers = {
    'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Idempotency-Key': str(uuid.uuid4())
}

# Exemplo de requisição
response = requests.get(
    'https://api.solutpag.com/api/public/v1/balance',
    headers=headers
)`
      }
    ]
  }
];

export default introductionSections;