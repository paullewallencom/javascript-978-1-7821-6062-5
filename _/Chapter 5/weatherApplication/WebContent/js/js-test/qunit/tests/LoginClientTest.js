// LoginClient test module
module("LoginClient Test Module", {
  setup: function() {
	  
	  // The HTML fixture for the loginClient.
	  document.getElementById("qunit-fixture").innerHTML = 
		  "<label for=\"username\">Username  <span id=\"usernameMessage\"></span></label>" +
	  	  "<input type=\"text\" id=\"username\" name=\"username\"/>" +
	  	  "<label for=\"password\">Password  <span id=\"passwordMessage\"></span></label>" +
	  	  "<input type=\"password\" id=\"password\" name=\"password\"/>";
	  
	  this.loginClient = new weatherapp.LoginClient();
	  
	  this.loginForm = {
	 			"userNameField" : "username",
	 			"passwordField" : "password",
	 			"userNameMessage" : "usernameMessage",
	 			"passwordMessage" : "passwordMessage"
	  };
  }, teardown: function() {
	  delete this.loginClient;
	  delete this.loginForm;
  }
});

test("validating empty username", function() {
	document.getElementById("username").value = ""; /* setting username to empty */
	document.getElementById("password").value = "Admin@123";        	   	
	
	this.loginClient.validateLoginForm(this.loginForm);
	
	equal(document.getElementById("usernameMessage").innerHTML, "(field is required)", "validating empty username ...");	
});

test("validating empty password", function() {
	document.getElementById("username").value = "someone@yahoo.com";
 	document.getElementById("password").value = "";   /* setting password to empty */  	   	
 	
 	this.loginClient.validateLoginForm(this.loginForm);
 	
 	equal(document.getElementById("passwordMessage").innerHTML, "(field is required)", "validating empty password ...");
});

test("validating username format", function() {
 	document.getElementById("username").value = "someone@yahoo"; /* setting username to incorrect format */
 	document.getElementById("password").value = "Admin@123";        	   	
 	
 	this.loginClient.validateLoginForm(this.loginForm);
 	
 	equal(document.getElementById("usernameMessage").innerHTML, "(format is invalid)", "validating username format ...");
});

test("validating password format", function() {
	document.getElementById("username").value = "someone@yahoo.com";
 	document.getElementById("password").value = "admin@123";  /* setting password to incorrect format */       	   	
 		
 	this.loginClient.validateLoginForm(this.loginForm);
 		
 	equal(document.getElementById("passwordMessage").innerHTML, "(format is invalid)", "validating password format ...");
});