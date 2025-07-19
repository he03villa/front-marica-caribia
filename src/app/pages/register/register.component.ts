import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ServiceService } from '../../services/service.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private _userService: UserService = inject(UserService);
  _service: ServiceService = inject(ServiceService);
  private _fb:FormBuilder = new FormBuilder();
  form:FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.cargarForm();
  }

  cargarForm(data:any = null) {
    this.form = this._fb.group({
      email: [data?.email, Validators.compose([Validators.required, Validators.email])],
      password: [data?.password, Validators.compose([Validators.required, Validators.minLength(8)])],
      password_confirmation: [data?.password, Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }

  async register(event:any) {
    this._service.addLoading(event.target);
    const data = this.form.value;
    const res:any = await this._userService.register(data);
    if (!res.error) {
      const dataAlert = {
        icon: 'success',
        text: 'Se ha registrado exitosamente, por favor inicie sesion con sus credenciales.',
        confirmButtonText: 'Aceptar',
      };
      const resModal = await this._service.Alert(dataAlert);
      this.form.reset();
      this._service.url('/login');
    }
    this._service.removeLoading(event.target);
  }
}
