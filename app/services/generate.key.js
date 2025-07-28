import crypto from "crypto";
import fs from "fs";

export function generateKeys (){
    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa",{
        modulusLength : 2048,
        publicKeyEncoding : { type : "spki", format : "pem"},
        privateKeyEncoding : { type : "pkcs8", format : "pem"},
    })
    
    fs.writeFileSync('private.key', privateKey);  
    fs.writeFileSync('public.key', publicKey);

    console.log(`"Clés RSA générées et sauvegardées"`);

}