import walletsResponse from '../../wallets_response.json';

export const walletsSection = {
  id: 'wallets',
  title: 'Listar Wallets',
  category: 'endpoints',
  description: 'Lista todas as wallets que pertencem ao usuário, com informações detalhadas de saldo e criação.',
  endpoint: '/wallets',
  method: 'GET',
  examples: [
    {
      language: 'javascript',
      title: 'Node.js',
      description: 'Listagem de wallets com paginação',
      code: `async function listWallets(limit = 20) {
  try {
    const response = await fetch(\`https://api.solutpag.com/api/public/v1/wallets?limit=\${limit}\`, {
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

// Listar as primeiras 50 wallets
const wallets = await listWallets(50);`,
      response: JSON.stringify(walletsResponse, null, 2)
    },
    {
      language: 'python',
      title: 'Python',
      code: `import requests

def list_wallets(limit=20):
    """
    Lista as wallets do usuário
    
    Args:
        limit (int): Número máximo de wallets a retornar (máx: 200)
    """
    try:
        response = requests.get(
            'https://api.solutpag.com/api/public/v1/wallets',
            headers={
                'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
                'Accept': 'application/json'
            },
            params={'limit': limit}
        )
        response.raise_for_status()
        
        data = response.json()
        return data
        
    except requests.exceptions.RequestException as e:
        raise Exception(f"Erro ao listar wallets: {e}")

# Exemplo de uso
wallets = list_wallets(30)`,
      response: JSON.stringify(walletsResponse, null, 2)
    },
    {
      language: 'java',
      title: 'Java',
      description: 'Java 11+ HttpClient com query param de paginação',
      code: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class WalletsExample {
  public static void main(String[] args) throws Exception {
    int limit = 50;
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create("https://api.solutpag.com/api/public/v1/wallets?limit=" + limit))
      .header("Authorization", "Bearer sk_live_SEU_TOKEN_AQUI")
      .header("Accept", "application/json")
      .GET()
      .build();

    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    if (response.statusCode() >= 200 && response.statusCode() < 300) {
      System.out.println(response.body());
    } else {
      throw new RuntimeException("Erro HTTP: " + response.statusCode());
    }
  }
}`,
      response: JSON.stringify(walletsResponse, null, 2)
    },
    {
      language: 'react',
      title: 'React (Hooks)',
      description: 'Listagem de wallets com estado de carregamento e erro',
      code: `import { useEffect, useState } from 'react';

export default function WalletsList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch('https://api.solutpag.com/api/public/v1/wallets?limit=30', {
          headers: {
            'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
            'Accept': 'application/json'
          }
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        setData(await res.json());
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
      response: JSON.stringify(walletsResponse, null, 2)
    }
  ]
};

export default walletsSection;