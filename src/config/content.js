export const locations = [
    {
        slug: 'university-place-cafeteria',
        title: 'University Place Cafeteria',
        display_order: 1,
        poster_url: 'assets/images/station_01_poster.png', // Fallback/Default
        map_visual_url: 'assets/images/station_01_map.png',
        story: 'The Gathering. The starting point.',
        description: 'Lunch and opening remarks. Stay seated for orientation, then we transition together.',
        action_type: 'form',
        form_url: '', // To be filled by user or left empty
        qr_instruction: 'Scan QR in room to respond',
        volunteer_script: 'Welcome to the Gathering. This is where we orient ourselves before the work begins. Please feel free to listen to the remarks and find your group.'
    },
    {
        slug: 'alumni-auditorium',
        title: 'Alumni Auditorium',
        display_order: 2,
        poster_url: 'assets/images/station_02_poster.png',
        map_visual_url: 'assets/images/station_02_map.png',
        story: 'The Threshold.',
        description: 'Reflective experience “The Threshold.” Quiet entry, observe or participate, scan QR reflections if you choose.',
        action_type: 'form',
        form_url: '',
        qr_instruction: 'Scan QR in room to respond',
        volunteer_script: 'This is The Threshold. It is a space of history and confrontation. We invite you to enter quietly and observe.'
    },
    {
        slug: 'harris-hall',
        title: 'Harris Hall',
        display_order: 3,
        poster_url: 'assets/images/station_03_poster.png',
        map_visual_url: 'assets/images/station_03_map.png',
        story: 'The Processing.',
        description: 'Art and processing space. “I Belong Here” community hand mural. Trace your hand, add it to the mural at your pace.',
        action_type: 'form',
        form_url: '',
        qr_instruction: 'Scan QR in room to respond',
        volunteer_script: 'Welcome to the Processing space. You are invited to reflect and add your mark to the community wall.'
    },
    {
        slug: 'latham-hall',
        title: 'Latham Hall',
        display_order: 4,
        poster_url: 'assets/images/station_04_poster.png',
        map_visual_url: 'assets/images/station_04_map.png',
        story: 'The Reflection.',
        description: 'Digital collection. Add one short line at any station to help create a community poem and song.',
        action_type: 'link',
        link_to: '/latham-stations',
        button_text: 'Enter the 5 Stations',
        volunteer_script: 'This is the Reflection zone. Here you will find the 5 Stations of Preparation. You may visit them in any order.'
    }
];

export const lathamStations = [
    {
        slug: 'belief',
        title: 'Belief',
        prompt: 'We believe…',
        poster_url: 'assets/images/station-01-belief.png',
        form_url: 'https://docs.google.com/forms/d/e/1FAIpQLSd9abcde123/viewform' // Placeholder or needs wiring
    },
    {
        slug: 'listening',
        title: 'Listening',
        prompt: 'We listen when…',
        poster_url: 'assets/images/station-04-listening.png',
        form_url: ''
    },
    {
        slug: 'courage',
        title: 'Courage',
        prompt: 'We refuse to…',
        poster_url: 'assets/images/station-02-courage.png',
        form_url: ''
    },
    {
        slug: 'identity',
        title: 'Identity',
        prompt: 'We name ourselves…',
        poster_url: 'assets/images/station-03-identity.png',
        form_url: ''
    },
    {
        slug: 'preparation',
        title: 'Preparation',
        prompt: 'We prepare by…',
        poster_url: 'assets/images/station-05-preparation.png',
        form_url: ''
    }
];
