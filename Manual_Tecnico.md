##
### Inicio de sesion
> POST: localhost:3000/iniciarSesion

**Request**
```json
{
    "correoElectronico":"Admin.1@gmail.com",
    "contrasena":"12345678"
}
```
**Response**
```json
{
    "mensaje": "Inicio de sesión exitoso",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzUyMzI4MDksImV4cCI6MTczNTMxOTIwOX0.yeLUGNId5TZzKzzsuJojBSYWRW6nfmQqh-pQaiu1DSE",
    "usuario": [
        [
            {
                "idUsuarios": 1,
                "idRol": 1,
                "idEstados": 1,
                "correoElectronico": "Admin.1@gmail.com",
                "nombreCompleto": "admin admin",
                "password": "12345678",
                "telefono": "123456789",
                "fechaNacimiento": "2024-12-25",
                "fechaCreacion": "2024-12-26T10:20:18.373Z",
                "idClientes": null
            }
        ],
        1
    ]
}
```
![inicio de sision](./imagenes/iniciarSesion.png)

## Creacion de estados
> POST: localhost:3000/crearEstado

**Request**
```json
{ 
    "nombre": "Inactivo"
}
```
**Response**
```json
{
    "mensaje": "Estado insertado correctamente:",
    "data": [
        [],
        1
    ]
}
```
![creacion de estados](./imagenes/creacionEstado.png)

## Creacion de usuarios
> POST: localhost:3000/crearUsuario

**Request**
```json
{ 
    "idRol": 1, 
    "idEstados": 1,
    "correoElectronico": "admin@gmail.com",
    "nombreCompleto": "Admin User", 
    "password": "pass123", 
    "telefono": "1234567890", 
    "fechaNacimiento": "1990-01-01", 
    "idClientes": null
}
```
**Response**
```json
{
    "mensaje": "Usuario insertado correctamente:",
    "data": [
        [
            {
                "resultado": "Usuario registrado exitosamente"
            }
        ],
        2
    ]
}
```
![crear usuario](./imagenes/creacionUsuario.png)