// Dados dos componentes
const dadosComponentes = {
  "placa-mae": [
    { nome: "ASUS Prime B450M", preco: 500, tipo: "custo", img: "img/placamae1.png" },
    { nome: "Gigabyte Z690 Aorus", preco: 1550, tipo: "desempenho", img: "img/placamae2.png" },
    { nome: "ASRock H510M-E", preco: 400, tipo: "economia", img: "img/placamae3.png" }
  ],
  "cpu": [
    { nome: "AMD Ryzen 5 5600G", preco: 800, tipo: "custo", img: "img/cpu1.png", fps: 80 },
    { nome: "Intel Core i7-12700F", preco: 1700, tipo: "desempenho", img: "img/cpu2.png", fps: 110 },
    { nome: "Intel Core i3-12100F", preco: 530, tipo: "economia", img: "img/cpu3.png", fps: 55 }
  ],
  "cooler": [
    { nome: "CoolerBox Padrão", preco: 70, tipo: "economia", img: "img/cooler1.png" },
    { nome: "Cooler Master Hyper 212", preco: 220, tipo: "custo", img: "img/cooler2.png" },
    { nome: "Water Cooler Corsair H100i", preco: 640, tipo: "desempenho", img: "img/cooler3.png" }
  ],
  "gpu": [
    { nome: "NVIDIA RTX 3060", preco: 1700, tipo: "custo", img: "img/gpu1.png", fps: 95 },
    { nome: "NVIDIA RTX 4070", preco: 4200, tipo: "desempenho", img: "img/gpu2.png", fps: 140 },
    { nome: "GTX 1650", preco: 850, tipo: "economia", img: "img/gpu3.png", fps: 55 }
  ],
  "ram": [
    { nome: "16GB DDR4 3200MHz", preco: 250, tipo: "custo", img: "img/ram1.png" },
    { nome: "32GB DDR5 5200MHz", preco: 690, tipo: "desempenho", img: "img/ram2.png" },
    { nome: "8GB DDR4 2400MHz", preco: 140, tipo: "economia", img: "img/ram3.png" }
  ],
  "ssd": [
    { nome: "SSD 480GB Kingston", preco: 200, tipo: "economia", img: "img/ssd1.png" },
    { nome: "SSD NVMe 1TB Samsung", preco: 520, tipo: "desempenho", img: "img/ssd2.png" },
    { nome: "SSD 960GB Crucial", preco: 340, tipo: "custo", img: "img/ssd3.png" }
  ],
  "psu": [
    { nome: "Corsair 550W", preco: 290, tipo: "custo", img: "img/psu1.png" },
    { nome: "SuperFlower 850W", preco: 620, tipo: "desempenho", img: "img/psu2.png" },
    { nome: "Fonte 400W Genérica", preco: 120, tipo: "economia", img: "img/psu3.png" }
  ]
};

const gabinetes = {
  gamer: "img/gabinete-gamer.png",
  compacto: "img/gabinete-compacto.png",
  mid: "img/gabinete-mid.png"
};

function formatarPreco(valor) {
  return "R$ " + valor.toFixed(2).replace('.', ',');
}
function getBadge(tipo) {
  if (tipo === "custo") return " 🟦";
  if (tipo === "desempenho") return " 🟩";
  if (tipo === "economia") return " 🟨";
  return "";
}
function criaOption(comp, opt, i) {
  return `<option value="${i}" data-img="${opt.img}" data-tipo="${opt.tipo}" data-preco="${opt.preco}">${opt.nome} ${getBadge(opt.tipo)} - ${formatarPreco(opt.preco)}</option>`;
}
function preencheSelects() {
  Object.keys(dadosComponentes).forEach(comp => {
    const select = document.getElementById(`${comp}-sel`);
    select.innerHTML = "";
    dadosComponentes[comp].forEach((opt, i) => {
      select.innerHTML += criaOption(comp, opt, i);
    });
  });
}

// Estado
let estado = {
  gabinete: "gamer",
  "placa-mae": 0,
  cpu: 0,
  cooler: 0,
  gpu: 0,
  ram: 0,
  ssd: 0,
  psu: 0
};

function atualizaImagensComponentes() {
  document.getElementById('gabinete-img').src = gabinetes[estado.gabinete];
  document.getElementById('placa-mae-img').src = dadosComponentes["placa-mae"][+estado["placa-mae"]].img;
  document.getElementById('cpu-img').src = dadosComponentes["cpu"][+estado.cpu].img;
  document.getElementById('cooler-img').src = dadosComponentes["cooler"][+estado.cooler].img;
  document.getElementById('gpu-img').src = dadosComponentes["gpu"][+estado.gpu].img;
  document.getElementById('ram-img').src = dadosComponentes["ram"][+estado.ram].img;
  document.getElementById('ssd-img').src = dadosComponentes["ssd"][+estado.ssd].img;
  document.getElementById('psu-img').src = dadosComponentes["psu"][+estado.psu].img;
}

function calculaTotalEFPS() {
  let custo = 0;
  let fps = 0;
  const cpu = dadosComponentes["cpu"][+estado.cpu];
  const gpu = dadosComponentes["gpu"][+estado.gpu];
  if (gpu && cpu) {
    fps = Math.round((gpu.fps * 0.6 + cpu.fps * 0.4));
  } else {
    fps = "--";
  }
  Object.keys(dadosComponentes).forEach(comp => {
    const idx = +estado[comp];
    if (dadosComponentes[comp][idx]) {
      custo += dadosComponentes[comp][idx].preco;
    }
  });
  document.getElementById("fps-value").textContent = fps === "--" ? "---" : fps + " FPS";
  document.getElementById("custo-total").textContent = formatarPreco(custo);
}

window.addEventListener("DOMContentLoaded", () => {
  preencheSelects();

  // Gabinete selector
  document.getElementById("gabinete-sel").addEventListener("change", (e) => {
    estado.gabinete = e.target.value;
    atualizaImagensComponentes();
  });

  // Demais componentes
  Object.keys(dadosComponentes).forEach(comp => {
    const select = document.getElementById(`${comp}-sel`);
    select.addEventListener("change", (e) => {
      estado[comp] = select.value;
      atualizaImagensComponentes();
      calculaTotalEFPS();
    });
    estado[comp] = 0;
  });

  // Estado inicial
  atualizaImagensComponentes();
  calculaTotalEFPS();
});

// carrinho da montagem
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('adicionar-montagem-carrinho');
  if (btn) {
    btn.addEventListener('click', function() {
      // Pega nome e valor total da montagem:
      const gabinete = document.getElementById('gabinete-sel').selectedOptions[0].textContent;
      const placaMae = dadosComponentes["placa-mae"][+estado["placa-mae"]].nome;
      const cpu = dadosComponentes["cpu"][+estado.cpu].nome;
      const cooler = dadosComponentes["cooler"][+estado.cooler].nome;
      const gpu = dadosComponentes["gpu"][+estado.gpu].nome;
      const ram = dadosComponentes["ram"][+estado.ram].nome;
      const ssd = dadosComponentes["ssd"][+estado.ssd].nome;
      const psu = dadosComponentes["psu"][+estado.psu].nome;
      let precoTotal = 0;
      Object.keys(dadosComponentes).forEach(comp => {
        const idx = +estado[comp];
        if (dadosComponentes[comp][idx]) {
          precoTotal += dadosComponentes[comp][idx].preco;
        }
      });
      const nomeMontagem = `PC GamerZone (${gabinete}, ${placaMae}, ${cpu}, ${gpu}, ${ram}, ${ssd}, ${psu}, ${cooler})`;
      const imagemURL = document.getElementById('gabinete-img').src;

      // Monta o objeto do produto:
      const montagem = {
        nome: nomeMontagem,
        preco: precoTotal,
        quantidade: 1,
        imagem_url: imagemURL,
        tipo: "montagem"
      };

      // Salva no localStorage:
      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      // Se já existe montagem igual, só aumenta a quantidade:
      let existente = carrinho.find(i => i.nome === nomeMontagem);
      if (existente) {
        existente.quantidade += 1;
      } else {
        carrinho.push(montagem);
      }
      localStorage.setItem('carrinho', JSON.stringify(carrinho));

      alert('Montagem adicionada ao carrinho!');
    });
  }
});

// PESQUISA UNIVERSAL
async function coletarProdutosPaginaExpandido() {
  let produtos = [];
  // Montagens (apenas a montagem atual, para exibir na busca quando usuário pesquisar)
  produtos.push({
    nome: document.title.replace('GamerZone - ', ''),
    preco: 0, // Não há preço fixo
    imagem_url: document.getElementById('gabinete-img').src,
    pagina: window.location.pathname.replace(/^\//,'') || "montagen.html"
  });
  // Busca produtos de outras páginas
  const paginasExtras = [
    { url: 'index.html', seletor: '.product-card, .game-card, .immersive-card' },
    { url: 'jogos.html', seletor: '.jogo-card' },
    { url: 'perifericos.html', seletor: '.swiper-slide, .periferico-card' }
  ];
  for (const pagina of paginasExtras) {
    try {
      if((window.location.pathname.indexOf(pagina.url)!==-1)) continue;
      const resp = await fetch(pagina.url);
      if (!resp.ok) continue;
      const html = await resp.text();
      const temp = document.createElement('div');
      temp.innerHTML = html;
      temp.querySelectorAll(pagina.seletor).forEach(card => {
        const nome = card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : '';
        const precoElem = card.querySelector('.price') || card.querySelector('.game-price') || card.querySelector('.preco');
        const preco = precoElem ? precoElem.textContent.replace('R$', '').replace('.', '').replace(',', '.').trim() : '';
        const precoNum = Number(preco);
        const imgElem = card.querySelector('img');
        const imagem_url = imgElem ? imgElem.src : '';
        if(nome) produtos.push({ nome, preco: precoNum, imagem_url, pagina: pagina.url });
      });
    } catch(e) {}
  }
  return produtos;
}

function destacarProdutoAoCarregar() {
  const urlParams = new URLSearchParams(window.location.search);
  const produtoNome = urlParams.get('produto');
  if(produtoNome) {
    // Caso alguém tente buscar "Montagem de PC" ou similar, rola até a section
    if(produtoNome.toLowerCase().includes('montagem')) {
      const sec = document.getElementById('montagem');
      if(sec) {
        sec.scrollIntoView({behavior: "smooth", block: "center"});
        sec.style.boxShadow = "0 0 0 5px #38b6ff";
        setTimeout(()=>{sec.style.boxShadow='';}, 3000);
      }
    }
  }
}
document.addEventListener("DOMContentLoaded", destacarProdutoAoCarregar);

document.getElementById('form-pesquisa').addEventListener('submit', async function(e){
  e.preventDefault();
  const termo = document.getElementById('input-pesquisa').value;
  const divResultados = document.getElementById('resultados-pesquisa');
  if (termo.length < 2) {
    divResultados.style.display = "none";
    return;
  }
  divResultados.innerHTML = "Buscando...";
  divResultados.style.display = "block";
  const resultados = await coletarProdutosPaginaExpandido();
  const encontrados = resultados.filter(prod => prod.nome && prod.nome.toLowerCase().includes(termo.toLowerCase()));
  if(encontrados.length === 0){
    divResultados.innerHTML = `<b>Produto não encontrado.</b>`;
    return;
  }
  let html = `<b>Resultados encontrados:</b><br><br>`;
  encontrados.forEach(prod => {
    if((prod.pagina === window.location.pathname.replace(/^\//,'') || (prod.pagina==="montagen.html" && window.location.pathname.endsWith('montagen.html')))) {
      html += `<div class="resultado-produto" style="cursor:pointer" onclick="rolarAteProduto('${encodeURIComponent(prod.nome)}')">
        ${prod.imagem_url ? `<img src="${prod.imagem_url}" alt="${prod.nome}">` : ''}
        <div>
          <div style="font-weight:600;font-size:1.07em;">${prod.nome}</div>
          ${prod.preco ? `<div style="color:#2ecc40;">R$ ${prod.preco.toFixed(2).replace('.', ',')}</div>` : ''}
          <div style="font-size:0.92em;color:#aaa;">Página atual</div>
        </div>
      </div>`;
    } else {
      html += `<a href="${prod.pagina}?produto=${encodeURIComponent(prod.nome)}" style="text-decoration:none;color:unset;">
        <div class="resultado-produto" style="cursor:pointer">
          ${prod.imagem_url ? `<img src="${prod.imagem_url}" alt="${prod.nome}">` : ''}
          <div>
            <div style="font-weight:600;font-size:1.07em;">${prod.nome}</div>
            ${prod.preco ? `<div style="color:#2ecc40;">R$ ${prod.preco.toFixed(2).replace('.', ',')}</div>` : ''}
            <div style="font-size:0.92em;color:#aaa;">${prod.pagina.replace('.html','').replace('index','Início').replace('montagen','Montagem').replace('jogos','Jogos').replace('perifericos','Periféricos')}</div>
          </div>
        </div>
      </a>`;
    }
  });
  divResultados.innerHTML = html;
});

function rolarAteProduto(nome) {
  // Só rola até a montagem, pois é a única "produto" nesta página
  const sec = document.getElementById('montagem');
  if(sec) {
    sec.scrollIntoView({behavior: "smooth", block: "center"});
    sec.style.boxShadow = "0 0 0 5px #38b6ff";
    setTimeout(()=>{sec.style.boxShadow='';}, 3000);
  }
}
document.addEventListener('click', function(e){
  const resultados = document.getElementById('resultados-pesquisa');
  const form = document.getElementById('form-pesquisa');
  if(resultados && !form.contains(e.target) && !resultados.contains(e.target)){
    resultados.style.display = "none";
  }
});