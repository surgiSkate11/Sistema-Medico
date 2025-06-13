from django.contrib import messages
from django.urls import reverse_lazy
from applications.security.components.mixin_crud import CreateViewMixin, DeleteViewMixin, ListViewMixin, PermissionMixin, UpdateViewMixin
from applications.doctor.models import Appointment
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.db.models import Q

class AppointmentListView(PermissionMixin, ListViewMixin, ListView):
    template_name = 'doctor/appointments/list.html'
    model = Appointment
    context_object_name = 'appointments'
    permission_required = 'view_appointment'

    def get_queryset(self):
        q1 = self.request.GET.get('q')
        if q1 is not None:
            self.query.add(Q(patient__first_name__icontains=q1), Q.OR)
            self.query.add(Q(patient__last_name__icontains=q1), Q.OR)
            self.query.add(Q(doctor_name__icontains=q1), Q.OR)
            self.query.add(Q(reason__icontains=q1), Q.OR)
        return self.model.objects.filter(self.query).order_by('-date', '-time')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['create_url'] = reverse_lazy('doctor:appointment_create')
        return context

class AppointmentCreateView(PermissionMixin, CreateViewMixin, CreateView):
    model = Appointment
    template_name = 'doctor/appointments/form.html'
    fields = ['patient', 'doctor_name', 'date', 'time', 'reason', 'notes', 'is_active']
    success_url = reverse_lazy('doctor:appointment_list')
    permission_required = 'add_appointment'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['grabar'] = 'Grabar Cita'
        context['back_url'] = self.success_url
        context['title1'] = 'Nueva Cita'
        return context

    def form_valid(self, form):
        response = super().form_valid(form)
        appointment = self.object
        messages.success(self.request, f"Éxito al crear la cita para {appointment.patient} el {appointment.date}.")
        return response

class AppointmentUpdateView(PermissionMixin, UpdateViewMixin, UpdateView):
    model = Appointment
    template_name = 'doctor/appointments/form.html'
    fields = ['patient', 'doctor_name', 'date', 'time', 'reason', 'notes', 'is_active']
    success_url = reverse_lazy('doctor:appointment_list')
    permission_required = 'change_appointment'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['grabar'] = 'Actualizar Cita'
        context['back_url'] = self.success_url
        context['title1'] = 'Editar Cita'
        return context

    def form_valid(self, form):
        response = super().form_valid(form)
        appointment = self.object
        messages.success(self.request, f"Éxito al actualizar la cita para {appointment.patient} el {appointment.date}.")
        return response

class AppointmentDeleteView(PermissionMixin, DeleteViewMixin, DeleteView):
    model = Appointment
    template_name = 'core/delete.html'
    success_url = reverse_lazy('doctor:appointment_list')
    permission_required = 'delete_appointment'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['grabar'] = 'Eliminar Cita'
        context['description'] = f"¿Desea eliminar la cita de {self.object.patient} el {self.object.date}?"
        context['back_url'] = self.success_url
        return context

    def form_valid(self, form):
        appointment_info = f"{self.object.patient} el {self.object.date}"
        response = super().form_valid(form)
        messages.success(self.request, f"Éxito al eliminar lógicamente la cita de {appointment_info}.")
        return response
