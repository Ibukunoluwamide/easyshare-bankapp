import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  msg: string = '';
  style: string = '';
  res:any = {}
  constructor(public fb: FormBuilder, public service: UsersService, public route: Router) {}
  public ngForm = this.fb.group({
    first_name: ['John', [Validators.required, Validators.minLength(3)]],
    middle_name: ['Smith', [Validators.minLength(3)]], 
    last_name: ['Jinad', [Validators.required, Validators.minLength(3)]],
    email: ['john@gmail.com', [Validators.required, Validators.email]],
    phone_number: ['07063733666', [Validators.required]],
    national_id: ['003883883', [Validators.required]], 
    country: ['Nigeria', [Validators.required]], 
    date_of_birth: ['', [Validators.required]], 
    gender: ['', [Validators.required]], 
    password: ['12345', [Validators.required]],
    confirm_password: ['12345', [Validators.required]],
    agreement: [true, [Validators.requiredTrue]]
  });

  onSubmit() {
    if (this.ngForm.valid) {
      // console.log(this.ngForm.value);
      if (this.ngForm.value.password!=this.ngForm.value.confirm_password) {
        Swal.fire({
          confirmButtonColor: "#3085d6",
          text: "Password Does Not Match!",
          icon: "error"
        });
        
      }else{
        this.service.registerUser(this.ngForm.value).subscribe(
          (response) => {
            // console.log(response);
            this.res = response
            if (this.res.status==true) {
              this.route.navigate(['/login'])
            }else{
              Swal.fire({
                confirmButtonColor: "#3085d6",
                text: this.res.message,
                icon: "error"
              });
            }
          },
          (error) => {
            console.log('Error adding user:', error);
          })
      }
    }
    setTimeout(() => {
      this.msg = ""
      this.style = ""
    }, 3000);
  }
}
