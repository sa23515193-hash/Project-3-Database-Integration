# API Testing Guide

## Postman

Import:

`postman/Project-3-API-Collection.json`

Phir:

1. Run `npm install`
2. Configure `.env`
3. Start server with `npm run dev`
4. Postman collection open karein
5. `Create Item` request run karein
6. Response se `_id` copy karein
7. Collection variable `itemId` me `_id` paste karein
8. Read, Update aur Delete requests test karein

## Sample CRUD Flow

```text
POST /api/items
       ↓
MongoDB document created
       ↓
GET /api/items
       ↓
PUT /api/items/:id
       ↓
DELETE /api/items/:id
```
