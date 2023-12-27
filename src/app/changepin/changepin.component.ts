import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changepin',
  templateUrl: './changepin.component.html',
  styleUrls: ['./changepin.component.css']
})
export class ChangepinComponent {
  public msg:string = ''
  public style:string = ''
  public res:any ={}
 constructor(public fb: FormBuilder, public http: HttpClient){}
 public changePinForm = this.fb.group({
  current_pin: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
  new_pin: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
  confirm_pin: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
  accountnumber: JSON.parse(localStorage['easyshareCurrentUserAccNo'])
});

onSubmit() {
  if (this.changePinForm.valid) {
    // Handle form submission logic here
    // console.log(this.changePinForm.value)
    if (this.changePinForm.value.new_pin != this.changePinForm.value.confirm_pin) {
      Swal.fire({
        confirmButtonColor: "#3085d6",
        text: "PIN Does not Match!",
        icon: "error"
      });
    }else{
    this.http.post('http://localhost/easyshare/changepin.php', this.changePinForm.value).subscribe(response=>{
      this.res = response
      console.log(this.res);
      if (this.res.status==true) {
        Swal.fire({
          confirmButtonColor: "#3085d6",
          text: this.res.message,
          icon: "success"
        });
      }else{
        Swal.fire({
          confirmButtonColor: "#3085d6",
          text: this.res.message,
          icon: "error"
        });
        
      }
   
    },(error)=>{
      console.log(error);
      
    })
  }
}
}
}
