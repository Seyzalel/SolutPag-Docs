import balanceResponse from '../../responses/balance/balance_response.json';

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
      description: 'Exemplo completo com tratamento de erros e exibição da resposta JSON formatada',
      code: `
async function getBalance() {
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
    // Exibe a resposta JSON formatada, linha por linha
    console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Erro ao consultar saldo:', error);
    throw error;
  }
}

// Chamada da função de exemplo
getBalance();
      `,
      response: JSON.stringify(balanceResponse, null, 2)
    },
    {
      language: 'python',
      title: 'Python',
      description: 'Exemplo completo com tratamento de erros e exibição da resposta JSON formatada',
      code: `
import requests
import json

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
        # Exibe a resposta JSON formatada, linha por linha
        print(json.dumps(data, indent=2, ensure_ascii=False))
        return data
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise Exception(f"Erro na requisição: {e}")

# Chamada da função de exemplo
get_balance()
      `,
      response: JSON.stringify(balanceResponse, null, 2)
    },
    {
      language: 'java',
      title: 'Java',
      description: 'Java 11+ HttpClient com headers, tratamento de erros e exibição da resposta JSON formatada',
      code: `
import java.net.URI;
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
            // Exibe a resposta JSON formatada, linha por linha
            System.out.println(prettyPrintJSON(json));
        } else {
            throw new RuntimeException("Erro HTTP: " + response.statusCode());
        }
    }

    // Função utilitária para formatar o JSON (sem dependências externas)
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
      response: JSON.stringify(balanceResponse, null, 2)
    },
    {
      language: 'react',
      title: 'React (Hooks)',
      description: 'Componente funcional que busca o saldo ao montar e exibe o JSON formatado',
      code: `
import { useEffect, useState } from 'react';

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
  return (
    <pre>
      {data ? JSON.stringify(data, null, 2) : 'Nenhum dado.'}
    </pre>
  );
}
      `,
      response: JSON.stringify(balanceResponse, null, 2)
    }
  ]
};

export default balanceSection;
