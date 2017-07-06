# scriptfodder.js
A NodeJS implimentation of the ScriptFodder API
I know ScriptFodder changed its name to GmodStore, but I'm still calling this `scriptfodder.js` because the _actual_ GmodStore update isn't out yet.
## Do this first!
1. Install with ```npm install scriptfodder.js```
2. Navigate to lib/conf.js
3. Replace the example ScriptFodder API Key with your own
4. Use this thing with ```const SF = require("scriptfodder.js")```

## What can this thing do?
Most of the things the ScriptFodder API has to offer. If the callbacks have a data argument, they will either be an object or array depending on what function you're using.
### NOTE:
These functions currently throw syncronous errors if any arguments are invalid.
### Script Functions!
* ```SF.ScriptListSelf(callback(error,data))``` - Lists all the scripts from whoever's API key you're using
```
[
  {
    'id': '21',
    'status': '1',
    'name': 'VCMod',
    'views': '1390',
    'banner': 'bannerhash',
    'primary_owner': {
              'steamid': '76561190000000',
              'name": '',
      'avatar': ''
    },
    'is_primary_owner': '1'
  },
  ...
]
```
* ```SF.ScriptList(Steam64ID,callback(error,data))``` - Lists publically available scripts
```
[
  {
    'id': '21',
    'status': '1',
    'name': 'VCMod',
    'views': '1390',
    'banner': 'bannerhash',
    'primary_owner': {
              'steamid': '76561190000000',
              'name": '',
      'avatar': ''
    },
    'is_primary_owner': '1'
  },
  ...
]
```
* ```SF.ScriptInfo(ScriptID,callback(error,data))``` - Lists publically available scripts
```
{
  'id': 21,
  'name': 'VCMod',
  'description': '',
  'addedDate': '',
  'updatedDate': '',
  'price': '',
  'price_discount': '',
  'status': '',
  'views': '',
  'banner': '',
  'author_steam64': '',
  'author_name': '',
  'author_avatar': '',
  'additional_authors': [
    {
      'steam64': '',
      'name': '',
      'avatar': ''
    }
  ],
  'support_team': [
    {
      'steam64': '',
      'name': '',
      'avatar': ''
    }
  ]
}
```
* ```SF.ScriptPurchases(ScriptID,callback(error,data))``` - Lists everyone who bought a script
```
[
  {
    "user_id": "7656119xxxxxxxx",
    "user_name": "Marcuz",
    "purchase_time": "000000000",
    "purchase_revoked": "0",
    "transaction_id": "ABC",
    "price": "0"
  }
]
```
* ```SF.ScriptReviews(ScriptID,callback(error,data))``` - Lists all the reviews a script has gotten
```
[
  {
    "user_id": "7656119xxxxxxxx",
    "user_name": "Marcuz",
    "purchase_time": "000000000",
    "purchase_revoked": "0",
    "transaction_id": "ABC",
    "price": "0"
  }
]
```
* ```SF.ScriptVersions(ScriptID,callback(error,data))``` - Lists all the different versions a script has
```
[
  {
    'id': 1,
    'title': '1.0.0',
    'description': 'version changes',
    'time': '1451620852'
  }
]
```
* ```SF.ScriptAddVersion(ScriptID,Version,zipFileName,ChangeLog,callback(error))``` - Uploads a new .zip file and adds a new version
* ```SF.ScriptEditVersion(ScriptID,VersionID,Version,zipFileName,ChangeLog,callback(error))``` - Edits the specified version. (VersionID is from the ```SF.ScriptVersions``` function) ```zipFileName``` can be null if you do not want to change the file.
* ```SF.ScriptDeleteVersion(ScriptID,VersionID,callback(error))``` - Deletes the specified version. (VersionID is from the ```SF.ScriptVersions``` function)
* ```SF.ScriptGift(ScriptID,Steam64ID,callback(error))``` - Gift a script to the specified user
* ```SF.ScriptRevoke(ScriptID,Steam64ID,callback(error))``` - Revokes a script from the specified user

###Coupon Functions!
* ```SF.CouponsList(ScriptID,callback(error,data))``` - Lists all the coupons a script has
```
[
  {
    'code': '',
    'percent': '',
    'max_uses': '',
    'expires_at': '1451620852',
    'amount_used': ''
  }
]
```
* ```SF.CouponAdd(ScriptID,CouponName,PercentOff,MaxUses,ExpiryDate,callback(error))``` - Creates a new coupon. ExpiryDate must be a Date object. PercentOff must be a value 1-99
* ```SF.CouponEdit(ScriptID,CouponID,CouponName,PercentOff,MaxUses,ExpiryDate,callback(error))``` - Edits an existing coupon (CouponID is from the ```SF.CouponsList``` function)
* ```SF.CouponRemove(ScriptID,CouponID,callback(error))``` - Removes a coupon (CouponID is from the ```SF.CouponsList``` function)

###User Functions!
* Coming soon-ish, maybe!
