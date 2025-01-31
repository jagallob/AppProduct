# AppProduct

## Descripción
AppProduct es una aplicación web desarrollada en .NET con C# que permite la gestión de productos. Los usuarios pueden agregar, editar, eliminar y visualizar productos dentro de una lista.

## Características
- Visualización de productos en una tabla.
- Creación de nuevos productos.
- Edición de productos existentes.
- Eliminación de productos.
- Buscar productos
- Uso de Entity Framework Core para la persistencia de datos.

## Estructura del proyecto

El proyecto sigue la arquitectura típica de .NET, con separación por capas:

- **Controllers:** Contiene los controladores que manejan las solicitudes HTTP.
    - HomeController.cs: Controlador principal para gestionar las vistas.

- **Data:** Maneja el contexto de base de datos.
    - AppDbContext.cs: Clase que configura la conexión a la base de datos y los modelos.

- **Models** Define las entidades del proyecto.
    - Product.cs: Modelo para los productos con propiedades como nombre, descripción, precio y categoría.

- **Repositories:** Implementa el patrón de repositorio para gestionar la interacción con la base de datos.
    - ProductRepository.cs: Proporciona métodos para CRUD (Crear, Leer, Actualizar, Eliminar).

- **Services:** Contiene la lógica de negocio.
    - ProductService.cs: Implementa la interfaz IProductService para manejar las operaciones de los productos.

- **Views:** Maneja las vistas de Razor para la interfaz de usuario.
    - Views/Home/Index.cshtml: Vista principal que muestra la lista de productos.

    - Views/Shared: Contiene vistas compartidas como el layout.

## Requisitos
- .NET SDK 6.0 o superior.
- Visual Studio Code o Visual Studio.

## Uso

1. Abre el navegador y ve a http://localhost:5287.

2. En la página products, podrás:

    - Visualizar la lista de productos.

    - Agregar un producto haciendo clic en el botón Add Product.

    - Editar un producto usando el botón Edit.

    - Eliminar un producto usando el botón Delete.

