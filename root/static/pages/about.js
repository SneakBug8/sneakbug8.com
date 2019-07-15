var taft = window.$("#taft")[0];
var left = 0;

setInterval(movetaft, 10);

function movetaft()
{
    left -= 1;
    taft.style.left = left + "px";
    if (left < - window.innerWidth / 2 - 200) {
        left = window.innerWidth / 2 + 100;
    }
}