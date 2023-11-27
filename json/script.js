const Http = new XMLHttpRequest()
const url = 'https://talyafedoriv.github.io/json/example.json';
Http.open("GET", url);
Http.send()
Http.onreadystatechange = (e) => {
    console.log(Http.responseText)
}

const Url = 'https://talyafedoriv.github.io/json/example.json';

fetch(Url)
  .then(response => response.json())
  .then(data => {
    populateHeader(data);
    populateCarousel(data.items);
  })
  .catch(error => console.error(error));

function populateHeader(data) {
  const header = document.querySelector('header');
  const h1 = document.createElement('h1');
  h1.textContent = data.mainName;
  header.appendChild(h1);

  const p = document.createElement('p');
  p.textContent = `${data.location} // ${data.formed} // ${data.type}`;
  header.appendChild(p);
}

function populateCarousel(items) {
  const carousel = document.querySelector('.owl-carousel');

  items.forEach(product => {
    const article = document.createElement('article');
    article.classList.add('productCard');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('imageContainer');

    const image = document.createElement('img');
    image.src = product.imagePath;
    imageContainer.appendChild(image);

    if (product.specialMark === 'Novelty') {
      const specialMark = document.createElement('div');
      specialMark.classList.add('specialMark', 'novelty');
      specialMark.textContent = 'Novelty';
      imageContainer.appendChild(specialMark);
    } else if (product.specialMark === 'Best Seller') {
      const specialMark = document.createElement('div');
      specialMark.classList.add('specialMark', 'bestSeller');
      specialMark.textContent = 'Best Seller';
      imageContainer.appendChild(specialMark);
    }

    article.appendChild(imageContainer);

    const name = document.createElement('h3');
    name.textContent = product.name;
    article.appendChild(name);

    const model = document.createElement('p');
    model.textContent = `${product.model}`;
    article.appendChild(model);

const priceContainer = document.createElement('div');

if (product.discount) {
  const originalPrice = document.createElement('span');
  originalPrice.textContent = `${product.price} `;
  originalPrice.style.textDecoration = 'line-through'; 
  priceContainer.appendChild(originalPrice);

  const discountedPrice = document.createElement('span');
  const discountValue = parseInt(product.discount);
  const originalPriceValue = parseInt(product.price.replace(/\D+/g, '')); 
  const discountedValue = originalPriceValue - (originalPriceValue * discountValue) / 100;
  discountedPrice.textContent = `${discountedValue.toFixed(2)} UAH`;
  discountedPrice.style.fontWeight = 'bold';
  priceContainer.appendChild(discountedPrice);
} else {
  const originalPrice = document.createElement('span');
  originalPrice.textContent = `${product.price}`;
  originalPrice.style.fontWeight = 'bold';
  priceContainer.appendChild(originalPrice);
}

article.appendChild(priceContainer);

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.classList.add('addToCartButton', 'minButton');

    if (product.availability === 'Add to Cart') {
      addToCartButton.textContent = 'Add to Cart';
      addToCartButton.addEventListener('click', () => {
        alert(`Product "${product.name}" added to cart!`);
      });
    } else {
      addToCartButton.textContent = 'Not Yet Available';
      addToCartButton.disabled = true;
    }
    article.appendChild(addToCartButton);

    carousel.appendChild(article);
  });

  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 40,
    nav: true,
     mouseDrag: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      900: {
        items: 4
      }
    },
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>']
  });
}






