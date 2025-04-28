let currentIndex = 0;
let books = [];

// Fetch books data
fetch('https://books-af6j.onrender.com/books')
    .then(response => response.json())
    .then(data => {
        books = data;
        initCarousel();
        showBookDetails(currentIndex);
    })
    .catch(error => console.error('Error loading books:', error));

function initCarousel() {
    const carouselTrack = document.getElementById('carousel-track');
    
    books.forEach((book, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.dataset.index = index;
        
        const img = document.createElement('img');
        img.src = book.cover_image;
        img.alt = book.title;
        img.onclick = () => showBookDetails(index);
        
        slide.appendChild(img);
        carouselTrack.appendChild(slide);
    });
}

function showBookDetails(index) {
    currentIndex = index;
    const book = books[index];
    const detailsContainer = document.getElementById('book-details');
    
    detailsContainer.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Theme:</strong> ${book.general_theme}</p>
        <p><strong>Overview:</strong> ${book.overview}</p>
        <div class="book-links">
            <a href="${book.purchase_link}" target="_blank"><i class="fas fa-shopping-cart"></i> Purchase</a>
            ${book.audio_link && book.audio_link !== "Not available on major audio platforms" ? 
                `<a href="${book.audio_link}" target="_blank"><i class="fas fa-headphones"></i> Listen</a>` : 
                '<span class="no-audio">Audio not available</span>'}
        </div>
    `;
    
    // Update active slide
    const slides = document.querySelectorAll('.carousel-slide');
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

function moveSlide(direction) {
    const newIndex = currentIndex + direction;
    
    if (newIndex >= 0 && newIndex < books.length) {
        currentIndex = newIndex;
        showBookDetails(currentIndex);
        updateCarouselPosition();
    }
}

function updateCarouselPosition() {
    const carouselTrack = document.querySelector('.carousel-track');
    const slideWidth = document.querySelector('.carousel-slide').offsetWidth;
    const newPosition = -currentIndex * (slideWidth + 30); // 30px for margin
    
    carouselTrack.style.transform = `translateX(${newPosition}px)`;
}