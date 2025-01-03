import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { GoogleTagManagerModule } from 'angular-google-tag-manager';  //google tag manager package remove(firebasex use in future)
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { ImageCompressService, ResizeOptions } from 'ng2-image-compress';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';
/*components*/
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './services/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { WebsocketService } from "./services/websocket.service";
// import { NgOtpInputModule } from 'ng-otp-input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { LogoutserviceService } from './services/logoutservice.service';
// import { FirebaseMessaging } from '@awesome-cordova-plugins/firebase-messaging/ngx';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { DatePipe } from '@angular/common';
import { AppDataPipe } from './services/appdata.pipe';
//import { EkycPageModule } from './ekyc/ekyc.module';
import { pageTransition } from './page-transitions';
// import { FirebaseAnalytics } from '@awesome-cordova-plugins/firebase-analytics/ngx';
import { NumberCheckerPipe } from './services/numberchecker.pipe';
// import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
//import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
//import { Geolocation } from '@ionic-native/geolocation';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import {File } from '@awesome-cordova-plugins/file/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { LogService } from './services/log.service';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
import { SpeedTestModule } from 'ng-speed-test';
import {NetworkInterface}  from '@awesome-cordova-plugins/network-interface/ngx'
import { SpeedCheckService } from './services/speed-check.service';
import { InAppReview } from '@awesome-cordova-plugins/in-app-review/ngx';
import { LaunchReview } from '@awesome-cordova-plugins/launch-review/ngx';
import { Appsflyer } from '@awesome-cordova-plugins/appsflyer/ngx'
@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    // FooterComponent,
   //Geolocation
   // Camera,
  ],
  imports: [
    NgbModule,
    AngularSignaturePadModule,
    //EkycPageModule,
    // NgOtpInputModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // PlaceAnOrderPageModule,
    IonicModule.forRoot({ navAnimation: pageTransition, innerHTMLTemplatesEnabled: true}),
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    /* google tag manager package remove(firebasex use in future) */
    // GoogleTagManagerModule.forRoot({
    //   id: 'GTM-KTW694',
    // }),  
    AppRoutingModule,
    NgbModule,
    SpeedTestModule
  ],
  providers: [
    // WebsocketReciverService, 
    Geolocation,
    // InAppBrowser, 
    InAppBrowser,
    File, 
    Device,
    LogService,
    InAppReview,
  //  ImageCompressService, 
   /// ResizeOptions, 
    AppDataPipe,
    Keyboard,
    LogoutserviceService,
    NumberCheckerPipe,
    ScreenOrientation,
    NetworkInterface,
    // SpeedCheckService,
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true, },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuard,FirebaseX, FingerprintAIO,DatePipe, Network,
    // FirebaseAnalytics,
    // LocalNotifications,
    AndroidPermissions,
    LaunchReview,
    Appsflyer],

  bootstrap: [AppComponent],
})
export class AppModule { }
