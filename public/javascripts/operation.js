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

function calculateOg(e, kg, pg) {
	//Kg x punti x efficienza 
	var lb = kgToLbs(kg);
	var og = lb * pg;
	return og;
}

function kgToLbs(kg) {
	return kg * 2.2;
}

function ltToGal(lt) {
	return lt * 0.26;
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

function calculateAbv(og, fg) {
	var abv = 0;
	if(og > 1000 && fg > 1000) {
		abv = ((og - 1000) - (fg - 1000)) / 7.5;
		abv = Number(Math.round(abv+'e1')+'e-1');
	}
	return abv;
}
