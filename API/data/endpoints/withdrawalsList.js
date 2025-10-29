import withdrawalsList from '../../responses/withdrawals/withdrawals_list.json';

export const withdrawalsListSection = {
  id: 'withdrawals-list',
  title: 'Listar Saques',
  category: 'endpoints',
  description: 'Lista todos os saques realizados pelo usuário, com filtros por status e paginação.',
  endpoint: '/withdrawals',
  method: 'GET',
  examples: [
    {
      language: 'javascript',
      title: 'Node.js',
      description: 'Listagem de saques com filtros e paginação, exibe resposta JSON formatada',
      code: `
async function listWithdrawals(limit = 20, status = null) {
  try {
    const params = new URLSearchParams({
      limit: limit.toString()
    });
    
    if (status) {
      params.append('status', status);
    }

    const response = await fetch(\`https://api.solutpag.com/api/public/v1/withdrawals?\${params}\`, {
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
    // Exibe a resposta JSON formatada, linha por linha
    console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Erro ao listar saques:', error);
    throw error;
  }
}

// Exemplo de uso:
listWithdrawals(10);
      `,
      response: JSON.stringify(withdrawalsList, null, 2)
    },
    {
      language: 'python',
      title: 'Python',
      description: 'Listagem de saques com filtros e exibição do JSON formatado',
      code: `
import requests
import json

def list_withdrawals(limit=20, status=None):
    """
    Lista saques do usuário
    
    Args:
        limit (int): Número máximo de saques (máx: 100)
        status (str): Filtrar por status
    """
    try:
        params = {'limit': limit}
        if status:
            params['status'] = status
            
        response = requests.get(
            'https://api.solutpag.com/api/public/v1/withdrawals',
            headers={
                'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
                'Accept': 'application/json'
            },
            params=params
        )
        response.raise_for_status()
        data = response.json()
        # Exibe a resposta JSON formatada, linha por linha
        print(json.dumps(data, indent=2, ensure_ascii=False))
        return data
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise Exception(f"Erro na requisição: {e}")

# Exemplo de uso:
list_withdrawals(10)
      `,
      response: JSON.stringify(withdrawalsList, null, 2)
    },
    {
      language: 'java',
      title: 'Java',
      description: 'Java 11+ HttpClient listando saques com filtros e exibição JSON formatada',
      code: `
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class WithdrawalsListExample {
  public static void main(String[] args) throws Exception {
    int limit = 10;
    String status = null; // por exemplo: "processing"
    String base = "https://api.solutpag.com/api/public/v1/withdrawals?limit=" + limit;
    String url = status != null ? base + "&status=" + status : base;

    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create(url))
      .header("Authorization", "Bearer sk_live_SEU_TOKEN_AQUI")
      .header("Accept", "application/json")
      .GET()
      .build();

    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    if (response.statusCode() >= 200 && response.statusCode() < 300) {
      // Exibe o JSON formatado, linha por linha
      System.out.println(prettyPrintJSON(response.body()));
    } else {
      throw new RuntimeException("Erro HTTP: " + response.statusCode());
    }
  }

  // Utilitário para formatar JSON (Jackson necessário no classpath)
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
      response: JSON.stringify(withdrawalsList, null, 2)
    },
    {
      language: 'react',
      title: 'React (Hooks)',
      description: 'Componente que lista saques, permite filtro por status e exibe JSON formatado',
      code: `
import { useEffect, useState } from 'react';

export default function WithdrawalsViewer() {
  const [status, setStatus] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); setError(null);
      try {
        const qs = new URLSearchParams({ limit: '10' });
        if (status) qs.append('status', status);
        const res = await fetch(\`https://api.solutpag.com/api/public/v1/withdrawals?\${qs.toString()}\`, {
          headers: { 'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI', 'Accept': 'application/json' }
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        setData(await res.json());
      } catch (e) { setError(e.message); }
      finally { setLoading(false); }
    };
    fetchData();
  }, [status]);

  return (
    <div>
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="">Todos</option>
        <option value="processing">Processing</option>
        <option value="approved">Approved</option>
        <option value="failed">Failed</option>
      </select>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
      `,
      response: JSON.stringify(withdrawalsList, null, 2)
    }
  ]
};

export default withdrawalsListSection;
