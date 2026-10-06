-- ==============================================================================
-- Celebration Events - Supabase Database Schema
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/wqnobkskmvilfhduvxsu/sql/new
-- ==============================================================================

-- 1. Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT DEFAULT '🎈',
    badge TEXT DEFAULT 'POPULAR',
    image TEXT NOT NULL,
    "desc" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Products / Packages Table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    category_name TEXT,
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

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 4. Create Public Policies (Allow read/write with anon key)
DROP POLICY IF EXISTS "Allow public read categories" ON public.categories;
CREATE POLICY "Allow public read categories" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert categories" ON public.categories;
CREATE POLICY "Allow public insert categories" ON public.categories FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update categories" ON public.categories;
CREATE POLICY "Allow public update categories" ON public.categories FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete categories" ON public.categories;
CREATE POLICY "Allow public delete categories" ON public.categories FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow public read products" ON public.products;
CREATE POLICY "Allow public read products" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert products" ON public.products;
CREATE POLICY "Allow public insert products" ON public.products FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update products" ON public.products;
CREATE POLICY "Allow public update products" ON public.products FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete products" ON public.products;
CREATE POLICY "Allow public delete products" ON public.products FOR DELETE USING (true);

-- 5. Indexes for fast category search and slug lookups
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);
CREATE INDEX IF NOT EXISTS idx_products_rating ON public.products(rating);

-- 6. Subcategories schema upgrade (Run if upgrading existing tables)
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS subcategories JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS subcategory TEXT;
