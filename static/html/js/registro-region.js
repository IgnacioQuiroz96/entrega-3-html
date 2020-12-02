function validarLetra(e){
    tecla = (document.all)?e.keyCode:e.which;

    te = String.fromCharCode(tecla);

    patron = /[A-Z a-z áéíóú]/;

    return patron.test(te);

}

function validarNumero(e){
    tecla = (document.all)?e.keyCode:e.which;

    te = String.fromCharCode(tecla);

    patron = /[0-9]/;

    return patron.test(te);
}

//Funcionalidad

$(function () {
    var operation = "C"; //"C"=Crear
    var selected_index = -1; // Indice de el elemento seleccionado en la lista
    var tblRestaurant = localStorage.getItem("tblRestaurant"); //Retornar los datos almacenados
    tblRestaurant = JSON.parse(tblRestaurant); //Convertir String a Object
    if (tblRestaurant === null) // Si no hay datos, inicializar un array vacio
        tblRestaurant = [];
  
    function Create() {
      //Obtener los valores de la forma HTML y transformalos en String.
      var person = JSON.stringify({
        ID: $("#txtID").val(),
        Name: $("#txtName").val()
      }); 
      //Añadir el objeto a la tabla
      tblRestaurant.push(person);
      //Almacenar los datos en el Local Storage
      localStorage.setItem("tblRestaurant", JSON.stringify(tblRestaurant));
      alert("Los datos han sido almacenados"); //Mensaje de alerta
      return true;
    }
  
    function Edit() {
      // Editar el item seleccionado en la tabla
      tblRestaurant[selected_index] = JSON.stringify({
          ID: $("#txtID").val(),
          Name: $("#txtName").val()
      });
      //Almacenar los datos en el Local Storage
      localStorage.setItem("tblRestaurant", JSON.stringify(tblRestaurant)); 
      alert("Los datos han sido editados"); //Mensaje de alerta
      return true;
    }
  
    function Delete() {
      //Eliminar el elemento seleccionado en la tabla
      tblRestaurant.splice(selected_index, 1); 
      //Actualizar los datos del Local Storage
      localStorage.setItem("tblRestaurant", JSON.stringify(tblRestaurant)); 
      alert("Region eliminada"); //Mensaje de alerta
    }
  
    function List() {
      $("#tblList").html("");
      $("#tblList").html(
              "<thead>" +
              "<tr>" +                
              "<th>Id region</th>" +
              "<th>Nombre region</th>" +
              "<th>Acciones</th>" +
              "</tr>" +
              "</thead>" +
              "<tbody>" +
              "</tbody>"
              ); //Agregar la tabla a la estructura HTML
      for (var i in tblRestaurant) {
          var per = JSON.parse(tblRestaurant[i]);
          $("#tblList tbody").append("<tr>" +                    
                  "<td>" + per.ID + "</td>" +
                  "<td>" + per.Name + "</td>" +
                  "<td><img src='edit.png' alt='Edit" + i + "' class='btnEdit'/>&nbsp &nbsp<img src='delete.png' alt='Delete" + i + "' class='btnDelete'/></td>" +
                  "</tr>"
                  );
      } //Recorrer y agregar los items a la tabla HTML
    }
  
    $("#frmPerson").bind("submit", function () {
      if (operation === "C")
          return Create();
      else
          return Edit();
    }); //Función para decidir si se encuentra añadiendo o editando un item
    
    List();
  
    $(".btnEdit").bind("click", function () {
      operation = "E"; //"E" = Editar
      //Obtener el identificador del item a ser editado
      selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
      // Convertir de JSON al formato adecuando para editarlos datos
      var per = JSON.parse(tblRestaurant[selected_index]); 
      $("#txtID").val(per.ID);
      $("#txtName").val(per.Name);
      $("#txtFono").val(per.Fono);
      $("#txtDireccion").val(per.Direccion);
      $("#txtRegion") .val(per.Region);   // fix // 
      $("#txtID").attr("readonly", "readonly");
      $("#txtName").focus();
    });
  
    $(".btnDelete").bind("click", function () {
      //Obtener el identificador del item a ser eliminado
      selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
      Delete(); //Eliminar el item
      List(); //Volver a listar los items en la tabla
    });
  });
  
  