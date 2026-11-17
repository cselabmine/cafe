
let cart = [];

function addCart(name, price) {
    let item = cart.find(p => p.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
    alert(name + " added to cart!");
}

function updateCart() {
    let count = 0;
    let total = 0;

    cart.forEach(item => {
        count += item.quantity;
        total += item.price * item.quantity;
    });

    document.getElementById("count").innerText = count;
    document.getElementById("total").innerText = total;

    let html = "";

    if (cart.length === 0) {
        html = "<p>Your cart is empty!</p>";
    }

    cart.forEach((item, index) => {
        html += `
            <div class="cart-row">
                <span>${item.name} x ${item.quantity}
                <br>₹${item.price * item.quantity}</span>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    document.getElementById("cartItems").innerHTML = html;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function openCart() {
    document.getElementById("cartModal").style.display = "flex";
    updateCart();
}

function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    alert("Thank you for shopping at MY CAFE!\nYour total bill is ₹" + total);

    cart = [];
    updateCart();
    closeCart();
}
