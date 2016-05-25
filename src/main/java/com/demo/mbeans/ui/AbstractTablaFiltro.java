package com.demo.mbeans.ui;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.DynaBean;

public abstract class AbstractTablaFiltro {

	public static List<DynaBean> doFiltro(final List<DynaBean> arlDynaList,
			final String strLabel, final String strFiltroValor) {
		final List<DynaBean> arlReturnList = new ArrayList<DynaBean>();
		for (DynaBean objBean : arlDynaList) {
			if (String.valueOf(objBean.get(strLabel)).toUpperCase()
					.trim().contains(strFiltroValor.trim().toUpperCase())) {
				arlReturnList.add(objBean);
			}
		}
		return arlReturnList;
	}
}
