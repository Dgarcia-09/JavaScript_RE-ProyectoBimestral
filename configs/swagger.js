import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Proyecto Bimestral",
            version: "1.0.0",
            description: "API para un supermercado",
            contact:{
                name: "Diego Garcia",
                email: "dgarcia-2023532@kinal.org.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/proyectoBimestral/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/category/category.routes.js",
        "./src/cart/cart.routes.js",
        "./src/bill/bill.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}