#elasticGallery

Simple adaptive gallery. Looks great on laptop and mobile device.


INSTALLATION
------------

Connect scripts in the specified sequence:

    <!-- elasticGallery -->
    <link type="text/css" rel="stylesheet" href="path/to/css/elasticGallery.css" />  
    <script type="text/javascript" src="path/to/js/elasticGallery.js"></script>  
    <!-- //elasticGallery -->

QUICK START
-----------

Insert into your HTML markup:

    <div id="elasticGallery" class="elasticGallery">
		<div class="galleryContainer">
			<a href="#"><img src="path/to/image/pic1.jpg"></a>
			<a href="#"><img src="path/to/image/pic2.jpg"></a>
			<a href="#"><img src="path/to/image/pic3.jpg"></a>
			...
		</div>
    </div>

Set the number of rows to display: 
  
    <script type="text/javascript">
		var gallery = elasticGallery({
			'gallery' : document.getElementById('elasticGallery')
		});
    </script>

