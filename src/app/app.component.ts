import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { APIsService } from './services/apis.service';
// import { FirebaseMessaging } from '@awesome-cordova-plugins/firebase-messaging/ngx';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { Location } from '@angular/common';
import { Platform, AlertController, NavController, ModalController, PopoverController, IonModal } from '@ionic/angular';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { DatePipe } from '@angular/common';
import { NavigationEnd, RoutesRecognized } from "@angular/router";
import { Observable, Observer, Subscription, fromEvent, merge } from 'rxjs';
import { map, filter, pairwise } from 'rxjs/operators';
import { LogoutserviceService } from './services/logoutservice.service';
import { environment } from 'src/environments/environment';
// import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { GlobalConstants } from './common/global-constants';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { LogService } from './services/log.service';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { NetworkInterface } from '@awesome-cordova-plugins/network-interface/ngx'
import { SpeedTestService } from 'ng-speed-test';
import { Token } from '@angular/compiler';
import { SpeedCheckService } from './services/speed-check.service';
import { Appsflyer,AppsflyerOptions } from '@awesome-cordova-plugins/appsflyer/ngx';
declare var cordova: any;
declare var MoECordova: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  backButtonSubscription: Subscription;
  fcmtkn: any;
  headerflag: boolean = false
  footerflag: boolean = false
  alertcheckFlag = false
  pagename: any;
  index1
  temp
  animated: boolean;
  Today: string;
  alert: any;
  isOnlineFlag = false;
  previousUrl: string;
  goToUrl: string;
  currentUrl: string;
  bioflag = false;
  pauseFlag = false;
  currentVersion: string = environment.currentVersion;
  versionData: any;
  // isModalOpen1: boolean = false;
  type = "";
  type1 = '';
  version_no: string;
  isFingerprintEnabled: boolean = false;
  VersionFlag: boolean = false
  uid = localStorage.getItem("uid");
  // private localNotifications: LocalNotifications,
  constructor(private speedCheckService: SpeedCheckService,private speedTestService: SpeedTestService,private appsFlyer: Appsflyer, private networkInterface: NetworkInterface, private device: Device, private logoutservice: LogoutserviceService, private popoverCtrl: PopoverController, private modalCtrl: ModalController, private navCtrl: NavController, private network: Network, private router: Router, private firebaseMessaging: FirebaseX, private apisService: APIsService, private _location: Location, private platform: Platform, public alertController: AlertController, private faio: FingerprintAIO, public datepipe: DatePipe, private androidPermissions: AndroidPermissions, private inAppBrowser: InAppBrowser, private loggerservice: LogService) {
    this.loggerservice.onClickDownloadPdf("file created successfully ", this.isOnlineFlag);
   // localStorage.clear();
   this.initializeApp();
    /* if (localStorage.getItem("setAppStatusInstall") == null) {
       localStorage.setItem("setAppStatusInstall", "true");
       // var moe = new MoECordova.init("Y9114ZCMAWIAS7A08IV94UNJ");
       // moe.setAppStatus("INSTALL");
     }*/
    document.addEventListener('deviceready', this.onDeviceReady.bind(this));
    document.addEventListener('pause', this.onPause.bind(this));
    document.addEventListener('resume', this.onResume.bind(this));
    
  }

  ngOnInit() {
    var cssMode = localStorage.getItem("cssMode") || '0';
    switch (cssMode) {
      case '0':
        document.body.setAttribute('color-theme', 'light');
        break;
      case '1':
        document.body.setAttribute('color-theme', 'dark');
        break;
    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('this.platform', this.platform);
      if (this.platform.is('ios')) {
        const routerOutlet = document.querySelector('ion-router-outlet');
        console.log('routerOutlet', routerOutlet);
        if (routerOutlet) {
          console.log('in iff');
          routerOutlet.setAttribute('swipe-back', 'true');
        }
      }
    });
  }

  createOnline() {
    return merge(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }


  onOnline(event) {
  }

  async onPause(event) {
    console.log("onPause");
    var now = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

    await this.loggerservice.onClickDownloadPdf("onPause", now);
    // if (!this.bioflag) {
    GlobalConstants.pauseResumeFlag = false;
    // this.WebsocketService.close();
    // this.pauseFlag = true;
    console.log("onPause close");
    // }
  }

  async onResume(event) {
    GlobalConstants.pauseResumeFlag = true;
    console.log("onResume");
    var now = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

    await this.loggerservice.onClickDownloadPdf("onResume" + environment.displayVersion, now);

    this.networkInterface.getWiFiIPAddress()
      .then((data: any) => {
        this.loggerservice.onClickDownloadPdf("onResume Device IP", data.ip);
      })
      .catch(err => console.error(`Unable to get IP: ${err}`));

    this.networkInterface.getCarrierIPAddress()
      .then(address => {
        this.loggerservice.onClickDownloadPdf("onResume Carrier Device IP", address.ip);
        //   this.loggerservice.onClickDownloadPdf("onResume Carrier Subnet", address.subnet);
      })
      .catch(error => console.error(`Unable to get IP: ${error}`));

    // if (this.pauseFlag) {
    // this.pauseFlag = false;
    // if (this.WebsocketService.checkConnection()) {
    //   console.log("onResume checkConnection");
    //   // await this.WebsocketService.close();
    //   // setTimeout(async () => {
    //   //   await this.WebsocketService.connect();
    //   // },500)
    //   this.WebsocketService.connectWithCredential();
    // } else {
    //   this.WebsocketService.connect();
    // }
    //  this.apisService.notificationRedirect();
    console.log("onResume connect");
    // }

  }


  onDeviceReady(event) {
    this.isFingerprintEnabled = true;
    if (this.platform.is('android')) {
      const androidVersion = parseFloat(this.device.version);
      this.isFingerprintEnabled = (androidVersion > 9) ? true : false;
    }
    this.loggerservice.onClickDownloadPdf("onDeviceReady " + this.device.version, new Date());
    console.log("connection type ", this.network.type)

    this.createOnline().subscribe({
      next: async isOnline => {
        if (isOnline && this.isOnlineFlag) {
          this.loggerservice.onClickDownloadPdf("Internet Resume", new Date());
          this.isOnlineFlag = false;
          // if (this.WebsocketService.checkConnection()) {
          //   this.WebsocketService.connectWithCredential();
          // } else {
          //   this.WebsocketService.connect();
          // }
          // this.alertController.dismiss().catch(() => { });
          await this.speedCheckService.dismissNoInternetAlert();
        } else if (this.isOnlineFlag == isOnline) {
          this.loggerservice.onClickDownloadPdf("Internet Down", new Date());
          // this.WebsocketService.close();
          // this.alertController.create({
          //   // header: 'No Internet!',
          //   cssClass: 'custom-alert',
          //   message: `<img src="./assets/images/no-internet.svg" class="wifiImg" width="75">
          //   The content could not be loaded. Please check your internet connection.`,
          //   buttons: [
          //     // will try later
          //     // {
          //     //   text: 'Retry',
          //     //   handler: () => {
          //     //     this.WebsocketService.connect();
          //     //   }
          //     // }
          //   ],
          //   backdropDismiss: false,
          // })
          //   .then(alert => {
          //     alert.present();
          //   });
          this.isOnlineFlag = true;
          await this.speedCheckService.showNoInternetAlert();
        }
      }
    });

    const landingPage = localStorage.getItem('landing-page');
    if (localStorage.getItem('jwt_token') != null) {
      // if (this.WebsocketService.checkConnection()) {
      //   this.WebsocketService.connectWithCredential();
      // } else {
      //   this.WebsocketService.connect();
      // } 
      this.showFingerprintAuthDlg();
    } else if (landingPage == 'true' || landingPage == 'null') {
      this.router.navigateByUrl('/login');
    }
    var moe = MoECordova.init("Y9114ZCMAWIAS7A08IV94UNJ");

    if (localStorage.getItem('uid')) {
      //moe.setUniqueId(this.uid);
      moe.setUniqueId(localStorage.getItem('uid'));

    }
    

    if (this.platform.is('android')) {
      
      moe.on('onInAppShown', (inAppInfo)=> {
        console.log('InApp Shown with Info: ' + JSON.stringify(inAppInfo));
      });

      moe.on('onInAppClick', (inAppInfo)=> {
          console.log('InApp Shown Clicked with Info: ' + JSON.stringify(inAppInfo));
      });
      moe.showInApp();
    
      // moe.setCurrentContext(["watchlist","dashboard","orderbook","referandearn","funds","portfolio"]);
     
    }else{
      moe.sharedInstance.showInApp();
      // moe.sharedInstance.setCurrentInAppContexts(["watchlist","dashboard"])
    }

    this.firebaseMessaging.grantPermission().then(function (hasPermission) {
      console.log(
        "Permission to send critical push notifications is " +
        (hasPermission ? "granted" : "denied")
      );
    });
    this.firebaseMessaging.hasPermission().then(function () {
      console.log("Push messaging is allowed");
      let moe = new MoECordova.init("Y9114ZCMAWIAS7A08IV94UNJ");
      if (this.platform.is('android')) {
        moe.pushPermissionResponseAndroid(true);
      }
    });

    this.firebaseMessaging.getToken().then((token) => {
      localStorage.setItem('push_noti_token', token);
      this.firebaseMessaging.subscribe('TC');
      this.firebaseMessaging.subscribe('RC');
      this.firebaseMessaging.subscribe('MSG');
      if (this.platform.is('android')) {
        let moe = new MoECordova.init("Y9114ZCMAWIAS7A08IV94UNJ");
        moe.passFcmToken(token);
        moe.setupNotificationChannelsAndroid();
      } else {
        var moe = MoECordova.init("Y9114ZCMAWIAS7A08IV94UNJ");
        moe.registerForPushNotification(token);
      }
    });

    /*
     * used below code for the GTM(Google tag manager with firebasex)
    */
    // this.firebaseMessaging.logEvent('app_start', { foo: 'bar' });
    // this.firebaseMessaging.setAnalyticsCollectionEnabled(true);

    this.firebaseMessaging.onTokenRefresh().subscribe(() => {
      this.firebaseMessaging.getToken().then((token) => {
        localStorage.setItem('push_noti_token', token);
        let moe = new MoECordova.init("Y9114ZCMAWIAS7A08IV94UNJ");
        if (this.platform.is('android')) {
          // let moe = new MoECordova.init("Y9114ZCMAWIAS7A08IV94UNJ");
          moe.passFcmToken(token);
        } else {
          // var moe = MoECordova.init("Y9114ZCMAWIAS7A08IV94UNJ");
          moe.registerForPushNotification(token);
        }
      });
    });

    this.firebaseMessaging.onMessageReceived().subscribe((payload) => {
      if (this.router.url != "/settings/notifications") {
        // var count = GlobalConstants.notificationCount;
        // if (count > 0) {
        //   count++;
        // }
        // else {
        //   count = 1;
        // }
        // count++;
        GlobalConstants.notificationCount++;
        localStorage.setItem('Countincre', String(GlobalConstants.notificationCount));
        // GlobalConstants.notificationCount = count;
        // this.apisService.setNotificationCount(GlobalConstants.notificationCount);
      }
      localStorage.setItem('push_noti_msg', JSON.stringify(payload));
      if (payload.push_from === 'moengage') {
        let moe = new MoECordova.init("Y9114ZCMAWIAS7A08IV94UNJ");
        if (this.platform.is('android')) {
          // let moe = new MoECordova.init("Y9114ZCMAWIAS7A08IV94UNJ");
          moe.passFcmPayload(payload);
        } else {
          // let moe = new MoECordova.init("Y9114ZCMAWIAS7A08IV94UNJ");
          moe.on('onPushTokenGenerated', (payloadInfo) => {
            console.log('Push token generated: ' + JSON.stringify(payloadInfo));
          });
        }
      } else {
        if (payload.tap) {
          this.router.navigateByUrl('/settings/notifications');
        }
      }
    });

  }

  async showExitConfirm() {
    if (!this.alertcheckFlag) {
      this.alertcheckFlag = true;
      this.alert = await this.alertController.create({
        header: 'App termination',
        cssClass: 'showExit',
        message: 'Do you want to close the app?',
        buttons: [{
          text: 'Stay',
          role: 'cancel',
          handler: () => {
            this.alertcheckFlag = false;
          }
        }, {
          text: 'Exit',
          handler: () => {
            if (this.platform.is('android')) {
              navigator['app'].exitApp();
            } else {
              cordova.plugins.exit();
            }
          }
        }]
      });
      this.alert.present();
    }
  }

  showFingerprintAuthDlg() {
    if (this.isFingerprintEnabled) {
      this.faio.isAvailable().then((result: any) => {
        this.bioflag = true;
        console.log('FIngerprint Found')
        this.faio.show({
          cancelButtonTitle: 'Cancel to Use Pin',
          disableBackup: false,
          title: 'Tradesmart',
          fallbackButtonTitle: 'Use Pin',
          subtitle: 'Confirm fingerprint to continue'
        }).then((result: any) => {
          console.log('Biometric Result : ', result)
          if (result == 'biometric_success') {
            this.bioflag = false;
            localStorage.setItem('biometricFlag', 'false');
          }
        }).catch((error: any) => {
          if (this.platform.is('android')) {
            navigator['app'].exitApp();
          } else {
            cordova.plugins.exit();
          }
        });
      }).catch((error: any) => {
        console.log("biometric error :", error)
      });
    }
  }

  handleSessionLogout() {
    var intervalFlag = false;
    var loginDateTime = new Date(localStorage.getItem('LoginDateTime'));

  }

  ionViewWillLeave() {
    this.backButtonSubscription.unsubscribe();
  }
}
