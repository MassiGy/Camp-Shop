$(document).ready(function() {
    $(".alert").hide();
    $(".alert").toggle(function showAlert() {
        $(".alert").fadeTo(2000, 500).slideUp(500, function() {
            $(".alert").slideUp(500);
        });
    });
});