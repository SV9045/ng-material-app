import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { PasswordStrengthValidator } from 'src/app/core/validators/password-strength.validator';
import { ConfirmPasswordValidator } from 'src/app/core/validators/pasword-match.validator';
import { AuthService } from '../auth.service';
import { UiService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  maxDate: any;
  isLoading = false;
  private isLoadingSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
   this.isLoadingSubscription = this.uiService.loadingStateChanged.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.signupForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            PasswordStrengthValidator,
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        tc: ['', [Validators.requiredTrue]],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 26);
  }

  onSubmit() {
    // console.log(this.signupForm.value);
    this.authService.registerUser({
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    });
  }

  ngOnDestroy() {
    this.isLoadingSubscription.unsubscribe();
  }
}
