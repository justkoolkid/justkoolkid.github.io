// Advanced animations and interactive elements

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading sequence
    initLoadingSequence();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize GSAP animations
    initGSAPAnimations();
    
    // Initialize 3D card effects
    init3DCards();
    
    // Initialize particle backgrounds
    initParticleBackgrounds();
    
    // Initialize text animations
    initTextAnimations();
    
    // Initialize Three.js background
    initThreeBackground();
    
    // Initialize magnetic buttons
    initMagneticElements();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize microinteractions
    initMicroInteractions();
});

// Advanced loading sequence with stages
function initLoadingSequence() {
    const loader = document.querySelector('.loader-container');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-percentage');
    const letters = document.querySelectorAll('.letter');
    
    if (!loader || !progressFill || !progressText) return;
    
    // Simulate loading stages
    let progress = 0;
    const totalDuration = 3500; // Total loading time in ms
    const interval = 30; // Update interval in ms
    const incrementPerStep = 100 / (totalDuration / interval);
    
    // Start path animation for SVG logo
    // (animation already handled in CSS)
    
    // Animated letters with staggered delay
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.opacity = '1';
            letter.style.transform = 'translateY(0)';
        }, 2000 + index * 100);
    });
    
    // Progress bar animation
    const loadingInterval = setInterval(() => {
        progress += incrementPerStep;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Complete loading sequence after a short delay
            setTimeout(() => {
                // Add class for transition
                loader.classList.add('hidden');
                
                // Start page enter animations
                startPageEnterAnimations();
                
                // Remove loader from DOM after transition
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 600);
            }, 500);
        }
        
        // Update progress bar and text
        progressFill.style.width = `${progress}%`;
        progressText.textContent = Math.round(progress);
    }, interval);
    
    // Initialize particles for the logo
    initLogoParticles();
}

// Initialize particles for the logo
function initLogoParticles() {
    if (!window.particlesJS) return;
    
    particlesJS('logo-particles', {
        "particles": {
            "number": {
                "value": 40,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#e63b2e"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 100,
                "color": "#e63b2e",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 3,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "repulse": {
                    "distance": 70,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });
}

// Start page enter animations after loading
function startPageEnterAnimations() {
    // Animate main content with GSAP
    if (window.gsap) {
        // Hero section animation
        gsap.timeline()
            .from('.hero-content', {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out'
            })
            .from('.nav-links a', {
                opacity: 0,
                y: -20,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.6')
            .from('.social-icons a', {
                opacity: 0,
                scale: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: 'back.out(1.7)'
            }, '-=0.8');
    } else {
        // Fallback if GSAP is not loaded
        document.querySelectorAll('.staggered-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 100);
        });
    }
}

// Custom cursor implementation
function initCustomCursor() {
    // Create cursor elements
    const cursorContainer = document.createElement('div');
    cursorContainer.className = 'cursor-container';
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    
    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    
    cursorContainer.appendChild(cursorDot);
    cursorContainer.appendChild(cursorOutline);
    document.body.appendChild(cursorContainer);
    
    // Trail elements array
    const maxTrails = 10;
    const trails = [];
    
    // Mouse position variables
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    // Check if device is touch-enabled
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
        // Mouse move event
        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Add trail element
            if (trails.length < maxTrails && Math.random() > 0.8) {
                const trail = document.createElement('div');
                trail.className = 'cursor-trail';
                trail.style.left = mouseX + 'px';
                trail.style.top = mouseY + 'px';
                cursorContainer.appendChild(trail);
                
                // Animate and remove trail
                setTimeout(() => {
                    trail.style.opacity = '0';
                    trail.style.transform = 'scale(0.5)';
                    setTimeout(() => {
                        trail.remove();
                        const index = trails.indexOf(trail);
                        if (index > -1) trails.splice(index, 1);
                    }, 300);
                }, 10);
                
                trails.push(trail);
            }
            
            // Check for interactive elements
            const target = e.target;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
                target.classList.contains('interactive') || 
                target.closest('a') || target.closest('button') || 
                target.closest('.interactive')) {
                
                cursorOutline.classList.add('cursor-hover');
            } else {
                cursorOutline.classList.remove('cursor-hover');
            }
        });
        
        // Mouse click effect
        document.addEventListener('mousedown', () => {
            cursorDot.classList.add('cursor-click');
            cursorOutline.classList.add('cursor-click');
        });
        
        document.addEventListener('mouseup', () => {
            cursorDot.classList.remove('cursor-click');
            cursorOutline.classList.remove('cursor-click');
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursorDot.classList.add('cursor-hidden');
            cursorOutline.classList.add('cursor-hidden');
        });
        
        document.addEventListener('mouseenter', () => {
            cursorDot.classList.remove('cursor-hidden');
            cursorOutline.classList.remove('cursor-hidden');
        });
        
        // Cursor animation loop
        function animateCursor() {
            // Smooth cursor movement
            const speed = 0.2;
            
            outlineX += (mouseX - outlineX) * speed;
            outlineY += (mouseY - outlineY) * speed;
            
            // Apply transforms
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
    } else {
        // Hide custom cursor on touch devices
        cursorContainer.style.display = 'none';
    }
}

// Initialize GSAP animations
function initGSAPAnimations() {
    if (!window.gsap || !window.ScrollTrigger) return;
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax effect for hero section
    gsap.to('.hero-section', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        backgroundPosition: '50% 100%',
        ease: 'none'
    });
    
    // Animate section titles
    document.querySelectorAll('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Staggered card animations
    document.querySelectorAll('.staggered-cards').forEach(cardGroup => {
        const cards = cardGroup.querySelectorAll('.staggered-card');
        
        gsap.from(cards, {
            scrollTrigger: {
                trigger: cardGroup,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    // Animate floating elements
    gsap.to('.floating-element', {
        y: '-20px',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.2
    });
}

// Initialize 3D card effects
function init3DCards() {
    // Get all cards with 3D effect
    const cards = document.querySelectorAll('.hover-3d');
    
    cards.forEach(card => {
        // Get shine element
        const shine = card.querySelector('.hover-3d-shine');
        const content = card.querySelector('.hover-3d-content');
        
        // Variables for card tilt
        let rect, mouseX, mouseY, centerX, centerY, rotateX, rotateY;
        
        // Mouse enter event
        card.addEventListener('mouseenter', () => {
            rect = card.getBoundingClientRect();
        });
        
        // Mouse move event
        card.addEventListener('mousemove', e => {
            if (!rect) rect = card.getBoundingClientRect();
            
            // Calculate mouse position relative to card
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            
            // Calculate card center
            centerX = rect.width / 2;
            centerY = rect.height / 2;
            
            // Calculate rotation values
            rotateY = ((mouseX - centerX) / centerX) * 10; // Max 10 degrees
            rotateX = -((mouseY - centerY) / centerY) * 10; // Max 10 degrees
            
            // Apply transform
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Shine effect positioning
            if (shine) {
                const shineX = (mouseX / rect.width) * 100;
                const shineY = (mouseY / rect.height) * 100;
                shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.25), transparent)`;
            }
            
            // Move content based on mouse position
            if (content) {
                content.style.transform = `translateX(${rotateY * 0.5}px) translateY(${rotateX * 0.5}px)`;
            }
        });
        
        // Mouse leave event - reset transforms
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            if (content) content.style.transform = 'translateX(0) translateY(0)';
        });
    });
}

// Initialize particle backgrounds
function initParticleBackgrounds() {
    if (!window.particlesJS) return;
    
    // Check if particle container exists
    const particleContainer = document.querySelector('#particles-js');
    if (!particleContainer) {
        // Create particle container if it doesn't exist
        const container = document.createElement('div');
        container.id = 'particles-js';
        container.className = 'particles-container';
        document.body.prepend(container);
        
        // Initialize particles
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#e63b2e"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.1,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.05,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#e63b2e",
                    "opacity": 0.1,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "repulse": {
                        "distance": 100,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }
}

// Initialize text animations
function initTextAnimations() {
    // Text splitting for animated characters
    const textElements = document.querySelectorAll('.text-split');
    
    textElements.forEach(element => {
        // Split text into characters
        const text = element.textContent;
        element.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            const char = document.createElement('span');
            char.className = 'char';
            char.textContent = text[i] === ' ' ? ' ' : text[i];
            char.style.transitionDelay = `${i * 0.05}s`;
            element.appendChild(char);
        }
        
        // Create observer to animate when in view
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
    
    // Typewriter effect
    const typewriterElements = document.querySelectorAll('.typewriter');
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typewriter when element is in view
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

// Initialize Three.js background
function initThreeBackground() {
    if (!window.THREE) return;
    
    // Check if container already exists
    if (!document.getElementById('three-bg')) {
        // Create Three.js container
        const container = document.createElement('canvas');
        container.id = 'three-bg';
        document.body.prepend(container);
        
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;
        
        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
            canvas: container,
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        
        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = window.innerWidth < 768 ? 1000 : 2000;
        
        const posArray = new Float32Array(particlesCount * 3);
        
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        // Material
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: 0xe63b2e,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
        });
        
        // Particles mesh
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        // Mouse movement effect
        let mouseX = 0;
        let mouseY = 0;
        
        function onMouseMove(event) {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        }
        
        document.addEventListener('mousemove', onMouseMove);
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            // Rotate particles
            particlesMesh.rotation.x += 0.0003;
            particlesMesh.rotation.y += 0.0005;
            
            // Mouse movement effect
            particlesMesh.rotation.x += mouseY * 0.0005;
            particlesMesh.rotation.y += mouseX * 0.0005;
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

// Initialize magnetic buttons
function initMagneticElements() {
    const magneticElements = document.querySelectorAll('.magnetic-button');
    
    magneticElements.forEach(element => {
        const content = element.querySelector('.magnetic-button-content') || element;
        
        // Mouse enter event
        element.addEventListener('mouseenter', () => {
            // Get element dimensions and position
            const rect = element.getBoundingClientRect();
            content._magneticX = rect.left + rect.width / 2;
            content._magneticY = rect.top + rect.height / 2;
            content._magneticWidth = rect.width;
            content._magneticHeight = rect.height;
        });
        
        // Mouse move event for magnetic effect
        element.addEventListener('mousemove', e => {
            if (!content._magneticX || !content._magneticY) return;
            
            // Calculate distance from center
            const deltaX = e.clientX - content._magneticX;
            const deltaY = e.clientY - content._magneticY;
            
            // Calculate distance ratio (0 to 1) from center, with max 0.5
            const distanceX = Math.min(Math.abs(deltaX) / content._magneticWidth, 0.5);
            const distanceY = Math.min(Math.abs(deltaY) / content._magneticHeight, 0.5);
            
            // Calculate movement strength based on distance
            const moveX = deltaX * distanceX * 0.7;
            const moveY = deltaY * distanceY * 0.7;
            
            // Apply transform
            content.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        // Mouse leave - reset position
        element.addEventListener('mouseleave', () => {
            content.style.transform = 'translate(0, 0)';
        });
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    if (!window.gsap || !window.ScrollTrigger) return;
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Horizontal scroll sections
    const horizontalSections = document.querySelectorAll('.horizontal-scroll');
    
    horizontalSections.forEach(section => {
        const items = section.querySelectorAll('.horizontal-item');
        const totalWidth = Array.from(items).reduce((width, item) => width + item.offsetWidth + parseInt(getComputedStyle(item).marginRight), 0);
        
        section.style.width = totalWidth + 'px';
        
        gsap.to(section, {
            x: () => -(totalWidth - window.innerWidth),
            ease: 'none',
            scrollTrigger: {
                trigger: section.parentElement,
                start: 'top top',
                end: `+=${totalWidth}`,
                scrub: true,
                pin: true
            }
        });
    });
    
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-animation');
    
    progressBars.forEach(bar => {
        const fill = bar.querySelector('.progress-animation-fill');
        const widthPercent = bar.getAttribute('data-progress') || '80';
        
        fill.style.setProperty('--progress-width', widthPercent + '%');
        
        ScrollTrigger.create({
            trigger: bar,
            start: 'top 90%',
            onEnter: () => bar.classList.add('animated')
        });
    });
    
    // Counter animations
    const counters = document.querySelectorAll('.counter-animation');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 90%',
            onEnter: () => {
                let count = 0;
                const duration = 2000; // 2 seconds
                const interval = 50; // update every 50ms
                const increment = Math.ceil(target / (duration / interval));
                
                const timer = setInterval(() => {
                    count += increment;
                    
                    if (count >= target) {
                        count = target;
                        clearInterval(timer);
                    }
                    
                    counter.textContent = count.toLocaleString();
                }, interval);
            }
        });
    });
}

// Initialize microinteractions
function initMicroInteractions() {
    // Ripple effect for buttons
    const rippleButtons = document.querySelectorAll('.ripple-effect');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', e => {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            button.appendChild(ripple);
            
            // Position ripple
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            // Remove after animation
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });
    
    // Animated labels for form fields
    const formInputs = document.querySelectorAll('.focus-animation input, .focus-animation textarea');
    
    formInputs.forEach(input => {
        // Create label if it doesn't exist
        if (!input.nextElementSibling || !input.nextElementSibling.tagName === 'LABEL') {
            const label = document.createElement('label');
            label.textContent = input.placeholder || 'Label';
            input.parentNode.insertBefore(label, input.nextSibling);
            
            // Add placeholder that won't display
            input.setAttribute('placeholder', ' ');
        }
        
        // Check initial state
        if (input.value.trim() !== '') {
            input.classList.add('has-value');
        }
        
        // Input events
        input.addEventListener('focus', () => {
            input.classList.add('focus');
        });
        
        input.addEventListener('blur', () => {
            input.classList.remove('focus');
            if (input.value.trim() !== '') {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
        
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    });
}

// Add constellation background
function createConstellation() {
    const container = document.createElement('div');
    container.className = 'constellation-bg';
    document.body.prepend(container);
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    const starCount = Math.min(Math.floor(width * height / 10000), 100);
    const stars = [];
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'constellation-star';
        
        const x = Math.random() * width;
        const y = Math.random() * height;
        
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        
        container.appendChild(star);
        stars.push({ element: star, x, y });
    }
    
    // Create connections between nearby stars
    for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            const star1 = stars[i];
            const star2 = stars[j];
            
            const dx = star1.x - star2.x;
            const dy = star1.y - star2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                const line = document.createElement('div');
                line.className = 'constellation-line';
                
                // Calculate line position and dimensions
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                
                line.style.width = distance + 'px';
                line.style.left = star2.x + 'px';
                line.style.top = star2.y + 'px';
                line.style.transform = `rotate(${angle}deg)`;
                
                container.appendChild(line);
            }
        }
    }
    
    // Add parallax effect
    document.addEventListener('mousemove', e => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        stars.forEach(star => {
            const moveX = (mouseX - width / 2) * 0.01;
            const moveY = (mouseY - height / 2) * 0.01;
            
            star.element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// Run constellation after page load
window.addEventListener('load', createConstellation);