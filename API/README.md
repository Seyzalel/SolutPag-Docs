# SolutPag — Respostas das APIs Públicas (Documentação e Exemplos)

Este diretório contém exemplos de respostas em JSON para os principais endpoints públicos da API SolutPag. Use estes arquivos como referência para mocks, testes de integração e entendimento do formato de dados.

## Estrutura dos Exemplos

- `API/responses/balance/balance_response.json`: Exemplo de resposta do `GET /balance` com usuário, saldos e wallets.
- `API/responses/wallets/wallets_response.json`: Exemplo de listagem do `GET /wallets`.
- `API/responses/pix/pix_created_201.json`: Exemplo de criação de cobrança PIX (HTTP 201 Created).
- `API/responses/pix/pix_paid_200.json`: Exemplo de resposta quando uma cobrança PIX foi paga (HTTP 200 OK).
- `API/responses/pix/pix_pending_202.json`: Exemplo de criação/processamento assíncrono de PIX (HTTP 202 Accepted).
- `API/responses/pix/pix_status_pending.json`: Exemplo de status pendente em `GET /transactions/pix/{saleId}`.
- `API/responses/pix/pix_status_paid.json`: Exemplo de status pago em `GET /transactions/pix/{saleId}`.
- `API/responses/withdrawals/withdrawal_approved_200.json`: Exemplo de saque aprovado em `POST /withdrawals` (HTTP 200 OK).
- `API/responses/withdrawals/withdrawal_processing_202.json`: Exemplo de saque em processamento em `POST /withdrawals` (HTTP 202 Accepted).
- `API/responses/withdrawals/withdrawals_list.json`: Exemplo de listagem de saques em `GET /withdrawals`.
- `API/responses/withdrawals/withdrawal_details.json`: Exemplo detalhado de saque em `GET /withdrawals/{wid}`.

## Como Usar os Arquivos

- Como mock local (Node.js):
  - `const payload = require('./API/responses/pix/pix_paid_200.json');`
- Com `fetch` em dev: sirva o diretório como estáticos ou importe via bundler para testes.
- Em ferramentas de API (Insomnia/Postman): importe o arquivo JSON para visualizar e comparar respostas.

## Endpoints e Formatos de Resposta

### 1) GET /balance
- Exemplo: `API/responses/balance/balance_response.json`
- Campos principais:
  - `user`: informações básicas do usuário.
  - `balances[]`: saldos por moeda (`available_cents`, `locked_cents`).
  - `wallets[]`: wallets do usuário com seus saldos.

### 2) GET /wallets
- Exemplo: `API/responses/wallets/wallets_response.json`
- Resposta: array de wallets com `wallet_id`, `available_cents`, `locked_cents`, `created_at`.

### 3) POST /transactions/pix (Criar cobrança)
- Exemplos:
  - `API/responses/pix/pix_created_201.json` (201 Created): cobrança criada com QR EMV/Base64 e expiração.
  - `API/responses/pix/pix_pending_202.json` (202 Accepted): processamento assíncrono em andamento; usar polling.
  - `API/responses/pix/pix_paid_200.json` (200 OK): pagamento confirmado com `end_to_end_id` e `paid_at`.
- Dicas:
  - Envie `Idempotency-Key` para evitar duplicidade.
  - Faça polling usando `GET /transactions/pix/{saleId}`.

### 4) GET /transactions/pix/{saleId}
- Exemplos:
  - `API/responses/pix/pix_status_pending.json`: transação aguardando pagamento.
  - `API/responses/pix/pix_status_paid.json`: transação paga.
- Campos úteis: `status`, `paid_at`, `end_to_end_id`, `last_sync_at`.

### 5) POST /withdrawals
- Exemplos:
  - `API/responses/withdrawals/withdrawal_processing_202.json` (202): solicitação recebida e em processamento.
  - `API/responses/withdrawals/withdrawal_approved_200.json` (200): saque já aprovado/efetivado.
- Campos: `wid`, `status`, `amount_cents`, `fee_cents`, `method`, `destination`.

### 6) GET /withdrawals
- Exemplo: `API/responses/withdrawals/withdrawals_list.json` — retorna array de saques com campos essenciais e `status` variando entre `processing`, `approved`, etc.

### 7) GET /withdrawals/{wid}
- Exemplo: `API/responses/withdrawals/withdrawal_details.json` — inclui dados detalhados do destino PIX e da transação bancária (`end_to_end_id`).

## Códigos de Status Possíveis

- 200 OK — Operação concluída com sucesso (ex.: PIX pago, saque aprovado).
- 201 Created — Recurso criado (ex.: cobrança PIX criada).
- 202 Accepted — Requisição aceita para processamento assíncrono (ex.: criação de PIX pendente, saque em processamento).
- 400/422 — Erros de validação de payload/negócio.
- 401/403 — Autenticação/Autorização ausente ou inválida.
- 404 — Recurso não encontrado (ex.: `wid` inexistente).
- 429 — Rate limit atingido.
- 5xx — Erros internos e indisponibilidade temporária.

## Exemplos de Uso (cURL)

- Balance:
```
curl -s -H "Authorization: Bearer sk_live_SEU_TOKEN_AQUI" \
  https://api.solutpag.com/api/public/v1/balance
```

- Criar PIX:
```
curl -s -X POST -H "Authorization: Bearer sk_live_SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: 123e4567-e89b-12d3-a456-426614174000" \
  -d '{"amount_cents":5000, "comment":"Pagamento de serviço"}' \
  https://api.solutpag.com/api/public/v1/transactions/pix
```

- Status PIX:
```
curl -s -H "Authorization: Bearer sk_live_SEU_TOKEN_AQUI" \
  https://api.solutpag.com/api/public/v1/transactions/pix/sal_20250101_ABC123?sync=true
```

- Criar Saque:
```
curl -s -X POST -H "Authorization: Bearer sk_live_SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: 123e4567-e89b-12d3-a456-426614174000" \
  -d '{"amount_cents":10000}' \
  https://api.solutpag.com/api/public/v1/withdrawals
```

- Listar Saques:
```
curl -s -H "Authorization: Bearer sk_live_SEU_TOKEN_AQUI" \
  'https://api.solutpag.com/api/public/v1/withdrawals?limit=20'
```

## Observações

- Campos como `end_to_end_id`, `transaction_id` e timestamps são exemplos realistas e podem variar por provedor.
- Valores com `*_cents` estão sempre em centavos (inteiros).
- Identificadores pessoais/bancários estão mascarados nos exemplos.