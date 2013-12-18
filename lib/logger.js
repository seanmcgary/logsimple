var colors = require('colors');

var logLevels = [
	' info    ',
	' warn    ',
	' error   ',
	' success ',
	'         '
];

var INFO = exports.INFO = 0;
var WARN = exports.WARN = 1;
var ERROR = exports.ERROR = 2;
var SUCCESS = exports.SUCCESS = 3;
var BLANK = exports.BLANK = 4;


var serializeObject = function(obj){
	if(!obj){
		return '';
	}

	if(typeof obj === 'string'){
		return ' - ' + obj;
	} else if(typeof obj === 'object'){
		if(obj instanceof Error){
			return ' - ' + obj.toString();
		} else {
			var serialObj;

			try {
				serialObj = JSON.stringify(obj);
			} catch(e){
				serialObj = obj.toString();
			}

			return ' - ' + serialObj;
		}
	} else {
		return '';
	}
};

/*
	Format:

	{level}(date)[namespace] 		<Message>

*/
var padMessage = exports.padMessage = function(string, width, level){
	if(typeof level !== 'undefined'){
		level = logLevels[level];
	}

	string = "" + string;
	
	var d = new Date();

	var output = (level ? '[' + level + ']' : '[' + logLevels[BLANK] + ']');
	output += '(' + d.toString() + ') [';

	var total_width = width + 7;

	string = string.substring(0, width);

	output += string + ']';

	var string_len = string.length;

	var needed_length = total_width - string_len;

	for(var i = 0; i < needed_length; i++){
		output += " ";
	}

	return output;
};

var log = exports.log = function(ns, message, color, level, object){
	var msg = padMessage(ns, 20, level) + message;
	msg += serializeObject(object);

	if(color){
		console.log(msg[color]);
	} else {
		console.log(msg);	
	}
};

var error = exports.error = function(ns, message, object){
	log(ns, message, 'red', ERROR, object);
};

var info = exports.info = function(ns, message, object){
	log(ns, message, 'grey', INFO, object);
};

var warn = exports.warn = function(ns, message, object){
	log(ns, message, 'yellow', WARN, object);
};

var success = exports.success = function(ns, message, object){
	log(ns, message, 'green', SUCCESS, object);
};

var infoAlt = exports.infoAlt = function(ns, message, object){
	log(ns, message, 'cyan', INFO, object);
};

var colours = ['red', 'green', 'cyan', 'yellow', 'gray'];

for(var i = 0; i < colours.length; i++){
	var c = colours[i];
	c = (c[0].toUpperCase() + c.substr(1));
	(function(c, color){
		exports['info' + c] = function(ns, message, object){
			log(ns, message, color, BLANK, object);
		};
	})(c, colours[i]);
};


