import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ForgotpasswordService } from 'src/app/services/forgotpassword.service';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  // constructor(private userService:ApiService,private router: Router) { }
  constructor(
    private formBuilder: FormBuilder,
    private userService: ApiService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  
  
  }
  email: string = '';
  currentStep = 1;
  forgotPasswordForm: FormGroup;
  name = new FormControl('');

  

  ngOnInit(): void {}
  
  sendVerificationCode() {
    
  
    if (!this.email) {
      // Handle the case where the email is empty
      return;
    }

    
    this.userService.forgotPassword(this.email).subscribe(
      (token) => {

        console.log('Success:', token);
        // Handle the response here (e.g., show a success message)
        this.router.navigate(['/otp'], { queryParams: { email: this.email } });
      },
      (error) => {
        // Handle the error (e.g., display an error message)
      }
    );
  }

  
 
  

}
