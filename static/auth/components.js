// NeuroMed Login - Nivel Dios: Advanced Medical Interface JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏥 NeuroMed System Initializing...');

    initializeLogin();
    initializeNeuralBackground();
    initializeFormValidation();
    initializeLoadingSystem();
    initializeMicroInteractions();
});

// Main Login Initialization
function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    const medicalLoading = document.getElementById('medicalLoading');

    if (!loginForm || !loginButton || !medicalLoading) return;

    // Enhanced form submission with medical loading
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!validateForm(loginForm)) {
            showNotification('Por favor, corrige los campos marcados.', 'error');
            return;
        }
        showMedicalLoading();
        setTimeout(() => {
            loginForm.submit();
        }, 1200);
    });

    // Add ripple effect to login button
    loginButton.addEventListener('click', createRippleEffect);
}

// Neural Network Background Canvas
function initializeNeuralBackground() {
    if (window.LoginComponents && LoginComponents.spawnParticles) {
        LoginComponents.spawnParticles(40);
    }
}

// Advanced Form Validation
function initializeFormValidation() {
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');

    if (emailInput) {
        emailInput.addEventListener('input', function() {
            updateFieldStatus(emailInput, validateEmail(emailInput));
        });
    }
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            updateFieldStatus(passwordInput, validatePassword(passwordInput));
        });
    }
}

function validateForm(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const passwordInput = form.querySelector('input[type="password"]');
    let valid = true;
    if (!validateEmail(emailInput)) {
        updateFieldStatus(emailInput, false);
        valid = false;
    }
    if (!validatePassword(passwordInput)) {
        updateFieldStatus(passwordInput, false);
        valid = false;
    }
    return valid;
}

function validateEmail(input) {
    if (!input) return false;
    const value = input.value.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePassword(input) {
    if (!input) return false;
    const value = input.value.trim();
    return value.length >= 6;
}

function updateFieldStatus(input, isValid) {
    if (!input) return;
    input.classList.remove('field-valid', 'field-invalid');
    if (isValid) {
        input.classList.add('field-valid');
        createInputGlow(input, '#00d4aa');
    } else {
        input.classList.add('field-invalid');
        createInputGlow(input, '#ff6b6b');
    }
}

function createInputGlow(input, color) {
    input.style.boxShadow = `0 0 0 3px ${color}33`;
}

function removeInputGlow(input) {
    input.style.boxShadow = '';
}

// Medical Loading System
function showMedicalLoading() {
    const loading = document.getElementById('medicalLoading');
    if (!loading) return;
    loading.style.display = 'flex';
    playMedicalSounds();
    setTimeout(() => {
        loading.style.display = 'none';
    }, 2000);
}

function playMedicalSounds() {
    // Puedes agregar un sonido aquí si lo deseas
}

// Micro Interactions
function initializeMicroInteractions() {
    initializeTypingEffects();
}

function createRippleEffect(e) {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');
    button.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
}

function initializeTypingEffects() {
    const typingElements = document.querySelectorAll('[data-typing]');
    typingElements.forEach(el => {
        typeText(el, el.getAttribute('data-typing'), 40);
    });
}

function typeText(element, text, speed) {
    let i = 0;
    element.textContent = '';
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

// Notificaciones
function showNotification(message, type = 'info') {
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        document.body.appendChild(container);
    }
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `<span>${message}</span>`;
    container.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 2500);
}

// CSS Animations & Styles
const style = document.createElement('style');
style.textContent = `
    .field-valid {
        border-color: #00d4aa !important;
        box-shadow: 0 0 0 3px rgba(0, 212, 170, 0.2) !important;
        transition: box-shadow 0.3s;
    }
    .field-invalid {
        border-color: #ff6b6b !important;
        box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2) !important;
        transition: box-shadow 0.3s;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(102, 126, 234, 0.4);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 2;
    }
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    #notification-container {
        position: fixed;
        top: 30px;
        right: 30px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .notification {
        padding: 14px 28px;
        border-radius: 8px;
        color: #fff;
        font-weight: 500;
        box-shadow: 0 4px 24px rgba(0,0,0,0.18);
        opacity: 0.98;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        transition: opacity 0.5s, transform 0.5s;
        transform: translateY(0);
    }
    .notification-error {
        background: linear-gradient(90deg, #ff6b6b 0%, #ffa726 100%);
    }
    .notification-success {
        background: linear-gradient(90deg, #00d4aa 0%, #00f5ff 100%);
    }
    .notification-info {
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    }
    .notification.fade-out {
        opacity: 0;
        transform: translateY(-20px);
    }
`;
document.head.appendChild(style);

console.log('✅ NeuroMed Login System Initialized');