import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ServiceService } from '../../../services/service.service';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent {
  displayedColumns: string[] = ['name', 'email', 'fecha_creacion', 'estado', 'perfil', 'acciones'];
  dataSource = [];
  resultsLength = 0;

  _service: ServiceService = inject(ServiceService);
  private _userService: UserService = inject(UserService);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatTable) table: MatTable<any> | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor() {
    this.cargarLista();
  }

  ngAfterViewInit() {
    /* this.dataSource.paginator = this.paginator; */
    this.sort?.sortChange.subscribe(() => this.paginator?.firstPage());
  }

  async cargarLista() {
    const res:any = await this._userService.getAll();
    console.log(res);
    if (!res.error) {
      this.resultsLength = res.length;
      this.dataSource = res;
      console.log(this.dataSource);
      this.table?.renderRows();
    }
  }
}
