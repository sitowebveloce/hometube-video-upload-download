// IMPORT PACKAGES
import express from 'express';
// APP
const app = express();

// BODY PARSER
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// VIEW ENGINE
app.set('view engine', 'ejs');

// STATIC FOLDER
import path from 'path';
const __dirname = path.resolve();
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// ROUTES
import index from './router/index.js';
app.use('/api/upload', index);
// ROOT HOME ROUTE
app.get('/', (req, res)=> res.render('index.ejs', {message:'Hello there!'}));

// Server listener
const PORT = 3001;
app.listen(PORT, ()=>{
    console.log(`Server running 🏃💨 🚗💨 on port ${PORT}`);
});
