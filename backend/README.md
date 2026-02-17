# Jasuke Hub Backend API

MERN Stack backend untuk marketplace Jasuke Hub.

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup MongoDB
- Install MongoDB locally atau gunakan MongoDB Atlas
- Update `MONGO_URI` di file `.env`

### 3. Configure Environment
Edit file `.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/jasuke-hub
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

### 4. Run Server
```bash
# Development mode (dengan nodemon)
npm run dev

# Production mode
npm start
```

Server akan berjalan di `http://localhost:5000`

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update profile (protected)
- `GET /api/users/:id` - Get user by ID

### Services
- `GET /api/services` - Get all services (dengan filter)
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create service (seller only)
- `PUT /api/services/:id` - Update service (owner only)
- `DELETE /api/services/:id` - Delete service (owner only)

### Orders
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `POST /api/orders` - Create order (protected)
- `PUT /api/orders/:id` - Update order status (protected)
- `POST /api/orders/:id/revision` - Request revision (protected)

---

## Testing dengan Thunder Client / Postman

### 1. Register User
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Seller",
  "email": "john@example.com",
  "password": "123456",
  "role": "seller"
}
```

### 2. Login
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response akan include token JWT**

### 3. Create Service (gunakan token)
```http
POST http://localhost:5000/api/services
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "VR Development Service",
  "description": "Professional VR app development",
  "category": "VR Development",
  "price": 5000000,
  "deliveryTime": "14 days",
  "revisions": 3
}
```

### 4. Get All Services
```http
GET http://localhost:5000/api/services
```

### 5. Create Order
```http
POST http://localhost:5000/api/orders
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "serviceId": "SERVICE_ID_HERE",
  "amount": 5000000
}
```

### 6. Request Revision
```http
POST http://localhost:5000/api/orders/ORDER_ID/revision
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "note": "Please adjust the character model"
}
```

---

## Project Structure

```
backend/
├── server.js              # Entry point
├── .env                   # Environment variables
├── package.json           
├── config/
│   └── db.js             # MongoDB connection
├── models/
│   ├── User.js           # User schema
│   ├── Service.js        # Service schema
│   └── Order.js          # Order schema
├── routes/
│   ├── auth.js           # Auth routes
│   ├── users.js          # User routes
│   ├── services.js       # Service routes
│   └── orders.js         # Order routes
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── serviceController.js
│   └── orderController.js
└── middleware/
    ├── auth.js           # JWT verification
    └── error.js          # Error handler
```

---

## Features

✅ User authentication dengan JWT  
✅ Role-based access (buyer/seller/both)  
✅ Service CRUD dengan filter & search  
✅ Order management  
✅ Revision system (max 3 revisions)  
✅ Password hashing dengan bcrypt  
✅ Error handling middleware  
✅ MongoDB integration dengan Mongoose  

---

## Next Steps (Future Development)

- [ ] Real-time chat dengan Socket.io
- [ ] Payment gateway integration (Xendit/Midtrans)
- [ ] File upload untuk images (Multer + Cloudinary)
- [ ] Email notifications
- [ ] Balance & withdrawal system
- [ ] E-learning module API
- [ ] Review & rating system
- [ ] Admin dashboard

---

## Deployment

### Railway.app (Recommended)
1. Push ke GitHub
2. Connect repo di Railway
3. Add MongoDB service
4. Set environment variables
5. Deploy!

### Render.com
1. Create Web Service
2. Connect repo
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables

---

## Troubleshooting

**MongoDB Connection Error:**
- Pastikan MongoDB sudah running
- Check MONGO_URI di .env
- Untuk Windows: Install MongoDB Community Server

**JWT Error:**
- Pastikan JWT_SECRET sudah diset di .env
- Token harus dikirim dengan format: `Bearer TOKEN`

**CORS Error:**
- Backend sudah include CORS middleware
- Pastikan frontend mengirim dari origin yang benar
