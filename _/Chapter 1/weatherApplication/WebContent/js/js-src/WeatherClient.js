if (typeof weatherapp == "undefined" || !weatherapp) {
	weatherapp = {};
}

weatherapp.WeatherClient = function() {};
weatherapp.WeatherClient.xmlhttp;
weatherapp.WeatherClient.weatherForm;
weatherapp.WeatherClient.endpointURL = "";

// Public API
weatherapp.WeatherClient.prototype.getWeatherCondition =  function(weatherForm, successCallBack, failureCallBack) {
	
	if (window.XMLHttpRequest) {
		this.xmlhttp = new XMLHttpRequest();
	} else {
		this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	var successCallBackLocal = successCallBack;
	var failureCallBackLocal = failureCallBack;	
	var weatherClientLocal = this;
	
	this.xmlhttp.onreadystatechange = function() {
		weatherClientLocal.weatherInformationReady(successCallBackLocal, failureCallBackLocal);
	};
	
	this.weatherForm = weatherForm;
	
	if (typeof this.endpointURL == "undefined") {
		this.endpointURL = "";
	}
	
	this.xmlhttp.open("GET", 
					  this.endpointURL + 
					  "/weatherApplication/WeatherProxyServlet?w=" + weatherForm.location + "&preventCache=" + new Date().getTime(), 
					  true);
	
	this.xmlhttp.send();	
};

weatherapp.WeatherClient.prototype.weatherInformationReady =  function(successCallBack, failureCallBack) {	
	if (this.xmlhttp.readyState != 4) { 
		return; 
	}
	
	if (this.xmlhttp.status != 200)  {
		failureCallBack(this);
        return;
    }
    
	if (this.xmlhttp.readyState == 4 && this.xmlhttp.status == 200) {
		successCallBack(this);
    }
};

weatherapp.WeatherClient.prototype.displayWeatherInformation =  function(weatherClient) {
	var resultDivID = weatherClient.weatherForm.resultDivID;
	
	document.getElementById(resultDivID).innerHTML = weatherClient.xmlhttp.responseText;
};

weatherapp.WeatherClient.prototype.handleWeatherInfoError =  function(weatherClient) {
	var resultDivID = weatherClient.weatherForm.resultDivID;
	
	alert ("Error: " + weatherClient.xmlhttp.responseText);	
	document.getElementById(resultDivID).innerHTML = "Error: " + weatherClient.xmlhttp.responseText;	
};