import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MediaMatcher} from '@angular/cdk/layout';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true
})
export class DashboardComponent {

  mobileQuery: MediaQueryList;
  _services: ServiceService = inject(ServiceService);
  dataUser:any = localStorage.getItem('dataUser') || undefined;
    
  fillerNav = [
    //{name: 'Dashboard', link: '', icon: 'dashboard', action: () => this._services.url('dashboard/boleta-servicio'), clase: ''},
    {name: 'Usuarios', link: 'usuarios', icon: 'account_circle', action: () => this._services.url('dashboard/usuarios'), clase: '', permisos: ['Administrador', 'Operador']},
    {name: 'Boletas', link: 'boletas', icon: 'assignment', action: () => this._services.url('dashboard/boleta-servicio'), clase: '', permisos: ['Administrador', 'Operador', 'Operativo Tablet']},
    {name: 'Lanchas', link: 'lanchas', icon: 'sailing', action: () => this._services.url('dashboard/lanchas'), clase: '', permisos: ['Administrador']},
    {name: 'Clientes', link: 'clientes', icon: 'support_agent', action: () => this._services.url('dashboard/clientes'), clase: '', permisos: ['Administrador']},
    {name: 'Embarcaciones', link: 'moto-naves', icon: 'local_shipping', action: () => this._services.url('dashboard/moto-naves'), clase: '', permisos: ['Administrador', 'Operador']},
    {name: 'Trabajadores', link: 'trabajadores', icon: 'engineering', action: () => this._services.url('dashboard/trabajadores'), clase: '', permisos: ['Administrador']},
    {name: 'Cerrar Sesión', link: '', icon: 'logout', action: () => this._services.cerrarSecion(), clase: 'cerrar', permisos: ['Administrador', 'Operador', 'Operativo Tablet']},
  ];

  private _mobileQueryListener: () => void;
  constructor() {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.dataUser = this.dataUser ? JSON.parse(this.dataUser) : '';
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
