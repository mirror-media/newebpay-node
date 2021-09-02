const crypto = require('crypto')
const querystring = require('querystring')

/** @constructor */
class NewebPay {
    /**
     * @param {string} key encrypt param provided by newebpay
     * @param {string} iv encrypt param provided by newebpay
     */
    constructor(key, iv) {
        this.key = key
        this.iv = iv
    }

    /**
     * 回傳formPost給藍新時會需要的四個參數
     * @param {Object} tradeInfo TradeInfo內含參數欄位(詳情參考doc 31頁)
     * @return {{MerchantID:string,TradeInfo:string,TradeSha:string,Version:number}} formPost需要的四個參數
     */
    getEncryptedFormPostData(tradeInfo) {
        const tradeInfoPackage = {
            RespondType: 'JSON',
            TimeStamp: Date.now(),
            Version: 1.6,
            MerchantOrderNo: this._getMerchantOrderNo(),
            ...tradeInfo,
        }

        const MerchantID = tradeInfoPackage.MerchantID
        const TradeInfo = this._encryptAES(tradeInfoPackage)
        const TradeSha = this._encryptSHA256(TradeInfo, this.key, this.iv)
        const Version = tradeInfoPackage.Version

        return {
            MerchantID,
            TradeInfo,
            TradeSha,
            Version,
        }
    }

    /**
     * 解密TradeInfo（AES），回傳內含的所有交易結果明細
     * @param {string} tradeInfoAES AES密碼
     * @return {Object} 交易結果明細

     */

    getDecryptedTradeInfo(tradeInfoAES) {
        const decryptedQueryString = this._decryptAES(tradeInfoAES)
        const decryptedTradeInfo = querystring.parse(decryptedQueryString)
        return decryptedTradeInfo
    }

    _encryptAES(tradeInfo) {
        const tradeInfoString = querystring.stringify(tradeInfo)
        const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv)
        const encrypted = cipher.update(
            this._addPadding(tradeInfoString),
            'binary',
            'hex'
        )

        return encrypted
    }

    _encryptSHA256(aes) {
        const queryString = `HashKey=${this.key}&${aes}&HashIV=${this.iv}`
        const hash = crypto
            .createHash('sha256')
            .update(queryString, 'ascii')
            .digest('hex')
        const result = hash.toUpperCase()

        return result
    }

    _decryptAES(TradeInfoAES) {
        const decrypt = crypto.createDecipheriv('aes256', this.key, this.iv)
        decrypt.setAutoPadding(false)
        const text = decrypt.update(TradeInfoAES, 'hex', 'binary')
        const plainText = text + decrypt.final('binary')
        const result = plainText.replace(/[\x00-\x20]+/g, '') // eslint-disable-line

        return result
    }

    _addPadding(string, blockSize = 32) {
        const len = string.length
        const pad = blockSize - (len % blockSize)
        const chr = String.fromCharCode(pad)
        string += chr.repeat(pad)

        return string
    }

    _getMerchantOrderNo() {
        return 'i_am_merchant_order_number'
    }
}

module.exports = NewebPay
