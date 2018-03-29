$(function () {
    setTimeout(() => {
        $('.js-basic-example').DataTable({
            responsive: true,
            columnDefs: [ 
                { orderable: false, targets: [3,4,5] },
                { width: "20px", targets: [3,4,5] }
            ]
        });
    }, 2000);
});