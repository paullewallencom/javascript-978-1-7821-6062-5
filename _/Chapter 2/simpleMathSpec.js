describe("SimpleMath", function() {
  var simpleMath;
  
  beforeEach(function() {
      simpleMath = new SimpleMath();
  });

  describe("when SimpleMath is used to find factorial", function() {
       it("should be able to find factorial for a positive number", function() {
			expect(simpleMath.getFactorial(3)).toEqual(6);
       });  

       it("should be able to find factorial for zero", function() {
			expect(simpleMath.getFactorial(0)).toEqual(1);
       });  

       it("should be able to throw an exception when the number is negative", function() {
			expect(
				function() { 
					simpleMath.getFactorial(-10)
				}).toThrow("There is no factorial for negative numbers");
       });  	   
	   
  });

  describe("when SimpleMath is used to find signum", function() {
       it("should be able to find the signum for a positive number", function() {
			expect(simpleMath.signum(3)).toEqual(1);
       });  

       it("should be able to find the signum for zero", function() {
			expect(simpleMath.signum(0)).toEqual(0);
       });  

       it("should be able to find the signum for a negative number", function() {
			expect(simpleMath.signum(-1000)).toEqual(-1);
       });
  });  
  
  describe("when SimpleMath is used to find the average of two values", function() {
       it("should be able to find the average of two values", function() {
			expect(simpleMath.average(3, 6)).toEqual(4.5);
       });
  });  
});