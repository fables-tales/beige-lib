//= require color

Beige = (function(){

  var Color = net.brehaut.Color;

  var validLightness = function(c){
    var l = c.getLightness();
    
    return l > Beige.coefficients.minLightness && l < Beige.coefficients.maxLightness;
  };
  
  var withinHueRange = function(c){
    var maxHue = function(colour){
      var x = colour.getLightness();
      var m = Beige.coefficients.maxHue.m;
      var c = Beige.coefficients.maxHue.c;
      
      return m*x+c;
    };
    var minHue = function(colour){ 
      var x = colour.getLightness();
      var m = Beige.coefficients.minHue.m;
      var c = Beige.coefficients.minHue.c;
      
      return m*x+c;
    };
    
    var hue = c.getHue();
    
    return hue > minHue(c) && hue < maxHue(c);
  };
  
  var withinSaturationRange = function(c){
    var maxSaturation = function(colour){
      var x = colour.getLightness();
      var m = Beige.coefficients.maxSaturation.m;
      var c = Beige.coefficients.maxSaturation.c;
      
      return m*x+c;
    };
    
    var minSaturation = function(colour){
      var x = colour.getLightness();
      var m = Beige.coefficients.minSaturation.m;
      var c = Beige.coefficients.minSaturation.c;
      
      return m*x+c;
    };
    
    var sat = c.getSaturation();
    
    return sat > minSaturation(c) && sat < maxSaturation(c);
  };


  return {
    
    coefficients: {
      maxSaturation: {
        m: 1.1666,
        c: -0.05
      },
      minSaturation: {
        m: -0.3333,
        c: 0.63333
      },
      minHue: {
        m: -50,
        c: 45
      },
      maxHue: {
        m: 50,
        c: 15
      },
      minLightness: 0.3,
      maxLightness: 0.96
    },
    
    is: function(c){
      if(!(c instanceof Color)){ c = new Color(c); }
      return validLightness(c) &&
        withinHueRange(c) &&
        withinSaturationRange(c);
    }
  };
  
})();