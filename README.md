# Sistema-Taller-Mecanico

Este proyecto es una API RESTful desarrollada con Node.js que permite la gestión de clientes, vehículos, órdenes de reparación y pagos dentro de un sistema para talleres mecánicos. Facilita el seguimiento de reparaciones y el estado de pagos, automatizando procesos administrativos.

## Características
- **Gestión de Clientes**: Registro y actualización de datos de clientes.
- **Gestión de Vehículos**: Asociación de vehículos a clientes y almacenamiento de información relevante (patente, modelo, historial de reparaciones, etc.).
- **Órdenes de Reparación**: Creación, modificación y seguimiento de órdenes de reparación.
- **Pagos**: Registro y actualización de pagos de las órdenes de reparación.
- **Informes**: Visualización de estadísticas sobre reparaciones, clientes y pagos.

## Documentación de la API


### Endpoints

#### 1. Clientes

- **Crear Cliente**
  - **Endpoint**: `POST /api/clientes`
  - **Descripción**: Agrega un nuevo cliente.
  - **Body (JSON)**:
    ```json
    {
      "nombre": "Juan",
      "apellido": "Pérez",
      "cuit_cuil": "20-12345678-9",
      "telefono": "1122334455"
    }
    ```

- **Obtener Todos los Clientes**
  - **Endpoint**: `GET /api/clientes`
  - **Descripción**: Devuelve una lista de todos los clientes.

- **Obtener Cliente por ID**
  - **Endpoint**: `GET /api/clientes/:id`
  - **Descripción**: Devuelve los detalles de un cliente específico.

- **Actualizar Cliente**
  - **Endpoint**: `PUT /api/clientes/:id`
  - **Descripción**: Modifica los datos de un cliente.
  - **Body (JSON)**:
    ```json
    {
      "nombre": "Juan",
      "telefono": "1199887766"
    }
    ```

- **Eliminar Cliente**
  - **Endpoint**: `DELETE /api/clientes/:id`
  - **Descripción**: Elimina un cliente específico.

#### 2. Vehículos

- **Crear Vehículo**
  - **Endpoint**: `POST /api/vehiculos`
  - **Descripción**: Registra un vehículo asociado a un cliente.
  - **Body (JSON)**:
    ```json
    {
      "patente": "ABC123",
      "clienteId": 1,
      "marca": "Toyota",
      "modelo": "Corolla",
      "año": 2020
    }
    ```

- **Obtener Todos los Vehículos**
  - **Endpoint**: `GET /api/vehiculos`
  - **Descripción**: Devuelve una lista de todos los vehículos.

- **Obtener Vehículo por Patente**
  - **Endpoint**: `GET /api/vehiculos/:patente`
  - **Descripción**: Devuelve los detalles de un vehículo específico.

- **Actualizar Vehículo**
  - **Endpoint**: `PUT /api/vehiculos/:patente`
  - **Descripción**: Modifica los datos de un vehículo.
  - **Body (JSON)**:
    ```json
    {
      "modelo": "Camry",
      "año": 2021
    }
    ```

- **Eliminar Vehículo**
  - **Endpoint**: `DELETE /api/vehiculos/:patente`
  - **Descripción**: Elimina un vehículo específico.

#### 3. Órdenes de Reparación

- **Crear Orden de Reparación**
  - **Endpoint**: `POST /api/ordenes`
  - **Descripción**: Crea una orden de reparación para un vehículo.
  - **Body (JSON)**:
    ```json
    {
      "vehiculoPatente": "XYZ123",
      "detalle": "Cambio de aceite y filtros",
      "kilometraje": 30000,
      "precio": 5000,
      "estadoPago": "pendiente"
    }
    ```

- **Obtener Todas las Órdenes de Reparación**
  - **Endpoint**: `GET /api/ordenes`
  - **Descripción**: Devuelve todas las órdenes de reparación, con opción de filtrar por estado de pago.
  - **Query Params**:
    - `estadoPago`: `pendiente` o `pagado`

- **Obtener Orden de Reparación por ID**
  - **Endpoint**: `GET /api/ordenes/:id`
  - **Descripción**: Devuelve los detalles de una orden específica.

- **Actualizar Orden de Reparación**
  - **Endpoint**: `PUT /api/ordenes/:id`
  - **Descripción**: Modifica los datos de una orden de reparación.
  - **Body (JSON)**:
    ```json
    {
      "estadoPago": "pagado",
      "fechaPago": "2024-11-02"
    }
    ```

- **Eliminar Orden de Reparación**
  - **Endpoint**: `DELETE /api/ordenes/:id`
  - **Descripción**: Elimina una orden de reparación específica.

#### 4. Reportes

- **Obtener Órdenes de un Vehículo**
  - **Endpoint**: `GET /api/vehiculos/:patente/ordenes`
  - **Descripción**: Devuelve todas las órdenes de reparación asociadas a un vehículo específico.

---
