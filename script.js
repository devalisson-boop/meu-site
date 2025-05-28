// Scroll Reveal para imersão visual
if (typeof ScrollReveal !== "undefined") {
  ScrollReveal().reveal('.product-card, .benefit-card, .hero-content, .final-section', {
    distance: '40px',
    duration: 1000,
    easing: 'ease-out',
    origin: 'bottom',
    interval: 100
  });
}

// Evite erros caso elementos não existam no HTML
document.addEventListener('DOMContentLoaded', function () {
  // --- imagens do pc ---
  const gabineteSelect = document.getElementById('gabinete');
  const cpuSelect = document.getElementById('cpu');
  const gpuSelect = document.getElementById('gpu');
  const ramSelect = document.getElementById('ram');
  const armazenamentoSelect = document.getElementById('armazenamento');
  const psuSelect = document.getElementById('psu');
  const coolerSelect = document.getElementById('cooler');
  const soSelect = document.getElementById('so');
  const imagemPcDiv = document.getElementById('imagem-pc');
  const visualizacaoPc = document.querySelector('.visualizacao-pc');
  const valorTotalElement = document.createElement('p');

  // Só executa se existir o bloco de montagem tradicional
  if (
    gabineteSelect && cpuSelect && gpuSelect && ramSelect &&
    armazenamentoSelect && psuSelect && coolerSelect && soSelect &&
    imagemPcDiv && visualizacaoPc
  ) {
    const imagemPc = imagemPcDiv.querySelector('img');

    // Lista de preços e imagens
    const precos = {
      gabinete1: { preco: 299, imagem: 'imagens/gabinete1.jpg' },
      gabinete2: { preco: 349, imagem: 'imagens/gabinete2.jpg' },
      gabinete3: { preco: 399, imagem: 'imagens/gabinete3.jpg' },
      cpu: { preco: 1299, imagem: 'imagens/cpu1.jpg' },
      cpu2: { preco: 1199, imagem: 'imagens/cpu2.jpg' },
      cpu3: { preco: 1499, imagem: 'imagens/cpu3.jpg' },
      gpu1: { preco: 2699, imagem: 'imagens/gpu1.jpg' },
      gpu2: { preco: 2899, imagem: 'imagens/gpu2.jpg' },
      gpu3: { preco: 3099, imagem: 'imagens/gpu3.jpg' },
      ram1: { preco: 399, imagem: 'imagens/ram1.jpg' },
      ram2: { preco: 499, imagem: 'imagens/ram2.jpg' },
      ram3: { preco: 699, imagem: 'imagens/ram3.jpg' },
      // Continue para os outros componentes...
    };

    let valorTotal = 0;

    // Função para atualizar a visualização do PC
    function atualizarVisualizacao() {
      let imagensComponentes = [];
      let novoValorTotal = 0;

      const componentesSelecionados = [
        gabineteSelect.value, cpuSelect.value, gpuSelect.value, ramSelect.value,
        armazenamentoSelect.value, psuSelect.value, coolerSelect.value, soSelect.value
      ];

      componentesSelecionados.forEach(component => {
        if (precos[component]) {
          novoValorTotal += precos[component].preco;
          imagensComponentes.push(precos[component].imagem);
        }
      });

      valorTotal = novoValorTotal;

      if (!document.getElementById('valor-total')) {
        valorTotalElement.id = 'valor-total';
        valorTotalElement.textContent = `Preço Total: R$ ${valorTotal.toFixed(2)}`;
        visualizacaoPc.appendChild(valorTotalElement);
      } else {
        valorTotalElement.textContent = `Preço Total: R$ ${valorTotal.toFixed(2)}`;
      }

      // Exibindo as imagens dos componentes selecionados
      if (imagensComponentes.length > 0 && imagemPc) {
        imagemPc.src = imagensComponentes[imagensComponentes.length - 1];
      }
    }

    gabineteSelect.addEventListener('change', atualizarVisualizacao);
    cpuSelect.addEventListener('change', atualizarVisualizacao);
    gpuSelect.addEventListener('change', atualizarVisualizacao);
    ramSelect.addEventListener('change', atualizarVisualizacao);
    armazenamentoSelect.addEventListener('change', atualizarVisualizacao);
    psuSelect.addEventListener('change', atualizarVisualizacao);
    coolerSelect.addEventListener('change', atualizarVisualizacao);
    soSelect.addEventListener('change', atualizarVisualizacao);

    atualizarVisualizacao();
  }

  // --- interação com ícones ---
  const iconePC = document.getElementById('pc');
  const iconeMobile = document.getElementById('mobile');
  const iconeConsole = document.getElementById('console');

  if (iconePC && document.getElementById('descricao-pc')) {
    iconePC.addEventListener('mouseenter', function() {
      document.getElementById('descricao-pc').style.opacity = '1';
      document.getElementById('descricao-pc').style.visibility = 'visible';
    });
    iconePC.addEventListener('mouseleave', function() {
      document.getElementById('descricao-pc').style.opacity = '0';
      document.getElementById('descricao-pc').style.visibility = 'hidden';
    });
  }
  if (iconeMobile && document.getElementById('descricao-mobile')) {
    iconeMobile.addEventListener('mouseenter', function() {
      document.getElementById('descricao-mobile').style.opacity = '1';
      document.getElementById('descricao-mobile').style.visibility = 'visible';
    });
    iconeMobile.addEventListener('mouseleave', function() {
      document.getElementById('descricao-mobile').style.opacity = '0';
      document.getElementById('descricao-mobile').style.visibility = 'hidden';
    });
  }
  if (iconeConsole && document.getElementById('descricao-console')) {
    iconeConsole.addEventListener('mouseenter', function() {
      document.getElementById('descricao-console').style.opacity = '1';
      document.getElementById('descricao-console').style.visibility = 'visible';
    });
    iconeConsole.addEventListener('mouseleave', function() {
      document.getElementById('descricao-console').style.opacity = '0';
      document.getElementById('descricao-console').style.visibility = 'hidden';
    });
  }

  // --- Carrinho ---
  window.abrirCarrinho = function() {
    const carrinhoLateral = document.getElementById('carrinho-lateral');
    if (carrinhoLateral) carrinhoLateral.classList.add('ativo');
  };

  window.fecharCarrinho = function() {
    const carrinhoLateral = document.getElementById('carrinho-lateral');
    if (carrinhoLateral) carrinhoLateral.classList.remove('ativo');
  };

  // Adiciona ao carrinho (precisa existir .add-to-cart e carrinhoItens)
  const carrinhoItens = document.getElementById('carrinho-itens');
  function atualizarTotal() {
    // Implemente sua lógica de total aqui, se desejar.
  }
  document.querySelectorAll('.add-to-cart').forEach(botao => {
    botao.addEventListener('click', () => {
      const card = botao.closest('.product-card');
      if (!card || !carrinhoItens) return;
      const nome = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
      const precoTexto = card.querySelector('.price') ? card.querySelector('.price').textContent.replace('R$', '').replace(',', '.') : '0';
      const preco = parseFloat(precoTexto);
      const imagemURL = card.querySelector('img') ? card.querySelector('img').src : '';

      // Enviar ao servidor para adicionar ao banco de dados
      const produto = {
        nome,
        preco,
        imagemURL
      };

      fetch('/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Produto adicionado ao carrinho:', data);
      })
      .catch(error => {
        console.error('Erro ao adicionar produto:', error);
      });

      // Adiciona o item ao carrinho no frontend
      const itemHTML = `
        <div class="item-carrinho" data-preco="${preco}" data-nome="${nome}">
          <img src="${imagemURL}" alt="${nome}">
          <div>
            <span>${nome}</span><br>
            <strong>R$ ${preco.toFixed(2).replace('.', ',')}</strong>
            <div>
              Qtd: <span class="quantidade">1</span>
              <button class="remover">🗑️</button>
            </div>
          </div>
        </div>
      `;

      carrinhoItens.innerHTML += itemHTML;
      atualizarTotal();
      window.abrirCarrinho();
    });
  });
});



/* PESQUISAR */
/* PESQUISAR - Adaptado para pesquisar produtos das outras páginas também */
async function coletarProdutosPaginaExpandido() {
  let produtos = [];
  // Produtos da página atual
  document.querySelectorAll('.product-card, .game-card, .immersive-card, .jogo-card, .periferico-card, .swiper-slide').forEach(card => {
    const nome = card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : '';
    // Pode ter .price, .game-price, .preco ou não ter preço
    const precoElem = card.querySelector('.price') || card.querySelector('.game-price') || card.querySelector('.preco');
    const preco = precoElem ? precoElem.textContent.replace('R$', '').replace('.', '').replace(',', '.').trim() : '';
    const precoNum = Number(preco);
    const imgElem = card.querySelector('img');
    const imagem_url = imgElem ? imgElem.src : '';
    if (nome) produtos.push({ nome, preco: precoNum, imagem_url, pagina: window.location.pathname.replace(/^\//,'') || "index.html" });
  });

  // Busca produtos de outras páginas
  const paginasExtras = [
    { url: 'index.html', seletor: '.product-card, .game-card, .immersive-card' },
    { url: 'montagen.html', seletor: '.product-card, .game-card, .immersive-card, .jogo-card, .periferico-card, .swiper-slide' },
    { url: 'jogos.html', seletor: '.product-card, .game-card, .immersive-card, .jogo-card' },
    { url: 'perifericos.html', seletor: '.product-card, .game-card, .immersive-card, .periferico-card, .swiper-slide' }
  ];

  for (const pagina of paginasExtras) {
    try {
      // não busca na página atual
      if (window.location.pathname.indexOf(pagina.url) !== -1) continue;
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
        if (nome) produtos.push({ nome, preco: precoNum, imagem_url, pagina: pagina.url });
      });
    } catch(e) {}
  }

  return produtos;
}

// Função para destacar produto, caso parâmetro ?produto= esteja presente na URL
function destacarProdutoAoCarregar() {
  const urlParams = new URLSearchParams(window.location.search);
  const produtoNome = urlParams.get('produto');
  if(produtoNome) {
    // Procura um card que contém esse nome
    const cards = document.querySelectorAll('.product-card, .game-card, .immersive-card, .jogo-card, .periferico-card, .swiper-slide');
    cards.forEach(card => {
      const h3 = card.querySelector('h3');
      if(h3 && h3.textContent.trim().toLowerCase() === decodeURIComponent(produtoNome).toLowerCase()) {
        card.scrollIntoView({behavior: "smooth", block: "center"});
        card.style.boxShadow = "0 0 0 5px #38b6ff";
        setTimeout(()=>{card.style.boxShadow='';}, 3000);
      }
    });
  }
}
document.addEventListener("DOMContentLoaded", destacarProdutoAoCarregar);

// Lida com o formulário de pesquisa expandida
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

  // Filtro
  const encontrados = resultados.filter(prod => prod.nome && prod.nome.toLowerCase().includes(termo.toLowerCase()));

  if(encontrados.length === 0){
    divResultados.innerHTML = `<b>Produto não encontrado.</b>`;
    return;
  }
  let html = `<b>Resultados encontrados:</b><br><br>`;
  encontrados.forEach(prod => {
    // Se produto é da página atual, rola até o card
    if((prod.pagina === window.location.pathname.replace(/^\//,'') || (prod.pagina==="index.html" && window.location.pathname==="/"))) {
      html += `<div class="resultado-produto" style="cursor:pointer" onclick="rolarAteProduto('${encodeURIComponent(prod.nome)}')">
        ${prod.imagem_url ? `<img src="${prod.imagem_url}" alt="${prod.nome}">` : ''}
        <div>
          <div style="font-weight:600;font-size:1.07em;">${prod.nome}</div>
          ${prod.preco ? `<div style="color:#2ecc40;">R$ ${prod.preco.toFixed(2).replace('.', ',')}</div>` : ''}
          <div style="font-size:0.92em;color:#aaa;">Página atual</div>
        </div>
      </div>`;
    } else {
      // Se produto é de outra página, linka para lá já destacando
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

// Função para rolar até o produto da própria página ao clicar no resultado
function rolarAteProduto(nome) {
  const cards = document.querySelectorAll('.product-card, .game-card, .immersive-card, .jogo-card, .periferico-card, .swiper-slide');
  cards.forEach(card => {
    const h3 = card.querySelector('h3');
    if(h3 && h3.textContent.trim().toLowerCase() === decodeURIComponent(nome).toLowerCase()) {
      card.scrollIntoView({behavior: "smooth", block: "center"});
      card.style.boxShadow = "0 0 0 5px #38b6ff";
      setTimeout(()=>{card.style.boxShadow='';}, 3000);
    }
  });
}

// Fecha resultados ao clicar fora
document.addEventListener('click', function(e){
  const resultados = document.getElementById('resultados-pesquisa');
  const form = document.getElementById('form-pesquisa');
  if(resultados && !form.contains(e.target) && !resultados.contains(e.target)){
    resultados.style.display = "none";
  }
});