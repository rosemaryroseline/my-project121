import { Component } from '@angular/core';
import { RegistrationService } from '../../service/registration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { register } from '../../service/registration';
import { Router } from '@angular/router';
import { Contact } from '../../service/registration';
import { customValidate } from 'src/app/customValidateEmail';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  isSignInMode=true
  // isLogedIn:boolean=false
  myform!:FormGroup
  emailExistMessage:string | null=null;
// email=''

// password=''
 errorMessage: string = '';
registeredData:any[]=[];
register:register[]=[]
constructor(private service:RegistrationService,private fb:FormBuilder,private route:Router){

}
ngOnInit(){
  this.myform=this.fb.group({
    email:['',[Validators.required,customValidate.validateEmail]],
    name:['',Validators.required],
    password:['',Validators.required],
   
  })
}
toggleSignInSignUp(){
this.isSignInMode=!this.isSignInMode
}
onSignin(){

const signin=this.myform.value;
console.log(signin,'sussssss')
this.service.Login(signin).subscribe((res)=>{
  console.log('login success',res);
  const userId=res.userId;
  localStorage.setItem(`token${userId}`,res);
  this.service.login();
  this.registeredData.push(this.myform.value);
  this.myform.reset();
  this.route.navigate(['/home']);
},(error)=>{
  if(error.status===404 && error.error.message==='User not found'){
        this.errorMessage='Invalid email and password';
    
      }else if(error.status===400 && error.error.message==='Password is Incorrect'){
        this.errorMessage='wrong password';
      }else {
        this.errorMessage='error occured';
      }
})

}



onSignup(){
  if(this.myform.invalid){
    this.errorMessage='please fill all the fields'

    return;
  }
  const signup:register=this.myform.value;
  this.service.registration(signup).subscribe((res)=>{
    console.log('registered',res)
   
    this.service.saveToken(res.token);
    console.log('successssss',res.token)
    this.register.push(this.myform.value);
this.errorMessage='';
    this.myform.reset();
    this.route.navigate(['/home']);
   

  } , (error) => {
    // Check if the error is specifically about email already existing
    if (error.status === 400 && error.error?.message === 'Email is already registered') {
      this.emailExistMessage = 'Email already exists.';
    } else {
      // Handle any other errors
      this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
    }
  })
}


}
