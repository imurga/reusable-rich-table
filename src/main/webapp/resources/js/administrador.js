/**
 * resources/js/administrador.js
 *
 * 21-05-2013
 *
 * Copyright Banco de Cr�dito del Per�
 * 
 * @author Jose Torres
 * 
 * Este script permite realizar las acciones basicas dentro del navegador
 */

/**
 * Asigna un valor a la sesi�n de la p�gina
 * @param newValue Nuevo valor
 */
function setHiddenValueSession(newValue) {
	document.getElementById('frm:sessionPage').value = newValue;
}

/**
 * Pone valor en blanco al texto de fin de ausencia
 * @param event
 */
function clear(event) {
	var txtFechaFinAusencia = "div[id*='mensaje_body']";
	$(txtFechaFinAusencia).text("");
}

