import mongoose from 'mongoose'

const paradaSchema = mongoose.Schema({
    codLinea : {
        type : Number,
        required : true
    },
    nombreLinea : {
        type : String,
        required : true 
    },
    sentido : {
        type : Number,
        required : true 
    },
    orden : {
        type : Number
    },
    codParada : {
        type : Number
    },
    nombreParada : {
        type : String,
        required : true
    },
    direccion : {
        type : String
    },
    lon : {
        type : Number,
        required : true 
    },
    lat : {
        type : Number,
        required : true
    }
}, { versionKey: false });

export default mongoose.model('paradas', paradaSchema)