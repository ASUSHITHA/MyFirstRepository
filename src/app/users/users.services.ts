import { Injectable } from '@angular/core';
import { User } from './users.model';
import { Http, RequestOptions } from '@angular/http';

@Injectable()
export class UsersServices {
  private _url: string = "http://192.168.1.15/UserApp1/api/Users"
  private _Roleurl: string = "http://192.168.1.15/UserApp1/api/Roles"


  public lstUsers: User[];
  constructor(private http: Http) { }
     
  getRole(){

    return this.http.get(this._Roleurl);
  }

  getlstUsers() {

    return this.http.get(this._url);
   


  }

  delete(id) {
    return this.http.delete(this._url + "/" + id.UserID);
  }

  postlstUsers(userinfo: User) {
    return this.http.post(this._url, userinfo);
  }

  putlstUsers(userinfo: User) {
    return this.http.put(this._url,userinfo);
  }

  putRole(roleInfo: User) {
    return this.http.put(this._url,roleInfo);
  }
}
