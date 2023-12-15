import Entidad from "../models/modelEntidad.js"

export const getAllEntidades = async (req, res) => {
    try {
        const data = await Entidad.find()

        res.json(data)

    } catch (error) {
        console.log('Error en la consulta de Entidads a la base de datos:', error);
        res.status(500).json({ message: 'Error al obtener los Entidads' });
    }
};

export const getEntidadID = async (req, res) => {
    try {
        const { id } = req.params;
        const entidad = await Entidad.findById(id);
        res.json(entidad);

    } catch (error) {
        console.log('Error en la consulta de Entidads a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un Entidad' });
    }
}

export const createEntidad = async (req, res) => {
    try {
        const { foto, usuario, ubicacion } = req.body

        console.log(foto)
        console.log(usuario)
        console.log(ubicacion)
        
        const newEntidad = new Entidad({
            foto,
            usuario,
            ubicacion
        })

        await newEntidad.save()

        res.send(newEntidad._id)

    } catch (error) {
        console.log('Error en la consulta de Entidads a la base de datos:', error);
        res.status(500).json({ message: 'Error al crear un Entidad' });
    }
}

export const editEntidad = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; //la info modificada

        //buscamos user y modificamos
        const updatedEntidad = await Entidad.findByIdAndUpdate(id, updateData, {new: true});

        if(!updatedEntidad){
            return res.status(404).json({message : 'Entidad no encontrada' });
        }
        res.json(updatedEntidad);

    } catch (error) {
        console.log('Error en la consulta de Entidads a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un Entidad' });
    }
}


export const deleteEntidad = async (req, res) => {
    try {
        const { id } = req.params;

        //buscamos user y borramos
        const searchedEntidad = await Entidad.findByIdAndDelete(id);

        if(!searchedEntidad){
            return res.status(404).json({message : 'User no encontrado' });
        }
        res.send("borrado")

    } catch (error) {
        console.log('Error en la consulta de Entidads a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un Entidad' });
    }
}