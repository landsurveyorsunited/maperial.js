
(function() {
	'use strict';

	var CartothequeController = Ember.ObjectController.extend({});

	//==================================================================//

	CartothequeController.renderUI = function()
	{
	   $("#listDemos").empty()
	   $("#listDemos").css("max-height", $(window).height() - 105)
	   CartothequeController.maps = []
	   console.log("adding maps")
	   CartothequeController.maps.push(CartothequeController.maps0)
	   CartothequeController.maps.push(CartothequeController.maps1)
	   CartothequeController.maps.push(CartothequeController.maps2)
	   CartothequeController.maps.push(CartothequeController.maps3)
	   CartothequeController.maps.push(CartothequeController.maps4)
	   
	   console.log("adding maps done")
	   
	   for(var i = 0; i < CartothequeController.maps.length; i++){
	      
	      console.log("tagging map",i)
	      var thumb = ""

	      thumb += "<div class='row-fluid'>"
         thumb += "   <div class='marketing'>"
         thumb += "      <img class='polaroid rounded touchable'  title='"+App.translations.messages.DemoTitle[i]+"' id='imageDemo"+i+"' onclick='App.CartothequeController.openDemo("+i+");' src='http://static.maperial.localhost/images/demos/demo"+i+".png'}}'/>"
         thumb += "   </div>"
         thumb += "</div>"
	      $("#listDemos").append(thumb)
	      
	      Utils.randomRotate("imageDemo"+i)
	      $("#imageDemo"+i).tooltipster({
	         theme: '.tooltip-theme'
	      })
	   }
	   
	   console.log("OPEN")
	   CartothequeController.openDemo(0)
	}

	CartothequeController.cleanUI = function()
	{
	   App.maperial.destroy()
	}

	//==================================================================//
	
	CartothequeController.openDemo = function(num){
	   console.log(num)

      var options = {
         width    : "80%",
         height   : "100%",
         left     : "20%"
      }

      App.maperial.build(CartothequeController.maps[num](), options)
	}
	
	
	//==================================================================//
	
	CartothequeController.maps0 = function()
	{
	   var mainConfig   = ConfigManager.newConfig();
      var minifierConfig   = ConfigManager.newConfig();
      
      mainConfig.map.defaultZoom    = 11
      mainConfig.map.latitude       = 47.600607
      mainConfig.map.longitude      = -122.315125
      mainConfig.layers.push        (LayersManager.getShadeLayerConfig())
      mainConfig.layers.push        (LayersManager.getImagesLayerConfig(Source.Images, Source.IMAGES_STAMEN_WATERCOLOR))
      minifierConfig.layers.push    (LayersManager.getImagesLayerConfig(Source.Images, Source.IMAGES_OCM_TRANSPORT))
      
      var mainOptions = {
         type       : Maperial.MAIN,
         name       : "maperialDemo"
      }
      
      var minifierOptions = {
         type       : Maperial.MINIFIER,
         name       : "Minifier",
         config     : minifierConfig,
         width      : "250",
         height     : "250",
         position   : { 
            left    : "14%", 
            bottom  : "20%" 
         },
         borderRadius : 130,
         padding    : 4,
         deltaZoom  : -3,
         draggable  : true
      }
      
      var map = {
         views : [{
            config  : mainConfig,
            options : mainOptions,
         },{
            config  : minifierConfig,
            options : minifierOptions,
         }]
      }
         
      return [map]
	}
	
	//==================================================================//
	
	
	CartothequeController.maps1 = function()
	{
	   var mainConfig   = ConfigManager.newConfig();
	   var anchor1Config   = ConfigManager.newConfig();
	   var anchor2Config   = ConfigManager.newConfig();
	   
	   mainConfig.map.defaultZoom    = 13
	   mainConfig.layers.push        (LayersManager.getImagesLayerConfig(Source.Images, Source.IMAGES_STAMEN_TONER_BG))
	   anchor1Config.layers.push    (LayersManager.getImagesLayerConfig(Source.Images, Source.IMAGES_STAMEN_WATERCOLOR))
	   anchor2Config.layers.push    (LayersManager.getImagesLayerConfig(Source.Images, Source.IMAGES_OCM_TRANSPORT))
	   
	   var mainOptions = {
	      type       : Maperial.MAIN,
	      name       : "maperialDemo"
	   }
	   
	   var anchor1Options = {
	      type       : Maperial.ANCHOR,
	      name       : "Anchor1",
	      config     : anchor1Config,
	      width      : "350",
	      height     : "350",
	      position   : { 
	         left    : "50", 
	         top     : "150" 
	      }
	   }

	   var anchor2Options = {
	      type       : Maperial.ANCHOR,
	      name       : "Anchor2",
	      config     : anchor2Config,
	      width      : "370",
	      height     : "370",
	      position   : { 
	         right   : "25", 
	         bottom  : "135" 
	      }
	   }
	   
	   var map = {
	      views : [{
	         config  : mainConfig,
	         options : mainOptions,
	      },{
	         config  : anchor1Config,
	         options : anchor1Options,
	      },{
	         config  : anchor2Config,
	         options : anchor2Options,
	      }]
	   }
	      
	   return [map]
	}

   //==================================================================//
   
   CartothequeController.maps2 = function()
   {
      var mainConfig   = ConfigManager.newConfig();
      var magnifierConfig   = ConfigManager.newConfig();
      
      mainConfig.map.defaultZoom    = 11
      mainConfig.map.latitude       = 46.316584
      mainConfig.map.longitude      = 6.486998
      mainConfig.layers.push        (LayersManager.getShadeLayerConfig())
      mainConfig.layers.push        (LayersManager.getImagesLayerConfig(Source.Images, Source.IMAGES_OCM_TRANSPORT))
      magnifierConfig.layers.push   (LayersManager.getImagesLayerConfig(Source.Images, Source.IMAGES_MAPQUEST))
      
      var mainOptions = {
         type       : Maperial.MAIN,
         name       : "maperialDemo"
      }
      
      var magnifierOptions = {
         type       : Maperial.MAGNIFIER,
         config     : magnifierConfig,
         width      : "200",
         height     : "200",
         position   : { 
            right   : "20%", 
            top     : "30%" 
         },
         padding    : 2,
         deltaZoom  : 1,
         borderRadius: 10,
         draggable  : true
      }
      
      var map = {
         views : [{
            config  : mainConfig,
            options : mainOptions,
         },{
            config  : magnifierConfig,
            options : magnifierOptions,
         }]
      }
         
      return [map]
   }

   //==================================================================//
   
   CartothequeController.maps3 = function()
   {
      var mainConfig   = ConfigManager.newConfig();
      var lensConfig   = ConfigManager.newConfig();
      
      mainConfig.map.defaultZoom    = 13
      mainConfig.map.latitude       = 48.844553
      mainConfig.map.longitude      = 2.368227
      mainConfig.layers.push        (LayersManager.getImagesLayerConfig(Source.Images, Source.IMAGES_STAMEN_TONER))
      lensConfig.layers.push        (LayersManager.getImagesLayerConfig(Source.Images, Source.IMAGES_OCM_TRANSPORT))
      
      var mainOptions = {
         type       : Maperial.MAIN,
         name       : "maperialDemo"
      }
      
      var lensOptions = {
         type       : Maperial.LENS,
         config     : lensConfig,
         width      : "200",
         height     : "200",
         position   : { 
            left    : "50%", 
            top     : "50%" 
         },
         padding    : 2,
         deltaZoom  : 1,
         borderRadius: 100,
         draggable  : true
      }
      
      var map = {
         views : [{
            config  : mainConfig,
            options : mainOptions,
         },{
            config  : lensConfig,
            options : lensOptions,
         }]
      }
         
      return [map]
   }

   //==================================================================//
   
   CartothequeController.maps4 = function()
   {
      var mainConfig   = ConfigManager.newConfig();
      var lensConfig   = ConfigManager.newConfig();
      var minifierConfig   = ConfigManager.newConfig();
      
      mainConfig.hud.elements[HUD.COMPOSITIONS]  = {
         show : true,  
         type : HUD.PANEL,    
         label : "Composition",      
         disableDrag : true,
         position   : { 
            left    : "0", 
            top     : "40%" 
         },
      };
      
      mainConfig.map.defaultZoom    = 6
      mainConfig.map.latitude       = 39.504041
      mainConfig.map.longitude      = 134.139633
      
      var customTransport = { 
            type: LayersManager.Images, 
            source: {
               type     : Source.Images,
               params   : { src: Source.IMAGES_STAMEN_WATERCOLOR },
               id       : Source.IMAGES_STAMEN_WATERCOLOR
            },
            params: {
               
            },
            composition: {
               shader : Maperial.MulBlend,
               params : { uParams : [ 0.38, -0.27, 3 ] }
            }
      }
      
      mainConfig.layers.push        (LayersManager.getImagesLayerConfig(Source.Images, Source.IMAGES_OCM_TRANSPORT))
      mainConfig.layers.push        (customTransport)
      
      lensConfig.layers       = mainConfig.layers
      minifierConfig.layers   = mainConfig.layers
      
      var mainOptions = {
         type       : Maperial.MAIN,
         name       : "maperialDemo"
      }
      
      var lensOptions = {
         type       : Maperial.LENS,
         width      : "200",
         height     : "200",
         position   : { 
            left    : "50%", 
            bottom  : "27%" 
         },
         padding    : 2,
         deltaZoom  : 1,
         borderRadius: 150,
         draggable  : true
      }
      
      var minifierOptions = {
         type       : Maperial.MINIFIER,
         width      : "200",
         height     : "200",
         position   : { 
            right   : "10%", 
            bottom  : "18%" 
         },
         padding    : 2,
         deltaZoom  : -2,
         draggable  : true
      }
      
      var map = {
         views : [{
            config  : mainConfig,
            options : mainOptions,
         },{
            config  : lensConfig,
            options : lensOptions,
         },{
            config  : minifierConfig,
            options : minifierOptions,
         }]
      }
         
      return [map]
   }
   
	//==================================================================//

	App.CartothequeController = CartothequeController;

	//==================================================================//
	// Routing

	App.CartothequeRouting = App.Page.extend({
		route: '/demos',
		
		connectOutlets: function(router){
			App.Router.openPage(router, "cartotheque");
		},

	})

	//==================================================================//

})();

