const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;
/* const methodOverride = require('method-override'); */

app.use(express.static("public"));
/* app.use(methodOverride('_method')); */
app.use(express.json());
app.use(express.urlencoded({ extended: true}))


/*---- TEMPLATE ENGINE CONFIG ----*/
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

/*---- ROUTERS ----- */
const indexRouter= require('./routes/index')
const productsRouter = require('./routes/product')
const usersRouter = require("./routes/users")

/* --------ROUTER MIDDLEWARES------- */ 
app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);


app.listen(PORT, () => console.log(`Server listen in port ${PORT}\n http://localhost:${PORT}`));