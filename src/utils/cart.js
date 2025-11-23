export function loadCart() {
    let cartString = localStorage.getItem("cart"); //"[item1,item2]"

    if (cartString == null) {
        localStorage.setItem("cart", "[]");
        cartString = "[]";
    }

    const cart = JSON.parse(cartString);

    return cart;

}

export function addToCart(product, quantity) {
    const cart = loadCart();

    const existingItemIndex = cart.findIndex(
        (item) => {
            return item.product.productID == product.productID;
        }
    );

    if (existingItemIndex == -1) {

        if (quantity < 1) {
            console.log("Quantity must be at least 1 to add a new item to the cart.");
            return;
        }

        const cartItem = {
            productID: product.productID,
            name: product.name,
            price: product.price,
            labelledPrice: product.labelledPrice,
            quantity: quantity,
            image: product.images[0]
        }

        cart.push(cartItem);

    } else {

        const existingItem = cart[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;

        if (newQuantity < 1) {
            cart = cart.filter(
                (item) => {
                    return item.productID != product.productID
                }
            )
        } else {
            existingItem.quantity = newQuantity;
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));

}