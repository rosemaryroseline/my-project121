import { ChangeDetectorRef, Component } from '@angular/core';
import { RegistrationService } from './service/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-resume';
  isLogin:boolean=false;
  isMenuOpen = false;



  
  constructor(public service:RegistrationService,private route:Router,private cdr:ChangeDetectorRef){
 
    this.service.loggedIn.subscribe(loggedIn=>{
      this.isLogin=loggedIn;
      this.cdr.detectChanges();
    })
  }



  loggedOut(){
    this.service.logout();
    this.route.navigate(['/sign-in']);
    this.isMenuOpen = false;
  }
  sideShow(){

  }
}
