const express = require('express');
import ProductManager from './product.manager.js';
const app = express();
const productManager = new ProductManager('./products.json')
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

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto, ${PORT}`);
  });
  