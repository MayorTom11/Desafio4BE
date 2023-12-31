import fs from "fs"
import { ProductManager } from "./ProductManager.js"

const productService = new ProductManager("../Primera Entrega BE/src/data/productos.json")

export class CartManager {
    constructor(route){
        this.path = route
    }

    fileExists(){
       return fs.existsSync(this.path)
    }

    async readCarts(){
        try {
            if(this.fileExists){
                const carts = await fs.promises.readFile(this.path,"utf-8")
                const cartsJson = JSON.parse(carts)
                return cartsJson
            }else{
                return "El archivo no existe"
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    async getCarts(){
        try {
            if(this.fileExists){
                return this.readCarts()
            }else{
                return "El archivo no existe"
            }
        } catch (error) {
            console.log(error.message)
        }
        
    }

    async addCart({productId, quantity}){
        const addCart = await this.readCarts()
        let newId = addCart.length 
                    ? addCart[addCart.length-1].id+1
                    : 1
        const newCart = {
            id:newId,
            products:[{productId, quantity}]
        }

        try {
            addCart.push(newCart)
            await fs.promises.writeFile(this.path,JSON.stringify(addCart,null,'\t'))
            return "Carrito Agregado"
        } catch (error) {
            return error.message
        }
    }

    async getProductsInCart(CartId){
        try {
            const getCartById = await this.readCarts()
            const getId = getCartById.find((CartsId)=>{return CartsId.id === CartId})
            if(getId == undefined){
                return "El carrito no fue encontrado"
            }else{
                return getId
            }
        } catch (error) {
            return error.message
        }
    }

    async addProductsInCart(cartId, productId, quantity){
        const updateCart = {
            products:[{productId, quantity}]
        }
        try {
            const getCartById = await this.readCarts()
            const getId = getCartById.find((CartsId)=>{return CartsId.id === cartId})
            if(getId == undefined){
                return "El carrito no fue encontrado"
            }else{
                getCartById.push(updateCart)
                await fs.promises.writeFile(this.path,JSON.stringify(getId,null,'\t'))
                return "El carrito fue actualizado"
            }
        } catch (error) {
            return error.message
        }
    }
}