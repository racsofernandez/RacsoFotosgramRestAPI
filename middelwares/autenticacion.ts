import { Response, Request, NextFunction} from 'express';
import Token from '../classes/token';
import { Usuario } from '../models/usuario.model';

export const verificaToken = (req: any, res: Response, next: NextFunction) => {

    const userToken = req.get('x-token') || '';

    Token.comprobarToken(userToken)
        .then( (decoded: any) => {
            console.log('decoded', decoded);
            req.usuario = decoded.usuario;
            next();
        })
        .catch(err => {
            res.json({
                ok: false,
                mensaje: 'El Token no es correcto'
            });
        })

}