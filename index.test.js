const NewebPay = require('./index.js')

const key = '12345678901234567890123456789012'
const iv = '1234567890123456'

const MerchantID = '114514'
const sampleTradeInfo = {
  MerchantID,
  RespondType: 'JSON',
  TimeStamp: '114514',
  MerchantOrderNo: '1145141919',
  Amt: 100,
  ItemDesc: 'test',
  LoginType: 0,
  LINEPAY: 1,
  Version: '2.0',
  Email: 'powei.chen@mirrormedia.mg'
}

const encryptedTradeInfo = '95661467e49880517e5fe6e369d58918125a5d9c1a2c530ddc5cbc249a9cc3ecae0ff0f4480279812b739f7aad9a441caa2188af95e470be67d513a1545b00b1e46560bb408f378f4e795beff99ea9cd44590c3eed90d638b2fc8339e8a749731b304d3fe17b18bd9c1f43f2958bcb39e83d36b5e45b676bb019c8c4cb0cae9d0233cebc60c98196df8282bca0d4597426723d7e96e2fd49976c5292c87d225089c48905e225adc784ebc7e79febaf040966aec4350730e0267369078a428fd0'
const encryptedTradeSha = 'BAC192CA4FC4A61C825F0331A133B9788E7C96AA6BF0A74066B10D3128A4C0DF'

const sampleEncryptedInfo = {
  MerchantID,
  TradeInfo: encryptedTradeInfo,
  TradeSha: encryptedTradeSha,
  Version: '2.0'
}

function getRandomInteger(min = 0, max = 1000000) {
  if (min < 0) min = 0
  if (max <= min) max = min + 1

  return Math.floor(Math.random() * (max - min)) + min
}

describe('NewebPay', () => {
  describe('constructor', () => {
    test('arguments with key and iv', () => {
      const newebPay = new NewebPay(key, iv)

      expect(newebPay.key).toBe(key)
      expect(newebPay.iv).toBe(iv)
    })
  })

  describe('methods', () => {
    const newebPay = new NewebPay(key, iv)

    describe('getEncryptedFormPostData', () => {
      test('method is defined', () => {
        expect(typeof newebPay.getEncryptedFormPostData).toBe('function')
      })

      test('return value with sample trade info', () => {
        const result = newebPay.getEncryptedFormPostData(sampleTradeInfo)

        expect(typeof result).toBe('object')

        expect(result).toHaveProperty('MerchantID')
        expect(result).toHaveProperty('MerchantID', MerchantID)

        expect(result).toHaveProperty('TradeInfo')
        expect(result).toHaveProperty('TradeInfo', encryptedTradeInfo)

        expect(result).toHaveProperty('TradeSha')
        expect(result).toHaveProperty('TradeSha', encryptedTradeSha)

        expect(result).toHaveProperty('Version')
        expect(result).toHaveProperty('Version', '2.0')

        expect(result).toMatchObject(sampleEncryptedInfo)
      })
    })

    describe('getDecryptedTradeInfo', () => {
      test('method is defined', () => {
        expect(typeof newebPay.getDecryptedTradeInfo).toBe('function')
      })

      test('return value with sample encrypted trade info', () => {
        const result = newebPay.getDecryptedTradeInfo(encryptedTradeInfo)

        expect(typeof result).toBe('object')
        expect(result).toMatchObject(sampleTradeInfo)
      })
    })
  })

  describe('integration test', () => {
    const newebPay = new NewebPay(key, iv)

    test('call getEncryptedFormPostData first, then call getDecryptedTradeInfo should return original object', () => {
      const testTradeInfo = {
        MerchantID: getRandomInteger().toString(),
        RespondType: 'JSON',
        TimeStamp: new Date().valueOf().toString(),
        MerchantOrderNo: getRandomInteger(0, 1000000000).toString(),
        Amt: getRandomInteger(0, 1000),
        ItemDesc: 'test',
        LoginType: 0,
        LINEPAY: 1,
        Version: '2.0',
        Email: 'powei.chen@mirrormedia.mg'
      }

      const encryptedData = newebPay.getEncryptedFormPostData(testTradeInfo)
      const decryptedData = newebPay.getDecryptedTradeInfo(encryptedData.TradeInfo)

      expect(decryptedData).toMatchObject(testTradeInfo)
    })
  })
})