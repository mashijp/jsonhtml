jQuery(function($){

    $(".json .js-key").click(function(){
        $(this).closest(".element").children(".js-value").toggleClass("hidden");
    });

    $(".json2 dt").click(function(){
        $(this).closest("dl").filter(".js-array, .js-object").children("dd").children(".content").toggleClass("hidden");
    });

    var json = JSON.parse($(".input").text());

    function analyze(obj) {
        $.each(obj, function(key, value) {
            console.log("key: "+ key);
            console.log("value: "+ value);
            if (value !== null) {
                var type = typeof value;
                if (type === "object") analyze(value)
            }
        });
    }

    function createDl(key, value, nestLevel) {
        if (!nestLevel) nestLevel = 0
        var result = $("<dl/>");
        if (key !== null) {
            var dt = $("<dt/>");
            dt.append(createIndent(nestLevel));
            dt.append('"');
            dt.append($("<div/>").addClass("content").text(key));
            dt.append('": ');

            result.append(dt);
        }
        var type = value === null ? "null" : typeof value;
        if (type === "object" && value.length !== undefined) type = "array" // typeof [] ... arrayなのでがんばって判定

        var dd = $("<dd/>");
        var ddContent = $("<div/>").addClass("content");
        dd.append(ddContent);
        switch (type) {
            case "object":
                result.addClass("js-object");
                dd.prepend('{');
                $.each(value, function(key, value){
                    ddContent.append(createDl(key, value, nestLevel + 1));
                });
                dd.append(createIndent(nestLevel));
                dd.append('}');
                break;
            case "array":
                result.addClass("js-array");
                dd.prepend('[');
                $.each(value, function(key, value){
                    ddContent.append(createDl(null, value, nestLevel + 1));
                });
                dd.append(createIndent(nestLevel));
                dd.append(']');
                break;
            case "null":
                result.addClass("js-null");
                ddContent.text(value);
                break;
            case "string":
                result.addClass("js-string");
                dd.prepend('"');
                ddContent.text(value);
                dd.append('"');
                break;
            case "number":
                result.addClass("js-number");
                ddContent.text(value);
                break;
            default:
                alert(type);
        }
        dd.append($("<span/>").text(",").addClass("separator"));

        if (key === null) dd.prepend(createIndent(nestLevel));

        result.append(dd);
        return result;
    }

    function createIndent(nestLevel) {
        var result = $("<span/>").addClass("hidden").html(new Array(nestLevel * 2 + 1).join("&nbsp;"));
        return result;
    }

    $(".output").append(createDl(null, json))

})