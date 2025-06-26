// Loader Futurista Médico PRO
window.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('medicalLoading');
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    const subtitle = document.getElementById('loadingSubtitle');
    const statusDb = document.getElementById('status-db');      // Forzar estilo del título para eliminar borrosidad
    const loaderTitle = document.getElementById('loaderTitle');
    // Eliminar cualquier forzado de estilos visuales desde JS, dejar solo el texto
    if (loaderTitle) {
        loaderTitle.textContent = 'SISTEMA MÉDICO';
        // Debug opcional
        // console.log('Loader title element found:', loaderTitle);
    } else {
        console.error('Loader title element not found!');
    }
    
    // El loader espera un status-server, pero no existe en loader.html, así que lo creamos virtualmente para la animación
    let statusServer = document.getElementById('status-server');
    if (!statusServer) {
        // Crear un div temporal invisible para no romper la animación
        statusServer = document.createElement('div');
        statusServer.style.display = 'none';
        document.body.appendChild(statusServer);
    }
    const statusSec = document.getElementById('status-sec');
    const messages = [
        'Inicializando protocolo avanzado...',
        'Verificando base de datos...',
        'Conectando con el servidor...',
        'Activando sistemas de seguridad...',
        '¡Listo para usar!'
    ];
    let percent = 0;
    let msgIndex = 0;
    let duration = 4200; // 4.2 segundos: premium, rápido pero visible
    let intervalMs = 18; // ultra fluido
    let steps = Math.floor(duration / intervalMs); // Usar Math.floor para asegurar el 100%
    let step = 0;
    function setStatusChecked(el) {
        if (el) el.classList.add('checked');
    }
    function animateLoader() {
        let interval = setInterval(() => {
            step++;
            // Forzar el último paso a 100% y asegurar que la barra llegue al final
            if (step >= steps) {
                percent = 100;
                if (progressFill) {
                    progressFill.style.width = '100%';
                    progressFill.style.transition = 'width 0.3s cubic-bezier(.4,2,.6,1)';
                }
                if (progressPercent) progressPercent.textContent = '100%';
            } else {
                percent = Math.round((step / steps) * 100);
                if (progressFill) {
                    progressFill.style.width = percent + '%';
                    progressFill.style.transition = 'width 0.18s linear';
                }
                if (progressPercent) progressPercent.textContent = percent + '%';
            }
            if (percent >= 18 && msgIndex === 0) {
                subtitle.textContent = messages[1];
                setStatusChecked(statusDb);
                msgIndex = 1;
            }
            if (percent >= 48 && msgIndex === 1) {
                subtitle.textContent = messages[2];
                setStatusChecked(statusServer);
                msgIndex = 2;
            }
            if (percent >= 78 && msgIndex === 2) {
                subtitle.textContent = messages[3];
                setStatusChecked(statusSec);
                msgIndex = 3;
            }
            // Cambia aquí: solo ocultar y eliminar el loader si la página ya está cargada
            if (step > steps) {
                subtitle.textContent = messages[4];
                function hideLoaderIfReady() {
                    if (document.readyState === 'complete') {
                        if (loader) {
                            loader.classList.add('hidden');
                            loader.style.transition = 'opacity 0.6s cubic-bezier(.4,2,.6,1)';
                            loader.style.opacity = '0';
                            document.body.classList.remove('loading');
                            setTimeout(() => {
                                if (loader.parentNode) loader.parentNode.removeChild(loader);
                            }, 700);
                        }
                    } else {
                        setTimeout(hideLoaderIfReady, 100);
                    }
                }
                setTimeout(hideLoaderIfReady, 500);
                clearInterval(interval);
            }
        }, intervalMs);
    }
    // Forzar el loader a ejecutarse siempre, incluso si la página se recarga rápido
    if (loader) {
        loader.classList.remove('hidden');
        loader.style.opacity = '1';
        loader.style.transition = '';
        if (progressFill) {
            progressFill.style.width = '0%';
            progressFill.style.transition = 'width 0.18s linear';
        }
        if (progressPercent) progressPercent.textContent = '0%';
        if (statusDb) statusDb.classList.remove('checked');
        if (statusServer) statusServer.classList.remove('checked');
        if (statusSec) statusSec.classList.remove('checked');
        subtitle.textContent = messages[0];
        // Esperar a que todo el DOM esté listo y forzar el loader
        setTimeout(animateLoader, 350);
        // Evitar que el loader se oculte por otros scripts antes de tiempo
        window.addEventListener('beforeunload', function(e) {
            if (loader) loader.classList.remove('hidden');
        });
    }

    // Función que se ejecuta cuando el loader termina
    function onLoaderComplete() {
        // Remover clase loading del body
        document.body.classList.remove('loading');
        
        // Activar el tema oscuro del dashboard
        setTimeout(() => {
            if (window.forceHealthFlowTheme) {
                window.forceHealthFlowTheme();
            }
        }, 500);
        
        console.log('🎯 Loader completed, activating dark theme');
    }

    // Agregar clase loading al body inicialmente
    document.body.classList.add('loading');
});

window.addEventListener('load', function() {
    // Solo forzar ocultar y eliminar el loader si sigue visible después de 7 segundos (por error)
    const loader = document.getElementById('medicalLoading');
    setTimeout(() => {
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            loader.style.transition = 'opacity 0.6s cubic-bezier(.4,2,.6,1)';
            loader.style.opacity = '0';
            document.body.classList.remove('loading');
            setTimeout(() => {
                if (loader.parentNode) loader.parentNode.removeChild(loader);
            }, 700);
        }
    }, 7000); // Solo si el loader sigue tras 7s
});
