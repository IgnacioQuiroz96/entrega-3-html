var x = document.getElementById("btn1");
x.addEventListener("click", add1);

var y = document.getElementById("btn2");
y.addEventListener("click", add2);

var z = document.getElementById("btn3");
z.addEventListener("click", add3);

var a = document.getElementById("btn4")
a.addEventListener("click",total);

var b = document.getElementById("btn5")
a.addEventListener("click",cuenta);

var menu1 = 0;
var menu2 = 0;
var menu3 = 0;

var total_menu = 0;
var total_menu_pesos = 0;

function add1(){
   menu1 = menu1+1; 
   alert("total menu 1 incluidos en el pedido: " +menu1);
};
function add2(){
   menu2 = menu2+1;
   alert("total menu 2 incluidos en el pedido: " +menu2);
};
function add3(){
   menu3 = menu3+1;
   alert("total menu 3 incluidos en el pedido: " +menu3);
};
function total(){
   total_menu = menu1+menu2+menu3;
   total_menu_pesos = menu1*1000 + menu2*2000 + menu3*3000;

   alert("el total de tu pedido es el siguiente: "+total_menu+" menus");
   alert("total menu 1 :"+menu1+" total menu 2 : "+menu2+" total menu 3 :"+menu3);
   alert("el total es: "+total_menu_pesos +"pesos");
   alert("no nos hacemos responsables por daños subsecuentes a la salud provocados por nuestra comida");
   alert("tenga un buen dia!");
   window.open("cuenta.html");
};


function cuenta(){
   var cuenta = window.open("", "MsgWindow", "width=200,height=300");
   cuenta.document.write("<p>esta es su cuenta rapey <br> Menu1 "+menu1+"<br> Menu2 "+menu2+"<br>Menu3 "+menu3+"<br> Total menu "+total_menu+"<br> Total cuenta: " +total_menu_pesos+ " pesos</p>" );
   
}
