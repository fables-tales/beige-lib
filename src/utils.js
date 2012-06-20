Beige.utils = {
  
  show: {
  
    generateColour: function(args){
      args = $().extend({
        minHue: 0, maxHue: 360,
        minLightness: 0, maxLightness: 1,
        minSaturation: 0, maxSaturation: 1
      }, args);

      var randInRange = function(min,max, round){
        if(min==max){
          return min;
        }else{
          return Math.random() * (max - min) + min;
        }
      };

      var hue = randInRange(args.minHue,args.maxHue);
      var saturation = randInRange(args.minSaturation,args.maxSaturation);
      var lightness = randInRange(args.minLightness,args.maxLightness);

      return new net.brehaut.Color({hue: hue, saturation: saturation, lightness: lightness});
    },
  
    polarToCartesian: function(theta,radius){
      var x = Math.cos(theta) * radius;
      var y = Math.sin(theta) * radius;

      return {x: x, y: y};
    },
  
    degToRad: function(degree){
      return Math.PI/180 * degree;
    },
  
    hslLightnessSlice: function(canvas, lightness){
      var colours = [];
    
      var context = canvas.getContext('2d');
      var canvas_x = canvas.width;
      var canvas_y = canvas.height;
    
      context.clearRect(0,0,canvas_x,canvas_y);
    
      var saturation_inc = 2 / canvas_x;
      // var hue_inc = 1;
      var hue_inc = 2;
    
      for(var hue = 0; hue <= 360; hue += hue_inc){
        for(var saturation = 0 ; saturation <= 1; saturation += saturation_inc){
          c = new net.brehaut.Color({hue: hue, saturation: saturation, lightness: lightness});
        
          var theta = Beige.utils.show.degToRad(c.getHue());
          var radius = 0.5 * c.getSaturation();

          var coord = this.polarToCartesian(theta,radius);

          var size = 2;

          var x = (coord.x * canvas_x) + canvas_x/2;
          var y = (coord.y * canvas_y) + canvas_y/2;

          context.fillStyle = Beige.is(c) ? "black" :  c.toString();
          context.fillRect(x, y, size, size);
        }
      }

    }
    
  },
  
  calculate: {
    
    linearEquation: function(x1,y1,x2,y2){
      var m = (y2-y1)/(x2 - x1);
      // y1 = m * x1 + c
      var c = y1 - ( m * x1 );
      
      return {m: m, c: c};
    }
    
  }
  
};

$(function(){

  var renderCanvases = function(){
    $(".preview canvas").each(function(i,canvas){
      var lightness = parseFloat($(canvas).data('lightness'));
      Beige.utils.show.hslLightnessSlice(canvas, lightness);
    });
  };
  
  defaults = {
    maxSaturation: 1.1,
    minSaturation: 0.1,
    minHue: -1,
    maxHue: 61,
    minLightness: 0.3,
    maxLightness: 0.96,
    pointLightness: -0.6,
    pointHue: 30,
    pointSaturation: 0.3
  };
  
  var beigeLists = function(){
    $(".beiges li").each(function(i,e){
      var $li = $(e);
      var value = $li.data('value');

      var r = Beige.is(value);
      var background = r ? "green" : "red";

      var c = new net.brehaut.Color(value);

      $li.text(value + ", Hue " + c.getHue() + ", Sat " + c.getSaturation() + ", Lightness " + c.getLightness());

      $li.css('background-color', value);
      $li.css('border-color', background);
      $li.css('border-width', "5px");
      $li.css('border-style', "solid");
    });
  };
  
  
  $("form#coefficients").each(function(i,form){
    
    var $form = $(form);
    
    getValues = function(){
      var r = {};
      $form.find("input").each(function(i,input){
        if(defaults.hasOwnProperty(input.id)){
          r[input.id] = parseFloat($(input).val());
        }
      });
      return r;
    };
    
    loadDefaults = function(){
      $form.find("input").each(function(i,input){
        if(defaults.hasOwnProperty(input.id)){
          $(input).val(defaults[input.id]);
        }
      });
    };
    
    $form.submit(function(e){

      v = getValues();

      var linearEquation = Beige.utils.calculate.linearEquation;

      Beige.coefficients = {
        maxSaturation: linearEquation(v.pointLightness, v.pointSaturation, v.maxLightness, v.maxSaturation),
        minSaturation: linearEquation(v.pointLightness, v.pointSaturation, v.maxLightness, v.minSaturation),
        maxHue:        linearEquation(v.pointLightness, v.pointHue, v.maxLightness, v.maxHue),
        minHue:        linearEquation(v.pointLightness, v.pointHue, v.maxLightness, v.minHue),
        minLightness:  v.minLightness,
        maxLightness:  v.maxLightness
      };

      renderCanvases();
      beigeLists();
      
      e.preventDefault();
    });
    
    loadDefaults();
    
  });
  
});





