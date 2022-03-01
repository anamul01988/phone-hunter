document.getElementById('error-message').style.display = 'none';
const loadApiData = data =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if (searchText == '') {
        // please write something to display
  
        document.getElementById('error-message').style.display = 'block';

    }
    else {
        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data))
            // .then(data => console.log(data.data))
            // .catch(error => displayError(error));
    }
}
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}


// const displayData = displayData =>{

//     displayData.forEach(element => {
//         console.log(element)
//         const dataDetails = document.getElementById('data-details');
//         const div = document.createElement('div');
//         div.classList.add('card');
//         div.innerHTML = `
//         <img src="${element.image}" class="card-img-top" alt="...">
//         <div class="card-body">
//             <h5 class="card-title">${element.phone_name}</h5>
//             <p class="card-text">${element.brand.slice(0, 150)}</p>
//              <a href="${element.phone_name}" class="btn btn-primary">Go somewhere</a>
//         </div>
//         `;
//         dataDetails.appendChild(div)
//     });
// }
// loadApiData();
const displaySearchResult = products => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (products.length == 0) {
        document.getElementById('error-message').style.display = 'block';
    }
    products.forEach(product => {
        console.log(product);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 d-flex flex-direction-column align-items-center justify-content-center my-3">
            <img src="${product.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${product.phone_name}</h5>
                <p class="card-text">${product.brand.slice(0, 200)}</p>
                <button onclick="loadProductDetail('${product.slug}')" class="bg-primary text-light">Details</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
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
    <img src="${product.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${product.releaseDate}</h5>
        <p class="card-text">${product.name}</p>
        <p class="card-text">${product.mainFeatures.chipSet}</p>
        <p class="card-text">${product.mainFeatures.displaySize}</p>
        <p class="card-text">${product.mainFeatures.memory}</p>
  
    </div>
    `;
    productDetails.appendChild(div);
}

{/* <button onclick="featuresDetail('${product.mainFeatures}')" class="btn btn-primary">Go Feature</button> */}


// const featuresDetail = details =>{
//     console.log(details)
//     const featureDetails = document.getElementById('feature-details');
//     const div = document.createElement('div');
//     div.classList.add('card');
//     div.innerHTML = `
//         <h5 class="card-title">${details.name}</h5>
//         <p class="card-text">${details.chipSet}</p>
//         <p class="card-text">${details.displaySize}</p>
//         <p class="card-text">${details.memory}</p>
//     </div>
//     `;
//     featureDetails.appendChild(div);
// }


