// Ensure page starts at top on load
window.addEventListener('load', () => {
    window.scrollTo(0, 0); // Immediate scroll to top
    setTimeout(() => window.scrollTo(0, 0), 0); // Fallback after content renders
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual'; // Prevent browser restoration
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Additional safety: Scroll to top on DOM load
    window.scrollTo(0, 0);

    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Accordion functionality with animation
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = content.classList.contains('active');

            if (isActive) {
                content.classList.remove('active');
            } else {
                document.querySelectorAll('.accordion-content').forEach(item => {
                    item.classList.remove('active');
                });
                content.classList.add('active');
            }
        });
    });

    // Mobile nav toggle
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Trigger timeline animations on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => observer.observe(item));
});