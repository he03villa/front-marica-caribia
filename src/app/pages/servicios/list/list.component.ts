import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ServiceService } from '../../../services/service.service';
import { ServiciosService } from '../../../services/servicios.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  dataSource : Array<any> = [];

  _service: ServiceService = inject(ServiceService);
  private _serviciosService:ServiciosService = inject(ServiciosService);

  private _fb:FormBuilder = new FormBuilder();
  form:FormGroup = new FormGroup({});

  constructor() {
    this.form = this._fb.group({
      buscar: [''],
    });
    this.cargarLista();
  }

  async cargarLista() {
    const data = this.form.getRawValue();
    const res:any = await this._serviciosService.getAllServicios(data);
    console.log(res);
    if (!res.error) {
      this.dataSource = res;
      console.log(this.dataSource);
    }
  }
}
