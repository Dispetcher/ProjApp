(function ($) {
    $(document).ready(function () {
        $('.result_list li a').on('click', function(e){
            let link = $(this).attr('href');
            if (link.indexOf('/reestr-sro/#details') != -1){
                e.preventDefault();
                var indx = link.indexOf('details/');
                let id = link.slice(21);
                $(location).attr('href', 'http://proekttunnel.ru/reestr/#id-'+id);
            }
        });
    });
})(jQuery)