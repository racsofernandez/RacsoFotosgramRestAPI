import { Request, Response, Router, response } from "express";
import { Usuario } from '../models/usuario.model';
import * as bcrypt from 'bcrypt';
import Token from "../classes/token";
import { verificaToken } from "../middelwares/autenticacion";


const userRoutes = Router();

// Login

userRoutes.post('/login', async (req: Request, res: Response) => {
    
    const body = req.body;
    
    try {
        const userDB = await Usuario.findOne({ email: body.email });

          if (!userDB) {
              return res.json({
                  ok:false,
                  mensaje: `Usuario/contraseña no son correctos ${body.email}`
              })
          }
          if(userDB.compararPassword(body.password)) {
                const tokenUser: string = Token.getJwtToken({
                    _id: userDB._id,
                    nombre: userDB.nombre,
                    email: userDB.email,
                    avatar: userDB.avatar
                });
              res.json({
                  ok: true,
                  token: tokenUser
              })
          } else {
              return res.json({
                  ok:false,
                  mensaje: 'Usuario/contraseña no son correctos ***'
              })
          }

    }
    catch(e) {
        console.log(e);

    }


})


// Crear un usuario
userRoutes.post('/create', (req: Request, res: Response) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    }
    console.log('he pasado por aquí...');
    Usuario.create( user ).then( userDB => {

        const tokenUser: string = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
      res.json({
          ok: true,
          token: tokenUser
      })


    } ).catch( err => {
        res.json({
            ok: false,
            mensaje: err
        })
    });

})

//Actualizar usuario
//el parámetro verificaToken es una especie de interceptor, se pueden poner más 
//si en lugar de poner uno se ponern varios entre corchetes separados por comas
// [verifica1, verifica2, verifica3]
userRoutes.post('/update', verificaToken, async (req: any, res: Response) => {
    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    }

    try {
        const userDB = await Usuario.findByIdAndUpdate( req.usuario._id, user, { new: true });
            
            if (!userDB) {
                return res.json({
                    ok: false,
                    mensaje: 'No existe un usuario con ese ID'
                });
            }
    
            const tokenUser: string = Token.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });
          res.json({
              ok: true,
              token: tokenUser
          })
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    

})





userRoutes.get('/prueba', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo funciona bien!!'
    })
})

export default userRoutes;