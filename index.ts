import App from './app'

const app = new App

app.httpServer.listen(3333, () => {
    console.log('Rodando')
})