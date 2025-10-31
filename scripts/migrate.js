// Simple migration runner for local development
// For production, run migrations directly in Supabase SQL editor

const fs = require('fs');
const path = require('path');

console.log('📦 Migration script');
console.log('');
console.log('For Supabase projects, run migrations in the SQL Editor:');
console.log('1. Go to your Supabase dashboard');
console.log('2. Navigate to SQL Editor');
console.log('3. Copy contents of supabase/migrations/001_initial_schema.sql');
console.log('4. Run the migration');
console.log('');

const migrationPath = path.join(__dirname, '../supabase/migrations/001_initial_schema.sql');
if (fs.existsSync(migrationPath)) {
  const migration = fs.readFileSync(migrationPath, 'utf-8');
  console.log('Migration contents:');
  console.log('---');
  console.log(migration);
  console.log('---');
} else {
  console.error('❌ Migration file not found');
}
