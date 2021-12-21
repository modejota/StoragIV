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

Adicionalmente, he creado dos Github Action que realizan las siguientes tareas:
- La primera de ellas comprueba si ha cambiado el Dockerfile, package.json o package-lock.json; en caos de ser así reconstruye el contenedor y lo publica en Dockerhub.
- La segunda comprueba si ha cambiado el fichero README.md; en caso de ser así se utiliza una Github Action publicada por @meeDemain para actualizarlo en DockerHub. Debe tenerse en cuenta que esta Github Action solo funciona si no se tiene habilitado F2A en DockerHub. Se aprovecha también para actualizar la descripción del repositorio (máximo 100 caracteres en Dockerhub), aunque esta no debería variar con el tiempo.


## Servicio de integración continua
---

En el marco del objetivo 6 debemos elegir dos sistemas de integración continua. 

El primero de ellos es Travis CI. El motivo por el que ha sido elegido es por su gran facilidad de uso, permitiendo una rápida configuración, especialmente a la hora de probar distintas versiones de un lenguaje. Se realizan tests sobre NodeJS 14, versión más antigua soportada por la configuración de Jest y JavaScript que tengo, así como sobre la última version estable. La principal pega ha sido el tener que introducir la tarjeta de crédito para acceder al servicio "gratuito", pero no me termina de importar demasiado (espero que me devuelvan el dólar que me han retenido). 


El segundo de ellos es Circle CI, el cual no requiere aportar método de pago para usar el plan gratuito (siendo estudiante al menos). Tras testearlo un poco, parece sencillo de utilizar. Una ventaja es que la propia herramienta te ofrece plantillas de ficheros de configuración en función del lenguaje que detecte en tu repositorio (aunque no las he utilizado), siendo otra ventaja la posibilidad de utilizar contenedores Docker con bastante facillidad. También me ha gustado que si cometes un fallo en el fichero de configuración (cosa que obviamente me ha pasado) la propia web te avisa, pudiendo editarlo en dicha web y permitiendo hacer un commit directamente a la rama de Github correspondiente. Como desventaja, se puede mencionar el hecho de que se deben tener en cuenta cosas que Travis CI da por supuestas (checkout del código, o tener que activar los Github Checks, por ejemplo), o que, al no estar tan integrado con Github, no muestra si se pasan los test desde la página del Pull Request, teniendo que ir al dashboard de Circle CI. 

Se valoró también utilizar Semaphore CI, el cual es sumamente parecido a Circle CI, hasta el punto de no poder encontrar ninguna diferencia reseñable más allá de las diferencias en los ficheros de configuración (ambos sencillos). Me descarté por Circle CI por ser el que mejores críticas tenía en distintas webs de comparativas y valoraciones, además de ser el que se comprueba obligatoriamente en los test de la asignatura.

Cabe también mencionar que en Travis CI ejecuto los test a partir del código fuente, ya que en dicha plataforma sería más sencillo testearlo para distintas versiones del lenguaje (aunque por lo que he visto en Circle CI no es complejo). En Circle CI trabajo a partir del contenedor Docker, por aprovechar lo que hicimos en el objetivo anterior.

En el marco del objetivo 7, se han tenido que añadir variables de entorno a ambos sistemas de integración continua, dado que no subimos el fichero .env al repositorio. Es tan sencillo como ir al panel de control de cada sistema, entrar en ajustes, clickar en el menú correspondiente y añadirlas. Adicionalmente, dado que CircleCI utiliza el contenedor Docker, se ha tenido que modificar la orden de ejecución para que tome dichas variables de entorno.

## Logger
---

Necesitamos disponer de un servicio que nos permita mantener un registro de lo que sucede en nuestra aplicación, es decir necesitamos un logger.

Los principales requisitos que busco que tenga un logger es la capacidad de exportar los datos en formato JSON (para luego poder usar servicios como logz.io si se quisiese), que pueda trabajar con Typescript sin problemas, y que introduzca el menor overhead posible. Deseable es también que la configuración sea lo más sencilla posible.

El primer logger que probé fue [tslog](https://www.npmjs.com/package/tslog). Al leer las características tenía muy buena pinta:
- Estaba escrito en Typescript, por lo que debería funcionar sin problema
- Permitía salida a fichero JSON o "embellecido" por terminal
- Parecía marcar los errores con bastante precisión

Pero cuando lo probé no conseguí que la salida por terminal funcionase correctamente (se pisaba con el texto de Jest), no reconocía los errores si se producían en constructores y la información de los mismos al exportar a JSON no era demasiada. 

Barajé también usar [typescript-loggin](https://www.npmjs.com/package/typescript-logging), pero al probarlo me pareció algo complicado, y, además, llevaba más de un año sin actualizarse, por lo que decidí seguir buscando. No es que funcionara mal, todo sea dicho.

Buscando herramientas más "profesionales" acabé probando [winston](https://www.npmjs.com/package/winston). Había leído muy buenas reseñas sobre él, pero no conseguí hacerlo funcionar correctamente. Se suponía que traía instalado los types para Typescript, pero no los reconocía, y si los instalaba manualmente entraban en conflicto con los que se suponía que traía. A pesar de tener muchísimas descargas y aparente buena fama, el hecho de que llevará más de un año sin actualizarse no me dió demasiada buena espina, así que decidí seguir buscando.

Finalmente, acabé decantandome por [pino](https://www.npmjs.com/package/pino). Este cumplía los requisitos que se especificaban al principio de esta sección, funcionaba con Typescript perfectamente (este sí traía los types instalados y no daba problemas), permitía exportar en formato JSON y tenía muy poco overhead (de hecho, según diversas comparativas que he consultado, es el que menos tiene, pudiendo consumir la mitad de recursos que Winston u otros logger como Roarr o Bunyan). Adicionalmente, la configuración es bastante sencilla.

Además, existe un paquete adicional llamado [pino-pretty](https://github.com/pinojs/pino-pretty) que permite embellecer la salida por terminal de una forma realmente sencilla. Lo probé y también funcionaba perfectamente, tenía muchas opciones y permite personalizar bastante la salida, pero dado que mi objetivo es exportar a JSON acabe desinstalandolo. 

## Configuración remota.

Necesitaremos también de un servicio que nos permita abstraer la configuración de diversos parametros de la aplicación, pudiendo modificarlos de forma distribuida.

Utilizaré Dotenv para guardar parejas de claves-valor con los parametros de configuración susceptibles de ser modificados, como el directorio donde guardar los logs, o el nombre del fichero JSON donde se almacenan. En el futuro puede que se requiera de más de estas variables de entorno.

Para la configuración remota, no hay demasiadas alternativas entre las que escoger, así que optado directamente por utilizar Etcd3, como se recomendó en clase de teoría.

En el objetivo 7 se prepara el fichero de configuración para hacer uso de este servicio, pero dado que aún no hemos establecido ningun servidor, la solicitud fallará y pasará a tomar las variables de entorno, y, en última instancia si esto fallara por algún motivo, tomar un valor "hardcoded".

## API REST
---

En el marco del objetivo 8 deberemos realizar el diseño de una API REST que permita acceder a los recursos de la aplicación, para lo que necesitaremos un framework que nos apoye en esta tarea.

Los principales criterios que he seguido para la elección del framework son cuatro:
- Que permita servir el máximo de peticiones por unidad de tiempo posible, ya que este es un apartado fundamental para mantener contentos a los usuarios.
- Que sea relativamente fácil trabajar con él, para agilizar la tarea de desarrollo, y que cuente con una documentación completa que permita resolver dudas e iniciarse en el uso avanzado de la herramienta.
- Que tenga buen soporte con Typescript en general, y en especial con las herramientas de test (Jest) y logging (Pino) elegidas en los objetivos anteriores.
- Que se trate de un software con un mantenimiento activo, que reciba actualizaciones y corección de errores de manera frecuente. 


Dada la "prohibición" de usar Express, he buscado otras alternativas a dicho framework, que es el que mínimamente conocía. Tras realizar unas cuantas búsquedas, ver valoraciones de otros desarrolladores, etc, mis opciones se redujeron a cuatro:

- Koa: un framework muy conocido (y que de hecho ya conocía), con buen soporte para Typescript y Jest, y relativamente similar a Express, aunque con un rendimiento similar según varias comparativas. Decidí buscar alguna opción más antes de decantarme por él.
- Ts.ED: construido sobre Express/Koa, y escrito en Typescript (por lo que aseguran que la compatibilidad es total). Con sistema basado en clases y multitud de decoradores. No me terminaba de convencer el cómo manejar los controladores, siento que se necesita de mucho boilerplate y no tengo control total, por ejemplo, a la hora de validar los datos que vienen de un POST.
- NestJS: otro framework construido sobre Express y escrito en Typescript. En diversas comparativas se le ponía en un lugar muy alto, al ofrecer muchas opciones y facilidades. No me gustó que para crear el proyecto tuvieras que usar el CLI, ya que tendría que mover y reorganizar multitud de ficheros. Además, me ví abrumado con el montón de clases, opciones, decoradores etc que tenía el proyecto vacío y que necesitaban configuración. Decidí descartarlo por aparentemente complejo.
- Fastify: este ha sido el elegido, al cumplir con todos los criterios especificados anteriormente. 
  - Aunque dispone de CLI, no es necesaria para integrarlo en un proyecto existente (se puede hacer fácilmente "a mano"). 
  - Tiene buen soporte con Typescript y recibe actualizaciones y correcciones de errores frecuentemente.
  - La documentación me ha parecido sencilla de entender, completa y bien estructurada. Además, hay muchas dudas resueltas en los issues de Github del proyecto, de hecho, algunas que me han surgido las he podido resolver consultándolos.
  - Tiene funciones específicas para realizar test desde diversos frameworks (entre los que está Jest) sin necesidad de levantar un servidor.
  - Utiliza como logger (si se desea) Pino, que ya tengo instalado del objetivo anterior. 
  - Me ha gustado que se puede tener un gran control sobre las funciones de los controladores y sus parámetros. Pueden definirse de forma muy básica muy rápido (como se han hecho la gran parte durante el objetivo 8), pero si se desea mayor nivel de control no es dificil conseguirlo (he dejado una con validación básica para ilustrarlo, tras la implementación del objetivo 9 todas las funciones seguirán este esquema).
  - Es bastante facil dividir las rutas y asignarlas a diversos controladores.
  - Es el framework más rápido de los cuatro según las comparativas consultadas.

En el marco del objetivo 8 se ha realizado el diseño de las rutas (intentando seguir las mejores prácticas y pensando en la futura implementación del objetivo 9) y se ha definido un nuevo fichero de test con el que probar la ruta de bienvenida y una ruta para "acceder al status".

Adicionalmente, y probablemente adelantandome al objetivo 9/10, he añadido el código necesario para levantar el servidor. Esto lo he hecho para probar que realmente funcionaba con la mínima configuración que he tenido que hacer. Adicionalmente, se ha añadido una nueva variable de entorno con la que especificar el puerto en que escucha el servidor.

Para las pruebas que he realizado, he utilizado Postman, un programa que ya había usado anteriormente y que facilita el testeo de APIs en gran manera, permitiendo definir facilmente rutas, cabeceras, querystring, cuerpos de peticiones POST, etc. Una ventaja sobre otras herramientas como cURL es que cuenta con una interfaz gráfica que facilita mucho la tarea.