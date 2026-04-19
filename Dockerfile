# Multi-stage build for Expense Tracker Backend
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /build

# Copy entire project
COPY . .

# Build only the backend
RUN cd backend && mvn clean package -DskipTests

# Final stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built JAR from builder stage
COPY --from=builder /build/backend/target/expense-tracker-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080
EXPOSE 8080

# Set Java options for production
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

