import { CanActivateFn } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { inject } from '@angular/core';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const _service: ServiceService = inject(ServiceService);
  let user = localStorage.getItem('dataUser') || '';
  if (user == '') {
    return true;
  }
  let userParse = JSON.parse(user);
  if (userParse?.perfil == 'contador') {
    _service.url('/clients');
  } else {
    _service.url('/dashboard');
  }
  return false;
};
