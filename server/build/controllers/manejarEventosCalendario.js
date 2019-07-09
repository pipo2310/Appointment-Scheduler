"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = __importStar(require("nodemailer"));
class EnviarEmail {
    //composeOptions:email.ComposeOptions;
    constructor() {
    }
    sendEmail(req, res) {
        //:string,correo:string,fecha:string,nombreProfesor:string,hora:string
        let cadena;
        cadena = req.body.nombre + ' en esta fecha y hora ' + req.body.fecha + ' ' + req.body.hora + ' con el profesor ' + req.body.nombreProfesor;
        let mailOptions = {
            from: 'ISpruebacalendar@gmail.com',
            to: req.body.correo,
            subject: 'Detalles de cita',
            html: cadena
        };
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 995,
            secure: true,
            service: 'Gmail',
            auth: {
                user: 'ISpruebacalendar@gmail.com',
                pass: 'Inge1Proyecto'
            },
            tls: { rejectUnauthorized: false }
        });
        transporter.sendMail(mailOptions, function (error, info) {
            console.log("ENTRE");
            if (error) {
                console.log(" NO funciono", error);
                return error;
            }
            else {
                console.log("funciono");
                return "E-mail enviado com sucesso!";
            }
        });
    }
}
exports.envEmail = new EnviarEmail();
