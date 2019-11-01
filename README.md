# iceCreamApi
Esto es una api para realizar ordenes de helados.

user@pc:~/iceCreamApi$ **mpn start**
URL = http://localhost:3000/

## API User

### Create users
    Metodo POST
       
    http://localhost:3000/user/crear/usuario
    {
        "email": "email@email.com",
        "password": "password",
        "name": "name"
    }

    Respuesta @True
        {
            "token": "",
            "email": "email@email.com",
            "password": "password",
            "name": "name"
        }  

    Respuesta @False
        Email no valido


### Read user 
    Metodo POST
       
    http://localhost:3000/user/read/usuario
    {
       "iceCreamToken": "xxxxxxxxxxxxx",
    }

    Respuesta @True
        {
            "token": "xxxxxxxxxxxxxxx",
            "email": "email@email.com",
            "password": "password",
            "name": "name"
        }  

    Respuesta @False
        No has iniciado seccion


### Update user 
    Metodo POST
       
    http://localhost:3000/user/update/usuario
    { "iceCreamToken": "xxxxxxxxxxxxx" }

    Respuesta @True
        The User was update

    Respuesta @False
        No has iniciado seccion
            
### Delete user 
    Metodo POST
       
    http://localhost:3000/user/delete/usuario
    {
       "email": "email@email.com",
        "password": "password"

    }

    Respuesta @True
        The User was delete

    Respuesta @False
        No has iniciado seccion


### Login user 
    Metodo POST
       
    http://localhost:3000/user/login
    {
       "email": "email@email.com",
        "password": "password"

    }

    Respuesta @True
        { "iceCreamToken": "xxxxxxxxxxxxx" }

    Respuesta @False
        Error Email and password

### Close Seccion  
    Metodo POST
       
    http://localhost:3000/close/login
    {
       { "iceCreamToken": "xxxxxxxxxxxxx" }

    }

    Respuesta @True
        close

    Respuesta @False

## API Ordenes

### Create Orden 
    Metodo POST
       
    http://localhost:3000/orden/create

    Nota : si quieres crearle la orden a un empleado X solo coloca su Email si esta disponible se le agregara la orden, sino se le agregara a tu usuario que esta logiado
    {
	"listaOrdenes":{
		"minutos": 2,
		"fechaInicial" : null,
		"ordenes" : [
			{
				"Nombre" : "Helado de azul",
				"Cantidad" : 1,
				"tamaño" : 12,
				"sabor" : "chocolate"
				
			},
			{
				"Nombre" : "Helado de verde",
				"Cantidad" : 2,
				"tamaño" : 12,
				"sabor" : "fresa"
			}
		]
	},
        "iceCreamToken": "xxxxxxxxxxx",
        "email" : null
    }

    Respuesta @True
        {
            "email": "name@email.com",
            "name": "name",
            "password": "*********",
            "token": "**********",
            "orders": {
                "minutos": 2,
                "fechaInicial": 1572627352970,
                "ordenes": [
                    {
                        "Nombre": "Helado de azul",
                        "Cantidad": 1,
                        "tamaño": 12,
                        "sabor": "chocolate"
                    },
                    {
                        "Nombre": "Helado de verde",
                        "Cantidad": 2,
                        "tamaño": 12,
                        "sabor": "fresa"
                    }
                ]
            }
        }

    Respuesta @False
        'El empleado no esta disponible tiene una orden que le falta ' + {tiempo} + ' minutos'

### Read Orden 
    Metodo POST
       
    http://localhost:3000/orden/read

    Nota : si quieres leer la orden a un empleado X solo coloca su Email, sino ser tu usuario que esta logiado
    {
	"listaOrdenes":{
		
        "iceCreamToken": "xxxxxxxxxxx",
        "email" : null
    }

    Respuesta @True
        {
            "email": "name@email.com",
            "name": "name",
            "password": "*********",
            "token": "**********",
            "orders": {
                "minutos": 2,
                "fechaInicial": 1572627352970,
                "ordenes": [
                    {
                        "Nombre": "Helado de azul",
                        "Cantidad": 1,
                        "tamaño": 12,
                        "sabor": "chocolate"
                    },
                    {
                        "Nombre": "Helado de verde",
                        "Cantidad": 2,
                        "tamaño": 12,
                        "sabor": "fresa"
                    }
                ]
            }
        }

    Respuesta @False
       'No exite'

### Update Orden 
    Metodo POST
       
    http://localhost:3000/orden/update

    Nota : si quieres actualizar una orden a un empleado X solo coloca su Email si esta disponible se le actualizara la orden, sino se le actualizara a tu usuario que esta logiado.
    la fecha del cuando fue creada la orden no cambia {fechaInicial}
    {
	"listaOrdenes":{
		"minutos": 2,
		"fechaInicial" : null,
		"ordenes" : [
			{
				"Nombre" : "Helado de azul",
				"Cantidad" : 1,
				"tamaño" : 12,
				"sabor" : "chocolate"
				
			},
			{
				"Nombre" : "Helado de verde",
				"Cantidad" : 2,
				"tamaño" : 12,
				"sabor" : "fresa"
			}
		]
	},
        "iceCreamToken": "xxxxxxxxxxx",
        "email" : null
    }

    Respuesta @True
        {
            "email": "name@email.com",
            "name": "name",
            "password": "*********",
            "token": "**********",
            "orders": {
                "minutos": 2,
                "fechaInicial": 1572627352970,
                "ordenes": [
                    {
                        "Nombre": "Helado de azul",
                        "Cantidad": 1,
                        "tamaño": 12,
                        "sabor": "chocolate"
                    },
                    {
                        "Nombre": "Helado de verde",
                        "Cantidad": 2,
                        "tamaño": 12,
                        "sabor": "fresa"
                    }
                ]
            }
        }

    Respuesta @False
        'No tienes ordenes que actualizar'

### Delete Orden 
    Metodo POST
       
    http://localhost:3000/orden/delete

    Nota : si quieres deliminar una orden a un empleado X solo coloca su Email, si paso el tiempo de la orden se eliminara. 
    recuerda sino colocas el email los cambios se haran a tu cuenta de empleado.
    {
        "iceCreamToken": "xxxxxxxxxxx",
        "email" : null
    }

    Respuesta @True
       'Se ha eliminado las ordenes'

    Respuesta @False
        'No tienes ordenes que Eliminar'