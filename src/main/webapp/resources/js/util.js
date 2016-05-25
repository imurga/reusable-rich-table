/**
* resources/js/utils.js
*
* 21-05-2013
*
* Copyright Banco de Crédito del Perú
* 
 * @author TCS
* 
 * Este script permite realizar las acciones basicas dentro del navegador
*/

/**
* Función para cambiar el estilo del componente (Ejm: ocultar, mostrar.)
* @param elemento Elemento el cual se va a tratar
* @param display Estilo css para realizar algun cambio
*/
function displayElemento(elemento, display) {
      document.getElementById(elemento).style.display = display;
}

/**
* Convierte un texto a mayúsculas
* @param field Texto
*/
function reemplazarAMayuscula(field) {
      field.value = field.value.toUpperCase();
}

/**
* Cambia la visibilidad de un elemento
* @param elemento Elemento
*/
function cambiarDisplayElemento(elemento) {
      if (document.getElementById(elemento).style.display != 'none') {
            document.getElementById(elemento).style.display = 'none';
      } else {
            document.getElementById(elemento).style.display = '';
      }
}

/**
* Función para cerrar ventana
*/
function closeWindows() {
      document.getElementById("frm:sessionPage").value="5";
      window.location.href='ApplicationLogOutServlet?closeWindow=1';
}

/**
* Asigna el foco a un control
* @param id Id del control
*/
function focus(id) {
      var el = document.getElementById(id);
      if (!isEmpty(el)) {
            if (el.type != "hidden" && el.style.display != "none" && !el.disabled) {
                  el.focus();
            }

      }
}

/**
* Valida si un valor es un número
* @param valor Valor
* @returns {Boolean} Validación
*/
function IsNumeric(valor) {
      var log = valor.length;
      var sw = "S";
      for ( var x = 0; x < log; x++) {
            v1 = valor.substr(x, 1);
            v2 = parseInt(v1);
            // Compruebo si es un valor numérico
            if (isNaN(v2)) {
                  sw = "N";
            }
      }
      if (sw == "S") {
            return true;
      } else {
            return false;
      }
}

var primerslap = false;
var segundoslap = false;

/**
* Elabora formato de fecha
* @param fecha
* @returns Fecha con formato
*/
function formateafecha(fecha) {
      var largo = fecha.length;
      var dia;
      var mes;
      var ano;

      if ((largo >= 2) && (primerslap == false)) {
            dia = fecha.substr(0, 2);
            if ((IsNumeric(dia) == true) && (dia <= 31) && (dia != "00")) {
                  fecha = fecha.substr(0, 2) + "/" + fecha.substr(3, 7);
                  primerslap = true;
            } else {
                  fecha = "";
                  primerslap = false;
            }
      } else {
            dia = fecha.substr(0, 1);
            if (IsNumeric(dia) == false) {
                  fecha = "";
            }
            if ((largo <= 2) && (primerslap = true)) {
                  fecha = fecha.substr(0, 1);
                  primerslap = false;
            }
      }
      if ((largo >= 5) && (segundoslap == false)) {
            mes = fecha.substr(3, 2);
            if ((IsNumeric(mes) == true) && (mes <= 12) && (mes != "00")) {
                  fecha = fecha.substr(0, 5) + "/" + fecha.substr(6, 4);
                  segundoslap = true;
            } else {
                  fecha = fecha.substr(0, 3);
                  ;
                  segundoslap = false;
            }
      } else {
            if ((largo <= 5) && (segundoslap = true)) {
                  fecha = fecha.substr(0, 4);
                  segundoslap = false;
            }
      }
      if (largo >= 7) {
            ano = fecha.substr(6, 4);
            if (IsNumeric(ano) == false) {
                  fecha = fecha.substr(0, 6);
            } else {
                  if (largo == 10) {
                        if ((ano == 0) || (ano < 1900) || (ano > 2100)) {
                              fecha = fecha.substr(0, 6);
                        }
                  }
            }
      }
      if (largo >= 10) {
            fecha = fecha.substr(0, 10);
            dia = fecha.substr(0, 2);
            mes = fecha.substr(3, 2);
            ano = fecha.substr(6, 4);
            // Año no viciesto y es febrero y el dia es mayor a 28
            if ((ano % 4 != 0) && (mes == 02) && (dia > 28)) {
                  fecha = fecha.substr(0, 2) + "/";
            }
      }
      return (fecha);
}

/**
* Elabora formato de fecha
* @param fecha
* @returns Fecha con formato
*/
function formateaFecha(elemFecha, fecha) {
      var largo = fecha.length;
      var dia;
      var mes;
      var ano;

      var key;
      var keychar;

      if (window.event)
            key = window.event.keyCode;
      else if (elemFecha)
            key = elemFecha.which;
      else
            return true;

      if (key == 37 || key == 38 || key == 39 || key == 40) {
            return true;
      }

      dia = fecha.substr(0, 2);
      mes = fecha.substr(3, 2);
      if (mes != "") {
            if ((mes == 2 || mes == 4 || mes == 6 || mes == 9 || mes == 11)
                        && dia > 30) {
                  fecha = fecha.substr(0, 2);
            }
      }

      var blnPasa;
      var key;
      var keychar;

      if (window.event)
            key = window.event.keyCode;
      else if (elemFecha)
            key = elemFecha.which;
      else
            return true;

      (key == 37 || key == 38 || key == 39 || key == 40)

      if ((largo >= 2) && (primerslap == false)) {
            dia = fecha.substr(0, 2);
            if ((IsNumeric(dia) == true) && (dia <= 31) && (dia != "00")) {
                  fecha = fecha.substr(0, 2) + "/" + fecha.substr(3, 7);
                  primerslap = true;
            } else {
                  fecha = "";
                  primerslap = false;
            }
      } else {
            dia = fecha.substr(0, 1);
            if (IsNumeric(dia) == false) {
                  fecha = "";
            }
            if ((largo <= 2) && (primerslap = true)) {
                  fecha = fecha.substr(0, 1);
                  primerslap = false;
            }
      }
      if ((largo >= 5) && (segundoslap == false)) {
            mes = fecha.substr(3, 2);
            if ((IsNumeric(mes) == true) && (mes <= 12) && (mes != "00")) {
                  fecha = fecha.substr(0, 5) + "/" + fecha.substr(6, 4);
                  segundoslap = true;
            } else {
                  fecha = fecha.substr(0, 3);
                  segundoslap = false;
            }
      } else {
            if ((largo <= 5) && (segundoslap = true)) {
                  fecha = fecha.substr(0, 4);
                  segundoslap = false;
            }
      }
      if (largo >= 7) {
            ano = fecha.substr(6, 4);
            if (IsNumeric(ano) == false) {
                  fecha = fecha.substr(0, 6);
            } else {
                  if (largo == 10) {
                        if ((ano == 0) || (ano < 1900) || (ano > 2100)) {
                              fecha = fecha.substr(0, 6);
                        }
                  }
            }
      }
      if (largo >= 10) {
            fecha = fechaValida(fecha);
      }

      /*
      * if (bolError || fecha.length<10) { window.setTimeout(function() {
      * elemFecha.focus(); }, 50); //ie //window.setTimeout(function() {
      * $(datFechaNacimiento).select(); }, 50); //ie }
      */

      return (fecha);
}

/**
* Elabora formato de fecha
* @param fecha
* @returns Fecha con formato
*/
function formateaFecha(elemFecha, fecha, indFecha) {
      var largo = fecha.length;
      var dia;
      var mes;
      var ano;

      dia = fecha.substr(0, 2);
      mes = fecha.substr(3, 2);
      if (mes != "") {
            if ((mes == 2 || mes == 4 || mes == 6 || mes == 9 || mes == 11)
                        && dia > 30) {
                  fecha = fecha.substr(0, 2);
            }
      }

      if ((largo >= 2) && (primerslap == false)) {
            dia = fecha.substr(0, 2);
            if ((IsNumeric(dia) == true) && (dia <= 31) && (dia != "00")) {
                  fecha = fecha.substr(0, 2) + "/" + fecha.substr(3, 7);
                  primerslap = true;
            } else {
                  fecha = "";
                  primerslap = false;
            }
      } else {
            dia = fecha.substr(0, 1);
            if (IsNumeric(dia) == false) {
                  fecha = "";
            }
            if ((largo <= 2) && (primerslap = true)) {
                  fecha = fecha.substr(0, 1);
                  primerslap = false;
            }
      }
      if ((largo >= 5) && (segundoslap == false)) {
            mes = fecha.substr(3, 2);
            if ((IsNumeric(mes) == true) && (mes <= 12) && (mes != "00")) {
                  fecha = fecha.substr(0, 5) + "/" + fecha.substr(6, 4);
                  segundoslap = true;
            } else {
                  fecha = fecha.substr(0, 3);
                  segundoslap = false;
            }
      } else {
            if ((largo <= 5) && (segundoslap = true)) {
                  fecha = fecha.substr(0, 4);
                  segundoslap = false;
            }
      }
      if (largo >= 7) {
            ano = fecha.substr(6, 4);
            if (IsNumeric(ano) == false) {
                  fecha = fecha.substr(0, 6);
            } else {
                  if (largo == 10) {
                        if ((ano == 0) || (ano < 1900) || (ano > 2100)) {
                              fecha = fecha.substr(0, 6);
                        }
                  }
            }
      }
      if (largo >= 10) {
            fecha = fechaValida(fecha, indFecha);
      }

      /*
      * if (bolError || fecha.length<10) { window.setTimeout(function() {
      * elemFecha.focus(); }, 50); //ie //window.setTimeout(function() {
      * $(datFechaNacimiento).select(); }, 50); //ie }
      */

      return (fecha);
}

/**
* Verifica si el valor ingresado es un valor en blanco
* @param val Valor a revisar
* @returns Validación
*/
function isEmpty(val) {
      return (val === undefined || val == null || val.length <= 0) ? true : false;
}

/**
* Valida tamaño máximo de un campo
* @param campo Campo
* @param length Tamaño
* @param maxLength Tamaño mázimo
*/
function checkMaxLength(campo, length, maxLength) {
      if (length > maxLength) {
            campo.value = campo.value.substr(0, maxLength);
      }
}

/**
* Asigna el listener de pestañas
* @param id Id de control
*/
function seteaListenerTabKey(id) {
      var myInput = document.getElementById(id);
      if (myInput.addEventListener) {
            myInput.addEventListener('keydown', this.keyHandler, false);
      } else if (myInput.attachEvent) {
            myInput.attachEvent('onkeydown', this.keyHandler);
      }
}

/**
* Valida el ingreso de decimales
* @param e Evento
* @returns {Boolean} Validación
*/
function validarDecimales(e) {
      var key;
      var keychar;

      if (window.event)
            key = window.event.keyCode;
      else if (e)
            key = e.which;
      else
            return true;
      keychar = String.fromCharCode(key);
      keychar = keychar.toLowerCase();

      // control keys
      // Sin pegar CTRL V
      if (("Vv").indexOf(keychar) > -1 && e.ctrlKey)
            return false;

      if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13)
                  || (key == 27))
            return true;

      // just numbers
      else if ((("0123456789.").indexOf(keychar) > -1))
            return true;
      else
            return false;
}

/**
* Valida el ingreso de sólo números
* @param e Evento
* @returns {Boolean} Validación
*/
function numberOnly(e) {
      var key;
      var keychar;

      if (window.event)
            key = window.event.keyCode;
      else if (e)
            key = e.which;
      else
            return true;
      keychar = String.fromCharCode(key);
      keychar = keychar.toLowerCase();

      // control keys
      // Sin pegar CTRL V
      if (("Vv").indexOf(keychar) > -1 && e.ctrlKey)
            return false;

      if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13)
                  || (key == 27))
            return true;

      // just numbers
      else if ((("0123456789").indexOf(keychar) > -1))
            return true;
      else
            return false;
}

/*
* Valida la formación de una fecha
*/
function fechaValida(fecha, indFecha) {
      fecha = fecha.substr(0, 10);
      dia = fecha.substr(0, 2);
      mes = fecha.substr(3, 2);
      ano = fecha.substr(6, 4);
      // Año no viciesto y es febrero y el dia es mayor a 28
      if ((mes == "02") && dia > 29) {
            fecha = fecha.substr(0, 2) + "/";// Valida Febrero: el día debe estar
                                                                  // entre 1 y 29
      } else {
            if ((ano % 4) != 0 && (mes == "02") && dia == 29) {
                  fecha = fecha.substr(0, 2) + "/";// Año Bisiesto: se verifica que
                                                                        // febrero tenga 29 días
            }
      }

      // Validacion con fecha actual (fecha ingresada superior a fecha actual y
      // mayoria de edad)
      fechaActual = new Date();
      anioActual = fechaActual.getYear();
      mesActual = fechaActual.getMonth() + 1;
      diaActual = fechaActual.getDate();
      if (parseInt(ano) >= anioActual) {// Fecha ingresada superior a fecha
                                                            // actual
            if (parseInt(ano) == anioActual) {
                  if (indFecha == '2') {// indFecha 2: Fecha de Ingreso
                        if (mes == mesActual && dia > diaActual) {
                              fecha = fecha.substr(0, 6);
                        } else if (mes > mesActual) {
                              fecha = fecha.substr(0, 6);
                        }
                  } else {
                        fecha = fecha.substr(0, 6);
                  }
            } else if (parseInt(ano) > anioActual) {
                  fecha = fecha.substr(0, 6);
            }
      } else {// Mayoria de edad
            if (indFecha == '1') {// indFecha 1: Fecha de Nacimiento
                  if (anioActual - ano < 18) {
                        fecha = fecha.substr(0, 6);
                  }
            }
      }

      return (fecha);
}

/*
* Valida la formación de una fecha
*/
function fechaValida(fecha) {
      fecha = fecha.substr(0, 10);
      dia = fecha.substr(0, 2);
      mes = fecha.substr(3, 2);
      ano = fecha.substr(6, 4);
      // Año no viciesto y es febrero y el dia es mayor a 28
      if ((mes == "02") && dia > 29) {
            fecha = fecha.substr(0, 2) + "/";// Valida Febrero: el día debe estar
                                                                  // entre 1 y 29
      } else {
            if ((ano % 4) != 0 && (mes == "02") && dia == 29) {
                  fecha = fecha.substr(0, 2) + "/";// Año Bisiesto: se verifica que
                                                                        // febrero tenga 29 días
            }
      }

      return (fecha);
}

/**
* Da formato a fecha cuando se pierde el foco
* @param fecha
* @returns Fecha con formato
*/
function formateaFechaOnblur(fecha) {
      var largo = fecha.length;

      if (largo < 10) {
            fecha = "";
      } else {
            fecha = fechaValida(fecha);
      }

      return (fecha);
}

/**
* Da formato a fecha cuando se pierde el foco
* @param fecha
* @returns Fecha con formato
*/
function formateaFechaOnblur(fecha, indFecha) {
      var largo = fecha.length;

      if (largo < 10) {
            fecha = "";
      } else {
            fecha = fechaValida(fecha, indFecha);
      }

      return (fecha);
}

/**
* Autocompleta información del formato de fecha
* @param fecha
* @returns Fecha modificada
*/
function valorFiltro(fecha) {
      var key = window.event.keyCode;
      var largo = fecha.length;
      if (key == 8) {
            if (largo == 2) {
                  fecha = fecha.substr(0, 1);
            }
            if (largo == 5) {
                  fecha = fecha.substr(0, 4);
            }
            if (largo == 10) {
                  fecha = fecha.substr(0, 9);
            }
            if (largo == 13) {
                  fecha = fecha.substr(0, 12);
            }
            if (largo == 16) {
                  fecha = fecha.substr(0, 15);
            }
      } else {
            if (largo == 2) {
                  fecha = fecha + '/';
            }
            if (largo == 5) {
                  fecha = fecha + '/';
            }
            if (largo == 10) {
                  fecha = fecha + ' ';
            }
            if (largo == 13) {
                  fecha = fecha + ':';
            }
            if (largo == 16) {
                  fecha = fecha + ':';
            }
      }
      return (fecha);
}

/**
* Función que valida fecha 
 */
function esFecha(fecha) {
      // si fecha es vacia entonces retornar true
      if (fecha == "") {
            return true;
      }
      // La fecha debe estar en fomato dd/MM/yyyy
      if (fecha.length != 10)
            return false;
      // Se verifica que la fecha sólo tenga caracteres numéricos y el caracter
      // "/"
      for ( var i = 0; i < fecha.length; i++) {
            var carac = fecha.charAt(i);
            if ((carac < "0" || carac > "9") && carac != "/")
                  return false;
      }
      // Obtenemos el dia de la fecha
      var pos1 = fecha.indexOf("/");
      aux = fecha.substring(0, pos1);

      // verificamos que la parte del dia tenga dos caracteres
      if (aux.length != 2)
            return false;
      if (aux.charAt(0) == "0") {
            aux = aux.substr(1, 1);
      }
      var dia = parseInt(aux, 10);

      // Obtenemos el mes de la fecha
      var pos2 = fecha.indexOf("/", pos1 + 1);
      var aux = fecha.substring(pos1 + 1, pos2);
      // verificamos que la parte del mes tenga dos caracteres
      if (aux.length != 2)
            return false;
      if (aux.charAt(0) == "0") {
            aux = aux.substr(1, 1);
      }
      var mes = parseInt(aux, 10);

      // Obtenemos el año de la fecha
      aux = fecha.substring(pos2 + 1, fecha.length);
      // verificamos que la parte del año tenga cuatro caracteres
      if (aux.length != 4)
            return false;
      var anno = parseInt(aux, 10);

      if (mes < 1 || mes > 12) {
            return false;
      } // el mes debe estar entre 1 y 12
      if (dia < 1 || dia > 31) {
            return false;
      }
      ; // el día debe estar entre 1 y 31
      if (anno < 1754 || anno > 9999) {
            return false;
      } // el año debe estar entre 1754 y 9999
      if (mes == 2 && dia > 29)
            return false; // valida Febrero: el día debe estar entre 1 y 29
      if ((anno % 4) != 0 && dia == 29 && (mes == 2))
            return false; // Año Bisiesto: se verifica que febrero tenga 29 días
      if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) & dia > 30) {
            return false;
      } // Meses de 30 dias.

      return true;
}

/**
* Función que valida el email 
 */
function validarEmail(valor) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(valor)) {
            return (true);
      } else {
            alert("La dirección de email es incorrecta.");
            return (false);
      }
}

var validos = " abcdefghijklmnopqrstuvwxyz0123456789";

/**
* Valida si la información contenida en el campo es alfanumérica
* @param campo Campo a verificar
* @returns Validación
*/
function validaAlfanumerico(campo) {
      var letra;
      var bien = true;
      var longitud = campo.value.length;

      for ( var i = 0; i < longitud; i++) {
            letra = campo.value.charAt(i).toLowerCase();
            if (validos.indexOf(letra) == -1) {
                  bien = false;
            }
      }
      if (!bien) {
            campo.value = campo.value.substr(0, longitud - 1);
      }

      return campo.value.toUpperCase();
}

function closeWindow(){
      var elementoSession=document.getElementById("frm:sessionPage");
      if( elementoSession!=null){
            var sessionPageValor= elementoSession.value; 
            if(sessionPageValor==1){
                  window.location.href='ApplicationLogOutServlet?closeWindow=0';
            }
      }
}

/**
* Prevent the backspace key from navigating back. 
 */
$(document).unbind('keydown')
            .bind(
                        'keydown',
                        function(event) {
                              var doPrevent = false;
                              if (event.keyCode === 8) {
                                    var d = event.srcElement || event.target;
                                    if ((d.tagName.toUpperCase() === 'INPUT' && (d.type
                                                .toUpperCase() === 'TEXT' || d.type
                                                .toUpperCase() === 'PASSWORD'))
                                                || d.tagName.toUpperCase() === 'TEXTAREA') {
                                          doPrevent = d.readOnly || d.disabled;
                                    } else {
                                          doPrevent = true;
                                    }
                              }

                              if (doPrevent) {
                                    event.preventDefault();
                              }
                        });

function changeHashOnLoad() {
    window.location.href += '';
    setTimeout('changeHashAgain()', '100000');
}

function changeHashAgain() {
    window.location.href += '1';
}