import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../../services/user.service';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-form-usuario',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.scss'
})
export class FormUsuarioComponent {
  private _userService: UserService = inject(UserService);
  _service: ServiceService = inject(ServiceService);
  private _fb:FormBuilder = new FormBuilder();
  form:FormGroup = new FormGroup({});

  arrayPerfiles: Array<any> = [
    { id: 'Administrador', name: 'Administrador' },
    { id: 'Operador', name: 'Operador' },
  ];
  arrayEstados: Array<any> = [
    { id: 'Activo', name: 'Activo' },
    { id: 'Inactivo', name: 'Inactivo' },
  ];

  ngOnInit(): void {
    this.cargarForm();
  }

  cargarForm(data:any = null) {
    this.form = this._fb.group({
      id: [data?.id],
      name: [data?.name, Validators.compose([Validators.required, Validators.pattern(/^[0-9a-zA-Z]+$/), Validators.minLength(3), Validators.maxLength(20)])],
      email: [data?.email, Validators.compose([Validators.required, Validators.email])],
      perfil: [data?.perfil, Validators.compose([Validators.required])],
      estado: [data?.estado, Validators.compose([Validators.required])],
      password: [data?.password, Validators.compose([Validators.required, Validators.minLength(8)])],
      password_confirmation: [data?.password, Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }

  async guardar(event:any) {
    this._service.addLoading(event.target);
    const data = this.form.getRawValue();
    const res:any = await this._userService.save(data);
    console.log(res);
    if (!res.error) {
      const dataAlert = {
        icon: 'success',
        text: 'Usuario creado con exito.',
        confirmButtonText: 'Aceptar',
      }
      const resModal = await this._service.Alert(dataAlert);
      this._service.url('/dashboard/usuarios/');
    }
    this._service.removeLoading(event.target);
  }
}
