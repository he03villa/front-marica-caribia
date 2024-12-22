import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ServiceService } from '../../../services/service.service';
import { LanchasService } from '../../../services/lanchas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-lancha',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './form-lancha.component.html',
  styleUrl: './form-lancha.component.scss'
})
export class FormLanchaComponent {
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _lanchaService: LanchasService = inject(LanchasService);
  _service: ServiceService = inject(ServiceService);
  private _fb:FormBuilder = new FormBuilder();
  form:FormGroup = new FormGroup({});
  arrayEstados: Array<any> = [
    { id: 'Activo', name: 'Activo' },
    { id: 'Inactivo', name: 'Inactivo' },
  ];
  actualizar = false;

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    console.log(id);
    this.cargarForm();
    if (id != null) {
      this.actualizar = true;
      this.cargarLancha(parseInt(id));
    }
  }

  async cargarLancha(id:number) {
    const res:any = await this._lanchaService.getLancha(id);
    console.log(res);
    if (!res.error) {
      this.cargarForm(res);
    }
  }

  cargarForm(data:any = null) {
    this.form = this._fb.group({
      id: [data?.id],
      nombre: [data?.nombre, Validators.compose([Validators.required])],
      id_lancha: [data?.id_lancha, Validators.compose([Validators.required])],
      estado: [data?.estado, Validators.compose([Validators.required])],
    });
  }

  async guardar(event:any) {
    this._service.addLoading(event.target);
    const data = this.form.getRawValue();
    console.log(data);
    const res:any = await this._lanchaService.save(data);
    if (!res.error) {
      const dataAlert = {
        icon: 'success',
        text: 'Lancha creada con exito.',
        confirmButtonText: 'Aceptar',
      }
      const resModal = await this._service.Alert(dataAlert);
      this._service.url('/dashboard/lanchas')
    }
    this._service.removeLoading(event.target);
  }

  async update(event:any) {
    this._service.addLoading(event.target);
    const data = this.form.getRawValue();
    console.log(data);
    const res:any = await this._lanchaService.update(data.id, data);
    if (!res.error) {
      const dataAlert = {
        icon: 'success',
        text: 'Lancha actualizada con exito.',
        confirmButtonText: 'Aceptar',
      }
      const resModal = await this._service.Alert(dataAlert);
      this._service.url('/dashboard/lanchas')
    }
    this._service.removeLoading(event.target);
  }
}
