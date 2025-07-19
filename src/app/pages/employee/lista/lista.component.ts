import { Component, inject } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, ],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent {
  _service: ServiceService = inject(ServiceService);
  private _fb:FormBuilder = new FormBuilder();
  form:FormGroup = new FormGroup({});
}
