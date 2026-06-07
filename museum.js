/**
 * Nithya's Universe - Museum Hub Scripts
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Twinkling Star Generation
    const starrySky = document.getElementById('starry-sky');
    const starCount = 60;
    
    if (starrySky) {
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random properties
            const x = Math.random() * 100; // %
            const y = Math.random() * 100; // %
            const size = Math.random() * 3 + 1; // px
            const delay = Math.random() * 5; // seconds
            const duration = Math.random() * 3 + 2; // seconds
            
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDelay = `${delay}s`;
            star.style.animationDuration = `${duration}s`;
            
            starrySky.appendChild(star);
        }
    }
    // 2. Parallax Scroll Effect
    window.addEventListener('scroll', () => {
        const scrollVal = window.scrollY;
        
        // Parallax stars
        if (starrySky) {
            starrySky.style.transform = `translateY(${scrollVal * 0.3}px)`;
        }
        
        // Parallax Avatar & Hero Content
        const heroAvatar = document.querySelector('.hero-avatar');
        const avatarRing = document.querySelector('.avatar-ring');
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        if (heroAvatar) {
            heroAvatar.style.transform = `translateY(${scrollVal * 0.15}px)`;
        }
        if (avatarRing) {
            avatarRing.style.transform = `translateY(${scrollVal * 0.12}px) rotate(${scrollVal * 0.05}deg)`;
        }
        if (heroTitle) {
            heroTitle.style.transform = `translateY(${scrollVal * 0.08}px)`;
        }
        if (heroSubtitle) {
            heroSubtitle.style.transform = `translateY(${scrollVal * 0.05}px)`;
        }
    });
    // 3. Staggered card entry delay
    const cards = document.querySelectorAll('.museum-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});
