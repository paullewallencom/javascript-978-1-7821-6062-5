SimpleMath = function() {
};

SimpleMath.prototype.getFactorial = function (number) {
	
	if (number < 0) {
		throw new Error("There is no factorial for negative numbers");
	}
	else if (number == 1 || number == 0) {
		
		// If number <= 1 then number! = 1.
	    return 1;
	} else {
	
		// If number > 1 then number! = number * (number-1)!	
	    return number * this.getFactorial(number-1);
	}	
}

SimpleMath.prototype.signum = function (number) {
    if (number > 0)  {
		return 1;
	} else if (number == 0) {
		return 0;
	} else {
		return -1;
	}
}

SimpleMath.prototype.average = function (number1, number2) {
    return (number1 + number2) / 2;
}