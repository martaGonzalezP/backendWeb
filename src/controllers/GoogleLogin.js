import { jwtDecode } from 'jwt-decode';
import { promises as fsPromises } from 'fs';


export const verificarTokenGoogle = async (req, res) => {
    try {
        const {token} = req.params
        var userObjetct = jwtDecode(token)
        var epochExpire = userObjetct.exp

        let data ={
            "correo": userObjetct.email,
            "expiracionToken": new Date((epochExpire+3600)*1000),
            "tokenId": userObjetct.jti,
            "foto": userObjetct.picture
        };

        const timestamp = new Date();
        timestamp.setHours(timestamp.getHours() + 1);
        const fecha = timestamp.toLocaleString();
        const rutaArchivo = '../log.txt';
        const contenido = `${fecha} ${nombre} ${new Date((epochExpire+3600)*1000)} ${userObjetct.jti}\n`;

        (async () => {
            try {
                await fsPromises.appendFile(rutaArchivo, contenido);
                console.log('Datos escritos en el archivo exitosamente.');
            } catch (error) {
                console.error('Error al escribir en el archivo:', error);
            }
        })();

        res.json(data)

    } catch (error) {
        console.log('Error en la verificacion ', error)
        res.status(500).json({ message: 'Error al verificar el token' })
    }
};

export const verificarConexion = async (req, res) => {
    try {
        const {tokenId, token}  = req.params;
        var userObjetct = jwtDecode(token)
        var epochExpire = new Date ((userObjetct.exp+3600)*1000)

        var fechaActual= new Date ()
        fechaActual.setHours(fechaActual.getHours() + 1);
        
        console.log(fechaActual)

        if(tokenId == userObjetct.jti){
            if( epochExpire < fechaActual){
                res.send("expired");
            }else{
                res.send("ok");
            }
        }else{
            res.send("invalid token")
        }


    } catch (error) {
        console.log('Error en la consulta de usuarios en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener el usuarios' })
    }
};