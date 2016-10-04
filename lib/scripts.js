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

const assert = require("assert");

SF.ScriptListSelf = function(callback){
	SF.HTTPGet("/api/scripts/?api_key="+SF.APIKey,function(err,code,head,body){
		try{
			if (err){throw err;}
			var bodydata = JSON.parse(body)
			if (bodydata.status != "success"){
				throw new Error("ScriptFodder: "+bodydata.status+": "+bodydata[bodydata.status]+" - "+bodydata.description)
			}
			callback(null,bodydata.scripts)
		}catch(err){
			callback(err)
		}
	})
}
SF.ScriptList = function(steamid,callback){
	assert(!isNaN(steamid),"steamid is not a number")
	SF.HTTPGet("/api/scripts/?steamid="+steamid,function(err,code,head,body){
		try{
			if (err){throw err;}
			var bodydata = JSON.parse(body)
			if (bodydata.status != "success"){
				throw new Error("ScriptFodder: "+bodydata.status+": "+bodydata[bodydata.status]+" - "+bodydata.description)
			}
			callback(null,bodydata.scripts)
		}catch(err){
			callback(err)
		}
	})
}

SF.ScriptInfo = function(scriptid,callback){
	assert(!isNaN(scriptid),"scriptid is not a number")
	SF.HTTPGet("/api/scripts/info/"+scriptid,function(err,code,head,body){
		try{
			if (err){throw err;}
			var bodydata = JSON.parse(body)
			if (bodydata.status != "success"){
				throw new Error("ScriptFodder: "+bodydata.status+": "+bodydata[bodydata.status]+" - "+bodydata.description)
			}
			callback(null,bodydata.script)
		}catch(err){
			callback(err)
		}
	})
}

SF.ScriptPurchases = function(scriptid,callback){
	assert(!isNaN(scriptid),"scriptid is not a number")
	SF.HTTPGet("/api/scripts/purchases/"+scriptid+"?api_key="+SF.APIKey,function(err,code,head,body){
		try{
			if (err){throw err;}
			var bodydata = JSON.parse(body)
			if (bodydata.status != "success"){
				throw new Error("ScriptFodder: "+bodydata.status+": "+bodydata[bodydata.status]+" - "+bodydata.description)
			}
			callback(null,bodydata.purchases)
		}catch(err){
			callback(err)
		}
	})
}

SF.ScriptReviews = function(scriptid,callback){
	assert(!isNaN(scriptid),"scriptid is not a number")
	SF.HTTPGet("/api/scripts/reviews/"+scriptid,function(err,code,head,body){
		try{
			if (err){throw err;}
			var bodydata = JSON.parse(body)
			if (bodydata.status != "success"){
				throw new Error("ScriptFodder: "+bodydata.status+": "+bodydata[bodydata.status]+" - "+bodydata.description)
			}
			callback(null,bodydata.reviews)
		}catch(err){
			callback(err)
		}
	})
}

SF.ScriptVersions = function(scriptid,callback){
	assert(!isNaN(scriptid),"scriptid is not a number")
	SF.HTTPGet("/api/scripts/versions/"+scriptid,function(err,code,head,body){
		try{
			if (err){throw err;}
			var bodydata = JSON.parse(body)
			if (bodydata.status != "success"){
				throw new Error("ScriptFodder: "+bodydata.status+": "+bodydata[bodydata.status]+" - "+bodydata.description)
			}
			callback(null,bodydata.versions)
		}catch(err){
			callback(err)
		}
	})
}


SF.ScriptAddVersion = function(scriptid,version,filename,changes,callback){
	assert(!isNaN(scriptid),"scriptid is not a number")
	SF.HTTPPost("/api/scripts/version/add/"+scriptid+"?api_key="+SF.APIKey,{name:version,changes:changes},filename,function(err,code,head,body){
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

SF.ScriptEditVersion = function(scriptid,versionid,version,filename,changes,callback){
	assert(!isNaN(scriptid),"scriptid is not a number")
	assert(!isNaN(versionid),"versionid is not a number")
	SF.HTTPPost("/api/scripts/version/edit/"+scriptid+"?api_key="+SF.APIKey,{version:versionid,name:version,changes:changes},filename,function(err,code,head,body){
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

SF.ScriptDeleteVersion = function(scriptid,versionid,callback){
	assert(!isNaN(scriptid),"scriptid is not a number")
	assert(!isNaN(versionid),"versionid is not a number")
	SF.HTTPGet("/api/scripts/version/delete/"+scriptid+"?api_key="+SF.APIKey+"&version="+versionid,function(err,code,head,body){
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

SF.ScriptGift = function(scriptid,steamid,callback){
	assert(!isNaN(scriptid),"scriptid is not a number")
	assert(!isNaN(steamid),"steamid is not a number")
	SF.HTTPGet("/api/scripts/assignpurchase/"+scriptid+"?api_key="+SF.APIKey+"&steam64="+steamid,function(err,code,head,body){
		try{
			if (err){throw err;}
			var bodydata = JSON.parse(body)
			if (bodydata.status != "success"){
				
				throw new Error("ScriptFodder: "+bodydata.status+": "+bodydata[bodydata.status]+" - "+bodydata.description)
			}
			callback(null)
		}catch(err){
			console.error("Raw body: "+body)
			callback(err)
		}
	})
}

SF.ScriptUnRevoke = SF.ScriptGift;

SF.ScriptRevoke = function(scriptid,steamid,callback){
	assert(!isNaN(scriptid),"scriptid is not a number")
	assert(!isNaN(steamid),"steamid is not a number")
	SF.HTTPGet("/api/scripts/revokepurchase/"+scriptid+"?api_key="+SF.APIKey+"&steam64="+steamid,function(err,code,head,body){
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

module.exports = SF;
