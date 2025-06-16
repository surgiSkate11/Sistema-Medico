// NeuroMed Login - Advanced Medical Interface JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // No manipular el loader global aquí, solo en base.js
    console.log('🏥 NeuroMed System Initializing...');
    // Initialize all login components
    initializeLogin();
    initializeNeuralBackground();
    initializeFormValidation();
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
        
        // Show medical loading
        showMedicalLoading();
        
        // Simulate authentication process
        setTimeout(() => {
            // Submit the actual form
            e.target.submit();
        }, 2500);
    });
}

// Neural Network Background Canvas
function initializeNeuralBackground() {
    const canvas = document.getElementById('neural-bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    // Resize canvas (usar devicePixelRatio para máxima nitidez)
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
        ctx.scale(dpr, dpr);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // ADN helix (centro)
    const helixParticles = [];
    const maxHelixParticles = 32;
    const helixRadius = 120;
    const helixCenterX = () => window.innerWidth / 2;
    const helixCenterY = () => window.innerHeight / 2;
    const helixHeight = 320;
    const helixTurns = 2.5;
    const helixSpeed = 0.008;
    let time = 0;
    const dnaColors = [
        'rgba(180,185,200,0.85)',
        'rgba(120,130,150,0.85)',
        'rgba(200,200,210,0.85)',
        'rgba(100,110,130,0.85)'
    ];
    class DnaParticle {
        constructor(i) {
            this.i = i;
            this.color = dnaColors[i % dnaColors.length];
            this.radius = 6 + Math.random() * 2;
        }
        getPos(t) {
            const angle = (this.i / maxHelixParticles) * Math.PI * 2 * helixTurns + t * helixSpeed * 2;
            const y = helixCenterY() + Math.sin(angle) * helixHeight/2;
            const x = helixCenterX() + Math.cos(angle) * helixRadius;
            return { x: x, y: y };
        }
        draw(t) {
            const pos = this.getPos(t);
            ctx.save();
            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.restore();
        }
    }
    helixParticles.length = 0;
    for (let i = 0; i < maxHelixParticles; i++) {
        helixParticles.push(new DnaParticle(i));
    }
    function drawHelixConnections(t) {
        ctx.save();
        ctx.lineWidth = 2.2;
        for (let i = 0; i < maxHelixParticles; i += 2) {
            const p1 = helixParticles[i].getPos(t);
            const p2 = helixParticles[i+1].getPos(t);
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, 'rgba(180,185,200,0.5)');
            grad.addColorStop(1, 'rgba(120,130,150,0.5)');
            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
        }
        ctx.restore();
    }

    // Partículas flotantes por toda la página (más grandes y con efecto de pares para simular eslabones de ADN)
    const floatParticles = [];
    const floatColors = [
        'rgba(180,185,200,0.22)',
        'rgba(120,130,150,0.18)',
        'rgba(200,200,210,0.22)',
        'rgba(100,110,130,0.18)'
    ];
    const floatCount = 28;
    let floatCanvasWidth = window.innerWidth;
    let floatCanvasHeight = window.innerHeight;
    function updateFloatCanvasSize() {
        floatCanvasWidth = canvas.width / (window.devicePixelRatio || 1);
        floatCanvasHeight = canvas.height / (window.devicePixelRatio || 1);
    }
    updateFloatCanvasSize();
    window.addEventListener('resize', updateFloatCanvasSize);
    class FloatPair {
        constructor() {
            this.baseX = Math.random() * floatCanvasWidth;
            this.baseY = Math.random() * floatCanvasHeight;
            this.radius = 10 + Math.random() * 8;
            this.color1 = floatColors[Math.floor(Math.random() * floatColors.length)];
            this.color2 = floatColors[Math.floor(Math.random() * floatColors.length)];
            this.angle = Math.random() * Math.PI * 2;
            this.amp = 18 + Math.random() * 10;
            this.speedY = 0.12 + Math.random() * 0.18;
            this.speedX = (Math.random() - 0.5) * 0.08;
            this.alpha = 0.32 + Math.random() * 0.18;
        }
        update() {
            this.baseY -= this.speedY;
            this.baseX += this.speedX;
            this.angle += 0.02;
            if (this.baseY < -30) {
                this.baseY = floatCanvasHeight + 30;
                this.baseX = Math.random() * floatCanvasWidth;
            }
            if (this.baseX < -30) this.baseX = floatCanvasWidth + 30;
            if (this.baseX > floatCanvasWidth + 30) this.baseX = -30;
        }
        draw() {
            // Par de esferas enlazadas (simulan eslabón ADN)
            const dx = Math.cos(this.angle) * this.amp;
            const dy = Math.sin(this.angle) * this.amp * 0.5;
            const x1 = this.baseX + dx;
            const y1 = this.baseY + dy;
            const x2 = this.baseX - dx;
            const y2 = this.baseY - dy;
            ctx.save();
            ctx.globalAlpha = this.alpha;
            // Línea entre esferas
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = 'rgba(180,185,200,0.18)';
            ctx.lineWidth = 3.2;
            ctx.shadowColor = '#b4b9c8';
            ctx.shadowBlur = 8;
            ctx.stroke();
            // Esfera 1
            ctx.beginPath();
            ctx.arc(x1, y1, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color1;
            ctx.shadowColor = this.color1;
            ctx.shadowBlur = 16;
            ctx.fill();
            // Esfera 2
            ctx.beginPath();
            ctx.arc(x2, y2, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color2;
            ctx.shadowColor = this.color2;
            ctx.shadowBlur = 16;
            ctx.fill();
            ctx.restore();
        }
    }
    floatParticles.length = 0;
    for (let i = 0; i < floatCount; i++) {
        floatParticles.push(new FloatPair());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Flotantes
        floatParticles.forEach(p => { p.update(); p.draw(); });
        // ADN central
        drawHelixConnections(time);
        helixParticles.forEach(p => p.draw(time));
        time += 1;
        animationId = requestAnimationFrame(animate);
    }
    animate();
    window.addEventListener('beforeunload', () => {
        if (animationId) cancelAnimationFrame(animationId);
    });
}

// Advanced Form Validation
function initializeFormValidation() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (!emailInput || !passwordInput) return;
    
    // Real-time validation with neural effects
    emailInput.addEventListener('input', function() {
        validateEmail(this);
    });
    
    passwordInput.addEventListener('input', function() {
        validatePassword(this);
    });
    
    // Focus effects
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('field-focused');
            createInputGlow(this);
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('field-focused');
            removeInputGlow(this);
        });
    });
}

function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(input.value);
    
    updateFieldStatus(input, isValid);
    return isValid;
}

function validatePassword(input) {
    const isValid = input.value.length >= 4; // Adjust as needed
    updateFieldStatus(input, isValid);
    return isValid;
}

function updateFieldStatus(input, isValid) {
    input.classList.remove('field-valid', 'field-invalid');
    
    if (input.value.length > 0) {
        input.classList.add(isValid ? 'field-valid' : 'field-invalid');
    }
}

function createInputGlow(input) {
    input.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
}

function removeInputGlow(input) {
    input.style.boxShadow = '';
}

// Medical Loading System
function showMedicalLoading() {
    const loading = document.getElementById('medicalLoading');
    if (!loading) return;
    
    loading.classList.remove('hidden');
    
    // Add loading progression
    setTimeout(() => {
        const progressBar = loading.querySelector('.bg-gradient-to-r');
        if (progressBar) {
            progressBar.style.width = '100%';
            progressBar.style.transition = 'width 2s ease-in-out';
        }
    }, 100);
    
    // Medical sounds simulation
    playMedicalSounds();
}

function playMedicalSounds() {
    // Simulate medical beep sounds with Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function createBeep(frequency, duration) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    // Medical beep sequence
    setTimeout(() => createBeep(800, 0.1), 500);
    setTimeout(() => createBeep(1000, 0.1), 1000);
    setTimeout(() => createBeep(1200, 0.2), 1500);
}

// Micro Interactions
function initializeMicroInteractions() {
    // Hover effects para inputs y enlaces
    document.querySelectorAll('input, a').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    // Botón login: animación especial
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('mouseenter', function() {
            this.classList.add('animate__pulse');
        });
        loginButton.addEventListener('mouseleave', function() {
            this.classList.remove('animate__pulse');
        });
    }
    // Typing effect para el placeholder del email
    initializeTypingEffects();
}

function initializeTypingEffects() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (emailInput) {
        emailInput.addEventListener('focus', function() {
            if (!this.value) {
                typeText(this, 'doctor@neuromed.com', 50);
            }
        });
    }
}

function typeText(element, text, speed) {
    let i = 0;
    element.placeholder = '';
    
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            element.placeholder += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, speed);
}

// CSS animations for form validation
const style = document.createElement('style');
style.textContent = `
    .field-valid {
        border-color: #00d4aa !important;
        box-shadow: 0 0 0 3px rgba(0, 212, 170, 0.2) !important;
    }
    
    .field-invalid {
        border-color: #ff6b6b !important;
        box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2) !important;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Animación pulse para el botón login
const stylePulse = document.createElement('style');
stylePulse.textContent = `
@keyframes animate__pulse {
  0% { box-shadow: 0 0 0 0 #00f5ff55; }
  70% { box-shadow: 0 0 0 12px #00f5ff00; }
  100% { box-shadow: 0 0 0 0 #00f5ff00; }
}
.animate__pulse {
  animation: animate__pulse 0.7s;
}
`;
document.head.appendChild(stylePulse);

console.log('✅ NeuroMed Login System Ready');

function initializeLoadingSystem() {
    // Loader médico
    // Esta función queda vacía para evitar mostrar el loader automáticamente en login
}