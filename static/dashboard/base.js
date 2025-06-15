// ===== SISTEMA MÉDICO FUTURISTA - CORE JS =====

class MedicalSystemCore {
    constructor() {
        this.isInitialized = false;
        this.notifications = [];
        this.particles = [];
        this.sidebarCollapsed = window.innerWidth < 768;
        
        this.init();
    }
    
    init() {
        if (this.isInitialized) return;
        
        this.initEventListeners();
        this.initFloatingElements();
        this.initNotificationSystem();
        this.initSidebar();
        this.initSearchEnhancements();
        this.initGlobalEffects();
        this.initPerformanceOptimizations();
        
        this.isInitialized = true;
        console.log('🚀 Sistema Médico Futurista Inicializado');
    }
    
    // ===== EVENT LISTENERS =====
    initEventListeners() {
        // Resize handler
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Mouse movement para efectos de parallax
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
        
        // Click effects
        document.addEventListener('click', this.handleGlobalClick.bind(this));
        
        // Scroll effects
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    
    // ===== EFECTOS FLOTANTES =====
    initFloatingElements() {
        const container = document.querySelector('.floating-elements');
        if (!container) return;
                
        // Crear ondas de fondo
        this.createBackgroundWaves(container);
    }
    
    
    createBackgroundWaves(container) {
        const wave = document.createElement('div');
        wave.className = 'background-wave';
        wave.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at 30% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%);
            animation: waveMove 20s infinite linear;
            pointer-events: none;
        `;
        container.appendChild(wave);
    }
    
    // ===== SISTEMA DE NOTIFICACIONES PREMIUM =====
    initNotificationSystem() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 1000;
            max-width: 400px;
        `;
        document.body.appendChild(container);
    }

    // Mostrar notificación
    notify(message, type = 'info', duration = 4000) {
        const container = document.getElementById('notification-container');
        if (!container) return;
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `<span>${message}</span>`;
        container.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, duration);
    }

    // ===== SIDEBAR Y NAVEGACIÓN =====
    initSidebar() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;
        // Ejemplo: toggle sidebar
        const toggleBtn = document.querySelector('.sidebar-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
            });
        }
    }

    // ===== BUSCADOR AVANZADO =====
    initSearchEnhancements() {
        // Puedes agregar aquí lógica para autocompletar, filtros, etc.
    }

    // ===== EFECTOS GLOBALES =====
    initGlobalEffects() {
        // Loader global eliminado: ahora lo gestiona MedicalLoader de forma independiente
        // this.initMedicalLoader(); // <-- ELIMINADO
    }

    // ===== OPTIMIZACIONES =====
    initPerformanceOptimizations() {
        // Lazy load imágenes, debounce, etc.
    };

    // ===== HANDLERS =====
    handleResize() {
        // Lógica para responsive
    }
    handleMouseMove(e) {
        // Parallax o efectos visuales
    }
    handleKeyboard(e) {
        // Atajos de teclado globales
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            this.notify('Atajo: Buscar (Ctrl+K)', 'info');
        }
    }
    handleGlobalClick(e) {
        // Cerrar menús, tooltips, etc.
    }
    handleScroll() {
        // Efectos al hacer scroll
    }

    // ===== AJAX SEGURO CON CSRF (Django) =====
    getCSRFToken() {
        const name = 'csrftoken';
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + '=')) {
                return decodeURIComponent(cookie.substring(name.length + 1));
            }
        }
        return '';
    }
    async ajax(url, options = {}) {
        options.headers = options.headers || {};
        if (!options.headers['X-CSRFToken']) {
            options.headers['X-CSRFToken'] = this.getCSRFToken();
        }
        this.showLoader();
        try {
            const response = await fetch(url, options);
            this.hideLoader();
            if (!response.ok) throw new Error('Error en la petición');
            return await response.json();
        } catch (err) {
            this.hideLoader();
            this.notify('Error de red: ' + err.message, 'error');
            throw err;
        }
    }
}

// ===== INICIALIZACIÓN GLOBAL =====
window.MedicalSystem = new MedicalSystemCore();

// ===== LOADER FUTURISTA MÉDICO (CORREGIDO) =====
class MedicalLoader {
    constructor() {
        this.loader = document.getElementById('medicalLoading');
        this.progressFill = document.getElementById('progressFill');
        this.mainContent = document.querySelector('.main-content');
        this.isLoading = true;
        this.init();
    }
    init() {
        // Mostrar loader inmediatamente
        this.showLoader();
        // Simular carga del sistema
        this.simulateLoading();
    }
    showLoader() {
        if (!this.loader) return;
        this.loader.style.display = 'flex';
        this.loader.style.opacity = '1';
        this.loader.style.visibility = 'visible';
        this.loader.style.pointerEvents = 'all';
        if (this.mainContent) {
            this.mainContent.style.opacity = '0';
            this.mainContent.style.pointerEvents = 'none';
        }
    }
    simulateLoading() {
        setTimeout(() => {
            if (this.progressFill) {
                this.progressFill.style.width = '100%';
            }
        }, 100);
        setTimeout(() => {
            this.hideLoader();
        }, 3500);
    }
    hideLoader() {
        if (!this.loader) return;
        this.loader.classList.add('hidden');
        setTimeout(() => {
            this.loader.style.display = 'none';
            if (this.mainContent) {
                this.mainContent.style.opacity = '1';
                this.mainContent.style.pointerEvents = 'auto';
            }
            this.isLoading = false;
        }, 500);
    }
    show() {
        this.isLoading = true;
        this.showLoader();
        if (this.progressFill) {
            this.progressFill.style.transition = 'none';
            this.progressFill.style.width = '0%';
            setTimeout(() => {
                this.progressFill.style.transition = 'width 2.5s linear';
                this.progressFill.style.width = '100%';
            }, 50);
        }
    }
    hide() {
        this.hideLoader();
    }
}
// Inicializar cuando el DOM esté listo
(function() {
    function startLoader() {
        window.medicalLoader = new MedicalLoader();
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startLoader);
    } else {
        startLoader();
    }
    // Atajo para probar el loader manualmente (Ctrl+L)
    window.toggleLoader = function() {
        if (window.medicalLoader) {
            if (window.medicalLoader.isLoading) {
                window.medicalLoader.hide();
            } else {
                window.medicalLoader.show();
                setTimeout(() => window.medicalLoader.hide(), 3500);
            }
        }
    };
    document.addEventListener('keydown', function(e) {
        if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            window.toggleLoader();
        }
    });
})();

// ===== MANEJO DE ERRORES GLOBALES =====
window.addEventListener('error', function(e) {
    if (window.MedicalSystem) {
        window.MedicalSystem.notify('Error JS: ' + e.message, 'error', 6000);
    }
});
window.addEventListener('unhandledrejection', function(e) {
    if (window.MedicalSystem) {
        window.MedicalSystem.notify('Promesa no resuelta: ' + e.reason, 'error', 6000);
    }
});

// ===== ESTILOS DINÁMICOS PARA NOTIFICACIONES Y LOADER (opcional, puedes mover a CSS) =====
(function(){
    const style = document.createElement('style');
    style.innerHTML = `
    .notification { background: #fff; color: #222; border-left: 5px solid #007bff; padding: 12px 18px; margin-bottom: 10px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); opacity: 0.98; transition: opacity 0.5s; }
    .notification-info { border-color: #007bff; }
    .notification-success { border-color: #28a745; }
    .notification-error { border-color: #dc3545; }
    .notification-warning { border-color: #ffc107; }
    .notification.fade-out { opacity: 0; }
    #global-loader { display: none; align-items: center; justify-content: center; }
    .loader-spinner { border: 6px solid #f3f3f3; border-top: 6px solid #007bff; border-radius: 50%; width: 48px; height: 48px; animation: spin 1s linear infinite; }
    @keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
    `;
    document.head.appendChild(style);
})();
