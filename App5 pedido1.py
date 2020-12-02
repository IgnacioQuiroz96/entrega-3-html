from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL

app = Flask(__name__)

# Mysql Connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'rapey'
mysql = MySQL(app)

#Configuraciones
app.secret_key = 'mysecretkey'

#CRUD Pedido
@app.route('/')
def index_pedido():
    flash('pide lo que mas quieras del menu')
    return render_template('menu1.html')

@app.route('/agregar_pedido1', methods=['POST'])
def agregar_pedido1():
    if request.method == 'POST':
        nombre_cliente = request.form['nombre_cliente']
        telefono_cliente = request.form['telefono_cliente']       
        menu_id = request.form['menu_id']
        cantidad = request.form['cantidadMenu']
        nombre_restaurant = "Mc'Donnals"
        cursor = mysql.connection.cursor()
        cursor.execute('INSERT into pedido (nombre_cliente, telefono_cliente, menu_id, cantidad, nombre_restaurant) VALUES (%s,%s,%s,%s,%s)', (nombre_cliente, telefono_cliente, menu_id, cantidad, nombre_restaurant))
        mysql.connection.commit()
        flash('pedido ingresado, gracias por ordenar con nosotros')
    return "Pedido ingresado, gracias por ordenar con Rapey \n Vuelva atras para hacer otro pedido"
if __name__ == '__main__':
    app.run(port=3004,debug=True)