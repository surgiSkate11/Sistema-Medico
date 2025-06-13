from django.urls import path

from applications.doctor.views.patient import PatientListView, PatientCreateView, PatientUpdateView, PatientDeleteView

from applications.doctor.views.appointments import AppointmentListView, AppointmentCreateView, AppointmentUpdateView, AppointmentDeleteView

app_name = 'doctor'

urlpatterns = [
    # rutas de pacientes
    path('patient_list/', PatientListView.as_view(), name="patient_list"),
    path('patient_create/', PatientCreateView.as_view(), name="patient_create"),
    path('patient_update/<int:pk>/', PatientUpdateView.as_view(), name="patient_update"),
    path('patient_delete/<int:pk>/', PatientDeleteView.as_view(), name="patient_delete"),

    # rutas de citas
    path('appointment_list/', AppointmentListView.as_view(), name="appointment_list"),
    path('appointment_create/', AppointmentCreateView.as_view(), name="appointment_create"),
    path('appointment_update/<int:pk>/', AppointmentUpdateView.as_view(), name="appointment_update"),
    path('appointment_delete/<int:pk>/', AppointmentDeleteView.as_view(), name="appointment_delete"),
]