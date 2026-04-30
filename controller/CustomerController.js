import { customer_db } from '../db/db.js';
import { check_phone } from '../utils/regex_utils.js';

//------------------------- Load Customer Table ------------------------------
const loadCustomerTbl = () => {
    $('#customer_table_body').empty();

    customer_db.map((item, index) => {
        let new_row = `<tr data-index="${index}">
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.phone}</td>
            <td>${item.address}</td>
        </tr>`;
        $('#customer_table_body').append(new_row);
    });
}

//------------------------- Clean Customer Form ------------------------------
const cleanCustomerForm = () => {
    $('#cust_id').val("");
    $('#cust_name').val("");
    $('#cust_phone').val("");
    $('#cust_address').val("");
}

//------------------------- Click on Customer Row ------------------------------
$('#customer_table_body').on('click', 'tr', function () {
    let customer_obj = customer_db[$(this).index()];

    $('#cust_id').val(customer_obj.id);
    $('#cust_name').val(customer_obj.name);
    $('#cust_phone').val(customer_obj.phone);
    $('#cust_address').val(customer_obj.address);
});

//------------------------- Start: Customer Add ------------------------------
const addCustomerData = (id, name, phone, address) => {
    let new_customer = {
        id: id,
        name: name,
        phone: phone,
        address: address
    };

    customer_db.push(new_customer);
    cleanCustomerForm();

    Swal.fire({ icon: "success", title: "Customer Saved Successfully!" });
    loadCustomerTbl();
}

$('#btn_save_customer').on('click', function () {
    let id = $('#cust_id').val();
    let name = $('#cust_name').val();
    let phone = $('#cust_phone').val();
    let address = $('#cust_address').val();

    // Validation logic with Regex
    if (id == "") {
        Swal.fire({ icon: "error", title: "Invalid Customer ID!" });
    } else if (customer_db.find(item => item.id == id)) {
        Swal.fire({ icon: "error", title: "Customer ID Already Exists!" });
    } else if (name == "") {
        Swal.fire({ icon: "error", title: "Invalid Customer Name!" });
    } else if (!check_phone(phone)) {//regex eka
        Swal.fire({
            icon: "error",
            title: "Invalid Phone Number!",
            text: "Please Enter a Valid Phone Number (e.g., 0712345678)"
        });
    } else {
        addCustomerData(id, name, phone, address);
    }
});

//------------------------- Start: Customer Update ------------------------------
const updateCustomerData = (id, name, phone, address) => {
    let obj = customer_db.find(item => item.id == id);

    if (obj) {
        obj.name = name;
        obj.phone = phone;
        obj.address = address;

        cleanCustomerForm();
        Swal.fire({ icon: "success", title: "Customer Updated Successfully!" });
        loadCustomerTbl();
    }
}

$('#btn_update_customer').on('click', function () {
    let id = $('#cust_id').val();
    let name = $('#cust_name').val();
    let phone = $('#cust_phone').val();
    let address = $('#cust_address').val();

    if (id == "") {
        Swal.fire({ icon: "error", title: "Please Select a Customer to Update!" });
    } else if (name == "") {
        Swal.fire({ icon: "error", title: "Invalid Name!" });
    } else if (!check_phone(phone)) {//REGEX CHECKING KERIMA
        Swal.fire({
            icon: "error",
            title: "Invalid Phone Number!",
            text: "Please check the phone number again."
        });
    } else {
        updateCustomerData(id, name, phone, address);
    }
});

//------------------------- Start: Customer Delete ------------------------------
const deleteCustomerData = (id) => {
    let index = customer_db.findIndex(item => item.id == id);

    if (index !== -1) {
        customer_db.splice(index, 1);
        cleanCustomerForm();
        Swal.fire({ icon: "success", title: "Customer Deleted Successfully!" });
        loadCustomerTbl();
    }
}

$('#btn_delete_customer').on('click', function () {
    let id = $('#cust_id').val();

    if (id == "") {
        Swal.fire({ icon: "error", title: "Please Select a Customer to Delete!" });
        return;
    }

    Swal.fire({
        title: "Are You Sure?",
        text: "This Action Will Remove The Customer Record !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete It !"
    }).then((result) => {
        if (result.isConfirmed) {
            deleteCustomerData(id);
        }
    });
});