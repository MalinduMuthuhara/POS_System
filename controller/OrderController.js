import { addOrderData, getAllOrders } from '../model/OrderModel.js';
import { customer_db, item_db } from '../db/db.js';

let cart = [];

$(document).ready(function () {
    loadOrderDetails();
    loadOrderHistory();
});

// ------------------------- Alert Function ------------------------------
function showAlert(message, type) {
    const alertPlaceholder = $('#alert_container');
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show shadow" role="alert">
           <div>${message}</div>
           <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    alertPlaceholder.append(alertHtml);

    setTimeout(() => {
        $(".alert").fadeOut('slow', function() { $(this).remove(); });
    }, 3000);
}

// ------------------------- Load Selectors and Order ID ------------------------------
export function loadOrderDetails() {
    //-----------Load Customers to Select------------------------------------------
    $('#order_cust_select').empty().append('<option selected disabled>Select Customer</option>');
    customer_db.forEach(cust => {
        $('#order_cust_select').append(`<option value="${cust.id}">${cust.id} - ${cust.name}</option>`);
    });

    //----------------------Load Items to Select-----------------------------------------------
    $('#order_item_select').empty().append('<option selected disabled>Select Item</option>');
    item_db.forEach(item => {
        $('#order_item_select').append(`<option value="${item.itemId}">${item.itemId} - ${item.itemName}</option>`);
    });

    //--------Generate Next Order ID----------------
    let nextId = getAllOrders().length + 1;
    $('#order_id').val("ORD-" + nextId.toString().padStart(3, '0'));
}

// ------------------------- Item Selection Change Event ------------------------------
$('#order_item_select').on('change', function() {
    let selectedId = $(this).val();
    let item = item_db.find(i => i.itemId == selectedId);
    if(item) {
        $('#order_item_price').val(item.unitPrice);
        $('#order_qty').attr("placeholder", "Available: " + item.quantity);
    }
});

