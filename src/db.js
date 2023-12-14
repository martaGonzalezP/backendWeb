import mongoose from 'mongoose' //Mongoose nos permite conectarnos a mongodb y tmb a modelar los datos
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URL_BDD)
        console.log("Conexión establecida")        
    } catch (error) {
        console.log(error)
    }
};
