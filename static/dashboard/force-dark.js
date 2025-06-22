// HealthFlow Pro - Forzar Tema Oscuro Inmediato
(function() {
    'use strict';
    
    // Aplicar estilos inmediatamente al cargar el script
    const style = document.createElement('style');
    style.textContent = `
        html, body {
            background: #000a0e !important;
            background-color: #000a0e !important;
            color: #ffffff !important;
        }
        
        body {
            background-image: 
                radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(128, 0, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(255, 0, 128, 0.08) 0%, transparent 50%),
                linear-gradient(180deg, #000a0e 0%, #0a1728 100%) !important;
        }
        
        * {
            background: transparent !important;
            background-color: transparent !important;
        }
        
        .glass-effect, .status-module, .module-card, .welcome-card, 
        .glass-header, .glass-footer, .search-input {
            background: rgba(0, 255, 255, 0.05) !important;
            background-color: rgba(0, 255, 255, 0.05) !important;
        }
        
        .bg-white, .bg-gray-50, .bg-gray-100, .bg-gray-200 {
            background: rgba(0, 255, 255, 0.08) !important;
            background-color: rgba(0, 255, 255, 0.08) !important;
        }
        
        main, .container, .w-full, .max-w-7xl, .mx-auto {
            background: transparent !important;
            background-color: transparent !important;
            color: #ffffff !important;
        }
    `;
    
    // Insertar el estilo en el head
    document.head.appendChild(style);
    
    // Aplicar estilos inline también
    document.documentElement.style.cssText = 'background: #000a0e !important; background-color: #000a0e !important;';
    document.body.style.cssText = 'background: #000a0e !important; background-color: #000a0e !important; color: #ffffff !important;';
    
    console.log('✅ HealthFlow Dark Theme Force Applied');
})();
