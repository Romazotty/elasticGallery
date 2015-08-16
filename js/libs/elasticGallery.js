(function( $ ) {
    var defaults = {
        'row' : '2'
    };

	var methods = {

	    init:function(params) {
	        if (params) {
	        	$.extend(defaults, params);
	        }

	        this.prepend('<div id="loader-wrapper"><div id="loader"></div></div>');				
	        methods.preparation(this);
	        return 	this.each(function(){
	         			$(window).one('load', {item: $(this)}, function(event) {
	         				methods.gentlyShow(methods.resizePicture(event.data.item));
	         			});
	         			$(window).on('resize', {item: $(this)}, function(event) {
	         				methods.resizePicture(event.data.item);
	         			});
	         		});
	    },

	    preparation: function(self){
	    	var containerSide  	= self.width(),
	            elemInRow       = Math.floor(parseFloat(containerSide / 200)) > 4 ? Math.floor(parseFloat(containerSide / 200)) : 4,
	            elemSide       	= parseFloat(containerSide / elemInRow).toFixed(5);

	            console.log(containerSide);

			self.css({
				'height': elemSide * defaults.row
			});

			self.find('a').css({
			    'width': elemSide, 
        		'height': elemSide
			}); 			
	    },

	    resizePicture: function(self){
	    	methods.preparation(self);
			self.find('a').each(function(){
		    	var container	= $(this),
		    		picture 	= container.find('img'), 
		    		marginLeft 	= 0,
		    		marginTop 	= 0;

		    	if(picture[0].width > picture[0].height){
	                picture.css({'width': 'auto', 'height': '100%'});  
	                setTimeout(function(){
	                	marginLeft  = (picture[0].width - container.width()) / 2;     
	                	picture.css({'margin-left': '-' + marginLeft + 'px'}); 
	                }, 150);            
	            }

	            if(picture[0].width < picture[0].height){
	                picture.css({'width': '100%', 'height': 'auto'});  
	                setTimeout(function(){                        
		                marginTop   = (picture[0].height - container.height()) / 2;
		                picture.css({'margin-top': '-' + marginTop + 'px'});
	                }, 150);            
	            }

	            if(picture[0].width == picture[0].height){
	                picture.css({
	                    'width': '100%', 
	                    'height': '100%', 
	                    'margin': '0px'
	                });
	            }
	        });

			return self;
	    },

	    gentlyShow: function(self){
	    	self.find('#loader-wrapper').remove();
	    	$.each(self.find('a'), function(i, elem){   
			    setTimeout(function(){
			       $(elem).animate({'opacity': '1'}, 2000);
			    },400 + ( i * 100 ));
			});
	    }, 
	};
	 
	$.fn.elasticGallery = function(method){
	    if ( methods[method] ) {
	        // если запрашиваемый метод существует, мы его вызываем
	        // все параметры, кроме имени метода прийдут в метод
	        // this так же перекочует в метод
	        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	        // если первым параметром идет объект, либо совсем пусто
	        // выполняем метод init
	        return methods.init.apply( this, arguments );
	    } else {
	        console.log( 'Метод "' +  method + '" не найден в плагине jQuery.mySimplePlugin' );
	    }
	};
})(jQuery);