/**
 * HealthFlow Pro - Efectos Futuristas Premium
 */

// Configuración de partículas animadas
class HealthFlowParticles {
    constructor() {
        this.particles = [];
        this.init();
    }
    
    init() {
        this.createParticleContainer();
        this.generateParticles();
        this.animate();
    }
    
    createParticleContainer() {
        // Verificar si ya existe
        if (document.getElementById('healthflow-particles')) return;
        
        const container = document.createElement('div');
        container.id = 'healthflow-particles';
        container.className = 'particles-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        document.body.appendChild(container);
    }
    
    generateParticles() {
        const container = document.getElementById('healthflow-particles');
        if (!container) return;
        
        for (let i = 0; i < 80; i++) {
            const particle = document.createElement('div');
            particle.className = 'healthflow-particle';
            
            const size = Math.random() * 4 + 2;
            const opacity = Math.random() * 0.6 + 0.2;
            const animationDuration = Math.random() * 20 + 10;
            const delay = Math.random() * 20;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(0, 255, 255, ${opacity}) 0%, transparent 70%);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-particle ${animationDuration}s linear infinite;
                animation-delay: ${delay}s;
                box-shadow: 0 0 10px rgba(0, 255, 255, ${opacity * 0.8});
            `;
            
            container.appendChild(particle);
            this.particles.push(particle);
        }
    }
    
    animate() {
        // Agregar estilos de animación si no existen
        if (!document.getElementById('healthflow-animations')) {
            const style = document.createElement('style');
            style.id = 'healthflow-animations';
            style.textContent = `
                @keyframes float-particle {
                    0% {
                        transform: translateY(100vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100px) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Efectos de hover mejorados para las cards
class HealthFlowCardEffects {
    constructor() {
        this.init();
    }
    
    init() {
        this.enhanceCards();
        this.addGlowEffects();
    }
    
    enhanceCards() {
        const cards = document.querySelectorAll('.status-module, .module-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', this.onCardHover.bind(this));
            card.addEventListener('mouseleave', this.onCardLeave.bind(this));
            card.addEventListener('mousemove', this.onCardMouseMove.bind(this));
        });
    }
    
    onCardHover(e) {
        const card = e.currentTarget;
        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.transform = 'translateY(-12px) scale(1.03)';
        
        // Agregar efecto ripple
        this.createRipple(card, e);
    }
    
    onCardLeave(e) {
        const card = e.currentTarget;
        card.style.transform = 'translateY(0) scale(1)';
    }
    
    onCardMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `
            translateY(-12px) scale(1.03) 
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
        `;
    }
    
    createRipple(card, e) {
        const ripple = document.createElement('div');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple-effect 0.6s ease-out;
            z-index: 0;
        `;
        
        // Asegurar que la card tenga position relative
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        
        card.appendChild(ripple);
        
        // Remover el ripple después de la animación
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
        
        // Agregar estilo de animación ripple si no existe
        if (!document.getElementById('ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple-effect {
                    0% {
                        transform: scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    addGlowEffects() {
        // Efectos de glow dinámicos para iconos
        const icons = document.querySelectorAll('.status-icon i, .module-card .w-16.h-16 i');
        
        icons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.filter = 'drop-shadow(0 0 20px var(--neon-cyan)) drop-shadow(0 0 40px var(--neon-cyan))';
                icon.style.animation = 'icon-pulse 1.5s ease-in-out infinite';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.filter = 'drop-shadow(0 0 10px var(--neon-cyan))';
                icon.style.animation = 'none';
            });
        });
        
        // Agregar animación de pulso para iconos
        if (!document.getElementById('icon-pulse-animation')) {
            const style = document.createElement('style');
            style.id = 'icon-pulse-animation';
            style.textContent = `
                @keyframes icon-pulse {
                    0%, 100% {
                        text-shadow: 0 0 20px var(--neon-cyan);
                        transform: scale(1);
                    }
                    50% {
                        text-shadow: 0 0 30px var(--neon-cyan), 0 0 50px var(--neon-cyan);
                        transform: scale(1.1);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Efecto de scanlines futuristas
class HealthFlowScanlines {
    constructor() {
        this.init();
    }
    
    init() {
        this.createScanlines();
    }
    
    createScanlines() {
        if (document.getElementById('healthflow-scanlines')) return;
        
        const scanlines = document.createElement('div');
        scanlines.id = 'healthflow-scanlines';
        scanlines.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
            background: repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 255, 255, 0.02) 2px,
                rgba(0, 255, 255, 0.02) 4px
            );
            opacity: 0.3;
            animation: scanline-move 20s linear infinite;
        `;
        
        document.body.appendChild(scanlines);
        
        // Agregar animación de scanlines
        if (!document.getElementById('scanline-animation')) {
            const style = document.createElement('style');
            style.id = 'scanline-animation';
            style.textContent = `
                @keyframes scanline-move {
                    0% {
                        transform: translateY(-100%);
                    }
                    100% {
                        transform: translateY(100vh);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {    // Solo forzar tema oscuro si el loader no está visible
    const loader = document.getElementById('medicalLoading');
    if (!loader || loader.classList.contains('hidden')) {
        window.forceHealthFlowTheme();
    }
    
    // Esperar un poco para asegurar que todos los estilos estén cargados
    setTimeout(() => {
        new HealthFlowParticles();
        new HealthFlowCardEffects();
        new HealthFlowScanlines();
        
        // Agregar clase al body para indicar que los efectos están activos
        document.body.classList.add('healthflow-enhanced');
          // Solo forzar tema oscuro si el loader no está visible
        if (!loader || loader.classList.contains('hidden')) {
            window.forceHealthFlowTheme();
        }
        
        console.log('🚀 HealthFlow Pro Effects Initialized');
    }, 100);
});

// Función para actualizar los números de estadísticas con animación
function animateStats() {
    const statElements = document.querySelectorAll('.status-module .text-2xl');
    
    statElements.forEach(element => {
        const finalValue = parseInt(element.textContent.replace(/,/g, ''));
        let currentValue = 0;
        const increment = finalValue / 50;
        const duration = 2000; // 2 segundos
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            element.textContent = Math.floor(currentValue).toLocaleString();
        }, stepTime);
    });
}

// También forzar en window load
window.addEventListener('load', () => {    // Esperar a que el loader termine
    setTimeout(() => {
        window.forceHealthFlowTheme();
        setTimeout(animateStats, 500);
    }, 1000);
});

// Forzar tema solo después de que el loader termine
let themeInterval;
function startThemeForcing() {
    const loader = document.getElementById('medicalLoading');
    if (loader && loader.classList.contains('hidden')) {        // Solo iniciar el forzado del tema cuando el loader esté oculto
        if (!themeInterval) {
            themeInterval = setInterval(window.forceHealthFlowTheme, 2000); // Cada 2 segundos, menos agresivo
        }
    } else {
        // Si el loader está visible, esperar
        setTimeout(startThemeForcing, 500);
    }
}

// Iniciar el forzado del tema después de que todo cargue
setTimeout(startThemeForcing, 2000);

// Función para forzar el fondo oscuro (pero sin afectar el loader)
window.forceHealthFlowTheme = function() {
    // NO ejecutar si el loader está visible
    const loader = document.getElementById('medicalLoading');
    if (loader && !loader.classList.contains('hidden')) {
        return; // No interferir con el loader
    }
    
    // Forzar estilos en el HTML y BODY
    const html = document.documentElement;
    const body = document.body;
    
    html.style.cssText = `
        background: #000a0e !important;
        background-color: #000a0e !important;
        color: #ffffff !important;
    `;
    
    body.style.cssText = `
        background: #000a0e !important;
        background-color: #000a0e !important;
        color: #ffffff !important;
        background-image: 
            radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(128, 0, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 0, 128, 0.08) 0%, transparent 50%),
            linear-gradient(180deg, #000a0e 0%, #0a1728 100%) !important;
    `;
    
    // Forzar estilos en el main
    const main = document.querySelector('main');
    if (main) {
        main.style.cssText = `
            background: transparent !important;
            background-color: transparent !important;
            color: #ffffff !important;
        `;
    }
    
    // Remover clases problemáticas de Tailwind
    const problematicClasses = ['bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-200'];
    document.querySelectorAll('*').forEach(element => {
        // Saltar el loader y sus hijos
        if (element.closest('#medicalLoading')) return;
        
        problematicClasses.forEach(className => {
            if (element.classList.contains(className)) {
                element.classList.remove(className);
                element.style.background = 'rgba(0, 255, 255, 0.08)';
                element.style.backgroundColor = 'rgba(0, 255, 255, 0.08)';
            }        });
    });
};
