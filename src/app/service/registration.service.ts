import { HttpClient, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contact, register } from './registration';
import{map} from 'rxjs'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {


  private loggedInSubject$=new BehaviorSubject<boolean>((this.hastoken()));
  loggedIn=this.loggedInSubject$.asObservable();

  private hastoken():boolean{
return !!localStorage.getItem('token');
  }
  login(){
    this.loggedInSubject$.next(true);
  }
  logout(){
    this.loggedInSubject$.next(false);
  }
  constructor(private http:HttpClient,private route:Router) { }

  private baseUrl = 'https://first-project-1-f4pw.onrender.com'; 

// private baseUrl = 'http://localhost:1275'; 
private url = `${this.baseUrl}/api/register`;
private urllogin = `${this.baseUrl}/api/login`;
private urlContact = `${this.baseUrl}/api/contact`;
private urlfile = `${this.baseUrl}/api/downloadFile`;
private urlscripture = `${this.baseUrl}/read`;
private urlforgot = `${this.baseUrl}/forgot-password`;
private urlreset = `${this.baseUrl}/reset-password`;


  registration(register:register):Observable<any>{
    console.log('data saved',register)
return this.http.post<any>(this.url,register);

  }
  saveToken(token:string){
    localStorage.setItem('token',token);

  }
  getToken():string | null{
    return localStorage.getItem('token')
  }

//   handleRegistrationToken(response:any):void{
//     const token=response.token
//     const userId=response.userId;

// if(token){
//   localStorage.setItem(`token${userId}`,token);
//   console.log('recievd token')
// }
//   }
  Login(loginData:{email:string,password:string}):Observable<any>{
console.log('logined',loginData)
return this.http.post<any>(this.urllogin,loginData)
  }




  contactList(data:Contact):Observable<any>{
return this.http.post<any>(this.urlContact,data)
  }

  public downloadFile(): Observable<Blob> {

    return this.http.get(this.urlfile, {
      observe: 'response',
      responseType: 'blob'
    }).pipe(
      map((response: HttpResponse<Blob>) => response.body as Blob)  
    );
  }
  scripturesFile(type: string): Observable<any> {
    return this.http.get(`${this.urlscripture}?type=${type}`, { responseType: 'text' });
  }
  
forgotPassword(email:string):Observable<any>{
  console.log('ooooooooooooooo')
  return this.http.post(`${this.urlforgot}`,{email})
}
resetPassword(token:string,newPassword:string){
  console.log('vvvvvvvvvvvvvvvvvvvvvv')
return this.http.post(`${this.urlreset}`,{token,newPassword})
}
}
