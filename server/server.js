require('dotenv').config();
const express=require('express')
const connectToDb=require('./src/database/db')
const UserRoutes=require('./src/routes/User-Auth-Routes')
const ParkingRoutes=require('./src/routes/Parking-Route')
const BookingRoutes=require('./src/routes/Booking-Route')


const app=express();


connectToDb();

// const PORT = process.env.PORT || 4000; 
const PORT = 3000;


app.use(express.json());

app.use('/api/user',UserRoutes);
app.use('/api/parking',ParkingRoutes)
app.use('/api/booking',BookingRoutes)

app.listen(PORT,"0.0.0.0",()=>{
    console.log(`server is running on port ${PORT}`)
});