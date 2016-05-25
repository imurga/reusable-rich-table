
package com.demo.mbeans;

import java.io.Serializable;

import com.demo.mbeans.ui.RichFacesCompMBean;


@ManagedBean(name = "somebean")
@SessionScoped
public class SomeMBean implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	protected RichFacesCompMBean componenteTabla;

	public SomeMBean() {
		super();
		 final ELContext objElContext = FacesContext.getCurrentInstance().getELContext();
		 this.componenteTabla = FacesContext.getCurrentInstance().getApplication().getELResolver()
				.getValue(objElContext, null, "somebean");
	}

	public void somemethod(final DynaBean bean) {
		//some code
	}

}