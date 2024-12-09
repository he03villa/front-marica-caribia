import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ServiceService } from '../../../services/service.service';
import { BoletaServicioService } from '../../../services/boleta-servicio.service';
import { MatSort } from '@angular/material/sort';
import { environment } from '../../../../environments/environment';
import { MatButtonModule } from '@angular/material/button';

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
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule],
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

  constructor() {
    this.cargarLista();
  }

  ngAfterViewInit() {
    /* this.dataSource.paginator = this.paginator; */
    this.sort?.sortChange.subscribe(() => this.paginator?.firstPage());
  }

  async cargarLista() {
    const res:any = await this._boletaServicioService.getAllLista();
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
}
