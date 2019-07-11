function checkscroll() {
    if (window.scrollY > 100)
        {
            $(".homelink").show()
            $(".homelink").removeClass("hide")
        }
        else
        {
            if (!$(".homelink").hasClass("hide"))
            {
                $(".homelink").addClass("hide")
                setTimeout(function () {
                    $(".homelink").hide()
                }, 300);
            }
        }
}

function getrandomcolor() {
    const colors = ["Crimson", "DarkGreen", "DarkOrange", "Indigo", "DarkSlateBlue", "RoyalBlue", "Magenta"];
    return colors[Math.round(Math.random() * colors.length)];
}

$(function () {
    if ($(".homelink")) {
        checkscroll();
        $(window).on("scroll",checkscroll);
    }

    /*$("a.btn, #headline").on("mouseenter", function() {
        let color = getrandomcolor();
        $("a.btn:not(.btn-outline)").css("background-color", color);
        $("a.btn.btn-outline").css("border-color", color).css("color", color);
        $("#headline").css("background-color", color);
    })*/

    if ("#themebutton") {
        $("#themebutton").on("click", function() {
            if (window.localStorage.getItem("dark")) {
                window.localStorage.removeItem("dark");
                $("html").removeClass("dark");
            }
            else {
                $("html").addClass("dark");
                window.localStorage.setItem("dark", "1");
            }
        })
    }

    if (window.localStorage.getItem("dark")) {
        $("html").addClass("dark");
    }
});