import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APIsService } from '../services/apis.service';
import { GlobalConstants } from '../common/global-constants';
// import { WebsocketReciverService } from '../services/websocketrecevier.service'

@Injectable({
  providedIn: 'root'
})
export class LogoutserviceService {
  constructor(private router: Router, private apisService: APIsService) {
  }

  logout() {
    GlobalConstants.animationFlag = true;
    var uid = localStorage.getItem('uid');
    var cssMode = localStorage.getItem("cssMode");
    var themeMode = localStorage.getItem("themeMode");
    var landding = localStorage.getItem("landing-page");
    var marketProtection = localStorage.getItem('marketProtection');
    var debugMode = localStorage.getItem('debugMode');
    var loginMode = localStorage.getItem('loginWithMobileNoFlag');

    localStorage.clear();
    localStorage.setItem('uid', uid);
    localStorage.setItem('cssMode', cssMode);
    localStorage.setItem('themeMode', themeMode);
    localStorage.setItem('landing-page', landding);
    localStorage.setItem('marketProtection', marketProtection);
    localStorage.setItem('debugMode', debugMode);
    localStorage.setItem('loginWithMobileNoFlag', loginMode);

    GlobalConstants.holdingltp = {};
    GlobalConstants.holdingqty = {};
    GlobalConstants.watchlistCngWebsocket = {};
    GlobalConstants.holdingavgprc = {};
    GlobalConstants.portfolioSegment = '';
    GlobalConstants.portfolioCurtVal = '0.00';
    GlobalConstants.holdingplVal = '0.00';
    GlobalConstants.positionltp = {};
    GlobalConstants.positionData = { I: {}, C: {}, M: {}, B: {}, H: {} };
    GlobalConstants.positionnetqty = { I: {}, C: {}, M: {}, B: {}, H: {} };
    GlobalConstants.positionavgprc = { I: {}, C: {}, M: {}, B: {}, H: {} };
    GlobalConstants.positionprcftr = { I: {}, C: {}, M: {}, B: {}, H: {} };
    GlobalConstants.positionmult = { I: {}, C: {}, M: {}, B: {}, H: {} };
    GlobalConstants.positionActualBookedPNL = { I: {}, C: {}, M: {}, B: {}, H: {} };
    GlobalConstants.unrealizedplVal = '0.00';
    GlobalConstants.channelStrpos;
    GlobalConstants.sortMethod = '';
    GlobalConstants.sortingBy = 'ASC';
    GlobalConstants.invested_hold = '0.00';
    GlobalConstants.TotaldayplVal = '0.00';
    GlobalConstants.TotaldayplValperc = '0.00';
    GlobalConstants.TotalplValperc = '0.00';
    GlobalConstants.previousclosingInvst = '0.00';
    GlobalConstants.positionwebsocket = '';
    GlobalConstants.holdingwebsocket = '';
    GlobalConstants.bottomsheetwebsocket = '';
    GlobalConstants.positionbuttomwebsocket = '';
    GlobalConstants.holdingbuttomwebsocket = '';
    GlobalConstants.watchlistwebsocket = '';
    GlobalConstants.watchlistunsubscribewebsocket = '';
    GlobalConstants.optionchainwebsocket = '';
    GlobalConstants.pricealertmodifydata = {};
    GlobalConstants.placeorderdataglobal;
    GlobalConstants.confirmdataglobal;
    GlobalConstants.orderModifyFlagglobal = false;
    GlobalConstants.orderRepeatFlagglobal = false;
    GlobalConstants.IcebergModifyFlag = false;
    GlobalConstants.IcebergRepeatFlag = false;
    GlobalConstants.positionAddmoreFlagglobal = false;
    GlobalConstants.holdingAddmoreFlagglobal = false;
    GlobalConstants.bottomsheetdata = [];
    GlobalConstants.ltpvalue;
    GlobalConstants.commonwebsocket = '';
    GlobalConstants.dashboardHolding = false;
    GlobalConstants.dashboardPosition = false;
    GlobalConstants.chartDataGlobal = null;
    //this.websocketReciverService.close();
    GlobalConstants.CommonWebSocketData = {};
    GlobalConstants.InternetBackFlag = false;
    GlobalConstants.topTradedType = '';
    GlobalConstants.websocketStatusFlag = false;
    GlobalConstants.alertDisplayFlag = false;
    this.router.navigate(['/login']);
  }
}
