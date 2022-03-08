const express = require('express');
const app = express();


app.set("view engine", "ejs")

app.get("/", function (req, res) {
    const items = [
        {
            title: "D",
            message: "esenvolver aplicações/serviços de forma fácil"
        },
        {
            title: "E",
            message: "JS usa JavaScript para renderizar HTML"
        },
        {
            title: "M",
            message: "uito fácil de usar"
        },
        {
            title: "A",
            message: "mbiente amigável"
        },
        {
            title: "I",
            message: "nstall ejs"
        },
        {
            title: "S",
            message: "intaxe simples"
        },
    ];

    const subtitle = "Uma linguagem de modelagem para criação de página HTML";
    res.render("pages/index", {
        qualitys: items,
        subtitle: subtitle
    })
});

app.get("/about", function (req, res) {
    res.render("pages/about")
});

console.log("Servidor iniciado")
app.listen(8080);
