import express from 'express'
import multer from 'multer'
import cloudinary from 'cloudinary'
import streamifier from 'streamifier'

import { getAllEntidades,getEntidadID, createEntidad, editEntidad, deleteEntidad} from "../controllers/entidadController.js"
import {verificarTokenGoogle,verificarConexion} from "../controllers/GoogleLogin.js"

const routerEntidad = express.Router()

routerEntidad.get('/', getAllEntidades)
routerEntidad.get('/:id', getEntidadID)
routerEntidad.post('/', createEntidad)
routerEntidad.put('/:id', editEntidad)
routerEntidad.delete('/:id', deleteEntidad)
routerEntidad.get('/loginToken/:token', verificarTokenGoogle)
routerEntidad.get('/conexion/:tokenId/:token',verificarConexion)

const fileUpload = multer();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME_CLY,
    api_key: process.env.API_KEY_CLY,
    api_secret: process.env.API_SECRET
});

routerEntidad.post('/subirFoto', fileUpload.single('foto'), function (req, res, next) {
  let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream(
            (result, error) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
  };

  async function upload(req) {
    try {
      let result = await streamUpload(req);
      res.status(200).json({ message: 'Imagen subida correctamente', imageUrl: result.url});
    } catch (error) {
      console.log('Error al subir la imagen: ', error)
      res.status(500).json({ message: 'Error al subir la imagen:', error});
    }
  }

  upload(req);
});


export default routerEntidad