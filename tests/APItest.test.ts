import server from "../src/app";

describe('Tests de rutas generales', () => {
    it('Root route', async () => {
        const res = await server.inject({
            url: "/",
        });
        expect(res.json()).toEqual({greeting: "Welcome to storagIV API"})
    })

    it('Status route', async () => {
        const res = await server.inject({
            url: "/status",
        });
        expect(res.json()).toEqual({hello: "I am live!"})
        expect(res.statusCode).toBe(200)
    })
})

