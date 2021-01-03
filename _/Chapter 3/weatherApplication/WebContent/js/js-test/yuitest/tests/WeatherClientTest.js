/**
 * WeatherClientTest is used for testing the WeatherClient, it performs unit 
 * testing on the following functionalities:
 * 1. Getting the weather of a valid location.
 * 2. Getting the weather for an invalid location (The system should display an error message for this case). 
 */
YUI().use('test', 'console', function(Y) {
	var retrievingWeatherInfoTestcase = new Y.Test.Case({
		name: "Getting weather information Testcase",			
		
		setUp: function() {
		    this.weatherClient = new weatherapp.WeatherClient();
		    
		    this.validLocationForm = {
				'location': '1521894',
				'resultDivID': 'weatherInformation'
		    };
		    
		    this.invalidLocationForm = {
				'location': 'INVALID_LOCATION',
				'resultDivID': 'weatherInformation'
			};		    
		},
		tearDown: function() {
			delete this.weatherClient;
			delete this.validLocationForm;
			delete this.invalidLocationForm;			
		}, 
		"Getting the weather information for a valid place": function() {	 					
	 		var this_local = this;
	 		var Y_local = Y;
	 		
			var successCallback = function(response) {
				var resultMessage = response.xmlhttp.responseText;
				
				this_local.resume(function() {
					Y_local.Assert.areNotEqual(resultMessage, "");
				});
			};
			
			var failureCallback = function() {		
				this_local.resume(function() {
					fail();
				});							
			};					
			
			this.weatherClient.getWeatherCondition(this.validLocationForm, successCallback, failureCallback);							
			
	 		this.wait(5000); /* wait for 5 seconds until the resume is called or timeout */	
		}, 
		"Getting the weather information for an invalid place": function() {
	 		var this_local = this;
	 		var Y_local = Y;
	 		
			var successCallback = function() {
				this_local.resume(function() {
					fail();
				});
			};
			
			var failureCallback = function(response) {		
				var resultMessage = response.xmlhttp.responseText;
				
				this_local.resume(function() {
					Y_local.Assert.areEqual(resultMessage, "Invalid location code");
				});						
			};					
			
			this.weatherClient.getWeatherCondition(this.invalidLocationForm, successCallback, failureCallback);							
			
	 		this.wait(5000); /* wait for 5 seconds until the resume is called or timeout */	
		}
	});
	
	
	var suite = new Y.Test.Suite("WeatherClient Test Suite");
	
	suite.add(retrievingWeatherInfoTestcase);
	
	//create the console
	var console = new Y.Console({
		style: 'block',
		newestOnTop : false
	});
	console.render('#resultsPanel');	
	
	Y.Test.Runner.add(suite);
	Y.Test.Runner.run();
});