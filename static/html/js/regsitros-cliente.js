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
    var tblClientes = localStorage.getItem("tblClientes"); //Retornar los datos almacenados
    tblClientes = JSON.parse(tblClientes); //Convertir String a Object
    if (tblClientes === null) // Si no hay datos, inicializar un array vacio
        tblClientes = [];
  
    function Create() {
      //Obtener los valores de la forma HTML y transformalos en String.
      var person = JSON.stringify({
        ID: $("#txtID").val(),
        Name: $("#txtName").val(),
        Edad: $("#txtEdad").val(),
        Direccion: $("#txtDireccion").val()
      }); 
      //Añadir el objeto a la tabla
      tblClientes.push(person);
      //Almacenar los datos en el Local Storage
      localStorage.setItem("tblClientes", JSON.stringify(tblClientes));
      alert("Los datos han sido almacenados"); //Mensaje de alerta
      return true;
    }
  
    function Edit() {
      // Editar el item seleccionado en la tabla
      tblClientes[selected_index] = JSON.stringify({
          ID: $("#txtID").val(),
          Name: $("#txtName").val(),
          Edad: $("#txtEdad").val(),
          Direccion: $("#txtDireccion").val()
      });
      //Almacenar los datos en el Local Storage
      localStorage.setItem("tblClientes", JSON.stringify(tblClientes)); 
      alert("Los datos han sido editados"); //Mensaje de alerta
      return true;
    }
  
    function Delete() {
      //Eliminar el elemento seleccionado en la tabla
      tblClientes.splice(selected_index, 1); 
      //Actualizar los datos del Local Storage
      localStorage.setItem("tblClientes", JSON.stringify(tblClientes)); 
      alert("Persona Eliminada"); //Mensaje de alerta
    }
  
    function List() {
      $("#tblList").html("");
      $("#tblList").html(
              "<thead>" +
              "<tr>" +                
              "<th>Rut</th>" +
              "<th>Nombre</th>" +
              "<th>Edad</th>" +
              "<th>Direccion</th>" +
              "<th>Acciones</th>" +
              "</tr>" +
              "</thead>" +
              "<tbody>" +
              "</tbody>"
              ); //Agregar la tabla a la estructura HTML
      for (var i in tblClientes) {
          var per = JSON.parse(tblClientes[i]);
          $("#tblList tbody").append("<tr>" +                    
                  "<td>" + per.ID + "</td>" +
                  "<td>" + per.Name + "</td>" +
                  "<td>" + per.Edad + "</td>" +
                  "<td>" + per.Direccion + "</td>" +                    
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
      var per = JSON.parse(tblClientes[selected_index]); 
      $("#txtID").val(per.ID);
      $("#txtName").val(per.Name);
      $("#txtEdad").val(per.Edad);
      $("#txtDireccion").val(per.Direccion);
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
  
  