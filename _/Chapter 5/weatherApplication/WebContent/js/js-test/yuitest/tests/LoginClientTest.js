/**
 * LoginClientTest is used for testing the LoginClient, it performs unit 
 * testing on the following functionalities:
 * 1. validation of empty username and password.
 * 2. validating that the username is in an email form.
 * 3. validating that the password  contains at least one digit, one capital and small character 
 * and at least one special character, and 6 characters or more ...
 */
YUI().use('test', 'console', function(Y) {
	var emptyFieldsTestcase = new Y.Test.Case({
		name: "Empty userName and Password fields validation Testcase",			
		
		setUp: function() {
			this.loginClient = new weatherapp.LoginClient();
			
		    this.loginForm = {
				"userNameField" : "username",
		 		"passwordField" : "password",
		 		"userNameMessage" : "usernameMessage",
		 		"passwordMessage" : "passwordMessage"
		    };					
		},
		tearDown: function() {
			delete this.loginClient;
			delete this.loginForm;
		}, 
		testEmptyUserName: function() {
	 		document.getElementById("username").value = ""; /* setting username to empty */
	 		document.getElementById("password").value = "Admin@123";  
	 		
	 		this.loginClient.validateLoginForm(this.loginForm);
	 		
	 		Y.Assert.areEqual("(field is required)", document.getElementById("usernameMessage").innerHTML);	
		}, 
		testEmptyPassword: function() {
	 		document.getElementById("username").value = "someone@yahoo.com";
	 		document.getElementById("password").value = "";   /* setting password to empty */  	 
	 		
	 		this.loginClient.validateLoginForm(this.loginForm);
	 		
	 		Y.Assert.areEqual("(field is required)", document.getElementById("passwordMessage").innerHTML);	
		}
	});
	
	var fieldsFormatTestcase = new Y.Test.Case({
		name: "Fields format validation Testcase",			
		
		setUp: function() {
			this.loginClient = new weatherapp.LoginClient();
			
		    this.loginForm = {
				"userNameField" : "username",
		 		"passwordField" : "password",
		 		"userNameMessage" : "usernameMessage",
		 		"passwordMessage" : "passwordMessage"
		    };
		},
		tearDown: function() {
			delete this.loginClient;
			delete this.loginForm;
		}, 
		testUsernameFormat: function() {
	 		document.getElementById("username").value = "someone@someDomain";  /* setting username to invalid format */       
	 		document.getElementById("password").value = "Admin@123"; 
	 		
	 		this.loginClient.validateLoginForm(this.loginForm);
	 		
	 		Y.Assert.areEqual("(format is invalid)", document.getElementById("usernameMessage").innerHTML);	
		},
		testPasswordFormat: function() {
	 		document.getElementById("username").value = "someone@someDomain.com";      
	 		document.getElementById("password").value = "Admin123"; /* setting password to invalid format */   
	 		
	 		this.loginClient.validateLoginForm(this.loginForm);
	 		
	 		Y.Assert.areEqual("(format is invalid)", document.getElementById("passwordMessage").innerHTML);	
		}		
	});			
	
	var suite = new Y.Test.Suite("LoginClient Test Suite");
	
	suite.add(emptyFieldsTestcase);
	suite.add(fieldsFormatTestcase);
	
	//create the console
	var console = new Y.Console({
		style: 'block',
		newestOnTop : false
	});
	console.render('#resultsPanel');	
	
	Y.Test.Runner.add(suite);
	Y.Test.Runner.run();
});