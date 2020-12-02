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

@app.route('/')
def voucher():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM voucher_entrega')
    datos = cur.fetchall()
    return render_template('voucher-repartidor.html', voucher = datos)

@app.route('/envio_voucher', methods = ['POST'])
def envio():
    if request.method == 'POST':
        nombreR = request.form['restaurant']
        nombreRe = request.form['repartidor']
        cantidadP = request.form['pedidoC']
        precio = request.form['precio']
        
        cur = mysql.connection.cursor()
        cur.execute('INSERT INTO voucher_entrega (Restaurant, Repartidor, Pedidos, Precio_pedido, total_pago) VALUES (%s,%s,%s,%s,(Precio_pedido * Pedidos))', (nombreR,nombreRe,cantidadP,precio))
        mysql.connection.commit()
        flash('El voucher ha sido enviado a nuestro repartidor y base de datos')
        return redirect(url_for('voucher'))

if __name__ == '__main__':
    app.run(port=3006,debug=True)