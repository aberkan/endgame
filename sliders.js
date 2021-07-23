// Inputs:

var reproSlider = document.getElementById("reproRate");
var reproOut = document.getElementById("reproRateOut");
var immunePctOut = document.getElementById("immunePctOut");

var vaxSlider = document.getElementById("vaxRate");
var vaxPctOut = document.getElementById("vaxRatePctOut");

var vaxEffSlider = document.getElementById("vaxEff");
var vaxEffPctOut = document.getElementById("vaxEffPctOut");

// Outputs:


var bigUnvaxSickPctOut = document.getElementById("bigUnvaxSickPctOut");
var bigSickPctOut = document.getElementById("bigSickPctOut");
var bigVaxSickPctOut = document.getElementById("bigVaxSickPctOut");


var herdOut = document.getElementById("herdOut");
var totalImmunePctOut = document.getElementById("totalImmunePctOut");
var vaxImmunePctOut = document.getElementById("vaxImmunePctOut");
var sickPctOut = document.getElementById("sickPctOut");

var unvaxSickPctOut = document.getElementById("unvaxSickPctOut");
var vaxSickPctOut = document.getElementById("vaxSickPctOut");




// Plumbing

recalc = function() {
	reproRate = reproSlider.value;
	immuneThresholdPct = 100 * (1 - (1/reproRate));
	vaxPct = vaxSlider.value;
	vaxEffPct = vaxEffSlider.value;
	unvaxPct = 100 - vaxSlider.value;


	vaxImmunePct = vaxPct * vaxEffPct / 100;
	immunePct = Math.max(immuneThresholdPct, vaxImmunePct);
	gotSickPct = immunePct - vaxImmunePct;

	unvaxSickPct = 100 * gotSickPct / unvaxPct

	vulnPct = 100 - vaxImmunePct;

	sickIfVulnPct = 100 * (gotSickPct / vulnPct);

	sickIfVaxPct = sickIfVulnPct * (100 - vaxEffPct) / 100;




	reproOut.innerHTML = reproRate;
	immunePctOut.innerHTML = (immuneThresholdPct).toFixed(1);
	vaxPctOut.innerHTML = vaxPct;
	vaxEffPctOut.innerHTML = vaxEffPct;

	if (immunePct > immuneThresholdPct) {
		herdOut.innerHTML = "No";
	} else {
		herdOut.innerHTML = "Yes";
	}
	totalImmunePctOut.innerHTML = (immunePct).toFixed(1);
	vaxImmunePctOut.innerHTML = vaxImmunePct;

	sickPctOut.innerHTML = (gotSickPct).toFixed(1);
	bigSickPctOut.innerHTML = (gotSickPct).toFixed(1);

	unvaxSickPctOut.innerHTML = (sickIfVulnPct).toFixed(1);
	bigUnvaxSickPctOut.innerHTML = (sickIfVulnPct).toFixed(1);


	vaxSickPctOut.innerHTML = (sickIfVaxPct).toFixed(1);
	bigVaxSickPctOut.innerHTML = (sickIfVaxPct).toFixed(1);

}

recalc()

reproSlider.oninput = recalc
vaxSlider.oninput = recalc
vaxEffSlider.oninput = recalc

