import { Component, inject, Input } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ServiciosService } from '../../services/servicios.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PuertoService } from '../../services/puerto.service';

@Component({
  selector: 'app-modal-add-services',
  standalone: true,
  imports: [ReactiveFormsModule, NgSelectModule],
  templateUrl: './modal-add-services.component.html',
  styleUrl: './modal-add-services.component.scss'
})
export class ModalAddServicesComponent {
  @Input() public data: any;
  private _service: ServiceService = inject(ServiceService);
  private _servicios: ServiciosService = inject(ServiciosService);
  private _puertoService: PuertoService = inject(PuertoService);
  private _fb:FormBuilder = new FormBuilder();
  form:FormGroup = new FormGroup({});
  arrayServicios: Array<any> = [];
  activeModal = inject(NgbActiveModal);

  constructor() {
    this.form = this._fb.group({
      servicios: [''],
      id: [''],
    });
    this.cargarServicios();
  }

  async cargarServicios() {
    const res:any = await this._servicios.getAllServicios({ buscar: '' });
    if (!res.error) {
      this.arrayServicios = res;
      this.form = this._fb.group({
        servicios: [this.data?.servicios],
        id: [this.data?.id],
      });
    }
  }

  async agregarServicio(event:any) {
    this._service.addLoading(event.target);
    event.preventDefault();
    const data = this.form.getRawValue();
    console.log(data);
    const res:any = await this._puertoService.updateServicios(data.id, { servicios: data.servicios });
    if (!res.error) {
      const dataAlert = { icon: 'success', text: 'Servicios actualizados con exito.', confirmButtonText: 'Aceptar', };
      const resModal = await this._service.Alert(dataAlert);
      this.activeModal.close(res);
    }
   this._service.removeLoading(event.target);
  }
}
