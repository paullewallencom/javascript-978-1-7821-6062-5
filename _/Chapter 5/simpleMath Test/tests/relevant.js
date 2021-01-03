FixtureTestCase = TestCase("Fixture Testcase");

FixtureTestCase.prototype.testSomeThing = function() {
  /*:DOC += <div id="someDiv"></div> */

  assertNotNull(document.getElementById('someDiv'));
};