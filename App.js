require('dotenv').config();
console.clear();
require('./Db');

// ---------------------------------- //
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


// Initialize the application
const app = express();


// Middlewares
app.use('/static', express.static(__dirname + '/reportes'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.set('trust proxy', true);


// Cors
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


// Habilitar cors (DE MANERA LIMITADA)
const whitelist = ['https://tematicajv.mvv.com.co'];
const corsOptions = {
    origin: (origin, callback) => {

        const existe = whitelist.some(dominio => dominio === origin);

        if (existe) {
            callback(null, true)
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}

// Esta limita el acceso
// app.use(cors(corsOptions));

// Esta es abierta para todo el mundo.
app.use(cors());



//Routes
app.use(process.env.ROUTE, require(process.env.FILEROUTE));
app.use(process.env.ROUTE1, require(process.env.FILEROUTE1));
app.use(process.env.ROUTE2, require(process.env.FILEROUTE2));


// Run the server
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});