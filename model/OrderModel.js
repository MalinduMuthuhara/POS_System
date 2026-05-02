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

    //Getters
    get orderId(){ return this.#orderId; }
    get customerId(){ return this.#customerId; }
    get date(){ return this.#date; }
    get items(){ return this.#items; }
    get total(){ return this.#total; }

    //setters
    set orderId(orderId){this.#orderId=orderId;}
    set customerId(customerId){this.#customerId=customerId;}
    set date(date){this.#date=date;}
    set items(items){this.#items=items;}
    set total(total){this.#total=total;}

}