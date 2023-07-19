import { Router } from "express";
import { CartManager } from "../managers/CartManager.js";

const router = Router()
const cartService = new CartManager("../Primera Entrega BE/src/data/carritos.json")

router.post("/",async(req,res)=>{
    try {
        const {productId, quantity} = req.body
        await cartService.addCart({productId, quantity})
        res.json({message:"Carrito Agregado"})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get("/:cartId",async(req,res)=>{
    try {
        const cartId = parseInt(req.params.cartId)
        const getCartById = await cartService.getProductsInCart(cartId)
        getCartById ? res.json(getCartById) : res.json("El carrito buscado no fue encontrado")
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get("/:cartId/product/:productId",async(req,res)=>{
    try {
        const cartId = parseInt(req.params.cartId)
        const productId = parseInt(req.params.productId)
        const quantity = req.body
        const addProductsInCart = await cartService.addProductsInCart(cartId, productId, quantity)
        addProductsInCart ? res.json(addProductsInCart) : res.json("El carrito buscado no fue encontrado")
    } catch (error) {
        res.status(500).json(error.message)
    }
})

export {router as cartsRouter}