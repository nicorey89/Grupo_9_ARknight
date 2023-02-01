const express = require ("express");
const app = express ();
const path = require ("path");
const PORT = 3000;
const indexRouter= require ('./routes/index')


app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'ejs');


app.use(express.static("public"));

app.use("/", indexRouter);



app.listen(PORT, () => console.log(`Server listen in port ${PORT}\n http://localhost:${PORT}`));