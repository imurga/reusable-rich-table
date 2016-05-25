package com.demo.mbeans.ui;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.DynaBean;

public abstract class AbstractTablaPagination {

	public static List<DynaBean> doPagination(final List<DynaBean> arlDynaList,
			final int intPaginaNum, final int intTotalPages) {
		final List<DynaBean> arlReturnList = new ArrayList<DynaBean>();
		int intStart = (intPaginaNum - 1) * intTotalPages;
		int intEnd = intPaginaNum * intTotalPages;
		if (arlDynaList.size() < intEnd) {
			intEnd = arlDynaList.size();
		}

		for (; intStart < intEnd; intStart++) {
			arlReturnList.add(arlDynaList.get(intStart));
		}
		return arlReturnList;
	}
}
