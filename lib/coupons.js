/**
 * scriptfodder.js
 * https://github.com/ARitz-Cracker/scriptfodder.js
 *
 * Copyright (c) Aritz Beobide-Cardinal
 * Licensed under the GNU GPLv3 license.
 */
 
 "use strict";
var SF = {};
var SFUtil = require( "./util.js" );
SFUtil.loadSubmodule( SF, "lib/http_requests.js" );
SFUtil.loadSubmodule( SF, "lib/conf.js" );

SF.CouponsList = function(scriptid,callback){
	assert(!isNaN(scriptid),"scriptid is not a number")
	SF.HTTPGet("/api/scripts/coupon/list/"+scriptid+"?api_key="+SF.APIKey,function(err,code,head,body){
		try{
			if (err){throw err;}
			var bodydata = JSON.parse(body)
			if (bodydata.status != "success"){
				throw new Error("ScriptFodder: "+bodydata.status+": "+bodydata[bodydata.status])
			}
			callback(null,bodydata.coupons)
		}catch(err){
			callback(err)
		}
	})
}

SF.CouponAdd = function(scriptid,code,percentage,max_uses,t,callback){
	assert(!isNaN(scriptid),"scriptid is not a number")
	assert(!isNaN(percentage),"percentage is not a number")
	assert(!isNaN(max_uses),"max_uses is not a number")
	assert(percentage >= 1 && percentage <= 99,"percentage is not between 1 and 99")
	var expires = t.getFullYear() + "-"
	if (t.getMonth()<10){
		expires += "0"+t.getMonth() + "-"
	}else{
		expires += t.getMonth() + "-"
	}
	if (t.getDate()<10){
		expires += "0"+t.getDate()
	}else{
		expires += t.getDate()
	}
	SF.HTTPPost("/api/scripts/coupon/add/"+scriptid+"?api_key="+SF.APIKey,{code:code,percentage:percentage,max_uses:max_uses,expires:expires},null,function(err,code,head,body){
		try{
			if (err){throw err;}
			var bodydata = JSON.parse(body)
			if (bodydata.status != "success"){
				throw new Error("ScriptFodder: "+bodydata.status+": "+bodydata[bodydata.status]+" - "+bodydata.description)
			}
			callback(null)
		}catch(err){
			callback(err)
		}
	})
}

SF.CouponEdit = function(scriptid,couponid,code,percentage,max_uses,expires,callback){
	assert(!isNaN(couponid),"couponid is not a number")
	assert(!isNaN(scriptid),"scriptid is not a number")
	assert(!isNaN(percentage),"percentage is not a number")
	assert(!isNaN(max_uses),"max_uses is not a number")
	assert(percentage >= 1 && percentage <= 99,"percentage is not between 1 and 99")
	
	SF.HTTPPost("/api/scripts/coupon/edit/"+scriptid+"?api_key="+SF.APIKey,{id:couponid,code:code,percentage:percentage,max_uses:max_uses,expires:t.getFullYear()+"-"+t.getMonth()+"-"+t.getDate()},null,function(err,code,head,body){
		try{
			if (err){throw err;}
			var bodydata = JSON.parse(body)
			if (bodydata.status != "success"){
				throw new Error("ScriptFodder: "+bodydata.status+": "+bodydata[bodydata.status])
			}
			callback(null)
		}catch(err){
			callback(err)
		}
	})
}

SF.CouponRemove = function(scriptid,couponid,callback){
	assert(!isNaN(couponid),"couponid is not a number")

	SF.HTTPPost("/api/scripts/coupon/delete/"+scriptid+"?api_key="+SF.APIKey,{id:couponid},null,function(err,code,head,body){
		try{
			if (err){throw err;}
			var bodydata = JSON.parse(body)
			if (bodydata.status != "success"){
				throw new Error("ScriptFodder: "+bodydata.status+": "+bodydata[bodydata.status])
			}
			callback(null)
		}catch(err){
			callback(err)
		}
	})
}

module.exports = SF;
