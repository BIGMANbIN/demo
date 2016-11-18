//package com.example.security.service.impl;
//
//import org.springframework.security.core.Authentication;
//import org.springframework.security.web.WebAttributes;
//import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
//import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
//import org.springframework.security.web.savedrequest.RequestCache;
//import org.springframework.security.web.savedrequest.SavedRequest;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpSession;
//import java.io.IOException;
//
//public class AuthenticationSuccessHandlerImpl implements AuthenticationSuccessHandler {
//
//	private RequestCache requestCache = new HttpSessionRequestCache();
//
//	@Override
//	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//		SavedRequest savedRequest = requestCache.getRequest(request, response);
//
//		if (savedRequest == null) {
//			response.sendRedirect("http://" + request.getServerName() + ":" + request.getServerPort()+"/admin/index");
//		} else {
//			requestCache.removeRequest(request, response);
//			response.sendRedirect(savedRequest.getRedirectUrl());
//		}
//		clearAuthenticationAttributes(request);
//	}
//
//	protected final void clearAuthenticationAttributes(HttpServletRequest request) {
//		HttpSession session = request.getSession(false);
//
//		if (session == null) {
//			return;
//		}
//
//		session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
//	}
//
//}