import jwt from 'jsonwebtoken';


export default class Token {

    private static seed: string = 'este-es-el-seed-de-mi-app-secreto';
    private static caducidad: string = '30d';

    constructor () {}

    static getJwtToken(payload: any): string {
        return jwt.sign({
            usuario: payload,
            app: 'Fotosgram'
        }, this.seed, {expiresIn: this.caducidad})
    };

    static comprobarToken(userToken: string) {
        return new Promise( (resolve, reject) => {
            jwt.verify(userToken, this.seed, ( err: any, decoded: any ) => {
                if (err) {
                    reject();
                } else {
                    resolve( decoded );
                }
            })
        });

    }

}