import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
// import { SignupService } from 'src/app/services/signup.service';
@Component({
  selector: 'app-signup2',
  templateUrl: './signup2.component.html',
  styleUrls: ['./signup2.component.scss']
})
export class Signup2Component {

  form: FormGroup;
  name: string;

  constructor(private fb: FormBuilder, private router: Router, private signupService: ApiService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      userSSN: ['', [Validators.required, Validators.pattern(/^\d{12}$/), Validators.pattern(/^[0-9]+$/)]],
      // userSSN: ['', [Validators.required, Validators.pattern(/^\d{12}$/), Validators.pattern(/^[0-9]+$/)]],
    });
  }
  // get userId() { return this.form.get('userId'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get userSSN() { return this.form.get('userSSN'); }

  emailIsRequiredError() {
    return this.email?.hasError('required') && this.email?.touched;
  }

  emailIsInvalidError() {
    return this.email?.hasError('email') && this.email?.touched;
  }

  passwordIsRequiredError() {
    return this.password?.hasError('required') && this.password?.touched;
  }

  passwordIsMinLengthError() {
    return this.password?.hasError('minlength') && this.password?.touched;
  }

  ssnIsRequiredError() {
    return this.userSSN?.hasError('required') && this.userSSN?.touched;
    return this.userSSN?.hasError('required') && this.userSSN?.touched;
  }

  ssnIsPatternError() {
    return this.userSSN?.hasError('pattern') && this.userSSN?.touched;
  }

  ngOnInit() {
    this.name = localStorage.getItem('username');
  }
  onSubmit() {
    if (this.form.valid) {

      localStorage.setItem('email', this.form.value.email);
      localStorage.setItem('password', this.form.value.password);
      localStorage.setItem('userSSN', this.form.value.userSSN);
      localStorage.setItem('username', this.name);
      const formData = this.form.value;
      const username = localStorage.getItem('username');
      const email = localStorage.getItem('email');
      const password = localStorage.getItem('password');
      const userSSN = localStorage.getItem('userSSN');

      this.signupService.register(username, email, password, userSSN).subscribe(
        (response) => {


          console.log('Full Server Response:', response); const userId = response; console.log('Received User ID:', userId);


          localStorage.setItem('userId', userId);



          console.log('Data sent to the backend successfully. User ID:', userId);
        },
        (error: any) => {
          console.error('Error sending data to the backend:', error);

        }
      );
      console.log('Form submitted!');
      this.router.navigate(['/goal-setting']);
      this.form.reset();
    } else {
      console.log('Form has errors. Please fix them.');
    }
  }






  steps = [' 1', ' 2', ' 3'];
  currentStep = 1;

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }

  }
}


