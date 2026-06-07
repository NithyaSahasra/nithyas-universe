/**
 * Nithya's Universe - Friendship Garden Scripts
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Default friends dataset
    const defaultFriends = [
        {
            id: 1,
            name: "Diya",
            role: "Childhood Bestie",
            flower: "images/flower1.png",
            avatar: "images/polaroid1.jpg",
            story: "We met in kindergarten when we shared a box of glitter crayons. Since then, we have shared everything—secrets, clothes, and late-night calls. Diya always brings light and laughter wherever she goes!"
        },
        {
            id: 2,
            name: "Aarav",
            role: "Coding Buddy",
            flower: "images/flower2.png",
            avatar: "images/memory2.jpg",
            story: "We met at our first college hackathon when we both accidentally spilled matcha latte on the power strip. Aarav is the one who helps debug my craziest loops and is always down to co-author cozy aesthetic code."
        },
        {
            id: 3,
            name: "Sneha",
            role: "Creative Consultant",
            flower: "images/flower3.png",
            avatar: "images/polaroid4.jpg",
            story: "My Pinterest partner in crime! Sneha helps me design themes, review color schemes, and is the absolute best person to explore cozy bookshops with. She holds a special glowing blossom in my friendship garden!"
        }
    ];
    // Load from localStorage
    function getFriends() {
        const stored = localStorage.getItem('nithya_friends');
        if (!stored) {
            localStorage.setItem('nithya_friends', JSON.stringify(defaultFriends));
            return defaultFriends;
        }
        return JSON.parse(stored);
    }
    // Save to localStorage
    function saveFriends(friends) {
        localStorage.setItem('nithya_friends', JSON.stringify(friends));
    }
    const plot = document.getElementById('garden-plot-grid');
    const detailModal = document.getElementById('friend-detail-modal');
    const closeDetailBtn = document.getElementById('close-bubble-btn');
    const bubbleAvatar = document.getElementById('bubble-avatar');
    const bubbleName = document.getElementById('bubble-name');
    const bubbleRole = document.getElementById('bubble-role');
    const bubbleStory = document.getElementById('bubble-story');
    const plantModal = document.getElementById('plant-modal');
    const openPlantBtn = document.getElementById('open-plant-btn');
    const closePlantBtn = document.getElementById('close-plant-btn');
    const plantForm = document.getElementById('plant-friend-form');
    let activeBloomedCard = null;
    // 2. Render Friendship Garden
    function renderGarden() {
        plot.innerHTML = '';
        const list = getFriends();
        list.forEach((friend, index) => {
            const card = document.createElement('div');
            card.className = 'flower-card reveal';
            card.style.animationDelay = `${index * 0.15}s`;
            card.innerHTML = `
                <div class="flower-stem"></div>
                <div class="flower-head">
                    <div class="flower-center">
                        <img src="${friend.avatar}" alt="Center Profile">
                    </div>
                    <div class="flower-petals" style="background-image: url('${friend.flower}');"></div>
                </div>
                <div class="flower-pot"></div>
                <div class="friend-label">${friend.name}</div>
            `;
            // Click Flower to Bloom and view Story
            card.addEventListener('click', () => {
                // Remove previous active bloomed card state
                if (activeBloomedCard) activeBloomedCard.classList.remove('bloomed');
                
                card.classList.add('bloomed');
                activeBloomedCard = card;
                // Open detail story block after blooming finishes
                setTimeout(() => {
                    bubbleAvatar.src = friend.avatar;
                    bubbleName.textContent = friend.name;
                    bubbleRole.textContent = friend.role;
                    bubbleStory.textContent = friend.story;
                    
                    detailModal.classList.add('active');
                }, 600);
            });
            plot.appendChild(card);
        });
    }
    // 3. Modal Close handlers
    closeDetailBtn.addEventListener('click', () => {
        detailModal.classList.remove('active');
        if (activeBloomedCard) {
            activeBloomedCard.classList.remove('bloomed');
            activeBloomedCard = null;
        }
    });
    detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) {
            detailModal.classList.remove('active');
            if (activeBloomedCard) {
                activeBloomedCard.classList.remove('bloomed');
                activeBloomedCard = null;
            }
        }
    });
    openPlantBtn.addEventListener('click', () => {
        plantModal.classList.add('active');
    });
    closePlantBtn.addEventListener('click', () => {
        plantModal.classList.remove('active');
    });
    plantModal.addEventListener('click', (e) => {
        if (e.target === plantModal) {
            plantModal.classList.remove('active');
        }
    });
    // 4. Form Submit
    plantForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const list = getFriends();
        // Give a default avatar depending on index or inputs
        const avatars = ["images/polaroid1.jpg", "images/polaroid4.jpg", "images/polaroid6.jpg", "images/memory3.jpg"];
        const randomAvatar = avatars[list.length % avatars.length];
        const newFriend = {
            id: Date.now(),
            name: document.getElementById('fri-name').value.trim(),
            role: document.getElementById('fri-role').value.trim(),
            flower: document.getElementById('fri-flower').value,
            avatar: randomAvatar,
            story: document.getElementById('fri-story').value.trim()
        };
        list.push(newFriend);
        saveFriends(list);
        renderGarden();
        // Reset and close
        plantForm.reset();
        plantModal.classList.remove('active');
    });
    // Initial load
    renderGarden();
});
