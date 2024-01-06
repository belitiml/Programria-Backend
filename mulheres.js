const express = require ("express")  // Aqui estou iniciando o express
const router= express.Router()  // Aqui estou configurando a primeira parte da rota
const { v4: uuidv4 } = require('uuid');

const conectaBancoDeDados = require('./bancoDeDados') //Ligando ao arquivo Banco de Dados
conectaBancoDeDados ()//Chamando a função que conecta o banco de dados 

const app = express()  // Aqui estou iniciando o App
app.use(express.json())


const porta = 3333 //Aqui estou criando a porta

// Aqui estou criando a lista inicial de mulheres
const mulheres = [
    {
        id: '1',
        nome: 'Simara Conceição',
     
        imagem: 'https://bit.ly/3LJIyOF',
     
        minibio: 'Desenvolvedora e instrutora',
     
      },
     
      {
        id: '2',
        nome: 'Iana Chan',
        imagem: 'https://bit.ly/3JCXBqP',
     
        minibio: 'CEO & Founder da PrograMaria',
     
      },
     
      {
        id: '3',
        nome: 'Luana Pimentel',
     
        imagem: 'https://bit.ly/3FKpFaz',
     
        minibio: 'Senior Staff Software Engineer',
     
      }
      
]


//Get
function mostraMulheres(request, response) {
    response.json(mulheres)
}

//POST //Toda função atrelada a uma rota ela recebe os parametros Request e response
function criaMulher(request, response){
  const novaMulher = {
    id: uuidv4(),
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio
  }
  mulheres.push(novaMulher)
    
    response.json(mulheres)
}
//PATCH
function corrigeMulher(request, response){
  function encontraMulher(mulher){
    if (mulher.id === request.params.id){
        return mulher 
    }

  }
        const mulherEncontrada = mulheres.find(encontraMulher)

  if (request.body.nome){
    mulherEncontrada.nome = request.body.nome
  }
  if (request.body.minibio){
    mulherEncontrada.minibio = request.body.minibio
  }
  if (request.body.imagem){
    mulherEncontrada.imagem = request.body.imagem
  }
response.json(mulheres)

}
//DELETE
function deletaMulher(request, response) {

  function todasMenosEla(mulher) {
 
    if (mulher.id !== request.params.id) {
 
      return mulher
 
    }
 
  }
 
  const mulheresQueFicaram = mulheres.filter(todasMenosEla)
  response.json(mulheresQueFicaram)
 
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