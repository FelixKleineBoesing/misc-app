import { Component, OnInit } from '@angular/core';
import { Role, User } from '../../shared/user';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../shared/services/authentication.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  roleKeys: string[];
  registerForm: FormGroup;
  role = Role;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private userService: UserService) {
    this.roleKeys = Object.keys(Role).filter(k => !isNaN(Number(k)));
  }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup(): void {
    this.registerForm = this.fb.group({
        username: ['', Validators.required],
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        role: ['1', Validators.required],
      });
  }

  onSubmit(userData: object) {
    Object.keys(this.registerForm.controls).forEach(key => {
      console.log(key)
      const controlErrors: ValidationErrors = this.registerForm.get(key).errors;
      if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
            });
          }
        });
    const user = new User(userData);
    this.userService.registerUser(user);
  }
}
