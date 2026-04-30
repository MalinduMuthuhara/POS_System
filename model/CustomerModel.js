import { customer_db } from '../db/db.js';

// Customer Model Class
class Customer {
    #id;
    #name;
    #phone;
    #address;

    constructor(id, name, phone, address) {
        this.#id = id;
        this.#name = name;
        this.#phone = phone;
        this.#address = address;
    }

    // Getters
    get id() { return this.#id; }
    get name() { return this.#name; }
    get phone() { return this.#phone; }
    get address() { return this.#address; }

    // Setters
    set id(id) { this.#id = id; }
    set name(name) { this.#name = name; }
    set phone(phone) { this.#phone = phone; }
    set address(address) { this.#address = address; }
}

// --------------------------- Add Customer ---------------------------
const addCustomerData = (id, name, phone, address) => {
    let new_customer = new Customer(id, name, phone, address);
    customer_db.push(new_customer);
}

// --------------------------- Update Customer ---------------------------
const updateCustomerData = (id, name, phone, address) => {
    let obj = customer_db.find(item => item.id == id);

    if(obj) {
        obj.name = name;
        obj.phone = phone;
        obj.address = address;
        return true;
    }
    return false;
}

// --------------------------- Delete Customer ---------------------------
const deleteCustomerData = (id) => {
    let index = customer_db.findIndex(item => item.id == id);

    if(index !== -1) {
        customer_db.splice(index, 1);
        return true;
    }
    return false;
}

// --------------------------- Get All Customers ---------------------------
const getAllCustomerData = () => {
    return customer_db;
}

// --------------------------- Get Customer by ID ---------------------------
const getCustomerById = (id) => {
    return customer_db.find(item => item.id == id);
}

export {
    addCustomerData,
    updateCustomerData,
    deleteCustomerData,
    getAllCustomerData,
    getCustomerById
};