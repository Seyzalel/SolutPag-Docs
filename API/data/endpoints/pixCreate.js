import pixCreated201 from '../../responses/pix/pix_created_201.json';

export const pixCreateSection = {
  id: 'pix-create',
  title: 'Criar Cobrança PIX',
  category: 'endpoints',
  description: 'Cria uma nova cobrança PIX instantânea com QR Code. Utilize Idempotency Key para evitar cobranças duplicadas.',
  endpoint: '/transactions/pix',
  method: 'POST',
  examples: [
    {
      language: 'javascript',
      title: 'Node.js',
      description: 'Criação completa de cobrança PIX com todos os campos, tratamento de erros e exibição da resposta JSON formatada',
      code: `
async function createPixCharge(amount, comment = '') {
  const payload = {
    amount_cents: amount, // Valor em centavos (R$ 50,00 = 5000)
    comment: comment      // Descrição opcional para identificação
  };

  const headers = {
    'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Idempotency-Key': '123e4567-e89b-12d3-a456-426614174000'
  };

  try {
    const response = await fetch(
      'https://api.solutpag.com/api/public/v1/transactions/pix',
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      }
    );
    const result = await response.json();
    // Exibe a resposta formatada, linha por linha
    console.log(JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('Erro ao criar cobrança PIX:', error);
    throw error;
  }
}

// Exemplo de uso:
createPixCharge(5000, 'Pagamento de serviço premium');
      `,
      response: JSON.stringify(pixCreated201, null, 2)
    },
    {
      language: 'python',
      title: 'Python',
      description: 'Criação de cobrança PIX com resposta formatada e tratamento de exceções',
      code: `
import requests
import uuid
import json

def create_pix_charge(amount_cents, comment=''):
    """
    Cria uma nova cobrança PIX
    
    Args:
        amount_cents (int): Valor em centavos
        comment (str): Descrição opcional
    
    Returns:
        dict: Dados da cobrança criada
    """
    payload = {
        "amount_cents": amount_cents,
        "comment": comment
    }
    
    headers = {
        'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Idempotency-Key': str(uuid.uuid4())
    }
    
    try:
        response = requests.post(
            'https://api.solutpag.com/api/public/v1/transactions/pix',
            json=payload,
            headers=headers,
            timeout=30
        )
        response.raise_for_status()
        data = response.json()
        # Exibe a resposta JSON formatada, linha por linha
        print(json.dumps(data, indent=2, ensure_ascii=False))
        return data
    except requests.exceptions.RequestException as e:
        print(f"Erro ao criar cobrança: {e}")
        raise Exception(f"Erro ao criar cobrança: {e}")

# Exemplo de uso:
create_pix_charge(5000, "Pagamento de teste")
      `,
      response: JSON.stringify(pixCreated201, null, 2)
    },
    {
      language: 'java',
      title: 'Java',
      description: 'Java 11+ HttpClient para POST com corpo JSON, tratamento de erros e resposta formatada',
      code: `
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public class PixCreateExample {
  public static void main(String[] args) throws Exception {
    String json = "{" +
      "\\\"amount_cents\\\":5000," +
      "\\\"comment\\\":\\\"Pagamento de teste\\\"" +
    "}";

    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create("https://api.solutpag.com/api/public/v1/transactions/pix"))
      .timeout(Duration.ofSeconds(30))
      .header("Authorization", "Bearer sk_live_SEU_TOKEN_AQUI")
      .header("Content-Type", "application/json")
      .header("Accept", "application/json")
      .header("Idempotency-Key", "123e4567-e89b-12d3-a456-426614174000")
      .POST(HttpRequest.BodyPublishers.ofString(json))
      .build();

    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    if (response.statusCode() >= 200 && response.statusCode() < 300) {
      // Exibe a resposta JSON formatada, linha por linha
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
      response: JSON.stringify(pixCreated201, null, 2)
    },
    {
      language: 'react',
      title: 'React (Hooks)',
      description: 'Hook simples para criar cobrança PIX e exibir o resultado formatado',
      code: `
import { useState } from 'react';

export default function PixCreateDemo() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPix = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://api.solutpag.com/api/public/v1/transactions/pix', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Idempotency-Key': '123e4567-e89b-12d3-a456-426614174000'
        },
        body: JSON.stringify({ amount_cents: 5000, comment: 'Pagamento de teste' })
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      // Exibe a resposta formatada, linha por linha
      setResult(await res.json());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={createPix} disabled={loading}>
        {loading ? 'Criando...' : 'Criar cobrança PIX'}
      </button>
      {error && <p>Erro: {error}</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
      `,
      response: JSON.stringify(pixCreated201, null, 2)
    }
  ]
};

export default pixCreateSection;
