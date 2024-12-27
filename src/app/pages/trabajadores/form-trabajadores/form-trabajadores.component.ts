import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../services/service.service';
import { CargosService } from '../../../services/cargos.service';
import { TrabajadoresService } from '../../../services/trabajadores.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SelectDropDownModule } from 'ngx-select-dropdown';

@Component({
  selector: 'app-form-trabajadores',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, SelectDropDownModule],
  templateUrl: './form-trabajadores.component.html',
  styleUrl: './form-trabajadores.component.scss'
})
export class FormTrabajadoresComponent {
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _cargoService:CargosService = inject(CargosService);
  private _trabajadorService:TrabajadoresService = inject(TrabajadoresService);
  _service: ServiceService = inject(ServiceService);
  private _fb:FormBuilder = new FormBuilder();
  form:FormGroup = new FormGroup({});
  arrayCargos: Array<any> = [];
  arrayEstados: Array<any> = [
    { id: 'Activo', name: 'Activo' },
    { id: 'Inactivo', name: 'Inactivo' },
  ];
  arraySexo: Array<any> = [
    { id: 'Masculino', name: 'Masculino' },
    { id: 'Femenino', name: 'Femenino' },
  ];
  actualizar = false;
  isloading = false;

  config1 = {
    displayKey: 'nombre', // Nombre del campo que se mostrará en la lista.
    search: true,       // Habilitar búsqueda.
    height: '200px',    // Altura del dropdown.
    placeholder: 'Cargo', // Texto de placeholder.
  };

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    this.cargarCargos();
    if (id != null) {
      this.actualizar = true;
      this.cargarLancha(parseInt(id));
    } else {
      this.cargarForm();
    }
  }

  async cargarLancha(id:number) {
    const res:any = await this._trabajadorService.getTrabajador(id);
    if (!res.error) {
      this.cargarForm(res);
    }
  }

  async cargarCargos() {
    const res:any = await this._cargoService.getAllCargos(null);
    if (!res.error) {
      this.arrayCargos = res;
    }
  }

  cargarForm(data:any = null) {
    this.form = this._fb.group({
      id: [data?.id],
      nombre: [data?.nombre, Validators.compose([Validators.required])],
      identificacion: [data?.identificacion, Validators.compose([Validators.required])],
      id_cargo: [data?.id_cargo, Validators.compose([Validators.required])],
      sexo: [data?.sexo, Validators.compose([Validators.required])],
      estado: [data?.estado, Validators.compose([Validators.required])],
    });
    this.isloading = true;
    const cargos = this.arrayCargos.find((cargo:any) => cargo.id == data.id_cargo);
    this.form.controls['id_cargo'].setValue(cargos);
  }

  async guardar(event:any) {
    this._service.addLoading(event.target);
    let data = this.form.getRawValue();
    data.id_cargo = data.id_cargo.id;
    const res:any = await this._trabajadorService.save(data);
    if (!res.error) {
      this._service.removeLoading(event.target);
      this._service.url('/dashboard/trabajadores');
    }
  }

  async update(event:any) {
    this._service.addLoading(event.target);
    const data = this.form.getRawValue();
    data.id_cargo = data.id_cargo.id;
    const res:any = await this._trabajadorService.update(data.id, data);
    if (!res.error) {
      this._service.removeLoading(event.target);
      this._service.url('/dashboard/trabajadores');
    }
  }
}
