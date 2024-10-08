package az.esam.kredit.kredit.security.jwt;

import az.esam.kredit.kredit.entities.User;
import az.esam.kredit.kredit.repositories.TokenRepository;
import az.esam.kredit.kredit.security.auth.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
public class AuthTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private TokenRepository tokenRepository;

    @Value("${kredit.app.api.key}")
    private String apiKey;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        String requestURI = request.getRequestURI();

        // Skip API key check for Swagger and other excluded endpoints
        if (isExcludedEndpoint(requestURI)) {
            filterChain.doFilter(request, response);
            return;
        }

        if (!checkApiKey(request)) {
            if (!response.isCommitted()) {
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "Wrong API key or secret");
            }
            log.error("Wrong API key or secret");
            return;
        }

        if (request.getRequestURI().equals("/api/auth")
                || request.getRequestURI().equals("/api/auth/register")
                || request.getRequestURI().equals("/api/auth/login")
                || request.getRequestURI().equals("/api/auth/reset-password")) {
            filterChain.doFilter(request, response);
            return;
        }

        request.getHeaderNames();
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            jwt = authHeader.substring(7);
            username = jwtService.extractUsername(jwt);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                var isValidToken = tokenRepository.findByToken(jwt)
                        .map(t -> !t.isExpired() && !t.isRevoked())
                        .orElse(false);

                if (jwtService.isTokenValid(jwt, userDetails) && isValidToken) {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities());
                    authentication.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    if (!response.isCommitted()) {
                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired JWT token");
                    }
                    log.error("Invalid or expired JWT token");
                    return;
                }
            }
            filterChain.doFilter(request, response);

        } catch (Exception e) {
            log.error("Cannot set user authentication: {}", e);
            if (!response.isCommitted()) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT token");
            }
            return;
        }
    }

    private boolean isExcludedEndpoint(String requestURI) {
        return requestURI.startsWith("/swagger")
                || requestURI.startsWith("/v3/api-docs")
                || requestURI.startsWith("/swagger-ui.html")
                || requestURI.startsWith("/api/file/getFile")
                || requestURI.startsWith("/api/auth/getUserPhoto");
    }

    private boolean checkApiKey(HttpServletRequest request) {
        String requestApiKey = request.getHeader("X-API-KEY");
        return apiKey.equals(requestApiKey);
    }

    public User getUser(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }

        try {
            jwt = authHeader.substring(7);
            username = jwtService.extractUsername(jwt);

            if (username != null) {
                return userDetailsService.getUser(username);
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e);
        }
        return null;
    }
}
