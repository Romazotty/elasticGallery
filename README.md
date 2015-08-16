#elasticGallery

Simple adaptive gallery. Looks great on laptop and mobile device.


INSTALLATION
------------

Connect scripts in the specified sequence:

    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>  

    <!-- elasticGallery -->
    <link type="text/css" rel="stylesheet" href="path/to/css/elasticGallery.css" />  
    <script type="text/javascript" src="path/to/js/elasticGallery.js"></script>  
    <!-- //elasticGallery -->

QUICK START
-----------

Insert into your HTML markup:

    <div id="elasticGallery">
        <a href="some/link"><img src="path/to/image/pic1.jpg"></a>
        <a href="some/link"><img src="path/to/image/pic2.jpg"></a>
        <a href="some/link"><img src="path/to/image/pic3.jpg"></a>
        ...
    </div>

Set the number of rows to display: 
  
    <script type="text/javascript">
      $(document).ready(function(){
        $('#elasticGallery').elasticGallery({
          row: '3'
        });
      });
    </script>

