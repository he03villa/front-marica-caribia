import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ServiceService } from '../../../services/service.service';
import { BoletaServicioService } from '../../../services/boleta-servicio.service';
import { MatSort } from '@angular/material/sort';
import { environment } from '../../../../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectDropDownModule } from 'ngx-select-dropdown';

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
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule, ReactiveFormsModule, SelectDropDownModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss',
  standalone: true
})
export class ListaComponent {
  displayedColumns: string[] = ['fecha_salida', 'hora_salida', 'fecha_regreso', 'hora_regreso', 'duracion', 'lancha', 'destino', 'piloto', 'motonave', 'servicio', 'estado', 'pdf'];
  dataSource = [];
  arrayBoletas: Array<any> = [];
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatTable) table: MatTable<any> | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  _service: ServiceService = inject(ServiceService);
  private _boletaServicioService: BoletaServicioService = inject(BoletaServicioService)
  dataUser:any = localStorage.getItem('dataUser') || undefined;

  private _fb:FormBuilder = new FormBuilder();
  form:FormGroup = new FormGroup({});

  arrayMotonaves: Array<any> = [];
  arrayDestino: Array<any> = [];
  arrayAgencias: Array<any> = [];
  arrayEmbarcaciones: Array<any> = [];
  arrayPilotos: Array<any> = [];
  arrayServicios: Array<any> = [];

  config1 = {
    displayKey: 'nombre', // Nombre del campo que se mostrará en la lista.
    search: true,       // Habilitar búsqueda.
    height: '200px',    // Altura del dropdown.
    placeholder: 'Lancha', // Texto de placeholder.
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
    placeholder: 'Piloto', // Texto de placeholder.
  };

  config4 = {
    displayKey: 'nombre', // Nombre del campo que se mostrará en la lista.
    search: true,       // Habilitar búsqueda.
    height: '200px',    // Altura del dropdown.
    placeholder: 'Motonave', // Texto de placeholder.
  };

  config5 = {
    displayKey: 'nombre', // Nombre del campo que se mostrará en la lista.
    search: true,       // Habilitar búsqueda.
    height: '200px',    // Altura del dropdown.
    placeholder: 'Servicio', // Texto de placeholder.
  };

  config6 = {
    displayKey: 'nombres', // Nombre del campo que se mostrará en la lista.
    search: true,       // Habilitar búsqueda.
    height: '200px',    // Altura del dropdown.
    placeholder: 'Servicio', // Texto de placeholder.
  };

  constructor() {
    this.dataUser = this.dataUser ? JSON.parse(this.dataUser) : '';
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
    let data = this.form.getRawValue();
    console.log(data);
    data = {
      ...data,
      servicio: data.servicio.id ? data.servicio.id : '',
      motoNave: data.motoNave.id ? data.motoNave.id : '',
      piloto: data.piloto.id ? data.piloto.id : '',
      destino: data.destino.id ? data.destino.id : '',
      lancha: data.lancha.id ? data.lancha.id : ''
    }
    const res:any = await this._boletaServicioService.getAllLista(data);
    console.log(res);
    if (!res.error) {
      this.resultsLength = res.length;
      this.dataSource = res;
      this.arrayBoletas = res;
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

  async cambiarFacturacion(event:any, id:number) {
    const data = {facturacion: event.target.value};
    const res:any = await this._boletaServicioService.updateFacturacion(id, data);
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

  async deleteBoletas(id:number) {
    const res:any = await this._boletaServicioService.delete(id);
    if (!res.error) {
      const dataToast = {
        icon: 'success',
        text: 'Boleta de servicio eliminada con exito',
      }
      this._service.Toast(dataToast);
      const post = this.arrayBoletas.findIndex((item:any) => item.id == id);
      this.arrayBoletas.splice(post, 1);
    }
  }
}
