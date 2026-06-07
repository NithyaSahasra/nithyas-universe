/**
 * Nithya's Universe - Login Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initial password setup
    const DEFAULT_PASSWORD = 'universe123';
    
    // Ensure a password exists in localStorage
    if (!localStorage.getItem('universe_password')) {
        localStorage.setItem('universe_password', DEFAULT_PASSWORD);
    }
    
    // Elements
    const loginForm = document.getElementById('login-form');
    const passwordInput = document.getElementById('password-input');
    const togglePasswordBtn = document.getElementById('toggle-password-btn');
    const unlockBtn = document.getElementById('unlock-btn');
    const lockIcon = document.getElementById('lock-icon');
    const forgotPwdBtn = document.getElementById('forgot-pwd-btn');
    
    // Modal Elements
    const recoveryModal = document.getElementById('recovery-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const securityAnswerInput = document.getElementById('security-answer');
    const resetPasswordGroup = document.getElementById('reset-password-group');
    const newPasswordInput = document.getElementById('new-password');
    const modalSubmitBtn = document.getElementById('modal-submit-btn');
    // 1. Show/Hide Password Toggle
    togglePasswordBtn.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePasswordBtn.textContent = '🔒';
        } else {
            passwordInput.type = 'password';
            togglePasswordBtn.textContent = '👁️';
        }
    });
    // 2. Unlock/Submission Logic
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const enteredPassword = passwordInput.value;
        const correctPassword = localStorage.getItem('universe_password');
        if (enteredPassword === correctPassword) {
            // Unlock animation
            lockIcon.textContent = '🔓';
            lockIcon.classList.add('lock-unlocked');
            passwordInput.style.borderColor = '#2e7d32';
            unlockBtn.innerHTML = '<span>Entering...</span> 🌟';
            unlockBtn.style.background = 'linear-gradient(135deg, #81c784 0%, #4caf50 100%)';
            unlockBtn.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.4)';
            
            // Redirect after 1.2s
            setTimeout(() => {
                window.location.href = 'museum.html';
            }, 1200);
        } else {
            // Shake effect and warning highlight
            const card = document.querySelector('.login-card');
            card.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(0)' }
            ], {
                duration: 400,
                easing: 'ease-in-out'
            });
            passwordInput.style.borderColor = '#d32f2f';
            passwordInput.value = '';
            passwordInput.placeholder = 'Wrong password! Try again... 🌸';
            setTimeout(() => {
                passwordInput.style.borderColor = '#FFC2DC';
            }, 2000);
        }
    });
    // 3. Modal Opening/Closing
    forgotPwdBtn.addEventListener('click', () => {
        recoveryModal.classList.add('active');
        // Reset state
        securityAnswerInput.value = '';
        newPasswordInput.value = '';
        resetPasswordGroup.classList.add('hidden');
        securityAnswerInput.classList.remove('hidden');
        modalSubmitBtn.textContent = 'Verify Answer';
    });
    closeModalBtn.addEventListener('click', () => {
        recoveryModal.classList.remove('active');
    });
    // Close modal on background click
    recoveryModal.addEventListener('click', (e) => {
        if (e.target === recoveryModal) {
            recoveryModal.classList.remove('active');
        }
    });
    // 4. Verification & Reset Action
    modalSubmitBtn.addEventListener('click', () => {
        const isVerifying = !resetPasswordGroup.classList.contains('hidden');
        if (!isVerifying) {
            // Step 1: Verify Security Answer
            const answer = securityAnswerInput.value.trim().toLowerCase();
            if (answer === 'pink') {
                resetPasswordGroup.classList.remove('hidden');
                securityAnswerInput.classList.add('hidden');
                modalSubmitBtn.textContent = 'Save New Password';
            } else {
                securityAnswerInput.animate([
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(-6px)' },
                    { transform: 'translateX(6px)' },
                    { transform: 'translateX(0)' }
                ], { duration: 200 });
                securityAnswerInput.value = '';
                securityAnswerInput.placeholder = 'Incorrect answer! Try pink? 😉';
            }
        } else {
            // Step 2: Save New Password
            const newPwd = newPasswordInput.value.trim();
            if (newPwd.length >= 4) {
                localStorage.setItem('universe_password', newPwd);
                
                // Show success inside modal
                const modalDesc = document.querySelector('.modal-desc');
                modalDesc.textContent = 'Password reset successful! You can now login. 🎀';
                modalDesc.style.color = '#2e7d32';
                
                setTimeout(() => {
                    recoveryModal.classList.remove('active');
                    passwordInput.value = newPwd;
                    modalDesc.textContent = 'Answer the security question to reset your password.';
                    modalDesc.style.color = '#b58095';
                }, 1500);
            } else {
                newPasswordInput.animate([
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(-6px)' },
                    { transform: 'translateX(6px)' },
                    { transform: 'translateX(0)' }
                ], { duration: 200 });
                newPasswordInput.placeholder = 'Must be at least 4 characters...';
            }
        }
    });
});
