const botao = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');

function alternarMenu(aberto) {
  menu.classList.toggle('aberto', aberto);
  botao.setAttribute('aria-expanded', String(aberto));
  botao.querySelector('.sr').textContent = aberto ? 'Fechar menu' : 'Abrir menu';
}

botao.addEventListener('click', () => alternarMenu(!menu.classList.contains('aberto')));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) alternarMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') alternarMenu(false); });
