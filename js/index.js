document.getElementById('error-message').style.display = 'none';

// let isLoading = false;

const spinner = displaySpinner =>{
    document.getElementById('spinner').style.display = displaySpinner;
}
const displayResult = result =>{
    document.getElementById('search-result').style.display = result;
}
// document.getElementById('search-result').style.display = 'none';
const loadApiData = data =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const productDetails = document.getElementById('product-details');
    productDetails.textContent = '';
    spinner('block');
    // displayResult('none');
    document.getElementById('error-message').style.display = 'none';
    if (searchText == '') {
        document.getElementById('error-message').style.display = 'block';
    }
    else {
    
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data))
    }

}
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}
const displaySearchResult = products => {
    console.log(products.length)
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    
    if (products.length == 0) {
        document.getElementById('error-message').style.display = 'block';
    }
    
    products.slice(0,20).forEach(product => {
        console.log(product);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card d-flex align-items-center justify-content-center my-3">
            <img src="${product.image}" class="card-img-top mt-3" alt="...">
            <div class="card-body">
                <h5 class="card-title">${product.phone_name}</h5>
                <p class="card-text">${product.brand}</p>
                <button onclick="loadProductDetail('${product.slug}')" class="bg-primary text-light">Details</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
    spinner('none');
    // displayResult('block');
  
}


const loadProductDetail = id => {
    console.log(id)
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayproductDetail(data.data));
//         .then(data => console.log(data.data));
  }

const displayproductDetail = product => {
    console.log(product);
    const productDetails = document.getElementById('product-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <div class="d-flex flex-column align-items-center justify-content-center my-3 ">
    <img src="${product.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${product.releaseDate ? product.releaseDate : 'Release date is not available'}</h5>
        <p class="card-text">${product.name}</p>
        <h5>Main-Features are: </h5>
        <p class="card-text">${product.mainFeatures.chipSet}</p>
        <p class="card-text">${product.mainFeatures.displaySize}</p>
        <p class="card-text">${product.mainFeatures.memory}</p>
        <p class="card-text">${product.mainFeatures.storage}</p>
        <p class="card-text">${product.mainFeatures.sensors[0]}</p>
        <p class="card-text">${product.mainFeatures.sensors[1]}</p>
        <p class="card-text">${product.mainFeatures.sensors[2]}</p>
        <p class="card-text">${product.mainFeatures.sensors[3]}</p>
        <p class="card-text">${product.mainFeatures.sensors[4]}</p>
        <p class="card-text">${product.mainFeatures.sensors[5]}</p>
        <h5>Others are: </h5>
        <p class="card-text">${product.others.WLAN}</p>
        <p class="card-text">${product.others.Bluetooth}</p>
        <p class="card-text">${product.others.GPS}</p>
        <p class="card-text">NFC: ${product.others.NFC}</p>
        <p class="card-text">Radio: ${product.others.Radio}</p>
        <p class="card-text">${product.others.USB}</p>
  
    </div>
    </div>
    `;
    productDetails.appendChild(div);


}



