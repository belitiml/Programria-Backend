const express = require ("express")  // Aqui estou iniciando o express
const router= express.Router()  // Aqui estou configurando a primeira parte da rota 
const cors = require('cors') //instalação do pacote cors, que permite consumir no front end 

const conectaBancoDeDados = require('./bancoDeDados') //Ligando ao arquivo Banco de Dados
conectaBancoDeDados ()//Chamando a função que conecta o banco de dados 
const Mulher = require('./mulherModel')


const app = express()  // Aqui estou iniciando o App
app.use(express.json())
app.use(cors())

const porta = 3333 //Aqui estou criando a porta

//Get
async function mostraMulheres(request, response) {
  try{
    const mulheresVindasDoBancoDeDados = await Mulher.find()

    response.json(mulheresVindasDoBancoDeDados)
  }catch(erro){
    console.log(erro)

  }
  
}

//POST //Toda função atrelada a uma rota ela recebe os parametros Request e response
async function criaMulher(request, response){
    
  const novaMulher = new Mulher({
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao: request.body.citacao
  })
      try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)

      } catch(erro) {
        console.log(erro)
      }
}
//PATCH
async function corrigeMulher(request, response){
      try{
        const mulherEncontrada = await Mulher.findById(request.params.id)
        if (request.body.nome){
          mulherEncontrada.nome = request.body.nome
        }
        if (request.body.imagem){
          mulherEncontrada.imagem = request.body.imagem
        }
        if(request.body.minibio){
          mulherEncontrada.minibio = request.body.minibio
        }
        if(request.body.citacao){
          mulherEncontrada.citacao = request.body.citacao
        }
        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        
        response.json(mulherAtualizadaNoBancoDeDados)
      } catch(erro) {
        console.log(erro)
      }
}
//DELETE
async function deletaMulher(request, response) {

  try{
      await Mulher.findByIdAndDelete(request.params.id)
      response.json({Messagem : 'Mulher deletada com sucesso!'})
  } catch(erro) {
    console.log(erro)  }
 }
// Porta
function mostraPorta() {
 console.log ("servidor criado e rodando na porta", porta)    
} 


app.use(router.get('/mulheres',mostraMulheres)) //Configurei rota GET/Mulheres
app.use(router.post('/mulheres',criaMulher)) //Configurei rota POST 
app.use(router.patch('/mulheres/:id',corrigeMulher)) //configurei rota PATCH 
app.use(router.delete('/mulheres/:id', deletaMulher ))
app.listen(porta, mostraPorta) //Servidor ouvindo a porta