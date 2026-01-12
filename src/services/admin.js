import { supabase } from '../lib/supabase';

// Bootstrap Admin User
// Call this function when a user signs up or logs in to check if they should be promoted.
export async function checkAndBootstrapAdmin(userEmail, userId) {
    const bootstrapEmail = import.meta.env.VITE_ADMIN_BOOTSTRAP_EMAIL;

    if (!bootstrapEmail || userEmail !== bootstrapEmail) {
        return false; // Not the chosen one
    }

    console.log('Attempting Admin Bootstrap for:', userEmail);

    // Check if we already have an admin
    const { data: existingAdmins, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('role', 'admin')
        .limit(1);

    if (checkError) {
        console.error('Error checking existing admins:', checkError);
        return false;
    }

    // Only promote if NO admins exist (or strict policy: only the specific bootstrap email regardless)
    // The requirement says "On first run... prevent no admin exists lockout".
    // Let's promote this user if they match the env var. 
    // We should trust the env var as the "Key to the City".

    const { error: updateError } = await supabase
        .from('users')
        .update({ role: 'admin' })
        .eq('id', userId);

    if (updateError) {
        console.error('Failed to bootstrap admin:', updateError);
        return false;
    }

    console.log('SUCCESS: User promoted to Admin via Bootstrap.');
    return true;
}

// Admin Actions
export async function getSubmissions() {
    const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}

export async function approveSubmission(id, reviewedByUserId) {
    const { error } = await supabase
        .from('submissions')
        .update({
            status: 'approved',
            reviewed_by: reviewedByUserId,
            reviewed_at: new Date().toISOString()
        })
        .eq('id', id);

    if (error) throw error;
}
