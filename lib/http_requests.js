/**
 * scriptfodder.js
 * https://github.com/ARitz-Cracker/scriptfodder.js
 *
 * Copyright (c) Aritz Beobide-Cardinal
 * Licensed under the GNU GPLv3 license.
 */
 
"use strict";
const https = require("https")
const assert = require("assert");

var options = {
	hostname: 'scriptfodder.com',
	port: 443,
	path: "/",
	method: "POST", //They even cache their API get requests >_>
	headers: {
		'User-Agent' : "NodeJS/"+process.version.substr(1)+" (scriptfodder.js/1.0; +http://www.aritzcracker.ca/contact)"
	}
};
var SF = {};

SF.HTTPGet = function(path,callback){
	var data = ""
	options.path = path
	//options.method = "GET"
	var req = https.request(options, (res) => {
		res.setEncoding('utf8');
		res.on('data', (chunk) => {
			data += chunk
		});
		res.on('end', () => {
			callback(null,res.statusCode,res.headers,data)
		})
	});
	req.on('error', (e) => {
		callback(e);
	});
	req.end();
}

SF.HTTPPost = function(path,postdata,filename,callback){
	var data = ""
	options.path = path
	//options.method = "POST"
	var req = https.request(options, (res) => {
		res.setEncoding('utf8');
		res.on('data', (chunk) => {
			data += chunk
		});
		res.on('end', () => {
			callback(null,res.statusCode,res.headers,data)
		})
	});
	req.on('error', (e) => {
		callback(e);
	});
	var body = ""
	if (filename){
		var boundaryKey = (Math.floor(Math.random()*Number.MAX_SAFE_INTEGER)).toString(36) // random string
		//Loop through postdata here
		for (var k in postdata){
			body += '--' + boundaryKey + '\r\n'
			+ 'content-disposition: form-data; name="'+k+'"\r\n\r\n' // I know some escaping/validation needs to be done, but for the purposes of this program where there is no "user input", it is not needed.
			+ postdata[k] + '\r\n' //This I am not 100% sure of
		}

		
		body += '--' + boundaryKey + '\r\n'
		+ 'Content-Type: application/octet-stream\r\n' 
		+ 'Content-Disposition: form-data; name="file"; filename="scrap_fudder.zip"\r\n'
		+ 'Content-Transfer-Encoding: binary\r\n\r\n';
		var endKey = '\r\n--' + boundaryKey + '--\r\n';
		fs.stat(filename, function(err,stuffs){
			if (err) {throw err};
			req.setHeader('Content-Type', 'multipart/form-data; boundary="'+boundaryKey+'"');
			req.setHeader('Content-Length', Buffer.byteLength(endKey) + Buffer.byteLength(body) + stuffs.size);
			req.write(body,"binary");
			var str = fs.createReadStream(filename, { bufferSize: 4 * 1024 })
			// set "end" to false in the options so .end() isnt called on the request
			str.pipe(req, { end: false }) // maybe write directly to the socket here?
			str.on('end', function() {
				req.write(endKey,"binary")
				req.end(); 
			});	
		})
	}else{
		body = querystring.stringify(postdata);
		req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
		req.setHeader('Content-Length', Buffer.byteLength(body) );
		req.write(body)
		req.end()
	}
}

module.exports = SF;
