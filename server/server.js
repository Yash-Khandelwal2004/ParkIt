require('dotenv').config();
const express=require('express')
const connectToDb=require('./src/database/db')
const UserRoutes=require('./src/routes/User-Auth-Routes')
const ParkingRoutes=require('./src/routes/Parking-Route')

const app=express();


connectToDb();

// const PORT = process.env.PORT || 4000; 
const PORT = 3000;


app.use(express.json());

app.use('/api/user',UserRoutes);
app.use('/api/parking',ParkingRoutes)


app.listen(PORT,"0.0.0.0",()=>{
    console.log(`server is running on port ${PORT}`)
});