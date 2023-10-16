# Player2Player - P2P Marketplace

<div align="center"><img src="./src/assets/logo.webp" width="300px"></div>

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
* Arrancar el servidor
   ```
   npm run dev
   ```
* **NOTA :** Todos los usuarios añadidos a la BBDD tienen la contraseña ABCabc123!

### Rutas
  <table border>
    <tbody>
      <tr>
        <th colspan="2">Rutas de la APP</th>
      </tr>
      <tr>
        <td align="center">'/'</td>
        <td>Página principal</td>
      </tr>
      <tr>
        <td align="center">'/search/:category?:price?:name?:location?'</td>
        <td>Buscador por nombre, categoría, precio y/o localidad</td>
      </tr>
      <tr>
        <td align="center">'/user/create'</td>
        <td>Página de registro de usuario</td>
      </tr>
      <tr>
        <td align="center">'/user/login'</td>
        <td>Página de login de usuario</td>
      </tr>
      <tr>
        <td align="center">'search?/product/:idProduct'</td>
        <td>Ver un producto en concreto</td>
      </tr>
      <tr>
        <td align="center">'/user/profile/:idUser'</td>
        <td>Ver el perfil de un usuario</td>
      </tr>
      <tr>
        <td align="center">'/user/orders/:sellerUser'</td>
        <td>Ver las solicitudes de compra de los productos que tienes en venta</td>
      </tr>
      <tr>
        <td align="center">'/user/orders'</td>
        <td>Ver tus pedidos</td>
      </tr>
      <tr>
        <td align="center">'/user/edit'</td>
        <td>Editar tu perfil</td>
      </tr>
      <tr>
        <td align="center">'/order/accepted/:idOrder'</td>
        <td>Ver un producto del cual han aceptado tu compra</td>
      </tr>
      <tr>
        <td align="center">'/order/addReview/:idOrder'</td>
        <td>Añadir una valoración</td>
      </tr>
      <tr>
        <td align="center">'/order/exchangeSet/:idOrder/:buyerId'</td>
        <td>Página para agendar la venta del producto</td>
      </tr>
      <tr>
        <td align="center">'/product/addProduct'</td>
        <td>Añadir un producto</td>
      </tr>
      <tr>
        <td align="center">'/*'</td>
        <td>Página de no encontrado</td>
      </tr>
    </tbody>
  </table>

<a href="#menu">Volver arriba</a>

## Tecnologías utilizadas
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=wProject_X)
![Git](	https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![CSS](https://img.shields.io/badge/CSS3-1572B6.svg?style=for-the-badge&logo=CSS3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![MaterialUI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)


## Autores
<a href="https://github.com/AlejandroPachec/Player2Player/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=AlejandroPachec/Player2Player" />
</a>