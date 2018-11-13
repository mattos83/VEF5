// const API_URL = '/example.json?domain=';
const API_URL = 'https://apis.is/isnic?domain=';

document.addEventListener('DOMContentLoaded', () => {
    const domains = document.querySelector('.domains');

    program.init(domains);
  });

/**
 * Leit að lénum á Íslandi gegnum apis.is
 */
const program = (() => {
  let domains;

  function displayDomain(domainsList){

    if(domainsList.length == 0){

        displayError('Fann ekki slóð');
        return;
    }

    const [{address}] = domainsList;

    const dl = document.createElement('dl');
    
    const addressElement = document.createElement('dt');
    addressElement.appendChild(document.createTextNode('Address:'));
    dl.appendChild(addressElement);

    const addressValueElement = document.createElement('dd');
    addressValueElement.appendChild(document.createTextNode(address));
    dl.appendChild(addressValueElement);

    

    const container = domains.querySelector('.results');

    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
    container.appendChild(dl);
  }

  function displayError(error){

    const container = domains.querySelector('.results');

    while(container.firstChild){
        container.removeChild(container.firstChild);
    }

    container.appendChild(document.createTextNode(error));
  }

  function fetchData(dom){

    fetch(`${API_URL}${dom}`)
    .then((response)=>{
        if(response.ok){
            return response.json();
        }
        throw new Error('Villa');
    })
    .then((data)=>{
        displayDomain(data.results);
        console.log(data);
    })
    .catch((error)=>{
        displayError('Villa!');
        console.error(error);
    })
  }

  function onSubmit(e){
      e.preventDefault();
      const input = e.target.querySelector('input');
      console.log(input.value);

      fetchData(input.value);
  }

  function init(_domains) {
    domains = _domains;

    const form = domains.querySelector('form');
    form.addEventListener('submit', onSubmit) ;

  }

  return {
    init,
  };
})();

