# BlogSpace - Blogging Website

A full-stack blogging platform built with React, Express, and Supabase.

## Features

### Public Users
- View all blogs
- Search blogs
- Filter by category
- Read blog posts
- View comments

### Registered Users
- Register/Login/Logout
- Create, edit, and delete own blogs
- Comment on blogs
- Manage profile

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Backend**: Node.js + Express
- **Editor**: React Quill

## Project Structure

```
blogging web/
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context (Auth)
│   │   ├── services/      # API & Supabase client
│   │   └── utils/         # Utility functions
│   └── package.json
└── backend/
    └── src/
        ├── config/        # Supabase config
        ├── controllers/   # Route controllers
        ├── routes/        # API routes
        ├── middleware/    # Auth, validation, error handling
        └── utils/         # Helper functions
```

## Setup Instructions

### 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Enable Email/Password authentication:
   - Go to Authentication → Providers → Email → Enable
3. Create database tables using the SQL below

### 2. Database Schema

Run this SQL in your Supabase SQL Editor:

```sql
-- Create profiles table
create table profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    email text not null,
    full_name text,
    created_at timestamptz default now()
);

-- Create categories table
create table categories (
    id uuid primary key default gen_random_uuid(),
    name text unique not null,
    created_at timestamptz default now()
);

-- Create posts table
create table posts (
    id uuid primary key default gen_random_uuid(),
    author_id uuid references profiles(id) on delete cascade,
    title text not null,
    content text not null,
    excerpt text,
    category_id uuid references categories(id),
    image_url text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Create comments table
create table comments (
    id uuid primary key default gen_random_uuid(),
    post_id uuid references posts(id) on delete cascade,
    user_id uuid references profiles(id) on delete cascade,
    content text not null,
    created_at timestamptz default now()
);

-- Insert default categories
insert into categories (name) values 
('Technology'),
('Programming'),
('Education'),
('Career'),
('Lifestyle'),
('Other');
```

### 3. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend directory:

```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Get your credentials from Supabase Project Settings → API

Start the backend server:

```bash
npm run dev
```

### 4. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in frontend directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

### 5. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Endpoints

### Posts
- `GET /api/posts` - Get all posts (supports ?search= and ?category= query params)
- `GET /api/posts/my` - Get current user's posts (protected)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)

### Comments
- `GET /api/posts/:postId/comments` - Get comments for a post
- `POST /api/posts/:postId/comments` - Create comment (protected)
- `DELETE /api/comments/:id` - Delete comment (protected)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category

### Profile
- `GET /api/profile` - Get current user profile (protected)
- `PUT /api/profile` - Update profile (protected)

## Security Features

- JWT authentication via Supabase
- Protected routes for authenticated users
- Authorization checks (users can only edit/delete their own content)
- Input validation on backend
- CORS enabled

## Testing Checklist

Before deployment, test:

### Authentication
- [ ] Register new user
- [ ] Login with correct credentials
- [ ] Login with wrong password
- [ ] Logout
- [ ] Protected routes redirect to login

### Blogs
- [ ] Create a new blog
- [ ] View all blogs on homepage
- [ ] Read a single blog
- [ ] Edit own blog
- [ ] Delete own blog
- [ ] Cannot edit/delete another user's blog

### Comments
- [ ] Add comment to blog
- [ ] View comments
- [ ] Delete own comment
- [ ] Post author can delete comments

### Search & Filter
- [ ] Search by title
- [ ] Search by content
- [ ] Filter by category
- [ ] View all categories

### Security
- [ ] Unauthenticated user cannot create blog
- [ ] Unauthenticated user cannot edit/delete
- [ ] User cannot edit another user's blog
- [ ] User cannot delete another user's blog

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy

## License

ISC
