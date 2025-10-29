import withdrawalProcessing from '../../responses/withdrawals/withdrawal_processing_202.json';

export const withdrawalsCreateSection = {
  id: 'withdrawals-create',
  title: 'Criar Saque',
  category: 'endpoints',
  description: 'Solicita um saque para o CPF cadastrado do usuário. O valor será transferido via PIX automaticamente.',
  endpoint: '/withdrawals',
  method: 'POST',
  examples: [
    {
      language: 'javascript',
      title: 'Node.js',
      description: 'Solicitação de saque com validação, tratamento de erros e exibição da resposta JSON formatada',
      code: `
async function requestWithdrawal(amountCents) {
  const payload = {
    amount_cents: amountCents
  };

  const headers = {
    'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Idempotency-Key': '123e4567-e89b-12d3-a456-426614174000'
  };

  try {
    const response = await fetch(
      'https://api.solutpag.com/api/public/v1/withdrawals',
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      }
    );
    const result = await response.json();
    // Exibe a resposta JSON formatada, linha por linha
    console.log(JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('Erro ao solicitar saque:', error);
    throw error;
  }
}

// Exemplo de uso:
requestWithdrawal(10000);
      `,
      response: JSON.stringify(withdrawalProcessing, null, 2)
    },
    {
      language: 'python',
      title: 'Python',
      description: 'Solicita saque e exibe a resposta JSON formatada',
      code: `
import requests
import uuid
import json

def request_withdrawal(amount_cents):
    """
    Solicita um saque para o CPF cadastrado
    
    Args:
        amount_cents (int): Valor em centavos para saque
    
    Returns:
        dict: Dados do saque solicitado
    """
    payload = {
        "amount_cents": amount_cents
    }
    
    headers = {
        'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Idempotency-Key': str(uuid.uuid4())
    }
    
    try:
        response = requests.post(
            'https://api.solutpag.com/api/public/v1/withdrawals',
            json=payload,
            headers=headers,
            timeout=60
        )
        response.raise_for_status()
        data = response.json()
        # Exibe a resposta JSON formatada, linha por linha
        print(json.dumps(data, indent=2, ensure_ascii=False))
        return data
    except requests.exceptions.RequestException as e:
        print(f"Erro no saque: {e}")
        raise Exception(f"Erro no saque: {e}")

# Exemplo de uso:
request_withdrawal(10000)
      `,
      response: JSON.stringify(withdrawalProcessing, null, 2)
    },
    {
      language: 'java',
      title: 'Java',
      description: 'Java 11+ HttpClient para solicitar saque, tratamento de erro e resposta formatada',
      code: `
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public class WithdrawalCreateExample {
  public static void main(String[] args) throws Exception {
    String json = "{" + "\\\"amount_cents\\\":10000" + "}";
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create("https://api.solutpag.com/api/public/v1/withdrawals"))
      .timeout(Duration.ofSeconds(60))
      .header("Authorization", "Bearer sk_live_SEU_TOKEN_AQUI")
      .header("Content-Type", "application/json")
      .header("Accept", "application/json")
      .header("Idempotency-Key", "123e4567-e89b-12d3-a456-426614174000")
      .POST(HttpRequest.BodyPublishers.ofString(json))
      .build();

    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    if (response.statusCode() >= 200 && response.statusCode() < 300) {
      // Exibe o JSON formatado, linha por linha
      System.out.println(prettyPrintJSON(response.body()));
    } else {
      throw new RuntimeException("Erro HTTP: " + response.statusCode());
    }
  }

  // Utilitário simples para formatar JSON (Jackson necessário no classpath)
  public static String prettyPrintJSON(String json) {
    try {
      com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
      Object obj = mapper.readValue(json, Object.class);
      return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(obj);
    } catch (Exception e) {
      return json;
    }
  }
}
      `,
      response: JSON.stringify(withdrawalProcessing, null, 2)
    },
    {
      language: 'react',
      title: 'React (Hooks)',
      description: 'Formulário mínimo para solicitar saque e exibir resposta JSON formatada',
      code: `
import { useState } from 'react';

export default function WithdrawalForm() {
  const [amount, setAmount] = useState(10000);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://api.solutpag.com/api/public/v1/withdrawals', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Idempotency-Key': '123e4567-e89b-12d3-a456-426614174000'
        },
        body: JSON.stringify({ amount_cents: Number(amount) })
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      setData(await res.json());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Solicitar saque'}
      </button>
      {error && <p>Erro: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </form>
  );
}
      `,
      response: JSON.stringify(withdrawalProcessing, null, 2)
    }
  ]
};

export default withdrawalsCreateSection;
