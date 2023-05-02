import express from 'express';
import ProductManager from './manager/product.manager.js';
const app = express();
const express = require('express');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const productManager = new ProductManager('./products.json');
// app.get('/products', async (req, res) => {
//     try {
//         const products = await productManager.getAllProducts();
//         res.status(200).json(products); 
//     } catch (error){
//         res.status(404).json ({message: error.message})
//         console.log(error);
//     }
// });
app.get('/products', (req, res) => {
    fs.readFile('./productos.json', (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }
      const productos = JSON.parse(data);

      const limit = parseInt(req.query.limit);
      if (!isNaN(limit) && limit > 0) {
        res.send(productos.slice(0, limit));
      } else {
        res.send(productos);
      }
    });
  });

app.get('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const product = await productManager.getProductById(Number (id))
        if(product){
            res.status(2000).json({message: 'Producto encontrado', product})
        } else {
            res.status(400).json ({message: 'not found'})
        }
    } catch (error) {
        res.staus(404).json({ message: error.message })

        }
    });


app.post('/products', async (req, res) => {
        try {
            const product = req.body;
            const newProduct = await productManager.createProduct(product)
            const productFile = await productManager.getProduct
            res.json(newProduct);
        } catch (error) {
            res.status(404).json ({message: error.message})
        }
    });

    app.put('/products/:id',async(req, res) => {
        try {
            // const {name, price, stock}= req.body;
            // const product ={
            //     name,
            //     price,
            //     stock
            // }
            const product = req.body
            const {id} = req.params
            const productFile = await productManager.getProduct(Number(id))
            if (productFile){
                await productManager.updateProduct(product, Number(id))
                res.send ('product updated successfully')
            } else {
                res.status(404).send('Product not found')
            }
        } catch (error) {
            res.status(404).json({message: error.message})
        }
    })
    app.delete('./products/:id', async (req, res) => {
        try {
            const id=req.params.getAllProducts()
            if (products.length > 0) {
                await productsManager.deleteProductById(Number(id))
                res.send ('product id ${id} not found')
        } 
    }catch (error) {
            res.status(404).json({message: error.message})   
         } 
    })
const PORT = 8080;
app.listen(PORT, ()=>{
    console.log(`server listening on port: ${PORT}`);
});