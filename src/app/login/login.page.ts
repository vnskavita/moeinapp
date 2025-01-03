import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { APIsService } from '../services/apis.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NoWhitespaceValidator } from '../services/whitespace.service';
import { environment } from 'src/environments/environment';
import { DatePipe } from "@angular/common"
import { IonLoading, IonModal } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { GlobalConstants } from '../common/global-constants';
// import { IonLoaderService } from '../services/loader.service';
import { Subscription } from 'rxjs';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
//import { WebsocketReciverService } from "../services/websocketrecevier.service";

declare var cordova: any;
declare var MoECordova: any;
declare var Leegality: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isOpen = false;
  loginForm: FormGroup;
  errorMsg = '';
  submitted = false;
  showPassword: boolean = false;
  factor2: any = "";
  loginFlag = false;
  showTooltip: boolean;
  currentVersion: string = environment.currentVersion;
  lightLogo: string = "assets/images/tsologo-light.png";
  darkLogo: string = "assets/images/tsologo1.png";
  cssMode: string;
  // isModalOpen1: boolean = false;
  type = "";
  type1 = '';
  tokenVal: any;
  continue_signup: string = "0";
  @ViewChild('uid', { static: false }) ionInput: { setFocus: () => void; };
  @ViewChild(IonContent) content: IonContent;
  loading: any;
  isLoading: boolean;
  @ViewChild('accountMigrate_modal') accountMigrate_modal: IonModal;
  @ViewChild('loadinglogin') loadinglogin: IonLoading;
  showMainContent: Boolean = false;
  keyboardShowSubscription: Subscription;
  keyboardHideSubscription: Subscription;
  isKeyboardOpen: boolean = false;
  mobileNoFlag: boolean = true;

  constructor(
    private router: Router,
    private keyboard: Keyboard,
    private zone: NgZone,
    private apisService: APIsService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private inAppBrowser: InAppBrowser/*,private encryptDecrypt: DataEncryptDecryptService     ,private WebsocketService: WebsocketReciverService,*/
  ) {
    // document.addEventListener('deviceready', this.onDeviceReady.bind(this));
    // this.currentAppVersionCheck();
    if (localStorage.getItem('jwt_token') != null) {
      this.router.navigateByUrl('/watchlist')
    } else {
      this.loginFlag = true
    }
  }


  ngOnInit() {
    GlobalConstants.animationFlag = true;
    localStorage.removeItem('addScriptSearchValue');
    this.loginForm = this.fb.group({
      mobileno: [''],
      uid: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      password: ['', [Validators.required, Validators.minLength(6), NoWhitespaceValidator.NoWhitespaceValidator]],
    });
    // this.currentAppVersionCheck();
    this.cssMode = localStorage.getItem("cssMode");
  }

  ionViewWillEnter() {
    if (localStorage.getItem('loginWithMobileNoFlag')!=null) {
      this.mobileNoFlag = localStorage.getItem('loginWithMobileNoFlag') == '1' ? true : false;
    }
    this.showPassword = false;
    // this.ionInput.setFocus();
    this.submitted = false;
    this.cssMode = localStorage.getItem("cssMode");
    var marketProtection = localStorage.getItem('marketProtection');
    if (marketProtection === null || marketProtection === undefined || marketProtection === 'null') {
      marketProtection = '5';
      localStorage.setItem('marketProtection', marketProtection);
    }

    this.loginForm = this.fb.group({
      mobileno: [''],
      uid: [''],
      password: ['', [Validators.required, Validators.minLength(6), NoWhitespaceValidator.NoWhitespaceValidator]],
    });

    if (localStorage.getItem('uid') != null || localStorage.getItem('uid') != 'NULL' || localStorage.getItem('uid') != undefined) {
      this.loginForm.controls['uid'].setValue(localStorage.getItem('uid'));
    }
  }
  ionViewDidEnter() {
    this.ionInput.setFocus();
    this.keyboardShowSubscription = this.keyboard.onKeyboardDidShow().subscribe(() => {
      this.zone.run(() => {
        this.showMainContent = true;
        this.isKeyboardOpen = true;
      });
    });
    this.keyboardHideSubscription = this.keyboard.onKeyboardDidHide().subscribe(() => {
      this.zone.run(() => {
        this.showMainContent = false;
        this.isKeyboardOpen = false;
      });
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  push_notification(): void {
    // this.tokenVal = localStorage.getItem('push_noti_token');
    // if (environment.production) {
    //   if (this.tokenVal == null || this.tokenVal == '') {
    //     cordova.plugins.firebase.messaging.getToken().then(function (token) {
    //       localStorage.setItem('push_noti_token', token)
    //       this.tokenVal = token;
    //       let moe = new MoECordova.init();
    //       moe.passFcmToken(token);
    //     });
    //   }
    // }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  valid() {
    var x: any = this.loginForm.controls['factor2'].value;
    if (x == '') {
      this.loginForm.controls['factor2'].setValidators(Validators.required)
      this.loginForm.controls['factor2'].updateValueAndValidity();
    } else {
      if ((isNaN(Number(x.substring(0, 1))))) {
        this.loginForm.controls['factor2'].setValidators(Validators.pattern('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$'))
      }
      else {
        this.loginForm.controls['factor2'].setValidators(Validators.pattern('^[0-9]{8}$'))
      }
    }
  }

  setOpen() {
    this.accountMigrate_modal.present();
  }

  showtooltip(): void {
    this.showTooltip = !this.showTooltip;
    this.isOpen = true;
  }

  ClickOutside() {
    this.isOpen = false;
    this.showTooltip = false;
  }

  Clickback() {
    this.showTooltip = false;
    let element: HTMLElement = document.getElementById('gotit') as HTMLElement;
    element.style.display = "none"
  }


  login() {
    this.content.scrollToTop();
    this.submitted = true;
    if (this.mobileNoFlag) {
      this.f.uid.setValidators(null);
      this.f.mobileno.setValidators([Validators.required, Validators.pattern(/^[0-9]{10}$/)]);
      this.f.mobileno.enable();
      this.f.uid.disable();
    } else {
      this.f.uid.setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(10), Validators.pattern(/^[a-zA-Z0-9]*$/)]);
      this.f.mobileno.setValidators(null);
      this.f.uid.enable();
      this.f.mobileno.disable();
    }
    if (this.loginForm.valid) {
      
    }
  }

  forgotPassword() {
    localStorage.setItem("page_name", 'forgot-password');
    this.router.navigate(['login/forgot-password']);
  }

  unblock() {
    localStorage.setItem("page_name", 'block-unblock');
    this.router.navigate(['login/forgot-password']);
  }

  // currentAppVersionCheck() {
  //   let VersionCheckData = {};
  //   VersionCheckData['currentVersion'] = this.currentVersion;
  //   let res = this.apisService.currentAppVersionCheck(VersionCheckData).subscribe((res) => {
  //     this.type = res.data.type;
  //     if (this.type == "N") {
  //       this.type1 = "Optional";
  //     }
  //     else {
  //       this.type1 = "Mandatory";
  //     }
  //     if (this.currentVersion < res.data.version_no) {
  //       this.isModalOpen1 = true;
  //     }
  //     else {
  //       this.isModalOpen1 = false;
  //     }
  //   })
  // }

  // appUpdate() {
  //   window.open("https://play.google.com/store/apps/details?id=in.tradesmartonline.lite&ah=z9l35hrtplO0DOft8yWbX592aBw", "_system");
  // }

  // didDismiss() {
  //   this.isModalOpen1 = false;
  // }
  pushtag() {
    //  // this.apisService.gtagpush('signup', 'signup');
    //  this.router.navigate(['ekyc/login/signup']);
    //   //this.router.navigate(['login/signup']);
    //   document.body.setAttribute('color-theme', 'light');
    // this.inAppBrowser.create('https://signup.tradesmartonline.in/', '_system', 'location=yes');
    this.inAppBrowser.create('https://signup.tradesmartonline.in/?utm_source=MobileApp&appsflyerid='+localStorage.getItem('AppsFlyerID'), '_system', 'location=yes');
    var genattr = {
      "App version": this.currentVersion,
      "Page URL": "login",
    }
    this.apisService.trackEvent("Clicked on Register", genattr)
  }

  signup() {
    setTimeout(() => {
      localStorage.setItem("continue_signup", "true");
      this.continue_signup = "0";
    }, 2000);
  }

  closeAccModal() {
    this.accountMigrate_modal.dismiss();
  }

  /**
   * 
   * @param flag 
   * this function is used to toggle login page between mobile no and user id 
   */
  toggleLogin(flag: boolean) {
    this.submitted = false;
    this.mobileNoFlag = flag;
    if (this.mobileNoFlag) {
      this.f.uid.setValidators(null);
      this.f.mobileno.setValidators([Validators.required, Validators.pattern(/^[0-9]{10}$/)]);
      this.f.mobileno.enable();
      this.f.uid.disable();
    } else {
      this.f.uid.setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(10), Validators.pattern(/^[a-zA-Z0-9]*$/)]);
      this.f.mobileno.setValidators(null);
      this.f.uid.enable();
      this.f.mobileno.disable();
    }
  }
}