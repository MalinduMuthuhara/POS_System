/**
 * Sidebar and Navigation Controller
 * Handles SPA section switching and Sidebar toggle
 */

// 1. මුලින්ම පද්ධතිය Load වන විට Dashboard එක පමණක් පෙන්වා අනෙක්වා සඟවන්න
$('#customer_section').css('display', 'none');
$('#item_section').css('display', 'none');
$('#order_section').css('display', 'none');
$('#dashboard_section').css('display', 'block'); // මෙය ඔබගේ මුල් පිටුවයි

// 2. Sidebar එක Toggle කිරීම (Open/Close)
let sidebar_open = true;
$('#menu_btn').on('click', function () {
    if (sidebar_open) {
        $('#sidebar').css({ display: 'none' });
        $('.content').css({ marginLeft: '0px' });
        sidebar_open = false;
    } else {
        $('#sidebar').css({ display: 'block' });
        $('.content').css({ marginLeft: '250px' }); // ඔබ ලබාදුන් sidebar width එකට අනුව
        sidebar_open = true;
    }
});

// 3. Navigation Logic (SPA - Section Switching)

// Dashboard එකට යාමට
$('#nav_dashboard').on('click', function () {
    switchSection('#dashboard_section');
});

// Customer Management එකට යාමට
$('#nav_customer').on('click', function () {
    switchSection('#customer_section');
});

// Item Management එකට යාමට
$('#nav_item').on('click', function () {
    switchSection('#item_section');
});

// Place Order එකට යාමට
$('#nav_order').on('click', function () {
    switchSection('#order_section');
});

/**
 * සියලුම Sections සඟවා අවශ්‍ය Section එක පමණක් පෙන්වන පොදු Function එක
 * @param {string} sectionId - පෙන්විය යුතු Section එකේ ID එක
 */
function switchSection(sectionId) {
    // සියලුම sections සඟවන්න
    $('#dashboard_section').css('display', 'none');
    $('#customer_section').css('display', 'none');
    $('#item_section').css('display', 'none');
    $('#order_section').css('display', 'none');

    // අවශ්‍ය section එක පමණක් පෙන්වන්න
    $(sectionId).css('display', 'block');

    // Sidebar එකේ active status එක වෙනස් කිරීමට (Optional)
    $('.list-group-item').removeClass('bg-primary text-white');
    $(`a[id^='nav_']`).filter(function() {
        return $(this).attr('id').includes(sectionId.split('_')[0].replace('#',''));
    }).addClass('bg-primary text-white');
}