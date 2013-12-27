//-------------------------------------------//

function ColorbarManager(){
   this.colorbarsToLoad    = null;
   this.nextFunction       = null;

   window.maperialColorbars = window.maperialColorbars || {};  // cache containing all previously loaded colorbars
}

//-------------------------------------------//

ColorbarManager.prototype.noColorbar = function() {
   return $.isEmptyObject(window.maperialColorbars);   
}

//-------------------------------------------//

ColorbarManager.prototype.getColorbar = function(uid){
   return window.maperialColorbars[uid];
}

//----------------------------//

ColorbarManager.prototype.addColorbar = function( colorbar ) {
   window.maperialColorbars[colorbar.uid] = {
      uid      : colorbar.uid, 
      name     : colorbar.uid, 
      data     : colorbar
   };
}

//-------------------------------------------//

ColorbarManager.prototype.createColorbar = function(options) {
   
   if(!options){
      options = { 
         beginAlphaAtZero : true 
      };
   }
   
   var steps    = options.steps || ColorbarManager.defaultSteps,
       colorbar = new ColorBar({
          beginAlphaAtZero : options.beginAlphaAtZero
       });
   
   for(var step in steps){
      colorbar.Set(step, new GradiantColor(steps[step].r, steps[step].g, steps[step].b, steps[step].a));
   }
   
   this.addColorbar(colorbar);
   return colorbar;
}

//-------------------------------------------//

ColorbarManager.prototype.fetchColorbars = function(colorbarUIDs, next) {

   this.nextFunction = next;

   if(colorbarUIDs.length > 0){
      var colorbarUID = colorbarUIDs.shift();
      this.colorbarsToLoad = colorbarUIDs;
      this.loadColorbar(colorbarUID);
   }
   else{
      next();
   }
}

//-------------------//

ColorbarManager.prototype.loadColorbar = function(colorbarUID) {

   var me = this;

   if(window.maperialColorbars[colorbarUID]){
      this.loadNextColorbar();
      return;
   }

   var colorbarURL = this.getURL(colorbarUID);
   console.log("  fetching : " + colorbarURL);

   $.ajax({  
      type: "GET",  
      url: colorbarURL,
      dataType: "json",
      success: function (json) {
         /*
         window.maperialColorbars[colorbarUID] = {
               uid : colorbarUID, 
               name: colorbarUID, 
               content:json, 
               data: me.convertJsonToData(json)
         };
         */
         var cb = new ColorBarData ( );
         cb.FromJson (json) 
         me.SetColorBar (colorbarUID,cb ) 
         me.loadNextColorbar();
      }
   });

}

//----------------------------//

ColorbarManager.prototype.loadNextColorbar = function() {
   this.fetchColorbars(this.colorbarsToLoad, this.nextFunction);
}

//----------------------------//

ColorbarManager.prototype.getURL = function(colorbarUID) {
   return Maperial.apiURL + "/api/colorbar/" + colorbarUID;
}

//----------------------------//

ColorbarManager.defaultSteps = {

      "0.0" : {
         "r" : 0.0,
         "g" : 0.0,
         "b" : 1.0,
         "a" : 0.0
      },
      
      "0.10" : {
         "r" : 0.0,
         "g" : 0.0,
         "b" : 1.0,
         "a" : 1.0
      },
      
      "0.15" : {
         "r" : 0.0,
         "g" : 1.0,
         "b" : 1.0,
         "a" : 1.0
      },
      
      "0.45" : {
         "r" : 0.0,
         "g" : 1.0,
         "b" : 0.0,
         "a" : 1.0
      },
      
      "0.75" : {
         "r" : 1.0,
         "g" : 1.0,
         "b" : 0.0,
         "a" : 1.0
      },
      
      "1.0" : {
         "r" : 1.0,
         "g" : 0.0,
         "b" : 0.0,
         "a" : 1.0
      },
}

/*
ColorbarManager.prototype.convertJsonToData = function(colorbarJson) {
   
   var data = [];   
   var previousStep = 0;
   for (var i in colorbarJson) {
      for ( var n = previousStep; n <= parseInt(i); n++) {
         data.push ( colorbarJson[i].r );
         data.push ( colorbarJson[i].g );
         data.push ( colorbarJson[i].b );
         data.push ( colorbarJson[i].a * 255 );
      }
      
      previousStep = n;
   }
   
   return new Uint8Array(data);
}
*/