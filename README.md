# newebpay-node
newebpay-node is a encrypt/decrypt handler for dealing with newabpay.

## Installation

To get up and running with newebpay-node, run the following commands.

```
yarn add @mirror-media/newebpay-node
```

## Usage

#### Prepare
First, you need to import a constructor from @mirror-media/newebpay-node
```
import NewebPay from '@mirrormedia/newebpay-node'
```

The next step is to define two variables: `key` and `iv`, the following key/iv is just for testing(provide by doc)
```
const key = '12345678901234567890123456789012'
const iv = '1234567890123456
```

>`key` and `iv` are encrypt params provide by newebpay, ***each store has different value***, please get the correct key/iv corresponding to the store from the person in change.

Next step is to create an instance via `NewebPay` constructor with `key` and `iv`
```
const newebpay = new NewebPay(key, iv)
```

#### Encrypt Payload
To encrypt data, please create an object which contains specific params, then use `newebpay.getEncryptedFormPostData()` to encrypt it
```
const tradeInfo = {
        MerchantID: 'MS315799494',
        Amt: 40, // 訂單金額
        ItemDesc: '年訂閱方案', // 商品名稱
}

const formPost = newebpay.getEncryptedFormPostData(tradeInfo)

console.log(formPost)
// {
//	MerchantID: "MS315799494"
// 	TradeInfo: "95661467e49880517e5fe6e369d58918c262e8222093c8e9dba02c48c7de756dc2f5a40258573d0b808c37d8677d727c030fd2b2deb0eb86733e44c1dfc7d54413c0e6261f6a8fcd3052d2c8f241ed5ff95eefcb967f6259135919a2c58981cec7d020eb2c1bb860cf3b947cbbb9f678db4fba3d6c7f95445f26792e80c1d686088753c58a93feac5f10e6bf856964fd63cc1d0730c45d71b8c059b27d7907c03edd595ec45babb0bda4b0047f4838ec55e6f1595cec4b7e407177fbf15b05ff"
// 	TradeSha: "ACBD24BFC880E0678E8280EDA00696DE8714C96EDD99D4001EF06BFFA007AB34"
// 	Version: 1.6
// }

```
Finally use those params to fire form-post request.

#### Decrypt Response Data
After payment is finished, newebpay may returns an object just like this: 
```
const responseData = {
	Status: 'SUCCESS',
	MerchantID: 3430112,
	TradeInfo:
          'ff91c8aa01379e4de621a44e5f11f72e4d25bdb1a18242db6cef9ef07d80b0165e476fd1d9acaa53170272c82d122961e1a0700a7427cfa1cf90db7f6d6593bbc93102a4d4b9b66d9974c13c31a7ab4bba1d4e0790f0cbbbd7ad64c6d3c8012a601ceaa808bff70f94a8efa5a4f984b9d41304ffd879612177c622f75f4214fa',
	TradeSha:
          'B9B4294598267A698E6094EECF5584FCEEEC6117C475592A7248851F0C710635',
}
```

If we want to know trade infomation, just decrypt `TradeInfo` by `newebpay.getDecryptedTradeInfo()`
```
const result = newebpay.getDecryptedTradeInfo(responseData.TradeInfo)

console.log(result)
// {
// Amt: "40"
// ItemDesc: "UnitTest"
// MerchantID: "3430112"
// MerchantOrderNo: "S_1485232229"
// RespondType: "JSON"
// TimeStamp: "1485232229"
// Version: "1.4"
// }
```

## API
### newebpay.getEncryptedFormPostData([tradeInfo])

tradeInfo:
- MerchantID(string)(**Required**) web store ID (please get correct value from thie person in change)
- Amt(number)(**Required**) merchantise price
- ItemDesc(string)(**Required**) merchantise detail displays in payment page

Return an object contains form-post-needed data

### newebpay.getDecryptedTradeInfo([string])

Decrypt AES string into trade info object




