import { Error_existencias, Error_factura, Error_producto } from "../errores";
import { Existencias } from "../existencias";
import { Factura } from "../factura";
import { Producto } from "../producto";
import { Tipo_producto } from "../tipo_producto";

let aProduct: Producto
let almacen: Existencias
let factura: Factura

beforeAll(() => {
    almacen = new Existencias()
    factura = new Factura()
    aProduct = new Producto(1,"Casio F91W","Casio",Tipo_producto.RELOJERIA_COTIDIANA,12.90)
})

describe('Clase Producto', () => {
    it('Comprobar creación de producto', () => {
        const invalidID = () => {
            new Producto(-1,"","",Tipo_producto.UNDEFINED,0.00)
        };
        expect(invalidID).toThrow(Error_producto)  
        
        const noName = () => {
            new Producto(1,"","",Tipo_producto.UNDEFINED,0.00)
        };
        expect(noName).toThrow(Error_producto) 

        const shortName = () => {
            new Producto(1,"A","",Tipo_producto.UNDEFINED,0.00)
        };
        expect(shortName).toThrow(Error_producto)  

        const longName = () => {
            new Producto(1,"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","",Tipo_producto.UNDEFINED,0.00)
        };
        expect(longName).toThrow(Error_producto)  

        const noBrand = () => {
            new Producto(1,"Colonia de prueba","",Tipo_producto.UNDEFINED,0.00)
        };
        expect(noBrand).toThrow(Error_producto)  

        const shortBrand = () => {
            new Producto(1,"Colonia de prueba","A",Tipo_producto.UNDEFINED,0.00)
        };
        expect(shortBrand).toThrow(Error_producto)  

        const longBrand = () => {
            new Producto(1,"Colonia de prueba",
                            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",Tipo_producto.UNDEFINED,0.00)
        };
        expect(longBrand).toThrow(Error_producto)  
        
        const freePrice = () => {
            new Producto(1,"Colonia de prueba","Testing brand",Tipo_producto.UNDEFINED,0.00)
        };
        expect(freePrice).toThrow(Error_producto)  
    })

    it('Comprobar getters', () => {
        expect(aProduct.id_producto).toBe(1)
        expect(aProduct.nombre).toBe("Casio F91W")
        expect(aProduct.marca).toBe("Casio")
        expect(aProduct.tipo).toBe(Tipo_producto.RELOJERIA_COTIDIANA)
        expect(aProduct.PVP).toBe(12.90)
    })

})


describe('Clase Factura', () => {
    it('Comprobar añadir producto a factura', () => {
        const invalidQuantity = () => {
            factura.aniadir_producto(aProduct,-99)
        };
        expect(invalidQuantity).toThrow(Error_factura)
        
        factura.aniadir_producto(aProduct,3)
        
        const alreadyExistingID = () => {
            factura.aniadir_producto(aProduct,5)
        };
        expect(alreadyExistingID).toThrow(Error_factura)        
    })

    it('Comprobar obtener producto de factura', () => {
        let pair = factura.obtener_producto(1)
        expect(pair?.[0].id_producto).toBe(1)
        expect(pair?.[1]).toBe(3)

        const invalidID = () => {
            factura.obtener_producto(-2)
        };
        expect(invalidID).toThrow(Error_factura) 

        const noExistingID = () => {
            factura.obtener_producto(99)
        };
        expect(noExistingID).toThrow(Error_factura) 
    })

    it('Comprobar eliminar producto de factura', () => {
        const invalidID = () => {
            factura.eliminar_producto(-2)
        };
        expect(invalidID).toThrow(Error_factura) 

        const noExistingID = () => {
            factura.eliminar_producto(5)
        };
        expect(noExistingID).toThrow(Error_factura) 

        factura.eliminar_producto(1)
        expect(factura.get_num_items()).toBe(0)
    })
    
    
    it('Comprobar fecha de factura', () => {
        let actual_date = new Date()
        expect(factura.fecha.toISOString().split('T')[0]).toStrictEqual(actual_date.toISOString().split('T')[0])
    })

    it('Comprobar total de la factura', () => {
        let product2 = new Producto(2,"Giorgio Armani My Way","Giorgio Armano",Tipo_producto.PERFUME,42.70)
        let product3 = new Producto(3,"Huawei Watch 3","Huawei",Tipo_producto.RELOJERIA_PREMIUM,269.90)
        let product4 = new Producto(4,"Opel Corsa","Opel",Tipo_producto.UNDEFINED,2199.99)

        factura.aniadir_producto(aProduct,3)
        factura.aniadir_producto(product2,2)
        factura.aniadir_producto(product3,4)
        factura.aniadir_producto(product4)
        
        let expected_total = 12.90*3+42.70*2+269.90*4
        expect(factura.calcular_total().toFixed(2)).toStrictEqual(expected_total.toFixed(2)) 
    })

    it('Comprobar actualizar cantidad de producto en factura', () => {
        const invalidID = () => {
            factura.actualizar_cantidad_producto(-1,24)
        };
        expect(invalidID).toThrow(Error_factura) 

        const invalidQuantity = () => {
            factura.actualizar_cantidad_producto(1,-4)
        };
        expect(invalidQuantity).toThrow(Error_factura) 

        const noExistingID = () => {
            factura.actualizar_cantidad_producto(112,4)
        };
        expect(noExistingID).toThrow(Error_factura) 

        factura.actualizar_cantidad_producto(1,7)
        expect(factura.obtener_producto(1)?.[1]).toBe(7)  
    })

})


describe('Clase Existencias', ()  => {
    it("Añadir productos al almacén", () => {
        const invalidQuantity = () => {
            almacen.aniadir_producto(aProduct,-99)
        };
        expect(invalidQuantity).toThrow(Error_existencias); 
        
        almacen.aniadir_producto(aProduct)
        const alreadyExistingID = () => {
            almacen.aniadir_producto(aProduct,12)
        };
        expect(alreadyExistingID).toThrow(Error_existencias); 

    })

    it("Obtener productos del almacen", () => {
        const invalidID = () => {
            almacen.obtener_producto(-4)
        };
        expect(invalidID).toThrow(Error_existencias); 

        const noExistingID = () => {
            almacen.obtener_producto(121)
        };
        expect(noExistingID).toThrow(Error_existencias);  
    })

    it("Eliminar productos del almacen", () => {
        const invalidID = () => {
            almacen.eliminar_producto(-4)
        };
        expect(invalidID).toThrow(Error_existencias); 

        const noExistingID = () => {
            almacen.eliminar_producto(121)
        };
        expect(noExistingID).toThrow(Error_existencias);  

        almacen.eliminar_producto(1)
        expect(almacen.get_num_items()).toBe(0)
    })

    it("Asegurar cantidades positivas en el almacén", () => {
        const invalidID = () => {
            almacen.actualizar_cantidad_producto(-1,99)
        };
        expect(invalidID).toThrow(Error_existencias); 
        
        almacen.aniadir_producto(aProduct)
        almacen.actualizar_cantidad_producto(1,4)
        expect(almacen.obtener_producto(1)?.[1]).toBe(4)    

        almacen.actualizar_cantidad_producto(1,-2)
        expect(almacen.obtener_producto(1)?.[1]).toBe(2) 

        const negativeQuantity = () => {
            almacen.actualizar_cantidad_producto(1,-400)
        };
        expect(negativeQuantity).toThrow(Error_existencias); 

        const noExistingID = () => {
            almacen.actualizar_cantidad_producto(121,4)
        };
        expect(noExistingID).toThrow(Error_existencias); 

    })

})






