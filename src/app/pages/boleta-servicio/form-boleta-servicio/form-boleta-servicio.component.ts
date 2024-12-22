import { Component, inject } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { BoletaServicioService } from '../../../services/boleta-servicio.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../../services/service.service';
import { SelectDropDownModule } from 'ngx-select-dropdown'

@Component({
  selector: 'app-form-boleta-servicio',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatButtonModule, ReactiveFormsModule, NgxMaterialTimepickerModule, SelectDropDownModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './form-boleta-servicio.component.html',
  styleUrl: './form-boleta-servicio.component.scss',
  standalone: true
})
export class FormBoletaServicioComponent {

  private _boletaServicioService: BoletaServicioService = inject(BoletaServicioService);
  _service: ServiceService = inject(ServiceService);
  private _fb:FormBuilder = new FormBuilder();
  form:FormGroup = new FormGroup({});
  arrayMotonaves: Array<any> = [];
  arrayDestino: Array<any> = [];
  arrayAgencias: Array<any> = [];
  arrayEmbarcaciones: Array<any> = [];
  arrayPilotos: Array<any> = [];
  arrayServicios: Array<any> = [];
  arrayTrabajadores: Array<any> = [];

  selectedValue: any;
  options = [
    { id: 1, name: 'Opción 1' },
    { id: 2, name: 'Opción 2' },
    { id: 3, name: 'Opción 3' },
    { id: 4, name: 'Opción 4' },
  ];
  
  config1 = {
    displayKey: 'nombre', // Nombre del campo que se mostrará en la lista.
    search: true,       // Habilitar búsqueda.
    height: '200px',    // Altura del dropdown.
    placeholder: 'MOTONAVE', // Texto de placeholder.
  };

  config2 = {
    displayKey: 'nombre', // Nombre del campo que se mostrará en la lista.
    search: true,       // Habilitar búsqueda.
    height: '200px',    // Altura del dropdown.
    placeholder: 'DESTINO', // Texto de placeholder.
  };

  config3 = {
    displayKey: 'nombre', // Nombre del campo que se mostrará en la lista.
    search: true,       // Habilitar búsqueda.
    height: '200px',    // Altura del dropdown.
    placeholder: 'AGENCIA', // Texto de placeholder.
  };

  config4 = {
    displayKey: 'nombre', // Nombre del campo que se mostrará en la lista.
    search: true,       // Habilitar búsqueda.
    height: '200px',    // Altura del dropdown.
    placeholder: 'AGENCIA', // Texto de placeholder.
  };

  config5 = {
    displayKey: 'nombre', // Nombre del campo que se mostrará en la lista.
    search: true,       // Habilitar búsqueda.
    height: '200px',    // Altura del dropdown.
    placeholder: 'PILOTO PRÁCTICO', // Texto de placeholder.
  };

  config6 = {
    displayKey: 'nombres', // Nombre del campo que se mostrará en la lista.
    search: true,       // Habilitar búsqueda.
    height: '200px',    // Altura del dropdown.
    placeholder: 'Trabajadores', // Texto de placeholder.
  };

  config7 = {
    displayKey: 'nombres', // Nombre del campo que se mostrará en la lista.
    search: true,       // Habilitar búsqueda.
    height: '200px',    // Altura del dropdown.
    placeholder: 'Servicio', // Texto de placeholder.
  };

  ngOnInit(): void {
    this.cargarDatos();
    this.cargarForm();
  }

  cargarForm(data:any = null) {
    this.form = this._fb.group({
      id: [data?.id],
      moto_nave: [data?.moto_nave, Validators.compose([Validators.required])],
      destino: [data?.destino, Validators.compose([Validators.required])],
      agencia: [data?.agencia, Validators.compose([Validators.required])],
      embarcacion: [data?.embarcacion, Validators.compose([Validators.required])],
      piloto: [data?.piloto, Validators.compose([Validators.required])],
      servicio: [data?.servicio, Validators.compose([Validators.required])],
      fecha_inicio: [data?.fecha_inicio, Validators.compose([Validators.required])],
      hora_inicio: [data?.hora_inicio, Validators.compose([Validators.required])],
      fecha_final: [data?.fecha_final, Validators.compose([Validators.required])],
      hora_final: [data?.hora_final, Validators.compose([Validators.required])],
      trabajadores: [data?.trabajadores, Validators.compose([Validators.required])],
      observaciones: [data?.observaciones],
    });
  }

  async cargarDatos() {
    const res:any = await this._boletaServicioService.getAllSelectCrear();
    if (!res.error) {
      this.arrayAgencias = res.agencias;
      this.arrayEmbarcaciones = res.lanchas;
      this.arrayMotonaves = res.motoNaves;
      this.arrayDestino = res.puertosDestinos;
      this.arrayPilotos = res.pilotos;
      this.arrayServicios = res.servicios;
      this.arrayTrabajadores = res.trabajador;
    }
  }

  async guardar(event:any) {
    this._service.addLoading(event.target);
    let data = this.form.getRawValue();
    data = {
      moto_nave: data.moto_nave.id,
      destino: data.destino.id,
      agencia: data.agencia.id,
      embarcacion: data.embarcacion.id,
      piloto: data.piloto.id,
      servicio: data.servicio.id,
      fecha_inicio: data.fecha_inicio,
      hora_inicio: data.hora_inicio,
      fecha_final: data.fecha_final,
      hora_final: data.hora_final,
      trabajadores: data.trabajadores.map((item:any) => item.id),
      observaciones: data.observaciones
    };
    console.log(data);
    const res:any = await this._boletaServicioService.save(data);
    if (!res.error) {
      const dataAlert = {
        icon: 'success',
        text: 'Boleta de servicio creada con exito.',
        confirmButtonText: 'Aceptar',
      }
      const resModal = await this._service.Alert(dataAlert);
      this._service.url('/dashboard/boleta-servicio/')
    }
    this._service.removeLoading(event.target);
  }
}
