const apiUrl = 'data.json';

async function fetchAndDisplayProducts() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const productList = document.getElementById('product');

        productList.innerHTML = '';

        data.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const productName = document.createElement('h3');
            productName.textContent = product.name;
            
            const productDate = document.createElement('h4');
            productName.textContent = product.date-added;

            const productDescrip = document.createElement('h2');
            productName.textContent = product.description;

            const productPrice = document.createElement('p');
            productPrice.textContent = `Price: $${product.price}`;

            productCard.appendChild(productName);
            productCard.appendChild(productPrice);

            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchAndDisplayProducts();