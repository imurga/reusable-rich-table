/**
* resources/js/tree
*
* 21-05-2013
*
* Copyright Banco de Crédito del Perú
* 
* @author Jose Torres
* 
* Este script permite realizar las acciones dentro del Arbol de Jerarquias.
*/

/** Contenedor del arbol */
var divArbol = "#divArbol";
/** Contenedor del formulario */
var fldFormulario = "#fldFormulario";

/** Campo de busqueda para el arbol */
var txtBuscar = "#txtBuscar";

/** Campo de mensaje de confirmación de creación de primer nivel*/
var hndMsgTerminarNodoCreado = "#hndMsgTerminarNodoCreado";
/** Campo oculto del mensaje eliminar nodo */
var hndMsgEliminarNodo = "#hndMsgEliminarNodo";
/** Campo oculto del mensaje Cancelar */
var hndMsgCancelar = "#hndMsgCancelar";
/** Campo oculto del mensaje mover nodo */
var hndMsgMoverNodo = "#hndMsgMoverNodo";
/** Campo oculto del mensaje cuando no se ingresa la matricula */
var hndMsgDetalleMatricula = "#hndMsgDetalleMatricula";
/** Campo oculto del mensaje cuando no se ingresa el cargo */
var hndMsgDetalleCargo = "#hndMsgDetalleCargo";
/** Campo oculto del mensaje cuando no se ingresa el detalle de la ausencia de inicio */
var hndMsgDetalleAusenciaIni = "#hndMsgDetalleAusenciaIni";
/** Campo oculto del mensaje cuando no se ingresa la matricula de reemplazo */
var hndMsgDetalleMatrReemplazo = "#hndMsgDetalleMatrReemplazo";
/** Campo oculto del mensaje cuando la fecha inicio es mayor a la fecha fin */
var hndMsgFechaInicioMayorFin = "#hndMsgFechaInicioMayorFin";
/** Campo oculto del mensaje confirmar */
var hndMsgConfirmarGuardar = "#hndMsgConfirmarGuardar";


/** Campo oculto de la opción de menu Primer Nivel */
var hndMenuPrimerNivel = "#hndMenuPrimerNivel";
/** Campo oculto de la opción de menu Sub Nivel */
var hndMenuSubNivel = "#hndMenuSubNivel";
/** Campo oculto de la opción de menu Elminar */
var hndMenuEliminar = "#hndMenuEliminar";
/** Campo oculto del nombre del nodo por defecto de crear primer nivel */
var hndMenuNombrePrimerNivel = "#hndMenuNombrePrimerNivel";
/** Campo oculto del nombre del nodo por defecto de crear sub nivel */
var hndMenuNombreSubNivel = "#hndMenuNombreSubNivel";
/** Campo oculto para el id seleccionado de la jerarquia */
var hndId = "#hndId";
/** Campo oculto del id del nuevo puesto */
var hndIdPuestoNuevo = "#hndIdPuestoNuevo";
/** Campo oculto del id del nuevo puesto de reemplazo */
var hndIdPuestoNuevoReem = "#hndIdPuestoNuevoReem";

/** Campo de la matricula */
var txtMatricula = "#txtMatricula";
/** Imagen para buscar por matricula */
var imgBuscarMatr = "#imgBuscarMatr";
/** Etiqueta para el nombre y apellido del empleado */
var lblNombreApellido = "#lblNombreApellido";
/** Etiqueta para el nombre del puesto */
var lblPuesto = "#lblPuesto";
/** Combo para la lista de cargos */
var selCargo = "#selCargo";
/** Contenedor de los campos de Ausente */
var divAusente = "#divAusente";
/** Campo radio que contiene si esta o no ausente */
var radAusente = "#radAusente";
/** Botón radio para selecionar cuando no esta ausente */
var radAusenteNo = "#radAusenteNo";
/** Botón radio para selecionar cuando si esta ausente */
var radAusenteSi = "#radAusenteSi";
/** Campo de la matricula de reemplazo */
var txtMatriculaReemplazo = "#txtMatriculaReemplazo";
/** Imagen para buscar por matricula de reemplazo */
var imgBuscarMatrReemplazo = "#imgBuscarMatrReemplazo";
/** Campo de la fecha de inicio de ausencia */
var txtFechaIniAusencia = "input[id*='txtFechaIniAusencia']";
/** Campo de la fecha fin de ausencia */
var txtFechaFinAusencia = "input[id*='txtFechaFinAusencia']";
/** Etiqueta del nombre y apellido de reemplazo */
var lblNombreApellidoReemplazo = "#lblNombreApellidoReemplazo";
/** Etiqueta del puesto de reemplazo */
var lblPuestoReemplazo = "#lblPuestoReemplazo";

/** Url del servlet que sera el controlador de las acciones con la capa de negocio */
var urlJerarquia = "./AdministradorJerarquiaServlet";

/** Contenedor del mensaje de error */
var divError = "#error_div";
/** Contenedor del mensaje de exito */
var divExito = "#exito_div";
/** Mensaje de resultado de error del formulario */
var lblMensajeDeError = "txtMensajeDeError";
var txtMensajeDeError = "span[id*='txtMensajeDeError']";
/** Mensaje de resultado de exito del formulario */
var lblMensajeDeExito = "txtMensajeDeExito";
/** Botón para guardar los cambios */
var btnGuardar = "#btnGuardar";
/** Botón para cancelar, es este caso elimina el nuevo nodo */
var btnCancelar = "#btnCancelar";
/** Texto del titulo del nuevo nodo */
var txtTituloNuevo = "#txtTituloNuevo";
/** Texto del titulo */
var txtTitulo = "#txtTitulo";

//*** Parámetros para el componente Arbol ***
/** Posición de donde se creará el nuevo nodo */
var txtPosicion	= "first";
/** Id por defecto del nodo creado */
var txtIdDefecto = "-1";
/** Tema que se usa para el arbol */
var txtTema = "classic";
/** Tipo del ID padre */
var txtTipoIdPadre = "padre";
/** Tipo del ID hijo */
var txtTipoIdHijo = "hijo";
/** Acción de obtener nodo */
var intAccionObtenerNodo = 1;
/** Acción para nuevo nodo */
var intAccionNuevoNodo = 2;
/** Acción para mover nodo */
var intAccionMoverNodo = 3;
/** Acción para eliminar nodo */
var intAccionEliminarNodo = 4;
/** Acción para buscar nodo */
var intAccionBuscarNodo = 5;
/** Acción para actualizar nodo */
var intAccionActualizarNodo = 6;
/** Acción para buscar emplado */
var intAccionBuscarEmpleado = 7;
/** Acción para buscar cargo */
var intAccionBuscarCargo = 8;
/** Variable que indica si el boton guardar esta habilitado o no */
var btnGuardarHabilitado = false;

/**
 * Función para crear un nodo de primer Nivel
 */
function crearPrimerNivel(){
	var objNodo = obtenerNodoPorId(txtIdDefecto);
	
	if(objNodo != null) {						
		$(txtMensajeDeError).text($(hndMsgTerminarNodoCreado).val());
		mostrarCampo(divError);
	} else {
		objNodo = $(divArbol).jstree("create", -1, txtPosicion, 
				{"attr":{id: txtIdDefecto}, data: $(hndMenuNombrePrimerNivel).val()}, false, true);		
	}	
	
	$(divArbol).jstree("select_node", objNodo, true);
	//return false;
}

/**
 * Función para crear un nodo de sub Nivel
 */
function crearSubNivel(){
	//ocultraCampo("#spnTitulo");
	//mostrarCampo("#spnTituloNuevo");
	var objNodo = $(divArbol).jstree("create", null, txtPosicion, 
			{"attr":{id: txtIdDefecto}, data: $(hndMenuNombreSubNivel).val()}, false, true);
	$(divArbol).jstree("select_node", objNodo, true);
}

/**
 * Función para eliminar el nodo
 */
function eliminarNodo(objNodo){
	$(divArbol).jstree("remove", objNodo);
	$(document.getElementById("frm:disableForm")).trigger('click');
}

/**
 * Función para refrescar los nodos del arbol
 */
function recargar(){
	$(divArbol).jstree('refresh',-1);
	ocultarCampo(fldFormulario);	
}

/**
 * Función para crear un nodo de sub Nivel
 */
function buscarArbol(){
	$(divArbol).jstree("search", $.trim($(txtBuscar).val()));
}

/**
 * Función para inicializar la variable si no existe
 * @param strCampo Campo a evaluar
 * @return strResultado Campo inicializado
 */
function inicializarCampo(strCampo){
	var strResultado = "";
	if(strCampo){
		strResultado = strCampo;
	}
	return strResultado;
}

/**
 * Función para mostrar el campo
 * @param objCampo Campo a mostrar
 */
function mostrarCampo(objCampo){
	if($(objCampo)){
		$(objCampo).css("display", "block");
	}
}

/**
 * Función para ocultar el campo
 * @param objCampo Campo a ocultar
 */
function ocultarCampo(objCampo){
	if($(objCampo)){
		$(objCampo).css("display", "none");
	}
}

/**
 * Función para mostrar mensaje del formulario y retorna si hay o no error
 * @param objResultado Objeto de donde se realizara la busqueda
 * @param strSeparador Caracter separador
 * @param strFlagModificarMensaje Flag para modificar mensaje. 
 * 					Ejm: true:Asignar mensaje, 
 * 						 false:Retornar validacion 
 * @return true si hay error y false sino hay error.
 */
function esMensajeError(objResultado, strSeparador, strFlagModificarMensaje){
	var blnResultado = false;
	var resultado = objResultado.split(strSeparador);
	if(strFlagModificarMensaje){
		ocultarCampo(divError);
		ocultarCampo(divExito);
	}

	if($.isArray(resultado)){	
		if($.trim(resultado[1]) != ""){
			if(resultado[0] == "1") {
				if(strFlagModificarMensaje){					
					mostrarCampo(divError);
					$(txtMensajeDeError).text(resultado[1]);
				}
				blnResultado = true;
			}else if(resultado[0] == "0") {
				if(strFlagModificarMensaje){
					$("span[id*='txtMensajeDeExito']").text(resultado[1]);
					mostrarCampo(divExito);
				}
			}
		}
	}
	return blnResultado;
}

/**
 * Función para mostrar mensaje del formulario y retorna si hay o no error
 * @param objResultado Objeto de donde se realizara la busqueda
 * @param strFlagModificarMensaje Flag para modificar mensaje. 
 * 					Ejm: true:Asignar mensaje, 
 * 						 false:Retornar validacion 
 * @return true si hay error y false sino hay error.
 */
function obtenerIdCampoPorId(strId){	
	var strResultado = "";
	
	switch(strId) {
	case "ma": 
		strResultado = txtMatricula;
		break;
	case "ca":
		strResultado = selCargo;
		break;
	case "ia":
		strResultado = txtFechaIniAusencia;
		break;
	case "fa":
		strResultado = txtFechaFinAusencia;
		break;
	case "mr":
		strResultado = txtMatriculaReemplazo;
		break;		
	}
	
	return strResultado;
}

/**
 * Función para mostrar mensaje del formulario y retorna si hay o no error
 * @param objResultado Objeto de donde se realizara la busqueda
 * @param strFlagModificarMensaje Flag para modificar mensaje. 
 * 					Ejm: true:Asignar mensaje, 
 * 						 false:Retornar validacion 
 * @return true si hay error y false sino hay error.
 */
function esMensajeErrorLista(objResultado, strFlagModificarMensaje){
	var blnResultado = false;
	var strResultado = "";
		
	if($.isArray(objResultado)){
		if(objResultado[0].attrerror){
		$.each(objResultado[0].attrerror, function(key, value) {
			strResultado += ($.trim(value.msg) == "" ? value.def : value.msg) + ". ";						
			asignarAtributo(obtenerIdCampoPorId(value.tag),'class',value.css);
		});
		}
	}	 
	
	if(strFlagModificarMensaje && $.trim(strResultado) != ""){
		ocultarCampo(divExito);
		mostrarCampo(divError);
		$(txtMensajeDeError).text(strResultado);
		blnResultado = true;
	}
	return blnResultado;
}

/**
 * Función generica que tiene las acciones a realizar dentro del árbol
 */
$(function ($) {
	$(divArbol)
		//Nodo que se realizó clic
		.bind("select_node.jstree", function (event, data) {
			mostrarCampo(fldFormulario);			
			var arrData = [txtMatricula, selCargo, txtFechaIniAusencia, txtMatriculaReemplazo];	
			asignarAtributo(arrData, 'class', ''); 
			
			$(hndId).val(data.rslt.obj.attr("id"));
			$(txtMatricula).val(data.rslt.obj.attr("ma"));
			$(lblNombreApellido).text(inicializarCampo(data.rslt.obj.attr("no")));
			$(lblPuesto).text(inicializarCampo(data.rslt.obj.attr("dp")));
			$(lblNombreApellidoReemplazo).text('');
			$(lblPuesto).attr('idpuesto', inicializarCampo(data.rslt.obj.attr("pu")));
			$(selCargo).removeAttr("ejecutado");
			$('option', selCargo).remove();
			if(data.rslt.obj.attr("ca")){
				$(selCargo).append('<option value="'+data.rslt.obj.attr("ca")+'">'+
						data.rslt.obj.attr("dc")+'</option>');//selected="selected"
			}
			
			if(data.rslt.obj.attr("au")==0 || $(hndId).val() == txtIdDefecto){
				$(radAusenteNo).prop("checked", true);
				ocultarCampo(divAusente);
			}else{
				$(radAusenteSi).prop("checked", true);
				mostrarCampo(divAusente);
			}			
			
			$(txtFechaIniAusencia).val(data.rslt.obj.attr("ia"));
			$(txtFechaFinAusencia).val(data.rslt.obj.attr("fa"));
			$(txtMatriculaReemplazo).val(data.rslt.obj.attr("mr"));
			if($(txtMatriculaReemplazo).val() != ''){
				$(imgBuscarMatrReemplazo).trigger('click');
			}
			$(lblPuestoReemplazo).text(inicializarCampo(data.rslt.obj.attr("dpr")));
			modificarElemento("#btnGuardar",true);
			btnGuardarHabilitado = false;
			if($(hndId).val() == txtIdDefecto){
				ocultarCampo(txtTitulo);
				asignarAtributo(btnCancelar, 'style', ' ');
				mostrarCampo(txtTituloNuevo);
				$(document.getElementById("frm:enableFormConEsc")).trigger('click');
			}else{
				ocultarCampo(btnCancelar);
				ocultarCampo(txtTituloNuevo);
				mostrarCampo(txtTitulo);
				$(document.getElementById("frm:enableFormSinEsc")).trigger('click');
			}
		})
		//.delegate("a", "click", function (event, data) { event.preventDefault(); })
		
		.delegate("a","dblclick", function(e) {
			$(divArbol).jstree("toggle_node", this);
		})
	
		.jstree({
			// Lista de plugins activos Ejm: "cookies",
			"plugins" : [
				"themes","json_data","ui","crrm","dnd","search","types","hotkeys","contextmenu" 
			],
			"themes" : {
         		"theme" : txtTema,
         		"dots" : true,
         		"icons" : true
     		},
     		"dnd" : {
     			 "drop_finish" : function () { },
     			 "drag_check" : function (data) {
     			 return { 
     			 after : false, 
     			 before : false, 
     			 inside : true 
     			 };
     			 },
     			 "drag_finish" : function (data) { }
     		},
			//JSON para obtener los nodos
			"json_data" : {
				 //progressive_render: false,
				"ajax" : {
					"url" : urlJerarquia,					 
					"data" : function (n) {//Obtener root node es 0 o los nodos hijos
						return { 
							"accion" : intAccionObtenerNodo,							
							"id" : n.attr ? n.attr("id").substr(0, n.attr("id").indexOf("_")) : 0,
							"fecha" : new Date()		
						};
					},
					success : function (r) {
						var strJson = JSON.stringify(r);
				    	var arrJson = JSON.parse(strJson);
						var idResultado = obtenerAtributo(arrJson);
						esMensajeError(idResultado, "|",true);
					},					
					error: function (r, txtEstado, errorThrown) {								
					}
					
				}
			},
			"contextmenu" : {
    			"items" : crearMenu
			},		
			"search" : {
				// Se realiza una búsqueda mediante ajax
				"ajax" : {
					"url" : urlJerarquia,
					// Se envia el la cadena a buscar
					"data" : function (str) {
						return { 
							"accion" : intAccionBuscarNodo, 
							"buscar" : str
						};
					}
				}
			},
			"types" : {
				"valid_children" : [ "drive" ],
				"types" : {
				}
			},
			// UI & core - los nodos que inicialmente se seleccionan y abren
			"ui" : {
				 "select_limit": 1, // Cantidad de nodos que se puede seleccionar
				 "selected_parent_close" : "select_parent"
			}
		})
		//Crear un nodo
		.bind("create.jstree", function (e, data) {
			var strIdPadre = data.rslt.parent.attr ? data.rslt.parent.attr("id") : "0";						
			$('#'+txtIdDefecto).attr('idpadre', strIdPadre);
			$(lblPuesto).removeAttr("idpuesto");
		})
		
		//Mensaje de confirmación antes de realizar de eliminar o mover el(os) nodo(s)
		.bind("before.jstree", function (e, data) {				
				if(data.func == "remove") {
					var strNombre = $(lblNombreApellido).text();
					if(strNombre==""){
						strNombre = data.args[0].text();
					}
					var objNodo = obtenerNodoPorId(txtIdDefecto);
					var msg="";
					if(objNodo == null){						
						msg = $(hndMsgEliminarNodo).val();
					}else {
						msg = $(hndMsgCancelar).val();
					}
					if(data.args[0].text() != "" && !confirm(msg)){//data.args[0].text()
								e.stopImmediatePropagation();					
								return false;
					}
														
				}
				
				if (data.func == "move_node" && data.args[1] == false 
					&& data.plugin == "core" && data.args[0].o) {
					
					var objNodo = obtenerNodoPorId(txtIdDefecto);

					if(objNodo != null){
					    $(txtMensajeDeError).text($(hndMsgTerminarNodoCreado).val());
					    mostrarCampo(divError);					    
					    e.stopImmediatePropagation();
					    return false;
					}else{						
						if(!confirm($(hndMsgMoverNodo).val() +" \n")){//}+ $.trim(data.args[0].o.text())+"'?")) {
							//data.args[0].o.text()
							e.stopImmediatePropagation(); 
							return false; 
						}
					}
				}
		})
		//Mover nodo
		.bind("move_node.jstree", function (e, data) {
			data.rslt.o.each(function (i) {
				
				
				$.ajax({
					async : false,
					type: 'POST',
					url: urlJerarquia,
					data : {
						"accion" : intAccionMoverNodo, 
						"id" : obtenerIdPorCadena($(this).attr("id"),"_","0"),
						"idpadre" : data.rslt.cr === -1 ? 1 : 
							obtenerIdPorCadena(data.rslt.np.attr("id"),"_","0"),
						"id_actual" : $(this).attr("id")	
					},
					success : function (r) {
						var strJson = JSON.stringify(r);
				    	var arrJson = JSON.parse(strJson);	    	 
				    	var idResultado = obtenerAtributo(arrJson);
				    	
				    	if(!esMensajeError(idResultado, "|", true)){
				    		$("#"+arrJson[0].id_actual).attr("id", arrJson[0].id+"_"+arrJson[0].idpadre);
				    		$(hndId).val(arrJson[0].id+"_"+arrJson[0].idpadre);
				    	}else{
				    		$.jstree.rollback(data.rlbk);
				    		mostrarCampo(divError);
				    	}						
					}
				});
				
				
			});
		})
		//Eliminar el nodo
		.bind("remove.jstree", function (e, data) {
			
				data.rslt.obj.each(function () {
					$.ajax({
						async : false,
						type : 'POST',
						url : urlJerarquia,
						data : {
							"accion" : intAccionEliminarNodo, 
							"id" : obtenerIdPorCadena(this.id,"_",txtIdDefecto) 
								//this.id.substr(0, this.id.indexOf("_"))						
						},
						success : function (r) {
							var strJson = JSON.stringify(r);
					    	var arrJson = JSON.parse(strJson);	    	 
					    	var idResultado = obtenerAtributo(arrJson);
					    	ocultarCampo(fldFormulario);
					    	
					    	if(esMensajeError(idResultado, "|", true)){
					    		$.jstree.rollback(data.rlbk);
					    		mostrarCampo(divError);
					    		mostrarCampo(fldFormulario);
					    	}
						}
					});
				});
			//}
		})		
		//Seleccionar el primer nodo
		.bind("loaded.jstree", function (event, data) { 
			//data.inst.select_node('ul > li:first');
			ocultarCampo(fldFormulario);			
		});
	});

/**
 * Función para obtener el id dentro del texto
 * @param strTexto texto en el cual se buscará 
 * @param strSeparador caracter separador que se buscará
 * @param strIdDefecto Id defecto que se va a retornar si no existe separador
 * @return strId id encontrado dentro del texto
 */
function obtenerIdPorCadena(strTexto, strSeparador, strIdDefecto){
	var strId = strIdDefecto;
	if(strTexto.indexOf(strSeparador) != '-1'){
		strId = strTexto.substr(0, strTexto.indexOf(strSeparador));
	}
	return strId;
}

/**
 * Función para obtener el id a partir nodo
 * @param objNodo nodo del cual se quiere extraer el id
 * @param strTipo tipo de Id a obtener. Ejm: "padre" o "hijo"
 * @param strAtributo atributo el cual se va a realizar la búsqueda
 * @param strSeparador caracter separador que se buscará
 * @return strId id encontrado
 */
function obtenerIdPorNodo(objNodo, strTipo, strAtributo, strSeparador){
	var strId = "0";
	
	switch(strTipo) {
	case txtTipoIdPadre:
		if(objNodo.attr){
			strId = objNodo.attr && objNodo.attr(strAtributo) ? 
					objNodo.attr(strAtributo).substr(
							objNodo.attr(strAtributo).indexOf(strSeparador)+1) : 0;
		}else{
			strId = objNodo ? objNodo.substr(objNodo.indexOf(strSeparador)+1) : 0;
		}
		break;
	case txtTipoIdHijo:
		if(objNodo.attr){
			if(objNodo.attr(strAtributo).indexOf(strSeparador) != '-1'){
				strId = objNodo.attr ? objNodo.attr(strAtributo).substr(0, 
						objNodo.attr(strAtributo).indexOf(strSeparador)) : 0;
			}else{
				strId = objNodo.attr(strAtributo);	
			}
		}
		break;
	}	
	return strId;
}

/**
 * Función para obtener el nodo a partir del id dentro del arbol
 * @param id Id que se quiere buscar
 * @return objResultado Nodo que tenga dicho id   
 */
function obtenerNodoPorId(id){
	var objResultado = null;
	 $(divArbol).find("li").each( function( idx, listItem ) {
         var objNodo = $(listItem);

         if (objNodo.attr("id") == id){
        	 objResultado = objNodo;
        	 return false;
         }
     });
	 return objResultado;
}

/**
 * Función para reemplazar texto dentro del arbol
 * @param strComponente Componente de donde se quiere buscar
 * @param strTag Tag que se quiere buscar
 * @param txtBuscar Texto que se quiere buscar
 * @param txtReemplazo Texto de reemplazo
 * @param txtPreAgregar Texto de reemplazo previo
 */
function reemplazarTextoPorTexto(strComponente, strTag, txtBuscar, txtReemplazo, txtPreAgregar){
	 $(strComponente).find(strTag).each( function(idx, lstItem) {
         var objNodo = $(lstItem);
         
         if(txtBuscar == $.trim(objNodo.text()) || txtBuscar ==""){
        	 objNodo.html(txtPreAgregar+txtReemplazo);
        	 return false;
         }
     });
}

/**
 * Función para crear menu contextual cuando se hace clic derecho
 * @param objNodo Nodo en el cual se hace clic derecho
 * @return objItems Menu contextual generado
 */
function crearMenu(objNodo) {
	$(divArbol).jstree("select_node", objNodo, true);
	var objItems = "";
	var objNodoNuevo = obtenerNodoPorId(txtIdDefecto);
	ocultarCampo(divExito);
	ocultarCampo(divError);
	
	if(objNodoNuevo != null){
		if(objNodoNuevo[0] !== objNodo[0]){
			$(txtMensajeDeError).text($(hndMsgTerminarNodoCreado).val());		
			mostrarCampo(divError);
			//return;
		}		
		$(divArbol).jstree("select_node", objNodoNuevo, true);
		
		if(objNodo.attr("id") == txtIdDefecto){
		objItems = {
				 "eliminar" : {
				 	"label" : $(hndMenuEliminar).val(),
				 	"action" : function () {
				 		eliminarNodo(objNodo);
				 	}
				 }
			};
		}
	}else{
		objItems = {
			"primernivel" : {
				"label" : $(hndMenuPrimerNivel).val(),
			   	"action" : function () {
			   		crearPrimerNivel();
			   	}
			 },
			 "subnivel" : {
			 	"label" : $(hndMenuSubNivel).val(),
			 	"action" : function () {
			 		crearSubNivel();
			 	}
			 },
			 "eliminar" : {
			 	"label" : $(hndMenuEliminar).val(),
			 	"action" : function () {
			 		eliminarNodo(objNodo);
			 	}
			 }
		};
		
		var strNodoPadre = obtenerIdPorNodo(objNodo, txtTipoIdPadre,"id","_");		
		if(strNodoPadre !== "0"){
			delete objItems.primernivel;
		}
	}
	return objItems;
}

/**
 * Función para mostrar mensaje de advertencia
 * @param strCampo Campo de texto a evaluar
 * @param strMsg Texto de advertencia a mostrar
 * @return false En caso no se ingreso el valor, true en caso se halla ingresado el valor 
 */
function validarCampo(strCampo, strMsg){	
	$(strCampo).val($.trim($(strCampo).val()));
	ocultarCampo(divError);
	ocultarCampo(divExito);
	
	if($.trim($(strCampo).val()) == ""){
		$(txtMensajeDeError).text(strMsg);
		mostrarCampo(divError);
		$(strCampo).focus();
		$(strCampo).select();
		asignarAtributo(strCampo,'class','error_style');    	 
		return false;
	}
	return true;
}

/**
 * Función para validar los campos del formulario de jerarquia
 * @return false En caso no se ingreso el valor, true en caso se halla ingresado el valor 
 */
function validarFormulario(){
	ocultarCampo(divError);
	ocultarCampo(divExito);
	
	var arrData = [txtMatricula, selCargo, txtFechaIniAusencia, txtMatriculaReemplazo];	
	asignarAtributo(arrData, 'class', ''); 
	
    //Campo de texto
	$(txtFechaFinAusencia).val($.trim($(txtFechaFinAusencia).val()));
	$(txtMatricula).val($.trim($(txtMatricula).val()));
    if($(txtMatricula).val() == ""){
		$("span[id*='txtMensajeDeError']").text($(hndMsgDetalleMatricula).val());
		mostrarCampo(divError);	
 		asignarAtributo(arrData[0],'class','error_style'); 		
    	$(txtMatricula).focus();
    	$(txtMatricula).select(); 
    	return false;
    }
    $(selCargo).val($.trim($(selCargo).val()));
    if($(selCargo).val()== null || $(selCargo).val() == ""){
		$("span[id*='txtMensajeDeError']").text($(hndMsgDetalleCargo).val());
		mostrarCampo(divError);
		asignarAtributo(arrData[1],'class','error_style');
		$(selCargo).select();
		$(selCargo).focus();
		return false;
    }
    // Checkbox
    if($(radAusenteSi).is(":checked")){
    	$(txtFechaIniAusencia).val($.trim($(txtFechaIniAusencia).val()));
		if($(txtFechaIniAusencia).val() == ""){  
			$("span[id*='txtMensajeDeError']").text($(hndMsgDetalleAusenciaIni).val());
			mostrarCampo(divError);
		    $(txtFechaIniAusencia).focus();
		    return false;
		}
		$(txtMatriculaReemplazo).val($.trim($(txtMatriculaReemplazo).val()));
		if($(txtMatriculaReemplazo).val() == ""){
			$("span[id*='txtMensajeDeError']").text($(hndMsgDetalleMatrReemplazo).val());
			mostrarCampo(divError);
		    $(txtMatriculaReemplazo).focus();
		    return false;
		}
    }
    return true;
}

/**
 * Función para obtener el atributo resultado
 * @param objResultado Objeto a evaluar
 * @return strResultado Resultado del valore buscado
 */
function obtenerAtributo(objResultado) {
	var strResultado = "";
	
	$.each(objResultado, function(key, value) {
		if(value.resultado){
			strResultado = value.resultado; 	
			return false;
		}
	});
	return strResultado;
}

/**
 * Función para limpiar ausente
 */
function limpiarAusente(){
	$(txtFechaIniAusencia).val("");
	$(txtFechaFinAusencia).val("");
	$(txtMatriculaReemplazo).val("");
	$(lblNombreApellidoReemplazo).text("");
	$(lblPuestoReemplazo).text("");
}

/**
 * Función para asignar los atributos y valor a la lista de tag
 * @param arrData Lista de los tag que se quiere asignar dicho atributo
 * @param strAtributo Nombre del atributo
 * @param strValorAtributo Valor del atributo
 */
function asignarAtributo(arrData, strAtributo, strValorAtributo){
	if($.isArray(arrData)){
		jQuery.each(arrData, function(id, valor) {
		   	$(valor).attr(strAtributo, strValorAtributo);
		});
	}else{
		$(arrData).attr(strAtributo, strValorAtributo);
	}
}

function modificarElemento(idElemento,valor){
	$(idElemento).attr('disabled', valor);
}

function guardarJerarquiaHotKey(){
	$(btnGuardar).trigger('click');
}

function salirJerarquiaHotKey(){
	eliminarNodo(obtenerNodoPorId(txtIdDefecto));
}

function limpiarHotKey(){
	$(txtMatricula).val('');
	$(lblNombreApellido).text('');
	$(lblPuesto).text('');
	$(selCargo).val('');
	$(radAusenteNo).prop("checked", true);
	ocultarCampo(divAusente);
	$(selCargo).removeAttr("ejecutado");
	$('option', selCargo).remove();
	limpiarAusente();
}

/**
 * Función generica el cual tiene las acciones de los componentes del formulario.
 * Se ejecutará automáticamente cuando la página esté lista.
 */
$(document).ready(function() {
	ocultarCampo(fldFormulario);
	
	$(imgBuscarMatr).keypress(function (e) {
		if(e.which == 13){
			$(imgBuscarMatr).trigger('click');
	    	e.preventDefault();
		}
	});
	
	//Limpiar busqueda del arbol
	$(txtBuscar).keyup(function (e) {
		if($.trim($(txtBuscar).val()) == ""){
			$(divArbol).jstree("clear_search");
		}
	});
	
	$(txtBuscar).keypress(function (e) {
		ocultarCampo(divError);
		ocultarCampo(divExito);
		if(e.which == 13){
			$(divArbol).jstree("search", $(txtBuscar).val());
	    	e.preventDefault();
	    }		
    });

	
	//Buscar Cargo	  
	$(selCargo).click( function(){
		var strNombre = $(lblNombreApellido).text();
		if(btnGuardarHabilitado == true && strNombre!=''){
			if (($(lblPuesto).attr("idpuesto") != null) && 
					 $(selCargo).attr("ejecutado") == null) {
							
					//Si existe, entonces ya fue ejecutado
					var person = {
						accion : intAccionBuscarCargo,
					    idPuesto : $(lblPuesto).attr("idpuesto"),	
					    fecha : new Date()
					};

					$.ajax({
						async : false,
						url: urlJerarquia,
					    type: 'post',
					    dataType: 'json',
					    success: function (data) {			    	
					    	var strJson = JSON.stringify(data);			    	
					    	var arrJson = JSON.parse(strJson);			    	
							$('option', selCargo).remove();
							
							if (arrJson[0].attr){
								$.each(arrJson[0].attr, function(key, value) {				  
									$(selCargo).append('<option value="'+value.ca+'">'+value.dc+'</option>');
								});
							}					
							$(selCargo).attr('ejecutado', '1');
					     },
					     data: person
					});
				}
		}
	});
	  
	//Crear nodo padre o nodo hijo
    $(btnGuardar).click( function() {
	   if(validarFormulario()){
		   var msg= $(hndMsgConfirmarGuardar).val();
		   if(confirm(msg)) {
				var objNodoNuevo = obtenerNodoPorId(txtIdDefecto);
				var txtIdPadre = 0;
				var txtAccion = intAccionActualizarNodo;//Actualizar por defecto
				modificarElemento("#btnGuardar",true);
				btnGuardarHabilitado = false;
				if(objNodoNuevo != null){ //Si existe
					var txtId = obtenerIdPorNodo(objNodoNuevo, txtTipoIdPadre,"id","_");
				    if($(hndId).val() == txtId ){
				        txtIdPadre = obtenerIdPorNodo(objNodoNuevo, txtTipoIdHijo,"idpadre","_");
					    txtAccion = intAccionNuevoNodo; //Nuevo    
				    }else{
				        $(txtMensajeDeError).text($(hndMsgTerminarNodoCreado).val());
			            mostrarCampo(divError);
			            $(divArbol).jstree("select_node", objNodoNuevo, true);
			            return;
				    }				
				}else{				
					txtIdPadre = obtenerIdPorNodo($(hndId).val(), txtTipoIdPadre,"","_");				
				}
				
				var person = {
					accion : txtAccion,
					id : obtenerIdPorCadena($(hndId).val(),"_","0"),
					txtMatricula : $(txtMatricula).val(),
					selCargo : $(selCargo).val(),
					radAusente : $(radAusente).val(),
					txtFechaIniAusencia : $(txtFechaIniAusencia).val(),
					txtFechaFinAusencia : $(txtFechaFinAusencia).val(),
					txtMatriculaReemplazo : $(txtMatriculaReemplazo).val(),
					radAusente: $('input:radio[name=radAusente]:checked').val(),
					idpadre : txtIdPadre
				};
				
				$.ajax({
					async : false,
					url: urlJerarquia,
				    type: 'post',
				    dataType: 'json',
				    success: function (data) {
				    	var strJson = JSON.stringify(data);
				    	var arrJson = JSON.parse(strJson);	    	 
				    	var idResultado = obtenerAtributo(arrJson);
				    	
				    	if(!esMensajeError(idResultado, "|", true) && !esMensajeErrorLista(arrJson, true)){
					    	 var idFinal = '#' + arrJson[0].attr.id;
					    	 var txtBuscar = "";
					    	 var txtContenedorBusqueda = divArbol;
					    	 
					    	 if(txtAccion == intAccionNuevoNodo){
					    		 idFinal = '#' + txtIdDefecto;				    		 
						    	 txtBuscar = arrJson[0].attr.idpadre == '0' ? 
						    	     $(hndMenuNombrePrimerNivel).val(): $(hndMenuNombreSubNivel).val();
					    	 }else{
					    		 txtContenedorBusqueda = idFinal;				    		
					    	 }
					    	 
					    	 ocultarCampo(btnCancelar);
					    	 reemplazarTextoPorTexto(txtContenedorBusqueda, 'a', txtBuscar, 
					    			 arrJson[0].data,'<ins class="jstree-icon">&nbsp;</ins>');
					    	 
					    	 $(idFinal).attr('ma', arrJson[0].attr.ma);
					    	 $(idFinal).attr('no', arrJson[0].attr.no);
					    	 $(idFinal).attr('pu', arrJson[0].attr.pu);
					    	 $(idFinal).attr('dp', arrJson[0].attr.dp);
					    	 $(idFinal).attr('dc', arrJson[0].attr.dc);
					    	 $(idFinal).attr('ca', arrJson[0].attr.ca);
					    	 $(idFinal).attr('au', arrJson[0].attr.au);
					    	 $(idFinal).attr('ia', arrJson[0].attr.ia);
					    	 $(idFinal).attr('fa', arrJson[0].attr.fa);
					    	 $(idFinal).attr('nor', arrJson[0].attr.nor);
					    	 $(idFinal).attr('pur', arrJson[0].attr.pur);
					    	 $(idFinal).attr('dpr', arrJson[0].attr.dpr);
					    	 $(idFinal).attr('mr', arrJson[0].attr.mr);				    	 
					    	 $(idFinal).attr('id', arrJson[0].attr.id);
					    	 $(hndId).val(arrJson[0].attr.id);			    	
				     	}//else{
				     		//var arrData = [ txtMatricula, selCargo, txtFechaIniAusencia, txtMatriculaReemplazo];
				     		//asignarAtributo(arrData, 'class', 'error_style');
				     	//}
				     },
				     data: person
				 });
		   		}
			}
		});
      
    //Buscar Empleado
    $(txtMatricula).keypress(function (e) {
    	ocultarCampo(divError);
		ocultarCampo(divExito);
		modificarElemento("#btnGuardar",true);
		btnGuardarHabilitado = false;
		$(radAusenteNo).prop("checked", true);
		$(lblNombreApellido).text('');
		$(lblPuesto).text('');
		$('option', selCargo).remove();
		$(selCargo).removeAttr("idpuesto");
		$(selCargo).removeAttr("ejecutado");
		$(selCargo)[0].options.length = 0;
		$(selCargo).find('option').remove().end();
		$(selCargo).empty();
		$(selCargo).html('');	
		limpiarAusente();
		asignarAtributo(selCargo,'class','');    	
		ocultarCampo(divAusente);	
		if(e.which == 13){
			$(imgBuscarMatr).trigger('click');
	    	e.preventDefault();
	    }
    });
    
  //Buscar Empleado
    $(txtMatricula).keyup(function (e) {
    	ocultarCampo(divError);
		ocultarCampo(divExito);
		if(e.which != 13){
			modificarElemento("#btnGuardar",true);	
			btnGuardarHabilitado = false;
			$(radAusenteNo).prop("checked", true);
			$(lblNombreApellido).text('');
			$(lblPuesto).text('');
			$(selCargo).removeAttr("idpue	sto");
			$(selCargo).removeAttr("ejecutado");
			$(selCargo)[0].options.length = 0;
			$(selCargo).find('option').remove().end();
			$(selCargo).empty();
			$(selCargo).html('');	
			limpiarAusente();
			ocultarCampo(divAusente);	
			asignarAtributo(selCargo,'class','');    
			return false;
		}
    });
    
	$(imgBuscarMatr).click( function(){		
		if(validarCampo(txtMatricula,$(hndMsgDetalleMatricula).val())){ //Validar formulario
			
			var person = {
				accion : intAccionBuscarEmpleado,
				txtMatricula : $(txtMatricula).val()
			};
			
			$.ajax({
				async : false,
				url: urlJerarquia,
				type: 'post',
				dataType: 'json',
				success: function (data) {					
					var strJson = JSON.stringify(data);					
					var arrJson = JSON.parse(strJson);
					
					$(lblNombreApellido).text(inicializarCampo(arrJson[0].no));					
					$(lblPuesto).text(inicializarCampo(arrJson[0].dp));
					$('option', selCargo).remove();				
					$(hndIdPuestoNuevo).val(inicializarCampo(arrJson[0].pu));
					$(selCargo).attr('ejecutado', '1');
					
					if (arrJson[0].attr){
						$.each(arrJson[0].attr, function(key, value) {				  
							$(selCargo).append('<option value="'+value.ca+'">'+value.dc+'</option>');
						});
					}
					
					var idResultado = obtenerAtributo(arrJson);				
					if(esMensajeError(idResultado, "|", true)){//entra si tiene error
						$(lblPuesto).attr('idpuesto', "");
					}else{
						$(lblPuesto).attr('idpuesto', inicializarCampo(arrJson[0].pu));
						modificarElemento("#btnGuardar",false);
						btnGuardarHabilitado = true;
					}			
		     },
		     data: person
		 });
		}
	});
	
	//Buscar empleado de reemplazo
	$(txtMatriculaReemplazo).keypress(function (e) {
		modificarElemento("#btnGuardar",true);
		btnGuardarHabilitado = false;
		$(lblNombreApellidoReemplazo).text("");
		$(lblPuestoReemplazo).text("");
		if(e.which == 13){
			$(imgBuscarMatrReemplazo).trigger('click');
	    	e.preventDefault();
	    }		
    });
	
	//Buscar empleado de reemplazo
	$(txtMatriculaReemplazo).keyup(function (e) {
		ocultarCampo(divError);
		ocultarCampo(divExito);
		if(e.which != 13){
			modificarElemento("#btnGuardar",true);	
			btnGuardarHabilitado = false;
			$(lblNombreApellidoReemplazo).text("");
			$(lblPuestoReemplazo).text("");
		}	
    });
	$(imgBuscarMatrReemplazo).click( function(){
		if(validarCampo(txtMatriculaReemplazo, $(hndMsgDetalleMatricula).val())){
			modificarElemento("#btnGuardar",false);
			btnGuardarHabilitado = true;
			var person = {				
				accion : intAccionBuscarEmpleado,
				txtMatricula : $(txtMatriculaReemplazo).val()
			};		
		$.ajax({
			async : false,
			url: urlJerarquia,
		    type: 'post',
		    dataType: 'json',
		    success: function (data) {
		    	var strJson = JSON.stringify(data);		    	 
		    	var arrJson = JSON.parse(strJson);
		    	$(lblNombreApellidoReemplazo).text(inicializarCampo(arrJson[0].no));		    	 
				$(lblPuestoReemplazo).text(inicializarCampo(arrJson[0].dp));
				$(hndIdPuestoNuevoReem).val(inicializarCampo(arrJson[0].pu));
				
				var idResultado = obtenerAtributo(arrJson);		
				if(esMensajeError(idResultado, "|", true)){				
					modificarElemento("#btnGuardar",true);
					btnGuardarHabilitado = false;
				}else{
					modificarElemento("#btnGuardar",false);
					btnGuardarHabilitado = true;	
				}
		     },
		     data: person
		 });
		}
	});
	
	//Eliminar Nodo
	$(btnCancelar).click( function(){
		eliminarNodo(obtenerNodoPorId(txtIdDefecto));
		
	});
});


function validarBuscar(){
	if($(selCargo).val()== null || $(selCargo).val() == ""){
		modificarElemento("#btnGuardar",true);
		btnGuardarHabilitado = false;
		$(radAusenteNo).prop("checked", true);
	}else{
		modificarElemento("#btnGuardar",false);
		btnGuardarHabilitado = true;
	}
}