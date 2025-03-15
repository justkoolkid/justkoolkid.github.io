// Reviews animation with right-to-left blur fade effect

document.addEventListener('DOMContentLoaded', function() {
    // Initialize reviews carousel
    initReviewsCarousel();
    
    // Duplicate review cards for infinite carousel effect
    duplicateReviewsForInfiniteScroll();
    
    // Setup the testimonials section with dynamic animations
    setupTestimonialsCarousel();
});

// Initialize reviews carousel with blur effect
function initReviewsCarousel() {
    const reviewsSection = document.querySelector('.reviews-section');
    
    if (!reviewsSection) return;
    
    // Convert reviews section to carousel
    reviewsSection.classList.add('reviews-carousel');
    
    // Get all review cards
    const reviewCards = reviewsSection.querySelectorAll('.review-card');
    
    if (reviewCards.length < 2) return;
    
    // Create carousel wrapper
    const carouselTrack = document.createElement('div');
    carouselTrack.className = 'reviews-carousel-inner';
    
    // Move review cards to track
    reviewCards.forEach(card => {
        reviewsSection.removeChild(card);
        carouselTrack.appendChild(card);
        
        // Add animation classes for hover effect
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });
    
    // Add carousel track to reviews section
    reviewsSection.appendChild(carouselTrack);
    
    // Create navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-btn prev';
    prevButton.innerHTML = '<span data-lucide="chevron-left"></span>';
    
    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-btn next';
    nextButton.innerHTML = '<span data-lucide="chevron-right"></span>';
    
    reviewsSection.appendChild(prevButton);
    reviewsSection.appendChild(nextButton);
    
    // Initialize lucide icons for buttons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Handle carousel navigation
    let currentIndex = 0;
    const totalCards = reviewCards.length;
    
    // Update carousel position
    function updateCarousel() {
        const cardWidth = reviewCards[0].offsetWidth + 20; // include margin
        carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    
    // Navigate to previous card with blur effect
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            // Apply exit animation to current card
            reviewCards[currentIndex].classList.add('transitioning-left');
            
            setTimeout(() => {
                currentIndex--;
                updateCarousel();
                
                // Reset animation classes
                reviewCards.forEach(card => {
                    card.classList.remove('transitioning-left');
                    card.classList.remove('transitioning-right');
                });
                
                // Apply entry animation to new current card
                reviewCards[currentIndex].classList.add('transitioning-right');
            }, 400);
        }
    });
    
    // Navigate to next card with blur effect
    nextButton.addEventListener('click', () => {
        if (currentIndex < totalCards - 1) {
            // Apply exit animation to current card
            reviewCards[currentIndex].classList.add('transitioning-left');
            
            setTimeout(() => {
                currentIndex++;
                updateCarousel();
                
                // Reset animation classes
                reviewCards.forEach(card => {
                    card.classList.remove('transitioning-left');
                    card.classList.remove('transitioning-right');
                });
                
                // Apply entry animation to new current card
                reviewCards[currentIndex].classList.add('transitioning-right');
            }, 400);
        }
    });
    
    // Initialize auto-scroll with blur effect
    let autoScrollInterval;
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (currentIndex < totalCards - 1) {
                reviewCards[currentIndex].classList.add('transitioning-left');
                
                setTimeout(() => {
                    currentIndex++;
                    updateCarousel();
                    
                    reviewCards.forEach(card => {
                        card.classList.remove('transitioning-left');
                        card.classList.remove('transitioning-right');
                    });
                    
                    reviewCards[currentIndex].classList.add('transitioning-right');
                }, 400);
            } else {
                // Reset to first card with transition
                reviewCards[currentIndex].classList.add('transitioning-left');
                
                setTimeout(() => {
                    currentIndex = 0;
                    updateCarousel();
                    
                    reviewCards.forEach(card => {
                        card.classList.remove('transitioning-left');
                        card.classList.remove('transitioning-right');
                    });
                    
                    reviewCards[currentIndex].classList.add('transitioning-right');
                }, 400);
            }
        }, 5000);
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Start auto-scroll
    startAutoScroll();
    
    // Pause on hover
    reviewsSection.addEventListener('mouseenter', stopAutoScroll);
    reviewsSection.addEventListener('mouseleave', startAutoScroll);
}

// Duplicate review cards for infinite scrolling effect
function duplicateReviewsForInfiniteScroll() {
    const reviewsSection = document.querySelector('.reviews-section');
    
    if (!reviewsSection || reviewsSection.classList.contains('reviews-carousel')) return;
    
    // Create new container for infinite scroll
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'reviews-slider';
    
    // Create track for the sliding animation
    const sliderTrack = document.createElement('div');
    sliderTrack.className = 'reviews-track';
    
    // Get all review cards
    const originalCards = reviewsSection.querySelectorAll('.review-card');
    
    if (originalCards.length === 0) return;
    
    // Clone cards and add to track for infinite scroll effect
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        reviewsSection.removeChild(card);
        sliderTrack.appendChild(card);
        sliderTrack.appendChild(clone);
    });
    
    // Add more clones to ensure smooth infinite scroll
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        sliderTrack.appendChild(clone);
    });
    
    // Add track to container
    sliderContainer.appendChild(sliderTrack);
    
    // Add container to section
    reviewsSection.appendChild(sliderContainer);
    
    // Add event listener to pause animation on hover
    sliderTrack.addEventListener('mouseenter', () => {
        sliderTrack.style.animationPlayState = 'paused';
    });
    
    sliderTrack.addEventListener('mouseleave', () => {
        sliderTrack.style.animationPlayState = 'running';
    });
}

// Setup testimonials carousel with dynamic animations
function setupTestimonialsCarousel() {
    // Create testimonials section based on reviews data
    createTestimonialsCarousel();
    
    // Add right-to-left exit animations for cards
    addRTLAnimationToCards();
}

// Create testimonials carousel from review data
function createTestimonialsCarousel() {
    const reviewsSection = document.querySelector('.reviews-section');
    const testimonialsContainer = document.querySelector('.testimonials-container');
    
    if (!reviewsSection || testimonialsContainer) return;
    
    // Create container for testimonials
    const container = document.createElement('div');
    container.className = 'testimonial-carousel';
    
    // Create track for continuous animation
    const track = document.createElement('div');
    track.className = 'testimonial-track continuous-slider-track';
    
    // Get testimonial data
    const testimonials = [
        {
            name: "CFM_SAJ",
            date: "September 28, 2024",
            rating: 5,
            content: "First and foremost, professionalism is what retained me. The swift responses gave me hope. And the reassurance helped me to trust and rest till the project was completed in 24 hours. I commissioned a currency system merge with my existing features and a new shop system, and Kool Kid Developer delivered on it. I would 100% suggest it."
        },
        {
            name: "Cameron",
            date: "July 5, 2024",
            rating: 5,
            content: "Great to work with, definitely knows his stuff and very professional. Good speed and great communication. Would highly recommend him for any of your scripting needs."
        },
        {
            name: "Boobah",
            date: "July 3, 2024",
            rating: 4.5,
            content: "Glad I hired him, great to work with and is excited to see my game release which brings me further joy in having him contribute to my game, would 100% recommend."
        },
        {
            name: "Awesome Pye",
            date: "April 17, 2024",
            rating: 5,
            content: "He had helped us with our combat system and even tweaked it a little bit for us. Prec what he did and I will for sure hire him again in the future."
        }
    ];
    
    // Create testimonial cards with blur exit animation
    testimonials.forEach(testimonial => {
        const card = createTestimonialCard(testimonial);
        track.appendChild(card);
    });
    
    // Clone cards for continuous loop
    testimonials.forEach(testimonial => {
        const card = createTestimonialCard(testimonial);
        track.appendChild(card);
    });
    
    // Add track to container
    container.appendChild(track);
    
    // Add container after reviews section
    reviewsSection.parentNode.insertBefore(container, reviewsSection.nextSibling);
    
    // Initialize hover effects
    initializeCardHoverEffects();
}

// Create testimonial card
function createTestimonialCard(testimonial) {
    const card = document.createElement('div');
    card.className = 'testimonial-card continuous-slider-item card-animate-rtl';
    
    // Create card content
    const header = document.createElement('div');
    header.className = 'testimonial-header';
    
    // Reviewer info
    const reviewer = document.createElement('div');
    reviewer.className = 'reviewer';
    
    const icon = document.createElement('div');
    icon.className = 'reviewer-icon';
    
    // Set first two letters of name as icon text
    const initials = testimonial.name.split(' ').map(word => word[0]).slice(0, 2).join('');
    icon.textContent = initials;
    
    const info = document.createElement('div');
    info.className = 'reviewer-info';
    
    const name = document.createElement('h4');
    name.textContent = testimonial.name;
    
    const date = document.createElement('p');
    date.textContent = `Reviewed on ${testimonial.date}`;
    
    info.appendChild(name);
    info.appendChild(date);
    
    reviewer.appendChild(icon);
    reviewer.appendChild(info);
    
    header.appendChild(reviewer);
    
    // Rating stars
    const ratingContainer = document.createElement('div');
    ratingContainer.className = 'review-rating-container';
    
    const ratingBg = document.createElement('div');
    ratingBg.className = 'review-rating-bg';
    
    const ratingFg = document.createElement('div');
    ratingFg.className = 'review-rating-fg';
    
    // Create 5 stars
    for (let i = 0; i < 5; i++) {
        const starBg = document.createElement('i');
        starBg.setAttribute('data-lucide', 'star');
        ratingBg.appendChild(starBg);
        
        const starFg = document.createElement('i');
        starFg.setAttribute('data-lucide', 'star');
        ratingFg.appendChild(starFg);
    }
    
    ratingContainer.appendChild(ratingBg);
    ratingContainer.appendChild(ratingFg);
    
    // Set the width of the foreground container based on rating
    ratingFg.style.width = `${(testimonial.rating / 5) * 100}%`;
    
    // Review text
    const text = document.createElement('p');
    text.className = 'review-text';
    text.textContent = `"${testimonial.content}"`;
    
    // Assemble card
    card.appendChild(header);
    card.appendChild(ratingContainer);
    card.appendChild(text);
    
    return card;
}

// Initialize card hover effects
function initializeCardHoverEffects() {
    const cards = document.querySelectorAll('.card-animate-rtl');
    
    cards.forEach(card => {
        // Reveal card when in viewport
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                    
                    // Setup exit animation for the card
                    setupExitAnimation(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });
}

// Setup exit animation for cards
function setupExitAnimation(card) {
    // Create scroll observer for exit animation
    const exitObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && entry.boundingClientRect.x < 0) {
                // Card has scrolled off to the left
                entry.target.classList.add('exit');
                exitObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0 });
    
    exitObserver.observe(card);
}

// Add right-to-left animation to all cards
function addRTLAnimationToCards() {
    // Get all cards that should have the RTL animation
    const cards = document.querySelectorAll('.offer-card, .portfolio-item, .marketplace-item');
    
    cards.forEach(card => {
        // Add the RTL animation class
        card.classList.add('card-animate-rtl');
        
        // Reveal card when in viewport
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Set up the exit animation when it leaves viewport
                    const exitObserver = new IntersectionObserver(exitEntries => {
                        exitEntries.forEach(exitEntry => {
                            if (!exitEntry.isIntersecting) {
                                exitEntry.target.classList.add('exit');
                                exitObserver.unobserve(exitEntry.target);
                            }
                        });
                    }, { threshold: 0 });
                    
                    exitObserver.observe(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });
}