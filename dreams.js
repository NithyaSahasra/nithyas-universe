/**
 * Nithya's Universe - Dreams Page (Pinterest Board) Scripts
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Default dreams data
    const defaultDreams = [
        {
            id: 1,
            title: "Work at Google",
            category: "Career",
            img: "images/polaroid3.jpg",
            desc: "Work as an AI Research Scientist or Developer at Google. Innovate and build tools that impact billions of lives around the globe."
        },
        {
            id: 2,
            title: "Landing MAANG",
            category: "Career",
            img: "images/memory2.jpg",
            desc: "Build a solid career at a top tier technology giant (Meta, Apple, Amazon, Netflix, Google). Solve massive engineering challenges."
        },
        {
            id: 3,
            title: "Data Scientist Specialist",
            category: "Career",
            img: "images/polaroid1.jpg",
            desc: "Combine math, programming, and domain expertise to unlock insights from massive datasets. Train state-of-the-art intelligent agents."
        },
        {
            id: 4,
            title: "IAS Officer Goals",
            category: "Career",
            img: "images/polaroid5.jpg",
            desc: "Serve the nation by clearing the Civil Services Exam. Dedicate work to public service, education, and empowering rural communities."
        },
        {
            id: 5,
            title: "Global World Tour",
            category: "Travel",
            img: "images/polaroid6.jpg",
            desc: "Travel to Paris, Tokyo, New York, Santorini, Rome, and Kyoto. Collect stamps, take polaroid photos, and eat pastries."
        },
        {
            id: 6,
            title: "Pastel Pink Dream House",
            category: "Life",
            img: "images/polaroid1.jpg",
            desc: "Design and build a gorgeous pink cottage house with a private garden, cherry blossom trees, and a cozy reading library corner."
        },
        {
            id: 7,
            title: "Founding a Tech Startup",
            category: "Creative",
            img: "images/polaroid3.jpg",
            desc: "Build a tech startup from scratch. Design creative products that merge art, coding, and aesthetics to make technology feel warm and magical."
        }
    ];
    // Load from localStorage
    function getDreams() {
        const stored = localStorage.getItem('nithya_dreams');
        if (!stored) {
            localStorage.setItem('nithya_dreams', JSON.stringify(defaultDreams));
            return defaultDreams;
        }
        return JSON.parse(stored);
    }
    // Save to localStorage
    function saveDreams(dreams) {
        localStorage.setItem('nithya_dreams', JSON.stringify(dreams));
    }
    const grid = document.getElementById('dream-masonry-grid');
    const addModal = document.getElementById('add-dream-modal');
    const openAddBtn = document.getElementById('open-add-dream');
    const closeAddBtn = document.getElementById('close-dream-modal');
    const addForm = document.getElementById('add-dream-form');
    // 2. Render masonry cards
    function renderDreams() {
        grid.innerHTML = '';
        const dreams = getDreams();
        dreams.forEach((dream, index) => {
            const card = document.createElement('div');
            // Distribute float delay classes
            const floatClass = `float-${(index % 3) + 1}`;
            card.className = `dream-card ${floatClass} reveal`;
            card.style.animationDelay = `${index * 0.1}s`;
            card.innerHTML = `
                <div class="dream-card-img-wrapper">
                    <img src="${dream.img}" alt="${dream.title}">
                    <span class="dream-category-tag">${dream.category}</span>
                    <span class="dream-pin">📌</span>
                </div>
                <div class="dream-content">
                    <h3 class="dream-card-title">${dream.title}</h3>
                    <p class="dream-card-desc">${dream.desc}</p>
                    <button class="delete-dream-sticker" data-id="${dream.id}" title="Remove Dream">🗑️ Trash</button>
                </div>
            `;
            // Delete dream listener
            const deleteBtn = card.querySelector('.delete-dream-sticker');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm(`Do you want to clear "${dream.title}" from your board?`)) {
                    removeDream(dream.id);
                }
            });
            grid.appendChild(card);
        });
    }
    // 3. Remove dream
    function removeDream(id) {
        let dreams = getDreams();
        dreams = dreams.filter(d => d.id !== id);
        saveDreams(dreams);
        renderDreams();
    }
    // 4. Modal event listeners
    openAddBtn.addEventListener('click', () => {
        addModal.classList.add('active');
    });
    closeAddBtn.addEventListener('click', () => {
        addModal.classList.remove('active');
    });
    addModal.addEventListener('click', (e) => {
        if (e.target === addModal) {
            addModal.classList.remove('active');
        }
    });
    // 5. Add dream form submission
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const dreams = getDreams();
        const newDream = {
            id: Date.now(),
            title: document.getElementById('dream-title').value.trim(),
            category: document.getElementById('dream-category').value,
            img: document.getElementById('dream-image').value,
            desc: document.getElementById('dream-desc').value.trim()
        };
        dreams.push(newDream);
        saveDreams(dreams);
        renderDreams();
        // Reset & Close
        addForm.reset();
        addModal.classList.remove('active');
    });
    // Initial load
    renderDreams();
});
