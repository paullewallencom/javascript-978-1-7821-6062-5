/**
 * WeatherClientTest is used for testing the WeatherClient, it performs unit 
 * testing on the following functionalities:
 * 1. Getting the weather of a valid location.
 * 2. Getting the weather for an invalid location (The system should display an error message for this case). 
 */
// WeatherClient Testcase ...
WeatherClientTestcase = AsyncTestCase("WeatherClient Testcase");

WeatherClientTestcase.prototype.setUp = function() {
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
};

WeatherClientTestcase.prototype.tearDown = function() {
	delete this.weatherClient;
	delete this.validLocationForm;
	delete this.invalidLocationForm;	
};

WeatherClientTestcase.prototype.testGetWeatherForValidPlace = function(queue) {
	var this_local = this;
	
	queue.call('Getting the weather information for a valid place', function(callbacks) {	 		  
	    var successCallback = callbacks.add(function(response) {
	    	var resultMessage = response.xmlhttp.responseText;	
	    	assertNotEquals("", resultMessage);
	    	
	    	jstestdriver.console.log("[Success] Weather information is retrieved successfully ...");
        });
       
	    var failureCallback = callbacks.addErrback('Unable to get the weather information for a valid place');     
	     
	    // call asynchronous API    
	    this_local.weatherClient.getWeatherCondition(this_local.validLocationForm, successCallback, failureCallback);		  
	});		
};

WeatherClientTestcase.prototype.testGetWeatherForInvalidPlace = function(queue) {
	var this_local = this;
	
	queue.call('Getting the weather information for an invalid place', function(callbacks) {	 		  
	    var failureCallback = callbacks.add(function(response) {
	    	var resultMessage = response.xmlhttp.responseText;	
	    	assertNotEquals("", resultMessage);
	    	
	    	jstestdriver.console.log("[Success] The weather information is not retrieved for the invalid place ...");
        });
       
	    var successCallback = callbacks.addErrback('[Error] The weather information is retrieved for an invalid place !!!');     
	     
	    // call asynchronous API    
	    this_local.weatherClient.getWeatherCondition(this_local.invalidLocationForm, successCallback, failureCallback);		  
	});		
};