/*********** Calc IBU ***********/
/* (gr) * AA% * UTIL%
		-------------------------
				10*(litri)
				
-10% ->coni/plugs
-10% -> hop bah
-15% ->no schiuma in boil
*/
function calculateIbu(gr, aa, format,lt,util) {
	var ibu = (gr * aa * util)/ (10 * lt);
	if(format != 'Pellet') {
		var p = ibu / 10;
		ibu -= p;
	}  
	return ibu;
}

function calculateOg(e, kg, pg) {
	//Kg x punti x efficienza 
	var lb = kgToLbs(kg);
	var og = lb * pg;
	return og;
}

function calculateSrm(grains, lt) {
	var gal = ltToGal(lt);
	var mcutot = 0, mcu = 0, srm = 0;
	angular.forEach(grains, function(item) {
		var lb = kgToLbs(item.quantity);
		mcu += item.srm * lb;
	})	
	mcutot = mcu / gal;
	var p = Math.pow(mcutot, 0.6859) ;
	srm = 1.4922 * p;
	return srm;
}

/*
Est FG = (Gravity-1000)-((Gravity-1000)*Attenuation rate%)+1000
*/

function calculateFg(og, yeastsList) {
	var max_att = 0;
	max_att = Math.max.apply(Math,yeastsList.map(function(o){return o.attenuation;})) / 100;
	fg = (og - 1000) - ((og - 1000) * max_att);
	fg = Math.round(fg) + 1000;
	return fg;
}

/*
 * ((OG - FG) * 105) * 1.25 = ABV
 * (OG - FG) * 131.25
 * 
 */
function calculateAbv(og, fg) {
	var abv = 0;
	if(og > 1000 && fg > 1000) {
		abv = ( (og / 1000) - (fg / 1000) ) * 131.25;
		abv = Number(Math.round(abv+'e1')+'e-1');
	}
	return abv;
}

/*
 * Apparent attenuation
 * (OG-FG)/ OG x 100%
 * ((OG-1)-(FG-1)) / (OG-1) x 100%
 */
function calculateAAttenuation(og, fg) {
	var att = 0;
	if(og > 1000 && fg > 1000) {
		var ogp = getGu(og)
		var fgp = getGu(fg);
		att = ( (ogp - fgp) / ogp ) * 100;
	}
	return Math.round(att);
}

/*
 * Real attenuation
 * = Apparent Attenuation % x 0.814 65.12
 */
function calculateRAttenuation(appAtt) {
	var att = 0;
	if(appAtt > 0)
		att = appAtt * 0.814;
	return Math.round(att);
}

function calculatePriming(lt, co2, currCo2) {
	var g = 0;
	if(lt != undefined && co2 != undefined && currCo2 > 0 ) {
		g = (co2 - currCo2) * 4 * lt;
		g = Number(Math.round(g+'e2')+'e-2');
	}
	return g;
}

/* CO2 In Beer = 3.0378 - (0.050062 * temp) + (0.00026555 * temp^2)*/
function calculateCurrentCo2(temp) {
	var r = 0;
	var t = celsiusToFahr(temp);
	if(temp != undefined) {
		r = 3.0378 - (0.050062 * t) + (0.00026555 * Math.pow(t,2));
		r = Number(Math.round(r+'e2')+'e-2');
	}
	return r;
}

function getUtil(min) {
	if(min > 0 && min <= 5)
		return 5.0;
	if(min >= 6 && min <= 10 )
		return 6.0;
	if(min >= 11 && min <= 15 )
		return 8.0;
	if(min >= 16 && min <= 20)
		return 10.1;
	if(min >= 21 && min <= 25)
		return 12.1;
	if(min >= 26 && min <= 30)
		return 15.3;
	if(min >= 31 && min <= 35)
		return 18.8;
	if(min >= 36 && min <= 40)
		return 22.8;
	if(min >= 41 && min <= 45)
		return 26.0;
	if(min >= 46 && min <= 50)
		return 28.1;
	if(min >= 51 && min <= 55)
		return 29.6;
	if(min >= 56)
		return 30.5;
}

function getGu(sg) {
	var gu = 0;
	if(sg > 1000)
		gu = sg - 1000;
	return gu;
}

function parseGravity(gr) {
	// og with dot
	var re = /^[0-9]\.[0-9]{3}$/; 
	var m;
	if ((m = re.exec(gr)) !== null){ 
		gr = gr.replace("\.","");
	}
	return parseInt(gr);
}

function kgToLbs(kg) {
	return kg * 2.2;
}

function ltToGal(lt) {
	return lt * 0.26;
}

function celsiusToFahr(temp) {
	return temp * 1.8 + 32;
}


var uniqueItems = function (data, key) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        var value = data[i][key];
        if (result.indexOf(value) === -1) {
            result.push(value);
        }
    }
    return result;
};

function arrayObjectIndexOf(a, searchTerm) {
    for(var i = 0, len = a.length; i < len; i++) {
        if (a[i] === searchTerm) return i;
    }
    return -1;
}

function styleList (data) {
	var result = [];
	for (var i = 0; i < data.length; i++) {
		var style = data[i].style.name;
		if (arrayObjectIndexOf(result,style) === -1) {
			result.push(style);
		}
	}
	return result;
}

function typeList (data) {
	var result = [];
	for (var i = 0; i < data.length; i++) {
		var type = data[i].type;
		if (arrayObjectIndexOf(result,type) === -1) {
			result.push(type);
		}
	}
	return result;
}

/**
 * Replace all whitespace and special characters
 * @param string
 */
function formatString(string) {
	return string.replace(/ /g, "").replace(/[^a-zA-Z0-9]/g,"");
}