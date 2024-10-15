import { Component } from '@angular/core';
import { RegistrationService } from '../service/registration.service';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { Contact } from '../service/registration';
import { customValidate } from '../customValidateEmail';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
valid!:FormGroup
formSubmitted:boolean=false;
myContact:Contact[]=[]
constructor(private service:RegistrationService,private fb:FormBuilder){

}


ngOnInit(){
this.valid=this.fb.group({
  name:['',[Validators.required,Validators.minLength(5)]],
  email:['',[Validators.required,customValidate.validateEmail]],
  message:['',[Validators.required,]]
})
}

  // onSubmit(){
  //   const data:Contact=this.valid.value;
  //   this.service.contactList(data).subscribe((res)=>{
  //     console.log(res,'data recievd success')
  //     this.myContact.push=(this.valid.value);
  //   })
  // }
  onSubmit() {
    this.formSubmitted = true; // Set formSubmitted to true to show validation messages
  
    // Check if the form is valid before submitting
    if (this.valid.valid) {
      const data: Contact = this.valid.value; // Get form values
  
      // Call the service to submit the contact data
      this.service.contactList(data).subscribe(
        (res) => {
          console.log(res, 'Data received successfully');
          
          // Add the submitted contact data to the local contact list array
          this.myContact.push(data);
  
          // Optionally reset the form after successful submission
          this.valid.reset();
          this.formSubmitted = false; // Reset formSubmitted after successful submission
        },
        (error) => {
          console.error('Error while submitting form:', error);
        }
      );
    } else {
      // If form is invalid, it will show validation messages
      console.log('Form is invalid');
    }
  }
}
