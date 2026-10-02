const viewMoreBtn = document.getElementById('view-more-btn');
const modal = document.getElementById('projects-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');

viewMoreBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
});

modalOverlay.addEventListener('click', () => {
  modal.classList.add('hidden');
});