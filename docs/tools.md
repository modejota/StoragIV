# Herramientas elegidas para el proyecto

## Lenguaje
---

El lenguaje que he decido utilizar para este proyecto es TypeScript.

Llevo un tiempo queriendo aprender/utilizar este lenguaje, así que la libertad de elección de esta asignatura me da una excusa perfecta para finalmente hacerlo.

Los motivos "técnicos" que me han llevado a esta decisión son, principalmente, los siguientes:

- Posee una sintaxis relativamente parecida a la de lenguajes que ya he utilizado previamente, como Kotlin. 
- Permite tanto programación orientada a objetos como funcional.
- Es un lenguaje de tipado fuerte y estático. Es decir, una vez se le asigna un tipo a una variable, no podŕe cambiarlo, y si lo intento, fallará el proceso de "compilación". Es más sencillo detectar posibles errores, aunque no es infalible. 
- Permite especificar distintos ámbitos de visibilidad para las variables. Podŕe declarar variables privadas y gestionarlas mediante ḿétodos.
- Permite la creación de clases abstractas e interfaces, las cuales considero bastante útiles.
- TypeScript está construido por encima de JavaScript, por lo que, de ser necesario, podré ejecutar código JavaScript desde TypeScript sin mayores dificultades.

## Entorno de ejecución 
---

El entorno de ejecución que he decidio utilizar es Node.js.

Los principales motivos por los que lo he elegido son los siguientes:

- Permite trabajar tanto con JavaScript como con Typescript "out of the box", tanto en el lado del cliente como en el lado del servidor.
- Trabaja de forma asíncrona y dirigida por eventos, por lo que permite hacer muchas cosas al mismo tiempo, se tiene un muy buen rendimiento.
- Goza de gran popularidad, una comunidad bastante activa, y es usado por grandes compañías, lo que transmite confianza.

## Gestor de dependencias
---

El gestor de dependencias a utilizar será NPM. 

Tenerlo es un requisito imprescindible para usar Node.js, y, de hecho, viene incluido en la propia instalación de Node.js.

Es bastante sencillo de usar y ofrece un buen rendimiento, por lo que no veo necesario instalar otra herramienta que cumpla con este propósito, como podía ser YARN. 

Por lo que he podido leer, el rendimiento entre ambos gestores de dependencias es bastante similar para un número bajo de dependencias, como esperamos que sea el caso, aunque sí que es verdad que YARN es más rápido cuando se trabaja con un gran número de dependencias, principalmente por trabajar en paralelo y su sistema de caché.


## Gestor de tareas
---

Como hemos mencionado en el apartado anterior, NPM es un gestor de dependencias, y no un gestor de tareas, aunque puede actuar como tal. Por lo que he podido investigar, creo que reune todos los requisitos que le podría pedir.

- Permite definir scripts de una manera muy sencilla.
- Se puede hacer que se lance de forma automática scripts antes y/o despúes de la orden que mandemos ejecutar.
- Permite la declaración de variables de configuración, que podremos usar en nuestros scripts.
- Permite invocar otras herramientas de uso común, como babel.

## Framework de tests
---

Como framework de tests he decidido utilizar jest. 
Por lo que he podido leer, tiene un gran soporte con TypeScript a través del paquete ts-jest, es bastante rápido y permite escribir test de manera rápida, sencilla y concisa.