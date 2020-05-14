import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PasswordStrengthValidator } from 'src/core/validators/password-strength.validator';
import { ConfirmPasswordValidator } from 'src/core/validators/pasword-match.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  maxDate: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), PasswordStrengthValidator]],
      confirmPassword: ['', [Validators.required]],
      tc: ['', [Validators.requiredTrue]]
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 26);
  }

  onSubmit(form: FormGroup) {
    console.log(this.signupForm.value);
  }
}
