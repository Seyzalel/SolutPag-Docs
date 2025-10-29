import withdrawalDetails from '../../responses/withdrawals/withdrawal_details.json';

export const withdrawalsDetailSection = {
  id: 'withdrawals-detail',
  title: 'Detalhes do Saque',
  category: 'endpoints',
  description: 'Obtém informações detalhadas de um saque específico, incluindo destino e transação associada.',
  endpoint: '/withdrawals/{wid}',
  method: 'GET',
  examples: [
    {
      language: 'javascript',
      title: 'Node.js',
      description: 'Consulta detalhada de um saque específico',
      code: `async function getWithdrawalDetails(wid) {
  try {
    const response = await fetch(\`https://api.solutpag.com/api/public/v1/withdrawals/\${wid}\`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Saque não encontrado');
      }
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// Exemplo: consultar detalhes de um saque
const withdrawal = await getWithdrawalDetails('WID-20251022-1A2B3C');`,
      response: JSON.stringify(withdrawalDetails, null, 2)
    },
    {
      language: 'python',
      title: 'Python',
      code: `import requests

def get_withdrawal_details(wid):
    """
    Obtém detalhes de um saque específico
    
    Args:
        wid (str): ID do saque
    
    Returns:
        dict: Detalhes do saque
    """
    try:
        response = requests.get(
            f'https://api.solutpag.com/api/public/v1/withdrawals/{wid}',
            headers={
                'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
                'Accept': 'application/json'
            }
        )
        
        if response.status_code == 404:
            raise Exception(f"Saque {wid} não encontrado")
            
        response.raise_for_status()
        
        data = response.json()
        return data
        
    except requests.exceptions.RequestException as e:
        raise Exception(f"Erro ao consultar saque: {e}")

# Exemplo de uso
withdrawal = get_withdrawal_details("WID-20251022-1A2B3C")`,
      response: JSON.stringify(withdrawalDetails, null, 2)
    },
    {
      language: 'java',
      title: 'Java',
      description: 'Java 11+ HttpClient consultando detalhes de um saque',
      code: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class WithdrawalDetailExample {
  public static void main(String[] args) throws Exception {
    String wid = "WID-20251022-1A2B3C";
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create("https://api.solutpag.com/api/public/v1/withdrawals/" + wid))
      .header("Authorization", "Bearer sk_live_SEU_TOKEN_AQUI")
      .header("Accept", "application/json")
      .GET()
      .build();

    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    if (response.statusCode() == 404) {
      throw new RuntimeException("Saque não encontrado");
    }
    if (response.statusCode() >= 200 && response.statusCode() < 300) {
      System.out.println(response.body());
    } else {
      throw new RuntimeException("Erro HTTP: " + response.statusCode());
    }
  }
}`,
      response: JSON.stringify(withdrawalDetails, null, 2)
    },
    {
      language: 'react',
      title: 'React (Hooks)',
      description: 'Busca detalhes do saque e mostra fallback de erro 404',
      code: `import { useEffect, useState } from 'react';

export default function WithdrawalDetailsViewer({ wid = 'WID-20251022-1A2B3C' }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch('https://api.solutpag.com/api/public/v1/withdrawals/' + wid, {
          headers: { 'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI', 'Accept': 'application/json' }
        });
        if (res.status === 404) throw new Error('Saque não encontrado');
        if (!res.ok) throw new Error('HTTP ' + res.status);
        setData(await res.json());
      } catch (e) { setError(e.message); }
      finally { setLoading(false); }
    };
    run();
  }, [wid]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}`,
      response: JSON.stringify(withdrawalDetails, null, 2)
    }
  ]
};

export default withdrawalsDetailSection;