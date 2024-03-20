document.addEventListener("DOMContentLoaded", function() {
    fetchProducts();
});

function fetchProducts() {
    var apiUrl = 'https://susseye.com/wp-json/wc/v3/products';

    // Replace 'YOUR_CONSUMER_KEY' and 'YOUR_CONSUMER_SECRET' with your actual WooCommerce API keys
    var consumerKey = 'ck_7dcf7142f370e84c400824926770f6df54723c40';
    var consumerSecret = 'cs_3ac4903ca5b2ded1bf3dd8a5b13b3bd434983f02';

    var authString = consumerKey + ':' + consumerSecret;
    var base64AuthString = btoa(authString);

    fetch(apiUrl, {
        headers: {
            'Authorization': 'Basic ' + base64AuthString
        }
    })
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch products. Status code: ' + response.status);
        }
    })
    .then(function(products) {
        displayProducts(products);
    })
    .catch(function(error) {
        console.error(error);
    });
}

function displayProducts(products) {
    var productGrid = document.getElementById("productGrid");

    products.forEach(function(product) {
        var productElement = document.createElement("div");
        productElement.classList.add("product");

        var titleElement = document.createElement("h2");
        titleElement.innerText = product.name; // Use 'name' instead of 'title.rendered' for WooCommerce products
        productElement.appendChild(titleElement);

        var priceElement = document.createElement("p");
        priceElement.innerText = "Price: ₹" + product.price;
        productElement.appendChild(priceElement);

        var descriptionElement = document.createElement("p");
        descriptionElement.innerHTML = product.description.replace(/<!--[\s\S]*?-->/g, ''); // Remove HTML comments
        productElement.appendChild(descriptionElement);

        var imageElement = document.createElement("img");
        if (product.images.length > 0) {
            imageElement.src = product.images[0].src; // Assuming the images are stored in an array called 'images'
            imageElement.alt = product.name; // Use product name as alt text for accessibility
        } else {
            // Set a placeholder image or display a message if no image is available
            imageElement.src = 'placeholder.jpg'; // Replace 'placeholder.jpg' with the path to your placeholder image
            imageElement.alt = 'No Image Available';
        }
        imageElement.classList.add("product-image"); // Add a class to style the image
        productElement.appendChild(imageElement);

        var checkoutButton = document.createElement("a");
        checkoutButton.href = product.permalink; // Use 'permalink' instead of 'checkoutLink' for WooCommerce products
        checkoutButton.innerText = "Checkout";
        checkoutButton.classList.add("checkout-btn");
        productElement.appendChild(checkoutButton);

        productGrid.appendChild(productElement);
    });
}
