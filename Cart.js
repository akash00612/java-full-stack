 let label = document.getElementById('label');

 let shoppingcart = document.getElementById('shoppingcart');
 console.log(shopItemsData);
 let basket = JSON.parse(localStorage.getItem("data"))||[];
 
let calculation = ()=>{
    let cartIcon=document.getElementById("cartamount");
    cartIcon.innerHTML="100";
    cartIcon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
}

calculation();

let generateCartItems = ()=>{
    if(basket.length!==0){
        return(shoppingcart.innerHTML=basket.map((x)=>{
            let{id,item}=x;
            let search = shopItemsData.find((y)=>y.id===id)||[];
            return `
            <div class="cart-Item">
               <img width="100" src=${search.img}>
               <div class="details">
                 <div class="title-price-x">
                    <h4 class="title-price">
                       <p>${search.name}</p>
                       <p class="cart-item-price">Rs.${search.price}</p>
                    </h4>
                    <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                 </div>
                <div class="buttons">
                     <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                     <div id=${id} class="quantity">${item}</div>
                     <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
                <h3>Rs.${item*search.price}</h3>
               </div>
            </div>
            `
        }).join(""));
    }

    else{
        shoppingcart.innerHTML=``;
        label.innerHTML=`
        <h2>Cart Is Empty</h2>
        <a href ="index.html">
        <button class="homebtn"><span></span>Back To Home</button>
        </a>
        `;
    }
};

generateCartItems();

let increment = ()=>{
    let selectedItem=id;
    let search=basket.find((x)=>x.id===selectedItem.id);
    if(search===undefined){
        basket.push({
            id:selectedItem.id,
            item:1
        });
    }
    else{
        search.item+=1;
    }
    generateCartItems();

    update(selectedItem.id);

    localStorage.setItem("data",JSON.stringify(basket));
}

let decrement = ()=>{
    let selectedItem = id;
    let search = basket.find((x)=>x.id===selectedItem.id);
    if(search===undefined)
    return
    else if(search.item===0)
    return
    else{
        search.item-=1;
    }

    update(selectedItem.id);
    basket=basket.filter((x)=>x.item!==0);

    generateCartItems();

    localStorage.setItem("data",JSON.stringify(basket));
}

let update = (id)=>{
    let search = basket.find((x)=>x.id===id);
    document.getElementById(id).innerHTML=search.item;

    calculation();
    totalamount();
}

let removeItem=(id)=>{
    let selectedItem=id;
    basket=basket.filter((x)=>x.id!==selectedItem.id);

    generateCartItems();
    totalamount();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
}

let clearcart=()=>{
    basket=[];
    generateCartItems();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
}

let totalamount = ()=>{
    if(basket.length!==0){
        let amount = basket.map((x)=>{
            let{item,id}=x;
            let search = shopItemsData.find((y)=>y.id===id)||[];
            return item*search.price;
        }).reduce((x,y)=>x+y,0);
        label.innerHTML=`
          <h2>Total Bill:Rs.${amount}</h2>
          <button class="checkout" onclick="checkout()"><span></span>Checkout</button>
          <button class="removeall" onclick="clearcart()"><span></span>Clear Cart</button>
        `
    }
    else return
}

totalamount();

let checkout=()=>{
    clearcart();
    label.innerHTML=`<h2>Thank You Visit Again</h2>
    <a href ="index.html">
        <button class="homebtn"><span></span>Back To Home</button>
        </a>`
}