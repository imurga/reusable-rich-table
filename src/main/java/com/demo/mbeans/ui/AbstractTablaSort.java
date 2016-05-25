package com.demo.mbeans.ui;

import java.text.Collator;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.swing.SortOrder;

public abstract class AbstractTablaSort {

	public static List<DynaBean> doSort(final List<DynaBean> arlDynaList,
			final String strLabel, final SortOrder objSortOrder,
			final int intRowsPerPage) {
		List<DynaBean> arlReturnList = null;

		if (objSortOrder == SortOrder.unsorted
				|| objSortOrder == SortOrder.descending) {
			ComparatorsAscendente.setStrNomAtt(strLabel);
			Collections.sort(arlDynaList, ComparatorsAscendente.SORTASC);
		} else if (objSortOrder == SortOrder.ascending) {
			ComparatorsDescendente.setStrNomAtt(strLabel);
			Collections.sort(arlDynaList, ComparatorsDescendente.SORTDESC);
		}
		arlReturnList = AbstractTablaPagination.doPagination(arlDynaList,
				1, intRowsPerPage);
		return arlReturnList;
	}

	public static List<DynaBean> doSortLong(final List<DynaBean> arlDynaList,
			final String strLabel, final SortOrder objSortOrder,
			final int intRowsPerPage) {
		List<DynaBean> arlReturnList = null;

		if (objSortOrder == SortOrder.unsorted
				|| objSortOrder == SortOrder.descending) {
			Collections.sort(arlDynaList, new Comparator<DynaBean>() {
				public int compare(DynaBean o1, DynaBean o2) {
					return Long.valueOf(String.valueOf(o2.get(strLabel)))
							.compareTo(
									Long.valueOf(String.valueOf(o1
											.get(strLabel))));
				}
			});
		} else if (objSortOrder == SortOrder.ascending) {
			Collections.sort(arlDynaList, new Comparator<DynaBean>() {
				public int compare(DynaBean o1, DynaBean o2) {
					return Long.valueOf(String.valueOf(o1.get(strLabel)))
							.compareTo(
									Long.valueOf(String.valueOf(o2
											.get(strLabel))));
				}
			});
		}
		arlReturnList = AbstractTablaPagination.doPagination(arlDynaList,
				1, intRowsPerPage);
		return arlReturnList;
	}

	public static List<DynaBean> doSortDate(final List<DynaBean> arlDynaList,
			final String dateLabel, final SortOrder objSortOrder,
			final int intRowsPerPage) {
		List<DynaBean> arlReturnList = null;

		if (objSortOrder == SortOrder.unsorted
				|| objSortOrder == SortOrder.descending) {
			ComparatorsAscendenteDate.setDateNomAtt(dateLabel);
			Collections.sort(arlDynaList, ComparatorsAscendenteDate.SORTASC);
		} else if (objSortOrder == SortOrder.ascending) {
			ComparatorsDescendenteDate.setDateNomAtt(dateLabel);
			Collections.sort(arlDynaList, ComparatorsDescendenteDate.SORTDESC);
		}
		arlReturnList = AbstractTablaPagination.doPagination(arlDynaList,
				1, intRowsPerPage);
		return arlReturnList;
	}

	public static class ComparatorsAscendente {

		private static String STRNOMATT;
		public static final Comparator<DynaBean> SORTASC = new Comparator<DynaBean>() {
			public int compare(final DynaBean objDyna1, final DynaBean objDyna2) {
				final Collator esCollator = Collator.getInstance(new Locale(
						"es"));
				return esCollator.compare(
						String.valueOf(objDyna1.get(STRNOMATT)).toUpperCase(),
						String.valueOf(objDyna2.get(STRNOMATT)).toUpperCase()) < 0 ? -1
						: esCollator.equals(
								String.valueOf(objDyna1.get(STRNOMATT))
										.toUpperCase(),
								String.valueOf(objDyna2.get(STRNOMATT))
										.toUpperCase()) ? 0 : 1;
			}
		};
	}

	public static class ComparatorsDescendente {

		private static String STRNOMATT;

		public static final Comparator<DynaBean> SORTDESC = new Comparator<DynaBean>() {
			public int compare(final DynaBean objDyna1, final DynaBean objDyna2) {
				final Collator esCollator = Collator.getInstance(new Locale(
						"es"));
				return esCollator.compare(
						String.valueOf(objDyna1.get(STRNOMATT)).toUpperCase(),
						String.valueOf(objDyna2.get(STRNOMATT)).toUpperCase()) < 0 ? 1
						: esCollator.equals(
								String.valueOf(objDyna1.get(STRNOMATT))
										.toUpperCase(),
								String.valueOf(objDyna2.get(STRNOMATT))
										.toUpperCase()) ? 0 : -1;
			}
		};

	}

	public static class ComparatorsAscendenteDate {

		private static String DATENOMATT;

		public static final Comparator<DynaBean> SORTASC = new Comparator<DynaBean>() {
			public int compare(final DynaBean objDyna1, final DynaBean objDyna2) {
				SimpleDateFormat dateFormat = new SimpleDateFormat("FORMAT");
				Date convertedDate1 = new Date();
				Date convertedDate2 = new Date();
				try {
					convertedDate1 = dateFormat.parse(String.valueOf(objDyna1
							.get(DATENOMATT)));
					convertedDate2 = dateFormat.parse(String.valueOf(objDyna2
							.get(DATENOMATT)));
				} catch (ParseException e) {
					System.out.println(e);
				}
				return (convertedDate1).compareTo(convertedDate2);
			}
		};
	}

	public static class ComparatorsDescendenteDate {
		private static String DATENOMATT;

		public static final Comparator<DynaBean> SORTDESC = new Comparator<DynaBean>() {
			public int compare(final DynaBean objDyna1, final DynaBean objDyna2) {
				SimpleDateFormat dateFormat = new SimpleDateFormat("FORMAT");
				Date convertedDate1 = new Date();
				Date convertedDate2 = new Date();
				try {
					convertedDate1 = dateFormat.parse(String.valueOf(objDyna1
							.get(DATENOMATT)));
					convertedDate2 = dateFormat.parse(String.valueOf(objDyna2
							.get(DATENOMATT)));
				} catch (ParseException e) {
					System.out.println(e);
				}
				return (convertedDate2).compareTo(convertedDate1);
			}
		};
	}
}
