import { addItemData, updateItemData, deleteItemData, getAllItemData } from '../model/ItemModel.js';
import { loadOrderDetails } from "./OrderController.js";

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

const loadItemTbl = () => {
    $('#item_table_body').empty();
    let items = getAllItemData();

    items.forEach((item) => {
        let new_row = `<tr>
            <td>${item.itemId}</td>
            <td>${item.itemName}</td>
            <td>${item.unitPrice}</td>
            <td>${item.quantity}</td>
        </tr>`;
        $('#item_table_body').append(new_row);
    });
}

$(document).ready(() => {
    loadItemTbl();
});

const cleanItemForm = () => {
    $('#item_id_input').val("");
    $('#item_name_input').val("");
    $('#item_price_input').val("");
    $('#item_qty_input').val("");
}
//--------------------Row Click------------------------------------------
$('#item_table_body').on('click', 'tr', function () {
    let id = $(this).find('td:first').text();
    let items = getAllItemData();
    let item = items.find(i => i.itemId == id);

    if (item) {
        $('#item_id_input').val(item.itemId);
        $('#item_name_input').val(item.itemName);
        $('#item_price_input').val(item.unitPrice);
        $('#item_qty_input').val(item.quantity);
    }
});

//----------------------Item Save------------------------------------------------
$('#btn_save_item').on('click', function () {
    let itemId = $('#item_id_input').val();
    let itemName = $('#item_name_input').val();
    let unitPrice = $('#item_price_input').val();
    let quantity = $('#item_qty_input').val();

    if (itemId == "") {
        showAlert("Invalid Item ID!", "danger");
    } else if (getAllItemData().find(item => item.itemId == itemId)) {
        showAlert("Item ID Already Exists!", "danger");
    } else if (itemName == "") {
        showAlert("Invalid Item Name!", "danger");
    } else if (unitPrice == "" || unitPrice <= 0) {
        showAlert("Invalid Unit Price!", "danger");
    } else if (quantity == "" || quantity < 0) {
        showAlert("Invalid Quantity!", "danger");
    } else {
        addItemData(itemId, itemName, unitPrice, quantity);
        loadItemTbl();
        loadOrderDetails();
        cleanItemForm();
        showAlert("Item Saved Successfully!", "success");
    }
});

//--------------------------Item Update---------------------------------------------
$('#btn_update_item').on('click', function () {
    let itemId = $('#item_id_input').val();
    let itemName = $('#item_name_input').val();
    let unitPrice = $('#item_price_input').val();
    let quantity = $('#item_qty_input').val();

    if (updateItemData(itemId, itemName, unitPrice, quantity)) {
        loadItemTbl();
        loadOrderDetails();
        cleanItemForm();
        showAlert("Item Updated Successfully!", "success");
    } else {
        showAlert("Please select a valid item to update!", "warning");
    }
});

//-------------------------Item Delete--------------------------------------------
$('#btn_delete_item').on('click', function () {
    let itemId = $('#item_id_input').val();

    if (confirm("Are you sure you want to Delete this Item?")) {
        if (deleteItemData(itemId)) {
            loadItemTbl();
            loadOrderDetails();
            cleanItemForm();
            showAlert("Item Deleted Successfully!", "success");
        } else {
            showAlert("Please Select an Item First!", "warning");
        }
    }
});