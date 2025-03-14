document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Hire buttons
    const hireButtons = document.querySelectorAll('.hire-btn');
    hireButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Switch to contact tab when hire button is clicked
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            const contactBtn = document.querySelector('[data-tab="contact"]');
            contactBtn.classList.add('active');
            document.getElementById('contact').classList.add('active');
            
            // Scroll to contact form
            document.querySelector('.contact-form').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}); 