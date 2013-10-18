jQuery(function($){

    $(".json .js-key").click(function(){
        $(this).closest(".element").children(".js-value").toggleClass("hidden");
    });

})