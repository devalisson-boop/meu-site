// Checa login e ajusta visual do botão perfil
function atualizarIconePerfil(logged) {
  const icon = document.getElementById('profile-icon');
  if (icon) {
    icon.classList.remove('logado', 'nao-logado');
    icon.classList.add(logged ? 'logado' : 'nao-logado');
  }
}

function checarSessao(callback) {
  fetch('/api/session', { credentials: 'include' })
    .then(r => r.json())
    .then(sessao => {
      atualizarIconePerfil(sessao.logged);
      if (typeof callback === 'function') callback(sessao.logged, sessao);
    });
}

// Redireciona botão para perfil
document.addEventListener('DOMContentLoaded', function() {
  checarSessao();
  const btn = document.getElementById('profile-btn');
  if (btn) {
    btn.onclick = function() {
      window.location.href = 'perfil.html';
    };
  }
});