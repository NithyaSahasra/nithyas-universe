/**
 * Nithya's Universe - Future Page (Crystal Palace) Scripts
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Default future visions
    const defaultVisions = [
        "Work at Google as a Lead Data Scientist specializing in neural interfaces. 💻",
        "Publish a web-animation framework that hits 10,000 GitHub stars. ⭐",
        "Give a tech keynote speech in Tokyo during Cherry Blossom season! 🌸",
        "Design a fully immersive virtual reality scrapbook classroom. 🔮",
        "Build a tech startup that merges code, aesthetics, and mental wellness. 💖",
        "Co-author a science-fiction novel about a magical code-based universe. 📖",
        "Mentor 1,000 young girls entering the technology and engineering field. 👭"
    ];
    // Load from localStorage
    function getVisions() {
        const stored = localStorage.getItem('nithya_visions');
        if (!stored) {
            localStorage.setItem('nithya_visions', JSON.stringify(defaultVisions));
            return defaultVisions;
        }
        return JSON.parse(stored);
    }
    // Save to localStorage
    function saveVisions(visions) {
        localStorage.setItem('nithya_visions', JSON.stringify(visions));
    }
    // Elements
    const orbTrigger = document.getElementById('orb-trigger');
    const orbText = document.getElementById('orb-vision-text');
    const visionInput = document.getElementById('vision-input');
    const visionForm = document.getElementById('vision-form');
    
    // 2. Canvas Particles Engine
    const canvas = document.getElementById('magic-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const colors = ['#FFE4EE', '#FFD6E8', '#FFC2DC', '#FF9CC5', '#FF73AF', '#FFF5F8'];
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    class SparkleParticle {
        constructor(x, y, isExplosion = false) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            
            if (isExplosion) {
                // Shoot out in circle
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 8 + 2;
                this.speedX = Math.cos(angle) * speed;
                this.speedY = Math.sin(angle) * speed;
            } else {
                // Slow ambient rise
                this.speedX = (Math.random() - 0.5) * 1.5;
                this.speedY = Math.random() * -1.5 - 0.5;
            }
            
            this.gravity = isExplosion ? 0.05 : -0.01;
            this.opacity = 1;
            this.decay = Math.random() * 0.02 + 0.01;
        }
        update() {
            this.speedY += this.gravity;
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity -= this.decay;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            
            // Draw a cute cross star
            const cx = this.x;
            const cy = this.y;
            const size = this.size;
            
            ctx.moveTo(cx, cy - size);
            ctx.quadraticCurveTo(cx, cy, cx + size, cy);
            ctx.quadraticCurveTo(cx, cy, cx, cy + size);
            ctx.quadraticCurveTo(cx, cy, cx - size, cy);
            ctx.quadraticCurveTo(cx, cy, cx, cy - size);
            
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }
    // Ambient floating star loop
    function spawnAmbient() {
        if (particles.length < 50) {
            // Spawn near bottom
            particles.push(new SparkleParticle(Math.random() * canvas.width, canvas.height - 20));
        }
    }
    setInterval(spawnAmbient, 300);
    // Burst explosion on click
    function triggerBurst(x, y, count = 80) {
        for (let i = 0; i < count; i++) {
            particles.push(new SparkleParticle(x, y, true));
        }
    }
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, index) => {
            p.update();
            p.draw();
            if (p.opacity <= 0) {
                particles.splice(index, 1);
            }
        });
        
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
    // 3. Orb Click Vision Conjure
    orbTrigger.addEventListener('click', (e) => {
        const rect = orbTrigger.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 3;
        // Trigger burst of stars
        triggerBurst(centerX, centerY, 80);
        // Orb bounce animation
        orbTrigger.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.08)' },
            { transform: 'scale(0.97)' },
            { transform: 'scale(1)' }
        ], {
            duration: 500,
            easing: 'ease-in-out'
        });
        // Get random vision
        const visions = getVisions();
        const randomVision = visions[Math.floor(Math.random() * visions.length)];
        // Fade out and write text
        orbText.style.opacity = '0';
        setTimeout(() => {
            orbText.textContent = randomVision;
            orbText.classList.add('active-vision');
            orbText.style.opacity = '1';
        }, 300);
    });
    // 4. Casting a new goal
    visionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const goalVal = visionInput.value.trim();
        if (goalVal.length > 5) {
            const visions = getVisions();
            visions.push(goalVal + " ✨");
            saveVisions(visions);
            // Success sparkles from form button
            const btn = document.querySelector('.cast-btn');
            const rect = btn.getBoundingClientRect();
            triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 30);
            // Reset input
            visionInput.value = '';
            visionInput.placeholder = "Cast successfully into the future! 🔮";
            setTimeout(() => {
                visionInput.placeholder = "Type a future goal or dream prediction...";
            }, 3000);
        }
    });
});
