from django import forms
from applications.doctor.models import Diagnosis

class DiagnosisForm(forms.ModelForm):
    class Meta:
        model = Diagnosis
        fields = [
            'patient',
            'description',
            'icd_code',
            'notes',
            'is_active',
        ]
        widgets = {
            'patient': forms.Select(attrs={'class': 'form-control'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Descripción del diagnóstico', 'rows': 3}),
            'icd_code': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Código CIE'}),
            'notes': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Notas adicionales', 'rows': 2}),
            'is_active': forms.CheckboxInput(attrs={'class': 'form-checkbox'}),
        }