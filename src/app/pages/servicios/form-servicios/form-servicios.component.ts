import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../services/service.service';
import { ServiciosService } from '../../../services/servicios.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-servicios',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './form-servicios.component.html',
  styleUrl: './form-servicios.component.scss'
})
export class FormServiciosComponent {
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _serviciosService:ServiciosService = inject(ServiciosService);
  _service: ServiceService = inject(ServiceService);
  private _fb:FormBuilder = new FormBuilder();
  form:FormGroup = new FormGroup({});
  arrayConceptos: Array<any> = [];
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
      this.cargarServicio(parseInt(id));
    }
  }

  async cargarServicio(id:number) {
    const res:any = await this._serviciosService.getServicio(id);
    console.log(res);
    if (!res.error) {
      this.cargarForm(res);
    }
  }

  cargarForm(data:any = null) {
    this.form = this._fb.group({
      id: [data?.id],
      nombre: [data?.nombre, Validators.compose([Validators.required])],
      codigo: [data?.codigo, Validators.compose([Validators.required])],
      estado: [data?.estado, Validators.compose([Validators.required])],
      concepto_servicios: this._fb.array([]),
    });
    this.arrayConceptos = data?.concepto_servicios || [];
    this.arrayConceptos.forEach((item:any) => this.getFormArray().push(this.addItemForm(item)));
  }

  getFormArray(): FormArray {
    return this.form.get('concepto_servicios') as FormArray;
  }

  addItemForm(item:any) {
    return this._fb.group({
      id: [item?.id],
      codigo: [item?.codigo, Validators.compose([Validators.required])],
      nombre: [item?.nombre, Validators.compose([Validators.required])],
    });
  }

  addItem() {
    const data = {
      codigo: '',
      nombre: '',
    };
    this.arrayConceptos.push(data);
    this.getFormArray().push(this.addItemForm(data));
  }

  eliminarItem(index:number) {
    this.arrayConceptos.splice(index, 1);
    this.getFormArray().removeAt(index);
  }

  async guardar(event:any) {
    this._service.addLoading(event.target);
    const data = this.form.getRawValue();
    console.log(data);
    const res:any = await this._serviciosService.save(data);
    if (!res.error) {
      const dataAlert = {
        icon: 'success',
        text: 'El servicio ha sido creada con exito.',
        confirmButtonText: 'Aceptar',
      }
      const resModal = await this._service.Alert(dataAlert);
      this._service.url('/dashboard/servicios');
    }
    this._service.removeLoading(event.target);
  }

  async update(event:any) {
    this._service.addLoading(event.target);
    const data = this.form.getRawValue();
    console.log(data);
    const res:any = await this._serviciosService.update(data.id, data);
    if (!res.error) {
      const dataAlert = {
        icon: 'success',
        text: 'El servicio ha sido actualizada con exito.',
        confirmButtonText: 'Aceptar',
      }
      const resModal = await this._service.Alert(dataAlert);
      this._service.url('/dashboard/servicios');
    }
    this._service.removeLoading(event.target);
  }
}
