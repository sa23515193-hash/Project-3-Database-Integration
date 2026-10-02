# Project 3 — Database Integration

**Industrial Training Kit | Full Stack Development**

A complete RESTful CRUD API built with:

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- Helmet
- CORS
- Express Rate Limit

## 1. Project Goal

Is project ka main goal backend application ko MongoDB database ke sath connect karna aur complete CRUD operations implement karna hai.

CRUD ka matlab:

- **Create** → POST → MongoDB document create
- **Read** → GET → MongoDB documents read
- **Update** → PUT/PATCH → MongoDB document update
- **Delete** → DELETE → MongoDB document delete

## 2. Folder Structure

```text
Project-3-Database-Integration/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── itemController.js
│
├── middleware/
│   └── errorMiddleware.js
│
├── models/
│   └── Item.js
│
├── routes/
│   └── itemRoutes.js
│
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## 3. Requirements

Install these first:

1. Node.js LTS
2. MongoDB Community Server **OR** a MongoDB Atlas account
3. VS Code

## 4. Installation

Project folder VS Code me open karein.

Terminal me:

```bash
npm install
```

## 5. Environment Setup

`.env.example` ki copy bana kar uska naam `.env` rakhein.

### Local MongoDB

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/project3_database
```

### MongoDB Atlas

Atlas se connection string copy karein:

```env
PORT=5000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/project3_database
```

**Important:** `.env` ko GitHub par upload na karein. `.gitignore` already `.env` ko ignore karta hai.

## 6. Run Project

Development mode:

```bash
npm run dev
```

Normal mode:

```bash
npm start
```

Server:

```text
http://localhost:5000
```

Agar browser me `/` open karein to API ka running message JSON me milega.

## 7. API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/items` | New item create |
| GET | `/api/items` | All items read |
| GET | `/api/items/:id` | Single item read |
| PUT | `/api/items/:id` | Item update |
| PATCH | `/api/items/:id` | Partial update |
| DELETE | `/api/items/:id` | Item delete |

## 8. Create Item — POST

URL:

```text
http://localhost:5000/api/items
```

Body:

```json
{
  "name": "Wireless Headphones",
  "description": "Bluetooth headphones with noise cancellation",
  "price": 8500,
  "category": "Electronics",
  "inStock": true
}
```

Expected response:

```json
{
  "success": true,
  "message": "Item created successfully.",
  "data": {}
}
```

## 9. Read Items — GET

```text
GET http://localhost:5000/api/items
```

## 10. Read One Item

```text
GET http://localhost:5000/api/items/ITEM_ID
```

`ITEM_ID` ko POST response se milne wali `_id` se replace karein.

## 11. Update Item — PUT

```text
PUT http://localhost:5000/api/items/ITEM_ID
```

Example body:

```json
{
  "name": "Premium Wireless Headphones",
  "price": 9500,
  "category": "Electronics",
  "inStock": true
}
```

## 12. Delete Item — DELETE

```text
DELETE http://localhost:5000/api/items/ITEM_ID
```

## 13. Database Schema

`Item` model me:

- `name` — required string
- `description` — required string
- `price` — required number, minimum 0
- `category` — controlled values
- `inStock` — boolean
- `createdAt` — automatic timestamp
- `updatedAt` — automatic timestamp

MongoDB document IDs Mongoose automatically generate karta hai.

## 14. Security & Integrity

Project me basic security practices already implemented hain:

### Input validation
Mongoose schema required fields, length limits, price minimum aur category validation enforce karta hai.

### Injection protection
Mongoose model-based queries use ki gayi hain instead of unsafe raw SQL string concatenation.

### HTTP security headers
Helmet security-related HTTP headers set karta hai.

### Rate limiting
Repeated requests ko limit karne ke liye Express Rate Limit use kiya gaya hai.

### Body size limit
JSON request body ko `10kb` tak limit kiya gaya hai.

### Environment variables
Database URI `.env` me rakhi gayi hai aur `.gitignore` me `.env` included hai.

## 15. Testing

Recommended tools:

- Postman
- Thunder Client
- Insomnia

Testing order:

1. `GET /api/health`
2. `POST /api/items`
3. `GET /api/items`
4. `GET /api/items/:id`
5. `PUT /api/items/:id`
6. `DELETE /api/items/:id`

## 16. Viva / Presentation Explanation

Agar instructor pooche "Project me kya kiya?", aap keh sakti hain:

> "Maine Node.js aur Express.js based RESTful backend develop kiya hai jo MongoDB database ke sath Mongoose ODM ke through connected hai. Maine Item schema design kiya, database connection establish ki, aur POST, GET, PUT/PATCH aur DELETE endpoints implement kiye. Input validation, error handling, Helmet security headers, rate limiting aur environment variables bhi use kiye hain."

## 17. Troubleshooting

### MongoDB connection error

Check karein:

- MongoDB service running hai
- `.env` file project root me hai
- `MONGODB_URI` correct hai
- Atlas use kar rahe hain to IP access list configured hai
- Atlas username/password correct hai

### `npm is not recognized`

Node.js LTS install/reinstall karein aur VS Code restart karein.

### Port already in use

`.env` me:

```env
PORT=5001
```

phir server restart karein.

---

**Project 3 complete:** Schema → Connection → CRUD → Validation → Security → Error Handling.
