import express from 'express'

import { getAll, getParadasPorLineaSentido, getParadasPorNombre, 
    getParadasCercanas, getUbicacion } from '../controllers/paradaController.js'

const router = express.Router()

router.get('/', getAll)
router.put('/linea/', getParadasPorLineaSentido)
router.put('/nombre/', getParadasPorNombre)
router.put('/cercanas/', getParadasCercanas)
//router.get('/ubicacion/:direccion', getUbicacion)
router.get('/ubicacion/', getUbicacion)


export default router