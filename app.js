// Book tracking application
let books = [];

// DOM elements
const showFormBtn = document.getElementById('showFormBtn');
const bookForm = document.getElementById('bookForm');
const cancelBtn = document.getElementById('cancelBtn');
const booksContainer = document.getElementById('booksContainer');
const bookCount = document.getElementById('bookCount');

// Form inputs
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const ratingInput = document.getElementById('rating');
const notesInput = document.getElementById('notes');

// Show form
showFormBtn.addEventListener('click', function() {
    showFormBtn.classList.add('hidden');
    bookForm.classList.remove('hidden');
    titleInput.focus();
});

// Hide form
cancelBtn.addEventListener('click', function() {
    hideForm();
    resetForm();
});

// Submit form
bookForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const rating = parseInt(ratingInput.value);
    const notes = notesInput.value.trim();
    
    if (!title || !author) return;
    
    const book = {
        id: Date.now().toString(),
        title: title,
        author: author,
        rating: rating,
        notes: notes,
        dateRead: new Date().toLocaleDateString()
    };
    
    books.unshift(book);
    updateBooksList();
    hideForm();
    resetForm();
});

function hideForm() {
    bookForm.classList.add('hidden');
    showFormBtn.classList.remove('hidden');
}

function resetForm() {
    titleInput.value = '';
    authorInput.value = '';
    ratingInput.value = '5';
    notesInput.value = '';
}

function updateBooksList() {
    bookCount.textContent = books.length;
    
    if (books.length === 0) {
        booksContainer.innerHTML = `
            <div class="card empty-state">
                <div class="card-content center">
                    <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 7v14"></path>
                        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                    </svg>
                    <p>No books added yet. Start tracking your reading!</p>
                </div>
            </div>
        `;
        return;
    }
    
    const booksHTML = books.map(book => `
        <div class="book-item card">
            <div class="book-content">
                <div class="book-info">
                    <h3 class="book-title">${escapeHtml(book.title)}</h3>
                    <p class="book-author">by ${escapeHtml(book.author)}</p>
                    <div class="book-rating">
                        <div class="stars">
                            ${createStars(book.rating)}
                        </div>
                        <span class="rating-text">(${book.rating}/5)</span>
                    </div>
                    ${book.notes ? `<p class="book-notes">"${escapeHtml(book.notes)}"</p>` : ''}
                </div>
                <div class="book-meta">
                    <span class="date-badge">Read on ${book.dateRead}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    booksContainer.innerHTML = booksHTML;
}

function createStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        const filled = i < rating ? 'filled' : '';
        stars += `
            <svg class="star ${filled}" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
        `;
    }
    return stars;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize
updateBooksList();