import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ServiceService } from '../../../services/service.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { FacturasService } from '../../../services/facturas.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import { environment } from '../../../../environments/environment';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, MatTableModule, MatPaginatorModule, MatButtonModule, ReactiveFormsModule, SelectDropDownModule, MatIconModule, DatePipe, CurrencyPipe, MatFormFieldModule, MatDatepickerModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss',
  providers: [provideNativeDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaComponent {
  displayedColumns: string[] = ['fecha_salida', 'hora_salida', 'fecha_regreso', 'hora_regreso', 'duracion', 'lancha', 'destino', 'piloto', 'motonave', 'servicio', 'estado', 'pdf'];
  dataSource = [];
  arrayFacturacion: Array<any> = [];
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatTable) table: MatTable<any> | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  _service: ServiceService = inject(ServiceService);
  private _facturaService: FacturasService = inject(FacturasService);
  dataUser:any = localStorage.getItem('dataUser') || undefined;

  private _fb:FormBuilder = new FormBuilder();
  form:FormGroup = new FormGroup({});

  constructor() {
    this.form = this._fb.group({
      buscar: [''],
      fecha_fin: [''],
      fecha_inicio: [''],
    })
    this.cargarLista();
  }

  async cargarLista() {
    const data = this.form.getRawValue();
    console.log(data);
    data.fecha_inicio = data.fecha_inicio ? data.fecha_inicio.toISOString().split('T')[0] : '';
    data.fecha_fin = data.fecha_fin ? data.fecha_fin.toISOString().split('T')[0] : '';
    const res:any = await this._facturaService.getAll(data);
    console.log(res);
    if (!res.error) {
      this.arrayFacturacion = res;
    }
  }

  limpiarFechas() {
    this.form.get('fecha_inicio')?.setValue(null);
    this.form.get('fecha_fin')?.setValue(null);
    this.cargarLista();
  }

  async exportar(id:number) {
    const url = `${ environment.urlApi }${ environment.api.facturas.name }/${ id }/${ environment.api.facturas.service.export }`;
    this._service.abrir(url);
  }

  async deleteFactura(id:number) {
    const res:any = await this._facturaService.delete(id);
    if (!res.error) {
      this.cargarLista();
    }
  }
}
