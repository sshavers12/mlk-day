import { supabase } from '../lib/supabase';
import seedData from './seed.json';

const isSupabaseConfigured = () => {
    const url = import.meta.env.VITE_SUPABASE_URL;
    return url && !url.includes('placeholder') && !url.includes('YOUR_SUPABASE_URL');
};

export async function getCreateLocations() {
    if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured. Serving from local seed.');
        return seedData.filter(item => !item.type); // Locations usually don't have 'type' or use different filtering if needed. 
        // Based on seed.json, locations are the first 4 items without "type": "station"
    }

    const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('is_published', true)
        .order('display_order');

    if (error || !data || data.length === 0) {
        if (error) console.error('Error fetching locations:', error);
        return seedData.filter(item => !item.type);
    }
    return data;
}

export async function getCreateStations() {
    if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured. Serving from local seed.');
        return seedData.filter(item => item.type === 'station');
    }

    const { data, error } = await supabase
        .from('stations')
        .select('*')
        .eq('is_published', true)
        .order('display_order');

    if (error || !data || data.length === 0) {
        if (error) console.error('Error fetching stations:', error);
        return seedData.filter(item => item.type === 'station');
    }
    return data;
}

export async function getCreateAnnouncements() {
    if (!isSupabaseConfigured()) {
        return [];
    }

    const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_published', true)
        .gt('ends_at', new Date().toISOString())
        .order('starts_at', { ascending: false });

    if (error) {
        console.error('Error fetching announcements:', error);
        return [];
    }
    return data || [];
}

