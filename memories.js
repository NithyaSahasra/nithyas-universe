/**
 * Nithya's Universe - Memories Page Scripts
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Default memory data (if localStorage is empty)
    const defaultMemories = [
        {
            id: 1,
            title: "Cherry Blossom Walk",
            date: "April 2026",
            img: "images/polaroid1.jpg",
            story: "Walked under the pink canopy of cherry blossom trees in full bloom today. The petals fell like pink snow. It felt like walking through a fairy tale dream palace. Captured this lovely memory on our way back!"
        },
        {
            id: 2,
            title: "Cozy Pink Cafe",
            date: "May 2026",
            img: "images/polaroid2.jpg",
            story: "Discovered the cutest Barbiecore cafe in town! They served strawberry lattes and pink macarons with gold flakes. The entire interior was plush pink velvet. Spent the afternoon reading and coding."
        },
        {
            id: 3,
            title: "Starry Sky Camp",
            date: "June 2026",
            img: "images/polaroid3.jpg",
            story: "Stargazing trip under the clear night sky. We saw a shooting star and made a wish. The bonfire was warm and we roasted marshmallows while sharing scary-but-cute stories."
        },
        {
            id: 4,
            title: "Cute Garden Friend",
            date: "June 2026",
            img: "images/polaroid4.jpg",
            story: "A fluffy white cat visited my garden and napped right on top of the cherry blossom petals. I named her Sakura. She let me pet her for an hour before heading back home."
        },
        {
            id: 5,
            title: "Sunset Picnic",
            date: "May 2026",
            img: "images/polaroid5.jpg",
            story: "Set up a lovely picnic cloth near the lake. We watched the sky turn gold, orange, and purple. The clouds looked like pink cotton candy floating above."
        },
        {
            id: 6,
            title: "Princess Graduation",
            date: "June 2026",
            img: "images/memory1.jpg",
            story: "The biggest milestone achieved! Graduating with honors surrounded by family, best friends, and a lot of flower bouquets. The future is bright and full of stars!"
        }
    ];
    // Load from localStorage
    function getMemories() {
        const stored = localStorage.getItem('nithya_memories');
        if (!stored) {
            localStorage.setItem('nithya_memories', JSON.stringify(defaultMemories));
            return defaultMemories;
        }
        return JSON.parse(stored);
    }
    // Save to localStorage
    function saveMemories(memories) {
        localStorage.setItem('nithya_memories', JSON.stringify(memories));
    }
    // Elements
    const line1 = document.getElementById('line-1-grid');
    const line2 = document.getElementById('line-2-grid');
    
    // Modals
    const detailModal = document.getElementById('detail-modal');
    const closeDetailModal = document.getElementById('close-detail-modal');
    const modalPhoto = document.getElementById('modal-photo');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalStory = document.getElementById('modal-story');
    const addModal = document.getElementById('add-modal');
    const openAddModalBtn = document.getElementById('open-add-modal-btn');
    const closeAddModal = document.getElementById('close-add-modal');
    const addMemoryForm = document.getElementById('add-memory-form');
    // 2. Render Polaroid Cards
    function renderMemories() {
        // Clear lines
        line1.innerHTML = '';
        line2.innerHTML = '';
        const memories = getMemories();
        memories.forEach((mem, index) => {
            const card = document.createElement('div');
            // Distribute swing animations
            const swingClass = `swing-${(index % 4) + 1}`;
            card.className = `polaroid-card ${swingClass} reveal`;
            card.style.animationDelay = `${(index * 0.15)}s`;
            
            card.innerHTML = `
                <img src="${mem.img}" alt="${mem.title}">
                <p class="polaroid-title">${mem.title}</p>
            `;
            // Click event to view details
            card.addEventListener('click', () => {
                modalPhoto.src = mem.img;
                modalTitle.textContent = mem.title;
                modalDate.textContent = `Captured on: ${mem.date}`;
                modalStory.textContent = mem.story;
                detailModal.classList.add('active');
            });
            // Distribute cards between Line 1 and Line 2
            if (index % 2 === 0) {
                line1.appendChild(card);
            } else {
                line2.appendChild(card);
            }
        });
    }
    // 3. Modal Close handlers
    closeDetailModal.addEventListener('click', () => {
        detailModal.classList.remove('active');
    });
    detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) {
            detailModal.classList.remove('active');
        }
    });
    openAddModalBtn.addEventListener('click', () => {
        addModal.classList.add('active');
    });
    closeAddModal.addEventListener('click', () => {
        addModal.classList.remove('active');
    });
    addModal.addEventListener('click', (e) => {
        if (e.target === addModal) {
            addModal.classList.remove('active');
        }
    });
    // 4. Form submit handler (Add Memory)
    addMemoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const memories = getMemories();
        const newMemory = {
            id: Date.now(),
            title: document.getElementById('mem-title').value.trim(),
            date: document.getElementById('mem-date').value.trim(),
            img: document.getElementById('mem-img').value,
            story: document.getElementById('mem-story').value.trim()
        };
        memories.push(newMemory);
        saveMemories(memories);
        renderMemories();
        // Reset and close
        addMemoryForm.reset();
        addModal.classList.remove('active');
    });
    // Initial load
    renderMemories();
});
