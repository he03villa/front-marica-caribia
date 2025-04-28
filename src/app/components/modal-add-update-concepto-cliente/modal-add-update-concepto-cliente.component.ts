import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConceptoService } from '../../services/concepto.service';
import { ServiceService } from '../../services/service.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-modal-add-update-concepto-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, NgSelectModule],
  templateUrl: './modal-add-update-concepto-cliente.component.html',
  styleUrl: './modal-add-update-concepto-cliente.component.scss'
})
export class ModalAddUpdateConceptoClienteComponent {
  @Input() public data: any;
  private _service: ServiceService = inject(ServiceService);
  private _conceptoService: ConceptoService = inject(ConceptoService);
  private _fb:FormBuilder = new FormBuilder();
  form:FormGroup = new FormGroup({});
  arrayConceptos: Array<any> = [];
  arrayConceptoPuerto: Array<any> = [];
  activeModal = inject(NgbActiveModal);

  constructor() {
    this.form = this._fb.group({
      concepto: [''],
      id: [''],
      tarifa: [''],
    });
    this.cargarServicios();
  }

  async cargarServicios() {
    const res:any = await this._conceptoService.getAllConceptos();
    if (!res.error) {
      this.arrayConceptos = res;
      this.arrayConceptoPuerto = this.data?.conceptos;
      this.form = this._fb.group({
        concepto: ['', Validators.compose([Validators.required])],
        cliente: [this.data?.id],
        tarifa: ['', Validators.compose([Validators.required])],
      });
    }
  }

  buscarConcepto() {
    const id_concepto = this.form.get('concepto')?.value;
    const concepto = this.arrayConceptoPuerto.find((x:any) => x.id == id_concepto);
    this.form.get('tarifa')?.setValue(concepto?.pivot?.tarifa);
  }

  async agregarConcepto(event:any) {
    this._service.addLoading(event.target);
    event.preventDefault();
    const data = this.form.getRawValue();
    const res:any = await this._conceptoService.saveConceptoCliente(data);
    //console.log(data, res);
    if (!res.error) {
      const dataAlert = { icon: 'success', text: 'Conceptos actualizados con exito.', confirmButtonText: 'Aceptar', };
      const resModal = await this._service.Alert(dataAlert);
      this.activeModal.close(res);
    }
    this._service.removeLoading(event.target);
  }
}
