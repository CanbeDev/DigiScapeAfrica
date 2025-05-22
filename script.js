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