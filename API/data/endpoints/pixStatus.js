import pixStatusPending from '../../responses/pix/pix_status_pending.json';

export const pixStatusSection = {
  id: 'pix-status',
  title: 'Consultar Status PIX',
  category: 'endpoints',
  description: 'Consulta o status e detalhes de uma transação PIX específica. Use sync=true para sincronização em tempo real.',
  endpoint: '/transactions/pix/{saleId}',
  method: 'GET',
  examples: [
    {
      language: 'javascript',
      title: 'Node.js',
      description: 'Consulta com sincronização em tempo real e tratamento de estados',
      code: `async function checkPixStatus(saleId, sync = false) {
  try {
    const url = \`https://api.solutpag.com/api/public/v1/transactions/pix/\${saleId}\${sync ? '?sync=true' : ''}\`;
    
    const response = await fetch(url, {
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

// Exemplo: consultar status com sincronização
const transaction = await checkPixStatus('650f3b9a5a2c3d4e5f678901', true);`,
      response: JSON.stringify(pixStatusPending, null, 2)
    },
    {
      language: 'python',
      title: 'Python',
      code: `import requests

def check_pix_status(sale_id, sync=False):
    """
    Consulta status de uma transação PIX
    
    Args:
        sale_id (str): ID da transação
        sync (bool): Se True, sincroniza com provedor em tempo real
    """
    try:
        params = {'sync': 'true'} if sync else {}
        
        response = requests.get(
            f'https://api.solutpag.com/api/public/v1/transactions/pix/{sale_id}',
            headers={
                'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
                'Accept': 'application/json'
            },
            params=params
        )
        response.raise_for_status()
        
        data = response.json()
        return data
        
    except requests.exceptions.RequestException as e:
        raise Exception(f"Erro ao consultar status: {e}")

# Exemplo de uso
transaction = check_pix_status("650f3b9a5a2c3d4e5f678901", sync=True)`,
      response: JSON.stringify(pixStatusPending, null, 2)
    },
    {
      language: 'java',
      title: 'Java',
      description: 'Java 11+ HttpClient com sync opcional via query string',
      code: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class PixStatusExample {
  public static void main(String[] args) throws Exception {
    String saleId = "650f3b9a5a2c3d4e5f678901";
    boolean sync = true;
    String url = "https://api.solutpag.com/api/public/v1/transactions/pix/" + saleId + (sync ? "?sync=true" : "");

    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create(url))
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
      response: JSON.stringify(pixStatusPending, null, 2)
    },
    {
      language: 'react',
      title: 'React (Hooks)',
      description: 'Consulta estado do PIX sob demanda com sincronização em tempo real',
      code: `import { useState } from 'react';

export default function PixStatusChecker() {
  const [saleId, setSaleId] = useState('650f3b9a5a2c3d4e5f678901');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(
        \`https://api.solutpag.com/api/public/v1/transactions/pix/\${saleId}?sync=true\`,
        { headers: { 'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI', 'Accept': 'application/json' } }
      );
      if (!res.ok) throw new Error('HTTP ' + res.status);
      setData(await res.json());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input value={saleId} onChange={e => setSaleId(e.target.value)} placeholder="saleId" />
      <button onClick={check} disabled={loading}>{loading ? 'Consultando...' : 'Consultar status'}</button>
      {error && <p>Erro: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}`,
      response: JSON.stringify(pixStatusPending, null, 2)
    }
  ]
};

export default pixStatusSection;