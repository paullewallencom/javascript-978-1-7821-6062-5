/**
 * LoginClientTest is used for testing the LoginClient, it performs unit 
 * testing on the following functionalities:
 * 1. validation of empty username and password.
 * 2. validating that the username is in an email form.
 * 3. validating that the password  contains at least one digit, one capital and small character 
 * and at least one special character, and 6 characters or more ...
 */
// LoginClient Testcase ...
LoginClientTestcase = TestCase("LoginClient Testcase");

LoginClientTestcase.prototype.setUp = function() {
	/*:DOC += <label for="username">Username  <span id="usernameMessage" class="error"></span></label>
	 <input type="text" id="username" name="username"/>
	 <label for="password">Password  <span id="passwordMessage" class="error"></span></label>
	 <input type="password" id="password" name="password"/>*/
	
	this.loginClient = new weatherapp.LoginClient();
	
    this.loginForm = {
		"userNameField" : "username",
 		"passwordField" : "password",
 		"userNameMessage" : "usernameMessage",
 		"passwordMessage" : "passwordMessage"
    };
};

LoginClientTestcase.prototype.tearDown = function() {
	delete this.loginClient;
	delete this.loginForm; 
};

LoginClientTestcase.prototype.testEmptyUserName = function() {
	document.getElementById("username").value = ""; /* setting username to empty */
	document.getElementById("password").value = "Admin@123";  
	
	this.loginClient.validateLoginForm(this.loginForm);
	
	assertEquals("(field is required)", document.getElementById("usernameMessage").innerHTML);		
};

LoginClientTestcase.prototype.testEmptyPassword = function() {
	document.getElementById("username").value = "someone@yahoo.com";
	document.getElementById("password").value = "";   /* setting password to empty */  	 
	
	this.loginClient.validateLoginForm(this.loginForm);
	
	assertEquals("(field is required)", document.getElementById("passwordMessage").innerHTML);	
};

LoginClientTestcase.prototype.testUsernameFormat = function() {	
	document.getElementById("username").value = "someone@someDomain";  /* setting username to invalid format */       
	document.getElementById("password").value = "Admin@123"; 
	
	this.loginClient.validateLoginForm(this.loginForm);
	
	assertEquals("(format is invalid)", document.getElementById("usernameMessage").innerHTML);
};

LoginClientTestcase.prototype.testPasswordFormat = function() {
	document.getElementById("username").value = "someone@someDomain.com";      
	document.getElementById("password").value = "Admin123"; /* setting password to invalid format */   
	
	this.loginClient.validateLoginForm(this.loginForm);
	
	assertEquals("(format is invalid)", document.getElementById("passwordMessage").innerHTML);	
};