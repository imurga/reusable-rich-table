package com.demo.mbeans.ui;

import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

import javax.el.ELContext;
import javax.el.MethodExpression;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;
import javax.faces.event.MethodExpressionActionListener;

import org.apache.commons.beanutils.DynaBean;
import org.richfaces.component.SortOrder;
import org.richfaces.component.UICommandLink;
import org.richfaces.function.RichFunction;

@SessionScoped
@ManagedBean(name = "richFacesCompMBean")
public class RichFacesCompMBean implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8628922673194239592L;

	private String strRowId = "RowId";
	private String strDescending = "descending";
	private int tabNum = 2;

	private String[] strSortCol = new String[tabNum];
	private SortOrder[] objSortType = new SortOrder[tabNum];
	private String[] strPrevSortCol = new String[tabNum];
	private Long[] intPageNumber = new Long[tabNum];
	private List<List<DynaBean>> arlDynaBean;
	private List<List<DynaBean>> arlTablaListHist;
	private List<List<DynaBean>> arlTablaList;
	private List<List<DynaBean>> arlTablaListChkBx;
	private Boolean[] renderSigiente = new Boolean[tabNum];
	private Boolean[] renderUltimo = new Boolean[tabNum];
	private Boolean[] renderPrevio = new Boolean[tabNum];
	private Boolean[] renderPrimero = new Boolean[tabNum];
	private Boolean[] disableFirst = new Boolean[tabNum];
	private Boolean[] disableSecond = new Boolean[tabNum];
	private Boolean[] disableThird = new Boolean[tabNum];
	private Boolean[] renderFirst = new Boolean[tabNum];
	private Boolean[] renderSecond = new Boolean[tabNum];
	private Boolean[] renderThird = new Boolean[tabNum];
	private Boolean[][] blnChkBoxChld;
	private Long[] valueFirst = new Long[tabNum];
	private Long[] valueSecond = new Long[tabNum];
	private Long[] valueThird = new Long[tabNum];
	private Boolean[] blnChkBoxMain = new Boolean[tabNum];
	private Integer[] intCurrentPage = new Integer[tabNum];
	private Long[] totalPages = new Long[tabNum];
	private String[] strSortType = new String[tabNum];
	private Boolean[] maxRecord = new Boolean[tabNum];
	private String[] noPages = { "0", "0" };
	private List<String> columnaList;
	private String codigo;
	private long firstPage = 1;
	private boolean changeResult = false;
	private int nroRegistros = 20;

	public void inicialiarCheckBox(int index) {
		blnChkBoxChld = new Boolean[tabNum][arlTablaListHist.get(index).size()];
		Arrays.fill(blnChkBoxChld[index], Boolean.FALSE);
	}

	public void limpiarHeader(int index) {
		blnChkBoxMain[index] = false;
	}

	public void doSort(final String strIndex, final int rowNumber) {
		if (!TextUtil.esNulo(arlTablaListHist)) {
			final int intIndex = Integer.parseInt(strIndex);
			String[] valorSort = strSortCol[intIndex].split("_");
			strSortCol[intIndex] = valorSort[0];
			if (strPrevSortCol[intIndex] == null
					|| !strPrevSortCol[intIndex].equals(strSortCol[intIndex])) {
				objSortType[intIndex] = SortOrder.unsorted;
			}
			doSortRows(valorSort, intIndex, rowNumber);

			if (objSortType[intIndex] == SortOrder.unsorted) {
				objSortType[intIndex] = SortOrder.ascending;
				strSortType[intIndex] = strDescending;
			} else if (objSortType[intIndex] == SortOrder.descending) {
				objSortType[intIndex] = SortOrder.ascending;
				strSortType[intIndex] = strDescending;
			} else if (objSortType[intIndex] == SortOrder.ascending) {
				objSortType[intIndex] = SortOrder.descending;
				strSortType[intIndex] = "ascending";
			}
			strPrevSortCol[intIndex] = strSortCol[intIndex];
			doPagination(1, String.valueOf(intIndex), rowNumber);
		}
	}

	private void doSortRows(final String[] valorSort, final int intIndex,
			final int rowNumber) {
		if (valorSort.length > 1 && ("DATE_COLUMN".equals(valorSort[1]))) {
			arlTablaList.set(intIndex, AbstractTablaSort.doSortDate(
					arlTablaListHist.get(intIndex), strSortCol[intIndex],
					objSortType[intIndex], rowNumber));
		} else if ("FIELD_COLUMN".equals(valorSort[1])) {
			arlTablaList.set(intIndex, AbstractTablaSort.doSortLong(
					arlTablaListHist.get(intIndex), strSortCol[intIndex],
					objSortType[intIndex], rowNumber));
		} else {
			arlTablaList.set(intIndex, AbstractTablaSort.doSort(
					arlTablaListHist.get(intIndex), strSortCol[intIndex],
					objSortType[intIndex], rowNumber));
		}
	}

	public void doPagination(final long intPageNum, final String strIndex,
			final int rowNumber) {
		final int intIndex = Integer.parseInt(strIndex);
		intPageNumber[intIndex] = intPageNum;
		int intTotalPages = 0;
		if (arlTablaListHist.get(intIndex).size() % rowNumber == 0) {
			intTotalPages = arlTablaListHist.get(intIndex).size() / rowNumber;
		} else {
			intTotalPages = (arlTablaListHist.get(intIndex).size() / rowNumber) + 1;
		}
		noPages[intIndex] = String.valueOf(intTotalPages);
		totalPages[intIndex] = (long) intTotalPages;
		setScroler(intTotalPages, (int) (long) intPageNum, intIndex);
		final List<List<DynaBean>> arlDynaTempLst = getArlTablaList();
		arlDynaTempLst.set(intIndex, AbstractTablaPagination.doPagination(
				arlTablaListHist.get(intIndex), (int) (long) intPageNum,
				rowNumber));
	}

	public void doRowDblClk(final int intRowId, final String strMethod,
			final String strClassNombre, final String strIndex) {
		final int intIndex = Integer.parseInt(strIndex);
		callMethod(arlTablaList.get(intIndex).get(intRowId), strMethod,
				strClassNombre);
	}

	private void callMethod(final DynaBean objDynaBean, final String strMethod,
			final String strManageBean) throws ExcepcionAplicacion {
		try {
			final ELContext objElContext = FacesContext.getCurrentInstance()
					.getELContext();
			final Object managedBeanObject = FacesContext.getCurrentInstance()
					.getApplication().getELResolver()
					.getValue(objElContext, null, strManageBean);
			Class<?>[] objParam = new Class[1];
			objParam[0] = DynaBean.class;
			final Method method = managedBeanObject.getClass()
					.getDeclaredMethod(strMethod, objParam);
			method.invoke(managedBeanObject, objDynaBean);

		} catch (Exception excepIllegalAccess) {
			System.out.println(excepIllegalAccess);
		}
	}

	private void setScroler(final int intTotal, final int intCurrent,
			final int intIndex) {
		if (intTotal <= 1) {
			renderFirst[intIndex] = false;
			renderSecond[intIndex] = false;
			renderThird[intIndex] = false;
			renderPrevio[intIndex] = false;
			renderSigiente[intIndex] = false;
			renderUltimo[intIndex] = false;
			renderPrimero[intIndex] = false;
		} else if (intTotal == 2) {
			renderFirst[intIndex] = true;
			renderSecond[intIndex] = true;
			renderThird[intIndex] = false;
			valueFirst[intIndex] = (long) 1;
			valueSecond[intIndex] = (long) 2;
			if (intCurrent == 1) {
				renderPrevio[intIndex] = false;
				disableFirst[intIndex] = true;
				disableSecond[intIndex] = false;
				renderSigiente[intIndex] = true;
				renderUltimo[intIndex] = true;
				renderPrimero[intIndex] = false;
			} else if (intCurrent == 2) {
				renderPrevio[intIndex] = true;
				disableFirst[intIndex] = false;
				disableSecond[intIndex] = true;
				renderSigiente[intIndex] = false;
				renderUltimo[intIndex] = false;
				renderPrimero[intIndex] = true;
			}
		} else if (intTotal >= 3) {
			renderFirst[intIndex] = true;
			renderSecond[intIndex] = true;
			renderThird[intIndex] = true;
			if (intCurrent == 1) {
				renderPrevio[intIndex] = false;
				renderSigiente[intIndex] = true;
				renderPrimero[intIndex] = false;
				renderUltimo[intIndex] = true;
				valueFirst[intIndex] = (long) 1;
				valueSecond[intIndex] = (long) 2;
				valueThird[intIndex] = (long) 3;
				disableFirst[intIndex] = true;
				disableSecond[intIndex] = false;
				disableThird[intIndex] = false;
			} else if (intCurrent == intTotal) {
				renderPrevio[intIndex] = true;
				renderSigiente[intIndex] = false;
				renderPrimero[intIndex] = true;
				renderUltimo[intIndex] = false;
				valueFirst[intIndex] = (long) intTotal - 2;
				valueSecond[intIndex] = (long) intTotal - 1;
				valueThird[intIndex] = (long) intTotal;
				disableFirst[intIndex] = false;
				disableSecond[intIndex] = false;
				disableThird[intIndex] = true;
			} else {
				renderPrevio[intIndex] = true;
				renderSigiente[intIndex] = true;
				renderPrimero[intIndex] = true;
				renderUltimo[intIndex] = true;
				valueFirst[intIndex] = (long) intCurrent - 1;
				valueSecond[intIndex] = (long) intCurrent;
				valueThird[intIndex] = (long) intCurrent + 1;
				disableFirst[intIndex] = false;
				disableSecond[intIndex] = true;
				disableThird[intIndex] = false;
			}
		}
		intCurrentPage[intIndex] = intIndex;
	}

	public void doFiltro(final List<TablaPOJO> arlCmpNombre,
			final String strIndex, final int rowNumber) {
		if (!TextUtil.esNulo(arlTablaListHist)) {
			final int intIndex = Integer.parseInt(strIndex);
			final Map<String, Object> hshColFilMap = new HashMap<String, Object>();
			int intFlag = 0;
			for (TablaPOJO objCampo : arlCmpNombre) {
				if (!(objCampo.getStrCampoValor() == null)
						&& !("").equals(objCampo.getStrCampoValor())) {
					hshColFilMap.put(objCampo.getStrCampoNombre(),
							objCampo.getStrCampoValor());
				}
			}
			final Iterator<Entry<String, Object>> objIterator = hshColFilMap
					.entrySet().iterator();
			while (objIterator.hasNext()) {
				final Map.Entry<String, Object> objPair = (Map.Entry<String, Object>) objIterator
						.next();
				if (intFlag == 0) {
					arlTablaList.set(intIndex, AbstractTablaFiltro.doFiltro(
							arlDynaBean.get(intIndex), objPair.getKey(),
							(String) objPair.getValue()));
					intFlag = 1;
				} else {
					arlTablaList.set(
							intIndex,
							AbstractTablaFiltro.doFiltro(
									arlTablaList.get(intIndex),
									objPair.getKey(),
									(String) objPair.getValue()));
				}
				objIterator.remove();
			}
			if (intFlag == 0) {
				arlTablaList.set(intIndex, AbstractTablaFiltro.doFiltro(
						arlDynaBean.get(intIndex), arlCmpNombre.get(0)
								.getStrCampoNombre(), (String) arlCmpNombre
								.get(0).getStrCampoValor()));
			}
			arlTablaListHist.set(intIndex, arlTablaList.get(intIndex));
			doPagination(1, String.valueOf(intIndex), rowNumber);
			setChangeResult(true);
		}
	}

	public UICommandLink createCommandLink(final String strAction,
			final String strRender) {
		final FacesContext objContexto = FacesContext.getCurrentInstance();
		final UICommandLink objCommandLink = (UICommandLink) objContexto
				.getApplication().createComponent(objContexto,
						UICommandLink.COMPONENT_TYPE, Constants.COMMAND_LINK);
		objCommandLink.setId("link_" + UUID.randomUUID());
		objCommandLink.setRender(strRender);
		objCommandLink.setExecute("@all");
		final MethodExpression objExpression = objContexto
				.getApplication()
				.getExpressionFactory()
				.createMethodExpression(objContexto.getELContext(), strAction,
						null, new Class[] { String.class });
		objCommandLink.addActionListener(new MethodExpressionActionListener(
				objExpression));
		return objCommandLink;
	}

	private void validarCheckBox(int indice) {
		List<DynaBean> dynaBeanCheck = new ArrayList<DynaBean>();
		for (DynaBean dynaBean : arlTablaListHist.get(indice)) {
			if (1 == Integer.parseInt(dynaBean.get("chbxEnable").toString())) {
				dynaBeanCheck.add(dynaBean);
			}
		}
		arlTablaListChkBx.set(indice, dynaBeanCheck);
		Arrays.fill(blnChkBoxChld[indice], Boolean.TRUE);
	}

	public void limpiarCheck(int indice) {
		for (DynaBean dynaBean : arlTablaListHist.get(indice)) {
			blnChkBoxChld[indice][Integer.valueOf(dynaBean.get(strRowId)
					.toString())] = false;
		}
	}

	public void selectAllCheckBox(final String strIndex,
			final boolean blnParVal, final List<TablaPOJO> objList,
			final String strMethod, final String strClassNombre)
			throws ExcepcionAplicacion {
		final int intIndex = Integer.parseInt(strIndex);
		if (!TextUtil.esNulo(arlTablaListHist)) {
			setArlTablaListChkBx(null);
			getArlTablaListChkBx();
			for (TablaPOJO objBean : objList) {
				if (blnParVal) {
					objBean.setBlnChkBoxVal(true);
					arlTablaListChkBx.set(intIndex,
							arlTablaListHist.get(intIndex));
				} else {
					objBean.setBlnChkBoxVal(false);
					arlTablaListChkBx.set(intIndex, new ArrayList<DynaBean>());
					Arrays.fill(blnChkBoxChld[intIndex], Boolean.FALSE);
				}
			}
			if (blnParVal) {
				validarCheckBox(intIndex);
			}
			if (!"none".equals(strMethod)) {
				callMethod(null, strMethod, strClassNombre);
			}
		} else {
			blnChkBoxMain[intIndex] = false;
		}

	}

	public void selectOneCheckBox(final String strIndex,
			final DynaBean objDynaBean, final String strMethod,
			final String strClassNombre) throws ExcepcionAplicacion {
		getArlTablaListChkBx();
		boolean agregarItem = false;
		final int intIndex = Integer.parseInt(strIndex);
		final List<DynaBean> arlTempDyna = arlTablaListChkBx.get(intIndex);
		if (arlTempDyna.contains(objDynaBean)) {
			arlTempDyna.remove(objDynaBean);
			blnChkBoxMain[intIndex] = false;
		} else {
			arlTempDyna.add(objDynaBean);
			agregarItem = true;
		}
		arlTablaListChkBx.set(intIndex, arlTempDyna);
		setCheckBoxValores(intIndex, objDynaBean, agregarItem);
		if (!"none".equals(strMethod)) {
			callMethod(null, strMethod, strClassNombre);
		}
	}

	private void setCheckBoxValores(final int index,
			final DynaBean objDynaBean, final boolean agregarItem) {
		int temp = Integer.parseInt(String.valueOf(objDynaBean.get(strRowId)));
		for (DynaBean dynaBean : arlTablaListHist.get(index)) {
			if (dynaBean.get(strRowId).equals(temp)) {
				if (agregarItem) {
					blnChkBoxChld[index][Integer.valueOf(dynaBean.get(strRowId)
							.toString())] = true;
				} else {
					blnChkBoxChld[index][Integer.valueOf(dynaBean.get(strRowId)
							.toString())] = false;
				}
				break;
			}
		}
		if (agregarItem
				&& arlTablaListChkBx.get(index).size() == arlDynaBean
						.get(index).size()) {
			blnChkBoxMain[index] = true;
		}
	}

	public String openPopUp(final String strId) {
		String nombrePopUp = "";
		if (!"".equals(strId)) {
			nombrePopUp = RichFunction.component(strId) + ".show()" + ";";
		}
		return nombrePopUp;
	}

	public String crearToolTip(final String texto, final int lengthTt) {
		StringBuilder textoToolTip = new StringBuilder();
		if (texto != null) {
			textoToolTip = new StringBuilder(texto);
			if (texto.length() > lengthTt) {
				textoToolTip = new StringBuilder(texto.substring(0,
						lengthTt - 5)).append(Constants.PUNTOS);
			}
		}
		return textoToolTip.toString();
	}

	public String[] getStrSortCol() {
		return strSortCol;
	}

	public void setStrSortCol(final String[] strSortCol) {
		this.strSortCol = strSortCol;
	}

	public SortOrder[] getObjSortType() {
		return objSortType;
	}

	public void setObjSortType(final SortOrder[] objSortType) {
		this.objSortType = objSortType;
	}

	public String[] getStrPrevSortCol() {
		return strPrevSortCol;
	}

	public void setStrPrevSortCol(final String[] strPrevSortCol) {
		this.strPrevSortCol = strPrevSortCol;
	}

	public Long[] getIntPageNumber() {
		return intPageNumber;
	}

	public void setIntPageNumber(final Long[] intPageNumber) {
		this.intPageNumber = intPageNumber;
	}

	public List<List<DynaBean>> getArlDynaBean() {
		if (arlDynaBean == null) {
			arlDynaBean = new ArrayList<List<DynaBean>>();
			arlDynaBean.add(new ArrayList<DynaBean>());
			arlDynaBean.add(new ArrayList<DynaBean>());
		}
		return arlDynaBean;
	}

	public void setArlDynaBean(final List<List<DynaBean>> arlDynaBean) {
		this.arlDynaBean = arlDynaBean;
	}

	public List<List<DynaBean>> getArlTablaListHist() {
		if (arlTablaListHist == null) {
			arlTablaListHist = new ArrayList<List<DynaBean>>();
			arlTablaListHist.add(new ArrayList<DynaBean>());
			arlTablaListHist.add(new ArrayList<DynaBean>());
		}
		return arlTablaListHist;
	}

	public void setArlTablaListHist(final List<List<DynaBean>> arlTablaListHist) {
		this.arlTablaListHist = arlTablaListHist;
	}

	public List<List<DynaBean>> getArlTablaList() {
		if (arlTablaList == null) {
			arlTablaList = new ArrayList<List<DynaBean>>();
			arlTablaList.add(new ArrayList<DynaBean>());
			arlTablaList.add(new ArrayList<DynaBean>());
		}
		return arlTablaList;
	}

	public void setArlTablaList(final List<List<DynaBean>> arlTablaList) {
		this.arlTablaList = arlTablaList;
	}

	public Boolean[] getRenderSigiente() {
		return renderSigiente;
	}

	public void setRenderSigiente(final Boolean[] renderSigiente) {
		this.renderSigiente = renderSigiente;
	}

	public Boolean[] getRenderPrevio() {
		return renderPrevio;
	}

	public void setRenderPrevio(final Boolean[] renderPrevio) {
		this.renderPrevio = renderPrevio;
	}

	public Boolean[] getDisableFirst() {
		return disableFirst;
	}

	public void setDisableFirst(final Boolean[] disableFirst) {
		this.disableFirst = disableFirst;
	}

	public Boolean[] getDisableSecond() {
		return disableSecond;
	}

	public void setDisableSecond(final Boolean[] disableSecond) {
		this.disableSecond = disableSecond;
	}

	public Boolean[] getDisableThird() {
		return disableThird;
	}

	public void setDisableThird(final Boolean[] disableThird) {
		this.disableThird = disableThird;
	}

	public Boolean[] getRenderFirst() {
		return renderFirst;
	}

	public void setRenderFirst(final Boolean[] renderFirst) {
		this.renderFirst = renderFirst;
	}

	public Boolean[] getRenderSecond() {
		return renderSecond;
	}

	public void setRenderSecond(final Boolean[] renderSecond) {
		this.renderSecond = renderSecond;
	}

	public Boolean[] getRenderThird() {
		return renderThird;
	}

	public void setRenderThird(final Boolean[] renderThird) {
		this.renderThird = renderThird;
	}

	public Long[] getValueFirst() {
		return valueFirst;
	}

	public void setValueFirst(final Long[] valueFirst) {
		this.valueFirst = valueFirst;
	}

	public Long[] getValueSecond() {
		return valueSecond;
	}

	public void setValueSecond(final Long[] valueSecond) {
		this.valueSecond = valueSecond;
	}

	public Long[] getValueThird() {
		return valueThird;
	}

	public void setValueThird(final Long[] valueThird) {
		this.valueThird = valueThird;
	}

	public Boolean[] getBlnChkBoxMain() {
		return blnChkBoxMain;
	}

	public void setBlnChkBoxMain(final Boolean[] blnChkBoxMain) {
		this.blnChkBoxMain = blnChkBoxMain;
	}

	public Integer[] getIntCurrentPage() {
		return intCurrentPage;
	}

	public void setIntCurrentPage(final Integer[] intCurrentPage) {
		this.intCurrentPage = intCurrentPage;
	}

	public List<List<DynaBean>> getArlTablaListChkBx() {
		if (arlTablaListChkBx == null) {
			arlTablaListChkBx = new ArrayList<List<DynaBean>>();
			arlTablaListChkBx.add(new ArrayList<DynaBean>());
			arlTablaListChkBx.add(new ArrayList<DynaBean>());
		}
		return arlTablaListChkBx;
	}

	public void setArlTablaListChkBx(
			final List<List<DynaBean>> arlTablaListChkBx) {
		this.arlTablaListChkBx = arlTablaListChkBx;
	}

	public String[] getStrSortType() {
		return strSortType;
	}

	public void setStrSortType(final String[] strSortType) {
		this.strSortType = strSortType;
	}

	public Boolean[] getMaxRecord() {
		return maxRecord;
	}

	public void setMaxRecord(final Boolean[] maxRecord) {
		this.maxRecord = maxRecord;
	}

	public int getNroRegistros() {
		return nroRegistros;
	}

	public void setNroRegistros(final int nroRegistros) {
		this.nroRegistros = nroRegistros;
	}

	public String[] getNoPages() {
		return noPages;
	}

	public void setNoPages(final String[] noPages) {
		this.noPages = noPages;
	}

	public boolean isChangeResult() {
		return changeResult;
	}

	public void setChangeResult(final boolean changeResult) {
		this.changeResult = changeResult;
	}

	public List<String> getColumnaList() {
		return columnaList;
	}

	public void setColumnaList(final List<String> columnaList) {
		this.columnaList = columnaList;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(final String codigo) {
		this.codigo = codigo;
	}

	public Boolean[][] getBlnChkBoxChld() {
		return blnChkBoxChld;
	}

	public void setBlnChkBoxChld(Boolean[][] blnChkBoxChld) {
		this.blnChkBoxChld = blnChkBoxChld;
	}

	public Boolean[] getRenderUltimo() {
		return renderUltimo;
	}

	public void setRenderUltimo(Boolean[] renderUltimo) {
		this.renderUltimo = renderUltimo;
	}

	public Boolean[] getRenderPrimero() {
		return renderPrimero;
	}

	public void setRenderPrimero(Boolean[] renderPrimero) {
		this.renderPrimero = renderPrimero;
	}

	public long getFirstPage() {
		return firstPage;
	}

	public void setFirstPage(long firstPage) {
		this.firstPage = firstPage;
	}

	public Long[] getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(Long[] totalPages) {
		this.totalPages = totalPages;
	}
}
