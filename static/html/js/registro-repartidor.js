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
    var operation = "C"; 
    var selected_index = -1; 
    var tblRepartidor = localStorage.getItem("tblRepartidor"); 
    tblRepartidor = JSON.parse(tblRepartidor); 
    if (tblRepartidor === null) 
        tblRepartidor = [];
  
    function Create() {
      var person = JSON.stringify({
        ID: $("#txtID").val(),
        Name: $("#txtName").val(),
        Fono: $("#txtFono").val(),
        Region: $("#txtRegion").val()
      }); 
      tblRepartidor.push(person);
      localStorage.setItem("tblRepartidor", JSON.stringify(tblRepartidor));
      alert("Los datos han sido almacenados"); 
      return true;
    }
  
    function Edit() {
        tblRepartidor[selected_index] = JSON.stringify({
          ID: $("#txtID").val(),
          Name: $("#txtName").val(),
          Fono: $("#txtFono").val(),
          Region: $("#txtRegion").val()
      });

      localStorage.setItem("tblRepartidor", JSON.stringify(tblRepartidor)); 
      alert("Los datos han sido editados"); 
      return true;
    }
  
    function Delete() {
        tblRepartidor.splice(selected_index, 1); 
      localStorage.setItem("tblRepartidor", JSON.stringify(tblRepartidor)); 
      alert("Persona Eliminada");
    }
  
    function List() {
      $("#tblList").html("");
      $("#tblList").html(
              "<thead>" +
              "<tr>" +                
              "<th>Rut</th>" +
              "<th>Nombre</th>" +
              "<th>Telefono</th>" +
              "<th>Region</th>" +
              "<th>Acciones</th>" +
              "</tr>" +
              "</thead>" +
              "<tbody>" +
              "</tbody>"
              );
      for (var i in tblRepartidor) {
          var per = JSON.parse(tblRepartidor[i]);
          $("#tblList tbody").append("<tr>" +                    
                  "<td>" + per.ID + "</td>" +
                  "<td>" + per.Name + "</td>" +
                  "<td>" + per.Fono + "</td>" +
                  "<td>" + per.Region + "</td>" +                    
                  "<td><img src='edit.png' alt='Edit" + i + "' class='btnEdit'/>&nbsp &nbsp<img src='delete.png' alt='Delete" + i + "' class='btnDelete'/></td>" +
                  "</tr>"
                  );
      } 
    }
  
    $("#frmPerson").bind("submit", function () {
      if (operation === "C")
          return Create();
      else
          return Edit();
    }); 
    
    List();
  
    $(".btnEdit").bind("click", function () {
      operation = "E"; 
      selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
      var per = JSON.parse(tblRepartidor[selected_index]); 
      $("#txtID").val(per.ID);
      $("#txtName").val(per.Name);
      $("#txtFono").val(per.Edad);
      $("#txtRegion").val(per.Direccion);
      $("#txtID").attr("readonly", "readonly");
      $("#txtName").focus();
    });
  
    $(".btnDelete").bind("click", function () {
      selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
      Delete(); 
      List();
    });
  });
  
  