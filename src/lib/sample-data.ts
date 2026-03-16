/**
 * Community Exchange — Houston Metro Activities & Constants
 *
 * Architecture:
 *   - 7 Pathways (thematic lenses): health, families, neighborhood, voice, money, planet, bigger-we
 *   - 4 Centers (user-intent modes): Learning, Resource, Action, Accountability
 *   - Location: every activity is anchored to a physical place (address, city, county, zip)
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

/** Location anchor for every activity */
export interface Location {
  address: string
  city: string
  state: string
  zip: string
  county: string
}

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
  location: Location
  /** Which of the 4 centers are active for this activity */
  centers: Record<CenterId, boolean>
  /** Content within each center */
  centerContent: CenterContent
}

// ─────────────────────────────────────────────────
// Houston (City of Houston — Harris County)
// ─────────────────────────────────────────────────

export const SAMPLE_ACTIVITIES: Activity[] = [
  // ── HOUSTON — DOWNTOWN / MIDTOWN ──
  {
    id: 'hou-1',
    title: 'Know Your Air Quality Rights',
    pathway: 'health',
    org: 'Houston Health Department',
    description: 'Learn how to check air quality in your neighborhood and what to do on high-pollution days.',
    location: { address: '8000 N Stadium Dr', city: 'Houston', state: 'TX', zip: '77054', county: 'Harris' },
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
    id: 'hou-2',
    title: 'Call Your City Council Member',
    pathway: 'voice',
    org: 'City of Houston',
    description: 'Use our script builder to make your first call about an issue you care about.',
    location: { address: '901 Bagby St', city: 'Houston', state: 'TX', zip: '77002', county: 'Harris' },
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
    id: 'hou-3',
    title: 'Free Legal Aid Clinic',
    pathway: 'money',
    org: 'Houston Volunteer Lawyers',
    description: 'Get free legal advice on landlord-tenant disputes, debt collection, family law, and immigration.',
    location: { address: '1111 Bagby St Ste 2500', city: 'Houston', state: 'TX', zip: '77002', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Know Your Tenant Rights', description: 'Texas property code protections every renter should know' },
        { title: 'Debt Collection Basics', description: 'What collectors can and cannot do under Texas law' },
      ],
      resource: [
        { title: 'Houston Volunteer Lawyers', org: 'Houston Bar Association' },
        { title: 'Lone Star Legal Aid', org: 'Lone Star Legal Aid' },
        { title: 'South Texas College of Law Clinic', org: 'South Texas College of Law' },
      ],
      action: [
        { title: 'Schedule a Free Consultation', description: 'Book a 30-minute session with a volunteer attorney', type: 'service' },
      ],
    },
  },
  {
    id: 'hou-4',
    title: 'Register to Vote',
    pathway: 'voice',
    org: 'Harris County Elections',
    description: 'Check your registration status, find your polling place, and know your deadlines.',
    location: { address: '1001 Preston St', city: 'Houston', state: 'TX', zip: '77002', county: 'Harris' },
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

  // ── HOUSTON — THIRD WARD / SOUTH UNION ──
  {
    id: 'hou-5',
    title: 'Community Health Fair at Emancipation Park',
    pathway: 'health',
    org: 'Emancipation Economic Development Council',
    description: 'Free health screenings, dental checks, nutrition info, and wellness resources for Third Ward residents.',
    location: { address: '3018 Emancipation Ave', city: 'Houston', state: 'TX', zip: '77004', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Preventive Health in Third Ward', description: 'Community health data and what screenings catch early' },
        { title: 'Nutrition on a Budget', description: 'Affordable healthy eating strategies for Houston families' },
      ],
      resource: [
        { title: 'Harris Health Community Clinics', org: 'Harris Health System' },
        { title: 'Third Ward Multi-Service Center', org: 'City of Houston' },
        { title: 'Project Row Houses Health Programs', org: 'Project Row Houses' },
      ],
      action: [
        { title: 'Get a Free Screening', description: 'Walk-in blood pressure, glucose, and cholesterol checks', type: 'service' },
        { title: 'Volunteer at the Health Fair', description: 'Help with registration and resource distribution', type: 'volunteer' },
      ],
    },
  },
  {
    id: 'hou-6',
    title: 'Attend a School Board Meeting',
    pathway: 'families',
    org: 'Houston ISD',
    description: 'Your voice matters in education decisions. Find your next meeting and learn how to participate.',
    location: { address: '4400 W 18th St', city: 'Houston', state: 'TX', zip: '77092', county: 'Harris' },
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
        { title: 'HISD Board of Managers', role: 'Board Member', level: 'School District' },
        { title: 'Texas Education Agency', role: 'Commissioner', level: 'State' },
      ],
    },
  },

  // ── HOUSTON — EAST END / MAGNOLIA PARK ──
  {
    id: 'hou-7',
    title: 'East End Community Garden',
    pathway: 'planet',
    org: 'Urban Harvest',
    description: 'Grow food, build community. Join a garden plot or volunteer at monthly workdays.',
    location: { address: '2311 Canal St', city: 'Houston', state: 'TX', zip: '77003', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Urban Gardening in Houston', description: 'What grows well in our climate and soil' },
        { title: 'Composting 101', description: 'Turn food scraps into garden gold' },
      ],
      resource: [
        { title: 'Urban Harvest Garden Network', org: 'Urban Harvest' },
        { title: 'Harris County AgriLife Extension', org: 'Texas A&M AgriLife' },
      ],
      action: [
        { title: 'Reserve a Garden Plot', description: 'Apply for a raised bed at the East End community garden', type: 'service' },
        { title: 'Volunteer at Monthly Workday', description: 'Help maintain shared spaces on the first Saturday', type: 'volunteer' },
      ],
    },
  },
  {
    id: 'hou-8',
    title: 'Navegando el Sistema Escolar',
    pathway: 'families',
    org: 'AVANCE Houston',
    description: 'Bilingual workshop series helping parents navigate school enrollment, parent-teacher conferences, and special education services.',
    location: { address: '7000 Harrisburg Blvd', city: 'Houston', state: 'TX', zip: '77011', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Understanding School Choice in HISD', description: 'Magnet schools, transfers, and charter options explained' },
        { title: 'Special Education Rights', description: 'Your child\'s rights under IDEA and Section 504' },
      ],
      resource: [
        { title: 'AVANCE Parent-Child Education Program', org: 'AVANCE' },
        { title: 'Multicultural Education & Counseling', org: 'MECA' },
        { title: 'East End Literacy Center', org: 'BakerRipley' },
      ],
      action: [
        { title: 'Register for Next Workshop', description: 'Free bilingual sessions every other Saturday', type: 'event' },
        { title: 'Become a Parent Mentor', description: 'Trained parents helping other families navigate the system', type: 'volunteer' },
      ],
    },
  },

  // ── HOUSTON — HEIGHTS / NORTHSIDE ──
  {
    id: 'hou-9',
    title: 'Start a Block Cleanup',
    pathway: 'hood',
    org: 'Keep Houston Beautiful',
    description: 'Organize neighbors for a cleanup. We provide supplies, you bring the energy.',
    location: { address: '2600 White Oak Dr', city: 'Houston', state: 'TX', zip: '77007', county: 'Harris' },
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
    id: 'hou-10',
    title: 'Northside Financial Coaching',
    pathway: 'money',
    org: 'Avenue CDC',
    description: 'One-on-one coaching on budgeting, credit building, and saving for homeownership.',
    location: { address: '5900 Canal St', city: 'Houston', state: 'TX', zip: '77011', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Credit Score Basics', description: 'What makes up your score and how to improve it' },
        { title: 'First-Time Homebuyer Guide', description: 'Down payment programs and mortgage readiness for Houston' },
      ],
      resource: [
        { title: 'Avenue CDC Financial Coaching', org: 'Avenue CDC' },
        { title: 'City of Houston Homebuyer Assistance', org: 'City of Houston HCDD' },
        { title: 'BBVA Compass Financial Literacy', org: 'BBVA' },
      ],
      action: [
        { title: 'Book a Free Coaching Session', description: 'Meet with a HUD-certified counselor in English or Spanish', type: 'service' },
      ],
    },
  },

  // ── HOUSTON — SOUTHWEST / GULFTON / SHARPSTOWN ──
  {
    id: 'hou-11',
    title: 'Immigrant Resource Hub',
    pathway: 'bigger',
    org: 'Alliance for Multicultural Community Services',
    description: 'ESL classes, immigration legal clinics, job readiness, and community orientation for new Americans.',
    location: { address: '6440 Hillcroft Ave Ste 411', city: 'Houston', state: 'TX', zip: '77081', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Know Your Rights as an Immigrant', description: 'Constitutional protections regardless of immigration status' },
        { title: 'Navigating Houston Services', description: 'A newcomer\'s guide to city, county, and nonprofit resources' },
      ],
      resource: [
        { title: 'Alliance ESL & Citizenship Classes', org: 'Alliance for Multicultural Community Services' },
        { title: 'YMCA International Services', org: 'YMCA' },
        { title: 'Catholic Charities Immigration Legal', org: 'Catholic Charities' },
      ],
      action: [
        { title: 'Enroll in ESL Classes', description: 'Free English classes for adults at multiple levels', type: 'service' },
        { title: 'Volunteer as an ESL Tutor', description: 'Help newcomers build English skills', type: 'volunteer' },
      ],
    },
  },
  {
    id: 'hou-12',
    title: 'Find Emergency Utility Assistance',
    pathway: 'money',
    org: 'BakerRipley',
    description: 'Get help with electricity, water, or gas bills before disconnection.',
    location: { address: '6500 Rookin St', city: 'Houston', state: 'TX', zip: '77074', county: 'Harris' },
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

  // ── HOUSTON — SUNNYSIDE / SOUTH PARK ──
  {
    id: 'hou-13',
    title: 'Sunnyside Community Farm',
    pathway: 'planet',
    org: 'Sunnyside Community Gardens',
    description: 'A neighborhood-led farm growing fresh produce and food access in one of Houston\'s most underserved areas.',
    location: { address: '3502 Bellfort Ave', city: 'Houston', state: 'TX', zip: '77051', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Food Deserts in Houston', description: 'Understanding food access disparities and what communities are doing' },
        { title: 'Soil Health in Southeast Houston', description: 'Environmental factors and safe growing practices' },
      ],
      resource: [
        { title: 'Sunnyside Community Gardens', org: 'Sunnyside Community Gardens' },
        { title: 'Houston Food Bank — Mobile Pantry', org: 'Houston Food Bank' },
        { title: 'Brays Oaks Multi-Service Center', org: 'City of Houston' },
      ],
      action: [
        { title: 'Volunteer at the Farm', description: 'Saturday workdays from 8am-12pm', type: 'volunteer' },
        { title: 'Get a Free Produce Box', description: 'Weekly distribution for Sunnyside residents', type: 'service' },
      ],
      accountability: [
        { title: 'Houston City Council District D', role: 'Council Member', level: 'City' },
        { title: 'USDA Food & Nutrition Service', role: 'Regional Administrator', level: 'Federal' },
      ],
    },
  },
  {
    id: 'hou-14',
    title: 'Free GED & Workforce Training',
    pathway: 'money',
    org: 'SER Jobs for Progress',
    description: 'Earn your GED and get job-ready skills training in healthcare, construction, or IT — all free.',
    location: { address: '600 N Sam Houston Pkwy E', city: 'Houston', state: 'TX', zip: '77060', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'GED vs HiSET — Which Path is Right?', description: 'Comparing the two high school equivalency exams available in Texas' },
        { title: 'High-Demand Careers in Houston', description: 'Industries hiring now and projected growth' },
      ],
      resource: [
        { title: 'SER Jobs for Progress', org: 'SER National' },
        { title: 'Workforce Solutions Career Centers', org: 'Gulf Coast Workforce Board' },
        { title: 'Houston Community College Continuing Ed', org: 'HCC' },
      ],
      action: [
        { title: 'Enroll in GED Classes', description: 'Day and evening classes available, start any Monday', type: 'service' },
        { title: 'Register for Skills Training', description: 'Certifications in healthcare, welding, CDL, and IT', type: 'service' },
      ],
    },
  },

  // ── HOUSTON — KASHMERE GARDENS / TRINITY GARDENS ──
  {
    id: 'hou-15',
    title: 'Report Illegal Dumping',
    pathway: 'planet',
    org: 'Harris County Pollution Control',
    description: 'See something? Report it. Track the response. Hold agencies accountable.',
    location: { address: '2525 Lockwood Dr', city: 'Houston', state: 'TX', zip: '77026', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Illegal Dumping in Houston', description: 'The scope of the problem and what\'s being done' },
        { title: 'Environmental Justice in NE Houston', description: 'How proximity to industrial sites affects health outcomes' },
      ],
      resource: [
        { title: 'Houston 311 — Report Dumping', org: 'City of Houston' },
        { title: 'Pollution Control Services', org: 'Harris County' },
        { title: 'Texas Environmental Justice Advocacy Services', org: 'TEJAS' },
      ],
      action: [
        { title: 'File a Dumping Report', description: 'Submit photos and location via 311 or the app', type: 'service' },
        { title: 'Join a Waterway Cleanup', description: 'Volunteer events along bayous and creeks', type: 'volunteer' },
      ],
      accountability: [
        { title: 'Harris County Pollution Control', role: 'Director', level: 'County' },
        { title: 'TCEQ Regional Office', role: 'Regional Director', level: 'State' },
        { title: 'EPA Region 6', role: 'Regional Administrator', level: 'Federal' },
      ],
    },
  },

  // ── HOUSTON — ACRES HOMES ──
  {
    id: 'hou-16',
    title: 'Acres Homes Community Health Center',
    pathway: 'health',
    org: 'Harris Health System',
    description: 'Primary care, behavioral health, dental, and pharmacy services on a sliding fee scale.',
    location: { address: '818 Ringold St', city: 'Houston', state: 'TX', zip: '77088', county: 'Harris' },
    centers: { learning: true, resource: true, action: false, accountability: false },
    centerContent: {
      learning: [
        { title: 'Sliding Fee Scale — How It Works', description: 'Pay based on income, not insurance status' },
        { title: 'Behavioral Health Access', description: 'Free and low-cost mental health services in NW Houston' },
      ],
      resource: [
        { title: 'Acres Homes Health Center', org: 'Harris Health System' },
        { title: 'Harris Health Financial Assistance', org: 'Harris Health System' },
        { title: 'NW Houston Multi-Service Center', org: 'City of Houston' },
      ],
    },
  },

  // ── HOUSTON — SUPER NEIGHBORHOODS (CITYWIDE) ──
  {
    id: 'hou-17',
    title: 'Join a Super Neighborhood Council',
    pathway: 'bigger',
    org: 'Super Neighborhoods Council',
    description: 'Connect with neighbors who are already working to improve your area. Houston has 88 Super Neighborhoods.',
    location: { address: '611 Walker St', city: 'Houston', state: 'TX', zip: '77002', county: 'Harris' },
    centers: { learning: true, resource: false, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'What Are Super Neighborhoods?', description: 'Houston\'s 88 community planning areas explained' },
        { title: 'How to Start a Civic Club', description: 'Building block-level organization in your neighborhood' },
      ],
      action: [
        { title: 'Find Your Super Neighborhood', description: 'Look up which council covers your address', type: 'service' },
        { title: 'Attend a Super Neighborhood Meeting', description: 'Monthly meetings open to all residents', type: 'event' },
      ],
      accountability: [
        { title: 'Super Neighborhood Council', role: 'President', level: 'City' },
        { title: 'Planning & Development Dept', role: 'Director', level: 'City' },
      ],
    },
  },

  // ─────────────────────────────────────────────────
  // PASADENA — Harris County
  // ─────────────────────────────────────────────────
  {
    id: 'pas-1',
    title: 'Pasadena Health Center',
    pathway: 'health',
    org: 'Harris Health System',
    description: 'Full-service community clinic with primary care, women\'s health, immunizations, and lab services.',
    location: { address: '908 Southmore Ave', city: 'Pasadena', state: 'TX', zip: '77502', county: 'Harris' },
    centers: { learning: true, resource: true, action: false, accountability: false },
    centerContent: {
      learning: [
        { title: 'Accessing Healthcare Without Insurance', description: 'Harris Health Gold Card and other options for uninsured residents' },
      ],
      resource: [
        { title: 'Pasadena Health Center', org: 'Harris Health System' },
        { title: 'Pasadena ISD Family Services', org: 'Pasadena ISD' },
      ],
    },
  },
  {
    id: 'pas-2',
    title: 'Pasadena ISD Parent Engagement',
    pathway: 'families',
    org: 'Pasadena ISD',
    description: 'Workshops, family nights, and support programs helping parents become partners in their child\'s education.',
    location: { address: '1515 Cherrybrook Ln', city: 'Pasadena', state: 'TX', zip: '77502', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'How Pasadena ISD Works', description: 'Board structure, school zones, and how decisions get made' },
      ],
      resource: [
        { title: 'Pasadena ISD Parent Center', org: 'Pasadena ISD' },
        { title: 'Communities in Schools', org: 'CIS of the Bay Area' },
      ],
      action: [
        { title: 'Attend Family Learning Night', description: 'Monthly events at your child\'s campus', type: 'event' },
        { title: 'Join the Parent Advisory Council', description: 'Shape district policy from a parent perspective', type: 'volunteer' },
      ],
      accountability: [
        { title: 'Pasadena ISD Board of Trustees', role: 'Board Member', level: 'School District' },
      ],
    },
  },

  // ─────────────────────────────────────────────────
  // BAYTOWN — Harris / Chambers County
  // ─────────────────────────────────────────────────
  {
    id: 'bay-1',
    title: 'Baytown Community Clean Air Initiative',
    pathway: 'planet',
    org: 'Air Alliance Houston',
    description: 'Monitor air quality near the Ship Channel, report pollution events, and advocate for cleaner industry standards.',
    location: { address: '220 W Defee Ave', city: 'Baytown', state: 'TX', zip: '77520', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Living Near the Ship Channel', description: 'Health risks and monitoring data for refinery-adjacent communities' },
        { title: 'Community Air Monitoring', description: 'How residents are collecting their own air quality data' },
      ],
      resource: [
        { title: 'Air Alliance Houston', org: 'Air Alliance Houston' },
        { title: 'TCEQ Air Monitoring Data', org: 'TCEQ' },
      ],
      action: [
        { title: 'Report a Pollution Event', description: 'Log flaring, odor, or visible emissions via the hotline', type: 'service' },
        { title: 'Attend an Air Quality Town Hall', description: 'Community meetings on refinery impacts', type: 'event' },
      ],
      accountability: [
        { title: 'TCEQ Commissioners', role: 'Commissioner', level: 'State' },
        { title: 'EPA Region 6', role: 'Regional Administrator', level: 'Federal' },
      ],
    },
  },

  // ─────────────────────────────────────────────────
  // SUGAR LAND — Fort Bend County
  // ─────────────────────────────────────────────────
  {
    id: 'sl-1',
    title: 'Fort Bend County Library Citizenship Prep',
    pathway: 'bigger',
    org: 'Fort Bend County Libraries',
    description: 'Free citizenship test preparation classes and ESL conversation groups at the Sugar Land branch.',
    location: { address: '550 Eldridge Rd', city: 'Sugar Land', state: 'TX', zip: '77478', county: 'Fort Bend' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'U.S. Citizenship Test Overview', description: 'What to expect on the civics, reading, and writing portions' },
      ],
      resource: [
        { title: 'Fort Bend County Libraries', org: 'Fort Bend County' },
        { title: 'Catholic Charities Immigration Services', org: 'Catholic Charities' },
      ],
      action: [
        { title: 'Register for Citizenship Prep', description: 'Weekly classes at Sugar Land Branch Library', type: 'event' },
        { title: 'Volunteer as a Conversation Partner', description: 'Practice English with citizenship candidates', type: 'volunteer' },
      ],
    },
  },
  {
    id: 'sl-2',
    title: 'Fort Bend Women\'s Center',
    pathway: 'health',
    org: 'Fort Bend Women\'s Center',
    description: 'Crisis intervention, emergency shelter, counseling, and legal advocacy for survivors of domestic violence.',
    location: { address: '12550 Emily Court', city: 'Sugar Land', state: 'TX', zip: '77478', county: 'Fort Bend' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Recognizing Domestic Violence', description: 'Warning signs, safety planning, and how to help someone in danger' },
      ],
      resource: [
        { title: 'Fort Bend Women\'s Center 24/7 Hotline', org: 'Fort Bend Women\'s Center' },
        { title: 'Fort Bend DA Victim Assistance', org: 'Fort Bend County DA' },
      ],
      action: [
        { title: 'Call the Crisis Hotline', description: '24/7 support: 281-342-4357', type: 'service' },
        { title: 'Donate or Volunteer', description: 'Support shelter operations, mentoring, or fundraising', type: 'volunteer' },
      ],
      accountability: [
        { title: 'Fort Bend County District Attorney', role: 'District Attorney', level: 'County' },
        { title: 'Fort Bend County Judge', role: 'County Judge', level: 'County' },
      ],
    },
  },

  // ─────────────────────────────────────────────────
  // KATY — Harris / Fort Bend / Waller County
  // ─────────────────────────────────────────────────
  {
    id: 'kat-1',
    title: 'Katy ISD Family Resource Center',
    pathway: 'families',
    org: 'Katy ISD',
    description: 'Connecting Katy-area families with school supplies, food assistance, counseling, and parent workshops.',
    location: { address: '5765 Peek Rd', city: 'Katy', state: 'TX', zip: '77450', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Katy ISD at a Glance', description: 'District size, demographics, and how it\'s governed' },
      ],
      resource: [
        { title: 'Katy ISD Family Resource Center', org: 'Katy ISD' },
        { title: 'Katy Christian Ministries', org: 'KCM' },
        { title: 'Christ Clinic', org: 'Christ Clinic' },
      ],
      action: [
        { title: 'Request Family Assistance', description: 'Apply for school supplies, food pantry, or clothing closet', type: 'service' },
        { title: 'Attend Parenting Workshop', description: 'Monthly sessions on supporting student success', type: 'event' },
      ],
      accountability: [
        { title: 'Katy ISD Board of Trustees', role: 'Board Member', level: 'School District' },
      ],
    },
  },

  // ─────────────────────────────────────────────────
  // LEAGUE CITY / CLEAR LAKE — Galveston County
  // ─────────────────────────────────────────────────
  {
    id: 'lc-1',
    title: 'Clear Lake Area Volunteer Center',
    pathway: 'bigger',
    org: 'Interfaith Caring Ministries',
    description: 'Find volunteer opportunities across the Clear Lake and Bay Area region — from food pantries to disaster prep.',
    location: { address: '1600 State Hwy 3 S', city: 'League City', state: 'TX', zip: '77573', county: 'Galveston' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Bay Area Nonprofits Directory', description: 'Who does what in the Clear Lake/League City corridor' },
      ],
      resource: [
        { title: 'Interfaith Caring Ministries', org: 'ICM' },
        { title: 'Bay Area Turning Point', org: 'Bay Area Turning Point' },
        { title: 'Galveston County Food Bank', org: 'Galveston County Food Bank' },
      ],
      action: [
        { title: 'Browse Volunteer Opportunities', description: 'Searchable database of Bay Area volunteer needs', type: 'service' },
        { title: 'Join a CERT Team', description: 'Community Emergency Response Team training for disaster readiness', type: 'event' },
      ],
    },
  },

  // ─────────────────────────────────────────────────
  // CONROE / THE WOODLANDS — Montgomery County
  // ─────────────────────────────────────────────────
  {
    id: 'con-1',
    title: 'Montgomery County Food Bank',
    pathway: 'money',
    org: 'Montgomery County Food Bank',
    description: 'Distributing millions of pounds of food annually through pantries, schools, and mobile distributions across the county.',
    location: { address: '1 Food for Life Way', city: 'Conroe', state: 'TX', zip: '77385', county: 'Montgomery' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Food Insecurity in Montgomery County', description: '1 in 7 residents faces hunger — here\'s what that looks like locally' },
      ],
      resource: [
        { title: 'Montgomery County Food Bank', org: 'MCFB' },
        { title: 'Meals on Wheels Montgomery County', org: 'Meals on Wheels' },
        { title: 'SNAP Application Assistance', org: 'MCFB' },
      ],
      action: [
        { title: 'Volunteer at a Distribution', description: 'Pack and distribute food boxes at weekly events', type: 'volunteer' },
        { title: 'Find a Food Pantry Near You', description: 'Locate the closest partner pantry by zip code', type: 'service' },
      ],
    },
  },
  {
    id: 'con-2',
    title: 'Conroe ISD Community Education',
    pathway: 'families',
    org: 'Conroe ISD',
    description: 'Adult education, GED prep, ESL classes, and continuing education for Conroe-area residents.',
    location: { address: '3200 W Davis St', city: 'Conroe', state: 'TX', zip: '77304', county: 'Montgomery' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Adult Ed Options in Montgomery County', description: 'GED, ESL, and workforce programs — what\'s available and free' },
      ],
      resource: [
        { title: 'Conroe ISD Community Education', org: 'Conroe ISD' },
        { title: 'Lone Star College — Conroe Center', org: 'Lone Star College' },
      ],
      action: [
        { title: 'Register for GED Classes', description: 'Free classes, day and evening schedules available', type: 'service' },
        { title: 'Volunteer as a Tutor', description: 'Help adult learners with reading, math, or English', type: 'volunteer' },
      ],
      accountability: [
        { title: 'Conroe ISD Board of Trustees', role: 'Board Member', level: 'School District' },
      ],
    },
  },

  // ─────────────────────────────────────────────────
  // GALVESTON — Galveston County
  // ─────────────────────────────────────────────────
  {
    id: 'gal-1',
    title: 'Galveston Island Beach Cleanup',
    pathway: 'planet',
    org: 'Artist Boat',
    description: 'Monthly cleanups along the Galveston seawall and west beach. All supplies provided.',
    location: { address: '3000 Seawall Blvd', city: 'Galveston', state: 'TX', zip: '77550', county: 'Galveston' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Ocean Pollution & the Gulf Coast', description: 'Where beach trash comes from and its impact on marine life' },
        { title: 'Coastal Erosion on Galveston Island', description: 'How the shoreline is changing and what\'s being done' },
      ],
      resource: [
        { title: 'Artist Boat Coastal Heritage Preserve', org: 'Artist Boat' },
        { title: 'Texas General Land Office Beach Cleanup', org: 'Texas GLO' },
      ],
      action: [
        { title: 'Sign Up for Monthly Cleanup', description: 'First Saturday of every month, 8am at Seawall', type: 'volunteer' },
        { title: 'Adopt a Beach Mile', description: 'Commit to monthly maintenance of a stretch of shoreline', type: 'volunteer' },
      ],
      accountability: [
        { title: 'Texas General Land Office', role: 'Commissioner', level: 'State' },
        { title: 'Galveston City Council', role: 'Council Member', level: 'City' },
      ],
    },
  },
  {
    id: 'gal-2',
    title: 'UTMB Community Health Outreach',
    pathway: 'health',
    org: 'UTMB Health',
    description: 'Free community health screenings, vaccination clinics, and health education across Galveston County.',
    location: { address: '301 University Blvd', city: 'Galveston', state: 'TX', zip: '77555', county: 'Galveston' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Hurricane Health Preparedness', description: 'Protecting your family\'s health before, during, and after storms' },
        { title: 'Chronic Disease in Galveston County', description: 'Local data on diabetes, heart disease, and prevention' },
      ],
      resource: [
        { title: 'UTMB Community Health Programs', org: 'UTMB Health' },
        { title: 'Galveston County Health District', org: 'Galveston County' },
      ],
      action: [
        { title: 'Attend a Free Health Screening', description: 'Monthly events at community centers and churches', type: 'event' },
        { title: 'Volunteer with UTMB Outreach', description: 'Support health education and screening events', type: 'volunteer' },
      ],
    },
  },

  // ─────────────────────────────────────────────────
  // MISSOURI CITY / STAFFORD — Fort Bend County
  // ─────────────────────────────────────────────────
  {
    id: 'mc-1',
    title: 'Fort Bend County Small Business Hub',
    pathway: 'money',
    org: 'Fort Bend Economic Development Council',
    description: 'Free workshops, mentorship, and micro-loan referrals for aspiring and existing small business owners.',
    location: { address: '12431 Vickery St', city: 'Missouri City', state: 'TX', zip: '77489', county: 'Fort Bend' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Starting a Business in Fort Bend', description: 'Licenses, permits, and structures — what you need to know' },
        { title: 'SBA Loans & Micro-Lending', description: 'Federal and local funding options for small businesses' },
      ],
      resource: [
        { title: 'Fort Bend EDC', org: 'Fort Bend Economic Development Council' },
        { title: 'SCORE Houston Chapter', org: 'SCORE' },
        { title: 'LiftFund Micro-Loans', org: 'LiftFund' },
      ],
      action: [
        { title: 'Attend a Free Business Workshop', description: 'Weekly sessions on marketing, finance, and legal basics', type: 'event' },
        { title: 'Request a Mentor', description: 'Get matched with an experienced business mentor', type: 'service' },
      ],
    },
  },

  // ─────────────────────────────────────────────────
  // HUMBLE / KINGWOOD — Harris County (NE)
  // ─────────────────────────────────────────────────
  {
    id: 'hum-1',
    title: 'Lake Houston Flood Preparedness',
    pathway: 'hood',
    org: 'Harris County Flood Control District',
    description: 'Know your flood risk, sign up for alerts, and connect with neighbors to prepare for the next big rain.',
    location: { address: '1001 Preston St Ste 700', city: 'Houston', state: 'TX', zip: '77002', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Understanding the San Jacinto Watershed', description: 'Why the Kingwood/Humble area floods and what\'s being done' },
        { title: 'Flood Insurance 101', description: 'NFIP policies, costs, and what\'s covered vs what\'s not' },
      ],
      resource: [
        { title: 'Harris County Flood Control District', org: 'Harris County' },
        { title: 'Harris County Flood Warning System', org: 'Harris County' },
        { title: 'ReadyHarris Emergency Alerts', org: 'Harris County OHS' },
      ],
      action: [
        { title: 'Sign Up for Flood Alerts', description: 'Get real-time notifications for your area', type: 'service' },
        { title: 'Join a CERT Team', description: 'Community Emergency Response Team training', type: 'event' },
      ],
      accountability: [
        { title: 'Harris County Flood Control District', role: 'Executive Director', level: 'County' },
        { title: 'Harris County Commissioners Court', role: 'Commissioner', level: 'County' },
      ],
    },
  },

  // ─────────────────────────────────────────────────
  // PEARLAND — Brazoria County
  // ─────────────────────────────────────────────────
  {
    id: 'prl-1',
    title: 'Pearland Neighborhood Library Programs',
    pathway: 'families',
    org: 'Brazoria County Library System',
    description: 'Storytime, STEM activities, teen programs, and adult learning at your neighborhood library.',
    location: { address: '3522 Liberty Dr', city: 'Pearland', state: 'TX', zip: '77581', county: 'Brazoria' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Early Literacy Milestones', description: 'What to read and when — a parent\'s guide from birth to 5' },
      ],
      resource: [
        { title: 'Brazoria County Library System', org: 'Brazoria County' },
        { title: 'Pearland Parks & Recreation', org: 'City of Pearland' },
      ],
      action: [
        { title: 'Register for Storytime', description: 'Weekly sessions for babies, toddlers, and preschoolers', type: 'event' },
        { title: 'Volunteer as a Reading Buddy', description: 'Help elementary students build reading confidence', type: 'volunteer' },
      ],
    },
  },

  // ─────────────────────────────────────────────────
  // HARRIS COUNTY — COUNTYWIDE
  // ─────────────────────────────────────────────────
  {
    id: 'hc-1',
    title: 'Get a Free Health Screening',
    pathway: 'health',
    org: 'Harris Health System',
    description: 'Find free blood pressure, diabetes, and cholesterol screenings at community health centers across the county.',
    location: { address: '2525 Holly Hall St', city: 'Houston', state: 'TX', zip: '77054', county: 'Harris' },
    centers: { learning: true, resource: true, action: false, accountability: false },
    centerContent: {
      learning: [
        { title: 'Why Preventive Screenings Matter', description: 'Early detection saves lives and money' },
        { title: 'Harris Health Gold Card', description: 'How to qualify for low-cost healthcare in Harris County' },
      ],
      resource: [
        { title: 'Harris Health Community Health Centers', org: 'Harris Health System' },
        { title: 'Memorial Hermann Community Benefit', org: 'Memorial Hermann' },
        { title: 'Legacy Community Health', org: 'Legacy Community Health' },
      ],
    },
  },
  {
    id: 'hc-2',
    title: 'Harris County 311 — Fix Your Street',
    pathway: 'hood',
    org: 'Harris County Precinct Offices',
    description: 'Report potholes, broken streetlights, drainage issues, and other infrastructure problems in unincorporated Harris County.',
    location: { address: '1001 Preston St', city: 'Houston', state: 'TX', zip: '77002', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'City vs County — Who Fixes What?', description: 'Understanding jurisdiction for roads, drainage, and infrastructure' },
      ],
      resource: [
        { title: 'Harris County 311', org: 'Harris County' },
        { title: 'Harris County Engineering Dept', org: 'Harris County' },
      ],
      action: [
        { title: 'Report a Pothole or Drainage Issue', description: 'File through Harris County 311 online or by phone', type: 'service' },
        { title: 'Attend Commissioners Court', description: 'Public meetings where infrastructure spending is decided', type: 'event' },
      ],
      accountability: [
        { title: 'Harris County Commissioners Court', role: 'Commissioner', level: 'County' },
        { title: 'Harris County Judge', role: 'County Judge', level: 'County' },
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
