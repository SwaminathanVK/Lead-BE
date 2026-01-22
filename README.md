Lead Management System - Backend API
A robust RESTful API built with Node.js, Express, and MongoDB for managing leads with JWT-based authentication.
🚀 Features

User Authentication: Secure registration and login with JWT tokens
Lead Management: Complete CRUD operations for leads
Protected Routes: JWT middleware for secure endpoints
MongoDB Integration: Persistent data storage
CORS Enabled: Cross-origin resource sharing for frontend integration
Input Validation: Data validation and error handling
RESTful Architecture: Clean and scalable API design

📁 Project Structure
Lead-BE/
├── Controllers/           # Business logic for routes
│   ├── authController.js
│   └── leadController.js
├── Database/             # Database configuration
│   └── db.js
├── Middleware/           # Custom middleware
│   └── authMiddleware.js
├── Models/               # Mongoose schemas
│   ├── User.js
│   └── Lead.js
├── Routes/               # API routes
│   ├── authRoutes.js
│   └── leadRoutes.js
├── .gitignore
├── index.js              # Application entry point
├── package.json
└── package-lock.json
🛠️ Technologies Used

Node.js: JavaScript runtime
Express.js: Web application framework
MongoDB: NoSQL database
Mongoose: MongoDB object modeling
JWT: JSON Web Tokens for authentication
bcryptjs: Password hashing
cors: Cross-Origin Resource Sharing
dotenv: Environment variable management

📋 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v14 or higher)
npm (v6 or higher)
MongoDB (local or Atlas account)

⚙️ Installation

Clone the repository

bash   git clone https://github.com/SwaminathanVK/Lead-BE.git
   cd Lead-BE

Install dependencies

bash   npm install

Create environment variables
Create a .env file in the root directory:

env   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/project-name
   JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

Start the server

bash   npm start
For development with auto-restart:
bash   npm run dev
🔌 API Endpoints
Authentication Routes
Register User
httpPOST /api/auth/register
Request Body:
json{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phoneno": "1234567890"
}
Response:
json{
  "message": "User registered successfully",
  "user": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com",
    "phoneno": "1234567890"
  }
}
Login User
httpPOST /api/auth/login
Request Body:
json{
  "email": "john@example.com",
  "password": "password123"
}
Response:
json{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
Lead Routes (Protected)
All lead routes require authentication. Include the JWT token in the Authorization header:
Authorization: Bearer <your_jwt_token>
Get All Leads
httpGET /api/leads
Response:
json[
  {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Lead Name",
    "email": "lead@example.com",
    "phone": "1234567890",
    "status": "New",
    "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
    "createdAt": "2024-01-23T10:30:00.000Z",
    "updatedAt": "2024-01-23T10:30:00.000Z"
  }
]
Create Lead
httpPOST /api/leads
Request Body:
json{
  "name": "Lead Name",
  "email": "lead@example.com",
  "phone": "1234567890",
  "status": "New"
}
Response:
json{
  "message": "Lead created successfully",
  "lead": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Lead Name",
    "email": "lead@example.com",
    "phone": "1234567890",
    "status": "New",
    "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
    "createdAt": "2024-01-23T10:30:00.000Z"
  }
}
Update Lead
httpPUT /api/leads/:id
Request Body:
json{
  "name": "Updated Lead Name",
  "email": "updated@example.com",
  "phone": "9876543210",
  "status": "Contacted"
}
Response:
json{
  "message": "Lead updated successfully",
  "lead": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Updated Lead Name",
    "email": "updated@example.com",
    "phone": "9876543210",
    "status": "Contacted",
    "updatedAt": "2024-01-23T11:30:00.000Z"
  }
}

Delete Lead
httpDELETE /api/leads/:id
Response:
json{
  "message": "Lead deleted successfully"
}

🗄️ Database Schema
User Model
javascript{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  phoneno: String (required),
  createdAt: Date,
  updatedAt: Date
}

Lead Model
javascript{
  name: String (required),
  email: String (required),
  phone: String (required),
  status: String (enum: ['New', 'Contacted', 'Lost'], default: 'New'),
  userId: ObjectId (ref: 'User', required),
  createdAt: Date,
  updatedAt: Date
}

🔒 Security Features

Password Hashing: All passwords are hashed using bcryptjs before storage
JWT Authentication: Secure token-based authentication
Protected Routes: Middleware ensures only authenticated users can access lead endpoints
CORS Configuration: Controlled cross-origin access
Input Validation: Server-side validation for all inputs

🧪 Testing the API
Using cURL
Register:
bashcurl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","phoneno":"1234567890"}'
  
Login:
bashcurl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
  
Get Leads:
bashcurl -X GET http://localhost:3000/api/leads \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
  
Using Postman

Import the API endpoints
Set up environment variables for base URL and token
Test each endpoint with appropriate request bodies

📝 Environment Variables
VariableDescriptionExamplePORTServer port number3000MONGODB_URIMongoDB connection stringmongodb://localhost:27017/lead-managementJWT_SECRETSecret key for JWT signingyour_secret_key
🚦 Error Handling
The API returns appropriate HTTP status codes:

200: Success
201: Created
400: Bad Request (validation errors)
401: Unauthorized (invalid/missing token)
404: Not Found
500: Internal Server Error

Error Response Format:
json{
  "message": "Error description"
}
🔄 Status Flow
Leads can have the following statuses:

New: Initial status for new leads
Contacted: Lead has been contacted
Lost: Lead is no longer active

🤝 Contributing

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

📄 License
This project is licensed under the MIT License.
👤 Author
Swaminathan VK

GitHub: @SwaminathanVK

🙏 Acknowledgments

Express.js documentation
MongoDB documentation
JWT.io for token verification
The Node.js community

📞 Support
For support, email iamswami19@gmail.com or create an issue in the repository.

Happy Coding! 🚀
