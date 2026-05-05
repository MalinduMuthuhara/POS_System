import { order_db, item_db } from '../db/db.js';

class Order {
    #orderId;
    #customerId;
    #date;
    #items;
    #total;

    constructor(orderId, customerId, date, items, total) {
        this.#orderId = orderId;
        this.#customerId = customerId;
        this.#date = date;
        this.#items = items;
        this.#total = total;
    }

    get orderId() { return this.#orderId; }
    get customerId() { return this.#customerId; }
    get date() { return this.#date; }
    get items() { return this.#items; }
    get total() { return this.#total; }
}

export const addOrderData = (orderId, customerId, date, items, total) => {
    let new_order = new Order(orderId, customerId, date, items, total);
    order_db.push(new_order);

    //---Reduce qty--------
    items.forEach(cartItem => {

        let itemObj = item_db.find(i => i.itemId === cartItem.itemId);
        if (itemObj) {
            let currentQty = parseInt(itemObj.quantity);
            let orderQty = parseInt(cartItem.qty);
            itemObj.quantity = currentQty - orderQty;
        }
    });
    return true;
}

export const getAllOrders = () => {
    return order_db;
}