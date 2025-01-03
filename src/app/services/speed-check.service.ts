import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SpeedTestService } from 'ng-speed-test';
import { GlobalConstants } from '../common/global-constants';
@Injectable({
  providedIn: 'root'
})
export class SpeedCheckService {
  private noInternetAlert: any = null;

  constructor(
    private alertController: AlertController,
    private speedTestService: SpeedTestService,
  ) {}

  // Function to show "No Internet" alert
  async showNoInternetAlert() {
    if (!this.noInternetAlert &&  !GlobalConstants.alertDisplayFlag) {
      GlobalConstants.InternetBackFlag = true;
      GlobalConstants.alertDisplayFlag = true;
      this.noInternetAlert = await this.alertController.create({
        cssClass: 'custom-alert',
        message: `
          <img src="./assets/images/no-internet.svg" class="wifiImg" width="75">
          The content could not be loaded. Please check your internet connection.`,
        buttons: [],
        backdropDismiss: false,
      });
      await this.noInternetAlert.present();
    }
  }

  // Function to dismiss "No Internet" alert
  async dismissNoInternetAlert() {
    if (this.noInternetAlert &&  GlobalConstants.alertDisplayFlag) {
      await this.noInternetAlert.dismiss();
      this.noInternetAlert = null; // Reset the alert reference
      GlobalConstants.alertDisplayFlag = false;
    }
  }

  // Function to start checking internet speed every 2 seconds
  startSpeedCheck() {
      this.speedTestService.getMbps({
          iterations: 2,
          retryDelay: 500,
      }).subscribe(async (speed) => {
        if (speed < 1) {
          //show the "No Internet" alert
          this.showNoInternetAlert();
          setTimeout(() => {
            this.startSpeedCheck();
          }, 2000);
        } else if (speed >= 1) {
          GlobalConstants.InternetBackFlag = false;
          
          this.dismissNoInternetAlert();
        }
      });
  }

}
