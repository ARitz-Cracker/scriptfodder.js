/**
 * scriptfodder.js
 * https://github.com/ARitz-Cracker/scriptfodder.js
 *
 * Copyright (c) Aritz Beobide-Cardinal
 * Licensed under the GNU GPLv3 license.
 */

"use strict";

var SF = {};
var SFUtil = require( "./lib/util.js" );

SFUtil.loadSubmodule( SF, "lib/conf.js" );
SFUtil.loadSubmodule( SF, "lib/http_requests.js" );
SFUtil.loadSubmodule( SF, "lib/scripts.js" );
SFUtil.loadSubmodule( SF, "lib/coupons.js" );
SFUtil.loadSubmodule( SF, "lib/users.js" );

module.exports = SF;
