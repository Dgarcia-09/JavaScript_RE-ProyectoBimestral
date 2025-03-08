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


### Autenticación
#### Registro
**URL:** `/proyectoBimestral/v1/auth/register`  
**Método:** `POST`  
**Descripción:** Permite registrar un usuario con los siguientes campos:
- `name`
- `surname`
- `username`
- `email`
- `password`
- `profilePicture`
- `role` (CLIENT_ROLE o ADMIN_ROLE)

#### Login
**URL:** `/proyectoBimestral/v1/auth/login`  
**Método:** `POST`  
**Descripción:** Permite iniciar sesión con los siguientes campos:
- `username`
- `password`

### Usuarios
#### Añadir Usuario
**URL:** `/proyectoBimestral/v1/user/addUser`  
**Método:** `POST`  
**Descripción:** Permite crear un nuevo usuario (solo para ADMIN_ROLE). 

#### Modificar Rol
**URL:** `/proyectoBimestral/v1/user/modifyRole/:id`  
**Método:** `PATCH`  
**Descripción:** Permite modificar el rol de un usuario (solo para ADMIN_ROLE).

#### Eliminar Usuario
**URL:** `/proyectoBimestral/v1/user/deleteUser/:id`  
**Método:** `DELETE`  
**Descripción:** Permite eliminar un usuario (solo para ADMIN_ROLE).

#### Actualizar Usuario
**URL:** `/proyectoBimestral/v1/user/updateUser/:id`  
**Método:** `PUT`  
**Descripción:** Permite actualizar los datos de un usuario.

#### Actualizar Contraseña
**URL:** `/proyectoBimestral/v1/user/updatePassword/:id`  
**Método:** `PATCH`  
**Descripción:** Permite actualizar la contraseña de un usuario.

#### Actualizar Foto de Perfil
**URL:** `/proyectoBimestral/v1/user/updatePFP/:id`  
**Método:** `PATCH`  
**Descripción:** Permite actualizar la foto de perfil de un usuario.

## Categorías

### Agregar Categoría
**POST** `/proyectoBimestral/v1/category/addCategory`
```json
{
  "name": "Electrodomésticos"
}
```

### Listar Categorías
**GET** `/proyectoBimestral/v1/category/`

### Actualizar Categoría
**PATCH** `/proyectoBimestral/v1/category/updateCategory/:id`
```json
{
  "name": "Higiene Personal"
}
```

### Eliminar Categoría
**DELETE** `/proyectoBimestral/v1/category/deleteCategory/:id`

---

## Productos

### Agregar Producto
**POST** `/proyectoBimestral/v1/product/addProduct`
- FormData
  - `name`: Nombre del producto
  - `price`: Precio del producto
  - `descryption`: Descripción del producto
  - `stock`: Stock disponible
  - `sold`: Productos vendidos
  - `category`: ID de la categoría
  - `image`: Archivo de imagen

### Listar Productos
**GET** `/proyectoBimestral/v1/product/`

### Buscar Producto por Nombre
**GET** `/proyectoBimestral/v1/product/searchProduct/:name`

### Buscar Producto por Categoría
**GET** `/proyectoBimestral/v1/product/searchProduct/category/:idCategory`

### Actualizar Producto
**PUT** `/proyectoBimestral/v1/product/updateProduct/:id`
```json
{
  "name": "Nuevo Producto",
  "price": "50.0",
  "descryption": "Descripción actualizada",
  "stock": "10",
  "sold": "2"
}
```

### Eliminar Producto
**DELETE** `/proyectoBimestral/v1/product/deleteProduct/:id`

### Productos Agotados
**GET** `/proyectoBimestral/v1/product/soldOut`

### Productos Más Vendidos
**GET** `/proyectoBimestral/v1/product/mostSold`

### Productos Menos Vendidos
**GET** `/proyectoBimestral/v1/product/lessSold`

---

## Carrito de Compras

### Agregar Producto al Carrito
**POST** `/proyectoBimestral/v1/shoppingCar/addToCar`
```json
{
  "product": "ID del producto",
  "quantity": 2
}
```

### Listar Productos del Carrito
**GET** `/proyectoBimestral/v1/shoppingCar/`

### Eliminar Producto del Carrito
**DELETE** `/proyectoBimestral/v1/shoppingCar/deleteProduct/:id`

### Vaciar Carrito
**DELETE** `/proyectoBimestral/v1/shoppingCar/emptyCar`

---

## Usuarios

### Obtener Perfil de Usuario
**GET** `/proyectoBimestral/v1/user/profile`

### Actualizar Usuario
**PUT** `/proyectoBimestral/v1/user/updateUser`
```json
{
  "name": "Nuevo Nombre",
  "email": "nuevo@gmail.com"
}
```

### Eliminar Usuario
**DELETE** `/proyectoBimestral/v1/user/deleteUser`

---

## Notas
- Todos los endpoints protegidos requieren autenticación con Bearer Token.
- El token se debe enviar en los headers con la clave `Authorization`.


