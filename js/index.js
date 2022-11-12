var productName=document.getElementById("productNameInput");
var productType=document.getElementById("productTypeInput");
var productPrice=document.getElementById("productPriceInput");
var productQuantity=document.getElementById("productQuantityInput");
var productsTable =document.getElementById("tableData");
var searchInput=document.getElementById("searchInput");
var productNameAlert = document.getElementById("productNameAlert");
var productNameRegex = /^[A-Z][a-z]{3,6}$/gm;

var productList=[];

if(localStorage.getItem("myProducts")==null){
    productList = [];
}
else{
    productList = JSON.parse(localStorage.getItem("myProducts")); 
}

displayProducts(productList);

function addProduct(){
var product = {
    name:productName.value,
    type:productType.value,
    price:productPrice.value,
    quantity:productQuantity.value
}

productList.push(product);
displayProducts(productList);
clearForm();
localStorage.setItem("myProducts",JSON.stringify(productList));
}

function displayProducts(prodList){

    var htmlString=``;
    for(let i=0 ; i<prodList.length ; i++){

        htmlString += `
        <tr>
        <td>${i+1}</td>
        <td>${prodList[i].name}</td>
        <td>${prodList[i].type}</td>
        <td>${prodList[i].price}</td>
        <td>${prodList[i].quantity}</td>
        <td> <button type="submit" class="btn btn-warning  " onclick=updateProduct(${i})>تعديل</button></td>
        <td><button type="submit" class="btn btn-danger  " onclick=deleteProduct(${i})>حذف</button></td>
    </tr>
        `
    }


    productsTable.innerHTML=htmlString;
}

function searchProduct(){
var searchText = searchInput.value;
var searchResult=[];
for (let i = 0; i < productList.length; i++) {
  if(productList[i].name.toLowerCase().includes(searchText.toLowerCase())){
    searchResult.push(productList[i]);
  }  
    
}
displayProducts(searchResult);
}

function clearForm(){
    productName.value="";
    productType.value="";
    productPrice.value="";
    productQuantity.value="";
}

function deleteProduct(index){
    productList.splice(index,1);
    displayProducts(productList);
    localStorage.setItem("myProducts",JSON.stringify(productList));
}

function validateProductName(){
    if(productNameRegex.test(productName.value)==true){
        productName.classList.remove("is-invalid");
        productNameAlert.classList.replace("d-block","d-none");

    }
    else{
        productName.classList.add("is-invalid");
        productNameAlert.classList.replace("d-none","d-block");
    }
}

productName.addEventListener("blur",validateProductName);
