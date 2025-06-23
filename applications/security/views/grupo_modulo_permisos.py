# Vistas para el manejo de grupos, módulos y permisos de seguridad

from django.contrib import messages
from django.urls import reverse_lazy
from applications.security.components.mixin_crud import CreateViewMixin, DeleteViewMixin, ListViewMixin, PermissionMixin, UpdateViewMixin
from applications.security.forms.group_module_permisos import GroupModulePermissionForm
from applications.security.models import GroupModulePermission
from django.views.generic import ListView, CreateView, UpdateView, DeleteView, TemplateView
from django.db.models import Q
from django.contrib.auth.models import Group, Permission
from applications.security.models import Module
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse


class GroupModulePermissionListView(PermissionMixin, ListViewMixin, ListView):
    template_name = 'security/grupos_modulos_permisos/list.html'
    model = GroupModulePermission
    context_object_name = 'GroupModulePermissions'
    permission_required = 'view_groupmodulepermission'

    def get_queryset(self):
        q1 = self.request.GET.get('q')
        if q1 is not None:
            self.query.add(Q(group__name__icontains=q1), Q.OR)
            self.query.add(Q(module__name__icontains=q1), Q.OR)
        return self.model.objects.filter(self.query).order_by('id')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['create_url'] = reverse_lazy('security:group_module_permission_create')
        print(context['permissions'])
        return context


class GroupModulePermissionCreateView(PermissionMixin, CreateViewMixin, CreateView):
    model = GroupModulePermission
    template_name = 'security/grupos_modulos_permisos/form.html'
    form_class = GroupModulePermissionForm
    success_url = reverse_lazy('security:group_module_permission_list')
    permission_required = 'add_groupmodulepermission'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['grabar'] = 'Grabar Grupo Módulo Permiso'
        context['back_url'] = self.success_url
        # Relación grupo → módulos (TODOS los módulos, no solo los del grupo)
        all_modules = Module.objects.all()
        group_modules = {}
        for group in Group.objects.all():
            group_modules[group.id] = [
                {"id": m.id, "name": m.name} for m in all_modules
            ]
        # Relación módulo → permisos
        module_permissions = {}
        for module in all_modules:
            perms = module.permissions.all()
            module_permissions[module.id] = [
                {"id": p.id, "name": p.name, "codename": p.codename} for p in perms
            ]
        # Agregar nombres de grupo
        group_names = {str(g.id): g.name for g in Group.objects.all()}
        context["group_modules"] = json.dumps(group_modules)
        context["module_permissions"] = json.dumps(module_permissions)
        context["group_names"] = json.dumps(group_names)
        # Permisos seleccionados para el template (para mantener checkboxes marcados tras error de validación)
        if self.request.method == "POST":
            context["selected_permissions"] = self.request.POST.getlist("permissions")
        else:
            context["selected_permissions"] = []
        return context
      

class GroupModulePermissionUpdateView(PermissionMixin, UpdateViewMixin, UpdateView):
    model = GroupModulePermission
    template_name = 'security/grupos_modulos_permisos/form.html'
    form_class = GroupModulePermissionForm
    success_url = reverse_lazy('security:group_module_permission_list')
    permission_required = 'change_groupmodulepermission'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['grabar'] = 'Actualizar Grupo Módulo Permiso'
        context['back_url'] = self.success_url
        # Relación grupo → módulos
        all_modules = Module.objects.all()
        group_modules = {}
        for group in Group.objects.all():
            group_modules[group.id] = [
                {"id": m.id, "name": m.name} for m in all_modules
            ]
        # Relación módulo → permisos
        module_permissions = {}
        for module in all_modules:
            perms = module.permissions.all()
            module_permissions[module.id] = [
                {"id": p.id, "name": p.name, "codename": p.codename} for p in perms
            ]
        # Agregar nombres de grupo
        group_names = {str(g.id): g.name for g in Group.objects.all()}
        context["group_modules"] = json.dumps(group_modules)
        context["module_permissions"] = json.dumps(module_permissions)
        context["group_names"] = json.dumps(group_names)
        # Permisos seleccionados para el template (para mantener checkboxes marcados tras error de validación)
        if self.request.method == "POST":
            context["selected_permissions"] = self.request.POST.getlist("permissions")
        else:
            context["selected_permissions"] = []
        return context

    def form_valid(self, form):
        response = super().form_valid(form)
        group_module_permission = self.object
        messages.success(self.request, f"Éxito al actualizar el grupo módulo permiso {group_module_permission.id}.")
        return response


class GroupModulePermissionDeleteView(PermissionMixin, DeleteViewMixin, DeleteView):
    model = GroupModulePermission
    template_name = 'core/delete.html'
    success_url = reverse_lazy('security:group_module_permission_list')
    permission_required = 'delete_groupmodulepermission'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['grabar'] = 'Eliminar Grupo Módulo Permiso'
        context['description'] = f"¿Desea eliminar el grupo módulo permiso: {self.object.id}?"
        context['back_url'] = self.success_url
        return context

    
    def form_valid(self, form):
        # Guardar info antes de eliminar
        group_module_permission = self.object
        response = super().form_valid(form)
        messages.success(self.request, f"Éxito al eliminar lógicamente el grupo módulo permiso {group_module_permission.id}.")

        return response


class GroupModulePermissionCreateInteractiveView(TemplateView):
    template_name = 'security/grupos_modulos_permisos/form_interactivo.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['grabar'] = 'Grabar Grupo Módulo Permiso (Interactivo)'
        context['back_url'] = reverse_lazy('security:group_module_permission_list')
        context['grupos_json'] = json.dumps([
            {'id': g.id, 'nombre': g.name} for g in Group.objects.all()
        ])
        context['modulos_por_grupo_json'] = json.dumps({
            str(g.id): [
                {'id': m.id, 'nombre': m.name}
                for m in Module.objects.filter(group_permissions__group=g).distinct()
            ] for g in Group.objects.all()
        })
        context['permisos_por_modulo_json'] = json.dumps({
            str(m.id): [
                {'id': p.id, 'nombre': p.name}
                for p in m.permissions.all()
            ] for m in Module.objects.all()
        })
        return context

@csrf_exempt
def ajax_guardar_asignacion(request):
    """
    Vista para guardar asignación de grupo-módulo-permisos vía AJAX.
    """
    if request.method == "POST":
        import json
        data = json.loads(request.body)
        grupo_id = data.get('grupo_id')
        modulo_id = data.get('modulo_id')
        permisos = data.get('permisos', [])
        if not grupo_id or not modulo_id or not permisos:
            return JsonResponse({'success': False, 'error': 'Datos incompletos.'}, status=400)
        obj = GroupModulePermission.objects.create(
            group_id=grupo_id,
            module_id=modulo_id
        )
        obj.permissions.set(permisos)
        obj.save()
        return JsonResponse({'success': True, 'id': obj.id})
    return JsonResponse({'success': False, 'error': 'Método no permitido.'}, status=405)
