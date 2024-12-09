import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private _route:Router = inject(Router);
  private modalService = inject(NgbModal);

  constructor() { }

  url(textUrl:String) {
    this._route.navigate([textUrl]);
  }

  promise(subscribe:Observable<any>) {
    return new Promise((resolve, reject) => subscribe.subscribe((resul) => resolve(resul), async error => {
      console.log(error);
      const dataModal = {
        icon: '',
        text: '',
        confirmButtonText: 'Aceptar',
        showCancelButton: false,
        background: '.swal2-container.swal2-backdrop-show'
      };
      dataModal.icon = 'warning';
      if (error.status == 500) {
        dataModal.text = error.error.message;
      } else if(error.status == 401) {
        dataModal.text = error.error.message;
        const res = await this.Alert(dataModal);
        localStorage.removeItem('dataUser');
        location.href = '';
        return;
      } else {
        dataModal.text = error.error.error;
      }
      this.Alert(dataModal);
      resolve(error);
    }));
  }

  addLoading(target: any) {
    if (target) {
      target.innerHTML += " <i class='fas fa-spinner fa-pulse'></i>"; 
      target.disabled = true;
    } else {
      console.error('El elemento HTML es nulo.');
    }
  }
  

  removeLoading(target: any) {
    if (target) {
      let spinner = target.lastChild;
      if (spinner) {
        target.removeChild(spinner);
      }
      target.disabled = false;
    } else {
      console.error('El elemento HTML es nulo.');
    }
  }

  async Alert(data:any) {
    return await Swal.fire(data);
  }

  Toast(data:any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire(data);

  }

  cerrarSecion() {
    localStorage.removeItem('dataUser');
    this.url('');
  }

  capitalize(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  agruparElemetoArray(arra:Array<any>, numero:number) {
    const array = [];
    let arrayNumero = [];
    let inicio = 0;
    let fin = numero;
    const total = Math.ceil(arra.length / numero);
    for (let x = 0; x < total; x++) {
      arrayNumero = arra.slice(inicio, fin);
      array.push(arrayNumero);
      arrayNumero = [];
      inicio = fin;
      fin += numero;
    }
    return array;
  }

  abrirModal(componente:any, data:any) {
    const modalRef = this.modalService.open(componente);
    modalRef.componentInstance.data = data;
    return modalRef;
  }

  abrir(url:string, target = "_blank") {
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.classList.add('d-none');
    a.href = url;
    a.target = target;
    a.click();
    document.body.removeChild(a);
  }
}
