// Banco de palavras com sinônimos (unificado, sem duplicatas)
const banco = {
  "lua": ["satélite", "astro", "luz noturna"],
  "vento": ["brisa", "ar", "sopro"],
  "mar": ["oceano", "ondas", "abismo"],
  "silêncio": ["calma", "quietude", "pausa"],
  "aurora": ["alvorada", "amanhecer", "luz"],
  "memória": ["lembrança", "recordação", "história"],
  "chama": ["fogo", "labareda", "ardor"],
  "sonho": ["fantasia", "quimera", "ilusão"],
  "tempo": ["instante", "eternidade", "época"],
  "flor": ["pétala", "rosa", "jasmim"],
  "estrela": ["astro", "constelação", "brilho"],
  "noite": ["escuridão", "trevas", "mistério"],
  "sol": ["astro-rei", "luz", "aurora"],
  "céu": ["firmamento", "abóbada", "infinito"],
  "rio": ["correnteza", "córrego", "afluente"],
  "montanha": ["serra", "cordilheira", "pico"],
  "coração": ["alma", "peito", "sentimento"],
  "destino": ["fado", "sina", "caminho"],
  "esperança": ["fé", "confiança", "otimismo"],
  "saudade": ["nostalgia", "melancolia", "anseio"],
  "palavra": ["vocábulo", "termo", "expressão"],
  "poesia": ["verso", "estrofe", "lirismo"],
  "brisa": ["vento leve", "sopro", "ar fresco"],
  "luz": ["claridade", "fulgor", "brilho"],
  "infinito": ["eternidade", "imensidão", "sem-fim"],
  "orvalho": ["gota", "umidade", "rocío"],
  "neblina": ["névoa", "bruma", "fumaça"],
  "verso": ["estrofe", "linha", "poema"],
  "alma": ["espírito", "essência", "interior"],
  "paixão": ["ardor", "amor", "entusiasmo"],
  "tristeza": ["melancolia", "mágoa", "desalento"],
  "alegria": ["felicidade", "júbilo", "contentamento"],
  "vida": ["existência", "trajetória", "caminho"],
  "morte": ["fim", "ocaso", "despedida"],
  "chuva": ["precipitação", "garoa", "tempestade"],
  "terra": ["solo", "chão", "planeta"],
  "fogo": ["chama", "labareda", "incêndio"],
  "água": ["líquido", "rio", "oceano"],
  "ar": ["vento", "oxigênio", "brisa"],
  "paz": ["tranquilidade", "harmonia", "calma"],
  "guerra": ["conflito", "batalha", "combate"],
  "amor": ["afeto", "paixão", "ternura"],
  "ódio": ["rancor", "aversão", "repulsa"]
};

// Buscar palavras no banco
function buscar() {
  const termo = document.getElementById("busca").value.toLowerCase();
  let resultados = [];

  for (const palavra in banco) {
    if (palavra.includes(termo)) {
      resultados.push(palavra);
    } else {
      const sinonimos = banco[palavra];
      if (sinonimos.some(s => s.toLowerCase().includes(termo))) {
        resultados.push(palavra);
      }
    }
  }

  document.getElementById("resultados").innerHTML = resultados.map(p =>
    `<button onclick="adicionar('${p}')">${p}</button>`
  ).join(" ");
}

// Adicionar palavra ao texto e abrir no dicionário
function adicionar(palavra) {
  const textoArea = document.getElementById("texto");
  textoArea.innerHTML += palavra + " ";
  mostrarNoDicionario(palavra);
  atualizarContador();
}

// Limpar texto
function limparTexto() {
  document.getElementById("texto").innerHTML = "";
  atualizarContador();
}

// Salvar texto
function salvarTexto() {
  const texto = document.getElementById("texto").innerText;
  const blob = new Blob([texto], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "meu_texto.txt";
  link.click();
}

// Copiar texto
function copiarTexto() {
  const texto = document.getElementById("texto").innerText;
  navigator.clipboard.writeText(texto).then(() => {
    alert("Texto copiado para a área de transferência!");
  });
}

// Contador
function atualizarContador() {
  const texto = document.getElementById("texto").innerText.trim();
  const palavras = texto === "" ? [] : texto.split(/\s+/);
  document.getElementById("contador").innerText = `Palavras: ${palavras.length}`;
}

// Alternar tema
function alternarTema() {
  document.body.classList.toggle("dark");
}

// Buscar no dicionário
function buscarDicionario() {
  const termo = document.getElementById("buscaDicionario").value.toLowerCase();
  mostrarNoDicionario(termo);
}

// Mostrar palavra no dicionário (sinônimos + API Dicionário Aberto)
async function mostrarNoDicionario(palavra) {
  let resultado = "";

  if (!palavra) {
    document.getElementById("resultadoDicionario").innerHTML = "<p>Digite uma palavra para buscar.</p>";
    return;
  }

  resultado += `<h3>${palavra}</h3>`;

  // Sinônimos locais
  if (banco[palavra]) {
    resultado += `<p><strong>Sinônimos:</strong> ${banco[palavra].join(", ")}</p>`;
  }

  // Definição via Dicionário Aberto
  try {
    const response = await fetch(`https://api.dicionario-aberto.net/word/${palavra}`);
    const data = await response.json();

    if (data.length > 0) {
      // O retorno é XML dentro de JSON, então precisamos limpar tags
      const definicao = data[0].xml.replace(/<[^>]+>/g, "").trim();
      resultado += `<p><strong>Definição:</strong> ${definicao}</p>`;
    } else {
      resultado += "<p><small>Não encontrado no Dicionário Aberto.</small></p>";
    }
  } catch (e) {
    resultado += "<p><small>Erro ao consultar API.</small></p>";
  }

  document.getElementById("resultadoDicionario").innerHTML = resultado;
}

/* =========================
   Atalhos de teclado
   ========================= */

// Enter dispara busca principal
document.getElementById("busca").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buscar();
  }
});

// Enter dispara busca do dicionário
document.getElementById("buscaDicionario").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buscarDicionario();
  }
});

// Atalhos globais
document.addEventListener("keydown", function(event) {
  if (event.ctrlKey && event.key.toLowerCase() === "l") {
    event.preventDefault();
    limparTexto();
  }
  if (event.ctrlKey && event.key.toLowerCase() === "s") {
    event.preventDefault();
    salvarTexto();
  }
  if (event.ctrlKey && event.key.toLowerCase() === "c") {
    event.preventDefault();
    copiarTexto();
  }
  if (event.ctrlKey && event.key.toLowerCase() === "d") {
    event.preventDefault();
    alternarTema();
  }
});

let historico = {};

function adicionar(palavra) {
  const textoArea = document.getElementById("texto");
  textoArea.innerHTML += palavra + " ";
  mostrarNoDicionario(palavra);
  atualizarContador();

  // Atualizar histórico
  if (!historico[palavra]) {
    historico[palavra] = 0;
  }
  historico[palavra]++;
  atualizarHistorico();
}

function atualizarHistorico() {
  let lista = "";
  for (const palavra in historico) {
    lista += `<p>${palavra} (${historico[palavra]}x)</p>`;
  }
  document.getElementById("listaHistorico").innerHTML = lista;
}

function exportarPDF() {
  const texto = document.getElementById("texto").innerText;
  const doc = new jsPDF();
  doc.text(texto, 10, 10);
  doc.save("meu_texto.pdf");
}

function exportarDOCX() {
  const texto = document.getElementById("texto").innerText;
  const doc = new docx.Document({
    sections: [{ properties: {}, children: [new docx.Paragraph(texto)] }]
  });
  docx.Packer.toBlob(doc).then(blob => {
    saveAs(blob, "meu_texto.docx");
  });
}

function atualizarEstatisticas() {
  const texto = document.getElementById("texto").innerText.trim();
  const frases = texto.split(/[.!?]/).filter(f => f.trim() !== "");
  const palavras = texto === "" ? [] : texto.split(/\s+/);

  // Frequência
  let freq = {};
  palavras.forEach(p => {
    freq[p] = (freq[p] || 0) + 1;
  });

  let maisUsada = Object.keys(freq).reduce((a, b) => freq[a] > freq[b] ? a : b, "");

  let estatisticas = `
    <p>Frases: ${frases.length}</p>
    <p>Palavras: ${palavras.length}</p>
    <p>Média de palavras por frase: ${(palavras.length / frases.length).toFixed(2)}</p>
    <p>Palavra mais usada: ${maisUsada}</p>
  `;

  document.getElementById("dadosEstatisticas").innerHTML = estatisticas;
}

async function buscarRimas() {
  const termo = document.getElementById("buscaRimas").value.toLowerCase();
  let resultado = `<h3>Rimas para "${termo}"</h3>`;

  try {
    const response = await fetch(`https://rhymebrain.com/talk?function=getRhymes&word=${termo}&lang=pt`);
    const data = await response.json();

    if (data.length > 0) {
      resultado += "<ul>";
      data.slice(0, 10).forEach(r => {
        resultado += `<li>${r.word}</li>`;
      });
      resultado += "</ul>";
    } else {
      resultado += "<p><small>Nenhuma rima encontrada.</small></p>";
    }
  } catch (e) {
    resultado += "<p><small>Erro ao consultar API de rimas.</small></p>";
  }

  document.getElementById("resultadoRimas").innerHTML = resultado;
}