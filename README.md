## 🎮 GameLib Full-Stack
Gaming prime is a web-site built on back-end and front-end.

## 🛠 Tech stack
back-end: Prisma, Express, Zod;
front-end: React, TypeScript, React-Icons, React-router, TailwindCSS;
Api: IGDB API, Steam API

## 📋 Features

### 1 Data Proccesing & Seedings 
* Got data from the IGDB games database.
* Created a filtering logic to exclude DLCs and none-game categories.
* Did complex "many-to-many relations" bettwens Games, Genres, Platforms.
* A function was created that, based on the games received from IGDB, took a list of requirements, price, screens and rating.

### 2 API & Performance
* Created an API request to receive games.
* Created a function to get different game categories:
    * **Upcoming:** Future releases sorted by date.
    * **Most Popular:** Top-rated games (MetaScore 90+).
    * **Trending:** Recent hits from the last 12 months.

### 3. Security & Validation
* Integrated **Zod** for schema validation.
* Protected all API routes from invalid query parameters and malicious inputs.
* Used **Prisma Types** for strict end-to-end type safety.

## 🚀 Getting Started

### Prerequisites
* Node.js installed
* PostgreSQL database running

### Installation
1. Clone the repo
2. Run `npm install`
3. Create a `.env` file and add your `DATABASE_URL` and IGDB credentials.
4. Run migrations:
   npx prisma migrate dev