import { Error_existencias, Error_factura, Error_producto } from "../errores";
import { Existencias } from "../existencias";
import { Factura } from "../factura";
import { Producto } from "../producto";
import { Tipo_producto } from "../tipo_producto";

let p1: Producto
let p2: Producto
let p3: Producto
let p4: Producto
let almacen: Existencias
let factura: Factura

beforeAll(() => {
    almacen = new Existencias()
    factura = new Factura()
    p1 = new Producto(1,"Casio F91W","Casio",Tipo_producto.RELOJERIA_COTIDIANA,12.90)
    p2 = new Producto(2,"Giorgio Armani My Way","Giorgio Armano",Tipo_producto.PERFUME,42.70)
    p3 = new Producto(3,"Huawei Watch 3","Huawei",Tipo_producto.RELOJERIA_PREMIUM,269.90)
    p4 = new Producto(4,"Opel Corsa","Opel",Tipo_producto.UNDEFINED,2199.99)

})

describe('Clase Producto', () => {
    it('Comprobar creación de producto', () => {
        const t1 = () => {
            new Producto(-1,"","",Tipo_producto.UNDEFINED,0.00)
        };
        expect(t1).toThrow(Error_producto)  //Por ID invalido
        
        const t2 = () => {
            new Producto(1,"","",Tipo_producto.UNDEFINED,0.00)
        };
        expect(t2).toThrow(Error_producto)  //Por nombre nulo

        const t3 = () => {
            new Producto(1,"A","",Tipo_producto.UNDEFINED,0.00)
        };
        expect(t3).toThrow(Error_producto)  //Por nombre corto

        const t4 = () => {
            new Producto(1,"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","",Tipo_producto.UNDEFINED,0.00)
        };
        expect(t4).toThrow(Error_producto)  //Por nombre largo

        const t5 = () => {
            new Producto(1,"Colonia de prueba","",Tipo_producto.UNDEFINED,0.00)
        };
        expect(t5).toThrow(Error_producto)  //Por marca nula

        const t6 = () => {
            new Producto(1,"Colonia de prueba","A",Tipo_producto.UNDEFINED,0.00)
        };
        expect(t6).toThrow(Error_producto)  //Por marca corta

        const t7 = () => {
            new Producto(1,"Colonia de prueba",
                            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",Tipo_producto.UNDEFINED,0.00)
        };
        expect(t7).toThrow(Error_producto)  //Por marca larga
        
        const t8 = () => {
            new Producto(1,"Colonia de prueba","Testing brand",Tipo_producto.UNDEFINED,0.00)
        };
        expect(t8).toThrow(Error_producto)  //Por precio invalido
    })

    it('Comprobar getters', () => {
        expect(p1.id_producto).toBe(1)
        expect(p1.nombre).toBe("Casio F91W")
        expect(p1.marca).toBe("Casio")
        expect(p1.tipo).toBe(Tipo_producto.RELOJERIA_COTIDIANA)
        expect(p1.PVP).toBe(12.90)
    })

})


describe('Clase Factura', () => {
    it('Comprobar añadir producto a factura', () => {
        const t1 = () => {
            factura.aniadir_producto(p1,-99)
        };
        expect(t1).toThrow(Error_factura)
        factura.aniadir_producto(p1,3)
        const t2 = () => {
            factura.aniadir_producto(p1,5)
        };
        expect(t2).toThrow(Error_factura)        
    })

    it('Comprobar obtener producto de factura', () => {
        let pair = factura.obtener_producto(1)
        expect(pair?.[0].id_producto).toBe(1)
        expect(pair?.[1]).toBe(3)

        const t2 = () => {
            factura.obtener_producto(-2)
        };
        expect(t2).toThrow(Error_factura) // Por ID invalido

        const t3 = () => {
            factura.obtener_producto(99)
        };
        expect(t3).toThrow(Error_factura) // Por ID no existente
    })

    it('Comprobar eliminar producto de factura', () => {
        const t1 = () => {
            factura.eliminar_producto(-2)
        };
        expect(t1).toThrow(Error_factura) // Por ID invalido

        const t2 = () => {
            factura.eliminar_producto(5)
        };
        expect(t2).toThrow(Error_factura) // Por ID no existente

        factura.eliminar_producto(1)
        expect(factura.get_num_items()).toBe(0)
    })
    
    
    it('Comprobar fecha de factura', () => {
        let actual_date = new Date()
        expect(factura.fecha.toISOString().split('T')[0]).toStrictEqual(actual_date.toISOString().split('T')[0])    //Solo queremos yyyy-mm-dd
    })

    it('Comprobar total de la factura', () => {
        factura.aniadir_producto(p1,3)
        factura.aniadir_producto(p2,2)
        factura.aniadir_producto(p3,4)
        factura.aniadir_producto(p4)
        
        let expected_total = 12.90*3+42.70*2+269.90*4
        // Ha dado problemillas con la precisión de los decimales
        expect(factura.calcular_total().toFixed(2)).toStrictEqual(expected_total.toFixed(2)) 
    })

    it('Comprobar actualizar cantidad de producto en factura', () => {
        const t1 = () => {
            factura.actualizar_cantidad_producto(-1,24)
        };
        expect(t1).toThrow(Error_factura) // Por ID invalido

        const t2 = () => {
            factura.actualizar_cantidad_producto(1,-4)
        };
        expect(t2).toThrow(Error_factura) // Por cantidad  invalida

        const t3 = () => {
            factura.actualizar_cantidad_producto(112,4)
        };
        expect(t3).toThrow(Error_factura) // Por ID np presente en la factura

        factura.actualizar_cantidad_producto(1,7)
        expect(factura.obtener_producto(1)?.[1]).toBe(7)  
    })

})


describe('Clase Existencias', ()  => {
    it("Añadir productos al almacén", () => {
        const t1 = () => {
            almacen.aniadir_producto(p1,-99)
        };
        expect(t1).toThrow(Error_existencias); // Por añadir producto con cantidad negativa
        
        almacen.aniadir_producto(p1)
        const t2 = () => {
            almacen.aniadir_producto(p1,12)
        };
        expect(t2).toThrow(Error_existencias); // Por añadir producto existente

    })

    it("Obtener productos del almacen", () => {
        const t1 = () => {
            almacen.obtener_producto(-4)
        };
        expect(t1).toThrow(Error_existencias); // Por ID invalido

        const t2 = () => {
            almacen.obtener_producto(121)
        };
        expect(t2).toThrow(Error_existencias); // Por ID no existente 
    })

    it("Eliminar productos del almacen", () => {
        const t1 = () => {
            almacen.eliminar_producto(-4)
        };
        expect(t1).toThrow(Error_existencias); // Por ID invalido

        const t2 = () => {
            almacen.eliminar_producto(121)
        };
        expect(t2).toThrow(Error_existencias); // Por ID no existente 

        almacen.eliminar_producto(1)
        expect(almacen.get_num_items()).toBe(0)
    })

    it("Asegurar cantidades positivas en el almacén", () => {
        const t1 = () => {
            almacen.actualizar_cantidad_producto(-1,99)
        };
        expect(t1).toThrow(Error_existencias); // Por ID invalido
        
        const t2 = () => {
            almacen.actualizar_cantidad_producto(1,-4)
        };
        expect(t2).toThrow(Error_existencias); // Como resultado de obtener cantidad negativa

        const t3 = () => {
            almacen.actualizar_cantidad_producto(121,4)
        };
        expect(t3).toThrow(Error_existencias); // Por ID no existente en la factura

        almacen.aniadir_producto(p1)
        almacen.actualizar_cantidad_producto(1,4)
        expect(almacen.obtener_producto(1)?.[1]).toBe(4)    

        almacen.actualizar_cantidad_producto(1,-2)
        expect(almacen.obtener_producto(1)?.[1]).toBe(2)    //4 que tenía y 2 que le resto

        const t4 = () => {
            almacen.actualizar_cantidad_producto(1,-1000)
        };
        expect(t4).toThrow(Error_existencias); // Por intentar asignar cantidad resultado negativa
    })


})






