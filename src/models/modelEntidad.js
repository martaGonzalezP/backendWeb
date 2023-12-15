import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
    nombre: {
        type: String
    },
    timestamp: {
        type: Date
    },
    lugar: {
        type: String
    },
    coordenadas: {
        lat:{ type: Number },
        lon:{ type: Number }
    },
    organizador: {
        type: String
    },
    imagen: {
        type: String,
        default: "https://res.cloudinary.com/daf0kbeor/image/upload/v1702598780/cv1fjxpcg0usq3rcvw0m.jpg"
    }
},{ versionKey: false });

export default mongoose.model('eventos', eventSchema)