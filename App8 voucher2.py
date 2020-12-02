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
    return render_template('crud-voucher.html', voucher = datos)

@app.route('/edit_voucher/<string:id>')
def get_voucher(id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM voucher_entrega WHERE id = %s', (id))
    datos = cur.fetchall()
    return render_template('edit-clientes.html', vouchers = datos[0])

@app.route('/update/<string:id>', methods = ['POST'])
def update_voucher(id):
    if request.method == 'POST':
        nombreR = request.form['restaurant']
        nombreRe = request.form['repartidor']
        cantidadP = request.form['pedidoC']
        precio = request.form['precio']
        cur = mysql.connection.cursor()
        cur.execute("""
            UPDATE voucher_entrega
            SET Restaurant = %s,
                Repartidor = %s,
                Pedidos = %s,
                Precio_pedido = %s
            WHERE id = %s
        """, (nombreR,nombreRe,cantidadP,precio, id))
        mysql.connection.commit()
        flash('Voucher actualizado correctamente')
        return redirect(url_for('voucher'))

@app.route('/delete_voucher/<string:id>')
def delete(id):
    cur = mysql.connection.cursor()
    cur.execute('DELETE FROM voucher_entrega WHERE id = %s',(id))
    mysql.connection.commit()
    flash('Voucher eliminado correctamente')
    return redirect(url_for('voucher'))


if __name__ == '__main__':
    app.run(port=3007,debug=True)