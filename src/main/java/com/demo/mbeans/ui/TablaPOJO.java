package com.demo.mbeans.ui;

import java.io.Serializable;

import org.richfaces.component.UICommandLink;

public class TablaPOJO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5087361918798527377L;
	private String strCampoNombre;
	private String strCampoValor;
	private String strCampoTipo;
	private UICommandLink objCommandLink;
	private String strIdPopUp;
	private boolean blnChkBoxVal;
	private String strCampoToolTip;

	public String getStrCampoValor() {
		return strCampoValor;
	}

	public void setStrCampoValor(final String strCampoValor) {
		this.strCampoValor = strCampoValor;
	}

	public String getStrCampoNombre() {
		return strCampoNombre;
	}

	public void setStrCampoNombre(final String strCampoNombre) {
		this.strCampoNombre = strCampoNombre;
	}

	public String getStrCampoTipo() {
		return strCampoTipo;
	}

	public void setStrCampoTipo(final String strCampoTipo) {
		this.strCampoTipo = strCampoTipo;
	}

	public UICommandLink getObjCommandLink() {
		return objCommandLink;
	}

	public void setObjCommandLink(final UICommandLink objCommandLink) {
		this.objCommandLink = objCommandLink;
	}

	public String getStrIdPopUp() {
		return strIdPopUp;
	}

	public void setStrIdPopUp(final String strIdPopUp) {
		this.strIdPopUp = strIdPopUp;
	}

	public boolean isBlnChkBoxVal() {
		return blnChkBoxVal;
	}

	public void setBlnChkBoxVal(final boolean blnChkBoxVal) {
		this.blnChkBoxVal = blnChkBoxVal;
	}

	public String getStrCampoToolTip() {
		return strCampoToolTip;
	}

	public void setStrCampoToolTip(final String strCampoToolTip) {
		this.strCampoToolTip = strCampoToolTip;
	}
}