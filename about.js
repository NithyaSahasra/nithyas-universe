**
 * Nithya's Universe - About Page Scripts
 */
document.addEventListener('DOMContentLoaded', () => {
    // Diary sections data
    const diaryContent = {
        story: {
            title: "🌸 My Story",
            body: "Hi, I'm Nithya! Welcome to my little magical corner of the web. I'm a dreamer, developer, and memory collector. I love coding, starry nights, warm cups of tea, and pastel pink aesthetics. This memory palace represents everything that is close to my heart. Let's make every moment count!"
        },
        facts: {
            title: "⭐ Fun Facts",
            body: "Here are some fun tidbits about me:\n\n1. I can write code in multiple languages while hum-singing soft pop!\n2. Pink is not just a color, it is a whole lifestyle! 🎀\n3. Cherry blossoms are my absolute favorite flowers.\n4. I keep a digital scrapbook of every project I build!"
        },
        hobbies: {
            title: "🎨 My Hobbies",
            body: "When I am not coding up a storm, you can find me:\n\n- Scrapbooking and journaling\n- Curating aesthetics on Pinterest\n- Watercolor painting and sketching\n- Listening to lo-fi tunes and reading fantasy novels"
        },
        favorites: {
            title: "🧁 My Favorites",
            body: "Color: Pastel Pink & Gold ✨\nMusic: Soft Pop, Lofi, K-indie\nAesthetics: Barbiecore & Cottagecore\nDessert: Strawberry Macarons & Matcha Latte\nSeason: Cherry Blossom Spring"
        }
    };
    const tabs = document.querySelectorAll('.diary-tab');
    const rightPage = document.getElementById('right-page');
    const sectionTitle = document.getElementById('section-title');
    const typewriterBody = document.getElementById('typewriter-body');
    let typewriterInterval = null;
    // Typewriter effect function
    function typeText(targetElement, text, speed = 25) {
        // Clear any active typewriter
        if (typewriterInterval) clearInterval(typewriterInterval);
        
        targetElement.innerHTML = '';
        let index = 0;
        
        // Convert newlines to breaks or list item look
        const formattedText = text.replace(/\n/g, '<br>');
        
        typewriterInterval = setInterval(() => {
            if (index < text.length) {
                // If it is a newline, output <br> instead of \\n
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
    // Tab click action
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const section = tab.dataset.section;
            if (!diaryContent[section]) return;
            // Update active class
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // Page turning visual animation
            rightPage.classList.add('page-turning');
            setTimeout(() => {
                // Change text content
                sectionTitle.textContent = diaryContent[section].title;
                
                // Remove class to animate page opening back
                rightPage.classList.remove('page-turning');
                
                // Trigger handwriting typewriter effect
                typeText(typewriterBody, diaryContent[section].body);
            }, 300);
        });
    });
    // Initialize with first section
    typeText(typewriterBody, diaryContent.story.body);
});
