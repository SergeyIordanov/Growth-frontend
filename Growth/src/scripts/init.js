$(document).ready(function () {
    $('[data-toggle="offcanvas"]').click(function () {
        $("#navigation").toggleClass("hidden-xs");
    });

    $('.input-group.date.full').datepicker({
    });

    $('.input-group.date.month-only').datepicker({
        format: "mm/yyyy",
        startView: 1,
        minViewMode: 1
    });
});