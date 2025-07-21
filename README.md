# MERN Full-Stack Application

A modern, production-ready web application built with **MongoDB**, **Next.js**, **React**, and **Node.js**. This application features comprehensive authentication, role-based access control, admin dashboard, and a beautiful responsive UI.

## 🚀 Features

### Authentication & Security
- **User Registration & Login** - Secure user authentication with email/password
- **Google OAuth Integration** - Social login with Google
- **Password Reset** - Email-based password recovery
- **Role-Based Access Control** - Admin and user roles with protected routes
- **Session Management** - Secure session handling with NextAuth.js

### Admin Dashboard
- **User Management** - View, edit, and manage user accounts
- **Audit Logs** - Track user actions and system events
- **Notifications** - Slack webhook integration for admin alerts
- **Role Management** - Assign and manage user roles

### User Features
- **User Profiles** - Personal profile management
- **Dashboard** - Personalized user dashboard
- **Settings** - User preferences and account settings
- **Posts Management** - Create, edit, and manage posts

### Technical Features
- **Modern UI/UX** - Beautiful responsive design with Tailwind CSS
- **TypeScript** - Full type safety throughout the application
- **MongoDB Integration** - Robust database with Mongoose ODM
- **API Routes** - RESTful API endpoints for all functionality
- **Middleware Protection** - Route protection and authentication checks

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js with Google OAuth
- **Styling**: Tailwind CSS with custom components
- **Development**: ESLint, PostCSS, TypeScript

## 📁 Project Structure

```
full-stack-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── admin/         # Admin API endpoints
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── posts/         # Posts API
│   │   │   ├── users/         # User management API
│   │   │   └── ...            # Other API routes
│   │   ├── admin/             # Admin dashboard pages
│   │   ├── dashboard/         # User dashboard
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   ├── profile/           # User profile pages
│   │   ├── settings/          # User settings
│   │   ├── posts/             # Posts management
│   │   ├── about/             # About page
│   │   ├── reset/             # Password reset
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── providers.tsx      # Context providers
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable React components
│   │   ├── NavBar.tsx         # Navigation component
│   │   ├── ConfirmModal.tsx   # Confirmation modal
│   │   └── SessionProvider.tsx # Session provider
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts            # Authentication utilities
│   │   ├── mongodb.ts         # MongoDB connection
│   │   ├── mongodb-mongoose.ts # Mongoose connection
│   │   ├── notifications.ts   # Notification system
│   │   └── audit.ts           # Audit logging
│   ├── models/                # Database models
│   │   └── Post.ts            # Post model
│   └── types/                 # TypeScript type definitions
│       ├── posts.ts           # Post types
│       └── next-auth.d.ts     # NextAuth type extensions
├── public/                    # Static assets
├── middleware.ts              # Next.js middleware
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── next.config.ts             # Next.js configuration
├── eslint.config.mjs          # ESLint configuration
└── .gitignore                 # Git ignore rules
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- MongoDB database (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd full-stack-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # NextAuth Configuration
   NEXTAUTH_SECRET=your_nextauth_secret_key
   NEXTAUTH_URL=http://localhost:3000
   
   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # Notifications (Optional)
   SLACK_WEBHOOK_URL=your_slack_webhook_url
   ADMIN_ALERT_EMAIL=admin@example.com
   
   # Environment
   NODE_ENV=development
   ```

4. **Set up MongoDB**
   
   - Create a MongoDB database (local or MongoDB Atlas)
   - Update the `MONGODB_URI` in your `.env.local` file
   - The application will automatically create collections and indexes

5. **Set up Google OAuth (Optional)**
   
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs
   - Update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local`

6. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `NEXTAUTH_SECRET` | Secret key for NextAuth.js | Yes |
| `NEXTAUTH_URL` | Base URL of your application | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | No |
| `SLACK_WEBHOOK_URL` | Slack webhook for notifications | No |
| `ADMIN_ALERT_EMAIL` | Email for admin alerts | No |
| `NODE_ENV` | Environment (development/production) | No |

### Database Setup

The application uses MongoDB with the following collections:
- `users` - User accounts and profiles
- `posts` - User posts and content
- `audit_logs` - System audit trail

Collections and indexes are created automatically on first run.

## 🔐 Authentication

The application supports multiple authentication methods:

1. **Email/Password Registration**
   - Users can register with email and password
   - Passwords are hashed using bcryptjs
   - Email verification (can be implemented)

2. **Google OAuth**
   - Social login with Google
   - Automatic account creation
   - Profile information sync

3. **Password Reset**
   - Email-based password recovery
   - Secure token generation
   - Time-limited reset links

## 👥 User Roles

- **User** - Basic access to dashboard, profile, and posts
- **Admin** - Full access including user management and admin dashboard

## 🎨 UI/UX Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern Interface** - Clean, professional design with Tailwind CSS
- **Smooth Animations** - CSS transitions and hover effects
- **Accessibility** - WCAG compliant components
- **Dark Mode Ready** - Can be easily extended for dark theme

## 🔍 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/reset` - Password reset

### User Management
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user (admin only)

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post

### Admin
- `GET /api/admin/users` - Admin user management
- `GET /api/admin/audit` - Audit logs
- `POST /api/admin/notifications` - Send notifications

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/full-stack-app/issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🔄 Version History

- **v0.1.0** - Initial release with authentication and basic features
- Future versions will include additional features and improvements

---

**Built with ❤️ using Next.js, React, MongoDB, and TypeScript** 