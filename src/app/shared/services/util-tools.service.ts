import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';
import { EventService } from './event.service';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilToolsService {

  interval: any;
  timeLeft: number = 1;

  constructor(    private spinner: NgxSpinnerService,
    private eventService: EventService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  mostrarMensaje() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  successNotif(component: string, message: string): void {
    Swal.fire({
      title: component,
      text: message,
      icon: "success",
      // showCancelButton: true,
      confirmButtonColor: "#3085d6",
      // cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success"
        // });
      }
    });
  }

  errNotif(component: string, message: string): void {
    Swal.fire({
      title: component,
      text: message,
      icon: "error",
      // showCancelButton: true,
      confirmButtonColor: "#3085d6",
      // cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success"
        // });
      }
    });
  }

  infoNotif(component: string, message: string): void {
    Swal.fire({
      title: component,
      text: message,
      icon: "info",
      // showCancelButton: true,
      confirmButtonColor: "#3085d6",
      // cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success"
        // });
      }
    });
  }

  mistery(component: string, message: string): void {
    Swal.fire({
      title: "Custom width, padding, color, background.",
      width: 600,
      padding: "3em",
      color: "#716add",
      background: "#fff url(/images/trees.png)",
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    });
  }

  logoutMessage(): void {
    Swal.fire({
      title: 'Cerrar Sesión',
      text: '¿Está seguro(a)?',
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.tokenService.logOut();
        this.eventService.flagLogout.emit(true);
        this.router.navigate(['/site']);
      }
    });
  }

  

  Timer = () => {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.spinner.show();
        clearInterval(this.interval);
        this.interval = 0;
        this.timeLeft = 1;
      }
    }, 300);
  }

  public CloseTimer = () => {
    clearInterval(this.interval);
    this.interval = 0;
    this.timeLeft = 1;
    this.spinner.hide();
  }
}
