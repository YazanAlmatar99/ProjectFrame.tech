package com.yazanalmatar.projectframe.security;

import com.yazanalmatar.projectframe.domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

//import static com.yazanalmatar.projectframe.security.SecurityConstants.JWT_SECRET_KEY;
//import static com.yazanalmatar.projectframe.security.SecurityConstants.TOKEN_EXPIRATION_TIME;

public class JwtTokenProvider {

    //Generate token
    public String generateToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());
        Date expireDate = new Date(now.getTime() + 30000);
        String userId = Long.toString(user.getId());
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", (Long.toString(user.getId())));
        claims.put("username", user.getUsername());
        claims.put("fullName", user.getFullName());

        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, "MYSECRETKEY")
                .compact();
    }
    //validate token

    //Get user id from token
}
