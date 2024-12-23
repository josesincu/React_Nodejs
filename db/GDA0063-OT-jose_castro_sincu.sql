/*
==========================================================================================================

	 INICIO DE CREACION DE TABLAS

===========================================================================================================
*/

/*
*	En el Codigo se uso la convencion de camelCase
*	Creacion de la base de datos si no existe
*/

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'GDA0063-OT_joseCastroSincu')
BEGIN
    CREATE DATABASE [GDA0063-OT_joseCastroSincu];
END;

-- usando la base de datos
USE [GDA0063-OT_joseCastroSincu];
 
/*
*	Creacion de tablas independientes
*/

-- Tabla Cliente
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
GO

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
GO


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
GO

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
GO


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
GO


-- Modificar estado en tabla
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
GO





/*
==========================================================================================================

	 INICIO DE PROCEDIMIENTOS PARA USUARIO

===========================================================================================================
*/
GO

-- Inserter un nuevo usuario en la tabla
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
    INSERT INTO dbo.usuarios (
        idRol, idEstados, correoElectronico, nombreCompleto, password, telefono, fechaNacimiento, fechaCreacion, idClientes
    )
    VALUES (
        @idRol, @idEstados, @correoElectronico, @nombreCompleto, @password, @telefono, @fechaNacimiento, GETDATE(), @idClientes
    );
END;

GO

-- Modificar un usuario en la tabla

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
GO

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
        @idUsuarios, @nombre, @idEstados, GETDATE()
    );
END;
GO

-- Modificar una categoria de productos

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
GO



/*
==========================================================================================================

	 INICIO DE PROCEDIMIENTOS PARA ORDEN

===========================================================================================================
*/

-- Insertar una nueva orden
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
        @idUsuarios, @idEstados, GETDATE(), @nombreCompleto, @direccion, @telefono, @correoElectronico, @fechaEntrega, @totalOrden
    );
END;
GO

-- Modificar una orden
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
GO



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
        @idCategoriaProductos, @idUsuarios, @nombre, @marca, @codigo, @stock, @idEstados, @precio, GETDATE(), @foto
    );
END;
GO

-- Modificar un producto
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
GO



/*
==========================================================================================================

	 INICIO DE PROCEDIMIENTOS PARA ORDEN DETALLES

===========================================================================================================
*/

-- Insertar una nueva orden detalle

CREATE PROCEDURE InsertarOrdenDetalle
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
GO

-- Modificar una orden
CREATE PROCEDURE ModificarOrdenDetalle
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
GO


/*
==========================================================================================================

	 INICIO DE CONSULTAS

===========================================================================================================
*/

/*
 a) Total de Productos activos que tenga en stock mayor a 0 
*/

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






-- ==============================
SELECT * FROM [dbo].[clientes];