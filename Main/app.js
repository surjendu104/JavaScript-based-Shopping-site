let shop = document.getElementById("shop")
console.log(shop)

let busket = JSON.parse(localStorage.getItem("Data")) || []



let generateShop = () => {
    return (shop.innerHTML = shopItemsData.
        map((x) => {
            let { id, name, price, desc, img } = x
            let search = busket.find((x) => x.id === id) || []
            return `
        <div id=product-id-${id} class="item">
        <img width="246.5" src="${img}" alt="">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>${"$" + price}</h2>
                <div class="button">
                    <i onclick = "decrement(${id})" class="bi bi-dash"></i>
                    <div id = ${id} class="quantity">
                    ${search.item === undefined ? 0 : search.item}
                    </div>
                    <i onclick = "inceremnt(${id})"class="bi bi-plus"></i>
                </div>
            </div>
        </div>
    </div>
        `
        }).join(""))
};

generateShop()

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
    localStorage.setItem("Data", JSON.stringify(busket))
};
let update = (id) => {
    let search = busket.find((x) => x.id === id)
    console.log(search.item)
    document.getElementById(id).innerHTML = search.item
    updateCart()
}

let updateCart = (id) => {
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = busket.map((x) => x.item).reduce((x, y) => x + y, 0)
}

updateCart()

