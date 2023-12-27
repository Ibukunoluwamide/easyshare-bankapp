import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public userData = new BehaviorSubject(JSON.parse(localStorage['easyshareCurrentUser']||null))
  constructor(public http: HttpClient) { }
  registerUser(user:any){
    return this.http.post('http://localhost/easyshare/register.php', user)
  }
  loginUser(user:any){
    return this.http.post('http://localhost/easyshare/login.php', user)
  }
}
