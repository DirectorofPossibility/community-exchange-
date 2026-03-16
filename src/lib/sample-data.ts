/**
 * Community Exchange — Sample Data & Constants
 *
 * Architecture:
 *   - 7 Pathways (thematic lenses): health, families, neighborhood, voice, money, planet, bigger-we
 *   - 4 Centers (user-intent modes): Learning, Resource, Action, Accountability
 *   Every activity is organized by pathway and shows which centers are available.
 */

export const PATHWAYS = [
  { id: 'health', name: 'Health & Wellness', color: 'health', description: 'Care for yourself and your community' },
  { id: 'families', name: 'Families & Education', color: 'families', description: 'Strengthen the next generation' },
  { id: 'hood', name: 'Our Neighborhood', color: 'hood', description: 'Build where you live' },
  { id: 'voice', name: 'Our Voice', color: 'voice', description: 'Speak up and be heard' },
  { id: 'money', name: 'Economic Security', color: 'money', description: 'Build wealth and opportunity' },
  { id: 'planet', name: 'Our Planet', color: 'planet', description: 'Protect our shared home' },
  { id: 'bigger', name: 'The Bigger We', color: 'bigger', description: 'Connect across differences' },
] as const

export type PathwayId = (typeof PATHWAYS)[number]['id']

/**
 * The 4 Centers — user-intent modes that cut across all pathways.
 * Each center answers a distinct question a community member might ask.
 */
export const CENTERS = [
  { id: 'learning', name: 'Learning', question: 'How can I understand?', color: 'learning', icon: 'BookOpen' },
  { id: 'resource', name: 'Resource', question: "What's available to me?", color: 'resource', icon: 'Compass' },
  { id: 'action', name: 'Action', question: 'How can I help?', color: 'action', icon: 'Heart' },
  { id: 'accountability', name: 'Accountability', question: 'Who makes decisions?', color: 'accountability', icon: 'Scale' },
] as const

export type CenterId = (typeof CENTERS)[number]['id']

/** What's available under each center for a given activity */
export interface CenterContent {
  learning?: { title: string; description: string }[]
  resource?: { title: string; org: string; url?: string }[]
  action?: { title: string; description: string; type: 'volunteer' | 'event' | 'service' }[]
  accountability?: { title: string; role: string; level: string }[]
}

export interface Activity {
  id: string
  title: string
  pathway: PathwayId
  org: string
  description: string
  /** Which of the 4 centers are active for this activity */
  centers: Record<CenterId, boolean>
  /** Sample content within each center */
  centerContent: CenterContent
}

export const SAMPLE_ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Know Your Air Quality Rights',
    pathway: 'health',
    org: 'Houston Health Department',
    description: 'Learn how to check air quality in your neighborhood and what to do on high-pollution days.',
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Air Quality 101', description: 'What AQI levels mean and how they affect your health' },
        { title: 'Houston\'s Air Quality History', description: 'How pollution patterns have shifted over the past decade' },
      ],
      resource: [
        { title: 'AirNow.gov — Real-time AQI', org: 'EPA' },
        { title: 'Houston Health Dept Air Monitoring', org: 'City of Houston' },
      ],
      action: [
        { title: 'Report an Air Quality Concern', description: 'File a complaint with TCEQ', type: 'service' },
      ],
    },
  },
  {
    id: '2',
    title: 'Attend a School Board Meeting',
    pathway: 'families',
    org: 'Houston ISD',
    description: 'Your voice matters in education decisions. Find your next meeting and learn how to participate.',
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'How School Boards Work', description: 'Understanding the role of elected trustees in your district' },
      ],
      resource: [
        { title: 'HISD Meeting Calendar', org: 'Houston ISD' },
        { title: 'Parent University', org: 'Houston ISD' },
      ],
      action: [
        { title: 'Sign Up to Speak at Next Meeting', description: 'Public comment registration for HISD board meetings', type: 'event' },
        { title: 'Join a Campus Advisory Committee', description: 'Serve on your school\'s advisory team', type: 'volunteer' },
      ],
      accountability: [
        { title: 'HISD Board of Trustees', role: 'School Board Member', level: 'School District' },
      ],
    },
  },
  {
    id: '3',
    title: 'Start a Block Cleanup',
    pathway: 'hood',
    org: 'Keep Houston Beautiful',
    description: 'Organize neighbors for a cleanup. We provide supplies, you bring the energy.',
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'How to Organize a Block Cleanup', description: 'Step-by-step guide from experienced block captains' },
      ],
      resource: [
        { title: 'Free Cleanup Supply Kits', org: 'Keep Houston Beautiful' },
        { title: 'Solid Waste Dept — Bulk Pickup', org: 'City of Houston' },
      ],
      action: [
        { title: 'Request Cleanup Supplies', description: 'Order trash bags, gloves, and vests for your group', type: 'service' },
        { title: 'Register Your Cleanup Event', description: 'Get your event on the city calendar', type: 'event' },
      ],
    },
  },
  {
    id: '4',
    title: 'Call Your City Council Member',
    pathway: 'voice',
    org: 'City of Houston',
    description: 'Use our script builder to make your first call about an issue you care about.',
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'How City Council Works', description: 'Understanding Houston\'s strong mayor system and council roles' },
        { title: 'How to Make an Effective Call', description: 'Tips from advocates who\'ve made hundreds of calls' },
      ],
      resource: [
        { title: 'Find Your Council District', org: 'City of Houston' },
        { title: 'Council Meeting Agendas', org: 'City of Houston' },
      ],
      action: [
        { title: 'Use the Script Builder', description: 'Build a personalized call script for your issue', type: 'service' },
        { title: 'Attend a Town Hall', description: 'Meet your council member in person', type: 'event' },
      ],
      accountability: [
        { title: 'Houston City Council', role: 'Council Member', level: 'City' },
        { title: 'Mayor\'s Office', role: 'Mayor', level: 'City' },
      ],
    },
  },
  {
    id: '5',
    title: 'Find Emergency Utility Assistance',
    pathway: 'money',
    org: 'BakerRipley',
    description: 'Get help with electricity, water, or gas bills before disconnection.',
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Know Your Disconnection Rights', description: 'Texas utility regulations that protect you' },
      ],
      resource: [
        { title: 'CEAP — Energy Assistance', org: 'BakerRipley' },
        { title: 'LITE-UP Texas Discount', org: 'PUC of Texas' },
        { title: 'United Way 211 Helpline', org: 'United Way' },
      ],
      action: [
        { title: 'Apply for Utility Assistance', description: 'Start your application for emergency bill help', type: 'service' },
      ],
    },
  },
  {
    id: '6',
    title: 'Report Illegal Dumping',
    pathway: 'planet',
    org: 'Harris County Pollution Control',
    description: 'See something? Report it. Track the response. Hold agencies accountable.',
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Illegal Dumping in Houston', description: 'The scope of the problem and what\'s being done' },
      ],
      resource: [
        { title: 'Houston 311 — Report Dumping', org: 'City of Houston' },
        { title: 'Pollution Control Services', org: 'Harris County' },
      ],
      action: [
        { title: 'File a Dumping Report', description: 'Submit photos and location via 311 or the app', type: 'service' },
        { title: 'Join a Waterway Cleanup', description: 'Volunteer events along bayous and creeks', type: 'volunteer' },
      ],
      accountability: [
        { title: 'Harris County Pollution Control', role: 'Director', level: 'County' },
        { title: 'TCEQ Regional Office', role: 'Regional Director', level: 'State' },
      ],
    },
  },
  {
    id: '7',
    title: 'Join a Neighborhood Association',
    pathway: 'bigger',
    org: 'Super Neighborhoods Council',
    description: 'Connect with neighbors who are already working to improve your area.',
    centers: { learning: true, resource: false, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'What Are Super Neighborhoods?', description: 'Houston\'s 88 community planning areas explained' },
      ],
      action: [
        { title: 'Find Your Super Neighborhood', description: 'Look up which council covers your address', type: 'service' },
        { title: 'Attend a Super Neighborhood Meeting', description: 'Monthly meetings open to all residents', type: 'event' },
      ],
      accountability: [
        { title: 'Super Neighborhood Council', role: 'President', level: 'City' },
      ],
    },
  },
  {
    id: '8',
    title: 'Get a Free Health Screening',
    pathway: 'health',
    org: 'Memorial Hermann Community Benefit',
    description: 'Find free blood pressure, diabetes, and cholesterol screenings near you.',
    centers: { learning: true, resource: true, action: false, accountability: false },
    centerContent: {
      learning: [
        { title: 'Why Preventive Screenings Matter', description: 'Early detection saves lives and money' },
      ],
      resource: [
        { title: 'Free Screening Locations', org: 'Memorial Hermann' },
        { title: 'Harris Health Community Clinics', org: 'Harris Health System' },
      ],
    },
  },
  {
    id: '9',
    title: 'Register to Vote',
    pathway: 'voice',
    org: 'Harris County Elections',
    description: 'Check your registration status, find your polling place, and know your deadlines.',
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Voting in Texas — What to Know', description: 'ID requirements, registration deadlines, and early voting' },
        { title: 'Understanding Your Ballot', description: 'What offices and propositions you\'ll see' },
      ],
      resource: [
        { title: 'Harris County Elections Office', org: 'Harris County' },
        { title: 'Vote.org Registration Check', org: 'Vote.org' },
      ],
      action: [
        { title: 'Register to Vote Online', description: 'Texas voter registration application', type: 'service' },
        { title: 'Become a Poll Worker', description: 'Get paid to serve your community on Election Day', type: 'volunteer' },
      ],
      accountability: [
        { title: 'Harris County Elections Administrator', role: 'Elections Administrator', level: 'County' },
        { title: 'Texas Secretary of State', role: 'Secretary of State', level: 'State' },
      ],
    },
  },
]

/**
 * Color map for dynamic Tailwind class usage.
 * Tailwind purges unused classes at build time, so we must use complete
 * class name strings — never interpolated fragments like `bg-${color}`.
 */
export const PATHWAY_COLOR_MAP: Record<string, { bg: string; bgLight: string; border: string; borderLeft: string; borderTop: string; text: string; ring: string }> = {
  health:   { bg: 'bg-health',   bgLight: 'bg-health-lt',  border: 'border-health',   borderLeft: 'border-l-health',   borderTop: 'border-t-health',   text: 'text-health',   ring: 'ring-health' },
  families: { bg: 'bg-families', bgLight: 'bg-blue-bg',    border: 'border-families', borderLeft: 'border-l-families', borderTop: 'border-t-families', text: 'text-families', ring: 'ring-families' },
  hood:     { bg: 'bg-hood',     bgLight: 'bg-paper',      border: 'border-hood',     borderLeft: 'border-l-hood',     borderTop: 'border-t-hood',     text: 'text-hood',     ring: 'ring-hood' },
  voice:    { bg: 'bg-voice',    bgLight: 'bg-paper',      border: 'border-voice',    borderLeft: 'border-l-voice',    borderTop: 'border-t-voice',    text: 'text-voice',    ring: 'ring-voice' },
  money:    { bg: 'bg-money',    bgLight: 'bg-paper',      border: 'border-money',    borderLeft: 'border-l-money',    borderTop: 'border-t-money',    text: 'text-money',    ring: 'ring-money' },
  planet:   { bg: 'bg-planet',   bgLight: 'bg-paper',      border: 'border-planet',   borderLeft: 'border-l-planet',   borderTop: 'border-t-planet',   text: 'text-planet',   ring: 'ring-planet' },
  bigger:   { bg: 'bg-bigger',   bgLight: 'bg-paper',      border: 'border-bigger',   borderLeft: 'border-l-bigger',   borderTop: 'border-t-bigger',   text: 'text-bigger',   ring: 'ring-bigger' },
}

export const CENTER_COLOR_MAP: Record<string, { bg: string; border: string; text: string; hex: string }> = {
  learning:        { bg: 'bg-learning',        border: 'border-learning',        text: 'text-learning',        hex: '#2563eb' },
  resource:        { bg: 'bg-resource',         border: 'border-resource',        text: 'text-resource',        hex: '#16a34a' },
  action:          { bg: 'bg-action',           border: 'border-action',          text: 'text-action',          hex: '#dc2626' },
  accountability:  { bg: 'bg-accountability',   border: 'border-accountability',  text: 'text-accountability',  hex: '#9333ea' },
}
