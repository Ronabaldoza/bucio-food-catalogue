const apiUrl = 'data.json';

// Inline CSS styles
const productCardStyles = `
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

async function fetchAndDisplayProducts() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const productList = document.getElementById('product');

        productList.innerHTML = '';

        // Create flex container for product cards
        const flexContainer = document.createElement('div');
        flexContainer.classList.add('d-flex', 'flex-wrap'); // Add Flexbox classes

        data.forEach(product => {
            const productCard = document.createElement('div');
            productCard.style.cssText = productCardStyles; // Apply inline styles
            productCard.classList.add('product-card', 'col-md-4', 'mb-3'); // Added Bootstrap grid class and margin

            const productName = document.createElement('h2');
            productName.textContent = product.name;

            const productDate = document.createElement('p');
            productDate.textContent = product['date-added']; // Accessing 'date-added' property using square brackets

            const productDescrip = document.createElement('p');
            productDescrip.textContent = `Description: ${product.description}`;

            const productPrice = document.createElement('p');
            productPrice.textContent = `Price: $${product.price}`;

            const buyButton = document.createElement('button');
            buyButton.classList.add('btn', 'btn-primary');
            buyButton.textContent = 'Add to Cart'; // Button text

            const clickCountSpan = document.createElement('span');
            clickCountSpan.textContent = '0'; // Initial click count
            clickCountSpan.style.marginLeft = '5px'; // Add margin for separation

            let clickCount = 0; // Counter for click events
            buyButton.addEventListener('click', () => {
                clickCount++;
                clickCountSpan.textContent = clickCount; // Update click count text
            });

            // Append elements to product card
            productCard.appendChild(productName);
            productCard.appendChild(productDescrip);
            productCard.appendChild(productPrice);
            productCard.appendChild(productDate);
            productCard.appendChild(buyButton);
            productCard.appendChild(clickCountSpan);

            flexContainer.appendChild(productCard); // Append product card to flex container
        });

        productList.appendChild(flexContainer); // Append flex container to product list
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchAndDisplayProducts();
