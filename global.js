**
 * Nithya's Universe - Global Javascript Helper
 * Handles all global animations, floating elements, cursor glitter,
 * loading screen, scroll reveals, and back buttons.
 */
(function () {
    // 1. Inject Fonts and Global CSS
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Dancing+Script:wght@400;700&family=Poppins:wght@300;400;600;700&display=swap';
    document.head.appendChild(fontLink);
    const globalStyles = `
        :root {
            --bg-light: #FFF5F8;
            --pink-100: #FFE4EE;
            --pink-200: #FFD6E8;
            --pink-300: #FFC2DC;
            --pink-400: #FF9CC5;
            --pink-500: #FF73AF;
            --glass-bg: rgba(255, 245, 248, 0.45);
            --glass-border: rgba(255, 115, 175, 0.25);
            --font-poppins: 'Poppins', sans-serif;
            --font-dancing: 'Dancing Script', cursive;
            --font-caveat: 'Caveat', cursive;
        }
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 12px;
        }
        ::-webkit-scrollbar-track {
            background: var(--bg-light);
        }
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, var(--pink-300), var(--pink-500));
            border-radius: 10px;
            border: 3px solid var(--bg-light);
        }
        ::-webkit-scrollbar-thumb:hover {
            background: var(--pink-500);
        }
        /* Global Reset adjustments */
        html {
            scroll-behavior: smooth;
        }
        body {
            margin: 0;
            padding: 0;
            font-family: var(--font-poppins);
            background-color: var(--bg-light);
            color: #5d4a51;
            overflow-x: hidden;
            position: relative;
        }
        /* Loader Styles */
        #loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: radial-gradient(circle at center, #FFF5F8, #FFE4EE);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            transition: opacity 0.6s ease, visibility 0.6s;
        }
        .loader-heart {
            font-size: 5rem;
            color: var(--pink-500);
            animation: heartbeat 1.2s infinite;
        }
        .loader-text {
            font-family: var(--font-dancing);
            font-size: 2.2rem;
            color: var(--pink-500);
            margin-top: 15px;
            text-shadow: 0 0 10px rgba(255, 115, 175, 0.3);
        }
        
        /* Floating particles container */
        #floating-particles-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        }
        .floating-particle {
            position: absolute;
            bottom: -50px;
            user-select: none;
            pointer-events: none;
            opacity: 0.8;
        }
        /* Cursor Sparkles */
        .cursor-sparkle {
            position: fixed;
            pointer-events: none;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: var(--pink-400);
            z-index: 100000;
            transform: translate(-50%, -50%);
            animation: sparkle-fade 0.8s forwards ease-out;
        }
        /* Back Button */
        .back-to-universe {
            position: fixed;
            top: 20px;
            left: 20px;
            padding: 10px 20px;
            background: var(--glass-bg);
            border: 2px solid var(--glass-border);
            border-radius: 30px;
            font-family: var(--font-poppins);
            font-weight: 600;
            color: var(--pink-500);
            text-decoration: none;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            z-index: 10000;
            box-shadow: 0 8px 32px 0 rgba(255, 115, 175, 0.15);
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            animation: float-btn 3s ease-in-out infinite;
        }
        .back-to-universe:hover {
            transform: scale(1.1) translateY(-3px);
            background: var(--pink-300);
            color: white;
            box-shadow: 0 12px 40px 0 rgba(255, 115, 175, 0.3);
        }
        /* KEYFRAME ANIMATIONS */
        @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2) rotate(5deg); }
        }
        @keyframes float-btn {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        @keyframes sparkle-fade {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        }
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.8;
            }
            90% {
                opacity: 0.8;
            }
            100% {
                transform: translateY(-110vh) rotate(360deg);
                opacity: 0;
            }
        }
        @keyframes swaySide {
            0%, 100% { margin-left: 0; }
            50% { margin-left: 50px; }
        }
        /* Scroll Reveal */
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    // Inject Global Styles
    const styleEl = document.createElement('style');
    styleEl.innerHTML = globalStyles;
    document.head.appendChild(styleEl);
    // 2. Create and Inject Loading Screen
    document.write(`
        <div id="loading-screen">
            <div class="loader-heart">💖</div>
            <div class="loader-text">Entering Nithya's Universe...</div>
        </div>
    `);
    window.addEventListener('load', function () {
        const loader = document.getElementById('loading-screen');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.visibility = 'hidden';
            }, 600);
        }
    });
    // 3. Inject Back Button (if on a subpage)
    document.addEventListener('DOMContentLoaded', function () {
        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf('/') + 1);
        
        // Exclude login page (index.html or empty) and main museum hub (museum.html)
        if (filename && filename !== 'index.html' && filename !== 'museum.html' && filename !== '') {
            const backBtn = document.createElement('a');
            backBtn.href = 'museum.html';
            backBtn.className = 'back-to-universe';
            backBtn.innerHTML = '🌸 Back To Nithya\'s Universe';
            document.body.appendChild(backBtn);
        }
        // Setup Scroll Reveal
        setupScrollReveal();
        // Setup Particles
        setupFloatingParticles();
        // Setup Cursor Glitter
        setupCursorGlitter();
    });
    // 4. Scroll Reveal Setup
    function setupScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1
        });
        revealElements.forEach(el => observer.observe(el));
    }
    // 5. Floating Particles (Hearts, Butterflies, Petals)
    function setupFloatingParticles() {
        // Create container
        const container = document.createElement('div');
        container.id = 'floating-particles-container';
        document.body.appendChild(container);
        const particleTypes = [
            { char: '🌸', className: 'petal' },
            { char: '💖', className: 'heart' },
            { char: '🦋', className: 'butterfly' },
            { char: '✨', className: 'sparkle' }
        ];
        // Periodically spawn particles
        setInterval(() => {
            // Cap particles to prevent lag
            if (container.children.length > 25) return;
            const particleData = particleTypes[Math.floor(Math.random() * particleTypes.length)];
            const particle = document.createElement('div');
            particle.className = `floating-particle ${particleData.className}`;
            particle.innerText = particleData.char;
            // Random position and animation properties
            const startX = Math.random() * 100; // % width
            const size = Math.random() * 1.5 + 1; // rem
            const duration = Math.random() * 10 + 8; // seconds
            const delay = Math.random() * 2; // seconds
            particle.style.left = `${startX}vw`;
            particle.style.fontSize = `${size}rem`;
            particle.style.animation = `floatUp ${duration}s linear ${delay}s infinite, swaySide ${duration/2}s ease-in-out infinite`;
            container.appendChild(particle);
            // Cleanup
            setTimeout(() => {
                particle.remove();
            }, (duration + delay) * 1000);
        }, 1200);
    }
    // 6. Cursor Glitter Effect
    function setupCursorGlitter() {
        const colors = ['#FFD6E8', '#FFC2DC', '#FF9CC5', '#FF73AF', '#FFF5F8'];
        
        document.addEventListener('mousemove', function (e) {
            // Throttle sparkle creation a bit
            if (Math.random() > 0.15) return;
            const sparkle = document.createElement('div');
            sparkle.className = 'cursor-sparkle';
            
            // Randomly choose star symbol or cute dot
            const characters = ['✨', '🌸', '💖', '★'];
            const char = characters[Math.floor(Math.random() * characters.length)];
            sparkle.innerText = char;
            sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];
            sparkle.style.fontSize = `${Math.random() * 12 + 10}px`;
            sparkle.style.position = 'fixed';
            sparkle.style.left = `${e.clientX}px`;
            sparkle.style.top = `${e.clientY}px`;
            sparkle.style.transform = 'translate(-50%, -50%)';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '100000';
            
            // Random velocity direction
            const vx = (Math.random() - 0.5) * 50;
            const vy = (Math.random() - 0.5) * 50;
            
            sparkle.animate([
                { transform: 'translate(-50%, -50%) scale(1) translate(0, 0)', opacity: 1 },
                { transform: `translate(-50%, -50%) scale(0) translate(${vx}px, ${vy}px)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)',
                fill: 'forwards'
            });
            document.body.appendChild(sparkle);
            setTimeout(() => {
                sparkle.remove();
            }, 800);
        });
    }
})();
