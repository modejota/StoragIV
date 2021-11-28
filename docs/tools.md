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
Además, es fácil de configurar, es capaz de identificar automáticamente los ficheros de test y muestra la cobertura de los test, dificultando que te dejes alguna parte del código sin probar.

El comando utilizado para instalarlo ha sido:
  > npm i jest @types/jest ts-jest typescript -D


## Docker
---

Utilizaremos Docker para crear un contenedor en el que poder ejecutar los test de forma aislada.

La imagen base utilizada es `node:16.13-alpine`. Se ha escogido la versión mayor 16 por ser la versión LTS más reciente, y la menor 13 por ser la que tenía instalada en mi ordenador. Se elige la versión `alpine` por ocupar un espacio mínimo. Además, al no tener prácticamente librerías incluidas evitamos posibles incompatibilidades y mejoramos la seguridad. Seremos nosotros quien nos encarguemos de instalar las dependencias justas y necesarias.

Adicionalmente, he creado una Github Action que realiza las siguientes tareas:
- Comprueba los ficheros que han cambiado. Se hace uso de la Github Action de @tj-actions para realizar dicha comprobación.
- Si ha cambiado el Dockerfile, package.json o package-lock.json, reconstruye el contenedor y lo publica en Dockerhub.
- Si ha cambiado el fichero README.md, se utiliza una Github Action publicada por @meeDemain para actualizarlo en DockerHub. Debe tenerse en cuenta que esta Github Action solo funciona si no se tiene habilitado F2A en DockerHub. Se aprovecha también para actualizar la descripción del repositorio (máximo 100 caracteres en Dockerhub), aunque esta no debería variar con el tiempo.


## Servicio de integración continua
---

En el marco del objetivo 6 debemos elegir dos sistemas de integración continua. 

El primero de ellos es Travis CI. El motivo por el que ha sido elegido es por su gran facilidad de uso, permitiendo una rápida configuración, especialmente a la hora de probar distintas versiones de un lenguaje. La principal pega ha sido el tener que introducir la tarjeta de crédito para acceder al servicio "gratuito", pero no me termina de importar demasiado (espero que me devuelvan el dólar que me han retenido). 
Realice una primera prueba en la que lanzaba los test para NodeJS versiones 14 y 16 (ambas LTS), para comprobar que era tan sencillo como añadir una entrada en una lista. Posteriormente, he limitado los tests a la versión 16, para reducir los créditos a utilizar (no creo que gaste los 10.000 mensuales, pero más vale prevenir).

El segundo de ellos es Circle CI, el cual no requiere aportar método de pago para usar el plan gratuito (siendo estudiante al menos). Tras testearlo un poco, parece sencillo de utilizar. Una ventaja es que la propia herramienta te ofrece plantillas de ficheros de configuración en función del lenguaje que detecte en tu repositorio (aunque no las he utilizado), siendo otra ventaja la posibilidad de utilizar contenedores Docker con bastante facillidad. Como desventaja, se puede mencionar el hecho de que se deben tener en cuenta cosas que Travis CI da por supuestas (checkout del código, o tener que activar los Github Checks, por ejemplo). También me ha gustado que si cometes un fallo en el fichero de configuración (cosa que obviamente me ha pasado) la propia web te avisa, pudiendo editarlo en dicha web y permitiendo hacer un commit directamente a la rama de Github correspondiente.

Se valoró también utilizar Semaphore CI, el cual es sumamente parecido a Circle CI, hasta el punto de no poder encontrar ninguna diferencia reseñable más allá de las diferencias en los ficheros de configuración (ambos sencillos). Me descarté por Circle CI por ser el que mejores críticas tenía en distintas webs de comparativas y valoraciones, además de ser el que se comprueba obligatoriamente en los test de la asignatura.

Cabe también mencionar que en Travis CI ejecuto los test a partir del código fuente, ya que en dicha plataforma sería más sencillo testearlo para distintas versiones del lenguaje (aunque por lo que he visto en Circle CI no es complejo). En Circle CI trabajo a partir del contenedor Docker, por aprovechar lo que hicimos en el objetivo anterior.