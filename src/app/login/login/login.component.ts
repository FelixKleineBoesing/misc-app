import { Component, OnInit } from '@angular/core';
import { Role } from '../../shared/user';
import { AuthService } from '../../shared/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  roleKeys: string[];
  loginForm: FormGroup;
  return: string = '';
  hide = true;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.roleKeys = Object.keys(Role).filter((k) => !isNaN(Number(k)));
  }

  ngOnInit(): void {
    this.createFormGroup();
    this.route.queryParams
      .toPromise()
      .then((params) => (this.return = params['return'] || '/'));
  }

  login(userData: any) {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.loginUser(userData.userNameMail, userData.password).toPromise().then(user => {
      this.router.navigateByUrl(this.return);
    }).catch(error => {
      console.log(error);
    });
  }

  createFormGroup() {
    this.loginForm = this.fb.group({
      userNameMail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
