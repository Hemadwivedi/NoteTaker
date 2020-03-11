var express=require('express');

var app = express();

app.use(express.static('../public'));

const PORT =   process.env.PORT || 3033;

app.use(express.urlencoded({
    extended: true })
);
app.use(express.json());

require("../routesfile/apiRoutes")(app);
require("../routesfile/htmlRoutes")(app);


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});