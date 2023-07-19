import { Router } from "express";
import { ProductManager } from "../managers/ProductManager.js"

const router = Router()
const productService = new ProductManager("../Desafío 4/src/data/productos.json")

const getProducts = await productService.getProducts()

router.get("/",async(req,res)=>{
    res.render("home",{getProducts})
})

router.get("/realtimeproducts",(req,res)=>{
    res.render("realTimeProducts")
})

export {router as viewsRouter}