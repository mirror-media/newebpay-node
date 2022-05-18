// base on Newebpay MPG document (v1.1.4)

type RespondType = 'JSON' | 'String';
type LangType = 'en' | 'zh-tw' | 'jp';
type Switch = 1 | 0;
type OptionalSwitch = Switch | undefined;
type OptionalString = string | undefined;

export interface NewebPayPostData {
  MerchantID: string;
  TradeInfo: string;
  TradeSha: string;
  Version: string;
}

export interface TradeInfo {
  // 商店代號
  MerchantID: string;
  // 回傳格式
  RespondType: RespondType;
  // 時間戳記
  TimeStamp: number;
  // 串接程式版本
  Version: string;
  // 語系
  LangType?: LangType | undefined;
  // 商店訂單編號
  MerchantOrderNo: number;
  // 訂單金額
  Amt: number;
  // 商品資訊
  ItemDesc: string;
  // 交易限制秒數
  TradeLimit?: number | undefined;
  // 繳費有效期限
  ExpireDate?: OptionalString;
  // 支付完成返回商店網址
  ReturnURL?: OptionalString;
  // 支付通知網址
  NotifyURL?: OptionalString;
  // 商店取號網址
  CustomerURL?: OptionalString;
  // 返回商店網址
  ClientBackURL?: OptionalString;
  // 付款人電子信箱
  Email?: OptionalString;
  // 付款人電子信箱是否開放修改
  EmailModify?: OptionalSwitch;
  // 藍新金流會員
  LoginType: Switch;
  // 商店備註
  OrderComment?: OptionalString;
  // 信用卡一次付清啟用
  CREDIT?: OptionalSwitch;
  // Google Pay 啟用
  ANDROIDPAY?: OptionalSwitch;
  // Samsung Pay 啟用
  SAMSUNGPAY?: OptionalSwitch;
  // LINE Pay
  LINEPAY?: OptionalSwitch;
  // LINE PAY 產品圖檔連結網址
  ImageUrl?: OptionalString;
  // 信用卡分期付款啟用
  InstFlag?: OptionalString;
  // 信用卡紅利啟用
  CreditRed?: OptionalSwitch;
  // 信用卡銀聯卡啟用
  UNIONPAY?: OptionalSwitch;
  // WEBATM 啟用
  WEBATM?: OptionalSwitch;
  // ATM 轉帳啟用
  VACC?: OptionalSwitch;
  // 金融機構
  BankType?: OptionalString;
  // 超商代碼繳費啟用
  CVS?: OptionalSwitch;
  // 超商條碼繳費啟用
  BARCODE?: OptionalSwitch;
  // 玉山 Wallet
  SUNWALLET?: OptionalSwitch;
  // 台灣 Pay
  TAIWANPAY?: OptionalSwitch;
  // 物流啟用
  CVSCOM?: OptionalSwitch;
  // 簡單付電子錢包
  EZPAY?: OptionalSwitch;
  // 簡單付微信支付
  EZPWECHAT?: OptionalSwitch;
  // 簡單付支付寶
  EZPALIPAY?: OptionalSwitch;
  // 物流型態
  LgsType?: OptionalString;
}

export default class NewebPay {
  key: string;
  iv: string;
  constructor(key: string, iv: string);
  getEncryptedFormPostData(tradeInfo: TradeInfo): NewebPayPostData;
  getDecryptedTradeInfo(tradeInfoAES: string): TradeInfo;
}