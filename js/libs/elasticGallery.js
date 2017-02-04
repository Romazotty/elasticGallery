/*!
* elasticGallery - Simple adaptive gallery.
*
* @author Romazotty <faker152@mail.ru>
* @license Apache 2.0
* @link https://github.com/Romazotty/elasticGallery
* @version 2.0
*/

function elasticGallery(options){
	var gallery = options.gallery;
	var row = options.row || 3;

	var container = gallery.querySelector('.galleryContainer');

	gallery.onclick = function(e){
		var target = e.target;

		if(target.tagName == 'IMG'){
			if(target.classList.contains('fullImg')){
				var opened = container.querySelector('.isOpen');
				var next = opened.parentNode.nextElementSibling;

				if(next === null) {
					nextImg(container.firstElementChild);
				} else {
					nextImg(next);
				}

				opened.classList.remove('isOpen');
			} else {
				target.classList.add('isOpen');
				openImg(target);
			}
		}

		if(target.classList.contains('wrapperForFullImg')){
			closeImg();
		}
	};

	addWrap(gallery);
	addLoader(container);

	window.onload = function(){
		gentleShow(resizeAllPreview(container));
	};

	/* Подготавливаем контейнер к отображению */
	function prepare(container){
		var containerSide	= container.clientWidth;
		var elemInRow = Math.floor(parseFloat(containerSide / 200)) > 4 ? Math.floor(parseFloat(containerSide / 200)) : 4;
		var elemSide = parseFloat(containerSide / elemInRow).toFixed(5);

		container.style.height = elemSide * row + "px";
		container.querySelectorAll('a').forEach(function(item){
			item.style.width = elemSide + "px";
			item.style.height = elemSide + "px";
		});
	}

	/* Выравниваем все изображения */
	function resizeAllPreview(container){
		prepare(container);

		container.querySelectorAll('a').forEach(function(item){
			item.classList.remove('opened');
			resizePreview(item);
		});

		return container;
	}

	/* Выравниваем одно изображение */
	function resizePreview(link){
		var img = link.querySelector('img');
		var	marginLeft = 0;
		var	marginTop = 0;

		if(img.clientWidth > img.clientHeight){
			img.style.width = "auto";
			img.style.height = "100%";

			setTimeout(function(){
				marginLeft = (img.clientWidth - link.clientWidth) / 2;
				img.style.marginLeft = '-' + marginLeft + 'px';
			}, 10);
		} else if(img.clientWidth < img.clientHeight){
			img.style.width = "100%";
			img.style.height = "auto";

			setTimeout(function(){
				marginTop = (img.clientHeight - link.clientHeight) / 2;
				img.style.marginTop = '-' + marginTop + 'px';
			}, 10);
		} else {
			img.style.width = "100%";
			img.style.height = "100%";
			img.style.margin = "0px";
		}
	}

	/* Плавный показ галереи*/
	function gentleShow(container){
		removeLoader(container);

		container.querySelectorAll('a').forEach(function(item, i){
			setTimeout(function(){
				item.style.opacity = "1";
			},400 + ( i * 100 ));
		});
	}

	/* Добавляем индикатор загрузки */
	function addLoader(container){
		var loader = document.createElement('div');
		loader.setAttribute('id', 'loader-wrapper');
		loader.innerHTML = "<div id='loader'></div>";
		container.insertBefore(loader, container.firstChild);
	}

	/* Удаляем индикатор загрузки */
	function removeLoader(container){
		container.removeChild(container.querySelector('#loader-wrapper'));
	}

	/* Добавляем обертку для большого изображения */
	function addWrap(container){
		var wrapperForFullImg = document.createElement('div');
		wrapperForFullImg.setAttribute('class', 'wrapperForFullImg');

		var fullImg = document.createElement('img');
		fullImg.setAttribute('src', '');
		wrapperForFullImg.appendChild(fullImg);

		container.insertBefore(wrapperForFullImg, container.firstChild);
	}

	function openImg(img){
		var wrapperForFullImg = gallery.querySelector('.wrapperForFullImg');

		var fullImg = gallery.querySelector('.wrapperForFullImg img');
		fullImg.src = img.src;
		fullImg.classList.add('fullImg');

		fullImg.style.height = gallery.clientHeight * 0.8 + "px";
		fullImg.style.width = "auto";
		fullImg.style.marginTop = gallery.clientHeight * 0.1 + "px";

		wrapperForFullImg.style.display = "block";
	}

	/* Следующее изображение */
	function nextImg(link){
		openImg(link.querySelector('img'));
		link.querySelector('img').classList.add('isOpen');
	}

	/* Закрываем большое изображение */
	function closeImg(){
		gallery.querySelector('.wrapperForFullImg').style.display = "none";
	}
}