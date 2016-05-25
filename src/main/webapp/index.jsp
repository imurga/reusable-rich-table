
<%@page import="pe.com.bcp.acma.common.constant.Constants"%>
<%@ page contentType="text/html;charset=windows-1252"%>

<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=windows-1252"/>
    <meta http-equiv="X-UA-Compatible" content="IE=100"/>
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
    <title>index</title>
  </head>
  <body onload="abrirVentana();">
<% 
   request.getSession().setAttribute(Constants.ID_USUARIO_SESION,request.getParameter(Constants.CAMPO_USUARIO));
	request.getSession().setAttribute(Constants.KEY_IP,request.getRemoteAddr());
	request.getSession().setAttribute(Constants.KEY_NOMBPAG, new StringBuffer(Constants.SESSION_PAGE));
	request.getSession().setAttribute(Constants.KEY_NUMPAG,0);
	request.getSession().setAttribute(Constants.KEY_OPERAC,new StringBuffer(Constants.OPE_LOGIN));
	request.getSession().setAttribute("sessionId", session.getId());
	request.getSession().setAttribute(Constants.KEY_NOMAPP, "Administrador-Web");
	request.getSession().setAttribute(Constants.APP_NOMBRE,"Administrador-Web");	
 %>
	<script type="text/javascript">		 	
           function abrirVentana()
           {
				//SYSTEST------------------------
            	  //window.location.href='LoginServlet';
				//-------------------------------
           }

    </script> 
    
    <%response.sendRedirect("main.xhtml");%> 
  </body>
</html>