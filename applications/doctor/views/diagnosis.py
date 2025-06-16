from django.contrib import messages
from django.urls import reverse_lazy
from applications.security.components.mixin_crud import CreateViewMixin, DeleteViewMixin, ListViewMixin, PermissionMixin, UpdateViewMixin
from applications.doctor.models import Appointment, Diagnosis
from applications.doctor.forms.diagnosis import DiagnosisForm
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

class DiagnosisListView(PermissionMixin, ListViewMixin, ListView):
    template_name = 'doctor/diagnosticos/list.html'
    model = Diagnosis
    context_object_name = 'diagnoses'
    permission_required = 'view_diagnosis'

    def get_queryset(self):
        q1 = self.request.GET.get('q')
        query = Q()
        if q1:
            query |= Q(patient__first_name__icontains=q1)
            query |= Q(patient__last_name__icontains=q1)
            query |= Q(description__icontains=q1)
            query |= Q(icd_code__icontains=q1)
        return self.model.objects.filter(query)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['create_url'] = reverse_lazy('doctor:diagnosis_create')
        return context

class DiagnosisCreateView(PermissionMixin, CreateViewMixin, CreateView):
    model = Diagnosis
    form_class = DiagnosisForm
    template_name = 'doctor/diagnosticos/form.html'
    success_url = reverse_lazy('doctor:diagnosis_list')
    permission_required = 'add_diagnosis'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['grabar'] = 'Grabar Diagnóstico'
        context['back_url'] = self.success_url
        context['title1'] = 'Nuevo Diagnóstico'
        return context

    def form_valid(self, form):
        response = super().form_valid(form)
        diagnosis = self.object
        messages.success(self.request, f"Éxito al crear el diagnóstico para {diagnosis.patient}.")
        return response

class DiagnosisUpdateView(PermissionMixin, UpdateViewMixin, UpdateView):
    model = Diagnosis
    form_class = DiagnosisForm
    template_name = 'doctor/diagnosticos/form.html'
    success_url = reverse_lazy('doctor:diagnosis_list')
    permission_required = 'change_diagnosis'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['grabar'] = 'Actualizar Diagnóstico'
        context['back_url'] = self.success_url
        context['title1'] = 'Editar Diagnóstico'
        return context

    def form_valid(self, form):
        response = super().form_valid(form)
        diagnosis = self.object
        messages.success(self.request, f"Éxito al actualizar el diagnóstico para {diagnosis.patient}.")
        return response

class DiagnosisDeleteView(PermissionMixin, DeleteViewMixin, DeleteView):
    model = Diagnosis
    template_name = 'core/delete.html'
    success_url = reverse_lazy('doctor:diagnosis_list')
    permission_required = 'delete_diagnosis'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['grabar'] = 'Eliminar Diagnóstico'
        context['description'] = f"¿Desea eliminar el diagnóstico de {self.object.patient}?"
        context['back_url'] = self.success_url
        return context

    def form_valid(self, form):
        diagnosis_info = f"{self.object.patient}"
        response = super().form_valid(form)
        messages.success(self.request, f"Éxito al eliminar lógicamente el diagnóstico de {diagnosis_info}.")
        return response
