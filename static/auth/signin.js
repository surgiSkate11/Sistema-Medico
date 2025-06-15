// NeuroMed Login - Advanced Medical Interface JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏥 NeuroMed System Initializing...');
    
    // Initialize all login components
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
        
        // Show medical loading
        showMedicalLoading();
        
        // Simulate authentication process
        setTimeout(() => {
            // Submit the actual form
            e.target.submit();
        }, 2500);
    });
    
    // Add ripple effect to login button
    loginButton.addEventListener('click', createRippleEffect);
}

// Neural Network Background Canvas
function initializeNeuralBackground() {
    const canvas = document.getElementById('neural-bg-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Neural network particles
    const particles = [];
    const connections = [];
    const maxParticles = 50;
    const maxConnections = 100;
    const connectionDistance = 150;
    
    // Particle class
    class NeuralParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.pulsePhase = Math.random() * Math.PI * 2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            // Keep within bounds
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
            
            // Pulse effect
            this.pulsePhase += this.pulseSpeed;
            this.currentRadius = this.radius + Math.sin(this.pulsePhase) * 0.5;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            
            // Main particle
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.currentRadius * 3
            );
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(0.5, '#764ba2');
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.currentRadius * 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Core particle
            ctx.fillStyle = '#f093fb';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new NeuralParticle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        drawConnections();
        
        animationId = requestAnimationFrame(animate);
    }
    
    function drawConnections() {
        ctx.save();
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.3;
                    
                    const gradient = ctx.createLinearGradient(
                        particles[i].x, particles[i].y,
                        particles[j].x, particles[j].y
                    );
                    gradient.addColorStop(0, `rgba(102, 126, 234, ${opacity})`);
                    gradient.addColorStop(0.5, `rgba(118, 75, 162, ${opacity})`);
                    gradient.addColorStop(1, `rgba(240, 147, 251, ${opacity})`);
                    
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        ctx.restore();
    }
    
    // Start animation
    animate();
    
    // Cleanup on page unload
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
    // Hover effects for interactive elements
    document.querySelectorAll('input, button, a').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Typing effect for placeholder text
    initializeTypingEffects();
}

function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
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

console.log('✅ NeuroMed Login System Ready');

function initializeLoadingSystem() {
    // Loader médico
    const loading = document.getElementById('medicalLoading');
    if (!loading) return;

    // Simulación de carga
    loading.style.display = 'flex';
    setTimeout(() => {
        loading.style.display = 'none';
    }, 3000);
}