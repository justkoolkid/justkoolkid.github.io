document.addEventListener('DOMContentLoaded', function() {
    // Loading animation
    const loader = document.querySelector('.loader-container');
    
    if (loader) {
        // Show loader for a minimum time
        setTimeout(() => {
            loader.classList.add('fade-out');
            
            // Remove loader after animation completes
            setTimeout(() => {
                loader.style.display = 'none';
                
                // Start entrance animations for page content
                document.body.classList.add('content-loaded');
                
                // Trigger animations on initial visible elements
                animateOnScroll();
            }, 500);
        }, 1500);
    }
    
    // Rating animation initialization
    initializeRatingAnimations();
    
    // Floating animation for specific elements
    initializeFloatingElements();
    
    // Scroll-based animations
    window.addEventListener('scroll', function() {
        animateOnScroll();
    });
    
    // Initialize cursor trailer
    initializeCursorTrailer();
});

// Initialize cursor trailer effect
function initializeCursorTrailer() {
    const trailer = document.createElement('div');
    trailer.className = 'cursor-trailer';
    document.body.appendChild(trailer);
    
    // Set initial position off-screen
    trailer.style.left = '-100px';
    trailer.style.top = '-100px';
    
    // Update trailer position on mouse move
    window.addEventListener('mousemove', e => {
        // Smooth trailer following with delay
        anime({
            targets: trailer,
            left: e.clientX + 'px',
            top: e.clientY + 'px',
            duration: 800,
            easing: 'easeOutExpo'
        });
        
        // Check if hovering over interactive elements
        const target = e.target;
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
            target.closest('a') || target.closest('button')) {
            trailer.classList.add('hover');
        } else {
            trailer.classList.remove('hover');
        }
    });
}

// Initialize rating animations
function initializeRatingAnimations() {
    // Hero section stars animation
    const starsContainer = document.querySelector('.stars-foreground');
    if (starsContainer) {
        animateRatingFill(starsContainer, 4.3);
    }
    
    // Review ratings animations
    const reviewRatings = document.querySelectorAll('.review-rating-fg');
    reviewRatings.forEach(rating => {
        // Animate with 5.0 rating (full stars)
        animateRatingFill(rating, 5.0);
    });
}

// Animate rating fill from right to left
function animateRatingFill(container, rating) {
    if (!container) return;
    
    // Set initial width to 0
    container.style.width = '0%';
    
    // Calculate width based on rating (0-5 scale)
    const widthPercent = (rating / 5) * 100;
    
    // Create animation that repeats infinitely
    const animation = container.animate(
        [
            { width: '0%' },
            { width: widthPercent + '%' }
        ],
        {
            duration: 2000,
            iterations: 1,
            fill: 'forwards',
            easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
        }
    );
    
    // Keep the filled state after animation
    animation.onfinish = () => {
        container.style.width = widthPercent + '%';
    };
}

// Initialize floating animations for decorative elements
function initializeFloatingElements() {
    const floatingElements = [
        ...document.querySelectorAll('.offer-icon, .hero-logo, .loader-logo'),
    ];
    
    floatingElements.forEach(element => {
        // Random animation duration between 3-6 seconds
        const duration = 3000 + Math.random() * 3000;
        // Random animation delay
        const delay = Math.random() * 1000;
        
        // Apply floating animation
        element.style.animation = `float ${duration}ms infinite ease-in-out ${delay}ms`;
    });
}

// Trigger animations based on scroll position
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        // Check if element is visible in viewport
        if (elementTop < windowHeight * 0.9 && elementBottom > 0) {
            element.classList.add('animated');
            
            // Apply specific animation based on data attribute
            const animationType = element.getAttribute('data-animation') || 'fade-in';
            element.classList.add(animationType);
        }
    });
    
    // Card staggered animations
    const cardGroups = document.querySelectorAll('.staggered-cards:not(.animated)');
    
    cardGroups.forEach(group => {
        const groupTop = group.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (groupTop < windowHeight * 0.9) {
            group.classList.add('animated');
            
            const cards = group.querySelectorAll('.staggered-card');
            cards.forEach((card, index) => {
                card.style.transitionDelay = `${index * 100}ms`;
                card.classList.add('animate');
            });
        }
    });
}

// Add noise texture effect
function createNoiseTexture() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 300;
    canvas.height = 300;
    
    // Create noise pattern
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        // Random grayscale value with low opacity
        const value = Math.floor(Math.random() * 255);
        data[i] = value;     // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        data[i + 3] = 15;    // Alpha (opacity)
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    // Convert canvas to data URL
    return canvas.toDataURL('image/png');
}

// Create and apply noise overlay
function applyNoiseOverlay() {
    const noiseUrl = createNoiseTexture();
    const noiseOverlay = document.createElement('div');
    noiseOverlay.className = 'noise-overlay';
    noiseOverlay.style.backgroundImage = `url(${noiseUrl})`;
    document.body.appendChild(noiseOverlay);
}

// Apply noise effect to the page
applyNoiseOverlay();