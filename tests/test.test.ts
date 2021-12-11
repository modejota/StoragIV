import { Error_existencias, Error_factura, Error_handler, Error_producto } from  "../src/errores"
import { Existencias } from "../src/models/existencias";
import { Factura } from "../src/models/factura";
import { Producto } from "../src/models/producto";
import { Tipo_producto } from "../src/models/tipo_producto";
import { Handler } from "../src/handler";

let aProduct: Producto
let theHandler: Handler

beforeAll(() => {
    theHandler = new Handler()
    aProduct = theHandler.crear_producto(1,"Casio F91W","Casio",Tipo_producto.RELOJERIA_COTIDIANA,12.90) 
})

describe('Tests de toda la aplicación', () => {
    it('Creacion de productos', () => {
        const invalidID = () => {
            theHandler.crear_producto(-1,"","",Tipo_producto.UNDEFINED,0.00)
        };
        expect(invalidID).toThrow(Error_handler)  

        const noName = () => {
            theHandler.crear_producto(1,"","",Tipo_producto.UNDEFINED,0.00)
        };
        expect(noName).toThrow(Error_handler) 

        const shortName = () => {
            theHandler.crear_producto(1,"A","",Tipo_producto.UNDEFINED,0.00)
        };
        expect(shortName).toThrow(Error_handler)  

        const longName = () => {
            theHandler.crear_producto(1,"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","",Tipo_producto.UNDEFINED,0.00)
        };
        expect(longName).toThrow(Error_handler)  

        const noBrand = () => {
            theHandler.crear_producto(1,"Colonia de prueba","",Tipo_producto.UNDEFINED,0.00)
        };
        expect(noBrand).toThrow(Error_handler)  

        const shortBrand = () => {
            theHandler.crear_producto(1,"Colonia de prueba","A",Tipo_producto.UNDEFINED,0.00)
        };
        expect(shortBrand).toThrow(Error_handler)  

        const longBrand = () => {
            theHandler.crear_producto(1,"Colonia de prueba",
                            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",Tipo_producto.UNDEFINED,0.00)
        };
        expect(longBrand).toThrow(Error_handler)  
        
        const freePrice = () => {
            theHandler.crear_producto(1,"Colonia de prueba","Testing brand",Tipo_producto.UNDEFINED,0.00)
        };
        expect(freePrice).toThrow(Error_handler)  
    })

    it('Comprobar getters del producto', () => {
        expect(aProduct.id_producto).toBe(1)
        expect(aProduct.nombre).toBe("Casio F91W")
        expect(aProduct.marca).toBe("Casio")
        expect(aProduct.tipo).toBe(Tipo_producto.RELOJERIA_COTIDIANA)
        expect(aProduct.PVP).toBe(12.90)
    })

    it('Crear y añadir factura', () => {
        theHandler.crear_factura(1)
        expect(theHandler.get_num_items_factura(1) == 1)

        const repeatedID = () => {
            theHandler.crear_factura(1)
        };
        expect(repeatedID).toThrow(Error_handler)

        const invalidID = () => {
            theHandler.crear_factura(-10)
        };
        expect(invalidID).toThrow(Error_handler)
    })

    it('Obtener factura', () => {
        let factura = theHandler.obtener_factura(1)
        let actual_date = new Date()
        expect(factura.fecha.toISOString().split('T')[0]).toStrictEqual(actual_date.toISOString().split('T')[0])

        const invalidID = () => {
            theHandler.obtener_factura(-1)
        };
        expect(invalidID).toThrow(Error_handler)

        const noExistingID = () => {
            theHandler.obtener_factura(67)
        };
        expect(noExistingID).toThrow(Error_handler)
    })

    it('Comprobar añadir producto a factura', () => {
        const invalidID_factura = () => {
            theHandler.aniadir_producto_factura(-10,aProduct,-99)
        };
        expect(invalidID_factura).toThrow(Error_handler)
        
        const invalidQuantity = () => {
            theHandler.aniadir_producto_factura(1,aProduct,-99)
        };
        expect(invalidQuantity).toThrow(Error_handler)
        
        theHandler.aniadir_producto_factura(1,aProduct,3)
        
        const alreadyExistingID = () => {
            theHandler.aniadir_producto_factura(1,aProduct,5)
        };
        expect(alreadyExistingID).toThrow(Error_handler)        
    })

    it('Comprobar obtener producto de factura', () => {
        const invalidFactura = () => {
            theHandler.obtener_producto_factura(4,1)
        };
        expect(invalidFactura).toThrow(Error_handler)
        
        const invalidProducto = () => {
            theHandler.obtener_producto_factura(1,-2)
        };
        expect(invalidProducto).toThrow(Error_handler)    
        
        const noExstingProducto = () => {
            theHandler.obtener_producto_factura(1,99)
        };
        expect(noExstingProducto).toThrow(Error_handler)   
    
        let pair = theHandler.obtener_producto_factura(1,1)
        expect(pair?.[0].id_producto).toBe(1)
        expect(pair?.[1]).toBe(3)
        
        const noExistingFactura2 = () => {
            theHandler.get_num_items_factura(100)
        };
        expect(noExistingFactura2).toThrow(Error_handler)    

    })

    it('Comprobar actualizar cantidad de producto en factura', () => {
        const invalidID_factura = () => {
            theHandler.actualizar_cantidad_producto_factura(-1,-1,24)
        };
        expect(invalidID_factura).toThrow(Error_handler) 

        const invalidID_producto = () => {
            theHandler.actualizar_cantidad_producto_factura(1,-1,24)
        };
        expect(invalidID_producto).toThrow(Error_handler) 

        const invalidQuantity = () => {
            theHandler.actualizar_cantidad_producto_factura(1,1,-4)
        };
        expect(invalidQuantity).toThrow(Error_handler) 

        const noExistingID = () => {
            theHandler.actualizar_cantidad_producto_factura(1,112,4)
        };
        expect(noExistingID).toThrow(Error_handler) 

        theHandler.actualizar_cantidad_producto_factura(1,1,7)
        expect(theHandler.obtener_producto_factura(1,1)?.[1]).toBe(7)  
    })

    it('Comprobar total de la factura', () => {
        let product2 = theHandler.crear_producto(2,"Giorgio Armani My Way","Giorgio Armano",Tipo_producto.PERFUME,42.70)
        let product3 = theHandler.crear_producto(3,"Huawei Watch 3","Huawei",Tipo_producto.RELOJERIA_PREMIUM,269.90)
        let product4 = theHandler.crear_producto(4,"Opel Corsa","Opel",Tipo_producto.UNDEFINED,2199.99)

        theHandler.aniadir_producto_factura(1,product2,2)
        theHandler.aniadir_producto_factura(1,product3,4)
        theHandler.aniadir_producto_factura(1,product4)
        
        let expected_total = 12.90*7+42.70*2+269.90*4
        expect(theHandler.calcular_total_factura(1).toFixed(2)).toStrictEqual(expected_total.toFixed(2)) 

        const noExistingFactura = () => {
            theHandler.calcular_total_factura(4)
        };
        expect(noExistingFactura).toThrow(Error_handler)

    })

    it('Eliminar producto de factura y eliminar factura', () => {
        const invalidFactura = () => {
            theHandler.eliminar_producto_factura(-4,1)
        };
        expect(invalidFactura).toThrow(Error_handler)

        const noExistingProducto = () => {
            theHandler.eliminar_producto_factura(1,400)
        };
        expect(noExistingProducto).toThrow(Error_handler)      
        
        const invalidProducto = () => {
            theHandler.eliminar_producto_factura(1,-5)
        };
        expect(invalidProducto).toThrow(Error_handler)    
    
        theHandler.eliminar_producto_factura(1,1)
        expect(theHandler.get_num_items_factura(1)).toBe(3)

        theHandler.eliminar_factura(1)
        expect(theHandler.get_num_facturas()).toBe(0)

        const noExistingFactura = () => {
            theHandler.eliminar_factura(4)
        };
        expect(noExistingFactura).toThrow(Error_handler)
        
    })

    it("Añadir productos al almacén", () => {
        const invalidQuantity = () => {
            theHandler.aniadir_producto_almacen(aProduct,-99)
        };
        expect(invalidQuantity).toThrow(Error_handler); 
        
        theHandler.aniadir_producto_almacen(aProduct)
        const alreadyExistingID = () => {
            theHandler.aniadir_producto_almacen(aProduct,12)
        };
        expect(alreadyExistingID).toThrow(Error_handler); 

    })

    it("Obtener productos del almacen", () => {
        const invalidID = () => {
            theHandler.obtener_producto_almacen(-4)
        };
        expect(invalidID).toThrow(Error_handler); 

        const noExistingID = () => {
            theHandler.obtener_producto_almacen(121)
        };
        expect(noExistingID).toThrow(Error_handler);  

        let otherProduct = theHandler.obtener_producto_almacen(1)
    })

    it("Eliminar productos del almacen", () => {
        const invalidID = () => {
            theHandler.eliminar_producto_almacen(-4)
        };
        expect(invalidID).toThrow(Error_handler); 

        const noExistingID = () => {
            theHandler.eliminar_producto_almacen(121)
        };
        expect(noExistingID).toThrow(Error_handler);  

        theHandler.eliminar_producto_almacen(1)
        expect(theHandler.get_num_items_almacen()).toBe(0)
    })

    it("Asegurar cantidades positivas en el almacén", () => {
        const invalidID = () => {
            theHandler.actualizar_cantidad_producto_almacen(-1,99)
        };
        expect(invalidID).toThrow(Error_handler); 
        
        theHandler.aniadir_producto_almacen(aProduct)
        theHandler.actualizar_cantidad_producto_almacen(1,4)
        expect(theHandler.obtener_producto_almacen(1)?.[1]).toBe(4)    

        theHandler.actualizar_cantidad_producto_almacen(1,-2)
        expect(theHandler.obtener_producto_almacen(1)?.[1]).toBe(2) 

        const negativeQuantity = () => {
            theHandler.actualizar_cantidad_producto_almacen(1,-400)
        };
        expect(negativeQuantity).toThrow(Error_handler); 

        const noExistingID = () => {
            theHandler.actualizar_cantidad_producto_almacen(121,4)
        };
        expect(noExistingID).toThrow(Error_handler); 

    })

    
})







