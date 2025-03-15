// Enhanced Right-to-Left Animation Implementation

document.addEventListener('DOMContentLoaded', function() {
    // Initialize RTL animations for all cards
    initRTLAnimations();
    
    // Create the reviews section with RTL animation
    createReviewsWithRTLAnimation();
    
    // Setup card RTL exit animations
    setupCardExitAnimations();
});

// Initialize RTL animations for all cards
function initRTLAnimations() {
    // Add the RTL animation class to all cards
    const cards = document.querySelectorAll('.offer-card, .portfolio-item, .marketplace-item, .review-card');
    
    cards.forEach((card, index) => {
        // Add the RTL animation class
        card.classList.add('card-with-rtl-anim');
        
        // Set index for staggered animations
        card.style.setProperty('--card-index', index);
        
        // Initial state - card is off-screen to the right
        card.classList.add('animate-in');
        
        // Set timeout to remove the initial state and animate the card in
        setTimeout(() => {
            card.classList.remove('animate-in');
        }, 100 + (index * 100));
        
        // Add scroll listener to detect when card should exit
        window.addEventListener('scroll', () => {
            const rect = card.getBoundingClientRect();
            
            // If the card is above the viewport, animate it out to the left
            if (rect.bottom < 0) {
                card.classList.add('animate-out');
            } else {
                card.classList.remove('animate-out');
            }
        });
    });
}

// Create and setup the reviews section with RTL animation
function createReviewsWithRTLAnimation() {
    const reviewsSection = document.querySelector('.reviews-section');
    if (!reviewsSection) return;
    
    // Clear existing content
    const existingContent = reviewsSection.innerHTML;
    reviewsSection.innerHTML = '';
    
    // Create active reviews container with RTL animation
    const activeReviewsSection = document.createElement('div');
    activeReviewsSection.className = 'active-reviews-section';
    
    // Create container for RTL animation
    const activeReviewsContainer = document.createElement('div');
    activeReviewsContainer.className = 'active-reviews-container';
    
    // Add review cards
    const reviews = [
        {
            name: 'A',
            fullName: 'Awesome Pye',
            date: 'April 17, 2024',
            content: 'He had helped us with our combat system and even tweaked it a little bit for us. Prec what he did and I will for sure hire him again in the future.',
            rating: 5
        },
        {
            name: 'CA',
            fullName: 'Cameron',
            date: 'July 5, 2024',
            content: 'Great to work with, definitely knows his stuff and very professional. Good speed and great communication. Would highly recommend him for any of your scripting needs.',
            rating: 5
        },
        {
            name: 'CS',
            fullName: 'CFM_SAJ',
            date: 'September 28, 2024',
            content: 'First and foremost, professionalism is what retained me. The swift responses gave me hope. And the reassurance helped me to trust and rest till the project was completed in 24 hours. I commissioned a currency system merge with my existing features and a new shop system, and Kool Kid Developer delivered on it. I would 100% suggest it.',
            rating: 5
        },
        {
            name: 'BO',
            fullName: 'Boobah',
            date: 'July 3, 2024',
            content: 'Glad I hired him, great to work with and is excited to see my game release which brings me further joy in having him contribute to my game, would 100% recommend.',
            rating: 4.5
        }
    ];
    
    // Create review cards
    reviews.forEach(review => {
        const card = createReviewCard(review);
        activeReviewsContainer.appendChild(card);
    });
    
    // Clone the first two cards to create a seamless loop
    reviews.slice(0, 2).forEach(review => {
        const card = createReviewCard(review);
        activeReviewsContainer.appendChild(card);
    });
    
    // Add container to section
    activeReviewsSection.appendChild(activeReviewsContainer);
    
    // Add section to reviews section
    reviewsSection.appendChild(activeReviewsSection);
    
    // Pause animation on hover
    activeReviewsContainer.addEventListener('mouseenter', () => {
        activeReviewsContainer.style.animationPlayState = 'paused';
    });
    
    activeReviewsContainer.addEventListener('mouseleave', () => {
        activeReviewsContainer.style.animationPlayState = 'running';
    });
}

// Create a review card from review data
function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'active-review-card';
    
    // Add loading circle animation
    const loadingCircle = document.createElement('div');
    loadingCircle.className = 'loading-circle';
    card.appendChild(loadingCircle);
    
    // Reviewer header
    const reviewerHeader = document.createElement('div');
    reviewerHeader.className = 'reviewer-header';
    
    // Reviewer avatar
    const reviewerAvatar = document.createElement('div');
    reviewerAvatar.className = 'reviewer-avatar';
    reviewerAvatar.textContent = review.name;
    
    // Reviewer info
    const reviewerInfo = document.createElement('div');
    reviewerInfo.className = 'reviewer-info';
    
    const reviewerName = document.createElement('h3');
    reviewerName.textContent = review.fullName;
    
    const reviewDate = document.createElement('p');
    reviewDate.textContent = `Reviewed on ${review.date}`;
    
    reviewerInfo.appendChild(reviewerName);
    reviewerInfo.appendChild(reviewDate);
    
    reviewerHeader.appendChild(reviewerAvatar);
    reviewerHeader.appendChild(reviewerInfo);
    
    // Review content
    const reviewContent = document.createElement('p');
    reviewContent.className = 'navy-review-content';
    reviewContent.textContent = `"${review.content}"`;
    
    // Add all elements to card
    card.appendChild(reviewerHeader);
    card.appendChild(reviewContent);
    
    return card;
}

// Setup card exit animations
function setupCardExitAnimations() {
    // Get all cards that should have the exit animation
    const cards = document.querySelectorAll('.card-with-rtl-anim');
    
    // Add scroll listener to check for exit animations
    window.addEventListener('scroll', () => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // If card is above the viewport, add exit animation
            if (rect.bottom < 0) {
                card.classList.add('animate-out');
            }
            // If card is below the viewport, add entry animation
            else if (rect.top > windowHeight) {
                card.classList.add('animate-in');
            }
            // If card is in the viewport, remove animations
            else {
                card.classList.remove('animate-out');
                card.classList.remove('animate-in');
            }
        });
    });
    
    // Force initial animation check
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
}

// Add RTL animations to specific sections
function addRTLToSection(sectionSelector, cardSelector) {
    const section = document.querySelector(sectionSelector);
    if (!section) return;
    
    // Create RTL scroll section
    const rtlSection = document.createElement('div');
    rtlSection.className = 'rtl-scroll-section';
    
    // Create inner container for animation
    const rtlInner = document.createElement('div');
    rtlInner.className = 'rtl-inner';
    
    // Get all cards in the section
    const cards = section.querySelectorAll(cardSelector);
    if (cards.length === 0) return;
    
    // Move cards to the RTL container
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        rtlInner.appendChild(clone);
    });
    
    // Clone cards for seamless loop
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        rtlInner.appendChild(clone);
    });
    
    // Add the inner container to the RTL section
    rtlSection.appendChild(rtlInner);
    
    // Replace the original section with the RTL section
    section.parentNode.replaceChild(rtlSection, section);
}

// Force all cards to use RTL animation
function forceRTLAnimation() {
    // Get all cards
    const cards = document.querySelectorAll('.offer-card, .portfolio-item, .marketplace-item, .review-card');
    
    // Add RTL animation class to all cards
    cards.forEach((card, index) => {
        // Add the animation class
        card.classList.add('card-rtl');
        
        // Stagger animations
        setTimeout(() => {
            card.classList.add('active');
        }, index * 100);
        
        // Setup exit and entry animations
        window.addEventListener('scroll', () => {
            const rect = card.getBoundingClientRect();
            
            if (rect.bottom < 0) {
                // Card has exited the top of the viewport
                card.classList.add('exit');
                card.classList.remove('active');
            } else if (rect.top > window.innerHeight) {
                // Card is below the viewport
                card.classList.add('enter');
                card.classList.remove('active');
            } else {
                // Card is in the viewport
                card.classList.remove('exit');
                card.classList.remove('enter');
                card.classList.add('active');
            }
        });
    });
}