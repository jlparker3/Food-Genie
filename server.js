//dependicies 
const express = require('express')


//renaming express
const app = express()

//initalizing port
const PORT = process.env.PORT || 8080

//serve static data from the public dir to the app
app.use(express.static('public'))

//parsing app body as JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//setting handlebar layouts
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Allow Routes
const routes = require('./controllers/burger_controller.js');

app.use(routes);
//server listener
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT)
})
