import Express  from 'express';

const express = require('express');
const productManager = require('./ProductManager');
const app = express();
app.get('/productos', async (req, res) => {
  try {
    const productos = await productManager.getAllProducts();
    res.send(productos);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
})
const PORT=8080;

app.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 3000');
  });
  