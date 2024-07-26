import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  defaultAuth: any = {
    email: 'admin@rabbit',
    password: 'rabbit123',
  };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private sv: LoginService
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    authService.isUserAnonymousLoggedIn().then((isAnonymous) => {
      if (isAnonymous) {
        this.router.navigate(['/main'])
      }
    })
  }
  myAsync = async (): Promise<any> => {

    var dataMember = {
      username: this.loginForm.controls.email.value ?? '',
      password: this.loginForm.controls.password.value ?? ''
    };
    const response = await this.sv.login(dataMember);

    console.log(response);
    return response;
  }

  signIn() {
    this.myAsync().then((res) => {
      console.log(res);
      if (res.status === true) {
        this.router.navigate(['/dashboard']

        ).then(() => {
          this.authService.reloadComponent();
          // this.authService.reloadComponent()
          // window.location.reload();
        })
      }
      else {
        // Swal.fire({
        //   icon: 'error',
        //   confirmButtonColor:'#50CD89',
        //   title: 'เข้าสู่ระบบล้มเหลว ❗❗',
        //   text: 'เนื่องจากกรอก ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง',
        //   // footer: '<a href="">Why do I have this issue?</a>'
        // });
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        this.defaultAuth.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    this.hasError = false;
    const loginSubscr = this.authService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe((user: UserModel | undefined) => {
        if (user) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
