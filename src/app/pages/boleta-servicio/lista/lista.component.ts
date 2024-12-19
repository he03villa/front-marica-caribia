import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ServiceService } from '../../../services/service.service';
import { BoletaServicioService } from '../../../services/boleta-servicio.service';
import { MatSort } from '@angular/material/sort';
import { environment } from '../../../../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-lista',
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss',
  standalone: true
})
export class ListaComponent {
  displayedColumns: string[] = ['fecha_salida', 'hora_salida', 'fecha_regreso', 'hora_regreso', 'duracion', 'lancha', 'destino', 'piloto', 'motonave', 'servicio', 'estado', 'pdf'];
  dataSource = [];
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatTable) table: MatTable<any> | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  _service: ServiceService = inject(ServiceService);
  private _boletaServicioService: BoletaServicioService = inject(BoletaServicioService)

  private _fb:FormBuilder = new FormBuilder();
  form:FormGroup = new FormGroup({});

  arrayMotonaves: Array<any> = [];
  arrayDestino: Array<any> = [];
  arrayAgencias: Array<any> = [];
  arrayEmbarcaciones: Array<any> = [];
  arrayPilotos: Array<any> = [];
  arrayServicios: Array<any> = [];

  constructor() {
    this.cargarDatos();
    this.form = this._fb.group({
      estado: [''],
      servicio: [''],
      motoNave: [''],
      piloto: [''],
      destino: [''],
      lancha: [''],
      buscar: [''],
      fecha_salida: [''],
      fecha_regreso: [''],
    })
    this.cargarLista();
  }

  ngAfterViewInit() {
    /* this.dataSource.paginator = this.paginator; */
    this.sort?.sortChange.subscribe(() => this.paginator?.firstPage());
    // Script para abrir/cerrar el dropdown
    document?.querySelector('.filter-dropdown-btn')?.addEventListener('click', function() {
      document.querySelector('.filter-dropdown')?.classList.toggle('active');
    });

  }

  async cargarLista() {
    const data = this.form.getRawValue();
    const res:any = await this._boletaServicioService.getAllLista(data);
    console.log(res);
    if (!res.error) {
      this.resultsLength = res.length;
      this.dataSource = res;
      console.log(this.dataSource);
      this.table?.renderRows();
    }
  }

  async descargarPdf(id:number) {
    const url = `${ environment.urlApi }${ environment.api.boleta_servicio.name }/${ id }/${ environment.api.boleta_servicio.service.pdf }`;
    this._service.abrir(url);
  }

  async cambiarEstado(event:any, id:number) {
    const data = {estado: event.target.value};
    const res:any = await this._boletaServicioService.update(id, data);
    if (!res.error) {
      const dataToast = {
        icon: 'success',
        text: 'Boleta de servicio actualizada con exito',
      }
      this._service.Toast(dataToast);
    }
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

  clearForm() {
    this.form.reset();
    this.form.get('estado')?.setValue('');
    this.form.get('servicio')?.setValue('');
    this.form.get('motoNave')?.setValue('');
    this.form.get('piloto')?.setValue('');
    this.form.get('destino')?.setValue('');
    this.form.get('lancha')?.setValue('');
    this.form.get('buscar')?.setValue('');
    this.form.get('fecha_salida')?.setValue('');
    this.form.get('fecha_regreso')?.setValue('');
    this.cargarLista();
  }
}
