// Dropdown de usuario mejorado
function setupUserDropdown() {
    const userDropdown = document.getElementById('userDropdown');
    const userDropdownMenu = document.getElementById('userDropdownMenu');
    const userDropdownIcon = document.getElementById('userDropdownIcon');
    
    if (userDropdown && userDropdownMenu) {
        // Estados del dropdown
        function hideDropdown() {
            userDropdownMenu.classList.add('opacity-0', 'invisible', 'scale-95');
            userDropdownMenu.classList.remove('opacity-100', 'visible', 'scale-100');
            if (userDropdownIcon) {
                userDropdownIcon.classList.remove('rotate-180');
            }
            userDropdown.setAttribute('aria-expanded', 'false');
        }
        
        function showDropdown() {
            userDropdownMenu.classList.remove('opacity-0', 'invisible', 'scale-95');
            userDropdownMenu.classList.add('opacity-100', 'visible', 'scale-100');
            if (userDropdownIcon) {
                userDropdownIcon.classList.add('rotate-180');
            }
            userDropdown.setAttribute('aria-expanded', 'true');
        }
        
        function isDropdownOpen() {
            return userDropdownMenu.classList.contains('opacity-100') && 
                   userDropdownMenu.classList.contains('visible') && 
                   userDropdownMenu.classList.contains('scale-100');
        }
        
        // Toggle dropdown al hacer clic
        userDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (isDropdownOpen()) {
                hideDropdown();
            } else {
                showDropdown();
            }
        });
        
        // Cerrar dropdown al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!userDropdown.contains(e.target) && !userDropdownMenu.contains(e.target)) {
                hideDropdown();
            }
        });
        
        // Prevenir que clicks dentro del dropdown lo cierren
        userDropdownMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Navegación con teclado
        userDropdown.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (isDropdownOpen()) {
                    hideDropdown();
                } else {
                    showDropdown();
                }
            } else if (e.key === 'Escape') {
                hideDropdown();
            } else if (e.key === 'ArrowDown' && !isDropdownOpen()) {
                e.preventDefault();
                showDropdown();
                // Focus en el primer item del menu
                const firstItem = userDropdownMenu.querySelector('.dropdown-item');
                if (firstItem) firstItem.focus();
            }
        });
        
        // Navegación dentro del dropdown
        userDropdownMenu.addEventListener('keydown', function(e) {
            const items = Array.from(userDropdownMenu.querySelectorAll('.dropdown-item'));
            const currentIndex = items.indexOf(document.activeElement);
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % items.length;
                items[nextIndex].focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
                items[prevIndex].focus();
            } else if (e.key === 'Escape') {
                hideDropdown();
                userDropdown.focus();
            }
        });
        
        // Inicializar cerrado
        hideDropdown();
    }
}

// Selector de grupos mejorado
function setupGroupsSelector() {
    const groupSelectEl = document.getElementById('groupSelect');
    
    if (groupSelectEl) {
        // Mejorar el cambio de grupo con feedback visual
        groupSelectEl.addEventListener('change', function() {
            const selectedGroupId = this.value;
            const selectedText = this.options[this.selectedIndex].text;
            
            // Agregar indicador de carga
            this.style.opacity = '0.6';
            this.disabled = true;
            
            // Mostrar notificación de cambio
            if (selectedGroupId) {
                showToast(`Cambiando a grupo: ${selectedText}`, 'info', 2000);
            } else {
                showToast('Eliminando selección de grupo', 'info', 2000);
            }
            
            // Crear URL con parámetro de grupo
            const currentUrl = new URL(window.location);
            if (selectedGroupId) {
                currentUrl.searchParams.set('gpid', selectedGroupId);
            } else {
                currentUrl.searchParams.delete('gpid');
            }
            
            // Mostrar mensaje de cambio de grupo en el selector
            const originalText = this.options[this.selectedIndex].text;
            this.options[this.selectedIndex].text = 'Cambiando...';
            
            // Redirigir después de un pequeño delay para mejor UX
            setTimeout(() => {
                window.location.href = currentUrl.toString();
            }, 500);
        });
        
        // Agregar efecto hover mejorado
        groupSelectEl.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.borderColor = 'var(--neon-cyan)';
            }
        });
        
        groupSelectEl.addEventListener('mouseleave', function() {
            if (document.activeElement !== this && !this.disabled) {
                this.style.borderColor = 'rgba(59, 130, 246, 0.3)';
            }
        });
        
        // Mejorar el focus
        groupSelectEl.addEventListener('focus', function() {
            if (!this.disabled) {
                this.style.borderColor = 'var(--neon-cyan)';
                this.style.boxShadow = '0 0 0 3px rgba(0, 255, 255, 0.2)';
            }
        });
        
        groupSelectEl.addEventListener('blur', function() {
            if (!this.disabled) {
                this.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                this.style.boxShadow = 'none';
            }
        });
        
        // Mostrar información del grupo actual si existe
        const currentGroup = groupSelectEl.options[groupSelectEl.selectedIndex];
        if (currentGroup && currentGroup.value) {
            console.log('Grupo actual:', currentGroup.text);
        }
    }
    
    // Compatibilidad con el selector genérico anterior
    const genericSelector = document.querySelector('select:not(#groupSelect)');
    if (genericSelector && !document.getElementById('groupSelect')) {
        genericSelector.addEventListener('change', function() {
            const selectedGroup = this.value;
            if (selectedGroup) {
                console.log('Selected group:', selectedGroup);
                showToast('Grupo seleccionado correctamente', 'success', 2000);
            }
        });
    }
}

// Animaciones de entrada para tarjetas de estadísticas
function animateStatsCards() {
    const statsCards = document.querySelectorAll('.grid > div');
    statsCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    // Smooth scroll to modules on stats card click
    statsCards.forEach(card => {
        card.addEventListener('click', function() {
            const target = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Efecto ripple en botones
function setupButtonRipples() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.disabled) return;
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Animaciones con IntersectionObserver para module-card
function setupModuleCardObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInRight 0.6s ease-out forwards';
            }
        });
    }, observerOptions);
    document.querySelectorAll('.module-card').forEach(card => {
        observer.observe(card);
    });
}

// Loader global (MedicalLoader)
class MedicalLoader {
    constructor() {
        this.loader = document.getElementById('medicalLoading');
        this.progressFill = document.getElementById('progressFill');
        this.mainContent = document.querySelector('.main-content');
        this.isLoading = true;
        this.init();
    }
    init() {
        this.showLoader();
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

// Función para mostrar notificaciones toast
function showToast(message, type = 'info', duration = 3000) {
    // Crear o obtener el contenedor de toasts
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'fixed top-20 right-4 z-[9999] space-y-2';
        document.body.appendChild(toastContainer);
    }
    
    // Crear el toast
    const toast = document.createElement('div');
    toast.className = `
        toast-notification
        bg-gray-900/90 backdrop-blur-lg 
        border border-cyan-400/30 
        rounded-lg px-4 py-3 
        shadow-xl shadow-cyan-500/20
        transform translate-x-full 
        transition-all duration-300 ease-in-out
        max-w-sm
    `;
    
    // Iconos según el tipo
    const icons = {
        info: '<svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
        success: '<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>',
        warning: '<svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg>',
        error: '<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
    };
    
    const colors = {
        info: 'border-cyan-400/30 shadow-cyan-500/20',
        success: 'border-green-400/30 shadow-green-500/20',
        warning: 'border-yellow-400/30 shadow-yellow-500/20',
        error: 'border-red-400/30 shadow-red-500/20'
    };
    
    toast.innerHTML = `
        <div class="flex items-center gap-3">
            ${icons[type] || icons.info}
            <p class="text-white text-sm font-medium">${message}</p>
            <button class="toast-close ml-auto text-gray-400 hover:text-white transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    // Actualizar clases según el tipo
    toast.className = toast.className.replace('border-cyan-400/30 shadow-cyan-500/20', colors[type] || colors.info);
    
    // Agregar al contenedor
    toastContainer.appendChild(toast);
    
    // Animar entrada
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
        toast.classList.add('translate-x-0');
    }, 10);
    
    // Función para cerrar el toast
    function closeToast() {
        toast.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
    
    // Event listener para el botón de cerrar
    toast.querySelector('.toast-close').addEventListener('click', closeToast);
    
    // Auto-cerrar después del tiempo especificado
    if (duration > 0) {
        setTimeout(closeToast, duration);
    }
    
    return toast;
}

// Premium Logo Interactions
document.addEventListener('DOMContentLoaded', function() {
    const logoContainer = document.querySelector('.premium-logo-container');
    const logoSvg = document.querySelector('.premium-logo-svg');
    const brandTitle = document.querySelector('.premium-brand-title');
    
    if (logoContainer && logoSvg && brandTitle) {
        // Enhanced logo hover effects
        logoContainer.addEventListener('mouseenter', function() {
            // Add premium pulse effect
            logoSvg.style.animation = 'logoPulse 0.6s ease-out';
            
            // Enhance text glow on logo hover
            const textElements = brandTitle.querySelectorAll('span');
            textElements.forEach((span, index) => {
                setTimeout(() => {
                    span.style.animationDuration = '0.8s';
                }, index * 100);
            });
        });
        
        logoContainer.addEventListener('mouseleave', function() {
            // Reset animations
            logoSvg.style.animation = '';
            
            const textElements = brandTitle.querySelectorAll('span');
            textElements.forEach(span => {
                span.style.animationDuration = '3s';
            });
        });
        
        // Click effect for logo
        logoContainer.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'logo-ripple';
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 1;
                animation: logoRipple 0.6s ease-out;
            `;
            
            logoContainer.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
            
            // Add bounce effect to title
            brandTitle.style.animation = 'titleBounce 0.5s ease-out';
            setTimeout(() => {
                brandTitle.style.animation = '';
            }, 500);
        });
        
        // Add dynamic styles to document
        const dynamicStyles = document.createElement('style');
        dynamicStyles.textContent = `
            @keyframes logoPulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.15); }
                100% { transform: scale(1.05); }
            }
            
            @keyframes logoRipple {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 1;
                }
                100% {
                    width: 120px;
                    height: 120px;
                    opacity: 0;
                }
            }
            
            @keyframes titleBounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                }
                40% {
                    transform: translateY(-5px);
                }
                60% {
                    transform: translateY(-3px);
                }
            }
        `;
        document.head.appendChild(dynamicStyles);
    }
    
    // Text selection effects
    const brandTexts = document.querySelectorAll('.health-text, .flow-text, .pro-text');
    brandTexts.forEach(text => {
        text.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';        });
        
        text.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Smart Search Functionality
    function setupSmartSearch() {
        const searchInput = document.getElementById('smartSearch');
        const searchIcon = document.querySelector('.search-icon');
        
        if (searchInput && searchIcon) {
            // Funcionalidad de búsqueda inteligente
            let searchTimeout;
            
            searchInput.addEventListener('input', function(e) {
                const query = e.target.value.trim();
                
                // Limpiar timeout anterior
                if (searchTimeout) {
                    clearTimeout(searchTimeout);
                }
                
                // Añadir efecto visual mientras se escribe
                if (query.length > 0) {
                    searchIcon.style.color = '#00D4FF';
                    searchIcon.style.filter = 'drop-shadow(0 4px 12px rgba(0, 212, 255, 0.6))';
                    searchInput.style.borderColor = 'rgba(0, 212, 255, 0.4)';
                } else {
                    searchIcon.style.color = 'rgba(0, 212, 255, 0.7)';
                    searchIcon.style.filter = 'drop-shadow(0 2px 8px rgba(0, 212, 255, 0.4))';
                    searchInput.style.borderColor = 'rgba(0, 212, 255, 0.25)';
                }
                
                // Buscar después de 300ms de pausa en la escritura
                searchTimeout = setTimeout(() => {
                    if (query.length >= 2) {
                        performSearch(query);
                    }
                }, 300);
            });
            
            // Efecto de focus/blur
            searchInput.addEventListener('focus', function() {
                searchIcon.style.transform = 'translateY(-50%) scale(1.1)';
                searchInput.style.background = 'rgba(15, 23, 42, 0.85)';
            });
            
            searchInput.addEventListener('blur', function() {
                if (!searchInput.value) {
                    searchIcon.style.transform = 'translateY(-50%)';
                    searchInput.style.background = 'rgba(15, 23, 42, 0.75)';
                }
            });
            
            // Enter para buscar
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const query = searchInput.value.trim();
                    if (query.length >= 1) {
                        performSearch(query);
                    }
                }
            });
            
            // Escape para limpiar
            searchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    searchInput.value = '';
                    searchInput.blur();
                    hideSearchResults();
                }
            });
        }
    }

    // Función para realizar la búsqueda
    function performSearch(query) {
        console.log('Búsqueda realizada:', query);
        
        // Mostrar indicador de búsqueda
        showSearchIndicator();
        
        // Simular búsqueda (reemplazar con lógica real)
        setTimeout(() => {
            hideSearchIndicator();
            showSearchResults(query);
        }, 500);
    }

    // Mostrar indicador de carga en la búsqueda
    function showSearchIndicator() {
        const searchIcon = document.querySelector('.search-icon');
        if (searchIcon) {
            searchIcon.style.animation = 'spin 1s linear infinite';
        }
    }

    // Ocultar indicador de carga
    function hideSearchIndicator() {
        const searchIcon = document.querySelector('.search-icon');
        if (searchIcon) {
            searchIcon.style.animation = '';
        }
    }

    // Mostrar resultados de búsqueda (placeholder)
    function showSearchResults(query) {
        console.log('Mostrando resultados para:', query);
    }

    // Ocultar resultados de búsqueda
    function hideSearchResults() {
        console.log('Ocultando resultados de búsqueda');
    }

    // Agregar animación de spin para el icono de búsqueda
    function addSearchStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                from { transform: translateY(-50%) rotate(0deg); }
                to { transform: translateY(-50%) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }    // Inicializar estilos
    addSearchStyles();

    // Inicialización principal
    document.addEventListener('DOMContentLoaded', function() {
        setupUserDropdown();
        setupGroupsSelector();
        setupSmartSearch();
        animateStatsCards();
        setupButtonRipples();
        setupModuleCardObserver();
        setupMedicalLoader();
    });
})();
