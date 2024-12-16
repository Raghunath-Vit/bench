const http=require('http');
const { loadPlanet } =require('../src/models/planets.model');

const app=require('./app');

const server=http.createServer(app);
const port=process.env.PORT || 8000;


// We want that my server first compelete reading of streams of csv data that's why we are listening to server later in asyn await and call the loadPlanet() before which return promise to ensure finsihed execution of csv file

async function startServer(){
 await mongoose.connect(MONGO_URL,{
  
 }) 
await loadPlanet();
server.listen(port,()=>{
  console.log(`Server is running... on ${port}`);
})
}

startServer();