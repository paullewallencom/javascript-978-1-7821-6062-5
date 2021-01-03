// WeatherClient test module
module("WeatherClient Test Module", {
  setup: function() {
	  
	    // The HTML fixture for the WeatherClient.
		/*:DOC += <div id="weatherInformation" class="weatherPanel"></div>*/
	  
	    this.weatherClient = new weatherapp.WeatherClient();	    
	    
	    this.validLocationForm = {
			'location': '1521894',
			'resultDivID': 'weatherInformation'
	    };
	    
	    this.invalidLocationForm = {
			'location': 'INVALID_LOCATION',
			'resultDivID': 'weatherInformation'
		};
  }, teardown: function() {
		delete this.weatherClient;
		delete this.validLocationForm;
		delete this.invalidLocationForm;
  }
});

asyncTest("getting the weather information for a valid place", function() {
	var successCallback = function(response) {
		var resultMessage = response.xmlhttp.responseText;		

		notEqual(resultMessage, "", "Getting the weather information for a valid place succeeded");
		start();
	};
	
	var failureCallback = function() {
		ok(false, "Getting the weather information for a valid place failed ...");
		start();		
	};					
	
	this.weatherClient.getWeatherCondition(this.validLocationForm, successCallback, failureCallback);	
});

asyncTest("getting the weather information for an invalid place", function() {
	var successCallback = function() {
		ok(false, "Getting the weather information for an invalid place succeeded (MUST NOT Happen)!!!");
		start();		
	};
	
	var failureCallback = function(response) {
		var resultMessage = response.xmlhttp.responseText;		

		equal(resultMessage, "Invalid location code", "Getting the weather information for an invalid place failed (Expected) ...");
		start();		
	};					
	
	this.weatherClient.getWeatherCondition(this.invalidLocationForm, successCallback, failureCallback);	
});