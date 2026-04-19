# Smart Expense Tracker API (with Analytics)

A full-stack expense tracking application with analytics features. Built with Spring Boot (backend) and React.js (frontend).

## Tech Stack

- **Backend**: Java, Spring Boot, Spring Data JPA, PostgreSQL
- **Frontend**: React.js, HTML, CSS, JavaScript
- **Deployment**: Render (backend), Cloudflare Pages (frontend)

## Project Structure

```
/backend - Spring Boot API
/frontend - React.js frontend
/database - SQL scripts
```

## Backend API Endpoints

### Expense Management
- `POST /expenses` - Add new expense
- `GET /expenses` - Get all expenses
- `GET /expenses/category/{category}` - Filter by category
- `PUT /expenses/{id}` - Update expense
- `DELETE /expenses/{id}` - Delete expense

### Analytics
- `GET /expenses/analytics/category` - Total spending by category
- `GET /expenses/analytics/monthly` - Total spending by month

## Sample API Requests

### Add Expense
```json
POST /expenses
{
  "title": "Groceries",
  "amount": 50.00,
  "category": "Food",
  "date": "2023-10-01"
}
```

### Get All Expenses
```json
GET /expenses
[
  {
    "id": 1,
    "title": "Groceries",
    "amount": 50.0,
    "category": "Food",
    "date": "2023-10-01"
  }
]
```

## Database Setup

Run the SQL script in `database/create_table.sql` to create the expenses table.

## Environment Variables

### Backend (application.properties)
- `DB_HOST` - Database host
- `DB_PORT` - Database port (default: 5432)
- `DB_NAME` - Database name
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password

### Frontend (.env)
- `REACT_APP_API_URL` - Backend API URL

## Deployment Instructions

### Backend on Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `mvn clean install`
4. Set start command: `java -jar target/expense-tracker-0.0.1-SNAPSHOT.jar`
5. Add environment variables for database connection
6. Deploy

### Frontend on Cloudflare Pages

1. Create a new project on Cloudflare Pages
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set build output directory: `build`
5. Add environment variable: `REACT_APP_API_URL` with your Render backend URL
6. Deploy

## Running Locally

### Backend
1. Set up PostgreSQL database
2. Update `application.properties` with your DB details
3. Run: `mvn spring-boot:run`

### Frontend
1. Run: `npm install`
2. Set `REACT_APP_API_URL` in .env file
3. Run: `npm start`

## Features

- Add, view, update, delete expenses
- Filter expenses by category
- Analytics: spending by category and month
- Simple, clean UI
- RESTful API design
- CORS enabled for frontend integration