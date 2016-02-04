'use strict'
var React = require('react-native');
var {
	View,
	Text
} = React;

function getPlacesWithinInterval(currentPosition, heading, maxDistanceFilter, placeList, callback) {
	//get the poi within the filter distance
	var placeWithin = [];
	var placeAngles = [];

	//calculate the angle between position and east
	for(var i=0; i<placeList.length; i++){
		var diff_lat = placeList[i].lat-currentPosition.latitude;
		var diff_lng = placeList[i].lng-currentPosition.longitude;

		var delta = Math.atan2(diff_lng, diff_lat);
		var eastAngle=0;
		if (delta>0) {
			eastAngle = 180*(Math.PI-delta)/Math.PI;
		} else {
			eastAngle = 180*(Math.PI+delta)/Math.PI+180;
		}
		placeAngles.push(eastAngle);
		//placeList[i].distance = 
	}

	var northHeading = 360-heading;
	var eastHeading = (northHeading+90)%360;
	var ivalWidth = 30;
	var ivalMin = eastHeading-ivalWidth;
	var ivalMax = eastHeading+ivalWidth;
	if (ivalMin<0) {
		var pos = filterPlaces(placeAngles, 0, ivalMax);
		pos.push(filterPlaces(placeAngles, 360+ivalMin, 360));
		for(var i=0; i<pos.length; i++){
			placeWithin.push(placeList[i]);
		}
	};

	if(ivalMax>360){
		var pos = filterPlaces(placeAngles, ivalMin, 360);
		pos.push(filterPlaces(placeAngles, 0, ivalMax-360));
		for(var i=0; i<pos.length; i++){
			placeWithin.push(placeList[i]);
		}
	};

	if (ivalMin>=0 && ivalMax<=360) {
		var pos = filterPlaces(placeAngles, ivalMin, ivalMax);
		for(var i=0; i<pos.length; i++){
			placeWithin.push(placeList[i]);
		}
	};

	//rank the place list by distance
	placeWithin.sort(function(a, b){
		if (a.distance>b.distance) {
			return 1;
		}
		if (a.distance<b.distance){
			return -1;
		}
		return 0
	});

	//place result example
	// var places = [];
	// var tmp = {
	// 	title: "place1",
	// 	bottom: 5,
	// 	right: 5
	// };
	// places.push(tmp);
	// tmp = {
	// 	title: "place2",
	// 	bootom: 100,
	// 	right: 100
	// };
	// places.push(tmp);
	// tmp = {
	// 	title: "place3",
	// 	bottom: 200,
	// 	right: 200
	// };
	// places.push(tmp);
	return callback(placeWithin);
};

function filterPlaces(placeAngles, ivalMin, ivalMax) {
	var candidatePos = [];
	for(var i=0;i<placeAngles.length;i++){
		if (placeAngles>=ivalMin && placeAngles<=ivalMax) {
			candidatePos.push(i);
		};
	}
	return candidatePos;
};

var DisplayProjection = {
	getPlacesWithinInterval
};

module.exports = DisplayProjection;