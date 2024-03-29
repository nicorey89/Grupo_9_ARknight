const process = require("process");

const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3002;
const methodOverride = require('method-override');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cookieCheck = require("./middleware/cookieCheck");
require('dotenv').config();
const cors = require('cors')


/*---- TEMPLATE ENGINE CONFIG ----*/
app.use(express.static("public"));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(cors());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(session({
    secret: "AKnigth",
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(cookieCheck);

/*---- ROUTERS ----- */
const indexRouter= require('./routes/index')
const productsRouter = require('./routes/product')
const usersRouter = require("./routes/users")
const adminRouter = require("./routes/admin")
const sucursalesRouter = require("./routes/sucursales")
const apiRouter = require("./routes/api")
const subCategoriesRoutesApi = require("./routes/api/subCategoriesRoutes");
const usersRouterApi = require('./routes/api/users');
const productsRouterApi = require('./routes/api/products');
const orderRouter = require('./routes/api/order');
 
/* --------ROUTER MIDDLEWARES------- */ 
app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/sucursales", sucursalesRouter);
app.use("/api/v1", apiRouter);
app.use("/api/v1", subCategoriesRoutesApi);
app.use("/api/v1", usersRouterApi);
app.use("/api/v1", productsRouterApi);
app.use(`/api/v1/orders`, orderRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => console.log(`Server listen in port ${PORT}\n http://localhost:${PORT}`));