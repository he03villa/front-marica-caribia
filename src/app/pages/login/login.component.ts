import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { ServiceService } from '../../services/service.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb:FormBuilder = new FormBuilder();
  form: FormGroup = new FormGroup({});
  _service: ServiceService = inject(ServiceService);
  private _userService: UserService = inject(UserService);

  constructor() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(99)])],
    })
  }

  async login(event:any) {
    this._service.addLoading(event.target);
    const data = this.form.getRawValue();
    const res:any = await this._userService.login(data);
    console.log(res);
    this._service.removeLoading(event.target);
    if (!res.error) {
      localStorage.setItem('dataUser', JSON.stringify(res));
      this._service.url('/dashboard');
    }
  }
}
