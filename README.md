# SubDub - Subscription Tracker API

SubDub is a powerful and efficient API for tracking and managing subscriptions. Built with Node.js, Express, and MongoDB, it helps users keep track of their recurring payments, renewal dates, and subscription statuses. It leverages Upstash Workflow for automated reminders to ensure you never miss a payment.

## 🚀 Features

- **Subscription Management**: CRUD operations for subscriptions (Netflix, Spotify, AWS, etc.).
- **Smart Renewal Tracking**: Automatically calculates renewal dates based on frequency (Daily, Weekly, Monthly, Yearly).
- **Status Automation**: Auto-updates subscription status to "expired" when the renewal date passes.
- **Automated Reminders**: Uses Upstash Workflow to send email reminders for upcoming renewals.
- **User Authentication**: Secure JWT-based authentication for user management.
- **Security**: 
    - Rate limiting protection.
    - Arcjet integration for advanced security and bot protection.
- **Data Validation**: Robust validation using Mongoose and standard validators.

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose ODM)
- **Workflow Engine**: [Upstash Workflow](https://upstash.com/docs/workflow/getstarted)
- **Security**: [Arcjet](https://arcjet.com/)
- **Authentication**: [JWT (JSON Web Tokens)](https://jwt.io/)
- **Email**: [Nodemailer](https://nodemailer.com/)


## 📂 Project Structure

```
SubDub/
├── src/
│   ├── config/         # Environment and configuration setup
│   ├── controllers/    # Request handlers
│   ├── db/             # Database connection logic
│   ├── middlewares/    # Custom middlewares (Auth, Arcjet, Error handling)
│   ├── models/         # Mongoose schemas (User, Subscription)
│   ├── Routes/         # API routes
│   └── utils/          # Utility functions
├── app.js              # Entry point of the application
├── package.json        # Dependencies and scripts
└── ...
```

## 🏁 Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- An [Upstash](https://upstash.com/) account (for Workflow/QStash)
- An [Arcjet](https://arcjet.com/) account (for Security)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SubDub.git
   cd SubDub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add the following variables (reference `env-development-local.txt`):

   ```env
   # Environment
   NODE_ENV="development"
   PORT=3000
   SERVER_URL="http://localhost:3000"

   # Database
   MONGODB_URI="your_mongodb_connection_string"

   # JWT Config
   ACCESS_TOKEN_SECRET="your_access_token_secret"
   ACCESS_TOKEN_EXPIRES="1d"
   REFRESH_TOKEN_SECRET="your_refresh_token_secret"
   REFRESH_TOKEN_EXPIRES="10d"

   # Arcjet Security
   ARCJET_KEY="your_arcjet_key"
   ARCJET_ENV="development"

   # Upstash Workflow
   QSTASH_URL="your_qstash_url"
   QSTASH_TOKEN="your_qstash_token"

   # Email Service
   EMAIL_PASSWORD="your_email_app_password"
   ```

### Running the Application

- **Development Mode** (with Nodemon):
  ```bash
  npm run dev
  ```

- **Production Mode**:
  ```bash
  npm start
  ```

- **Upstash CLI Dev Server**:
  ```bash
  npm run upstash
  ```

The server will start on `http://localhost:3000/`.

## 📡 API Endpoints

### Authentication
- `POST /api/v1/auth/sign-up` - Register a new user
- `POST /api/v1/auth/sign-in` - Login user
- `POST /api/v1/auth/sign-out` - Logout user

### Subscriptions
- `GET /api/v1/subscriptions` - Get all subscriptions
- `POST /api/v1/subscriptions` - Create a new subscription
- `GET /api/v1/subscriptions/:id` - Get subscription details
- `PATCH /api/v1/subscriptions/:id` - Update subscription
- `DELETE /api/v1/subscriptions/:id` - Delete subscription
- `PATCH /api/v1/subscriptions/:id/cancel` - Cancel a subscription
- `GET /api/v1/subscriptions/upcoming-renewals` - Get subscriptions renewing soon

### Workflows
- `POST /api/v1/workflows/subscription/reminder` - Trigger subscription reminders

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.
