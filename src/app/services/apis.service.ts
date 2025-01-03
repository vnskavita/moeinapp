import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Observable, of } from "rxjs";
import { catchError, timeout } from 'rxjs/operators';
import { environment } from "src/environments/environment";
// import { FirebaseAnalytics } from '@awesome-cordova-plugins/firebase-analytics/ngx';
import data from 'src/assets/datalayer.json';
import { Router } from "@angular/router";

declare var MoECordova: any;
@Injectable({
  providedIn: 'root'
})
export class APIsService {
  moe: any;
  gtag: any;
  subject1 = new Subject<any>();
  subject2 = new Subject<any>();
  subject3 = new Subject<any>();
  private timeoutDuration = 5000;

  constructor(private http: HttpClient, private router: Router/*private firebaseAnalytics: FirebaseAnalytics*/) {
    const jsonData = this.getData();
    this.gtag = jsonData;
  }

  getData() {
    return data;
  }

  private requestWithTimeout<T>(request: Observable<T>): Observable<T> {
    return request.pipe(
      timeout(this.timeoutDuration), // Set timeout for the request
      catchError(err => {
        console.error('Error or timeout occurred:', err);
        return of(null); // Return null or handle as needed
      })
    );
  }

  /** *Login user in MoEngage  */
  loginUserMoEngage(uid: any) {
    if (environment.production) {
      var moe = new MoECordova.init("Y9114ZCMAWIAS7A08IV94UNJ");
      moe.setUniqueId(uid);
    }
  }

  trackEvent(urlName: any, generalAttribute: any) {
    if (environment.production) {
      var currentTime = new Date();
      var moe = new MoECordova.init("Y9114ZCMAWIAS7A08IV94UNJ");
      if (urlName == 'Login Successful') {
        moe.setUniqueId(generalAttribute.ClientID);
      }
      moe.trackEvent(urlName, generalAttribute, true);
    }
  }

  logoutFromMoEngage() {
    if (environment.production) {
      var moe = new MoECordova.init("Y9114ZCMAWIAS7A08IV94UNJ");
      moe.logout();
    }
  }

  pushNotification() {
    if (environment.production) {
      let moe = new MoECordova.init("Y9114ZCMAWIAS7A08IV94UNJ");
      moe.passFcmToken();
      moe.passFcmPayload();
    }
  }

}