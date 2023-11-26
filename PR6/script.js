const header = document.querySelector('header');
const section = document.querySelector('section');

const requestURL = 'https://semegenkep.github.io/json/example.json';

const request = new XMLHttpRequest()
request.open('GET', requestURL)

request.responseType = 'json'
request.send()

request.onload = function () {
    const superHeroes = request.response
    populateHeader(superHeroes)
    showHeroes(superHeroes)
    // console.log(superHeroes)
}

function populateHeader(data) {
  const h1 = document.createElement('h1');
  h1.textContent = data.squadName;
  header.appendChild(h1);

  const p = document.createElement('p');
  p.textContent = `Hometown: ${data.homeTown} // Formed: ${data.formed}`;
  header.appendChild(p);
}

    
function showHeroes(data) {
  const section = document.querySelector('section');

  data.members.forEach((hero) => {
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    const pSecretIdentity = document.createElement('p');
    const pAge = document.createElement('p');
    const pPower = document.createElement('p');
    const ul = document.createElement('ul');

    h2.textContent = hero.name;

    pSecretIdentity.textContent = `Secret Identity: ${hero.secretIdentity}`;
    pAge.textContent = `Age: ${hero.age}`;
    pPower.textContent = `Superpower: `;

    hero.powers.forEach((power) => {
      const li = document.createElement('li');
      li.textContent = power;
      ul.appendChild(li);
    });

    article.appendChild(h2);
    article.appendChild(pSecretIdentity);
    article.appendChild(pAge);
    article.appendChild(pPower);
    article.appendChild(ul);

    section.appendChild(article);
  });
}