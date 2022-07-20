const printOrders = orders => {
    orders.sort((a, b) => {
        if (a.date > b.date) {
            return -1
        } else if (a.date < b.date) {
            return 1
        } else {
            return 0
        }
    });
    construct(orders);      
}

const construct = orders => {
    for (const order of orders) {

        const div$$ = document.createElement('div');
    
        let text = `
            <h2>Product number ${order.id}</h2>
            <h3>Date: ${order.date}</h3>
        `
    
        const printProducts = (products) => {
            text += `<p>${products.name}</p><p>Cantidad: ${order.products[0].quantity}</p>`;
            console.log(text)
            div$$.innerHTML = text;
        }
        
        fetch(`http://localhost:3000/products/${order.products[0].productId}`)
            .then(res => res.json())
            .then(printProducts)
        
    
        document.body.appendChild(div$$)
    }
}


fetch('http://localhost:3000/orders')
    .then(res => res.json())
    .then(printOrders);
