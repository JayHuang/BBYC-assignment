Store = (function() {
	// Controller for the store; grabs data from API and updates the view accordingly

	var $navigation;
	var $content;

	this.initialize = function() {
		$navigation = $('navigation')[0];
		$content = $('#content')[0];

		API.getProducts(1, listProductsCallback);
		API.getCategories(listCategoriesCallback);
	}

	function listProductsCallback(products) {
		$content.innerHTML = Mustache.render('<ul>{{#.}} <li class="item" data-id="{{sku}}"><div class="product-image"><img src="' + CONFIG.domain + '{{thumbnailImage}}" title="{{name}}"/></div><div class="price">${{regularPrice}}</div></li>{{/.}}</ul>', products);

		$('.item').on('click', showProductDetails);
	}

	function listCategoriesCallback(categories) {
		$navigation.innerHTML = Mustache.render('<ul>{{#.}}<li id="category{{id}}" class="category" data-id="{{id}}"><div class="title">{{name}}</div></li>{{/.}}</ul>', categories);

		$('.category').on('click', listProductsInCategory);
	}

	function listProductsInCategory() {
		var categoryId = $(this).attr('data-id');
		API.getProducts(categoryId, listProductsCallback);
	}

	function showProductDetails() {
		var sku = $(this).attr('data-id');
		console.log(sku);

		API.getProductDetails(sku, function(details) {
			details.domain = CONFIG.domain;
			console.log(details);
			window.a = details;
			var $productDetails = $('#productDetails')[0];
			var renderedTemplate = Mustache.render($productDetails.innerHTML, details);
			Modal.open({content: renderedTemplate, width: '500px'});
		});
	}

	return this;
})();