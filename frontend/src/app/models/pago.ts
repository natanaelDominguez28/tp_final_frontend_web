import { Afiliado } from './afiliado';

export class Pago {
    _id:number;
    afiliado:Afiliado;
    fecha:Date;
    año:number;
    mes:number;

    Pago(_id?:number, afiliado?:Afiliado, fecha?:Date, año?:number, mes?:number){
        this._id=_id;
        this.afiliado=afiliado;
        this.fecha=fecha;
        this.año=año;
        this.mes=mes;
    }
}
