import { Router } from "express";
import { ProductManager } from "../managers/ProductManager.js"

const router = Router()
const productService = new ProductManager("../Primera Entrega BE/src/data/productos.json")

router.get("/",async(req,res)=>{
    try {
        const limit = req.query.limit
        const getProducts = await productService.getProducts()
        const slice1 = getProducts.slice(0,limit)
        limit == undefined ? res.json(getProducts) : res.json(slice1)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get("/:productId",async(req,res)=>{
    try {
        const productId = parseInt(req.params.productId)
        const getProductById = await productService.getProductById(productId)
        getProductById ? res.json(getProductById) : res.json("El producto buscado no fue encontrado")
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post("/",async(req,res)=>{
    const {title, description, price, thumbnail, code, stock, category,status} = req.body
    if(!title || !description || !price || !thumbnail || !code || !stock || !category){
        res.json({message:'Por favor, revisar todos los campos'})
    }else{
        try {
            await productService.addProduct({title, description, price, thumbnail, code, stock, category,status})
            res.json({message:"Producto Agregado"})
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
})

router.put("/:productId",async(req,res)=>{
    try {
        const updateProduct = req.body
        const productId = parseInt(req.params.productId)
        await productService.updateProduct(productId, updateProduct)
        res.json({message:"Producto modificado"})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.delete("/:productId",async(req,res)=>{
    try {
        const productId = parseInt(req.params.productId)
        await productService.deleteProduct(productId)
        res.json({message:"Producto eliminado"})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

export {router as productsRouter}