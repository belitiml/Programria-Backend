const mongoose = require('mongoose')

//Javascript Assíncrono
async function conectaBancoDeDados (){
    //Try para definir uma tentativa
    try{
        console.log('Conexão com o bando de dados iniciou')

    //operação continua com await
    await mongoose.connect('mongodb+srv://Mulheres:XeTt6vHqRVt9m37b@cluster0.cbtw3uj.mongodb.net/?retryWrites=true&w=majority')
    
    console.log('Conexão com o banco de dados feita com sucesso!')
    //Catch para pegar o erro no caso 
    } catch(erro){
        console.log(erro) 
    }

}
 
    module.exports = conectaBancoDeDados 