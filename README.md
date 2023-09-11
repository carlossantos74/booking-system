# Booking System

## Description

This is a booking system for meetings. It is a web application that allow users schedule meetings with other users and assign rooms to the meetings. The application is built using the following technologies:

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/en/)

### Run the application locally

1. Build the application

```bash
docker compose up --build
```

2. Open the application in your browser

```bash 
http://localhost:3000
```


---

### Run the application in development mode

1. Build the application

```bash
docker compose up --build
```

2. Install the dependencies
```bash 
npm install
```

3. Add the database url to the .env file

```bash
DATABASE_URL=postgresql://booking:uyg@xvp5WGD8wvd7pea@localhost:5432/booking-db
```

4. Start the database

```bash
docker compose start postgres
```

5. Run the migrations

```bash
npm run migrate
```

6. Start the application
```bash
npm run dev
```

7. Open the application in your browser
```bash
http://localhost:3000
```