export const db = {
    news: [
        { 
            id: 101, 
            title: 'Global Carbon Emissions Show Decline in Q1 2026', 
            category: 'Climate Change', 
            summary: 'The latest report from the International Energy Agency indicates a 3% drop in global carbon emissions compared to last year, driven mainly by the rapid adoption of renewable energy in developing nations.', 
            date: '2026-04-10', 
            image: 'https://images.unsplash.com/photo-1569000971952-6d0b63581174?auto=format&fit=crop&w=800&q=80', 
            trending: true 
        },
        { 
            id: 102, 
            title: 'Major Cities Ban Single-Use Plastics', 
            category: 'Pollution', 
            summary: 'A coalition of 15 major metropolitan areas has officially implemented zero-tolerance policies for single-use plastics, encouraging local businesses to adopt biodegradable alternatives.', 
            date: '2026-04-08', 
            image: 'https://images.unsplash.com/photo-1618477432743-1629d8a39c59?auto=format&fit=crop&w=800&q=80', 
            trending: true 
        },
        { 
            id: 103, 
            title: 'Breakthrough in Solar Panel Efficiency', 
            category: 'Renewable Energy', 
            summary: 'Engineers have developed a new photovoltaic cell capable of 35% efficiency, promising cheaper and more accessible solar power for residential areas over the next decade.', 
            date: '2026-04-05', 
            image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80', 
            trending: false 
        },
        { 
            id: 104, 
            title: 'Endangered Coral Reefs Show Signs of Recovery', 
            category: 'Wildlife', 
            summary: 'Thanks to intense conservation efforts and localized cooling interventions, the Great Barrier Reef is demonstrating the highest coral regeneration rates seen in the past twenty years.', 
            date: '2026-04-01', 
            image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=800&q=80', 
            trending: false 
        },
        { 
            id: 105, 
            title: 'New Microplastic Filtering Tech Shows Promise', 
            category: 'Technology', 
            summary: 'Scientists have unveiled a revolutionary nano-filter capable of removing 99.9% of microplastics from municipal water supplies before it reaches home taps.', 
            date: '2026-03-29', 
            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80', 
            trending: true 
        },
        { 
            id: 106, 
            title: 'Electric Vehicle Sales Outpace Gas Cars Globally', 
            category: 'Transportation', 
            summary: 'For the first time in history, global EV sales have eclipsed traditional combustion engine vehicles in Q2, marking a major milestone in transitioning away from fossil fuels.', 
            date: '2026-03-25', 
            image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80', 
            trending: false 
        },
        { 
            id: 107, 
            title: 'Amazon Deforestation Hits 20-Year Low', 
            category: 'Conservation', 
            summary: 'Government crackdowns on illegal logging and an international coalition of indigenous monitoring groups have resulted in the lowest rate of Amazonian deforestation since 2006.', 
            date: '2026-03-20', 
            image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80', 
            trending: false 
        }
    ],
    actions: [], // User didn't request actions, leaving empty so admin form is used, or maybe I should add 1-2. Let's add 2.
    campaigns: [
        { id: 201, title: 'Earth Day City Cleanup', date: '2026-04-22', location: 'Central Park, NY', type: 'Offline', registered: 450 },
        { id: 202, title: 'Zero Waste Challenge Webinar', date: '2026-04-25', location: 'Zoom', type: 'Online', registered: 1200 }
    ],
    community: [
        { id: 301, author: 'EcoWarrior99', title: 'Switched to Bamboo Products!', content: 'I finally replaced all my bathroom plastics with bamboo alternatives. Surprisingly cheap and looks amazing! Small steps matter.', category: 'Sustainable Living', likes: 142 },
        { id: 302, author: 'GreenTechFan', title: 'My DIY Solar Charger', content: 'Built a small solar rig for my balcony to charge all my devices. It saves a tiny bit on the electricity bill, but it feels great to run on the sun.', category: 'Renewable Energy', likes: 89 }
    ],
    resources: [
        { id: 401, title: 'The Ultimate Guide to Composting', type: 'PDF Guide', url: 'https://www.epa.gov/recycle/composting-home' },
        { id: 402, title: 'Household Energy Efficiency Calculator', type: 'Tool', url: 'https://www.epa.gov/ghgemissions/household-carbon-footprint-calculator' },
        { id: 403, title: 'Understanding Your Carbon Footprint', type: 'Infographic', url: 'https://www.footprintcalculator.org/' },
        { id: 404, title: 'Global Plastic Tracking Dashboard', type: 'Interactive Map', url: 'https://theoceancleanup.com/dashboard/' },
        { id: 405, title: 'Earth911 Recycling Locator Center', type: 'Tool', url: 'https://search.earth911.com/' },
        { id: 406, title: 'WWF Renewable Energy Overview', type: 'Guide', url: 'https://www.worldwildlife.org/initiatives/renewable-energy' }
    ]
};

// Add some default actions just to make Take Action page look nice
db.actions = [
    { id: 501, title: 'Use a reusable water bottle for a week', difficulty: 'Easy', impact: 'Medium', points: 20 },
    { id: 502, title: 'Switch to energy-efficient LED bulbs', difficulty: 'Easy', impact: 'Medium', points: 30 },
    { id: 503, title: 'Commute via bike or public transit', difficulty: 'Medium', impact: 'High', points: 50 },
    { id: 504, title: 'Start a home composting bin', difficulty: 'Hard', impact: 'High', points: 100 }
];

export const userState = {
    isLoggedIn: false,
    user: null, 
    savedArticles: [],
    completedActions: [],
    joinedCampaigns: []
};

export function initStore() {
    const localUser = localStorage.getItem('ecoUser');
    if (localUser) {
        Object.assign(userState, JSON.parse(localUser));
    }
    const localDb = localStorage.getItem('ecoDb');
    if (localDb) {
        const parsed = JSON.parse(localDb);
        // Only load from LocalStorage if there are items, otherwise keep our new default data!
        // This ensures the site is beautifully populated while still allowing appending via admin panel.
        // We will merge them so admin-added items aren't overwritten.
        
        if (parsed.news?.length > 0) db.news = [...parsed.news.filter(n => !db.news.some(dn => dn.id === n.id)), ...db.news];
        if (parsed.actions?.length > 0) db.actions = [...parsed.actions.filter(a => !db.actions.some(da => da.id === a.id)), ...db.actions];
        if (parsed.campaigns?.length > 0) db.campaigns = [...parsed.campaigns.filter(c => !db.campaigns.some(dc => dc.id === c.id)), ...db.campaigns];
        if (parsed.community?.length > 0) db.community = [...parsed.community.filter(c => !db.community.some(dc => dc.id === c.id)), ...db.community];
        if (parsed.resources?.length > 0) db.resources = [...parsed.resources.filter(r => !db.resources.some(dr => dr.id === r.id)), ...db.resources];
    }
}

export function saveUserState() {
    localStorage.setItem('ecoUser', JSON.stringify(userState));
}

export function saveDbState() {
    localStorage.setItem('ecoDb', JSON.stringify(db));
}

export function toggleSavedArticle(id) {
    if (!userState.isLoggedIn) return { success: false, msg: 'Please log in to save articles' };
    const idx = userState.savedArticles.indexOf(id);
    if (idx > -1) {
        userState.savedArticles.splice(idx, 1);
        saveUserState();
        return { success: true, saved: false, msg: 'Article removed' };
    } else {
        userState.savedArticles.push(id);
        saveUserState();
        return { success: true, saved: true, msg: 'Article saved' };
    }
}

export function toggleActionComplete(id, points) {
    if (!userState.isLoggedIn) return { success: false, msg: 'Please log in to track actions' };
    const idx = userState.completedActions.indexOf(id);
    if (idx > -1) {
        userState.completedActions.splice(idx, 1);
        userState.user.points -= points;
        saveUserState();
        return { success: true, completed: false, msg: 'Action unmarked' };
    } else {
        userState.completedActions.push(id);
        userState.user.points += points;
        saveUserState();
        return { success: true, completed: true, msg: 'Action completed! Points earned!' };
    }
}

export function joinCampaign(id) {
    if (!userState.isLoggedIn) return { success: false, msg: 'Please log in to join' };
    if (!userState.joinedCampaigns.includes(id)) {
        userState.joinedCampaigns.push(id);
        saveUserState();
        return { success: true, msg: 'Successfully registered for campaign' };
    }
    return { success: false, msg: 'Already registered' };
}
