# Sistema de Taller Mecanico

Este proyecto es una API RESTful desarrollada con Node.js para la gestión de clientes, vehiculos, ordenes de reparacion y pagos en un sistema para talleres mecanicos.

## Caracteristicas

### Gestion de Clientes
- **Registro y Actualizacion:** Almacena los datos de clientes incluyendo nombre, apellido, CUIT/CUIL, y telefono.
- **Relacion con Vehiculos:** Permite asociar uno o mas vehiculos a cada cliente.

### Gestión de Vehículos
- **Almacenamiento de Informacion:** Cada vehiculo incluye patente, marca, modelo, año y su asociacion con un cliente especifico.
- **Historial de Reparaciones:** Muestra el historial de ordenes de reparacion de cada vehiculo.

### Ordenes de Reparacion
- **Detalles de Reparacion:** Cada orden almacena la fecha de inicio, descripcion del trabajo realizado, kilometraje, fecha de finalizacion, precio, estado de pago, fecha de pago, medio de pago (efectivo, tarjeta de credito o transferencia) y factura.
- **Estado de Pago:** El sistema permite marcar las ordenes como 'pendiente' o 'pagado' y registrar la fecha y medio de pago.
  
### Generación de Reportes
- **Facturacion Mensual:** Genera un reporte de ingresos por mes, que se pueden agrupar por medio de pago.
- **Ordenes Activas:** Genera un reporte de las órdenes sin fecha de finalizacion, indicando qué vehiculos siguen en el taller.
- **Ordenes por Estado de Pago:** Filtra y muestra las ordenes dependiendo de su estado de pago, ayudando a gestionar cobros pendientes.
- **Ordenes Completadas:** Muestra un reporte mensual de la cantidad de ordenes finalizadas.

## Estructura del Proyecto
- **Node.js y Express:** El backend se codeo usando Node.js y Express para manejar las solicitudes HTTP y la logica.
- **MySQL y Sequelize:** La base de datos esta en MySQL y el ORM es Sequelize.

### Endpoints

**Clientes**
- GET /api/clientes - Lista todos los clientes.
- POST /api/clientes - Crea un cliente nuevo.
- PUT /api/clientes/:id - Actualiza un cliente existente.
- DELETE /api/clientes/:id - Elimina un cliente.

**Vehiculos**
- **GET /api/vehiculos - Lista todos los vehiculos.
- GET /api/vehiculos/:patente - Devuelve un vehiculo especifico por patente.
- POST /api/vehiculos - Crea un nuevo vehiculo.
- DELETE /api/vehiculos/:patente - Elimina un vehiculo.

**Ordenes de Reparacion**
- GET /api/ordenes - Lista todas las ordenes, con opción de filtrar por estado de pago.
- POST /api/ordenes - Crea una orden de reparacion nueva.
- GET /api/ordenes/:id - Muestra una orden especifica.
- DELETE /api/ordenes/:id - Elimina una orden.

**Reportes**
- GET /api/reportes/facturacion-mensual - Muestra la facturación mensual y puede agruparse por medio de pago.
- GET /api/reportes/ordenes/estado - Filtra ordenes por estado de pago.
- GET /api/reportes/ordenes-activas - Muestra todas las órdenes activas (sin fecha de finalizacion).
- GET /api/reportes/ordenes-finalizadas - Reporte mensual de ordenes finalizadas.

