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

#CRUD Cliente
@app.route('/')
def index_pedido():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM pedido')
    datos = cursor.fetchall()
    return render_template('sesion-pedido.html', pedidos = datos)

@app.route('/agregar_pedido', methods=['POST'])
def agregar_pedido():
    if request.method == 'POST':
        nombre_restaurant = request.form['nombre_restaurant']
        nombre_cliente = request.form['nombre_cliente']
        menu_id = request.form['menu_id']
        cantidad = request.form['cantidad']
        telefono_cliente = request.form['telefono_cliente']
        cursor = mysql.connection.cursor()
        cursor.execute('INSERT INTO pedido (nombre_restaurant, nombre_cliente, menu_id, cantidad, telefono_cliente) VALUES (%s,%s,%s,%s,%s)', (nombre_restaurant, nombre_cliente, menu_id, cantidad, telefono_cliente,))
        mysql.connection.commit()
        flash('Pedido agregado correctamente')
        return redirect(url_for('index_pedido'))

@app.route('/edit_pedido/<string:nombre_cliente>')
def get_pedido(nombre_cliente):
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM pedido WHERE nombre_cliente = %s', (nombre_cliente,))
    dato = cursor.fetchall()
    return render_template('edit-pedido.html', pedidos = dato[0])

@app.route('/update/<string:nombre_cliente>', methods = ['POST'])
def update_pedido(nombre_cliente):
    if request.method == 'POST':
        nombre_cliente = request.form['nombre_pedido']
        nombre_restaurant = request.form['nombre_restaurant']
        menu_id = request.form['menu_id']
        cantidad = request.form['cantidad']
        telefono_cliente = request.form['telefono_cliente']
        cursor = mysql.connection.cursor()
        cursor.execute("""
            UPDATE pedido
            SET nombre_cliente = %s,
                nombre_restaurant = %s,
                menu_id = %s,
                cantidad = %s,
                telefono_cliente = %s,
            WHERE nombre_cliente = %s
        """,(nombre_cliente, nombre_restaurant, menu_id, cantidad, telefono_cliente, nombre_cliente,))
        mysql.connection.commit()
        flash('Pedido actualizado correctamente')
        return redirect(url_for('index_pedido'))



@app.route('/delete_pedido/<string:nombre_cliente>')
def delete_pedido(nombre_cliente):
    cursor = mysql.connection.cursor()
    cursor.execute('DELETE from pedido WHERE nombre_cliente= %s', (nombre_cliente,))
    mysql.connection.commit()
    flash('pedido eliminado correctamente')
    return redirect(url_for('index_pedido'))


if __name__ == '__main__':
    app.run(port=3007,debug=True)