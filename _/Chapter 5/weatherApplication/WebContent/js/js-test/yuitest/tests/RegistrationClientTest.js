/**
 * RegistrationClientTest is used for testing the RegistrationClient, it performs unit 
 * testing on the following functionalities:
 * 1. validation of empty username and password.
 * 2. validation of matched passwords
 * 3. validating that the username is in an email form.
 * 4. validating that the password  contains at least one digit, one capital and small character 
 * and at least one special character, and 6 characters or more ...
 * 5. The user registration functionality is done correctly.
 */
YUI().use('test', 'console', function(Y) {
	var emptyFieldsTestcase = new Y.Test.Case({
		name: "Empty userName and Password fields Testcase",			
		
		setUp: function() {
			this.registrationClient = new weatherapp.RegistrationClient();
			
			this.registrationForm = {
					"userNameField" : "username",
					"passwordField1" : "password1",
					"passwordField2" : "password2",				
					"userNameMessage" : "usernameMessage",
					"passwordMessage1" : "passwordMessage1"
		    };						
			
		},
		tearDown: function() {
			delete this.registrationClient;
			delete this.registrationForm;
		}, 
		testEmptyUserName: function() {
	 		document.getElementById("username").value = ""; /* setting username to empty */
	 		document.getElementById("password1").value = "Admin@123";        	   	
	 		document.getElementById("password2").value = "Admin@123";
	 		
	 		this.registrationClient.validateRegistrationForm(this.registrationForm);
	 		
	 		Y.Assert.areEqual("(field is required)", document.getElementById("usernameMessage").innerHTML);	
		}, 
		testEmptyPassword: function() {
	 		document.getElementById("username").value = "someone@someDomain.com"; 
	 		document.getElementById("password1").value = ""; /* setting password to empty */        	   	
	 		document.getElementById("password2").value = "";
	 		
	 		this.registrationClient.validateRegistrationForm(this.registrationForm);
	 		
	 		Y.Assert.areEqual("(field is required)", document.getElementById("passwordMessage1").innerHTML);	
		}
	});
	
	var matchedPasswordsTestcase = new Y.Test.Case({
		name: "Matched passwords Testcase",			
		
		setUp: function() {
			this.registrationClient = new weatherapp.RegistrationClient();
			
			this.registrationForm = {
					"userNameField" : "username",
					"passwordField1" : "password1",
					"passwordField2" : "password2",				
					"userNameMessage" : "usernameMessage",
					"passwordMessage1" : "passwordMessage1"
		    };						
			
		},
		tearDown: function() {
			delete this.registrationClient;
			delete this.registrationForm;
		}, 
		testMatchedPasswords: function() {
	 		document.getElementById("username").value = "someone@someDomain.com"; 
	 		document.getElementById("password1").value = "Admin@123"; /* setting passwords unmatched */        	   	
	 		document.getElementById("password2").value = "Admins@123";
	 		
	 		this.registrationClient.validateRegistrationForm(this.registrationForm);
	 		
	 		Y.Assert.areEqual("(Passwords must be identical)", document.getElementById("passwordMessage1").innerHTML);	
		}
	});	
	
	var fieldsFormatTestcase = new Y.Test.Case({
		name: "Fields format Testcase",			
		
		setUp: function() {
			this.registrationClient = new weatherapp.RegistrationClient();
			
			this.registrationForm = {
					"userNameField" : "username",
					"passwordField1" : "password1",
					"passwordField2" : "password2",				
					"userNameMessage" : "usernameMessage",
					"passwordMessage1" : "passwordMessage1"
		    };
		},
		tearDown: function() {
			delete this.registrationClient;
			delete this.registrationForm;
		}, 
		testUsernameFormat: function() {
	 		document.getElementById("username").value = "someone@someDomain";  /* setting username to invalid format */       
	 		document.getElementById("password1").value = "Admin@123"; 	   	
	 		document.getElementById("password2").value = "Admin@123";
	 		
	 		this.registrationClient.validateRegistrationForm(this.registrationForm);
	 		
	 		Y.Assert.areEqual("(format is invalid)", document.getElementById("usernameMessage").innerHTML);	
		},
		testPasswordFormat: function() {
	 		document.getElementById("username").value = "someone@someDomain.com";      
	 		document.getElementById("password1").value = "Admin123"; /* setting password to invalid format */   
	 		document.getElementById("password2").value = "Admin123";
	 		
	 		this.registrationClient.validateRegistrationForm(this.registrationForm);
	 		
	 		Y.Assert.areEqual("(format is invalid)", document.getElementById("passwordMessage1").innerHTML);	
		}		
	});		
	
	var registerUserTestcase = new Y.Test.Case({
		name: "RegisterUser Testcase",			
		
		setUp: function() {
			this.registrationClient = new weatherapp.RegistrationClient();
			
			this.registrationForm = {
					"userNameField" : "username",
					"passwordField1" : "password1",
					"passwordField2" : "password2",				
					"userNameMessage" : "usernameMessage",
					"passwordMessage1" : "passwordMessage1"
		    };
		},
		tearDown: function() {
			delete this.registrationClient;
			delete this.registrationForm;
		}, 
		testAddNewUser: function() {
			this.userName = "hazems" + new Date().getTime() + "@apache.org";
	 		
			document.getElementById("username").value = this.userName;
	 		document.getElementById("password1").value = "Admin@123";
	 		document.getElementById("password2").value = "Admin@123";  	 		
	 					
	 		var this_local = this;
	 		var Y_local = Y;
	 		
			var successCallback = function(response) {
				var resultMessage = response.xmlhttp.responseText;		
				
				this_local.resume(function() {
					Y_local.Assert.areEqual("User is registered successfully ...", resultMessage);
				});
			};
			
			var failureCallback = function() {		
				this_local.resume(function() {
					fail();
				});							
			};					
			
			this.registrationClient.registerUser(this.registrationForm, successCallback, failureCallback);							
			
	 		this.wait(5000); /* wait for 5 seconds until the resume is called or timeout */
		}, 
		testAddExistingUser: function() {
			document.getElementById("username").value = this.userName;
	 		document.getElementById("password1").value = "Admin@123";
	 		document.getElementById("password2").value = "Admin@123";  	 		
	 					
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
					Y_local.Assert.areEqual("A user with the same username is already registered ...", resultMessage);								
				});							
			};					
			
			this.registrationClient.registerUser(this.registrationForm, successCallback, failureCallback);							
			
	 		this.wait(5000); /* wait for 5 seconds until the resume is called or timeout */
		}
	});
	
	var suite = new Y.Test.Suite("RegistrationClient Test Suite");
	
	suite.add(emptyFieldsTestcase);
	suite.add(matchedPasswordsTestcase);
	suite.add(fieldsFormatTestcase);
	suite.add(registerUserTestcase);
	
	//create the console
	var console = new Y.Console({
		style: 'block',
		newestOnTop : false
	});
	console.render('#resultsPanel');	
	
	// Wait until the test completes its execution ...	
	Y.Test.Runner.add(suite);	
	
	function processTestResults() {
		var results = Y.Test.Runner.getResults();
		var reporter = new Y.Test.Reporter("/weatherApplication/YUIReportViewer", Y.Test.Format.JUnitXML);
		
		// Send a custom parameters to tell the Servlet with the report name and extension.
		reporter.addField("reportName", "registrationTestReport");		
		reporter.addField("format", "xml");
	
		reporter.report(results);
	}
	
	Y.Test.Runner.subscribe(Y.Test.Runner.COMPLETE_EVENT, processTestResults);
	Y.Test.Runner.run();
	
	/*
	// Another way for waiting for the test runner execution's completion.
	var intervalID = window.setInterval(function() {
		if (! Y.Test.Runner.isRunning()) {
			window.clearInterval(intervalID);
			
			var results = Y.Test.Runner.getResults();
			var reporter = new Y.Test.Reporter("/weatherApplication/YUIReportViewer", Y.Test.Format.JUnitXML);
		
			reporter.report(results);
		}
	}, 1000);
	*/	
});