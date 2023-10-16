# Player2Player - P2P Marketplace

<div align="center"><img src="../frontend/src/assets/logo.webp" width="300px"></div>

<ol id='menu'>
  <li>
    <a href='#sobre-el-proyecto'>Sobre el proyecto</a>
  </li>
  <li>
    <a href="#antes-de-empezar">Antes de empezar</a>
    <ul>
      <li><a href='#instalación'>Instalación</a></li>
      <li><a href='#endpoints'>Endpoints</a></li>
    </ul>
  </li>
  <li>
    <a href="#tecnologías-utilizadas">Tecnologías utilizadas</a>
  </li>
  <li>
    <a href="#autores">Autores</a>
  </li>

## Sobre el proyecto
**_P2P - Player2Player_** es una plataforma en línea diseñada para la compra y venta de videojuegos 👾, consolas 🎮 y PCs 💻 de segunda mano. 

La plataforma permite a los usuarios buscar productos, registrarse para obtener acceso completo, publicar sus propios productos y realizar valoraciones tras sus compras. 


## Antes de empezar
### Instalación
* Clonar el repositorio
    ```
    git clone git@github.com:AlejandroPachec/Player2Player.git
    ```
* Instalar las dependencias necesarias que incluye el proyecto
    ```
    npm install 
    ```
* Crear la base de datos en MySQL Workbench
   ```sql
   CREATE DATABASE IF NOT EXISTS p2p_db;
   ```
* Ejecutar la base de datos
    ```
    npm run db
    ```
* Arrancar el servidor
   ```
   npm run dev
   ```
* Añadir datos de muestra a la base de datos
  ```
  npm run backup
  ```
* **NOTA :** Todos los usuarios tienen como contraseña ABCabc123!

### Endpoints
  <table border>
    <tbody>
      <tr>
        <th colspan="3">USUARIOS</th>
      </tr>
      <tr>
        <td align="center">POST</td>
        <td>user/create</td>
        <td>Crear un nuevo usuario</td>
      </tr>
      <tr>
        <td align="center">POST</td>
        <td>user/login</td>
        <td>Loguear un usuario</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td>user/profile/:idUser</td>
        <td>Ver el perfil de un usuario</td>
      </tr>
      <tr>
        <td align="center">PUT</td>
        <td>user/edit</td>
        <td>Editar tu perfil</td>
      </tr>
    </tbody>
  </table>
  
  <table border>
    <tbody>
      <tr>
        <th colspan="3">PRODUCTOS</th>
      </tr>
      <tr>
        <td align="center">POST</td>
        <td>products/addProduct</td>
        <td>Añadir un nuevo producto</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td>products?name=&city=&category&price=</td>
        <td>Obtener todos los productos. Se pueden filtrar por nombre, ciudad, categoría y rango de precio</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td>products/:idProduct</td>
        <td>Obtener un producto en concreto</td>
      </tr>
    </tbody>
  </table>

  <table border>
    <tbody>
      <tr>
        <th colspan="3">REVIEWS</th>
      </tr>
      <tr>
        <td align="center">POST</td>
        <td>reviews/:idOrder</td>
        <td>Añadir una nueva valoración</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td>reviews/:idUser</td>
        <td>Ver las valoraciones de un usuario</td>
      </tr>
    </tbody>
  </table>
   
  <table border>
    <tbody>
      <tr>
        <th colspan="3">ORDERS</th>
      </tr>
      <tr>
        <td align="center">POST</td>
        <td>order/user/:idProduct</td>
        <td>Añadir una nuevo pedido</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td>order/:idOrder?</td>
        <td>Obtener todos los pedidos o uno en concreto</td>
      </tr>
      <tr>
        <td align="center">PUT</td>
        <td>order/confirm/:idProduct</td>
        <td>Confirmar una venta</td>
      </tr>
      <tr>
        <td align="center">PUT</td>
        <td>order/reject/:idOrder</td>
        <td>Rechazar una venta</td>
      </tr>
    </tbody>
  </table>

<a href="#menu">Volver arriba</a>


## Tecnologías utilizadas
![Git](	https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![MySql](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=wProject_X)


## Autores
<a href="https://github.com/AlejandroPachec/Player2Player/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=AlejandroPachec/Player2Player" />
</a>
