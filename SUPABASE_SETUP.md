# Supabase Database Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Click **"Start your project"** or **"Sign up"**
3. Sign up with GitHub (easiest) or email
4. Verify your email if needed

### Step 2: Create a New Project
1. Click **"New Project"**
2. Fill in:
   - **Name**: `QuickIQ` (or any name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to you (e.g., `US East` or `West Europe`)
   - **Pricing Plan**: Free tier is fine
3. Click **"Create new project"**
4. Wait 1-2 minutes for setup to complete

### Step 3: Get Your Connection String
1. In your Supabase project dashboard, click **Settings** (gear icon) on the left
2. Click **Database** under Project Settings
3. Scroll down to **Connection string**
4. Under **Connection pooling**, select **Transaction** mode
5. Copy the connection string (it looks like):
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

### Step 4: Update Your Backend .env File

1. Open `backend/.env` in your project
2. Replace the `DATABASE_URL` line with your Supabase connection string:

```env
DATABASE_URL=postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Important**: Replace `[YOUR-PASSWORD]` with the password you created in Step 2!

### Step 5: Run Database Migrations

Open a terminal in your project root and run:

```bash
cd backend
npm run db:migrate
npm run db:seed
```

You should see:
- ✅ Database schema migrated successfully
- ✅ Database seeded successfully

### Step 6: Verify It Works

1. Refresh http://localhost:3000
2. You should now see test listings (IQ Test, Personality Test, etc.)

## Troubleshooting

**Connection refused error?**
- Make sure you copied the connection string with **Transaction** mode selected
- Verify your password is correct
- Check that your Supabase project is fully set up (wait 2-3 minutes if just created)

**Can't find connection string?**
- Go to: Settings → Database → Connection string
- Make sure you're looking at the **Connection pooling** section, not URI mode

**Still having issues?**
- Restart your backend server after updating .env
- Check Supabase dashboard → Database → Tables to see if tables were created

## Benefits of Supabase

✅ **Visual Database Editor**: View/edit data in the dashboard  
✅ **SQL Editor**: Run SQL queries directly  
✅ **Automatic Backups**: Your data is safe  
✅ **Free Forever**: Generous free tier for development  
✅ **Real-time**: Can add real-time features later if needed  

## Next Steps

Once your database is set up:
1. Your homepage will show all available tests
2. You can create/edit tests via the Supabase dashboard
3. Translations are stored in the database (can be managed via SQL or dashboard)

