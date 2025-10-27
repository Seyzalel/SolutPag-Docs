import balanceResponse from '../../balance_response.json';

export const balanceSection = {
  id: 'balance',
  title: 'Consultar Saldo',
  category: 'endpoints',
  description: 'Retorna os saldos disponíveis do usuário em tempo real, incluindo valores bloqueados e totais por moeda.',
  endpoint: '/balance',
  method: 'GET',
  examples: [
    {
      language: 'javascript',
      title: 'Node.js',
      description: 'Exemplo completo com tratamento de erros',
      code: `async function getBalance() {
  try {
    const response = await fetch('https://api.solutpag.com/api/public/v1/balance?detail=true', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

const balance = await getBalance();`,
      response: JSON.stringify(balanceResponse, null, 2)
    },
    {
      language: 'python',
      title: 'Python',
      code: `import requests

def get_balance():
    try:
        response = requests.get(
            'https://api.solutpag.com/api/public/v1/balance',
            headers={
                'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
                'Accept': 'application/json'
            },
            params={'detail': 'true'}
        )
        response.raise_for_status()
        
        data = response.json()
        return data
        
    except requests.exceptions.RequestException as e:
        raise Exception(f"Erro na requisição: {e}")

balance = get_balance()`,
      response: JSON.stringify(balanceResponse, null, 2)
    },
    {
      language: 'java',
      title: 'Java',
      description: 'Java 11+ HttpClient com headers e tratamento básico de erros',
      code: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class BalanceExample {
  public static void main(String[] args) throws Exception {
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create("https://api.solutpag.com/api/public/v1/balance?detail=true"))
      .header("Authorization", "Bearer sk_live_SEU_TOKEN_AQUI")
      .header("Accept", "application/json")
      .GET()
      .build();

    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    if (response.statusCode() >= 200 && response.statusCode() < 300) {
      String json = response.body();
      System.out.println(json);
      // Sugestão: use Jackson para parsear o JSON
    } else {
      throw new RuntimeException("Erro HTTP: " + response.statusCode());
    }
  }
}`,
      response: JSON.stringify(balanceResponse, null, 2)
    },
    {
      language: 'react',
      title: 'React (Hooks)',
      description: 'Componente funcional que busca o saldo ao montar',
      code: `import { useEffect, useState } from 'react';

export default function BalanceViewer() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch('https://api.solutpag.com/api/public/v1/balance?detail=true', {
          headers: {
            'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
            'Accept': 'application/json'
          }
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}`,
      response: JSON.stringify(balanceResponse, null, 2)
    }
  ]
};

export default balanceSection;