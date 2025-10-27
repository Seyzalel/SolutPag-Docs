import withdrawalProcessing from '../../withdrawal_processing_202.json';

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
      description: 'Solicitação de saque com validação completa e tratamento de diferentes estados',
      code: `async function requestWithdrawal(amountCents) {
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
    return result;
  } catch (error) {
    throw error;
  }
}

// Exemplo de uso
const withdrawal = await requestWithdrawal(10000);`,
      response: JSON.stringify(withdrawalProcessing, null, 2)
    },
    {
      language: 'python',
      title: 'Python',
      code: `import requests
import uuid

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
        return data
            
    except requests.exceptions.RequestException as e:
        raise Exception(f"Erro no saque: {e}")

# Exemplo de uso
withdrawal = request_withdrawal(10000)`,
      response: JSON.stringify(withdrawalProcessing, null, 2)
    },
    {
      language: 'java',
      title: 'Java',
      description: 'Java 11+ HttpClient para solicitar saque com Idempotency-Key',
      code: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public class WithdrawalCreateExample {
  public static void main(String[] args) throws Exception {
    String json = "{" + "\\"amount_cents\\":10000" + "}";
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
      System.out.println(response.body());
    } else {
      throw new RuntimeException("Erro HTTP: " + response.statusCode());
    }
  }
}`,
      response: JSON.stringify(withdrawalProcessing, null, 2)
    },
    {
      language: 'react',
      title: 'React (Hooks)',
      description: 'Formulário mínimo para solicitar saque e exibir retorno',
      code: `import { useState } from 'react';

export default function WithdrawalForm() {
  const [amount, setAmount] = useState(10000);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault(); setLoading(true); setError(null);
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
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
      <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Solicitar saque'}</button>
      {error && <p>Erro: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </form>
  );
}`,
      response: JSON.stringify(withdrawalProcessing, null, 2)
    }
  ]
};

export default withdrawalsCreateSection;