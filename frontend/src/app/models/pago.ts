import { Afiliado } from './afiliado';

export class Pago {
    _id:number;
    afiliado:Afiliado;
    fecha:Date;
    monto:number;
    year:number;
    mes:string;

    Pago(_id?:number, afiliado?:Afiliado, fecha?:Date, monto?:number, year?:number, mes?:string){
        this._id=_id;
        this.afiliado=afiliado;
        this.fecha=fecha;
        this.monto=monto;
        this.year=year;
        this.mes=mes;
    }
}
