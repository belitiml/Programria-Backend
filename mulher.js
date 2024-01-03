const express = require ("express")
const router = express.Router()

const app = express()
const porta = 3333 

function mostraMulher(resquest, response) {
    response.json({
        nome: 'Belit Ignacio',
        imagem: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmedium.com%2F%40belit.iml%2Fabout&psig=AOvVaw3TPI2hWZNn6h50a4IVtLsv&ust=1704327507847000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIj6p8r4v4MDFQAAAAAdAAAAABAD ',
        minibio: 'Desenvolvedora e jogadora'
    })
}
 
function mostraPorta() {
 console.log ("servidor criado e rodando na porta", porta)    
} 


app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta)