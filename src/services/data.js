import { locations, lathamStations } from '../config/content';

export async function getCreateLocations() {
    // Return static locations from config
    return locations;
}

export async function getCreateStations() {
    // Return static lathamStations from config
    // Note: The UI expects "stations" to be the 5 sub-stations in Latham Hall 
    // or the building stations? 
    // The prompt says "Latham Hall has exactly 5 stations...". 
    // Previous code had "stations" as the buildings themselves in some contexts, 
    // but the new requirement separates "Building Detail" vs "Latham Stations".
    // content.js defines lathamStations as the 5 stations.

    // We map them to match expected shape if needed, but for now passing through.
    return lathamStations;
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

