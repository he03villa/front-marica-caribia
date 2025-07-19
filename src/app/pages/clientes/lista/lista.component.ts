import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceService } from '../../../services/service.service';
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, ReactiveFormsModule, MatIconModule, NgbDropdownModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent {
  dataSource : Array<any> = [];
  resultsLength = 0;
  pageSizeOptions = [5, 10, 30];

  _service: ServiceService = inject(ServiceService);
  private _clientService:ClientesService = inject(ClientesService);

  private _fb:FormBuilder = new FormBuilder();
  form:FormGroup = new FormGroup({});

  constructor() {
    this.form = this._fb.group({
      buscar: [''],
      page: [1],
      limite: [10],
    })
    this.cargarLista();
  }

  async cargarLista() {
    const data = this.form.getRawValue();
    const res:any = await this._clientService.getAllClients(data);
    if (!res.error) {
      this.resultsLength = res.length;
      this.dataSource = res;
    }
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.form.patchValue({ page: e.pageIndex + 1, limite: e.pageSize });
    this.cargarLista();
  }

  editar(id:number) {
    console.log(id);
    this._service.url(`/clients/clientes/edit/${id}`);
  }

  eliminar(id:number) {
    //this._clientService.delete(id).then(() => this.cargarLista());
  }
}
