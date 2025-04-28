import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../../services/service.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { BoletaServicioService } from '../../../services/boleta-servicio.service';
import { FacturasService } from '../../../services/facturas.service';
import { ActivatedRoute } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-factura',
  standalone: true,
  imports: [CommonModule, MatIconModule, NgSelectModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, SelectDropDownModule, DecimalPipe],
  templateUrl: './form-factura.component.html',
  styleUrl: './form-factura.component.scss'
})
export class FormFacturaComponent {
  private _boletaServicioService: BoletaServicioService = inject(BoletaServicioService);
  private _facturaService: FacturasService = inject(FacturasService);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  _service: ServiceService = inject(ServiceService);
  private _fb:FormBuilder = new FormBuilder();
  form:FormGroup = new FormGroup({});
  arrayBoletas: Array<any> = [];
  arrayDetalles: Array<any> = [];
  arrayConceptos: Array<any> = [];
  salario_minimo: number = 0;
  dataBoleta: any = null;
  actualizar = false;

  config1 = {
    displayKey: 'nombre', // Nombre del campo que se mostrará en la lista.
    search: true,       // Habilitar búsqueda.
    height: '200px',    // Altura del dropdown.
    placeholder: 'Boleta', // Texto de placeholder.
  };
  config2 = {
    displayKey: 'nombre', // Nombre del campo que se mostrará en la lista.
    search: true,       // Habilitar búsqueda.
    height: '200px',    // Altura del dropdown.
    placeholder: 'Concepto', // Texto de placeholder.
  };

  constructor() {
    this.cargarDatos();
    this.cargarForm();
  }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    console.log(id);
    if (id != null) {
      this.actualizar = true;
      this.cargarLancha(parseInt(id));
    }
  }

  async cargarDatos() {
    const res:any = await this._boletaServicioService.getBoletasIsNotFacturadas();
    if (!res.error) {
      console.log(res);
      this.arrayBoletas = res.boletas.map((x:any) => ({...x, nombre: `${x.id_boleta_servicio} - ${ x.embarcaciones.nombre } - ${ x.motonaves.nombre }` }));
      this.salario_minimo = res.ms;
      //this.arrayConceptos = res?.conceptos.map((x:any) => ({...x, idPivot: x?.pivot?.id }));
    }
  }

  async cargarLancha(id:number) {
    const res:any = await this._facturaService.getFactura(id);
    console.log(res);
    if (!res.error) {
      res.detalles = res.detalle;
      this.arrayConceptos = res.boleta?.agencias?.concepto_servicios.map((x:any) => ({...x, idPivot: x.pivot.id }));
      console.log(this.arrayConceptos);
      if (this.arrayConceptos.length == 0) {
        this.arrayConceptos = res.boleta?.destinos?.concepto_servicios.map((x:any) => ({...x, idPivot: x.pivot.id }));
      }
      this.cargarForm(res);
      this.dataBoleta = res.boleta;
    }
  }

  cargarForm(data:any = null) {
    this.form = this._fb.group({
      id: [data?.id],
      boleta_servicio_id: [data?.boleta_servicio_id, Validators.compose([Validators.required])],
      total: [data?.total],
      detalles: this._fb.array([]),
    });
    this.arrayDetalles = data?.detalles || [];
    this.arrayDetalles.forEach((item:any) => this.getFormArray().push(this.getFormGroup(item)));
  }

  async cargarBoleta() {
    const data: number[] = this.form.get('boleta_servicio_id')?.value;
    
    // Si no hay datos seleccionados
    if (!data || data.length === 0) {
      this.dataBoleta = null;
      this.arrayConceptos = [];
      return;
    }
    
    // Obtener todas las boletas seleccionadas
    const boletasSeleccionadas = this.arrayBoletas.filter((x: any) => data.includes(x.id));
    
    // Si no hay boletas seleccionadas (esto no debería ocurrir normalmente)
    if (boletasSeleccionadas.length === 0) {
      this.dataBoleta = null;
      this.arrayConceptos = [];
      return;
    }
    
    // Si ya tenemos una boleta cargada, verificar compatibilidad con todas las nuevas selecciones
    if (this.dataBoleta != null) {
      // Verificar cada boleta nueva seleccionada
      const boletaIncompatible = boletasSeleccionadas.find((boleto: any) => 
        boleto.agencia != this.dataBoleta.agencia || boleto.servicio != this.dataBoleta.servicio
      );
      
      if (boletaIncompatible) {
        console.log('No se puede cambiar la boleta');
        // Eliminar la boleta incompatible de la selección
        const pos = data.findIndex((x: number) => x == boletaIncompatible.id);
        if (pos !== -1) {
          data.splice(pos, 1);
          this.form.get('boleta_servicio_id')?.setValue(data);
        }
        
        const dataAlert = {
          icon: 'warning',
          text: 'No puedes elegir esta boleta ya que no tiene la misma agencia y servicio.',
          confirmButtonText: 'Aceptar',
        }
        const resModal = await this._service.Alert(dataAlert);
        return;
      }
    } else {
      // Si es la primera selección, establecer como referencia
      this.dataBoleta = boletasSeleccionadas[0];
    }
    
    // Procesar todas las boletas seleccionadas
    this.arrayConceptos = [];
    
    // Recopilar conceptos de todas las boletas seleccionadas
    boletasSeleccionadas.forEach((boleto: any) => {
      const conceptos = boleto.agencias?.concepto_servicios?.map((x: any) => ({
        ...x,
        idPivot: x?.pivot?.id,
      })) || [];
      
      if (conceptos.length > 0) {
        this.arrayConceptos = [...this.arrayConceptos, ...conceptos];
      } else {
        const conceptosDestino = boleto.destinos?.concepto_servicios?.map((x: any) => ({
          ...x,
          idPivot: x?.pivot?.id,
        })) || [];
        
        this.arrayConceptos = [...this.arrayConceptos, ...conceptosDestino];
      }
    });
  }
  

  getFormArray(): FormArray {
    return this.form.get('detalles') as FormArray;
  }

  getFormGroup(item: any): FormGroup {
    return this._fb.group({
      id: [item?.id],
      facturas_id: [item?.facturas_id],
      tarifas_concepto_id: [item?.tarifas_concepto_id, Validators.compose([Validators.required])],
      cantidad: [item?.cantidad],
      subtotal: [item?.subtotal],
    });
  }

  addConcepto() {
    const data = {
      id: null,
      facturas_id: null,
      tarifas_concepto_id: null,
      cantidad: 0,
      subtotal: 0
    };
    this.arrayDetalles.push(data);
    this.getFormArray().push(this.getFormGroup(data));
  }

  removeConcepto(index: number) {
    this.arrayDetalles.splice(index, 1);
    this.getFormArray().removeAt(index);
    const total = this.arrayDetalles.reduce((a, b) => a + parseFloat(b.subtotal), 0);
    this.form.get('total')?.setValue(total);
  }

  calcularSubtotal(index: number) {
    let concepto = this.getFormArray().get(`${index}.tarifas_concepto_id`)?.value;
    concepto = this.arrayConceptos.find((x:any) => x.id == concepto);
    const cantidad = concepto.pivot.tarifa;
    const subtotal = cantidad * this.salario_minimo;
    this.getFormArray().get(`${index}.cantidad`)?.setValue(cantidad);
    this.getFormArray().get(`${index}.subtotal`)?.setValue(subtotal);
    this.arrayDetalles[index].cantidad = cantidad;
    this.arrayDetalles[index].subtotal = subtotal;
    this.arrayDetalles[index].tarifas_concepto_id = concepto;
    /*let concepto = this.getFormArray().get(`${index}.tarifas_concepto_id`)?.value;
    const cantidad = this.getFormArray().get(`${index}.cantidad`)?.value;
    const subtotal = cantidad * this.salario_minimo; */
    this.arrayDetalles[index].subtotal = subtotal;
    this.arrayDetalles[index].cantidad = cantidad;
    this.arrayDetalles[index].tarifas_concepto_id = concepto;
    const total = this.arrayDetalles.reduce((a, b) => a + parseFloat(b.subtotal), 0);
    console.log(total);
    this.form.get('total')?.setValue(total);
  }

  async guardar(event: any) {
    this._service.addLoading(event.target);
    const data = this.form.getRawValue();
    //data.boleta_servicio_id = data.boleta_servicio_id.id;
    //data.detalles = data.detalles.map((item:any) => ({...item, tarifas_concepto_id: item.tarifas_concepto_id.pivot.id}));
    console.log(data);
    const res:any = await this._facturaService.save(data);
    if (!res.error) {
      const dataAlert = {
        icon: 'success',
        text: 'La factura ha sido creada con exito.',
        confirmButtonText: 'Aceptar',
      }
      const resModal = await this._service.Alert(dataAlert);
      this._service.url('/dashboard/factura');
    }
    this._service.removeLoading(event.target);
  }

  async update(event: any) {
    this._service.addLoading(event.target);
    const data = this.form.getRawValue();
    //data.detalles = data.detalles.map((item:any) => ({...item, tarifas_concepto_id: item.tarifas_concepto_id.pivot.id}));
    console.log(data);
    const res:any = await this._facturaService.update(data.id, data);
    if (!res.error) {
      const dataAlert = {
        icon: 'success',
        text: 'La factura ha sido actualizada con exito.',
        confirmButtonText: 'Aceptar',
      }
      const resModal = await this._service.Alert(dataAlert);
      this._service.url('/dashboard/factura');
    }
    this._service.removeLoading(event.target);
  }

}
