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
    
  fillerNav = [
    //{name: 'Dashboard', link: '', icon: 'dashboard', action: () => this._services.url('dashboard/boleta-servicio'), clase: ''},
    {name: 'Usuarios', link: 'usuarios', icon: 'account_circle', action: () => this._services.url('dashboard/usuarios'), clase: ''},
    {name: 'Boletas', link: 'boletas', icon: 'assignment', action: () => this._services.url('dashboard/boleta-servicio'), clase: ''},
    {name: 'Cerrar Sesión', link: '', icon: 'logout', action: () => this._services.cerrarSecion(), clase: 'cerrar'},
  ];

  private _mobileQueryListener: () => void;
  constructor() {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
