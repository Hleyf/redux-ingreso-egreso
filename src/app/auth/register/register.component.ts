import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;

  constructor( private fb: FormBuilder,
               private authService : AuthService,
               private router : Router ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  crearUsuario(){
    if(this.formGroup.invalid){return;}

    //loading card
    Swal.fire({
      title: 'Loading...',
      didOpen: () => {
        Swal.showLoading()
      }});
    const{nombre, correo, password} = this.formGroup.value;
    this.authService.createUser(nombre,correo,password)
    .then(credenciales => {
      console.log(credenciales);
      Swal.close();
      this.router.navigate(['/'])
    })
    .catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      })
    });
  }
}
