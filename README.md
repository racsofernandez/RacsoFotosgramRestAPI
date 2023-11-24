# Herramientas para facilitar el desarrollo

Hay dos herramientas que facilitan la vida a la hora de ejecutar automáticamente la transpolación y la ejecución de la aplicación, que son:

## tsc

*tsc* es para la transpolación.

~~~
npm install -g typescript
~~~
Despues se puede ejecutar la transpolación de esta manera:
~~~
tsc index.ts
~~~
Y se genera el fichero transpolado *index.js*.

Y después si quieres que esté pendiente de cualquier cambio que haya en el código, puedes ejecutar lo siguiente y permanece activo:
~~~
tsc -w
~~~

# node

*node* para ejecutar el programa transpolado, por ejemplo:
~~~
node index.js
~~~


# nodemon

*nodemon* es una aplicación para realizar la ejecución de la aplicación. 

~~~
npm install -g nodemon
~~~

Si detecta un cambio en el fichero js se vuelve a ejecutar:

~~~
nodemon index.js
~~~

# Discrepancias con el curso

## callbacks en mongoose

La librería mongoose es la que se utiliza para la interacción con la base de datos MongoDB. En el curso de udemy por el que he creado esta aplicación, *Legacy: ionic 6: Crear aplicaciones IOS, Android con Angular*, utiliza callbacks, pero en la versión actual no se utilizan callbacks, sino que hay que hacerlo mediante el uso de `async/await` dentro de un bloque `try/catch`.

Hay que hacerlo según indica en el siguiente artículo: https://forum.freecodecamp.org/t/please-help-me-resolve-this-error-code/597314/5. 

