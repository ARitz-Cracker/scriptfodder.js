/**
 * Swift-Cardinal Object Notation
 * https://github.com/JamesxX/scon
 *
 * Copyright (c) Aritz Beobide-Cardinal, 2016 James R Swift
 * Licensed under the GNU GPLv3 license.
 */

"use strict";

var SF = {};
var SFUtil = require( "./lib/util.js" );

SFUtil.loadSubmodule( SF, "lib/conf.js" );
SFUtil.loadSubmodule( SF, "lib/http_requests.js" );
SFUtil.loadSubmodule( SF, "lib/scripts.js" );
SFUtil.loadSubmodule( SF, "lib/coupons.js" );


module.exports = SF;
