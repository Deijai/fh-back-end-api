require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//import rotas users
const userRoutes = require('./routes/userRouter');
//import rota auth
const authRoutes = require('./routes/authRouter');

// Cria o servidor express
const app = express();

// Configurar CORS
app.use( cors() );

// Leitura e parser do body
app.use( express.json() );

// Base de dados
dbConnection();

// Diretorio público
app.use( express.static('public') );

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/auth/login', authRoutes);



app.listen( process.env.PORT, () => {
    console.log('Server is running in port ' + process.env.PORT );
});

