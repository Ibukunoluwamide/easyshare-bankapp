import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public user_id:any = ''
  public res:any = {}
  imagePath:any = ''
  constructor(public http: HttpClient, public route: Router,public service: UsersService){}
 ngOnInit(){
  if (localStorage['easyshareUser_id']) {  
    // this.fetchProfilePicture(); 
    this.user_id = Number(JSON.parse(localStorage['easyshareUser_id']!))
    // console.log(this.user_id);
    this.http.post('http://localhost/easyshare/dashboard.php', this.user_id).subscribe(response=>{
      this.res = response
      console.log(this.res);
      
      this.service.userData.next(this.res.data)
      localStorage.setItem('easyshareCurrentUser', JSON.stringify(this.res.data))
      localStorage.setItem('easyshareCurrentUserAccNo', JSON.stringify(this.res?.data.accountnumber))
     
    },(error)=>{
      console.log(error);
      
    })
  }
  else{
    this.route.navigate(['/login'])
  }
  
 }

 uploadImage(e:any){
  console.log(e.target.files[0]);
  const formdata = new FormData()
  const accNo:any = parseFloat(JSON.parse(localStorage['easyshareCurrentUserAccNo']))  
  formdata.append('image', e.target.files[0])
  formdata.append('accountnumber', accNo)
  this.http.post<any>('http://localhost/easyshare/uploadImage.php', formdata).subscribe(response=>{
   console.log(response);
   this.imagePath = response.imagePath
    if (response.status==true) {
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
  })
  

 }
//  private async fetchProfilePicture(): Promise<void>{
//   const accNo:any = parseFloat(JSON.parse(localStorage['easyshareCurrentUserAccNo']))  
//   this.http.post<any>('http://localhost/easyshare/fetchImage.php', { accountnumber: accNo})
//     .subscribe(response => {
//       if (response.status) {
//         this.imagePath = response.imagePath;
//       } else {
//         console.error('Failed to fetch profile picture:', response.message);
//       }
//     });
// }
}
