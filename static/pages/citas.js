// Modal lógica
const openBtn = document.getElementById("openCitaModal");
const closeBtn = document.getElementById("closeCitaModal");
const modal = document.getElementById("citaModal");

if(openBtn && closeBtn && modal) {
  openBtn.onclick = () => {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.querySelector('input,select,textarea').focus();
    }, 200);
  };
  closeBtn.onclick = () => modal.classList.add('hidden');
  window.onclick = (e) => {
    if(e.target === modal) modal.classList.add('hidden');
  };
  window.addEventListener('keydown', function(e){
    if(e.key === "Escape") modal.classList.add('hidden');
  });
}

// Ripple efecto en botones
document.querySelectorAll('.ripple').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    const rect = btn.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height)}px`;
    ripple.style.position = 'absolute';
    ripple.style.background = 'rgba(139,92,246,0.29)';
    ripple.style.pointerEvents = 'none';
    ripple.style.borderRadius = '100%';
    ripple.style.transform = 'translate(-50%,-50%) scale(0)';
    ripple.style.opacity = '0.7';
    ripple.style.transition = 'transform .49s cubic-bezier(.4,2,.3,1), opacity .5s';
    btn.appendChild(ripple);
    setTimeout(()=>{ripple.style.transform='translate(-50%,-50%) scale(1.6)';ripple.style.opacity='0';},10);
    setTimeout(()=>ripple.remove(),520);
  });
});

// Feedback notificación animada
function showNotification(msg, type="success") {
  let container = document.getElementById('notification-container');
  if(!container) {
    container = document.createElement('div');
    container.id = "notification-container";
    container.style.position = "fixed";
    container.style.top = "3rem";
    container.style.right = "2.5rem";
    container.style.zIndex = 99999;
    document.body.appendChild(container);
  }
  const notif = document.createElement('div');
  notif.className = `fade-in px-6 py-3 mb-4 rounded-xl shadow-xl font-semibold ${type==="error"?"bg-pink-600 text-white":"bg-green-500 text-white"}`;
  notif.style.minWidth = "240px";
  notif.innerHTML = `<i class="fa-solid ${type==="error"?"fa-xmark-circle":"fa-circle-check"} mr-2"></i>${msg}`;
  container.appendChild(notif);
  setTimeout(()=>{notif.style.opacity=0;notif.style.transform="scale(.97)";setTimeout(()=>notif.remove(),400);},2600);
}

// Feedback al submit de nueva cita (demo, adaptar a tu backend)
const form = document.getElementById('formNuevaCita');
if(form) {
  form.addEventListener('submit', function(e){
    showNotification("¡Cita creada con éxito!");
    modal.classList.add('hidden');
    // Si usas AJAX, aquí podrías actualizar la tabla sin recargar.
  });
}