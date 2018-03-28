package com.desafio.config;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.Filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties;
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoTokenServices;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter;
import org.springframework.security.oauth2.client.filter.OAuth2ClientContextFilter;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.filter.CompositeFilter;

@Configurable
@EnableWebSecurity
@EnableOAuth2Client
public class OAuthSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	OAuth2ClientContext oauth2ClientContext;
	@Autowired
	AuthorizationCodeResourceDetails authorizationCodeResourceDetails;
	@Autowired
	ResourceServerProperties resourceServerProperties;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		super.configure(auth);
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		super.configure(web);
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.antMatcher("/**")
		.addFilterBefore(ssoFilter(), BasicAuthenticationFilter.class)
		.authorizeRequests()
			.antMatchers("/", "/connect**", "/webjars/**")
			.permitAll()
		.anyRequest()
			.authenticated()
		.and()
			.logout()
		    .logoutSuccessUrl("/").permitAll().and().csrf()
		 .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
	}
	
	private Filter ssoFilter() {
		CompositeFilter filter = new CompositeFilter();
		List<Filter> filters = new ArrayList<>();
		
		OAuth2ClientAuthenticationProcessingFilter googleFilter = new OAuth2ClientAuthenticationProcessingFilter(
				"/connect/google");
		OAuth2RestTemplate googleTemplate = new OAuth2RestTemplate(google(), oauth2ClientContext);
		googleFilter.setRestTemplate(googleTemplate);
		UserInfoTokenServices tokenServices = new UserInfoTokenServices(googleResource().getUserInfoUri(), google().getClientId());
		tokenServices.setRestTemplate(googleTemplate);
		googleFilter.setTokenServices(tokenServices);
		
		filters.add(googleFilter);

		filter.setFilters(filters);

		return filter;
	}
	
	@Bean
	public FilterRegistrationBean oauth2ClientFilterRegistration(OAuth2ClientContextFilter filter) {
		FilterRegistrationBean registration = new FilterRegistrationBean();
		registration.setFilter(filter);
		registration.setOrder(-100);
		return registration;
	}
	
	@Bean
	@ConfigurationProperties("google.client")
	public AuthorizationCodeResourceDetails google() {
		return new AuthorizationCodeResourceDetails();
	}
	
	@Bean
	@ConfigurationProperties("google.resource")
	public ResourceServerProperties googleResource() {
		return new ResourceServerProperties();
	}

	private OAuth2ClientAuthenticationProcessingFilter filter() {
		OAuth2ClientAuthenticationProcessingFilter oAuth2Filter = new OAuth2ClientAuthenticationProcessingFilter("/google/login");

		OAuth2RestTemplate oAuth2RestTemplate = new OAuth2RestTemplate(authorizationCodeResourceDetails, oauth2ClientContext);
		oAuth2Filter.setRestTemplate(oAuth2RestTemplate);

		oAuth2Filter.setTokenServices(new UserInfoTokenServices(resourceServerProperties.getUserInfoUri(), resourceServerProperties.getClientId()));

		Object userTRoken = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		userTRoken.toString();
		
		return oAuth2Filter;
	}

	/*@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
			.antMatchers("/", "/**.html", "/app/**.js").permitAll()
			.anyRequest().fullyAuthenticated()
			.and()
			.logout()
			.logoutSuccessUrl("/")
			.permitAll()
			.and()
			.addFilterAt(filter(), BasicAuthenticationFilter.class)
			.csrf()
			.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
	}*/
}