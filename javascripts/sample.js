jQuery(function($){
    $("#input input").click(function(){
        try {
            var data = $.parseJSON(JSON.parse($("#input textarea").val()));
            $("#output").html("").append(data);
        }catch(e){
            alert(e);
        }
    });
})