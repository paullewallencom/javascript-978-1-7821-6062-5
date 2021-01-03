// Factorial testing module
module("Factorial", {
  setup: function() {
	 this.simpleMath = new SimpleMath(); 
  }, teardown: function() {
	 delete this.simpleMath;
  }
});

test("calculating factorial for a positive number", function() {
	equal(this.simpleMath.getFactorial(3), 6, "Factorial of three must equal six");
});

test("calculating factorial for zero", function() {
	equal(this.simpleMath.getFactorial(0), 1, "Factorial of zero must equal one");
});

test("throwing an error when calculating the factorial for a negative number", function() {
	raises(function() {
			this.simpleMath.getFactorial(-10)
		   }, "There is no factorial for negative numbers ...");
});

// Signum testing module
module("Signum", {
  setup: function() {
	 this.simpleMath = new SimpleMath(); 
  }, teardown: function() {
	 delete this.simpleMath;
  }
});

test("calculating signum for a positive number", function() {
	equal(this.simpleMath.signum(3), 1, "Signum of three must equal one");
});

test("calculating signum for zero", function() {
	equal(this.simpleMath.signum(0), 0, "Signum of zero must equal zero");
});

test("calculating signum for a negative number", function() {
	equal(this.simpleMath.signum(-1000), -1, "Signum of -1000 must equal -1");
});

// Average testing module
module("Average", {
  setup: function() {
	 this.simpleMath = new SimpleMath(); 
  }, teardown: function() {
	 delete this.simpleMath;
  }
});

test("calculating the average of two numbers", function() {
	equal(this.simpleMath.average(3, 6), 4.5, "Average of 3 and 6 must equal 4.5");
});


