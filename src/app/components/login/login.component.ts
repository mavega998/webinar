import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm() {
    this.usuario = this.formBuilder.group({
      usuario: [null, Validators.required],
      clave: [null, Validators.required]
    });
  }

  login() {
    if (this.usuario.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verifica que los campos no esten vacíos.',
      });
    }
    this.apiService.login(this.usuario.value).subscribe((data: any) => {
      if (data.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.msg,
        });
      }
      if (data.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso.',
          showConfirmButton: false,
          timer: 1500
        }).then(info => {
          localStorage.setItem('usuario', JSON.stringify(data.msg));
          this.router.navigateByUrl('/eventos');
        });
      }
    });
  }

}
