import { Component, OnInit } from '@angular/core';
import { Role, User } from '../../shared/user';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../shared/services/authentication.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  roleKeys: string[];
  registerForm: FormGroup;
  role = Role;
  hide = true;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private router: Router) {
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
    if (this.registerForm.invalid) {
      return;
    }
    const user = new User(userData);
    this.userService.registerUser(user);
    this.router.navigate(['/login']);
  }
}
