
import {Document, Schema, model} from 'mongoose';
import * as bcrypt from 'bcrypt';

const usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    }

});


usuarioSchema.method('compararPassword', function( password: string = ''): boolean {
    if (bcrypt.compareSync(password, this.password)){
        return true;
    } else {
        return false;
    }
});


interface IUsuario extends Document {
    nombre: string;
    avatar: string;
    email: string;
    password: string;

    compararPassword(password: string): boolean;
}

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);