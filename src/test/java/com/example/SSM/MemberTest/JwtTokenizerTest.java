//package com.example.SSM.MemberTest;
//
//import com.example.SSM.be.domain.security.token.jwt.JwtTokenizer;
//import io.jsonwebtoken.io.Decoders;
//import io.jsonwebtoken.security.Keys;
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.TestInstance;
//
//import javax.crypto.SecretKey;
//import java.util.Base64;
//import java.util.Calendar;
//import java.util.Date;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.equalTo;
//import static org.hamcrest.Matchers.is;
//@TestInstance(TestInstance.Lifecycle.PER_CLASS)
//public class JwtTokenizerTest {
//
//
//    private static JwtTokenizer jwtTokenizer;
//    private String secretKey;
//    private String base64EncodedSecretKey;
//
//    @BeforeAll
//    public void init() {
//
//        secretKey = "kevin1234123412341234123412341234";  // encoded "a2V2aW4xMjM0MTIzNDEyMzQxMjM0MTIzNDEyMzQxMjM0"
//
//        base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey();
//    }
//
//    @Test
//    public void encodeBase64SecretKeyTest() {
//        System.out.println(base64EncodedSecretKey);
//
//        assertThat(secretKey, is(new String(Decoders.BASE64.decode(base64EncodedSecretKey))));
//    }
//
//    //@Test
////    public void generateAccessTokenTest() {
////        Map<String, Object> claims = new HashMap<>();
////        claims.put("memberId", 1);
////        claims.put("roles", List.of("USER"));
////
////        String subject = "test access token";
////        Calendar calendar = Calendar.getInstance();
////        calendar.add(Calendar.MINUTE, 10);
////        Date expiration = calendar.getTime();
////
////        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration);
////
////        System.out.println(accessToken);
////
////        assertThat(accessToken, notNullValue());
////    }
//
////    @Test
////    public void generateRefreshTokenTest() {
////        String subject = "test refresh token";
////        Calendar calendar = Calendar.getInstance();
////        calendar.add(Calendar.HOUR, 24);
////        Date expiration = calendar.getTime();
////
////        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration);
////
////        System.out.println(refreshToken);
////
////        assertThat(refreshToken, notNullValue());
////    }
//
//
//
//
//
//
//    @Test
//    public void calendarToDateTest() {
//        Calendar calendar = Calendar.getInstance();
//        long now = calendar.getTimeInMillis();
//
//        calendar.setTime(new Date());
//        calendar.add(Calendar.MINUTE, 10);
//        Date expiration = calendar.getTime();
//
////        System.out.println(Calendar.getInstance().getTime());
////        System.out.println(calendar.getTime());
////        System.out.println(expiration);
//
//        assertThat(expiration.getTime(), is(now + (10 * 60 * 1000)));
//    }
//
////    private String getAccessToken(int timeUnit, int timeAmount) {
////        Map<String, Object> claims = new HashMap<>();
////        claims.put("memberId", 1);
////        claims.put("roles", List.of("USER"));
////
////        String subject = "test access token";
////        Calendar calendar = Calendar.getInstance();
////        calendar.add(timeUnit, timeAmount);
////        Date expiration = calendar.getTime();
////        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration);
////
////        return accessToken;
////    }
//
//
//    @Test
//    @DisplayName("sercretKey 원문으로 hmac 암호화 알고리즘에 맞는 SecretKey 객체를 만들 수 있다.")
//    void t2() {
//        // 키를 Base64 인코딩
//        String keyBase64Encoded = Base64.getEncoder().encodeToString(secretKey.getBytes());
//        // Base64 인코딩된 키를 이용하여 SecretKey 객체를 만든다.
//        SecretKey secretKey = Keys.hmacShaKeyFor(keyBase64Encoded.getBytes());
//
//        // 검증
//        assertThat(secretKey.getAlgorithm(), is(equalTo("HmacSHA256")));
//    }
//}