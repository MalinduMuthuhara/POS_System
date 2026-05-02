import {order_db} from '../db/db.js';
import {item_db} from '../db/db.js';

class Order{
    #orderId;
    #customerId;
    #date;
    #items;
    #total;

    constructor(orderId,customerId,date,items,total) {
        this.#orderId=orderId;
        this.#customerId=customerId;
        this.#date=date;
        this.#items=items;
        this.#total=total;
    }

}