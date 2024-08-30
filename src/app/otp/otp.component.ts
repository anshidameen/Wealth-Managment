import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../services/api.service';
 
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
   digit1: string = '';
   digit2: string = '';
   digit3: string = '';
   digit4: string = '';
   enteredOTP: string = '';
 
   generatedOTP: string = '';
 
   errorMessage: string = '';
   email: string = '';
   showMessage: boolean = false;
 
 
   @ViewChild('digit1Input') digit1Input: ElementRef | undefined;
   @ViewChild('digit2Input') digit2Input: ElementRef | undefined;
   @ViewChild('digit3Input') digit3Input: ElementRef | undefined;
   @ViewChild('digit4Input') digit4Input: ElementRef | undefined;
   
 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: ApiService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
    });
    localStorage.setItem('email', this.email);

  }
 
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const email = params['email'];
      if (email) {
        this.fetchOTP(email);
      }
    });
  }
 
  fetchOTP(email: string) {
    this.userService.getGeneratedOTP(email).subscribe(
      (otp) => {
        this.generatedOTP = otp;
        localStorage.setItem('token', this.generatedOTP);
      },
      (error) => {
        this.errorMessage = 'Error fetching OTP. Please try again later.';
      }
    );
  }
 
  verifyOtp() {
    const enteredOTP = this.digit1 + this.digit2 + this.digit3 + this.digit4;
    const storedOTP = localStorage.getItem('token');
   
   // Store entered email and OTP
   localStorage.setItem('email', this.email);
   localStorage.setItem('enteredOTP', enteredOTP);
 
    if (enteredOTP === storedOTP) {
      this.router.navigate(['/newpassword']);
    } else {
      this.errorMessage = 'Invalid OTP. Please try again.';
      this.showEnterOtpMessage();
      this.clearOtpFields();
      if (this.digit1Input) {
        this.digit1Input.nativeElement.focus();
      }

    }
  }
 
  showEnterOtpMessage() {
    this.showMessage = true;
  }
 
  clearOtpFields() {
    this.digit1 = '';
    this.digit2 = '';
    this.digit3 = '';
    this.digit4 = '';
  }
 
  focusNextInput(currentInput: number) {
    const nextInput = currentInput + 1;
    const nextInputRef = this[`digit${nextInput}Input`];
 
    if (nextInputRef) {
      nextInputRef.nativeElement.focus();
    }
  }


}



 

 
 

 
 
 
 
 
 

















