import { Usuario } from './usuario';

export class Novedad {
    _id:number;
    usuario:Usuario;
    texto:string;
    estado:string;

    Novedad(_id?:number, usuario?:Usuario, texto?:string, estado?:string){
        this._id=_id;
        this.usuario=usuario;
        this.texto=texto;
        this.estado=estado;
    }
}
