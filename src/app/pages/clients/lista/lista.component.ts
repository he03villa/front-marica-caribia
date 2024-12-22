import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ServiceService } from '../../../services/service.service';
import { ClientsService } from '../../../services/clients.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent {
  displayedColumns: string[] = ['id_cliente', 'nombre', 'codigo', 'estado', 'acciones'];
  dataSource : Array<any> = [];
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatTable) table: MatTable<any> | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  _service: ServiceService = inject(ServiceService);
  private _clientService:ClientsService = inject(ClientsService);

  private _fb:FormBuilder = new FormBuilder();
  form:FormGroup = new FormGroup({});

  constructor() {
    this.form = this._fb.group({
      buscar: [''],
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
    const res:any = await this._clientService.getAllClients(data);
    console.log(res);
    if (!res.error) {
      this.resultsLength = res.length;
      this.dataSource = res;
      console.log(this.dataSource);
      this.table?.renderRows();
    }
  }
}
