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

@Component({
  selector: 'app-form-boleta-servicio',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatButtonModule, ReactiveFormsModule, NgxMaterialTimepickerModule],
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
      observaciones: [data?.observacion, Validators.compose([Validators.required])],
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
    }
  }

  async guardar(event:any) {
    this._service.addLoading(event.target);
    const data = this.form.getRawValue();
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
