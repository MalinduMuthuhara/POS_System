import { item_db } from '../db/db.js';

// Item Model Class
class Item {
    #itemId;
    #itemName;
    #unitPrice;
    #quantity;

    constructor(itemId, itemName, unitPrice, quantity) {
        this.#itemId = itemId;
        this.#itemName = itemName;
        this.#unitPrice = unitPrice;
        this.#quantity = quantity;
    }

    // Getters
    get itemId() { return this.#itemId; }
    get itemName() { return this.#itemName; }
    get unitPrice() { return this.#unitPrice; }
    get quantity() { return this.#quantity; }

    // Setters
    set itemId(itemId) { this.#itemId = itemId; }
    set itemName(itemName) { this.#itemName = itemName; }
    set unitPrice(unitPrice) { this.#unitPrice = unitPrice; }
    set quantity(quantity) { this.#quantity = quantity; }
}

// --------------------------- Add Item ---------------------------
const addItemData = (itemId, itemName, unitPrice, quantity) => {
    let new_item = new Item(itemId, itemName, unitPrice, quantity);
    item_db.push(new_item);
}

// --------------------------- Update Item ---------------------------
const updateItemData = (itemId, itemName, unitPrice, quantity) => {
    let obj = item_db.find(item => item.itemId == itemId);

    if (obj) {
        obj.itemName = itemName;
        obj.unitPrice = unitPrice;
        obj.quantity = quantity;
        return true;
    }
    return false;
}

// --------------------------- Delete Item ---------------------------
const deleteItemData = (itemId) => {
    let index = item_db.findIndex(item => item.itemId == itemId);

    if (index !== -1) {
        item_db.splice(index, 1);
        return true;
    }
    return false;
}

// --------------------------- Get All Items ---------------------------
const getAllItemData = () => {
    return item_db;
}

// --------------------------- Get Item by ID ---------------------------
const getItemById = (itemId) => {
    return item_db.find(item => item.itemId == itemId);
}

export {
    addItemData,
    updateItemData,
    deleteItemData,
    getAllItemData,
    getItemById
};