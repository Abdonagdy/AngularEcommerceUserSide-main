import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/Services/translation.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  LoginForm: FormGroup;
  invalidLogin: boolean = false;
  langFlag: boolean = true;
  returnUrl: string = '';
  currentLanguage: string = '';
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private translationService: TranslationService,
    private translate: TranslateService,
    private titleService: Title,
    private activatedRoute: ActivatedRoute
  ) {
    this.LoginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('تسجيل الدخول مراكز مايز لصيانة السيارات');

    this.subscription.add(
      this.translationService.getLanguageObservable().subscribe(language => {
        this.currentLanguage = language;
        if (language === 'ar') {
          this.translate.setDefaultLang('ar');
          this.langFlag = false;
        } else {
          this.translate.setDefaultLang('en');
          this.langFlag = true;
        }
      })
    );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get Email() {
    return this.LoginForm.get('Email');
  }

  get Password() {
    return this.LoginForm.get('Password');
  }

  login(): void {
    if (this.LoginForm.invalid) {
      return;
    }

    const loginData = this.LoginForm.value;
    this.subscription.add(
      this.userService.LoginUser(loginData).subscribe({
        next: () => {
          const returnUrl = this.userService.getReturnUrl() || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: () => {
          this.invalidLogin = true;
        }
      })
    );
  }
}
