$(document).ready(function() {
    $(".alert").hide();
    $(".alert").toggle(function showAlert() {
        if (window.location.href.includes('/login')) {
            $(".alert").fadeTo(7000, 500).slideUp(500, function() {
                $(".alert").slideUp(500);
            });
            return $('.alert').append('<a href = "/Signup" > Not Signed Up Yet ? </a >')
        }
        $(".alert").fadeTo(2000, 500).slideUp(500, function() {
            $(".alert").slideUp(500);
        });

    });
});