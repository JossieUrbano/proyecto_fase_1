import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llaves} from '../config/keys';
import {Login} from '../models/login.model';
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor(/* Add @inject to inject parameters */) { }

  // Creacion de token JWT

  crearTokenJWT(usuario: Login) {
    let claveSecreta = llaves.jwtKey;
    let tk = jwt.sign({
      exp: llaves.expTimeJWT,
      data: {
        id: usuario.id,
        correo: usuario.correo,
        contrasenia: usuario.contrasenia
      }
    }, claveSecreta);
    return tk;
  }

  verificarTokenJWT(token: string) {
    console.log(token)

    try {
      let decoded = jwt.verify(token, llaves.jwtKey);
      decoded.ok = true;
      return decoded
    } catch (err) {
      console.log(err)
      err.ok = false
      return err
    }



    // {
    //   if (err) {
    //     console.log(err)
    //     err = {
    //       msg: "Token invalido"
    //     }
    //     return err
    //   } else {
    //     console.log(decoded)
    //     return decoded
    //   }
    // });

  }

}
