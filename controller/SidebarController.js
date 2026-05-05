$(document).ready(function () {

    $('#customer_section, #item_section, #order_section, #order_history_section').hide();
    $('#dashboard_section').show();

    let sidebar_open = true;

    //---------Sidebar Toggle--------------------
    $('#menu_btn').on('click', function () {
        if (sidebar_open) {
            $('#sidebar').hide();
            $('.content').css({ marginLeft: '0px' });
            sidebar_open = false;
        } else {
            $('#sidebar').show();
            $('.content').css({ marginLeft: '250px' });
            sidebar_open = true;
        }
    });

    //--------Navigation events----------------------
    $('#nav_dashboard').on('click', function () {
        switchSection('#dashboard_section', '#nav_dashboard');
    });

    $('#nav_customer').on('click', function () {
        switchSection('#customer_section', '#nav_customer');
    });

    $('#nav_item').on('click', function () {
        switchSection('#item_section', '#nav_item');
    });

    $('#nav_order').on('click', function () {
        switchSection('#order_section', '#nav_order');
    });


    $('#nav_order_history').on('click', function () {
        switchSection('#order_history_section', '#nav_order_history');
    });

    function switchSection(sectionId, navId) {

        $('#dashboard_section, #customer_section, #item_section, #order_section, #order_history_section').hide();
        $(sectionId).fadeIn(300);
        $('.list-group-item').removeClass('bg-primary text-white');
        $(navId).addClass('bg-primary text-white');
    }
});