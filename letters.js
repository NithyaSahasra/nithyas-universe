/**
 * Nithya's Universe - Letters Page Scripts
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Default letters
    const defaultLetters = [
        {
            id: 1,
            to: "My Younger Self",
            date: "June 7, 2026",
            body: "Dear Little Nithya,\n\nIf I could send a message back in time, I would tell you that every single worry you have right now will fade away. Stop trying so hard to fit in. Those quiet nights spent writing lines of code, drawing sparkles, and scrapbooking were not wasted—they were the foundations of a universe. You are stronger and more creative than you know. Keep dreaming, little star!\n\nAlways with you,"
        },
        {
            id: 2,
            to: "My Future Self",
            date: "June 7, 2026",
            body: "Dear Future Nithya,\n\nI hope you are reading this from a cozy corner of our pastel pink dream house, perhaps with a warm matcha latte in hand. Are we working as a Data Scientist at Google? Did we build that creative tech startup? More than anything, I hope you are happy, healthy, and still find child-like wonder in coding, starry skies, and cute stickers.\n\nAlways with you,"
        },
        {
            id: 3,
            to: "My Sweet Bestie",
            date: "June 7, 2026",
            body: "Dear Bestie,\n\nThank you for painting my sky with rainbows. Thank you for listening to my infinite design ideas, sharing warm pastries, and tolerating my pink Barbiecore obsession! You are a core pillar of my memory palace, and I am so grateful to have you walk alongside me in this lifetime. Here is to a thousand more cafe dates!\n\nWith infinite love,"
        }
    ];
    // Load from localStorage
    function getLetters() {
        const stored = localStorage.getItem('nithya_letters');
        if (!stored) {
            localStorage.setItem('nithya_letters', JSON.stringify(defaultLetters));
            return defaultLetters;
        }
        return JSON.parse(stored);
    }
    // Save to localStorage
    function saveLetters(letters) {
        localStorage.setItem('nithya_letters', JSON.stringify(letters));
    }
    // Elements
    const rack = document.getElementById('envelope-rack');
    const readOverlay = document.getElementById('read-overlay');
    const closeReadBtn = document.getElementById('close-read-btn');
    const viewDate = document.getElementById('letter-view-date');
    const viewTo = document.getElementById('letter-view-to');
    const viewBody = document.getElementById('letter-view-body');
    const writeModal = document.getElementById('write-modal');
    const openWriteBtn = document.getElementById('open-write-btn');
    const closeWriteBtn = document.getElementById('close-write-btn');
    const writeForm = document.getElementById('write-letter-form');
    let typewriterInterval = null;
    // 2. Render Envelope Grid
    function renderEnvelopes() {
        rack.innerHTML = '';
        const letters = getLetters();
        letters.forEach((letData, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'envelope-container reveal';
            wrapper.style.animationDelay = `${index * 0.15}s`;
            wrapper.innerHTML = `
                <div class="envelope-flap"></div>
                <div class="envelope-pocket"></div>
                <div class="envelope-inner-paper">
                    <p>${letData.to}</p>
                    <span>Click to Open</span>
                </div>
                <div class="wax-seal">💖</div>
            `;
            // Click Envelope to open and read
            wrapper.addEventListener('click', () => {
                // Trigger opening animation
                wrapper.classList.add('opening');
                setTimeout(() => {
                    // Open Reading overlay
                    viewDate.textContent = letData.date;
                    viewTo.textContent = `Dear ${letData.to},`;
                    
                    readOverlay.classList.add('active');
                    
                    // Handwriting typewriter
                    typeText(viewBody, letData.body);
                    // Reset envelope state behind the overlay
                    setTimeout(() => {
                        wrapper.classList.remove('opening');
                    }, 500);
                    
                }, 900);
            });
            rack.appendChild(wrapper);
        });
    }
    // 3. Typewriter implementation for handwriting
    function typeText(targetElement, text, speed = 20) {
        if (typewriterInterval) clearInterval(typewriterInterval);
        targetElement.innerHTML = '';
        let index = 0;
        typewriterInterval = setInterval(() => {
            if (index < text.length) {
                if (text.substr(index, 1) === '\n') {
                    targetElement.innerHTML += '<br>';
                } else {
                    targetElement.innerHTML += text.charAt(index);
                }
                index++;
            } else {
                clearInterval(typewriterInterval);
            }
        }, speed);
    }
    // 4. Modal Event Handlers
    closeReadBtn.addEventListener('click', () => {
        readOverlay.classList.remove('active');
        if (typewriterInterval) clearInterval(typewriterInterval);
    });
    readOverlay.addEventListener('click', (e) => {
        if (e.target === readOverlay) {
            readOverlay.classList.remove('active');
            if (typewriterInterval) clearInterval(typewriterInterval);
        }
    });
    openWriteBtn.addEventListener('click', () => {
        writeModal.classList.add('active');
    });
    closeWriteBtn.addEventListener('click', () => {
        writeModal.classList.remove('active');
    });
    writeModal.addEventListener('click', (e) => {
        if (e.target === writeModal) {
            writeModal.classList.remove('active');
        }
    });
    // 5. Submit new letter form
    writeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const letters = getLetters();
        const newLetter = {
            id: Date.now(),
            to: document.getElementById('let-to').value.trim(),
            date: document.getElementById('let-date').value.trim(),
            body: document.getElementById('let-body').value.trim()
        };
        letters.push(newLetter);
        saveLetters(letters);
        renderEnvelopes();
        // Reset and close
        writeForm.reset();
        writeModal.classList.remove('active');
    });
    // Initial load
    renderEnvelopes();
});
