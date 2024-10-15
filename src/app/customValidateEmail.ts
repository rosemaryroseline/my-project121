import { AbstractControl, ValidationErrors } from "@angular/forms";


export class customValidate{

    static validateEmail(controls:AbstractControl):ValidationErrors | null{
      const email=controls.value
      if (!email) {
        return null; 
      }
            var validRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            
            if(email.match(validRegex)){
              return null;
            }else{
              return {emailInvalid:true};
            }
            
    }
}