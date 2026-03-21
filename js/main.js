// Efeito Modal Apple para Procedimentos
const procedimentosLista = document.querySelectorAll('.procedimento-item');

if (procedimentosLista.length > 0) {
  // Cria o container do modal globalmente
  const modalOverlay = document.createElement('div');
  modalOverlay.classList.add('modal-overlay');

  const modalBox = document.createElement('div');
  modalBox.classList.add('modal-box');

  // Bot�o de fechar em fomato de X decente (entidade HTML)
  const btnFechar = document.createElement('button');
  btnFechar.classList.add('btn-fechar-modal');
  btnFechar.innerHTML = '&#10005;';

  // Container para o conte�do clonado
  const modalConteudo = document.createElement('div');
  modalConteudo.classList.add('modal-conteudo');

  modalBox.appendChild(btnFechar);
  modalBox.appendChild(modalConteudo);
  modalOverlay.appendChild(modalBox);
  document.body.appendChild(modalOverlay);

  // Fun��o para fechar com anima��o
  const fecharModal = () => {
    modalOverlay.classList.remove('ativo');
    document.body.classList.remove('modal-aberto');
    // Aguarda a anima��o de sa�da terminar para limpar o HTML (evita um 'pulo' no visual)
    setTimeout(() => {
      modalConteudo.innerHTML = '';
    }, 450);
  };

  // Eventos de fechar
  btnFechar.addEventListener('click', fecharModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) fecharModal();
  });

  // Evento de abrir ao clicar nos itens
  procedimentosLista.forEach((item) => {
    item.addEventListener('click', () => {
      // Clona o conte�do do item exato que foi clicado para dentro do modal
      modalConteudo.innerHTML = item.innerHTML;

      // --- Logica do Link do WhatsApp customizado ---
      const h3 = item.querySelector('h3');
      const nomeProcedimento = h3 ? h3.innerText : 'seu servi�o';
      const btnLink = modalConteudo.querySelector('.procedimento-info span');
      
      if (btnLink) {
        btnLink.innerText = 'Agendar via WhatsApp';
        btnLink.style.cursor = 'pointer';
        // Cores e estetica para lembrar que virou uma acao
        btnLink.style.color = '#01b93b';
        btnLink.style.textDecoration = 'underline';
        
        btnLink.addEventListener('click', (e) => {
          e.stopPropagation(); // Evitar comportamentos nao desejados
          const mensagem = encodeURIComponent('Oii, gostaria de saber mais sobre ' + nomeProcedimento);
          // O mesmo numero usado no botao do site: 5541984815419
          window.open('https://wa.me/5541984815419?text=' + mensagem, '_blank');
        });
      }

      // Força o navegador a recalcular o layout (reflow) antes de engatilhar a transição
      void modalBox.offsetWidth;

      // Mostra o modal no frame exato (garante a animação super fluida)
      requestAnimationFrame(() => {
        modalOverlay.classList.add('ativo');
        document.body.classList.add('modal-aberto');
      });
    });
  });
}

