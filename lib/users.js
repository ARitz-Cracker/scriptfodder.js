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

SF.UserSearch = function(search,callback){
	SF.HTTPGet("/api/users/search/"+search,function(err,code,head,body){
		try{
			if (err){throw err;}
			var bodydata = JSON.parse(body);
			if (bodydata.status != "success"){
				throw new Error("ScriptFodder: "+bodydata.status+": "+bodydata[bodydata.status]+" - "+bodydata.description);
			}
			callback(null,bodydata.users)
		}catch(err){
			callback(err)
		}
	})
}

SF.UserBanned = function(steamid, callback) {
	SF.HTTPGet("/api/users/banned/" + steamid, function(err, code, head, body) {
		try {
			if (err) {throw err;}
			
			var bodyData = JSON.parse(body);
			if (bodyData.status != "success") {
				throw new Error("ScriptFodder: " + bodyData.status + ": " + bodyData[bodyData.status] + " - "bodyData.description);
			}
			
			callback(null, bodyData.user)
		} catch(err) {
			callback(err)
		}
	}
}

module.exports = SF;
