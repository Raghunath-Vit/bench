const express=require('express');
const cors=require('cors');
const morgan=require('morgan');
const planetsRouter=require('./routes/planets.router');

const app=express();
app.use(cors());
app.use(morgan("combined"));

app.use(express.json());

// app.use('/planets',planetsRouter);
app.use(planetsRouter);



module.exports=app;