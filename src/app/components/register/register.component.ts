import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { registerinfo } from 'src/app/models/registerAccountInterface';
import { RegisterAccountService } from 'src/app/services/register-account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  
  userInfoArray: registerinfo[] = []; //array where the user data will be stored so it can be send to the server later
  registerForm: FormGroup; //form group property
  savedWasClicked: boolean = false;


  constructor(private userInfo: RegisterAccountService, private formBuilder: FormBuilder) {
    //I'm creating a form an specifying what data goes inside of it
    this.registerForm = formBuilder.group(
      {
        //the input data will be stored here
        //also adding some validators
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      }
    )
  }

  //component's save method
  save() {

    this.savedWasClicked = true;
    
    let userInformation = this.registerForm.value; //in this line I recover the inputs from my form and assign them to this variable
    //checking if the form is valid before pushing it  
    if (this.registerForm.valid) {
      this.userInfo.saveAccount(userInformation).subscribe(
        {
          next: userInformation => {
            this.userInfoArray.push(userInformation);   //pushin the data form to the array that will be capture by the registerAccountService class
            this.registerForm.reset();                  //resets the form
            this.savedWasClicked = false; 
          }
        }
      )
    }
  }

  /*
    Here I taking the values of my registerform attributes. I'm doing this so it's easiear for me to check
    for erros and show them within the template (via ngFor)
  */
  get firstName(): any {
    return this.registerForm.get("firstName");
  }

  get lastName(): any {
    return this.registerForm.get("lastName");
  }

  get email(): any {
    return this.registerForm.get("email");
  }

  get password(): any {
    return this.registerForm.get("password");
  }
}
