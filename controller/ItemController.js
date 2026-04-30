import { item_db } from '../db/db.js';

//------------------------- Load Item Table ------------------------------
const loadItemTbl = () => {
    $('#item_table_body').empty();

    item_db.map((item, index) => {
        let new_row = `<tr data-index="${index}">
            <td>${item.itemId}</td>
            <td>${item.itemName}</td>
            <td>${item.unitPrice}</td>
            <td>${item.quantity}</td>
        </tr>`;
        $('#item_table_body').append(new_row);
    });
}

//------------------------- Clean Item Form ------------------------------
const cleanItemForm = () => {
    $('#item_id_input').val("");
    $('#item_name_input').val("");
    $('#item_price_input').val("");
    $('#item_qty_input').val("");
}

//------------------------- Click on Item Row ------------------------------
$('#item_table_body').on('click', 'tr', function () {
    let item_obj = item_db[$(this).index()];

    $('#item_id_input').val(item_obj.itemId);
    $('#item_name_input').val(item_obj.itemName);
    $('#item_price_input').val(item_obj.unitPrice);
    $('#item_qty_input').val(item_obj.quantity);
});

//------------------------- Start: Item Add ------------------------------
const addItemData = (itemId, itemName, unitPrice, quantity) => {
    let new_item = {
        itemId: itemId,
        itemName: itemName,
        unitPrice: unitPrice,
        quantity: quantity
    };

    item_db.push(new_item);
    cleanItemForm();

    Swal.fire({ icon: "success", title: "Item Saved Successfully!" });
    loadItemTbl();
}

$('#btn_save_item').on('click', function () {
    let itemId = $('#item_id_input').val();
    let itemName = $('#item_name_input').val();
    let unitPrice = $('#item_price_input').val();
    let quantity = $('#item_qty_input').val();

    // Validation logic
    if (itemId == "") {
        Swal.fire({ icon: "error", title: "Invalid Item ID!" });
    } else if (item_db.find(item => item.itemId == itemId)) {
        Swal.fire({ icon: "error", title: "Item ID Already Exists!" });
    } else if (itemName == "") {
        Swal.fire({ icon: "error", title: "Invalid Item Name!" });
    } else if (unitPrice == "" || unitPrice <= 0) {
        Swal.fire({ icon: "error", title: "Invalid Unit Price!" });
    } else if (quantity == "" || quantity < 0) {
        Swal.fire({ icon: "error", title: "Invalid Quantity!" });
    } else {
        addItemData(itemId, itemName, unitPrice, quantity);
    }
});

//------------------------- Start: Item Update ------------------------------
const updateItemData = (itemId, itemName, unitPrice, quantity) => {
    let obj = item_db.find(item => item.itemId == itemId);

    if (obj) {
        obj.itemName = itemName;
        obj.unitPrice = unitPrice;
        obj.quantity = quantity;

        cleanItemForm();
        Swal.fire({ icon: "success", title: "Item Updated Successfully!" });
        loadItemTbl();
    }
}

$('#btn_update_item').on('click', function () {
    let itemId = $('#item_id_input').val();
    let itemName = $('#item_name_input').val();
    let unitPrice = $('#item_price_input').val();
    let quantity = $('#item_qty_input').val();

    if (itemId == "") {
        Swal.fire({ icon: "error", title: "Please Select an Item to Update!" });
    } else if (itemName == "") {
        Swal.fire({ icon: "error", title: "Invalid Name!" });
    } else if (unitPrice == "" || unitPrice <= 0) {
        Swal.fire({ icon: "error", title: "Invalid Price!" });
    } else {
        updateItemData(itemId, itemName, unitPrice, quantity);
    }
});

//------------------------- Start: Item Delete ------------------------------
const deleteItemData = (itemId) => {
    let index = item_db.findIndex(item => item.itemId == itemId);

    if (index !== -1) {
        item_db.splice(index, 1);
        cleanItemForm();
        Swal.fire({ icon: "success", title: "Item Deleted Successfully!" });
        loadItemTbl();
    }
}

$('#btn_delete_item').on('click', function () {
    let itemId = $('#item_id_input').val();

    if (itemId == "") {
        Swal.fire({ icon: "error", title: "Please Select an Item to Delete!" });
        return;
    }

    Swal.fire({
        title: "Are You Sure?",
        text: "This action will remove the item record!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete It!"
    }).then((result) => {
        if (result.isConfirmed) {
            deleteItemData(itemId);
        }
    });
});