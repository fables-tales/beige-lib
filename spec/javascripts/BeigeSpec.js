describe("Beige", function() {

  var subject = Beige;

  describe("class method", function(){
    
    describe("is", function(){
      
      it("should return true for hex values of beige", function(){
        expect(subject.is("#F5F5DC")).toBe(true);
        expect(subject.is("#FFF8E7")).toBe(true);
        expect(subject.is("#EDC9AF")).toBe(true);
        expect(subject.is("#C2B280")).toBe(true);
        expect(subject.is("#A67B5B")).toBe(true);
        expect(subject.is("#967117")).toBe(true);        
      });
      
      it("should return false for hex values that aren't beige", function(){
        expect(subject.is("#FFFFFF")).toBe(false);
        expect(subject.is("#FB6522")).toBe(false);
        expect(subject.is("#FB65D7")).toBe(false);
        expect(subject.is("#E8FB64")).toBe(false);
        expect(subject.is("#000000")).toBe(false);
      });
      
      it("should return false for invalid values", function(){
        expect(subject.is()).toBe(false);
        expect(subject.is("123")).toBe(false);
        expect(subject.is(null)).toBe(false);
        expect(subject.is(undefined)).toBe(false);
        expect(subject.is({})).toBe(false);
      });
      
    });
    
  });

});