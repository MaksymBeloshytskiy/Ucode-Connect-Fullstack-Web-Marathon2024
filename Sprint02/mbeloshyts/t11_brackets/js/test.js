// Test cases for the checkBrackets function
describe("checkBrackets", () => {
    // Test case: Undefined input
    it("case.Undefined",function() {
        assert.equal(checkBrackets(undefined), '-1')
    })

    // Test case: NaN input
    it("case.Nan", () => assert.equal(checkBrackets(NaN), '-1'))

    // Test case: String input
    it("case.String",function() {
        assert.equal(checkBrackets('string'), '0')
    })

    // Test case: Number input
    it("case.Number",function() {
        assert.equal(checkBrackets(22), '0')
    })

    // Test case: Null input
    it("case.NULL",function() {
        assert.equal(checkBrackets(null), '0')
    })

    // Test case: Valid brackets - ()
    it("case { () }", function() {
        assert.equal(checkBrackets('()'), '0');
    });

    // Test case: Invalid brackets - () )(
    it("case { () )( }", function() {
        assert.equal(checkBrackets('() )('), '0');
    });

    // Test case: Valid brackets - ()()()()()()()
    it("case { ()()()()()()() }", function() {
        assert.equal(checkBrackets('()()()()()()()'), '0');
    });

    // Test case: Valid brackets with string - ()()string(string))
    it("case { ()()string(string)) }", function() {
        assert.equal(checkBrackets('()()string(string))'), '0');
    });

    // Test case: Valid brackets - ()()()()()()
    it("case { ()()()()() }", function() {
        assert.equal(checkBrackets('()()()()()'), '0');
    });

    // Test case: Invalid brackets - ([
    it("case { ([ }", function() {
        assert.equal(checkBrackets('()()()()()()'), '0');
    });

    // Test case: Valid brackets with nested brackets - (((((((((hey))))))))))
    it("case { ((((((((((hey)))))))))) }", function() {
        assert.equal(checkBrackets('((((((((((hey))))))))))'), '0');
    });

    // Test case: Invalid brackets - ( ( ( ( ( ( (
    it("case { ( ( ( ( ( ( ( }", function() {
        assert.equal(checkBrackets('( ( ( ( ( ( ('), '7');
    });

    // Test case: Valid brackets with numbers - (1) (2) (3) (4)
    it("case { (1) (2) (3) (4) }", function() {
        assert.equal(checkBrackets('(1) (2) (3) (4)'), '0');
    });

    // Test case: Invalid brackets - )1( )2(
    it("case { )1( )2( }", function() {
        assert.equal(checkBrackets(')1( )2('), '2');
    });
});