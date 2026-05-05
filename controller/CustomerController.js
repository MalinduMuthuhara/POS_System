import { addCustomerData, updateCustomerData, deleteCustomerData, getAllCustomerData } from '../model/CustomerModel.js';
import { check_phone } from '../utils/regex_utils.js';
import { loadOrderDetails } from './OrderController.js';

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

// ------------------------- Load Table ------------------------------
const loadCustomerTbl = () => {
    $('#customer_table_body').empty();
    let customers = getAllCustomerData();

    customers.forEach((item) => {
        let new_row = `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.phone}</td>
            <td>${item.address}</td>
        </tr>`;
        $('#customer_table_body').append(new_row);
    });
}

$(document).ready(() => {
    loadCustomerTbl();
});

const cleanCustomerForm = () => {
    $('#cust_id').val("");
    $('#cust_name').val("");
    $('#cust_phone').val("");
    $('#cust_address').val("");
}

//-------------------Table row click event---------------------
$('#customer_table_body').on('click', 'tr', function () {
    let id = $(this).find('td:first').text();
    let customers = getAllCustomerData();
    let customer = customers.find(c => c.id == id);

    if (customer) {
        $('#cust_id').val(customer.id);
        $('#cust_name').val(customer.name);
        $('#cust_phone').val(customer.phone);
        $('#cust_address').val(customer.address);
    }
});

// ------------------------- Customer Save ------------------------------
$('#btn_save_customer').on('click', function () {
    let id = $('#cust_id').val();
    let name = $('#cust_name').val();
    let phone = $('#cust_phone').val();
    let address = $('#cust_address').val();

    if (id === "") {
        showAlert("Invalid Customer ID!", "danger");
    } else if (name === "") {
        showAlert("Invalid Customer Name!", "danger");
    } else if (!check_phone(phone)) {
        showAlert("Invalid Phone Number!", "warning");
    } else {
        addCustomerData(id, name, phone, address);
        loadCustomerTbl();
        loadOrderDetails();
        cleanCustomerForm();
        showAlert("Customer Saved Successfully!", "success");
    }
});

// ------------------------- Customer Update ------------------------------
$('#btn_update_customer').on('click', function () {
    let id = $('#cust_id').val();
    let name = $('#cust_name').val();
    let phone = $('#cust_phone').val();
    let address = $('#cust_address').val();

    if (updateCustomerData(id, name, phone, address)) {
        loadCustomerTbl();
        loadOrderDetails();
        cleanCustomerForm();
        showAlert("Customer Updated Successfully!", "success");
    } else {
        showAlert("Customer Not Found!", "danger");
    }
});

// ------------------------- Customer Delete ------------------------------
$('#btn_delete_customer').on('click', function () {
    let id = $('#cust_id').val();

    if (confirm("Are you sure you want to delete this customer?")) {
        if (deleteCustomerData(id)) {
            loadCustomerTbl();
            loadOrderDetails();
            cleanCustomerForm();
            showAlert("Customer Deleted Successfully!", "success");
        } else {
            showAlert("Please select a customer first!", "warning");
        }
    }
});