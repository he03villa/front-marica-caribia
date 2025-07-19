import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-cliente-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule],
  templateUrl: './cliente-layout.component.html',
  styleUrl: './cliente-layout.component.scss'
})
export class ClienteLayoutComponent {
  mobileQuery: MediaQueryList;
  _services: ServiceService = inject(ServiceService);
  dataUser:any = localStorage.getItem('dataUser') || undefined;
    
  fillerNav = [
    {name: 'Clientes', link: 'clientes', icon: 'design_services', action: () => this._services.url('clients/clientes'), clase: '', permisos: []},
    {name: 'Factura', link: 'factura', icon: 'assistant_navigation', action: () => this._services.url('clients/factura'), clase: '', permisos: []},
    {name: 'empleados', link: 'empleados', icon: 'assistant_navigation', action: () => this._services.url('clients/empleados'), clase: '', permisos: []},
    {name: 'Cerrar Sesión', link: '', icon: 'logout', action: () => this._services.cerrarSecion(), clase: 'cerrar', permisos: []},
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
