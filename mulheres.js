const express = require ("express")  // Aqui estou iniciando o express
const router= express.Router()  // Aqui estou configurando a primeira parte da rota
const {v4: uuidv4} = require('uuid');

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

    
// Porta
function mostraPorta() {
 console.log ("servidor criado e rodando na porta", porta)    
} 
function fixJsonString(str) {
  const fixedStr = str.replace(/'/g, '"').replace(/(\w+):/g, '"$1":');
  return JSON.parse(fixedStr);
 }

app.use(router.get('/mulheres',mostraMulheres)) //Configurei rota GET/Mulheres
app.use(router.post('/mulheres',criaMulher)) //Configurei rota POST 
app.listen(porta, mostraPorta) //Servidor ouvindo a porta