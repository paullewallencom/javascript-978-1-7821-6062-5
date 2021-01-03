// Factorial TestCase
FactorialTestCase = TestCase("Factorial Testcase");

FactorialTestCase.prototype.setUp = function() {
	// jstestdriver.console.log("Setup method is called ");
	this.simpleMath = new SimpleMath(); 
};

FactorialTestCase.prototype.tearDown = function() {
	delete this.simpleMath; 
};

FactorialTestCase.prototype.testPositiveNumber = function() {
	assertEquals("Factorial(3)", 6, this.simpleMath.getFactorial(3));	
};

FactorialTestCase.prototype.testZero = function() {
	assertEquals("Factorial(0)", 1, this.simpleMath.getFactorial(0));
};

FactorialTestCase.prototype.testNegativeNumber = function() {
	var localThis = this;

	assertException("Factorial(-9)", function() {
						localThis.simpleMath.getFactorial(-9)
					}, "Error"); 
};

// Signum TestCase
SignumTestCase = TestCase("Signum Testcase");

SignumTestCase.prototype.setUp = function() {
	this.simpleMath = new SimpleMath(); 
};

SignumTestCase.prototype.tearDown = function() {
	delete this.simpleMath; 
};

SignumTestCase.prototype.testPositiveNumber = function() {
	assertEquals("Signum(3)", 1, this.simpleMath.signum(3));	
};

SignumTestCase.prototype.testZero = function() {
	assertEquals("Signum(3)", 0, this.simpleMath.signum(0));	
};

SignumTestCase.prototype.testNegativeNumber = function() {
	assertEquals("Signum(3)", -1, this.simpleMath.signum(-1000));	
};


// Average TestCase
AverageTestCase = TestCase("Average Testcase");

AverageTestCase.prototype.setUp = function() {
	this.simpleMath = new SimpleMath(); 
};

AverageTestCase.prototype.tearDown = function() {
	delete this.simpleMath; 
};

AverageTestCase.prototype.testAverage = function() {
	assertEquals("Average(3, 6)", 4.5, this.simpleMath.average(3, 6));	
};