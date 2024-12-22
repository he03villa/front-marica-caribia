import { CanActivateFn } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { inject } from '@angular/core';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const _service: ServiceService = inject(ServiceService);
  const user = localStorage.getItem('dataUser') || '';
  if (user == '') {
    return true;
  }
  _service.url('/dashboard');
  return false;
};
