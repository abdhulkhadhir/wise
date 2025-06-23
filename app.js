// Enhanced navigation and interactive functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkElements = document.querySelectorAll('.nav-link');

    // Navbar scroll effect with enhanced styling
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle with improved animation
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Enhanced hamburger menu animation
        const spans = navToggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    navLinkElements.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Enhanced smooth scrolling for navigation links
    navLinkElements.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting with improved detection
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 120;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinkElements.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', throttleScroll(highlightNavigation));
    highlightNavigation(); // Call once on load

    // Enhanced Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const animatedElements = document.querySelectorAll(
        '.stat-card, .objective-item, .team-member, .problem-stats, .solution-benefits, .phase-card, .infographic-img'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Enhanced stagger animations
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    const objectiveItems = document.querySelectorAll('.objective-item');
    objectiveItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.3}s`;
    });

    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.animationDelay = `${index * 0.1}s`;
    });

    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Enhanced parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-bg-img');
    
    if (hero && heroBackground) {
        window.addEventListener('scroll', throttleScroll(function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            heroBackground.style.transform = `translateY(${rate}px)`;
        }));
    }

    // Enhanced counter animation for statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = counter.textContent;
            const isMonetary = target.includes('$');
            let numericValue;
            
            if (isMonetary) {
                numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
            } else {
                numericValue = parseInt(target.replace(/[^0-9]/g, ''));
            }
            
            if (!isNaN(numericValue)) {
                let current = 0;
                const increment = numericValue / 60; // Slower animation
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        current = numericValue;
                        clearInterval(timer);
                    }
                    
                    if (isMonetary) {
                        counter.textContent = `$${current.toFixed(2)}M`;
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 50);
            }
        });
    }

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        statsObserver.observe(statsSection);
    }

    // Current phase pulse animation
    const currentPhaseCard = document.querySelector('.phase-card.current');
    if (currentPhaseCard) {
        setInterval(() => {
            currentPhaseCard.style.boxShadow = '0 0 30px rgba(255, 107, 53, 0.6)';
            setTimeout(() => {
                currentPhaseCard.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)';
            }, 1000);
        }, 3000);
    }

    // Survey button interaction tracking
    const surveyButtons = document.querySelectorAll('a[href*="qsurvey.qut.edu.au"]');
    surveyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Log interaction (for analytics if needed)
            console.log('Survey link clicked');
        });
    });

    // Enhanced image loading with fade-in effect
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease-in-out';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            this.style.display = 'none';
        });
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Infographic hover effects
    const infographics = document.querySelectorAll('.infographic-img');
    infographics.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Enhanced loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger hero animations after load
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Enhanced external links handling
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="mailto"]');
    externalLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('http')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Add external link indicator
            link.style.position = 'relative';
            link.addEventListener('mouseenter', function() {
                this.setAttribute('title', 'Opens in new tab');
            });
        }
    });

    // Enhanced focus styles for accessibility
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #00407a';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Scroll to top functionality
    function createScrollToTopButton() {
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '↑';
        scrollButton.className = 'scroll-to-top';
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #00407a;
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;
        
        document.body.appendChild(scrollButton);
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollButton.style.opacity = '1';
                scrollButton.style.transform = 'translateY(0)';
            } else {
                scrollButton.style.opacity = '0';
                scrollButton.style.transform = 'translateY(10px)';
            }
        });
        
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        scrollButton.addEventListener('mouseenter', function() {
            this.style.background = '#005591';
            this.style.transform = 'translateY(-2px) scale(1.1)';
        });
        
        scrollButton.addEventListener('mouseleave', function() {
            this.style.background = '#00407a';
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
    
    createScrollToTopButton();

    // Performance optimization: Throttle scroll events
    function throttleScroll(callback) {
        let ticking = false;
        return function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    callback();
                    ticking = false;
                });
                ticking = true;
            }
        };
    }

    // Enhanced section reveal animations
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Animate child elements with stagger
                const children = entry.target.querySelectorAll('.fade-in');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });

    // Observe all main sections
    const mainSections = document.querySelectorAll('section');
    mainSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Current phase blinking indicator
    const phaseIndicator = document.querySelector('.phase-indicator');
    if (phaseIndicator) {
        setInterval(() => {
            phaseIndicator.style.animation = 'pulse 1s ease-in-out';
            setTimeout(() => {
                phaseIndicator.style.animation = '';
            }, 1000);
        }, 5000);
    }

    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
        }
        
        .section-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero-content > * {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        
        .scroll-to-top:focus {
            outline: 2px solid white;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);

    // Statistics emphasis on scroll
    const statCards = document.querySelectorAll('.stat-card');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'emphasis 2s ease-out';
                setTimeout(() => {
                    entry.target.style.animation = '';
                }, 2000);
            }
        });
    }, { threshold: 0.8 });

    statCards.forEach(card => {
        statsObserver.observe(card);
    });

    // Add emphasis animation
    const emphasisStyle = document.createElement('style');
    emphasisStyle.textContent = `
        @keyframes emphasis {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); box-shadow: 0 8px 25px rgba(255, 235, 59, 0.3); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(emphasisStyle);

    // Survey engagement tracking
    let surveyPromptShown = false;
    const surveyPromptObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !surveyPromptShown) {
                surveyPromptShown = true;
                // Highlight survey section
                const surveySection = document.querySelector('.survey-section');
                if (surveySection) {
                    surveySection.style.animation = 'highlight-survey 3s ease-in-out';
                }
            }
        });
    }, { threshold: 0.5 });

    const surveySection = document.querySelector('.survey-section');
    if (surveySection) {
        surveyPromptObserver.observe(surveySection);
    }

    // Add survey highlight animation
    const surveyStyle = document.createElement('style');
    surveyStyle.textContent = `
        @keyframes highlight-survey {
            0% { box-shadow: none; }
            50% { box-shadow: inset 0 0 0 4px rgba(255, 107, 53, 0.6); }
            100% { box-shadow: none; }
        }
    `;
    document.head.appendChild(surveyStyle);

    console.log('WiSe website enhanced functionality loaded successfully');
});