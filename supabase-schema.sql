-- ==============================================================================
-- Celebration Events - Complete Supabase Database Schema
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/wqnobkskmvilfhduvxsu/sql/new
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Create Administrator Authentication Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_auth (
    id TEXT PRIMARY KEY DEFAULT 'admin_primary',
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed default authorized administrator account
INSERT INTO public.admin_auth (id, email, password, role)
VALUES ('admin_primary', 'kishorek80192@gmail.com', 'admin123', 'admin')
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------------------------
-- 2. Create Users / Customer Accounts Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY DEFAULT ('usr_' || floor(extract(epoch from now()))::text),
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 3. Create Categories Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT DEFAULT '🎈',
    badge TEXT DEFAULT 'POPULAR',
    image TEXT NOT NULL,
    "desc" TEXT,
    subcategories JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 4. Create Products / Packages Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    category_name TEXT,
    subcategory TEXT,
    price NUMERIC NOT NULL,
    original_price NUMERIC,
    discount NUMERIC DEFAULT 0,
    rating NUMERIC DEFAULT 4.9,
    reviews_count INTEGER DEFAULT 100,
    badge TEXT DEFAULT 'BESTSELLER',
    setup_duration TEXT DEFAULT '1.5 - 2 Hours',
    image TEXT NOT NULL,
    gallery JSONB DEFAULT '[]'::jsonb,
    description TEXT,
    inclusions JSONB DEFAULT '[]'::jsonb,
    tags JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 5. Enable Row Level Security (RLS)
-- ------------------------------------------------------------------------------
ALTER TABLE public.admin_auth ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 6. Create Public Policies (Full read/write permissions for web application)
-- ------------------------------------------------------------------------------
-- Admin Auth Policies
DROP POLICY IF EXISTS "Allow public read admin_auth" ON public.admin_auth;
CREATE POLICY "Allow public read admin_auth" ON public.admin_auth FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert admin_auth" ON public.admin_auth;
CREATE POLICY "Allow public insert admin_auth" ON public.admin_auth FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update admin_auth" ON public.admin_auth;
CREATE POLICY "Allow public update admin_auth" ON public.admin_auth FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete admin_auth" ON public.admin_auth;
CREATE POLICY "Allow public delete admin_auth" ON public.admin_auth FOR DELETE USING (true);

-- Users Table Policies
DROP POLICY IF EXISTS "Allow public read users" ON public.users;
CREATE POLICY "Allow public read users" ON public.users FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert users" ON public.users;
CREATE POLICY "Allow public insert users" ON public.users FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update users" ON public.users;
CREATE POLICY "Allow public update users" ON public.users FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete users" ON public.users;
CREATE POLICY "Allow public delete users" ON public.users FOR DELETE USING (true);

-- Categories Policies
DROP POLICY IF EXISTS "Allow public read categories" ON public.categories;
CREATE POLICY "Allow public read categories" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert categories" ON public.categories;
CREATE POLICY "Allow public insert categories" ON public.categories FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update categories" ON public.categories;
CREATE POLICY "Allow public update categories" ON public.categories FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete categories" ON public.categories;
CREATE POLICY "Allow public delete categories" ON public.categories FOR DELETE USING (true);

-- Products Policies
DROP POLICY IF EXISTS "Allow public read products" ON public.products;
CREATE POLICY "Allow public read products" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert products" ON public.products;
CREATE POLICY "Allow public insert products" ON public.products FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update products" ON public.products;
CREATE POLICY "Allow public update products" ON public.products FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete products" ON public.products;
CREATE POLICY "Allow public delete products" ON public.products FOR DELETE USING (true);

-- ------------------------------------------------------------------------------
-- 7. Indexes for High-Performance Queries
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_admin_auth_email ON public.admin_auth(email);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);
CREATE INDEX IF NOT EXISTS idx_products_rating ON public.products(rating);
