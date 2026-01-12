
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase keys (URL or Service Role) in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

const seedPath = path.join(__dirname, '../src/services/seed.json');
const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

async function seed() {
    console.log('Seeding Database from:', seedPath);

    // 1. Locations
    const locations = seedData.filter(item => !item.type);
    console.log(`Found ${locations.length} locations.`);

    // We upsert based on slug to avoid duplicates
    for (const loc of locations) {
        const { error } = await supabase
            .from('locations')
            .upsert({
                slug: loc.slug,
                title: loc.title,
                poster_url: loc.poster_url,
                story: loc.story,
                youtube_url: loc.youtube_url,
                display_order: loc.display_order,
                is_published: true
            }, { onConflict: 'slug' });

        if (error) console.error('Error upserting location:', loc.slug, error);
        else console.log('Upserted location:', loc.slug);
    }

    // 2. Stations
    const stations = seedData.filter(item => item.type === 'station');
    console.log(`Found ${stations.length} stations.`);

    for (const st of stations) {
        const { error } = await supabase
            .from('stations')
            .upsert({
                slug: st.slug,
                title: st.title,
                poster_url: st.poster_url,
                description: st.description,
                youtube_url: st.youtube_url,
                display_order: st.display_order,
                is_published: true
            }, { onConflict: 'slug' });

        if (error) console.error('Error upserting station:', st.slug, error);
        else console.log('Upserted station:', st.slug);
    }

    console.log('Seeding Complete.');
}

seed();
