const mongoose = require('mongoose')
require('dotenv').config()

//Javascript Assíncrono
async function conectaBancoDeDados (){
    //Try para definir uma tentativa
    try{
        console.log('Conexão com o bando de dados iniciou')

    //operação continua com await
    await mongoose.connect(process.env.MONGO_URL)
    
    console.log('Conexão com o banco de dados feita com sucesso!')
    //Catch para pegar o erro no caso 
    } catch(erro){
        console.log(erro) 
    }

}
 
    module.exports = conectaBancoDeDados 