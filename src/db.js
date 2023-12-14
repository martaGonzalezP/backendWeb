import mongoose from 'mongoose' //Mongoose nos permite conectarnos a mongodb y tmb a modelar los datos

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://mgonzalezpalmero:ly71fsM7Qd6PSULU@cluster0.ms7erhg.mongodb.net/ParcialCloud')
        console.log("Conexión establecida")        
    } catch (error) {
        console.log(error)
    }
};
