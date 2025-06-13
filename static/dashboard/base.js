// Animación de aparición para tarjetas, módulos y secciones
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fade-in, .card-glass, .glassmorphism, .module-card").forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = "scale(0.97) translateY(20px)";
    setTimeout(() => {
      el.style.transition = "opacity .7s cubic-bezier(.4,2,.3,1), transform .7s cubic-bezier(.4,2,.3,1)";
      el.style.opacity = 1;
      el.style.transform = "scale(1) translateY(0)";
    }, 200 + i * 80);
  });
});

// Dropdown animado de usuario
const userDropdown = document.getElementById('userDropdown');
const userDropdownMenu = document.getElementById('userDropdownMenu');
if (userDropdown && userDropdownMenu) {
  userDropdown.addEventListener('click', function(e) {
    e.stopPropagation();
    userDropdownMenu.classList.toggle('opacity-0');
    userDropdownMenu.classList.toggle('invisible');
    userDropdownMenu.classList.toggle('scale-95');
    userDropdownMenu.classList.toggle('scale-100');
  });
  document.addEventListener('click', function(e) {
    if (!userDropdown.contains(e.target) && !userDropdownMenu.contains(e.target)) {
      userDropdownMenu.classList.add('opacity-0','invisible','scale-95');
      userDropdownMenu.classList.remove('scale-100');
    }
  });
}

// Efecto ripple para botones y tarjetas
function addRippleEffect() {
  document.querySelectorAll('button, .btn-accent, .ripple-parent, .module-card').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = btn.getBoundingClientRect();
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height)}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}
addRippleEffect();

// Notificaciones animadas
function showNotification(message, type = "success", duration = 3500) {
  const container = document.getElementById('notification-container');
  const notif = document.createElement('div');
  notif.className = `fade-in px-6 py-4 mb-3 rounded-xl shadow-xl font-medium ${type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`;
  notif.innerHTML = message;
  container.appendChild(notif);
  setTimeout(() => {
    notif.style.opacity = 0;
    notif.style.transform = "scale(.97)";
    setTimeout(() => notif.remove(), 400);
  }, duration);
}

// Animación para iconos interactivos
function addIconHoverEffect() {
  document.querySelectorAll('.lucide, .fa, .bi').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transition = 'color .2s, text-shadow .2s';
      icon.style.color = '#8b5cf6';
      icon.style.textShadow = '0 0 12px #8b5cf6cc';
    });
    icon.addEventListener('mouseleave', () => {
      icon.style.color = '';
      icon.style.textShadow = '';
    });
  });
}
addIconHoverEffect();

// Sidebar expand/collapse en desktop
const sidebar = document.querySelector('.sidebar');
if (sidebar) {
  sidebar.addEventListener('mouseenter', () => sidebar.classList.add('expanded'));
  sidebar.addEventListener('mouseleave', () => sidebar.classList.remove('expanded'));
}

// Responsive: mostrar/ocultar sidebar en móvil (si implementas botón)
const sidebarToggle = document.getElementById('sidebarToggle');
if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
  });
}

// Mostrar animación fade-in para el contenido principal
window.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  if (main) {
    main.classList.add('fade-in');
  }
});

// Demo: puedes agregar aquí más efectos premium según lo que necesites