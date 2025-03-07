import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ServiceService } from '../../../services/service.service';
import { PuertoService } from '../../../services/puerto.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddServicesComponent } from '../../../components/modal-add-services/modal-add-services.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatButtonModule, NgbDropdownModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  dataSource : Array<any> = [];

  _service: ServiceService = inject(ServiceService);
  private _puertoService:PuertoService = inject(PuertoService);

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
    const res:any = await this._puertoService.getServicisosAll(data);
    console.log(res);
    if (!res.error) {
      this.dataSource = res;
      console.log(this.dataSource);
    }
  }

  async addServicios(item: any) {
    const servicios = item.servicios.map((i: any) => i.id);
    const resModal = await this._service.abrirModal(ModalAddServicesComponent, { id: item.id, servicios });
    const result = await resModal.result;
    if (result) {
      const position = this.dataSource.findIndex((i: any) => i.id === item.id);
      this.dataSource[position] = result;
    }
  }

  async addOrUpdateConsento(item: any) {
    console.log(item);
    /* const resModal = await this._service.abrirModal(ModalAddServicesComponent, { id: item.id, servicios: item.servicios });
    const result = await resModal.result;
    if (result) {
      const position = this.dataSource.findIndex((i: any) => i.id === item.id);
      this.dataSource[position] = result;
    } */
  }
}
