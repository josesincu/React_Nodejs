/*
==========================================================================================================

	 INICIO DE CREACION DE TABLAS

===========================================================================================================
*/

-- Cambiar a master para eliminar todas las instancias 
USE master;

-- Eliminar la base de datos si existe
GO
IF EXISTS (SELECT 1 FROM sys.databases WHERE name = 'GDA0063-OT_joseCastroSincu')
BEGIN
    DROP DATABASE [GDA0063-OT_joseCastroSincu];
END;

/*
*	En el Codigo se uso la convencion de camelCase
*	Creacion de la base de datos si no existe
*/
GO
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'GDA0063-OT_joseCastroSincu')
BEGIN
    CREATE DATABASE [GDA0063-OT_joseCastroSincu];
END;


-- usando la base de datos
GO
USE [GDA0063-OT_joseCastroSincu];
 
/*
*	Creacion de tablas independientes
*/

-- Tabla Cliente
GO
IF NOT EXISTS (
    SELECT 1 
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_SCHEMA = 'dbo' 
      AND TABLE_NAME = 'clientes'
)
BEGIN
    CREATE TABLE dbo.clientes (
        idClientes INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
        razonSocial VARCHAR(245),
		nombreComercial VARCHAR(34),
		direccionEntrega VARCHAR(45),
		telefono VARCHAR(45),
		email	VARCHAR(45)
    );
END;


-- Tabla Estados
GO
IF NOT EXISTS (
    SELECT 1 
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_SCHEMA = 'dbo' 
      AND TABLE_NAME = 'estados'
)
BEGIN
    CREATE TABLE dbo.estados (
        idEstados INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
        nombre VARCHAR(45)
    );
END;


-- Tabla Rol
GO
IF NOT EXISTS (
    SELECT 1 
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_SCHEMA = 'dbo' 
      AND TABLE_NAME = 'rol'
)
BEGIN
    CREATE TABLE dbo.rol (
        idRol INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
        nombre VARCHAR(45)
    );
END;


-- Tabla Usuarios
GO
IF NOT EXISTS (
    SELECT 1 
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_SCHEMA = 'dbo' 
      AND TABLE_NAME = 'usuarios'
)
BEGIN
    CREATE TABLE dbo.usuarios (
        idUsuarios INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
		idRol INT NOT NULL FOREIGN KEY REFERENCES rol(idRol),
		idEstados INT NOT NULL FOREIGN KEY REFERENCES estados(idEstados),
		correoElectronico VARCHAR(45),
		nombreCompleto VARCHAR(50),
		password	VARCHAR(45),
		telefono VARCHAR(45),
		fechaNacimiento DATE,
		fechaCreacion	DATETIME,
		idClientes INT FOREIGN KEY REFERENCES clientes(idClientes)
    );
END;


-- Tabla Categoria Productos
GO
IF NOT EXISTS (
    SELECT 1 
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_SCHEMA = 'dbo' 
      AND TABLE_NAME = 'categoriaProductos'
)
BEGIN
    CREATE TABLE dbo.categoriaProductos (
        idCategoriaProductos INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
		idUsuarios INT NOT NULL FOREIGN KEY REFERENCES usuarios(idUsuarios),
		nombre VARCHAR(45),
		idEstados INT NOT NULL FOREIGN KEY REFERENCES estados(idEstados),
		fechaCreacion	DATETIME
    );
END;


-- Tabla Orden
GO
IF NOT EXISTS (
    SELECT 1 
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_SCHEMA = 'dbo' 
      AND TABLE_NAME = 'orden'
)
BEGIN
    CREATE TABLE dbo.orden (
        idOrden INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
		idUsuarios INT NOT NULL FOREIGN KEY REFERENCES usuarios(idUsuarios),
		idEstados INT NOT NULL FOREIGN KEY REFERENCES estados(idEstados),
		fechaCreacion	DATETIME,
		nombreCompleto	VARCHAR(50),
		direccion	VARCHAR(545),
		telefono	VARCHAR(45),
		correoElectronico	VARCHAR(45),
		fechaEntrega	DATE,
		totalOrden FLOAT
    );
END;


-- Tabla Productos
GO
IF NOT EXISTS (
    SELECT 1 
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_SCHEMA = 'dbo' 
      AND TABLE_NAME = 'productos'
)
BEGIN
    CREATE TABLE dbo.productos (
        idProductos INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
		idCategoriaProductos INT NOT NULL FOREIGN KEY REFERENCES categoriaProductos(idCategoriaProductos),
		idUsuarios INT NOT NULL FOREIGN KEY REFERENCES usuarios(idUsuarios),
		nombre VARCHAR(45),
		marca	VARCHAR(45),
		codigo	VARCHAR(45),
		stock FLOAT,
		idEstados INT NOT NULL FOREIGN KEY REFERENCES estados(idEstados),
		precio FLOAT,
		fechaCreacion DATETIME,
		foto BINARY
    );
END;


-- Tabla Orden Detalle
GO
IF NOT EXISTS (
    SELECT 1 
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_SCHEMA = 'dbo' 
      AND TABLE_NAME = 'ordenDetalles'
)
BEGIN
    CREATE TABLE dbo.ordenDetalles (
        idOrdenDetalles INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
		idOrden INT NOT NULL FOREIGN KEY REFERENCES orden(idOrden),
		idProductos INT NOT NULL FOREIGN KEY REFERENCES productos(idProductos),
		cantidad INT,
		precio FLOAT,
		subtotal FLOAT
    );
END;

/*
==========================================================================================================

	 INICIO DE PROCEDIMIENTOS PARA CLIENTE

===========================================================================================================
*/

-- Insertar datos en tabla cliente
GO
CREATE PROCEDURE spInsertarCliente
(
    @razonSocial VARCHAR(245),
    @nombreComercial VARCHAR(34),
    @direccionEntrega VARCHAR(45),
    @telefono VARCHAR(45),
    @email VARCHAR(45)
)
AS
BEGIN
    INSERT INTO dbo.clientes (
        razonSocial, nombreComercial, direccionEntrega, telefono, email
    )
    VALUES (
        @razonSocial, @nombreComercial, @direccionEntrega, @telefono, @email
    );
END;

-- Modificar datos de tabal cliente
GO
CREATE PROCEDURE spModificarCliente
(
    @idClientes INT,
    @razonSocial VARCHAR(245),
    @nombreComercial VARCHAR(34),
    @direccionEntrega VARCHAR(45),
    @telefono VARCHAR(45),
    @email VARCHAR(45)
)
AS
BEGIN
    UPDATE dbo.clientes
    SET
        razonSocial = @razonSocial,
        nombreComercial = @nombreComercial,
        direccionEntrega = @direccionEntrega,
        telefono = @telefono,
        email = @email
    WHERE idClientes = @idClientes;
END;


/*
==========================================================================================================

	 INICIO DE PROCEDIMIENTOS PARA ROL

===========================================================================================================
*/

-- Insertar nuevo rol en tabla
GO
CREATE PROCEDURE spInsertarRol
(
    @nombre VARCHAR(45)
)
AS
BEGIN
    INSERT INTO dbo.rol (nombre)
    VALUES (@nombre);
END;


-- Modificar rol en tabla
GO
CREATE PROCEDURE spModificarRol
(
    @idRol INT,
    @nombre VARCHAR(45)
)
AS
BEGIN
    UPDATE dbo.rol
    SET nombre = @nombre
    WHERE idRol = @idRol;
END;



/*
==========================================================================================================

	 INICIO DE PROCEDIMIENTOS PARA ESTADOS

===========================================================================================================
*/

-- Insertar nuevo estado en tabla
GO
CREATE PROCEDURE spInsertarEstado
(
    @nombre VARCHAR(45)
)
AS
BEGIN
    INSERT INTO dbo.estados (nombre)
    VALUES (@nombre);
END;


-- Modificar estado en tabla
GO
CREATE PROCEDURE spModificarEstado
(
    @idEstados INT,
    @nombre VARCHAR(45)
)
AS
BEGIN
    UPDATE dbo.estados
    SET nombre = @nombre
    WHERE idEstados = @idEstados;
END;


/*
==========================================================================================================

	 INICIO DE PROCEDIMIENTOS PARA USUARIO

===========================================================================================================
*/

-- Inserter un nuevo usuario en la tabla
GO
CREATE PROCEDURE spInsertarUsuario
(
    @idRol INT,
    @idEstados INT,
    @correoElectronico VARCHAR(45),
    @nombreCompleto VARCHAR(50),
    @password VARCHAR(45),
    @telefono VARCHAR(45),
    @fechaNacimiento DATE,
    @idClientes INT
)
AS
BEGIN
	IF dbo.fnEsValidoCorreo(@correoElectronico) = 1
	BEGIN
		IF dbo.fnEsCorreoRepetido(@correoElectronico) = 0
			BEGIN
				INSERT INTO dbo.usuarios (
					idRol, idEstados, correoElectronico, nombreCompleto, password, telefono, fechaNacimiento, fechaCreacion, idClientes
				)
				VALUES (
					@idRol, @idEstados, @correoElectronico, @nombreCompleto, @password, @telefono, @fechaNacimiento,  GETDATE(), @idClientes
				);
				SELECT 'Usuario registrado exitosamente' AS resultado;
			END;
		ELSE
			BEGIN
				SELECT -1 AS resultado;
			END;
	END;
	ELSE
		BEGIN
			SELECT -2 AS resultado;
		END;
END;


-- Modificar un usuario en la tabla
GO
CREATE PROCEDURE spModificarUsuario
(
    @idUsuarios INT,
    @idRol INT,
    @idEstados INT,
    @correoElectronico VARCHAR(45),
    @nombreCompleto VARCHAR(50),
    @password VARCHAR(45),
    @telefono VARCHAR(45),
    @fechaNacimiento DATE,
    @idClientes INT
)
AS
BEGIN
    UPDATE dbo.usuarios
    SET
		idRol = @idRol,
        idEstados = @idEstados,
        correoElectronico = @correoElectronico,
        nombreCompleto = @nombreCompleto,
        password = @password,
        telefono = @telefono,
        fechaNacimiento = @fechaNacimiento,
        idClientes = @idClientes
    WHERE idUsuarios = @idUsuarios;
END;


/*
==========================================================================================================

	 INICIO DE PROCEDIMIENTOS PARA CATEGORIA PRODUCTOS

===========================================================================================================
*/

 -- Insertar una nueva categorioa productos
GO
CREATE PROCEDURE spInsertarCategoriaProducto
(
    @idUsuarios INT,
    @nombre VARCHAR(45),
    @idEstados INT
)
AS
BEGIN
    INSERT INTO dbo.categoriaProductos (
        idUsuarios, nombre, idEstados, fechaCreacion
    )
    VALUES (
        @idUsuarios, @nombre, @idEstados,  GETDATE()
    );
END;


-- Modificar una categoria de productos
GO
CREATE PROCEDURE spModificarCategoriaProducto
(
    @idCategoriaProductos INT,
    @idUsuarios INT,
    @nombre VARCHAR(45),
    @idEstados INT
)
AS
BEGIN
    UPDATE dbo.categoriaProductos
    SET
        idUsuarios = @idUsuarios,
        nombre = @nombre,
        idEstados = @idEstados
    WHERE idCategoriaProductos = @idCategoriaProductos;
END;


/*
==========================================================================================================

	 INICIO DE PROCEDIMIENTOS PARA ORDEN

===========================================================================================================
*/

-- Insertar una nueva orden
GO
CREATE PROCEDURE spInsertarOrden
(
    @idUsuarios INT,
    @idEstados INT,
    @nombreCompleto VARCHAR(50),
    @direccion VARCHAR(545),
    @telefono VARCHAR(45),
    @correoElectronico VARCHAR(45),
    @fechaEntrega DATE,
    @totalOrden FLOAT
)
AS
BEGIN
    INSERT INTO dbo.orden (
        idUsuarios, idEstados, fechaCreacion, nombreCompleto, direccion, telefono, correoElectronico, fechaEntrega, totalOrden
    )
    VALUES (
        @idUsuarios, @idEstados,  GETDATE(), @nombreCompleto, @direccion, @telefono, @correoElectronico, @fechaEntrega, @totalOrden
    );
END;


-- Modificar una orden
GO
CREATE PROCEDURE spModificarOrden
(
    @idOrden INT,
    @idUsuarios INT,
    @idEstados INT,
    @nombreCompleto VARCHAR(50),
    @direccion VARCHAR(545),
    @telefono VARCHAR(45),
    @correoElectronico VARCHAR(45),
    @fechaEntrega DATE,
    @totalOrden FLOAT
)
AS
BEGIN
    UPDATE dbo.orden
    SET
        idUsuarios = @idUsuarios,
        idEstados = @idEstados,
        nombreCompleto = @nombreCompleto,
        direccion = @direccion,
        telefono = @telefono,
        correoElectronico = @correoElectronico,
        fechaEntrega = @fechaEntrega,
        totalOrden = @totalOrden
    WHERE idOrden = @idOrden;
END;


/*
==========================================================================================================

	 INICIO DE PROCEDIMIENTOS PARA PRODUCTOS

===========================================================================================================
*/

-- Insertar un nuevo producto
GO
CREATE PROCEDURE spInsertarProducto
(
    @idCategoriaProductos INT,
    @idUsuarios INT,
    @nombre VARCHAR(45),
    @marca VARCHAR(45),
    @codigo VARCHAR(45),
    @stock FLOAT,
    @idEstados INT,
    @precio FLOAT,
    @foto VARBINARY(MAX)
)
AS
BEGIN
    INSERT INTO dbo.productos (
        idCategoriaProductos, idUsuarios, nombre, marca, codigo, stock, idEstados, precio, fechaCreacion, foto
    )
    VALUES (
        @idCategoriaProductos, @idUsuarios, @nombre, @marca, @codigo, @stock, @idEstados, @precio,  GETDATE(), @foto
    );
END;


-- Modificar un producto
GO
CREATE PROCEDURE spModificarProducto
(
    @idProductos INT,
    @idCategoriaProductos INT,
    @idUsuarios INT,
    @nombre VARCHAR(45),
    @marca VARCHAR(45),
    @codigo VARCHAR(45),
    @stock FLOAT,
    @idEstados INT,
    @precio FLOAT,
    @foto VARBINARY(MAX)
)
AS
BEGIN
    UPDATE dbo.productos
    SET
        idCategoriaProductos = @idCategoriaProductos,
        idUsuarios = @idUsuarios,
        nombre = @nombre,
        marca = @marca,
        codigo = @codigo,
        stock = @stock,
        idEstados = @idEstados,
        precio = @precio,
        foto = @foto
    WHERE idProductos = @idProductos;
END;


/*
==========================================================================================================

	 INICIO DE PROCEDIMIENTOS PARA ORDEN DETALLES

===========================================================================================================
*/

-- Insertar una nueva orden detalle
GO
CREATE PROCEDURE spInsertarOrdenDetalle
(
    @idOrden INT,
    @idProductos INT,
    @cantidad INT,
    @precio FLOAT,
    @subtotal FLOAT
)
AS
BEGIN
    INSERT INTO dbo.ordenDetalles (
        idOrden, idProductos, cantidad, precio, subtotal
    )
    VALUES (
        @idOrden, @idProductos, @cantidad, @precio, @subtotal
    );
END;


-- Modificar una orden
GO
CREATE PROCEDURE spModificarOrdenDetalle
    @idOrdenDetalles INT,
    @idOrden INT,
    @idProductos INT,
    @cantidad INT,
    @precio FLOAT,
    @subtotal FLOAT
AS
BEGIN
    UPDATE dbo.ordenDetalles
    SET
        idOrden = @idOrden,
        idProductos = @idProductos,
        cantidad = @cantidad,
        precio = @precio,
        subtotal = @subtotal
    WHERE idOrdenDetalles = @idOrdenDetalles;
END;


/*
==========================================================================================================

	 INICIO DE PROCEDIMIENTOS PARA USUARIO LOGIN

===========================================================================================================
*/

-- Obtener datos iniciar sesion
GO
CREATE PROCEDURE spIniciarSesion
    @correoElectronico VARCHAR(45),
    @contrasena VARCHAR(45)
AS
BEGIN
    SELECT * FROM usuarios WHERE correoElectronico = @correoElectronico;
END;


/*
==========================================================================================================

	 INICIO DE FUNCIONES  PARA USUARIO LOGIN

===========================================================================================================
*/
-- Validar si el correo tiene forma correcta
GO
CREATE FUNCTION dbo.fnEsValidoCorreo(@correo VARCHAR(45))
RETURNS BIT
AS
BEGIN
    RETURN CASE 
        WHEN @correo LIKE '%@%.%' -- Asegura que tenga "@" y un dominio con "."
             AND PATINDEX('%[^a-zA-Z0-9.@]%', @correo) = 0 -- No permite caracteres no válidos
        THEN 1
        ELSE 0
    END;
END;


-- Validar si el correo es repetido
GO  
CREATE FUNCTION dbo.fnEsCorreoRepetido(@correo VARCHAR(45))
RETURNS BIT
AS
BEGIN
	DECLARE @repetido VARCHAR(45);
	DECLARE @esRepetido BIT;

    SELECT @repetido = correoElectronico  FROM usuarios WHERE correoElectronico = @correo;
	IF @repetido = @correo
	BEGIN
		SET @esRepetido = 1;
		
	END;
	ELSE
	BEGIN
		SET @esRepetido = 0;
	END;
	RETURN @esRepetido;
END;


/*
==========================================================================================================

	 INICIO DE CONSULTAS

===========================================================================================================
*/

/*
 a) Total de Productos activos que tenga en stock mayor a 0 
*/
GO
CREATE VIEW totalProductosActivos AS
SELECT 
    COUNT(*) AS totalProductosActivos
FROM 
    dbo.productos p
INNER JOIN dbo.estados e
ON p.idEstados = e.idEstados
WHERE e.idEstados = 'Activo' AND stock > 0;


/*
* b) Total de Quetzales en ordenes ingresadas en el mes de Agosto 2024
*/
GO
CREATE VIEW totalQueztzalesAgosto AS
SELECT 
    SUM(totalOrden) AS TotalQuetzales
FROM 
    dbo.orden
WHERE 
    MONTH(fechaCreacion) = 8
    AND YEAR(fechaCreacion) = 2024;


/*
*	c) Top 10 de clientes con Mayor consumo de ordenes de todo el histórico
*/
GO
CREATE VIEW topClientesMayorConsumo AS
SELECT 
    c.razonSocial AS cliente,
    SUM(o.totalOrden) AS totalConsumo
FROM 
    dbo.orden o
INNER JOIN 
    dbo.usuarios u ON o.idUsuarios = u.idUsuarios
INNER JOIN
	dbo.clientes c ON u.idClientes = c.idClientes
GROUP BY 
    c.razonSocial
ORDER BY 
    totalConsumo DESC
LIMIT 10;



/*
*	d) Top 10 de productos más vendidos en orden ascendente
*/
GO
CREATE VIEW topProductosVendidos AS
SELECT 
    p.nombre AS producto,
    SUM(od.cantidad) AS totalVendidos
FROM 
    dbo.ordenDetalles od
INNER JOIN 
    dbo.productos p ON od.idProductos = p.idProductos
GROUP BY 
    p.nombre
ORDER BY 
    totalVendidos ASC
LIMIT 10;



-- ==================== INSERT PERSONALES ==============================
GO
EXEC dbo.spInsertarRol @nombre = 'Administrador';

GO
EXEC dbo.spInsertarEstado @nombre = 'Activo';

GO
EXEC dbo.spInsertarUsuario @idRol = 1, @idEstados = 1, @correoElectronico = 'Admin.1@gmail.com', @nombreCompleto = 'admin admin', @password = '12345678',  @telefono = '123456789', @fechaNacimiento = '2024-12-26', @idClientes = NULL;

GO
SELECT dbo.fnEsValidoCorreo('admin12@gmail.com') AS Resultado;

GO
SELECT * FROM rol;

GO
SELECT * FROM usuarios;


-- ==============================
GO
SELECT * FROM [dbo].[clientes];



-- =========================== CONSULTAS PERSONALES ================================
GO
SELECT * FROM Clientes c;