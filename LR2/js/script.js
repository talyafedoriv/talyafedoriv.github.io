document.getElementById("button").addEventListener("click", function () {
        var table = document.querySelector("table");
        var cells = table.querySelectorAll("td");
        var p = document.querySelectorAll("p");
        var h = document.querySelectorAll("h2");

        cells[1].textContent = p[0].textContent;
        cells[4].textContent = p[1].textContent;
        cells[7].textContent = p[2].textContent;

        cells[0].textContent = h[0].textContent;
        cells[3].textContent = h[1].textContent;
        cells[6].textContent = h[2].textContent;
});
