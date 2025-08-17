/**
 * Navbar Scroll Effect
 * - Hides navbar when scrolling down
 * - Shows navbar when scrolling up
 * - Adjusts shadow based on scroll position
 */
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // At the top of the page
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down - hide navbar
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up - show navbar
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    }
    
    lastScroll = currentScroll;
});

/**
 * Mobile Menu Functionality
 * - Toggles mobile menu visibility
 * - Animates hamburger icon to close icon
 */
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Toggle between hamburger and close icons
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

/**
 * Close Mobile Menu When Clicking Outside
 * - Improves user experience by closing menu when clicking elsewhere
 * - Resets menu icon state
 */
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    }
});

/**
 * Smooth Scroll Navigation
 * - Enables smooth scrolling to sections
 * - Accounts for fixed header offset
 * - Closes mobile menu after navigation
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80; // Height of fixed header
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Service Cards Animation
 * - Uses Intersection Observer for scroll-based animations
 * - Applies staggered reveal effect
 * - Cards fade in and slide up when scrolled into view
 */
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply staggered animations with 0.2s delay between each card
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.2}s`;
    observer.observe(card);
});

/**
 * Form Enhancement
 * - Adds loading state to form submission
 * - Improves user feedback
 */
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Reset button after form submission (handled by FormSubmit)
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }, 3000);
    });
}

/**
 * Testimonials Carousel
 * - Auto-rotating testimonials for better engagement
 * - Smooth transitions between testimonials
 */
function initTestimonialsCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length === 0) return;

    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.opacity = i === index ? '1' : '0.3';
            testimonial.style.transform = i === index ? 'scale(1)' : 'scale(0.95)';
        });
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }

    // Initialize first testimonial
    showTestimonial(0);
    
    // Auto-rotate every 5 seconds
    setInterval(nextTestimonial, 5000);
}

/**
 * Portfolio Animation
 * - Staggered animation for portfolio items
 * - Intersection observer for scroll-based reveals
 */
function initPortfolioAnimations() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });

    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        portfolioObserver.observe(item);
    });
}

/**
 * Team Member Hover Effects
 * - Enhanced hover animations for team members
 * - Skill tag animations
 */
function initTeamAnimations() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        const skills = member.querySelectorAll('.skill-tag');
        
        member.addEventListener('mouseenter', () => {
            skills.forEach((skill, index) => {
                setTimeout(() => {
                    skill.style.transform = 'scale(1.1)';
                    skill.style.background = 'var(--gradient)';
                    skill.style.color = 'var(--white)';
                }, index * 100);
            });
        });
        
        member.addEventListener('mouseleave', () => {
            skills.forEach(skill => {
                skill.style.transform = 'scale(1)';
                skill.style.background = 'var(--white)';
                skill.style.color = 'var(--primary-color)';
            });
        });
    });
}

/**
 * Smooth Scroll Enhancement
 * - Improved scroll behavior for new sections
 * - Active navigation highlighting
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
}

/**
 * Performance Optimization
 * - Lazy loading for images
 * - Debounced scroll events
 */
function initPerformanceOptimizations() {
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debouncing to scroll events
    const debouncedScroll = debounce(() => {
        // Scroll-based animations and updates
    }, 16); // ~60fps
    
    window.addEventListener('scroll', debouncedScroll);
}

/**
 * Cookie Consent Management
 * - Handles cookie consent banner
 * - Stores user preferences
 * - Manages analytics tracking
 */
function initCookieConsent() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');
    
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent && cookieBanner) {
        // Show banner after 2 seconds
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 2000);
    }
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.remove('show');
            
            // Enable analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
            }
        });
    }
    
    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.classList.remove('show');
            
            // Disable analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('consent', 'update', {
                    'analytics_storage': 'denied'
                });
            }
        });
    }
}

/**
 * Initialize all enhanced features
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing features
    initTestimonialsCarousel();
    initPortfolioAnimations();
    initTeamAnimations();
    initSmoothScroll();
    initPerformanceOptimizations();
    initCookieConsent(); // Initialize cookie consent
    
    // Add loading animation to stats
    const stats = document.querySelectorAll('.stat h3');
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue);
        let currentValue = 0;
        const increment = numericValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                currentValue = numericValue;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(currentValue) + '+';
        }, 30);
    });

    // Add smooth reveal animation to about section
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });

        aboutSection.style.opacity = '0';
        aboutSection.style.transform = 'translateY(50px)';
        aboutSection.style.transition = 'all 0.8s ease';
        aboutObserver.observe(aboutSection);
    }
}); 