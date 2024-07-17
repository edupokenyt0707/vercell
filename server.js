const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware para adicionar o cabeçalho ngrok-skip-browser-warning
app.use((req, res, next) => {
  res.setHeader('ngrok-skip-browser-warning', 'true');
  next();
});

app.use(express.static('public'));

let dadosRecebidos = false; // Variável para controlar se os dados já foram recebidos

io.on('connection', (socket) => {
  console.log('Um usuário se conectou');
  
  socket.on('formSubmit', (data) => {
    if (!dadosRecebidos) {
      console.log(`Campo 1: ${data.campo1}`);
      console.log(`Campo 2: ${data.campo2}`);
      dadosRecebidos = true; // Marca os dados como recebidos
    }
  });

  socket.on('disconnect', () => {
    console.log('Usuário se desconectou');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
