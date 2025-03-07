# Proyecto Bimestral 

API para una tienda online que gestiona usuarios, productos, categorias, carritos de compras y otras operaciones comerciales.

## Características

- Inicio de Sesion: Registro e inicio de sesión con generación de tokens JWT.

- Registro: Los usuarios pueden registrarse como ADMIN O CLIENTE.

- Carrito de compras: permite a los usuarios crear un carrito de compras para poder comprar sus productos

- Generacion de facturas: genera una factura luego de confirmar la compra en formato PDF

- Productos y categorias: permite a los administradores agregar productos y asociarlas a una categoria


## Instalación

### Clona el repositorio:

```

https://github.com/Dgarcia-09/JavaScript_RE-ProyectoBimestral.git

```

### Instala las dependencias:


```

npm install

```

### Configura las variables de entorno en un archivo .env:

```

PORT=3001
URI_MONGO=tu_conexion_mongo
SECRETKEY=tu_secreto_jwt

```

Inicia el servidor:

```

npm run dev

```
## Uso

Puedes importar la colección de Postman incluida en el proyecto para probar fácilmente los endpoints.

```
Config/endpoint-colection

```


## Documentación de la API (Swagger)

La documentación completa de la API está disponible a través de Swagger. Puedes acceder a ella una vez que el servidor esté en funcionamiento.

### Ruta de acceso:

```
http://127.0.0.1:3001/api-docs

```


