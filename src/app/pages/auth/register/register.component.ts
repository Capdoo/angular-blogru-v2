import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UtilToolsService } from '../../../shared/services/util-tools.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { RegisterUserDto } from '../interfaces/register-user-dto';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerGroup: FormGroup;
  // distritos: InformationDto[];
  flagSubmit: boolean = true;

  matcher = new MyErrorStateMatcher();

  constructor(private utilToolsService: UtilToolsService,
    // private informationService: InformationService,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.enInicio();
    // this.utilToolsService.Timer();
  }

  enInicio(): void {
    this.registerGroup = this._formBuilder.group({
      registerApePaterno: ['', [Validators.required, Validators.maxLength(30)]],
      registerApeMaterno: ['', [Validators.required, Validators.maxLength(30)]],
      registerNombres: ['', [Validators.required, Validators.maxLength(30)]],
      registerUsuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      registerContrasena: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      registerRepetirContrasena: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      registerCorreo: ['', [Validators.required, Validators.email]],
    });
  }

  obtenerRequest(): RegisterUserDto {
    let registerUserDto: RegisterUserDto = {} as RegisterUserDto;
    registerUserDto.lastName = this.registerGroup.get('registerApePaterno').value + ' ' + this.registerGroup.get('registerApeMaterno').value;
    registerUserDto.firstName = this.registerGroup.get('registerNombres').value;
    registerUserDto.username = this.registerGroup.get('registerUsuario').value;
    registerUserDto.password = this.registerGroup.get('registerContrasena').value;
    registerUserDto.email = this.registerGroup.get('registerCorreo').value;


    return registerUserDto;
  }

  submit(): void {
    // this.flagSubmit = !this.flagSubmit;
    console.log(this.flagSubmit);

    console.log(this.registerGroup.valid);
    if (this.registerGroup.valid) {
      console.log(this.registerGroup.valid);

      if (this.registerGroup.get('registerContrasena').value != this.registerGroup.get('registerRepetirContrasena').value) {
        this.utilToolsService.errNotif('Registrar', 'Campos incorrectos: La contraseñas no coinciden');
        return;
      }

      let registerUserDto = this.obtenerRequest();
      console.log(registerUserDto);

      this.authService.registerUser(registerUserDto).subscribe(
        data => {
          console.log(data);
          this.utilToolsService.successNotif('Registrar', 'Registro exitoso');
          this.router.navigate(['/site/auth/login']);
        },
        err => {
          console.error(err);
          // this.utilToolsService.errNotif('Registrar', err.error.message);
          this.utilToolsService.errNotif('Registrar', 'Ocurrio un error');
        }
      );

    } else {

      this.utilToolsService.errNotif('Registrar', 'Campos incorrectos');
      return;

    }
  }

  verMsj() {
    this.utilToolsService.successNotif('Registrar', 'Registro exitoso');
  }

  verMsjErr() {
    this.utilToolsService.errNotif('Registrar', 'Ocurrió un error');
  }

  verTimer() {
    this.utilToolsService.Timer();

    setTimeout(() => {
      console.log("Ejecutando ...")
      this.utilToolsService.CloseTimer();

    }, 3000)
  }

}
