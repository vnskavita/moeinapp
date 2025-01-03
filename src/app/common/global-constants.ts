import { AppDataPipe } from "../services/appdata.pipe";

export class GlobalConstants {
  public static holdingltp: any = {};
  public static holdingqty: any = {};
  public static holdingavgprc: any = {};
  public static portfolioSegment: any = '';
  public static portfolioCurtVal: any = '0.00';
  public static holdingplVal: any = '0.00';
  public static TotalplValperc: any = '0.00';
  public static TotaldayplVal: any = '0.00';
  public static TotaldayplValperc: any = '0.00';
  public static previousclosingInvst: any = '0.00';
  public static positionltp: any = {};
  public static chartwebsocket = '';
  public static dkData: any = [];
  public static positionData: any = { I: {}, C: {}, M: {}, B: {}, H: {} };
  public static positionnetqty: any = { I: {}, C: {}, M: {}, B: {}, H: {} };
  public static positionavgprc: any = { I: {}, C: {}, M: {}, B: {}, H: {} };
  public static positionprcftr: any = { I: {}, C: {}, M: {}, B: {}, H: {} };
  public static positionmult: any = { I: {}, C: {}, M: {}, B: {}, H: {} };
  public static positionActualBookedPNL: any = { I: {}, C: {}, M: {}, B: {}, H: {} };
  public static unrealizedplVal: any = '0.00';
  public static channelStrpos: any;
  public static exchfilterbutton: any = [
    { id: 1, value: 'NSE', ischecked: false, passValue: 'NSE' },
    { id: 2, value: 'BSE', ischecked: false, passValue: 'BSE' },
    { id: 3, value: 'NFO', ischecked: false, passValue: 'NFO' },
    { id: 6, value: 'BFO', ischecked: false, passValue: 'BFO' },
    { id: 4, value: 'CDS', ischecked: false, passValue: 'CDS' },
    { id: 5, value: 'MCX', ischecked: false, passValue: 'MCX' },
    { id: 7, value: 'BCD', ischecked: false, passValue: 'BCD' },
  ]
  public static sortMethod = '';
  public static sortingBy: any = 'ASC';
  public static invested_hold: any = '0.00';
  public static positionwebsocket = '';
  public static holdingwebsocket = '';
  public static positionbuttomwebsocket = '';
  public static holdingbuttomwebsocket = '';
  public static orderbookbuttomwebsocket = '';
  public static watchlistwebsocket = '';
  public static watchlistCngWebsocket: any = {};
  public static CngWebsocket: any = {};
  public static watchlistunsubscribewebsocket = '';
  public static optionchainwebsocket = '';
  public static pricealertmodifydata: any = {};
  public static placeorderdataglobal: any;
  public static basketPlaceorderdataglobal: any;
  public static chartDataGlobal: any;
  public static confirmdataglobal: any;
  public static orderModifyFlagglobal: any = false;
  public static orderRepeatFlagglobal: any = false;
  public static positionAddmoreFlagglobal: any = false;
  public static IcebergModifyFlag: any = false;
  public static IcebergRepeatFlag: any = false;
  public static holdingAddmoreFlagglobal: any = false;
  public static gttModifyFlag: boolean = false;
  public static bottomsheetdata: any = [];
  public static optionChainData: any = [];
  public static analysisData: any = [];
  public static ltpvalue: any;
  public static orderfilterbutton: any = [
    { id: 1, value: 'OPEN', ischecked: false, passValue: 'OPEN' },
    { id: 2, value: 'CANCELED', ischecked: false, passValue: 'CANCELED' },
    { id: 3, value: 'REJECTED', ischecked: false, passValue: 'REJECTED' },
    { id: 4, value: 'COMPLETE', ischecked: false, passValue: 'COMPLETE' }
  ]
  public static gttfilterbutton: any = [
    { id: 1, value: 'BUY', ischecked: false, passValue: 'B' },
    { id: 2, value: 'SELL', ischecked: false, passValue: 'S' },
    { id: 3, value: 'SINGLE', ischecked: false, passValue: 'LTP_A_O' },
    { id: 4, value: 'OCO', ischecked: false, passValue: 'LMT_BOS_O' },
    // { id: 5, value: 'ACTIVE', ischecked: false, passValue: 'ACTIVE' }
  ]
  public static holdQtyFlag: boolean = false;
  public static nexturl = '';
  public static animationFlag: boolean = false;
  public static placeanorderTokens: any = []
  public static indiceswebsocket = new AppDataPipe().transform('indiceswebsocket');
  // public static mainwebsocketchannel = '';
  public static indiceswebsocketChannel = '';
  public static commonwebsocket = '';
  public static holdingclosingprice: any = {};
  public static watchlistLTPWebsocket: any = {};
  public static bottomsheetwebsocket = '';
  public static indicesFlag: boolean = false;
  public static setTime = 100;
  public static indicesBackFlag: boolean = false;
  public static optionChainChartFlag: boolean = false;
  public static AddScriptFlag: boolean = false;
  public static analyticsTab_option: any
  public static websocketPosition: any;
  public static websocketHolding: any;
  public static HoldingData: any = [];
  public static PositionDataGlobal: any = [];
  public static HoldingDataCopy_Store: any = [];
  public static PositionDataCopy_Store: any = [];
  public static securityInfoData: any = {};
  public static moversIndicesList: any;
  public static basketdetailsData: any;
  public static IcebergDataCopy_Store: any = [];
  public static triggerDataCopyStore: any = [];
  public static activeDataCopyStore: any = [];
  public static gttCreateModifyFlag: boolean = false;
  public static basketCreateModifyFlag: boolean = false;
  public static notificationCount: number = 0;
  public static gttRepeatFlag: boolean = false;
  public static OptionChainList: any = [];
  public static dashboardHolding: boolean = false;
  public static dashboardPosition: boolean = false;
  public static technicalFuture: boolean = false;
  public static optionChainBottomSheet: boolean = false;
  public static CommonWebSocketData: any = {};
  public static InternetBackFlag: boolean = false;
  public static orderMarginData: any;
  public static topTradedType: string = '';
  public static pauseResumeFlag: boolean = true;
  public static kraStatus: boolean = false;
  public static websocketStatusFlag: boolean = false;
  public static technicalAPIFlag: boolean = false;
  public static alertDisplayFlag: boolean = false;
  public static loaderVisibleFlag: boolean = false;
  public static previousUrl: any;
  public static addOptionScript: any;
  public static resetCalculatorFlag: boolean = true;
  public static marginCalculatorData: any = [];
  public static requestArr: any = [];
  public static spanMarginData: any;
  public static marginCalculatorFlag: boolean = false;
}