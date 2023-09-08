# (1) OpenJDK 11 사용
FROM docker.io/library/openjdk:11@sha256:99bac5bf83633e3c7399aed725c8415e7b569b54e03e4599e580fc9cdb7c21ab

# (2) 환경 변수 설정
ENV JAR_FILE build/libs/*-SNAPSHOT.jar

# (3) jar 빌드 파일을 도커 컨테이너로 복사
COPY ${JAR_FILE} /app/app.jar

# (4) jar 파일 실행
CMD ["java", "-jar", "/app/app.jar"]