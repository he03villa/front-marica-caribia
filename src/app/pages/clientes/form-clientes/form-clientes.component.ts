import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../services/service.service';
import { TypeIdentificationService } from '../../../services/type-identification.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-form-clientes',
  standalone: true,
  imports: [CommonModule, NgSelectModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './form-clientes.component.html',
  styleUrl: './form-clientes.component.scss'
})
export class FormClientesComponent {
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _typeIdentityService: TypeIdentificationService = inject(TypeIdentificationService);
  private _clientService:ClientesService = inject(ClientesService);
  _service: ServiceService = inject(ServiceService);
  private _fb:FormBuilder = new FormBuilder();
  form:FormGroup = new FormGroup({});
  arrayTypeIdentity: Array<any> = [];
  actualizar = false;

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    console.log(id);
    this.cargarTipoIdentity();
    this.cargarForm();
    if (id != null) {
      /* this.actualizar = true; */
      this.cargarCliente(parseInt(id));
    }
  }

  cargarForm(data:any = null) {
    this.form = this._fb.group({
      id: [data?.id],
      name: [data?.name, Validators.compose([Validators.required])],
      type_identification_id: [data?.type_identification_id, Validators.compose([Validators.required])],
      identification: [data?.identification, Validators.compose([Validators.required])],
      email: [data?.email, Validators.compose([Validators.required, Validators.email])],
    });
  }

  async cargarTipoIdentity() {
    const res:any = await this._typeIdentityService.getAllTypeIdentification();
    if (!res.error) {
      this.arrayTypeIdentity = [...this.arrayTypeIdentity, ...res];
    }
  }

  async cargarCliente(id:number) {
    const res:any = await this._clientService.getClient(id);
    if (!res.error) {
      this.cargarForm(res);
    }
  }

  async guardar(event:any) {
    this._service.addLoading(event.target);
    const data = this.form.getRawValue();
    let res:any = null;
    if (data.id) {
      res = await this._clientService.update(data.id, data);
    } else {
      res = await this._clientService.save(data);
    }
    console.log(res);
    this._service.removeLoading(event.target);
    if (!res.error) {
      const dataAlert = {
        icon: 'success',
        text: data.id ? 'Cliente actualizado con exito.' : 'Cliente creado con exito.',
        confirmButtonText: 'Aceptar',
      }
      const resModal = await this._service.Alert(dataAlert);
      this._service.url('/clients/clientes');
    }
  }
}
