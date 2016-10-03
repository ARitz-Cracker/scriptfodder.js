/**
 * Swift Binary Tag
 * https://github.com/JamesxX/scon
 *
 * Copyright (c) 2016 James R Swift
 * Licensed under the GNU GPLv3 license.
 */

"use strict";

var SFUtil = {};

SFUtil.mergeRecursive = function (obj1, obj2) {
	
	for (var p in obj2) {
		try {
			// Property in destination object set; update its value.
			if ( obj2[p].constructor==Object ) {
				
				obj1[p] = SFUtil.mergeRecursive({}, obj2[p]);
			
			} else {
				
				obj1[p] = obj2[p];
				
			}
		
		} catch(e) {
			// Property in destination object not set; create it and set its value.
			obj1[p] = obj2[p];
		
		}
	}
	
	return obj1;
};

SFUtil.loadSubmodule = function ( sconObject, moduleName ){
	
	var submodule = require( "../" + moduleName );
	SFUtil.mergeRecursive( sconObject, submodule );
	
};

module.exports = SFUtil;
