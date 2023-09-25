FROM openjdk:11
RUN ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","-Dspring.profiles.active=server","/app.jar"]
