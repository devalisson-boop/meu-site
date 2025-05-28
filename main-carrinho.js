// Carrinho usando localStorage para compartilhar com montagen.html

let totalCarrinho = 0;
const carrinhoItens = document.getElementById('itens-carrinho');

// Função para abrir o carrinho
function abrirCarrinho() {
  document.getElementById('carrinho-lateral').classList.add('ativo');
  carregarCarrinhoDoLocalStorage();
}

// Função para fechar o carrinho
function fecharCarrinho() {
  document.getElementById('carrinho-lateral').classList.remove('ativo');
}

// Atualiza o total do carrinho
function atualizarTotal() {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  let novoTotal = 0;
  carrinho.forEach(item => {
    novoTotal += item.preco * item.quantidade;
  });
  totalCarrinho = novoTotal;
  document.getElementById('total').textContent = 'R$ ' + totalCarrinho.toFixed(2).replace('.', ',');
}

// Carrega os itens do carrinho do localStorage
function carregarCarrinhoDoLocalStorage() {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinhoItens.innerHTML = '';
  carrinho.forEach(item => {
    const itemHTML = document.createElement('div');
    itemHTML.classList.add('item-carrinho');
    itemHTML.dataset.preco = item.preco;
    itemHTML.dataset.nome = item.nome;

    itemHTML.innerHTML = `
      <img src="${item.imagem_url}" alt="${item.nome}">
      <div style="flex:1">
        <span>${item.nome}</span><br>
        <strong>R$ ${parseFloat(item.preco).toFixed(2).replace('.', ',')}</strong>
        <div style="margin-top:5px;">
          Qtd: <span class="quantidade">${item.quantidade}</span>
          <button class="remover">🗑️</button>
        </div>
      </div>
    `;
    // Remover item
    itemHTML.querySelector('.remover').addEventListener('click', () => {
      removerDoCarrinho(item.nome);
    });

    carrinhoItens.appendChild(itemHTML);
  });
  atualizarTotal();
}

// Remover item do carrinho
function removerDoCarrinho(nome) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho = carrinho.filter(item => item.nome !== nome);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  carregarCarrinhoDoLocalStorage();
}

// Adiciona ao carrinho (produtos avulsos da página principal)
document.querySelectorAll('.add-to-cart').forEach(botao => {
  botao.addEventListener('click', () => {
    const card = botao.closest('.product-card');
    const nome = card.querySelector('h3').textContent;
    const precoTexto = card.querySelector('.price').textContent.replace('R$', '').replace(',', '.');
    const preco = parseFloat(precoTexto);
    const imagemURL = card.querySelector('img').src;

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let existente = carrinho.find(i => i.nome === nome);
    if (existente) {
      existente.quantidade += 1;
    } else {
      carrinho.push({ nome, preco, quantidade: 1, imagem_url: imagemURL, tipo: "produto" });
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinhoDoLocalStorage();
    abrirCarrinho();
  });
});

// Ao carregar a página, atualiza o carrinho
document.addEventListener('DOMContentLoaded', carregarCarrinhoDoLocalStorage);


function irAoPagamento() {
  window.location.href = 'checkout.html';
}