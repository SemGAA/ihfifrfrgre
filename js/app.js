const pagination = document.querySelector('.pagination');

let currentPage = 1;

const buttonsPerPage = 10;

const updatePagination = (pageNumber) => {
  while (pagination.firstChild) {
    pagination.removeChild(pagination.firstChild);
  }
  
  const startPage = Math.max(1, pageNumber - Math.floor(buttonsPerPage / 2));
  const endPage = Math.min(472, pageNumber + Math.floor(buttonsPerPage / 2));
  
  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement('button');
    button.id = `page-${i}`;
    button.textContent = i;
    button.classList.add('pagination-button');
    
    button.addEventListener('click', () => {
      currentPage = i;
      updatePagination(i);
    });
    
    pagination.appendChild(button);
  }
  
  document.querySelector(`#page-${currentPage}`).classList.add('active');
};



// пагинатор
const paginationButtons = document.querySelectorAll('.pagination-button');

document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    updatePagination(currentPage);
  }
});

document.getElementById('next-page').addEventListener('click', () => {
  if (currentPage < 472) {
    currentPage++;
    updatePagination(currentPage);
  }
});

paginationButtons.forEach(button => {
  button.addEventListener('click', () => {
    paginationButtons.forEach(btn => btn.classList.remove('active'));
    
    button.classList.add('active');
    
    const pageNumber = parseInt(button.id.split('-')[1]);
    
    button.classList.add('animated');
    setTimeout(() => {
      button.classList.remove('animated');
    }, 300);
    
    updatePagination(pageNumber);
  });
});

updatePagination(currentPage);


// выбор категории

const allButton = document.getElementById('all-button');
const completedButton = document.getElementById('completed-button');

allButton.addEventListener('click', () => {
  document.querySelectorAll('.item-poster').forEach(item => {
    item.style.display = 'block';
  });

  allButton.classList.add('active');
  completedButton.classList.remove('active');
});

completedButton.addEventListener('click', () => {
  document.querySelectorAll('.item-poster').forEach(item => {
    if (item.querySelector('.overlay span').innerText.includes('заверш')) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });

  completedButton.classList.add('active');
  allButton.classList.remove('active');
});