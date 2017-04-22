// this is the code which will be injected into a given page...

(function() {

	function updateDisplay(xhr, productNameElement) {
		// JSON.parse does not evaluate the attacker's scripts.
    	var resp = JSON.parse(xhr.responseText);
    	var ratingScore = resp["data"]["sustainabilityRatingBasics"]["ratingScore"];
    	var emojiFace = "unset";
    	if (ratingScore < 25) {
    		emojiFace = "FEARFUL FACE EMOJI";
    	} else if (25 <= ratingScore && ratingScore < 50) {
    		emojiFace = "NEUTRAL FACE EMOJI";
    	} else if (50 <= ratingScore && ratingScore < 75) {
    		emojiFace = "SMILEY FACE EMOJI";
    	} else if (75 <= ratingScore) {
    		emojiFace = "HEART EYES EMOJI";
    	}

    	var div = document.createElement('div');
		div.textContent = emojiFace + " | " + ratingScore.toString()+" out of 100";
		productNameElement.appendChild(div);
	}


	var productNameElement = document.getElementsByClassName("a-link-normal s-access-detail-page s-color-twister-title-link a-text-normal")[2];

	var productName = encodeURIComponent(productNameElement.title);
	var manufacturer = productName.split(" ")[0];
	var category = "Elektronik%2C%20Foto%20%26%20Computer";
	var xhr = new XMLHttpRequest();
	var queryString = "https://api1.wegreen.de/services/instantProductRating.json?" + 
						"name=" + productName + 
						"&manufacturer=" + manufacturer +
						"&category=" + category;
	xhr.open("GET", queryString, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
	    	updateDisplay(xhr, productNameElement);
	  	}
	}
	xhr.send();	

})();