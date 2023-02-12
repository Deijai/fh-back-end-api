require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//import rotas 
const authRoutes = require('./routes/authRouter');
const userRoutes = require('./routes/userRouter');
const hospitalRoutes = require('./routes/hospitalRouter');
const doctorRoutes = require('./routes/doctorRouter');

//import rota all
const allRoutes = require('./routes/allrouter');

//import rota de upload de arquivos
const uploadRoutes = require('./routes/uploadRouter');

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
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/auth/login', authRoutes);

//Rota all
app.use('/api/find', allRoutes);

//Rota de upload de arquivos
app.use('/api/uploads', uploadRoutes);



app.listen( process.env.PORT, () => {
    console.log('Server is running in port ' + process.env.PORT );
});

