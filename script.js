// Banco de palavras com sinônimos
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
  "destino": ["fado", "sina", "caminho"],
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
  "ódio": ["rancor", "aversão", "repulsa"],
  "espera": ["aguardo", "demora", "expectativa"],
  "caminho": ["trilha", "rota", "estrada"],
  "luta": ["combate", "batalha", "esforço"],
  "força": ["energia", "potência", "vigor"],
  "fragilidade": ["fraqueza", "vulnerabilidade", "delicadeza"],
  "beleza": ["formosura", "encanto", "graça"],
  "mistério": ["enigma", "segredo", "incógnita"],
  "verdade": ["realidade", "certeza", "fato"],
  "mentira": ["falsidade", "ilusão", "engano"],
  "liberdade": ["autonomia", "independência", "emancipação"],
  "prisão": ["cárcere", "confinamento", "cela"],
  "voz": ["fala", "som", "palavra"],
  "música": ["melodia", "harmonia", "canção"],
  "dança": ["bailado", "movimento", "coreografia"],
  "arte": ["expressão", "criação", "obra"],
  "cor": ["matiz", "tonalidade", "pigmento"],
  "luz": ["claridade", "fulgor", "brilho"],
  "sombra": ["penumbra", "escuridão", "trevas"],
  "estrela": ["astro", "constelação", "brilho"],
  "planeta": ["mundo", "globo", "esfera"],
  "universo": ["cosmos", "galáxia", "infinito"],
  "galáxia": ["constelação", "sistema estelar", "cosmos"],
  "tempo": ["instante", "eternidade", "época"],
  "história": ["narrativa", "conto", "memória"],
  "lenda": ["mito", "conto", "fábula"],
  "mito": ["fábula", "lenda", "alegoria"],
  "fé": ["crença", "confiança", "religião"],
  "religião": ["culto", "doutrina", "espiritualidade"],
  "espírito": ["alma", "essência", "interior"],
  "coragem": ["bravura", "ousadia", "valentia"],
  "medo": ["temor", "pavor", "receio"],
  "esperança": ["fé", "confiança", "otimismo"],
  "solidão": ["isolamento", "abandono", "reclusão"],
  "companhia": ["presença", "amizade", "sociedade"],
  "amizade": ["companheirismo", "camaradagem", "irmandade"],
  "inimigo": ["adversário", "oponente", "rival"],
  "herói": ["valente", "campeão", "protagonista"],
  "vilão": ["antagonista", "malfeitor", "opressor"],
  "luz": ["claridade", "fulgor", "brilho"],
  "trevas": ["escuridão", "sombra", "penumbra"],
  "claridade": ["luz", "fulgor", "brilho"],
  "brilho": ["fulgor", "resplendor", "luminosidade"],
  "resplendor": ["brilho", "fulgor", "luminosidade"],
  "aurora": ["alvorada", "amanhecer", "luz"],
  "ocaso": ["pôr-do-sol", "crepúsculo", "fim"],
  "crepúsculo": ["entardecer", "ocaso", "fim"],
  "amanhecer": ["aurora", "alvorada", "início"],
  "entardecer": ["crepúsculo", "ocaso", "fim"],
  "noite": ["escuridão", "trevas", "mistério"],
  "dia": ["claridade", "sol", "luz"],
  "manhã": ["aurora", "alvorada", "início"],
  "tarde": ["entardecer", "crepúsculo", "fim"],
  "eternidade": ["infinito", "imensidão", "sem-fim"],
  "instante": ["momento", "segundo", "piscar"],
  "momento": ["instante", "segundo", "piscar"],
  "segundo": ["instante", "momento", "piscar"],
  "piscar": ["instante", "momento", "segundo"]
};

// Função de busca
function buscar() {
  const termo = document.getElementById("busca").value.toLowerCase();
  let resultados = [];

  // Procurar tanto nas palavras principais quanto nos sinônimos
  for (const palavra in banco) {
    if (palavra.includes(termo)) {
      resultados.push(palavra);
    } else {
      const sinonimos = banco[palavra];
      if (sinonimos.some(s => s.toLowerCase().includes(termo))) {
        resultados.push(palavra); // mostra a palavra principal se o sinônimo bate
      }
    }
  }

  // Mostrar os botões
  document.getElementById("resultados").innerHTML = resultados.map(p =>
    `<button onclick="adicionar('${p}')">${p}</button>`
  ).join(" ");
}

// Função para adicionar palavra e mostrar sinônimos
function adicionar(palavra) {
  const poema = document.getElementById("poema");
  poema.innerHTML += palavra + " ";

  const sinonimos = banco[palavra];
  if (sinonimos) {
    const areaResultados = document.getElementById("resultados");
    areaResultados.innerHTML += "<br>" + sinonimos.map(s =>
      `<button onclick="adicionar('${s}')">${s}</button>`
    ).join(" ");
  }
}