/**
 * Nithya's Universe - Secret Vault Scripts
 */
document.addEventListener('DOMContentLoaded', () => {
    const VAULT_PASSCODE = 'pinkmoon';
    
    // Default secret entry
    const defaultSecrets = [
        {
            id: 1,
            title: "First Secret Entry",
            date: "June 7, 2026",
            body: "Welcome to the hidden sanctuary! This vault is protected by the key 'pinkmoon'. You can write down your deep thoughts, private letters to the stars, or hidden feelings. They will be stored in your browser's local storage so they remain completely private to you. Keep writing! 💫"
        }
    ];
    // Load from localStorage
    function getSecrets() {
        const stored = localStorage.getItem('nithya_secrets');
        if (!stored) {
            localStorage.setItem('nithya_secrets', JSON.stringify(defaultSecrets));
            return defaultSecrets;
        }
        return JSON.parse(stored);
    }
    // Save to localStorage
    function saveSecrets(secrets) {
        localStorage.setItem('nithya_secrets', JSON.stringify(secrets));
    }
    // Elements
    const authForm = document.getElementById('vault-auth-form');
    const passcodeVal = document.getElementById('vault-passcode');
    const lockScreen = document.getElementById('vault-lock-screen');
    const sanctuary = document.getElementById('vault-sanctuary');
    const dial = document.getElementById('vault-dial');
    
    const lockVaultBtn = document.getElementById('lock-vault-btn');
    const secretForm = document.getElementById('secret-thought-form');
    const secretList = document.getElementById('secret-list');
    // 1. Password Lock Check
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const enteredKey = passcodeVal.value.trim().toLowerCase();
        
        if (enteredKey === VAULT_PASSCODE) {
            // Spin vault dial visual effect
            dial.classList.add('dial-spinning');
            const dialCenter = dial.querySelector('.dial-center');
            dialCenter.textContent = '🔓';
            
            // Decrypt transition
            setTimeout(() => {
                lockScreen.classList.add('hidden');
                sanctuary.classList.remove('hidden');
                
                // Render decrypted diary list
                renderSecrets();
                
                // Reset authentication controls
                passcodeVal.value = '';
                dial.classList.remove('dial-spinning');
                dialCenter.textContent = '🔒';
            }, 1500);
        } else {
            // Shake effect
            const card = document.querySelector('.lock-card');
            card.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-8px)' },
                { transform: 'translateX(8px)' },
                { transform: 'translateX(0)' }
            ], { duration: 300 });
            
            passcodeVal.value = '';
            passcodeVal.placeholder = "Incorrect Key! Try again...";
            passcodeVal.style.borderColor = '#d32f2f';
            setTimeout(() => {
                passcodeVal.style.borderColor = 'rgba(255, 194, 220, 0.3)';
            }, 2000);
        }
    });
    // 2. Render Decrypted Diary entries
    function renderSecrets() {
        secretList.innerHTML = '';
        const list = getSecrets();
        list.forEach((sec) => {
            const item = document.createElement('div');
            item.className = 'secret-item';
            
            item.innerHTML = `
                <div class="secret-item-header">
                    <h4 class="secret-item-title">${sec.title}</h4>
                    <span class="secret-item-date">${sec.date}</span>
                </div>
                <p class="secret-item-body">${sec.body}</p>
                <button class="delete-secret-btn" data-id="${sec.id}">🗑️ Burn</button>
            `;
            // Delete secret clicker
            const deleteBtn = item.querySelector('.delete-secret-btn');
            deleteBtn.addEventListener('click', () => {
                if (confirm(`Do you want to permanently delete (burn) "${sec.title}"?`)) {
                    removeSecret(sec.id);
                }
            });
            secretList.appendChild(item);
        });
    }
    // 3. Remove entry
    function removeSecret(id) {
        let list = getSecrets();
        list = list.filter(s => s.id !== id);
        saveSecrets(list);
        renderSecrets();
    }
    // 4. Save new secret entry
    secretForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const list = getSecrets();
        
        // Form current date
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const todayStr = new Date().toLocaleDateString('en-US', options);
        const newSecret = {
            id: Date.now(),
            title: document.getElementById('sec-title').value.trim(),
            date: todayStr,
            body: document.getElementById('sec-content').value.trim()
        };
        list.push(newSecret);
        saveSecrets(list);
        renderSecrets();
        // Reset inputs
        secretForm.reset();
    });
    // 5. Re-lock Vault
    lockVaultBtn.addEventListener('click', () => {
        sanctuary.classList.add('hidden');
        lockScreen.classList.remove('hidden');
    });
});
