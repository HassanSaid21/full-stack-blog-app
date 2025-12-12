# Full Stack Blog Application

A modern, feature-rich blog application built with the MERN stack (MongoDB, Express, React, Node.js). This application provides a complete blogging platform with user authentication, rich text editing, image uploads, comments, and more.

![Proto Blog App](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)

## 🚀 Features

- **User Authentication**: Secure authentication and authorization using Clerk
- **Rich Text Editor**: Create and edit blog posts with a powerful WYSIWYG editor (React Quill)
- **Image Management**: Upload and manage images with ImageKit integration
- **Commenting System**: Engage with readers through comments on posts
- **Categories & Search**: Organize posts by categories and search functionality
- **Featured Posts**: Highlight important posts on the homepage
- **Infinite Scrolling**: Smooth browsing experience with infinite scroll
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Real-time Updates**: Optimized data fetching with React Query
- **Visit Tracking**: Track post views and popularity
- **Syntax Highlighting**: Code blocks with Prism.js support
- **Webhooks**: Clerk webhook integration for user management

## 🛠️ Tech Stack

### Frontend
- **React 19** (RC) - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **React Query** (@tanstack/react-query) - Data fetching and state management
- **Clerk** - Authentication and user management
- **React Quill** - Rich text editor
- **ImageKit React** - Image CDN and optimization
- **Axios** - HTTP client
- **DOMPurify** - XSS protection
- **Prism.js** - Syntax highlighting
- **React Toastify** - Toast notifications
- **Timeago.js** - Time formatting

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Clerk Express** - Authentication middleware
- **ImageKit** - Image management SDK
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** account (MongoDB Atlas recommended)
- **Clerk** account for authentication
- **ImageKit** account for image management

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/HassanSaid21/full-stack-blog-app.git
cd full-stack-blog-app
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../client
npm install
```

## ⚙️ Environment Variables

### Backend (.env)
Create a `.env` file in the `backend` directory with the following variables:

```env
# MongoDB Connection
MONGO=your_mongodb_connection_string

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173

# ImageKit Configuration
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

### Frontend (.env)
Create a `.env` file in the `client` directory with the following variables:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# API Configuration
VITE_API_URL=http://localhost:3000

# ImageKit Configuration
VITE_IK_URL_ENDPOINT=your_imagekit_url_endpoint
VITE_IK_PUBLIC_KEY=your_imagekit_public_key
```

## 🚀 Running the Application

### Development Mode

#### Start Backend Server
```bash
cd backend
node index.js
```
The backend server will run on `http://localhost:3000`

#### Start Frontend Development Server
```bash
cd client
npm run dev
```
The frontend will run on `http://localhost:5173`

### Production Build

#### Build Frontend
```bash
cd client
npm run build
```

## 📁 Project Structure

```
full-stack-blog-app/
├── backend/
│   ├── controllers/        # Request handlers
│   ├── models/            # MongoDB schemas
│   │   ├── user.model.js
│   │   ├── post.model.js
│   │   └── comment.model.js
│   ├── routes/            # API routes
│   │   ├── user.route.js
│   │   ├── post.route.js
│   │   ├── comment.route.js
│   │   └── webhook.route.js
│   ├── lib/               # Utility functions
│   ├── index.js           # Entry point
│   ├── package.json
│   └── .env
│
└── client/
    ├── public/            # Static assets
    ├── src/
    │   ├── components/    # Reusable components
    │   │   ├── Navbar.jsx
    │   │   ├── PostList.jsx
    │   │   ├── Comment.jsx
    │   │   ├── Upload.jsx
    │   │   └── ...
    │   ├── routes/        # Page components
    │   │   ├── Homepage.jsx
    │   │   ├── SinglePost.jsx
    │   │   ├── Write.jsx
    │   │   ├── Login.jsx
    │   │   └── ...
    │   ├── layouts/       # Layout components
    │   ├── App.jsx        # Root component
    │   └── main.jsx       # Entry point
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── .env
```

## 🔌 API Endpoints

### Posts
- `GET /posts` - Get all posts (with pagination and filters)
- `GET /posts/:slug` - Get single post by slug
- `POST /posts` - Create new post (authenticated)
- `PUT /posts/:id` - Update post (authenticated)
- `DELETE /posts/:id` - Delete post (authenticated)
- `PATCH /posts/:id/feature` - Toggle featured status (authenticated)

### Comments
- `GET /comments/:postId` - Get comments for a post
- `POST /comments` - Create new comment (authenticated)
- `DELETE /comments/:id` - Delete comment (authenticated)

### Users
- `GET /users/:userId` - Get user profile
- `PUT /users/:userId` - Update user profile (authenticated)

### Webhooks
- `POST /webhooks/clerk` - Clerk webhook for user sync

## 🎨 Key Features Explained

### Authentication
The app uses Clerk for authentication, providing:
- Social login (Google, GitHub, etc.)
- Email/Password authentication
- Session management
- Protected routes
- User profile management

### Image Upload
ImageKit integration provides:
- Optimized image delivery via CDN
- Automatic image transformations
- Upload widget for easy file selection
- Secure upload signatures

### Rich Text Editor
React Quill editor with:
- WYSIWYG editing experience
- Markdown support
- Code syntax highlighting
- Image embedding
- Text formatting options

### Data Fetching
React Query provides:
- Automatic caching
- Background refetching
- Optimistic updates
- Loading and error states
- Infinite scrolling support

## 🔐 Security Features

- **XSS Protection**: DOMPurify sanitizes HTML content
- **CORS Configuration**: Controlled cross-origin requests
- **Authentication Middleware**: Protected API routes
- **Environment Variables**: Sensitive data kept secure
- **Input Validation**: Server-side validation for all inputs

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Hassan Said**
- GitHub: [@HassanSaid21](https://github.com/HassanSaid21)

## 🙏 Acknowledgments

- Clerk for authentication solution
- ImageKit for image management
- MongoDB Atlas for database hosting
- React and Vite communities for excellent tools

## 📞 Support

For support, please open an issue in the GitHub repository.

---

**Happy Blogging! 📝✨**
