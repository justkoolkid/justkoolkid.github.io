document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const navLinks = document.querySelector('.nav-links');
    const mainNav = document.querySelector('.main-nav');
    
    if (mainNav && navLinks) {
        mainNav.insertBefore(menuToggle, navLinks);
        
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update active link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Hide mobile menu after click
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Highlight active menu item based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Update clock
    function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const timeString = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
        
        const timeElement = document.querySelector('.time');
        if (timeElement) {
            timeElement.textContent = timeString;
        }
        
        // Update clock hands
        const hourHand = document.querySelector('.hour-hand');
        const minuteHand = document.querySelector('.minute-hand');
        const secondHand = document.querySelector('.second-hand');
        
        if (hourHand && minuteHand && secondHand) {
            const seconds = now.getSeconds();
            
            const secondDegrees = ((seconds / 60) * 360) + 90;
            secondHand.style.transform = `rotate(${secondDegrees}deg)`;
            
            const minuteDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
            minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
            
            const hourDegrees = ((hours % 12 / 12) * 360) + ((minutes / 60) * 30) + 90;
            hourHand.style.transform = `rotate(${hourDegrees}deg)`;
        }
    }
    
    // Initial clock update
    updateClock();
    
    // Update clock every second
    setInterval(updateClock, 1000);
    
    // Add to cart button functionality
    const addToCartButton = document.querySelector('.cart-button');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function() {
            alert('Item added to cart!');
            
            // Update cart icon
            const cartIcon = document.querySelector('.cart-icon a');
            if (cartIcon) {
                cartIcon.innerHTML = '<i class="fas fa-shopping-cart"></i> <span class="cart-count">1</span>';
            }
        });
    }
    
    // Pagination functionality
    const paginationLinks = document.querySelectorAll('.pagination a');
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            paginationLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            if (!this.classList.contains('prev') && !this.classList.contains('next')) {
                this.classList.add('active');
            }
            
            // Here you would typically load new content
            // For demo purposes, we'll just show an alert
            if (this.classList.contains('prev')) {
                alert('Loading previous page...');
            } else if (this.classList.contains('next')) {
                alert('Loading next page...');
            } else {
                alert(`Loading page ${this.textContent}...`);
            }
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Subscription form
    const subscriptionForm = document.querySelector('.subscription-form');
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email === '') {
                alert('Please enter your email address.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            alert('Thank you for subscribing!');
            this.reset();
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Animations on scroll
    const animatedElements = document.querySelectorAll('.section-title, .stat-card, .service-showcase, .offer-card, .portfolio-item, .marketplace-item, .review-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});