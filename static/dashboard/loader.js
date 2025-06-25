// Loader Futurista Médico PRO
window.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded: loader.js ejecutado');
    const loader = document.getElementById('medicalLoading');
    console.log('Loader encontrado:', loader);
    if (!loader) {
        document.body.classList.remove('loading'); // Forzar quitar la clase loading si loader no existe
        return;
    }
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    const subtitle = document.getElementById('loadingSubtitle');
    const statusDb = document.getElementById('status-db');
    const loaderTitle = document.getElementById('loaderTitle');
    if (!loaderTitle) {
        console.log('Loader title element not found!');
    }
    // Forzar body y html para loader full screen
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlHeight = html.style.height;
    const prevBodyHeight = body.style.height;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.height = '100%';
    body.style.height = '100%';
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    // Crear status-server virtual si no existe
    let statusServer = document.getElementById('status-server');
    if (!statusServer) {
        statusServer = document.createElement('div');
        statusServer.id = 'status-server';
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
    let duration = 4200; // 4.2 segundos
    let intervalMs = 18;
    let steps = Math.floor(duration / intervalMs);
    let step = 0;
    let loaderFinished = false;
    function setStatusChecked(el) {
        if (el) el.classList.add('checked');
    }
    function resetLoaderVisuals() {
        if (progressFill) {
            progressFill.style.width = '0%';
            progressFill.style.transition = 'width 0.18s linear';
        }
        if (progressPercent) progressPercent.textContent = '0%';
        if (statusDb) statusDb.classList.remove('checked');
        if (statusServer) statusServer.classList.remove('checked');
        if (statusSec) statusSec.classList.remove('checked');
        if (subtitle) subtitle.textContent = messages[0];
    }
    function finishLoader() {
        if (loaderFinished) return;
        loaderFinished = true;
        if (progressFill) progressFill.style.width = '100%';
        // if (progressPercent) progressPercent.textContent = '100%';
        if (subtitle) subtitle.textContent = messages[4];
        setStatusChecked(statusDb);
        setStatusChecked(statusServer);
        setStatusChecked(statusSec);
        setTimeout(() => {
            if (loader) {
                loader.classList.add('hidden');
                loader.style.transition = 'opacity 0.6s ease-out';
                loader.style.opacity = '0';
                document.body.classList.remove('loading');
                // Restaurar estilos originales
                html.style.height = prevHtmlHeight;
                body.style.height = prevBodyHeight;
                html.style.overflow = prevHtmlOverflow;
                body.style.overflow = prevBodyOverflow;
                setTimeout(() => {
                    if (loader.parentNode) loader.parentNode.removeChild(loader);
                    console.log('Loader eliminado del DOM');
                }, 600);
            }
        }, 800);
    }
    function animateLoader() {
        // Solución mínima: animación forzada de 0 a 100% en 1 segundo
        let fakePercent = 0;
        const interval = setInterval(() => {
            fakePercent += 10;
            if (progressFill) progressFill.style.width = fakePercent + '%';
            if (progressPercent) progressPercent.textContent = fakePercent + '%';
            if (fakePercent === 10 && subtitle) subtitle.textContent = messages[1];
            if (fakePercent === 40 && subtitle) subtitle.textContent = messages[2];
            if (fakePercent === 70 && subtitle) subtitle.textContent = messages[3];
            if (fakePercent >= 100) {
                if (progressFill) progressFill.style.width = '100%';
                // if (progressPercent) progressPercent.textContent = '100%';
                if (subtitle) subtitle.textContent = messages[4];
                setStatusChecked(statusDb);
                setStatusChecked(statusServer);
                setStatusChecked(statusSec);
                clearInterval(interval);
                setTimeout(finishLoader, 400);
            }
        }, 100);
    }
    // Siempre reinicia y ejecuta la animación
    loader.classList.remove('hidden');
    loader.style.opacity = '1';
    loader.style.transition = '';
    if (progressFill) progressFill.style.width = '100%';
    // if (progressPercent) progressPercent.textContent = '100%';
    if (subtitle) subtitle.textContent = messages[4];
    setStatusChecked(statusDb);
    setStatusChecked(statusServer);
    setStatusChecked(statusSec);
    setTimeout(() => {
        console.log('Forzando finishLoader tras 800ms');
        finishLoader();
    }, 800); // Oculta el loader tras 0.8s
    setTimeout(() => {
        if (!loaderFinished) {
            if (progressFill) progressFill.style.width = '100%';
            // if (progressPercent) progressPercent.textContent = '100%';
            if (subtitle) subtitle.textContent = '¡Listo para usar! (emergencia)';
            setStatusChecked(statusDb);
            setStatusChecked(statusServer);
            setStatusChecked(statusSec);
            finishLoader();
            console.log('Forzando finishLoader tras 7s (emergencia)');
        }
    }, 7000);
    window.addEventListener('beforeunload', function() {
        if (loader) loader.classList.remove('hidden');
    });
    document.body.classList.add('loading');
    window.resetMedicalLoader = resetLoaderVisuals;
});

window.addEventListener('load', function() {
    const loader = document.getElementById('medicalLoading');
    setTimeout(() => {
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            loader.style.transition = 'opacity 0.6s cubic-bezier(.4,2,.6,1)';
            loader.style.opacity = '0';
            document.body.classList.remove('loading');
            // Restaurar estilos originales si loader se fuerza a cerrar
            const html = document.documentElement;
            const body = document.body;
            html.style.height = '';
            body.style.height = '';
            html.style.overflow = '';
            body.style.overflow = '';
            setTimeout(() => {
                if (loader.parentNode) loader.parentNode.removeChild(loader);
                console.log('Loader eliminado del DOM tras 7s');
            }, 700);
        }
    }, 7000);
});
