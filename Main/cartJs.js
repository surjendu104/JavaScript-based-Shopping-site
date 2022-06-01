let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')

console.log(shopItemsData)

let busket = JSON.parse(localStorage.getItem("Data")) || []


console.log(busket)

let updateCart = (id) => {
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = busket.map((x) => x.item).reduce((x, y) => x + y, 0)
}

updateCart()



let generateCartItem = () => {
    if (busket.length !== 0) {
        return shoppingCart.innerHTML = busket.map((x) => {
            let { id, item } = x
            let search = shopItemsData.find((y) => y.id === id) || []
            let { img, name, price } = search
            return `
            <div class="cart-item">
                <img width = "100" src="${img}" alt="">
                <div class="details">
            <div class="title-price-x">
                <h4 class ="title-price">
                    ${name}
                    <p class ="cart-item-price">$ ${price}</p>
                </h4>
                <i onclick ="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>
            <div class="button">
                    <i onclick = "decrement(${id})" class="bi bi-dash"></i>
                    <div id = ${id} class="quantity">${item}</div>
                    <i onclick = "inceremnt(${id})"class="bi bi-plus"></i>
                </div>
            <h3>$ ${item * price}</h3>
        </div>
            </div>
            `
        })
            .join("")
    }
    else {
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="HomeBtn">Back to Home</button>
        </a>
        `
    }
}

let inceremnt = (id) => {
    let selectedId = id;
    let search = busket.find((x) => x.id === selectedId.id);
    if (search === undefined) {

        busket.push({
            id: selectedId.id,
            item: 1
        })
    }
    else {
        search.item += 1
    }
    // console.log(busket)
    generateCartItem()
    update(selectedId.id)
    localStorage.setItem("Data", JSON.stringify(busket))
};

let decrement = (id) => {
    let selectedId = id;
    let search = busket.find((x) =>
        x.id === selectedId.id
    )

    if (search === undefined) return
    if (search.item === 0) return
    else {
        search.item -= 1
    }
    // console.log(busket)
    update(selectedId.id)
    busket = busket.filter((x) => x.item !== 0)
    generateCartItem()

    localStorage.setItem("Data", JSON.stringify(busket))
};

let update = (id) => {
    let search = busket.find((x) => x.id === id)
    console.log(search.item)
    document.getElementById(id).innerHTML = search.item
    updateCart()
    totalAmount()
}


generateCartItem()

let removeItem = (id) => {
    let selectedItem = id;
    busket = busket.filter((x) => x.id !== selectedItem.id)
    generateCartItem()
    totalAmount()
    updateCart()
    localStorage.setItem("Data", JSON.stringify(busket))
}

let clearCart = () => {
    busket = []
    generateCartItem()
    updateCart()

    localStorage.setItem("Data", JSON.stringify(busket))

}

let totalAmount = () => {
    if (busket.length1 !== 0) {
        let amount = busket.map((x) => {
            let { item, id } = x;
            let search = shopItemsData.find((y) => y.id === id) || []
            return item * search.price
        }).reduce((x, y) => x + y, 0)
        // console.log(amount)
        label.innerHTML = `
        <h2>Total Bill : $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
    }
    else return
}
totalAmount()


