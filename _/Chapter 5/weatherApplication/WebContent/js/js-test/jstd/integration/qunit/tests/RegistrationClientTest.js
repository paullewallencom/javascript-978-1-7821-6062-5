// RegistrationClient test module
//QUnit.config.testTimeout = 10000;
module("RegistrationClient Test Module", {
  setup: function() {
	  
	  // The HTML fixture for the RegistrationClient.
	  /*:DOC += <label for="username">Username (Email)  <span id="usernameMessage" class="error"></span></label>
		 <input type="text" id="username" name="username"/>
		 <label for="password1">Password  <span id="passwordMessage1" class="error"></span></label>
		 <input type="password" id="password1" name="password1"/>
		 <label for="password2">Confirm your password</label>
		 <input type="password" id="password2" name="password2"/>*/
	  
	  this.registrationClient = new weatherapp.RegistrationClient();
		
	  this.registrationForm = {
				"userNameField" : "username",
				"passwordField1" : "password1",
				"passwordField2" : "password2",				
				"userNameMessage" : "usernameMessage",
				"passwordMessage1" : "passwordMessage1"
	   };
  }, teardown: function() {
	  delete this.registrationClient;
	  delete this.registrationForm;
  }
});

test("validating empty username", function() {
	document.getElementById("username").value = ""; /* setting username to empty */
	document.getElementById("password1").value = "Admin@123";        	   	
	document.getElementById("password2").value = "Admin@123";
	
	this.registrationClient.validateRegistrationForm(this.registrationForm);
	
	equal(document.getElementById("usernameMessage").innerHTML, "(field is required)", "validating empty username ...");	
});

test("validating empty password", function() {
	document.getElementById("username").value = "someone@someDomain.com"; 
	document.getElementById("password1").value = ""; /* setting password to empty */        	   	
	document.getElementById("password2").value = "";
	
	this.registrationClient.validateRegistrationForm(this.registrationForm);
	
	equal(document.getElementById("passwordMessage1").innerHTML, "(field is required)", "validating empty password ...");
});

test("validating matched passwords", function() {
	document.getElementById("username").value = "someone@someDomain.com"; 
	document.getElementById("password1").value = "Admin@123"; /* setting passwords unmatched */        	   	
	document.getElementById("password2").value = "Admins@123";
	
	this.registrationClient.validateRegistrationForm(this.registrationForm);
	
	equal(document.getElementById("passwordMessage1").innerHTML, "(Passwords must be identical)", "validating matched passwords ...");		 
});

test("validating username format", function() {
	document.getElementById("username").value = "someone@someDomain";  /* setting username to invalid format */       
	document.getElementById("password1").value = "Admin@123"; 	   	
	document.getElementById("password2").value = "Admin@123";
	
	this.registrationClient.validateRegistrationForm(this.registrationForm);
	
	equal(document.getElementById("usernameMessage").innerHTML, "(format is invalid)", "validating username format ...");	
});

test("validating password format", function() {
	document.getElementById("username").value = "someone@someDomain.com";      
	document.getElementById("password1").value = "Admin123"; /* setting password to invalid format */   
	document.getElementById("password2").value = "Admin123";
	
	this.registrationClient.validateRegistrationForm(this.registrationForm);
	
	equal(document.getElementById("passwordMessage1").innerHTML, "(format is invalid)", "validating password format ...");
});

test("testing the registration feature", function() {
	
	// Register a new user.	
	stop();
	
	this.userName = "hazems" + new Date().getTime() + "@apache.org";
		
	document.getElementById("username").value = this.userName;
	document.getElementById("password1").value = "Admin@123";
	document.getElementById("password2").value = "Admin@123";  	 		
	
	var local_this = this;
		
	var newSuccessCallback = function(response) {
		var resultMessage = response.xmlhttp.responseText;		
		equal(resultMessage, "User is registered successfully ...", "Registering a new user succeeded ...");
		start();		
		
		// Register the created user again (Register an existing user).
		stop();
		
		var existingSuccessCallback = function(response) {
			ok(false, "Validating registering a user with an existing id failed ...");
			start();		
		};
		
		var existingFailureCallback = function(response) {
			var resultMessage = response.xmlhttp.responseText;
			equal(resultMessage, "A user with the same username is already registered ...", "Validating registering a user with an existing id succeeded ...");
			start();
		};					
		
		local_this.registrationClient.registerUser(local_this.registrationForm, existingSuccessCallback, existingFailureCallback);
	};
	
	var newFailureCallback = function() {
		ok(false, "Registering a new user failed ...");
		start();		
	};					
	
	this.registrationClient.registerUser(this.registrationForm, newSuccessCallback, newFailureCallback);	
});