var colors = require('colors');

var logLevels = [
	' info    ',
	' warn    ',
	' error   ',
	' success '
];

var INFO = exports.INFO = 0;
var WARN = exports.WARN = 1;
var ERROR = exports.ERROR = 2;
var SUCCESS = exports.SUCCESS = 3;


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

	var output = (level ? '[' + level + ']' : '[       ]');
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

var log = exports.log = function(ns, message, color, level){
	var msg = padMessage(ns, 20, level) + message;

	if(color){
		console.log(msg[color]);
	} else {
		console.log(msg);	
	}
};

var error = exports.error = function(ns, message){
	log(ns, message, 'red', ERROR);
};

var info = exports.info = function(ns, message){
	log(ns, message, 'grey', INFO);
};

var warn = exports.warn = function(ns, message){
	log(ns, message, 'yellow', WARN);
};

var success = exports.success = function(ns, message){
	log(ns, message, 'green', SUCCESS);
};

var infoAlt = exports.infoAlt = function(ns, message){
	log(ns, message, 'cyan', INFO);
};



