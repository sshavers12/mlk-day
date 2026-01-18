export const locations = [
    {
        slug: 'university-place-cafeteria', // Keeping slug stable
        title: 'Widener University – Webb Room',
        display_order: 1,
        poster_url: 'assets/images/station_01_poster.png',
        map_visual_url: 'assets/images/station_01_map.png',
        story: 'The Gathering. The starting point.',
        description: 'Afternoon remarks. Stay seated for orientation. We transition together.',
        action_type: 'none',
        form_url: '',
        qr_instruction: 'Listen to remarks',
        volunteer_script: 'Welcome to the Gathering. This is where we orient ourselves before the work begins. Please feel free to listen to the remarks and find your group.',
        video_url: '' // No video
    },
    {
        slug: 'alumni-auditorium',
        title: 'Alumni Auditorium', // "The Threshold" can be in description or subtitle, keeping title clean as per new request "Alumni Auditorium"
        display_order: 2,
        poster_url: 'assets/images/station_02_poster.png',
        map_visual_url: 'assets/images/station_02_map.png',
        story: 'The Threshold.',
        description: 'This space features a curated educational video exploring racial segregation during the Jim Crow era. Visitors may observe quietly or participate by sharing a reflection using the QR code provided. Presented for educational and historical understanding.',
        action_type: 'form',
        form_url: 'https://forms.gle/h9mDQD6VmSKXudCy8',
        qr_instruction: 'After viewing the video, scan the QR code to answer a few short reflection questions.',
        volunteer_script: 'This is The Threshold. It is a space of history and confrontation. We invite you to enter quietly and observe.',
        video_url: 'https://player.vimeo.com/video/328684375?h=1eb2a8afb9' // Embedded format
    },
    {
        slug: 'harris-hall', // Keeping slug stable
        title: 'Harris Commons',
        display_order: 3,
        poster_url: 'assets/images/station_03_poster.png',
        map_visual_url: 'assets/images/station_03_map.png',
        story: 'The Processing.',
        description: 'Art and processing space. Community reflection. Observe or participate at your own pace.',
        action_type: 'form',
        form_url: 'https://forms.gle/AZkjHyJomud5kSWB9',
        qr_instruction: 'Scan QR in room to respond',
        volunteer_script: 'Welcome to the Processing space. You are invited to reflect and add your mark to the community wall.',
        video_url: 'https://www.youtube.com/embed/ARvrvJV4th4' // Embedded format
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
        volunteer_script: 'This is the Reflection zone. Here you will find the 5 Stations of Preparation. You may visit them in any order.',
        form_url: 'https://forms.gle/RovCjyBRKCiAzsus5', // General reflection QR
        video_url: '' // No video
    }
];

export const lathamStations = [
    {
        slug: 'belief',
        title: 'Belief',
        prompt: 'We believe…',
        poster_url: 'assets/images/station-01-belief.png',
        form_url: 'https://forms.gle/4qUPwmwY72iuqDiF8'
    },
    {
        slug: 'listening',
        title: 'Listening',
        prompt: 'We listen when…',
        poster_url: 'assets/images/station-04-listening.png',
        form_url: 'https://forms.gle/QXui3Unys5rZQ2RV8'
    },
    {
        slug: 'courage',
        title: 'Courage',
        prompt: 'We refuse to…',
        poster_url: 'assets/images/station-02-courage.png',
        form_url: 'https://forms.gle/wWNAwXVegBir5Ags5'
    },
    {
        slug: 'identity',
        title: 'Identity',
        prompt: 'We name ourselves…',
        poster_url: 'assets/images/station-03-identity.png',
        form_url: 'https://forms.gle/z8UGRukU9v9mgH1s7'
    },
    {
        slug: 'preparation',
        title: 'Preparation',
        prompt: 'We prepare by…',
        poster_url: 'assets/images/station-05-preparation.png',
        form_url: 'https://forms.gle/6x8UYfP2j9BLyLTQ6'
    }
];
