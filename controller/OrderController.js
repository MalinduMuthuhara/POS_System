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

// ------------------------- Add to Cart ------------------------------
$('#btn_add_cart').on('click', function () {
    let itemId = $('#order_item_select').val();
    let qty = parseInt($('#order_qty').val());
    let price = parseFloat($('#order_item_price').val());

    if (!itemId || isNaN(qty) || qty <= 0) {
        showAlert("Please enter a valid quantity!", "warning");
        return;
    }

    let item = item_db.find(i => i.itemId == itemId);
    if (qty > item.quantity) {
        showAlert("Insufficient stock! Available: " + item.quantity, "danger");
        return;
    }

    let cartItem = {
        itemId: itemId,
        name: item.itemName,
        unitPrice: price,
        qty: qty,
        total: price * qty
    };

    cart.push(cartItem);
    updateTotal();
    $('#order_qty').val("");
    showAlert("Item added to cart", "info");
});

// ------------------------- Update Total ------------------------------
function updateTotal() {
    let total = 0;
    cart.forEach(item => total += item.total);
    $('#total_display').text(total.toFixed(2));
}

// ------------------------- Purchase Order ------------------------------
$('#btn_purchase').on('click', function () {
    let orderId = $('#order_id').val();
    let customerId = $('#order_cust_select').val();
    let date = new Date().toISOString().split('T')[0];
    let total = parseFloat($('#total_display').text());

    if (!customerId || cart.length === 0) {
        showAlert("Please select a customer and items!", "danger");
        return;
    }

    if (addOrderData(orderId, customerId, date, cart, total)) {
        showAlert("Order Placed Successfully!", "success");
        cart = [];
        updateTotal();
        loadOrderDetails();
        loadOrderHistory();
    }
});
// ------------------------- Load Order History ------------------------------

export function loadOrderHistory() {
    let allOrders = getAllOrders();
    let tableBody = $('#order_history_table_body');
    tableBody.empty();

    allOrders.forEach(order => {
        tableBody.append(`<tr>
            <td>${order.orderId}</td>
            <td>${order.customerId}</td>
            <td>${order.date}</td>
            <td>${order.total.toFixed(2)}</td>
        </tr>`);
    });
}
$('#nav_order_history').on('click', function() {
    loadOrderHistory();
});
