import Evento from "../models/modelEntidad.js"
import axios from 'axios'

export const getAllEntidades = async (req, res) => {
    try {
        const data = await Evento.find()

        res.json(data)

    } catch (error) {
        console.log('Error en la consulta de Eventos a la base de datos:', error);
        res.status(500).json({ message: 'Error al obtener los Eventos' });
    }
};

export const getEntidadID = async (req, res) => {
    try {
        const { id } = req.params;
        const vento = await Evento.findById(id);
        res.json(vento);

    } catch (error) {
        console.log('Error en la consulta de Eventos a la base de datos:', error);
        res.status(500).json({ message: 'Error al consultar evento un Evento' });
    }
}

export const getEventoCercano = async (req, res) => {
    try {
        const { direccion } = req.body

        const nominatimEndpoint = 'https://nominatim.openstreetmap.org/search';
        const format = 'json'; 

        const response = await axios.get(`${nominatimEndpoint}?q=${direccion}&format=${format}`);

        // Extraer la información de la primera coincidencia (puedes ajustarlo según tus necesidades).
        const firstResult = response.data[0];
        if (!firstResult) {
            return res.status(404).json({ error: 'No se encontraron resultados.' });
        }

        const { lat, lon } = firstResult;
        const maxDifference = 0.2;

        const latMin = parseFloat(lat) - maxDifference;
        const latMax = parseFloat(lat) + maxDifference;
        const lonMin = parseFloat(lon) - maxDifference;
        const lonMax = parseFloat(lon) + maxDifference;

        const eventosCercanos = await Evento.find({
            coordenadas: {
                lat: { $gte: latMin, $lte: latMax },
                lon: { $gte: lonMin, $lte: lonMax }
            }
        })

        console.log("geteventosCercanos: " + eventosCercanos)
        res.json(eventosCercanos)

    } catch (error) {
        console.log('Error en la consulta de Eventos a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un Evento' });
    }
}

export const createEntidad = async (req, res) => {
    try {
        const {nombre, timestamp, lugar, organizador} = req.body

        const nominatimEndpoint = 'https://nominatim.openstreetmap.org/search';
        const format = 'json'; 

        const response = await axios.get(`${nominatimEndpoint}?q=${lugar}&format=${format}`);

        // Extraer la información de la primera coincidencia (puedes ajustarlo según tus necesidades).
        const coordenadas = response.data[0];
        if (!coordenadas) {
            return res.status(404).json({ error: 'No se encontraron resultados.' });
        }

        const newEvento = new Evento({
            nombre, timestamp, lugar, coordenadas ,organizador
        })

        await newEvento.save()

        res.send(newEvento._id)

    } catch (error) {
        console.log('Error en la consulta de Eventos a la base de datos:', error);
        res.status(500).json({ message: 'Error al crear un Evento' });
    }
}

export const editEntidad = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; //la info modificada

        //buscamos user y modificamos
        const updatedEvento = await Evento.findByIdAndUpdate(id, updateData, {new: true});

        if(!updatedEvento){
            return res.status(404).json({message : 'Evento no encontrada' });
        }
        res.json(updatedEvento);

    } catch (error) {
        console.log('Error en la consulta de Eventos a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un Evento' });
    }
}


export const deleteEntidad = async (req, res) => {
    try {
        const { id } = req.params;

        //buscamos user y borramos
        const searchedEvento = await Evento.findByIdAndDelete(id);

        if(!searchedEvento){
            return res.status(404).json({message : 'User no encontrado' });
        }
        res.send("borrado")

    } catch (error) {
        console.log('Error en la consulta de Eventos a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un Evento' });
    }
}