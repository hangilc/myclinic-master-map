"use strict";

var masterMap = {};

function ensureMap(kind){
	if( !(kind in masterMap) ){
		masterMap[kind] = [];
	}
	return masterMap[kind];
}

exports.parse = function(kind, lines){
	if( typeof lines === "string" ){
		lines = [lines];
	}
	var entry = ensureMap(kind);
	lines.forEach(function(line){
		var  m = line.match(/^(\d{9}),(\d{4}-\d{2}-\d{2}),(\d{9})(\D.*|$)/); 
		if( !m ){
			throw new Error("invalid master map data: " + line);
		}
		var idFrom = m[1];
		var at = m[2];
		var idTo = m[3];
		entry.push({
			from: m[1],
			at: m[2],
			to: m[3],
			desc: m[4]
		});
	});
};

exports.getMap = function(){
	return masterMap;
};
