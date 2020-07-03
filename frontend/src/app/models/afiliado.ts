export class Afiliado {
    _id:number;
    apellido:string;
    nombres:string;
    dni:number;
    email:string;
    imagen:string;
    telefono:number;

    Afiliado(id?:number, apellido?:string, nombres?:string, dni?:number, email?:string, imagen?:string, telefono?:number){
        this._id=id;
        this.apellido=apellido;
        this.nombres=nombres;
        this.dni=dni;
        this.email=email;
        this.imagen=imagen;
        this.telefono=telefono;
    }
}
