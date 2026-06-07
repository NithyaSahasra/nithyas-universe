/**
 * Nithya's Universe - Achievements Scripts
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Default achievements
    const defaultAchievements = [
        {
            id: 1,
            title: "Mastered Javascript",
            date: "April 2026",
            img: "images/trophy1.png",
            desc: "Successfully completed deep vanilla JS engineering masterclass. Built dynamic engines, particle streams, and local storage systems."
        },
        {
            id: 2,
            title: "First Hackathon Win",
            date: "May 2026",
            img: "images/trophy2.png",
            desc: "Awarded 1st place in the Creative Web Design hackathon! Built a beautiful interactive scrapbook site in under 24 hours."
        },
        {
            id: 3,
            title: "Lead Project Designer",
            date: "June 2026",
            img: "images/trophy1.png",
            desc: "Designed the full user-experience layout, custom pink gradient schemes, and particle layers for Nithya's Universe."
        },
        {
            id: 4,
            title: "Data Science Scholar",
            date: "May 2026",
            img: "images/trophy2.png",
            desc: "Scored top marks in Advanced Neural Network modelling. Programmed custom transformers and ML data pipelines."
        }
    ];
    // Load from localStorage
    function getAchievements() {
        const stored = localStorage.getItem('nithya_achievements');
        if (!stored) {
            localStorage.setItem('nithya_achievements', JSON.stringify(defaultAchievements));
            return defaultAchievements;
        }
        return JSON.parse(stored);
    }
    // Save to localStorage
    function saveAchievements(achievements) {
        localStorage.setItem('nithya_achievements', JSON.stringify(achievements));
    }
    // Elements
    const shelf1 = document.getElementById('shelf-1-grid');
    const shelf2 = document.getElementById('shelf-2-grid');
    const modal = document.getElementById('add-trophy-modal');
    const openBtn = document.getElementById('open-add-trophy');
    const closeBtn = document.getElementById('close-trophy-modal');
    const form = document.getElementById('add-trophy-form');
    // 2. Render Achievements
    function renderAchievements() {
        shelf1.innerHTML = '';
        shelf2.innerHTML = '';
        const list = getAchievements();
        list.forEach((ach, index) => {
            const card = document.createElement('div');
            card.className = 'trophy-card reveal';
            card.style.animationDelay = `${index * 0.15}s`;
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <img src="${ach.img}" alt="Trophy" class="trophy-img">
                        <h3 class="trophy-title">${ach.title}</h3>
                    </div>
                    <div class="card-back">
                        <h3 class="trophy-back-title">${ach.title}</h3>
                        <span class="trophy-date">${ach.date}</span>
                        <p class="trophy-desc">${ach.desc}</p>
                    </div>
                </div>
            `;
            // Flip and trigger confetti on click
            card.addEventListener('click', () => {
                const isFlipped = card.classList.contains('flipped');
                
                // Flip card
                card.classList.toggle('flipped');
                
                // If flipping to back, blow confetti!
                if (!isFlipped) {
                    triggerConfetti();
                }
            });
            // Distribute on Shelf 1 and Shelf 2
            if (index % 2 === 0) {
                shelf1.appendChild(card);
            } else {
                shelf2.appendChild(card);
            }
        });
    }
    // 3. Modal event handlers
    openBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    // 4. Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const list = getAchievements();
        const newAch = {
            id: Date.now(),
            title: document.getElementById('tro-title').value.trim(),
            date: document.getElementById('tro-date').value.trim(),
            img: document.getElementById('tro-type').value,
            desc: document.getElementById('tro-desc').value.trim()
        };
        list.push(newAch);
        saveAchievements(list);
        renderAchievements();
        // Trigger massive congratulations confetti
        triggerConfetti(200);
        // Reset and close
        form.reset();
        modal.classList.remove('active');
    });
    // 5. Confetti Canvas Particles Engine
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let confetti = [];
    const colors = ['#FFD6E8', '#FFC2DC', '#FF9CC5', '#FF73AF', '#FFF5F8', '#FFD700']; // Pink hues + Gold
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    class ConfettiParticle {
        constructor(x, y) {
            this.x = x || Math.random() * canvas.width;
            this.y = y || Math.random() * canvas.height - 20;
            this.size = Math.random() * 8 + 4;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speedX = (Math.random() - 0.5) * 8;
            this.speedY = Math.random() * -6 - 2; // shoot up
            this.gravity = 0.15;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 5;
            this.opacity = 1;
        }
        update() {
            this.speedY += this.gravity;
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
            if (this.y > canvas.height) {
                this.opacity = 0;
            }
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            
            // Draw rectangle or circle
            if (Math.random() > 0.5) {
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.restore();
        }
    }
    function triggerConfetti(count = 100) {
        // Spawn confetti from mid-bottom/center
        const startX = canvas.width / 2;
        const startY = canvas.height * 0.8;
        
        for (let i = 0; i < count; i++) {
            const p = new ConfettiParticle(startX, startY);
            // Give them more sideways dispersion
            p.speedX = (Math.random() - 0.5) * 15;
            p.speedY = Math.random() * -12 - 5;
            confetti.push(p);
        }
    }
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach((p, index) => {
            p.update();
            p.draw();
            if (p.opacity <= 0) {
                confetti.splice(index, 1);
            }
        });
        requestAnimationFrame(animateConfetti);
    }
    // Start Confetti loop
    animateConfetti();
    // Initial load
    renderAchievements();
});
