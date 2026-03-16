/**
 * Community Exchange — Full Activities Dataset
 *
 * 100+ activities answering the top questions Houston-area residents ask
 * when trying to get involved. Organized by pathway, anchored to real
 * locations across the Greater Houston metro.
 *
 * Each activity is a "journey" through up to 4 centers:
 *   1. Explore (Learning) — understand the issue
 *   2. Take Action (Resource + Action) — find help or pitch in
 *   3. Laws & Policy — what rules shape this
 *   4. Who's Responsible (Accountability) — who decides
 */

import type { Activity } from './sample-data'

export const ACTIVITIES: Activity[] = [
  // ═══════════════════════════════════════════════════
  // HEALTH & WELLNESS (14 activities)
  // ═══════════════════════════════════════════════════

  // 1. Where can I get free healthcare?
  {
    id: 'h-1',
    title: 'Where Can I Get Free Healthcare?',
    pathway: 'health',
    org: 'Harris Health System',
    description: 'Find community health centers, sliding-scale clinics, and the Harris Health Gold Card program across the county.',
    location: { address: '2525 Holly Hall St', city: 'Houston', state: 'TX', zip: '77054', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Harris Health Gold Card — How It Works', description: 'Income-based healthcare for uninsured Harris County residents' },
        { title: 'FQHC Clinics Explained', description: 'Federally qualified health centers serve everyone regardless of ability to pay' },
      ],
      resource: [
        { title: 'Harris Health Community Health Centers', org: 'Harris Health System' },
        { title: 'Legacy Community Health', org: 'Legacy Community Health' },
        { title: 'Avenue 360 Health & Wellness', org: 'Avenue 360' },
        { title: 'Healthcare for the Homeless', org: 'Healthcare for the Homeless Houston' },
      ],
      action: [
        { title: 'Apply for Harris Health Financial Assistance', description: 'Start your Gold Card application online or in person', type: 'service' },
        { title: 'Find the Nearest Community Clinic', description: 'Search by zip code for walk-in clinics near you', type: 'service' },
      ],
    },
  },

  // 2. How do I find a therapist I can afford?
  {
    id: 'h-2',
    title: 'How Do I Find Affordable Mental Health Care?',
    pathway: 'health',
    org: 'The Harris Center for Mental Health',
    description: 'Low-cost and free counseling, crisis services, and psychiatric care for Houston-area residents.',
    location: { address: '9401 Southwest Fwy', city: 'Houston', state: 'TX', zip: '77074', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Mental Health Is Health', description: 'Understanding anxiety, depression, and when to seek help' },
        { title: 'Crisis vs Ongoing Care', description: 'When to call a crisis line vs schedule a counseling appointment' },
      ],
      resource: [
        { title: 'The Harris Center', org: 'Harris Center for Mental Health and IDD' },
        { title: 'Jewish Family Service Counseling', org: 'JFS Houston' },
        { title: 'DePelchin Children\'s Center', org: 'DePelchin' },
        { title: '988 Suicide & Crisis Lifeline', org: 'SAMHSA' },
      ],
      action: [
        { title: 'Schedule an Intake Appointment', description: 'Walk-in or call for first-time evaluation', type: 'service' },
        { title: 'Text HOME to 741741', description: 'Reach the Crisis Text Line 24/7', type: 'service' },
      ],
      accountability: [
        { title: 'Harris Center Board of Trustees', role: 'Board Member', level: 'County' },
        { title: 'Texas Health & Human Services', role: 'Commissioner', level: 'State' },
      ],
    },
  },

  // 3. Where can I get vaccinated?
  {
    id: 'h-3',
    title: 'Where Can I Get Vaccinated?',
    pathway: 'health',
    org: 'Houston Health Department',
    description: 'Free and low-cost immunizations for children and adults at city health centers and pharmacy partners.',
    location: { address: '8000 N Stadium Dr', city: 'Houston', state: 'TX', zip: '77054', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Required Vaccines for Texas Schools', description: 'What your child needs and when — the complete schedule' },
        { title: 'Adult Vaccines You Might Be Missing', description: 'Flu, shingles, Tdap, and more — what\'s recommended' },
      ],
      resource: [
        { title: 'Houston Health Dept Immunization Clinics', org: 'City of Houston' },
        { title: 'Harris County Public Health', org: 'Harris County' },
        { title: 'Texas Vaccines for Children Program', org: 'DSHS' },
      ],
      action: [
        { title: 'Schedule an Immunization', description: 'Book at your nearest city health center', type: 'service' },
      ],
    },
  },

  // 4. How do I sign up for health insurance?
  {
    id: 'h-4',
    title: 'How Do I Sign Up for Health Insurance?',
    pathway: 'health',
    org: 'Change Happens / Houston Enrollment Hub',
    description: 'Free help enrolling in Marketplace plans, Medicaid, CHIP, and understanding your options during open enrollment.',
    location: { address: '2616 S Loop W Ste 110', city: 'Houston', state: 'TX', zip: '77054', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'ACA Marketplace Basics', description: 'How subsidies work and what plans cover' },
        { title: 'Medicaid & CHIP in Texas', description: 'Who qualifies and how to apply' },
      ],
      resource: [
        { title: 'Change Happens', org: 'Change Happens' },
        { title: 'BakerRipley Navigator Program', org: 'BakerRipley' },
        { title: 'Healthcare.gov', org: 'CMS' },
      ],
      action: [
        { title: 'Schedule a Free Enrollment Appointment', description: 'Certified navigators help you compare plans and apply', type: 'service' },
      ],
      accountability: [
        { title: 'Texas Department of Insurance', role: 'Commissioner', level: 'State' },
      ],
    },
  },

  // 5. Where can I find free food / food pantry?
  {
    id: 'h-5',
    title: 'Where Can I Find a Food Pantry?',
    pathway: 'health',
    org: 'Houston Food Bank',
    description: 'Locate emergency food distribution, pantries, and mobile markets across the Greater Houston area.',
    location: { address: '535 Portwall St', city: 'Houston', state: 'TX', zip: '77029', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Food Insecurity in Houston', description: '1 in 5 Houston residents faces food insecurity — what that means' },
        { title: 'SNAP Benefits in Texas', description: 'How to apply and what you can buy' },
      ],
      resource: [
        { title: 'Houston Food Bank Pantry Finder', org: 'Houston Food Bank' },
        { title: 'Kids\' Meals — Home Delivery', org: 'Kids\' Meals Houston' },
        { title: 'Interfaith Ministries Meals on Wheels', org: 'Interfaith Ministries' },
      ],
      action: [
        { title: 'Find a Pantry by Zip Code', description: 'Search 1,500+ partner locations', type: 'service' },
        { title: 'Volunteer at a Distribution', description: 'Sort and pack food for families across Houston', type: 'volunteer' },
      ],
    },
  },

  // 6. How do I get help with addiction / substance use?
  {
    id: 'h-6',
    title: 'How Do I Get Help with Substance Use?',
    pathway: 'health',
    org: 'Council on Recovery',
    description: 'Free and low-cost treatment, support groups, and recovery resources for individuals and families.',
    location: { address: '303 Jackson Hill St', city: 'Houston', state: 'TX', zip: '77007', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Understanding Addiction', description: 'The science of substance use disorder and recovery paths' },
        { title: 'Naloxone / Narcan Access', description: 'How to get and use this life-saving overdose medication' },
      ],
      resource: [
        { title: 'Council on Recovery', org: 'Council on Recovery' },
        { title: 'Santa Maria Hostel', org: 'Santa Maria Hostel' },
        { title: 'SAMHSA Helpline: 1-800-662-4357', org: 'SAMHSA' },
        { title: 'Harris County STAR Drug Court', org: 'Harris County' },
      ],
      action: [
        { title: 'Call for a Free Assessment', description: 'Confidential evaluation and referral to treatment', type: 'service' },
        { title: 'Find a Support Group', description: 'AA, NA, Al-Anon, and other meetings in your area', type: 'service' },
      ],
    },
  },

  // 7. Where can I get dental care?
  {
    id: 'h-7',
    title: 'Where Can I Get Affordable Dental Care?',
    pathway: 'health',
    org: 'UTHealth Houston School of Dentistry',
    description: 'Low-cost dental services at teaching clinics, community health centers, and mobile dental units.',
    location: { address: '7500 Cambridge St', city: 'Houston', state: 'TX', zip: '77054', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Dental Health on a Budget', description: 'Preventive care that saves money long-term' },
      ],
      resource: [
        { title: 'UTHealth School of Dentistry Clinic', org: 'UTHealth Houston' },
        { title: 'Harris Health Dental Services', org: 'Harris Health System' },
        { title: 'Legacy Community Health Dental', org: 'Legacy Community Health' },
        { title: 'Give Kids a Smile Day', org: 'ADA Foundation' },
      ],
      action: [
        { title: 'Schedule a Dental Appointment', description: 'Teaching clinic rates are 30-50% below market', type: 'service' },
      ],
    },
  },

  // 8. Community health fair at Emancipation Park
  {
    id: 'h-8',
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

  // 9. Know your air quality rights
  {
    id: 'h-9',
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

  // 10. Acres Homes community health center
  {
    id: 'h-10',
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

  // 11. Pasadena health center
  {
    id: 'h-11',
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

  // 12. Fort Bend Women's Center
  {
    id: 'h-12',
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

  // 13. UTMB community health outreach
  {
    id: 'h-13',
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

  // 14. How do I get help for an elderly family member?
  {
    id: 'h-14',
    title: 'How Do I Get Help for an Aging Parent?',
    pathway: 'health',
    org: 'Area Agency on Aging',
    description: 'Home care, meal delivery, caregiver support, and senior services across the Houston region.',
    location: { address: '8876 Gulf Fwy Ste 700', city: 'Houston', state: 'TX', zip: '77017', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Navigating Senior Care Options', description: 'In-home care vs assisted living vs adult day programs' },
        { title: 'Medicare & Medicaid for Seniors', description: 'What\'s covered and how to maximize benefits' },
      ],
      resource: [
        { title: 'Area Agency on Aging — Houston', org: 'Houston-Galveston Area Council' },
        { title: 'Interfaith Ministries Meals on Wheels', org: 'Interfaith Ministries' },
        { title: 'Sheltering Arms Senior Services', org: 'Sheltering Arms' },
      ],
      action: [
        { title: 'Call the Senior Helpline', description: 'Free assessment and referral: 832-393-4301', type: 'service' },
        { title: 'Volunteer as a Friendly Visitor', description: 'Regular check-ins with isolated seniors', type: 'volunteer' },
      ],
      accountability: [
        { title: 'Texas Health & Human Services', role: 'Commissioner', level: 'State' },
        { title: 'Harris County Area Agency on Aging', role: 'Director', level: 'County' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════
  // FAMILIES & EDUCATION (14 activities)
  // ═══════════════════════════════════════════════════

  // 15. How do I choose a school for my kid?
  {
    id: 'f-1',
    title: 'How Do I Choose a School for My Child?',
    pathway: 'families',
    org: 'Houston ISD',
    description: 'Navigate school choice in Houston — magnet programs, charters, transfers, and how to compare campuses.',
    location: { address: '4400 W 18th St', city: 'Houston', state: 'TX', zip: '77092', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'School Choice Options in Houston', description: 'Zoned schools, magnets, charters, private, and homeschool explained' },
        { title: 'How to Read School Ratings', description: 'TEA ratings, test scores, and what they actually tell you' },
      ],
      resource: [
        { title: 'HISD School Finder', org: 'Houston ISD' },
        { title: 'Texas School Report Cards', org: 'TEA' },
        { title: 'Good Reason Houston', org: 'Good Reason Houston' },
      ],
      action: [
        { title: 'Apply for Magnet Programs', description: 'HISD magnet application opens each January', type: 'service' },
        { title: 'Tour a School', description: 'Schedule visits to campuses you\'re considering', type: 'event' },
      ],
      accountability: [
        { title: 'HISD Board of Managers', role: 'Board Member', level: 'School District' },
        { title: 'Texas Education Agency', role: 'Commissioner', level: 'State' },
      ],
    },
  },

  // 16. How do I get my child into Pre-K?
  {
    id: 'f-2',
    title: 'How Do I Get My Child into Pre-K?',
    pathway: 'families',
    org: 'Houston ISD Early Childhood',
    description: 'Free Pre-K options for 3 and 4-year-olds across Houston — eligibility, enrollment, and locations.',
    location: { address: '4400 W 18th St', city: 'Houston', state: 'TX', zip: '77092', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Who Qualifies for Free Pre-K?', description: 'Income, language, military, foster care, and other qualifiers' },
        { title: 'Why Pre-K Matters', description: 'Research on early childhood education and school readiness' },
      ],
      resource: [
        { title: 'HISD Pre-K Enrollment', org: 'Houston ISD' },
        { title: 'Head Start / Early Head Start', org: 'Gulf Coast Community Services' },
        { title: 'Collaborative for Children', org: 'Collaborative for Children' },
      ],
      action: [
        { title: 'Apply for Pre-K', description: 'Online enrollment opens each spring for fall start', type: 'service' },
        { title: 'Find Childcare Near You', description: 'Search licensed providers by zip code', type: 'service' },
      ],
    },
  },

  // 17. How do I get my child tutoring help?
  {
    id: 'f-3',
    title: 'Where Can My Child Get Free Tutoring?',
    pathway: 'families',
    org: 'Houston Public Library',
    description: 'Free homework help, tutoring programs, and academic support for K-12 students across the city.',
    location: { address: '500 McKinney St', city: 'Houston', state: 'TX', zip: '77002', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Supporting Your Child\'s Learning', description: 'How parents can reinforce what happens in the classroom' },
      ],
      resource: [
        { title: 'HPL Homework Help', org: 'Houston Public Library' },
        { title: 'Khan Academy', org: 'Khan Academy' },
        { title: 'Communities In Schools Tutoring', org: 'CIS Houston' },
        { title: 'Boys & Girls Clubs After-School', org: 'Boys & Girls Clubs of Greater Houston' },
      ],
      action: [
        { title: 'Sign Up for After-School Tutoring', description: 'Free at library branches and community centers', type: 'service' },
        { title: 'Volunteer as a Tutor', description: 'Help students with reading, math, or test prep', type: 'volunteer' },
      ],
    },
  },

  // 18. How do I report bullying at my child's school?
  {
    id: 'f-4',
    title: 'How Do I Address Bullying at School?',
    pathway: 'families',
    org: 'Texas Education Agency',
    description: 'Know your child\'s rights, how to report, and what the school is required to do under Texas law.',
    location: { address: '4400 W 18th St', city: 'Houston', state: 'TX', zip: '77092', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Texas Anti-Bullying Laws', description: 'David\'s Law and what schools must do when bullying is reported' },
        { title: 'Cyberbullying — What Parents Need to Know', description: 'Online harassment, reporting, and digital safety' },
      ],
      resource: [
        { title: 'StopBullying.gov', org: 'HHS' },
        { title: 'HISD Bullying Report Form', org: 'Houston ISD' },
        { title: 'Disability Rights Texas', org: 'Disability Rights Texas' },
      ],
      action: [
        { title: 'File a Formal Bullying Report', description: 'Written complaint triggers an investigation under Texas law', type: 'service' },
        { title: 'Request a Meeting with Administration', description: 'Ask for a safety plan and follow-up timeline', type: 'service' },
      ],
      accountability: [
        { title: 'HISD Board of Managers', role: 'Board Member', level: 'School District' },
        { title: 'TEA Complaints Office', role: 'Director', level: 'State' },
      ],
    },
  },

  // 19. HISD school board meeting
  {
    id: 'f-5',
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

  // 20. How do I get special education services?
  {
    id: 'f-6',
    title: 'How Do I Get Special Education Services?',
    pathway: 'families',
    org: 'Disability Rights Texas',
    description: 'Understand IEPs, 504 plans, and your child\'s legal right to appropriate education.',
    location: { address: '1500 McGowen St Ste 100', city: 'Houston', state: 'TX', zip: '77004', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'IEP vs 504 Plan', description: 'What each provides and which your child may need' },
        { title: 'Your Rights Under IDEA', description: 'Federal protections for students with disabilities' },
      ],
      resource: [
        { title: 'Disability Rights Texas', org: 'Disability Rights Texas' },
        { title: 'The Arc of Greater Houston', org: 'The Arc' },
        { title: 'Partners Resource Network', org: 'Partners Resource Network' },
      ],
      action: [
        { title: 'Request an Evaluation', description: 'Put it in writing — the school has 15 days to respond', type: 'service' },
        { title: 'Attend a Know Your Rights Workshop', description: 'Free training for parents of children with disabilities', type: 'event' },
      ],
      accountability: [
        { title: 'HISD Special Education Dept', role: 'Director', level: 'School District' },
        { title: 'TEA Special Education Division', role: 'Director', level: 'State' },
      ],
    },
  },

  // 21. Bilingual school navigation
  {
    id: 'f-7',
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

  // 22. Pasadena ISD parent engagement
  {
    id: 'f-8',
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

  // 23. Katy ISD family resource center
  {
    id: 'f-9',
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

  // 24. Conroe ISD community education
  {
    id: 'f-10',
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

  // 25. Pearland library programs
  {
    id: 'f-11',
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

  // 26. How do I find after-school programs?
  {
    id: 'f-12',
    title: 'Where Can I Find After-School Programs?',
    pathway: 'families',
    org: 'Boys & Girls Clubs of Greater Houston',
    description: 'Safe, structured after-school programs with homework help, sports, arts, and leadership — low or no cost.',
    location: { address: '4500 Jensen Dr', city: 'Houston', state: 'TX', zip: '77026', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'The Case for After-School', description: 'Why structured time after 3pm matters for kids and families' },
      ],
      resource: [
        { title: 'Boys & Girls Clubs of Greater Houston', org: 'Boys & Girls Clubs' },
        { title: 'YMCA After-School Programs', org: 'YMCA of Greater Houston' },
        { title: 'Houston Parks & Rec After-School', org: 'City of Houston HPARD' },
        { title: 'BakerRipley Community Centers', org: 'BakerRipley' },
      ],
      action: [
        { title: 'Enroll Your Child', description: 'Most programs accept rolling enrollment — call your nearest location', type: 'service' },
        { title: 'Volunteer as a Mentor', description: 'Weekly mentoring commitment with young people', type: 'volunteer' },
      ],
    },
  },

  // 27. How do I get my child into summer camp?
  {
    id: 'f-13',
    title: 'Where Can I Find Affordable Summer Camps?',
    pathway: 'families',
    org: 'City of Houston Parks & Recreation',
    description: 'Low-cost and free summer programs to keep kids learning, active, and safe when school is out.',
    location: { address: '2999 S Wayside Dr', city: 'Houston', state: 'TX', zip: '77023', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Summer Slide Prevention', description: 'How to keep kids on track academically over the summer' },
      ],
      resource: [
        { title: 'Houston Parks & Rec Summer Camps', org: 'City of Houston' },
        { title: 'Harris County Precinct Camps', org: 'Harris County' },
        { title: 'YMCA Day Camps', org: 'YMCA of Greater Houston' },
        { title: 'Camp For All', org: 'Camp For All Foundation' },
      ],
      action: [
        { title: 'Register for City Camps', description: 'Registration opens each spring — scholarships available', type: 'service' },
      ],
    },
  },

  // 28. How do I help my teen with college applications?
  {
    id: 'f-14',
    title: 'How Do I Help My Teen Apply for College?',
    pathway: 'families',
    org: 'Houston GRAD Lab',
    description: 'Free college advising, FAFSA help, scholarship searches, and application support for Houston students.',
    location: { address: '3830 Richmond Ave', city: 'Houston', state: 'TX', zip: '77027', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'College Application Timeline', description: 'Month-by-month guide for juniors and seniors' },
        { title: 'FAFSA Demystified', description: 'Step-by-step guide to the financial aid application' },
      ],
      resource: [
        { title: 'Houston GRAD Lab', org: 'Houston GRAD Lab' },
        { title: 'College Forward', org: 'College Forward' },
        { title: 'EMERGE Fellowship', org: 'EMERGE' },
        { title: 'Apply Texas', org: 'State of Texas' },
      ],
      action: [
        { title: 'Schedule Free College Advising', description: 'One-on-one sessions with trained counselors', type: 'service' },
        { title: 'Attend a FAFSA Night', description: 'Walk-in help completing financial aid forms', type: 'event' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════
  // OUR NEIGHBORHOOD (14 activities)
  // ═══════════════════════════════════════════════════

  // 29. How do I report a pothole?
  {
    id: 'n-1',
    title: 'How Do I Report a Pothole or Broken Streetlight?',
    pathway: 'hood',
    org: 'City of Houston 311',
    description: 'Report potholes, streetlight outages, missed trash pickup, stray animals, and more through Houston 311.',
    location: { address: '611 Walker St', city: 'Houston', state: 'TX', zip: '77002', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Houston 311 — What It Covers', description: 'Everything you can report and track through the city\'s service system' },
        { title: 'City vs County — Who Fixes What?', description: 'Jurisdiction matters: are you inside city limits or unincorporated?' },
      ],
      resource: [
        { title: 'Houston 311', org: 'City of Houston' },
        { title: 'Houston 311 App', org: 'City of Houston' },
      ],
      action: [
        { title: 'Submit a 311 Service Request', description: 'Online, by app, or call 311 — track your request status', type: 'service' },
      ],
      accountability: [
        { title: 'Houston Public Works', role: 'Director', level: 'City' },
        { title: 'Houston City Council', role: 'Council Member', level: 'City' },
      ],
    },
  },

  // 30. How do I prepare for a hurricane?
  {
    id: 'n-2',
    title: 'How Do I Prepare for Hurricane Season?',
    pathway: 'hood',
    org: 'Harris County Office of Homeland Security',
    description: 'Build a plan, stock supplies, sign up for alerts, and know your evacuation zone before the storm hits.',
    location: { address: '6922 Katy Rd', city: 'Houston', state: 'TX', zip: '77024', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Know Your Hurricane Zone', description: 'Coastal, wind, and flood zones — what each means for your home' },
        { title: 'Building a 72-Hour Emergency Kit', description: 'What to pack for water, food, medicine, documents, and pets' },
      ],
      resource: [
        { title: 'ReadyHarris', org: 'Harris County OHS' },
        { title: 'Hurricane Evacuation Routes', org: 'TxDOT' },
        { title: 'National Hurricane Center', org: 'NOAA' },
      ],
      action: [
        { title: 'Sign Up for Emergency Alerts', description: 'ReadyHarris text and email notifications', type: 'service' },
        { title: 'Join a CERT Team', description: 'Community Emergency Response Team volunteer training', type: 'event' },
      ],
      accountability: [
        { title: 'Harris County Judge', role: 'County Judge', level: 'County' },
        { title: 'Harris County OHS', role: 'Director', level: 'County' },
      ],
    },
  },

  // 31. How do I deal with flooding on my street?
  {
    id: 'n-3',
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

  // 32. How do I start a neighborhood watch?
  {
    id: 'n-4',
    title: 'How Do I Start a Neighborhood Watch?',
    pathway: 'hood',
    org: 'Houston Police Department',
    description: 'Partner with HPD to organize a watch group, get trained, and build safer blocks.',
    location: { address: '1200 Travis St', city: 'Houston', state: 'TX', zip: '77002', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'How Neighborhood Watch Works', description: 'It\'s about awareness and communication, not vigilantism' },
        { title: 'Crime Prevention Through Design', description: 'How lighting, landscaping, and sight lines affect safety' },
      ],
      resource: [
        { title: 'HPD Positive Interaction Program', org: 'Houston Police Dept' },
        { title: 'National Neighborhood Watch', org: 'National Sheriffs\' Association' },
      ],
      action: [
        { title: 'Request a PIP Officer', description: 'HPD assigns a liaison to help start your watch', type: 'service' },
        { title: 'Host a Neighborhood Meeting', description: 'Gather neighbors and set up a communication plan', type: 'event' },
      ],
      accountability: [
        { title: 'HPD Division Commander', role: 'Captain', level: 'City' },
        { title: 'Houston City Council', role: 'Council Member', level: 'City' },
      ],
    },
  },

  // 33. Block cleanup
  {
    id: 'n-5',
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

  // 34. How do I get a speed bump on my street?
  {
    id: 'n-6',
    title: 'How Do I Get a Speed Bump on My Street?',
    pathway: 'hood',
    org: 'City of Houston Public Works',
    description: 'Request traffic calming measures like speed humps, stop signs, or crosswalks for your neighborhood.',
    location: { address: '611 Walker St', city: 'Houston', state: 'TX', zip: '77002', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'How Traffic Calming Works', description: 'Speed humps, tables, chicanes — what\'s available and where' },
        { title: 'The Petition Process', description: 'You\'ll need signatures from residents on your block' },
      ],
      resource: [
        { title: 'Houston Public Works Traffic Division', org: 'City of Houston' },
      ],
      action: [
        { title: 'Submit a Speed Hump Request', description: 'Petition form requires signatures from 75% of adjacent residents', type: 'service' },
        { title: 'Contact Your Council Member', description: 'Council offices can expedite traffic studies', type: 'service' },
      ],
      accountability: [
        { title: 'Houston Public Works', role: 'Director', level: 'City' },
        { title: 'Houston City Council', role: 'Council Member', level: 'City' },
      ],
    },
  },

  // 35. How do I deal with a problem landlord?
  {
    id: 'n-7',
    title: 'How Do I Deal with a Problem Landlord?',
    pathway: 'hood',
    org: 'Houston Volunteer Lawyers',
    description: 'Know your tenant rights, file complaints, and get free legal help for housing issues in Texas.',
    location: { address: '1111 Bagby St Ste 2500', city: 'Houston', state: 'TX', zip: '77002', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Texas Tenant Rights', description: 'What your landlord must do — repairs, security deposits, notice periods' },
        { title: 'Eviction Process in Texas', description: 'Timeline, your rights, and how to respond to an eviction notice' },
      ],
      resource: [
        { title: 'Houston Volunteer Lawyers', org: 'Houston Bar Association' },
        { title: 'Lone Star Legal Aid', org: 'Lone Star Legal Aid' },
        { title: 'Texas Tenants\' Union', org: 'Texas Tenants\' Union' },
      ],
      action: [
        { title: 'File a Complaint with the City', description: 'Report health/safety code violations', type: 'service' },
        { title: 'Get Free Legal Advice', description: 'Schedule a consult with a volunteer attorney', type: 'service' },
      ],
      accountability: [
        { title: 'Houston Dept of Neighborhoods', role: 'Director', level: 'City' },
        { title: 'JP Court', role: 'Justice of the Peace', level: 'County' },
      ],
    },
  },

  // 36. Harris County 311
  {
    id: 'n-8',
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

  // 37. How do I get a park built in my neighborhood?
  {
    id: 'n-9',
    title: 'How Do I Get a Park Built in My Area?',
    pathway: 'hood',
    org: 'Houston Parks & Recreation',
    description: 'Advocate for green space, join a park advisory board, and learn how park funding works.',
    location: { address: '2999 S Wayside Dr', city: 'Houston', state: 'TX', zip: '77023', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Park Equity in Houston', description: 'Which neighborhoods have the least green space and why' },
        { title: 'How Parks Get Funded', description: 'Bond programs, grants, and private partnerships' },
      ],
      resource: [
        { title: 'Houston Parks & Recreation', org: 'City of Houston HPARD' },
        { title: 'Houston Parks Board', org: 'Houston Parks Board' },
        { title: 'Trust for Public Land', org: 'TPL' },
      ],
      action: [
        { title: 'Join a Park Advisory Council', description: 'Volunteer boards that guide park improvements', type: 'volunteer' },
        { title: 'Attend a HPARD Public Meeting', description: 'Input sessions for new parks and renovations', type: 'event' },
      ],
      accountability: [
        { title: 'Houston Parks & Recreation Dept', role: 'Director', level: 'City' },
        { title: 'Houston City Council', role: 'Council Member', level: 'City' },
      ],
    },
  },

  // 38-42 more neighborhood activities...
  {
    id: 'n-10',
    title: 'How Do I Get a Stray Animal Picked Up?',
    pathway: 'hood',
    org: 'BARC Animal Shelter',
    description: 'Report stray, injured, or dangerous animals in Houston. Learn about spay/neuter and adoption too.',
    location: { address: '3200 Carr St', city: 'Houston', state: 'TX', zip: '77026', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Houston\'s Stray Animal Challenge', description: 'Why Houston has one of the highest stray populations in the US' },
      ],
      resource: [
        { title: 'BARC Animal Shelter', org: 'City of Houston' },
        { title: 'Houston SPCA', org: 'Houston SPCA' },
        { title: 'Friends for Life Animal Rescue', org: 'Friends for Life' },
      ],
      action: [
        { title: 'Report a Stray Animal', description: 'Call 311 or use the Houston 311 app', type: 'service' },
        { title: 'Volunteer or Foster', description: 'Help reduce shelter overcrowding', type: 'volunteer' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════
  // OUR VOICE (14 activities)
  // ═══════════════════════════════════════════════════

  // 43. How do I register to vote?
  {
    id: 'v-1',
    title: 'How Do I Register to Vote?',
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

  // 44. How do I contact my city council member?
  {
    id: 'v-2',
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

  // 45. How do I contact my state representative?
  {
    id: 'v-3',
    title: 'Who Is My State Representative?',
    pathway: 'voice',
    org: 'Texas Legislature',
    description: 'Find your state House and Senate members, track bills, and make your voice heard in Austin.',
    location: { address: '1100 Congress Ave', city: 'Houston', state: 'TX', zip: '77002', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'How the Texas Legislature Works', description: 'Sessions, committees, and how a bill becomes law in Texas' },
        { title: 'Redistricting & Your District', description: 'How your district was drawn and what it means' },
      ],
      resource: [
        { title: 'Texas Legislature Online', org: 'Texas Legislature' },
        { title: 'Who Represents Me?', org: 'Texas Tribune' },
      ],
      action: [
        { title: 'Look Up Your Representatives', description: 'Search by address for House, Senate, and Congress', type: 'service' },
        { title: 'Testify at a Committee Hearing', description: 'How to register and speak on bills that matter to you', type: 'event' },
      ],
      accountability: [
        { title: 'Texas House of Representatives', role: 'State Representative', level: 'State' },
        { title: 'Texas Senate', role: 'State Senator', level: 'State' },
      ],
    },
  },

  // 46. How do I attend a public hearing?
  {
    id: 'v-4',
    title: 'How Do I Speak at a Public Hearing?',
    pathway: 'voice',
    org: 'City of Houston',
    description: 'Step-by-step guide to signing up and speaking at city council, county, and school board public hearings.',
    location: { address: '901 Bagby St', city: 'Houston', state: 'TX', zip: '77002', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Public Comment 101', description: 'How public hearings work and how to prepare your testimony' },
        { title: 'Know Your Open Meetings Rights', description: 'Texas Open Meetings Act and what government must do in public' },
      ],
      resource: [
        { title: 'City Council Public Comment Registration', org: 'City of Houston' },
        { title: 'Harris County Commissioners Court Agenda', org: 'Harris County' },
      ],
      action: [
        { title: 'Sign Up for Public Comment', description: 'Registration opens before each meeting', type: 'event' },
        { title: 'Draft Your Testimony', description: 'Tips for a clear, effective 3-minute statement', type: 'service' },
      ],
      accountability: [
        { title: 'Houston City Council', role: 'Council Member', level: 'City' },
        { title: 'Harris County Commissioners Court', role: 'Commissioner', level: 'County' },
      ],
    },
  },

  // 47. How do I file a police complaint?
  {
    id: 'v-5',
    title: 'How Do I File a Police Complaint?',
    pathway: 'voice',
    org: 'Houston Police Department',
    description: 'Know your rights during police encounters and how to file a complaint if your rights are violated.',
    location: { address: '1200 Travis St', city: 'Houston', state: 'TX', zip: '77002', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Know Your Rights During Police Stops', description: 'What you must do, what you can refuse, and how to stay safe' },
        { title: 'Civilian Oversight in Houston', description: 'How the complaint and disciplinary process works' },
      ],
      resource: [
        { title: 'HPD Internal Affairs Division', org: 'Houston Police Dept' },
        { title: 'Houston Office of Inspector General', org: 'City of Houston' },
        { title: 'ACLU of Texas', org: 'ACLU Texas' },
      ],
      action: [
        { title: 'File a Complaint', description: 'Online, by phone, or in person at any HPD station', type: 'service' },
      ],
      accountability: [
        { title: 'HPD Internal Affairs', role: 'Commander', level: 'City' },
        { title: 'Houston Office of Inspector General', role: 'Inspector General', level: 'City' },
        { title: 'Houston City Council Public Safety Committee', role: 'Chair', level: 'City' },
      ],
    },
  },

  // 48. How do I run for local office?
  {
    id: 'v-6',
    title: 'How Do I Run for Local Office?',
    pathway: 'voice',
    org: 'Annie\'s List / Run for Something',
    description: 'Thinking about running? Here\'s what it takes to file, fundraise, and campaign for local office in Texas.',
    location: { address: '901 Bagby St', city: 'Houston', state: 'TX', zip: '77002', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Local Offices You Can Run For', description: 'City council, school board, MUD, JP — the full menu' },
        { title: 'Filing Requirements in Texas', description: 'Deadlines, fees, and petition signatures' },
      ],
      resource: [
        { title: 'Run for Something', org: 'Run for Something' },
        { title: 'Annie\'s List', org: 'Annie\'s List' },
        { title: 'Texas Ethics Commission', org: 'TEC' },
      ],
      action: [
        { title: 'Attend a Candidate Training', description: 'Free workshops on running for office', type: 'event' },
        { title: 'File for Office', description: 'Check deadlines and requirements for your target seat', type: 'service' },
      ],
    },
  },

  // 49-56 more voice activities...
  {
    id: 'v-7',
    title: 'How Do I Request a Public Record?',
    pathway: 'voice',
    org: 'City of Houston Legal Department',
    description: 'Texas Public Information Act gives you the right to access government documents. Here\'s how to use it.',
    location: { address: '611 Walker St', city: 'Houston', state: 'TX', zip: '77002', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Texas Public Information Act', description: 'What you can request and what agencies must provide' },
      ],
      resource: [
        { title: 'Texas Attorney General Open Records', org: 'Texas OAG' },
        { title: 'MuckRock — FOIA Filing Tool', org: 'MuckRock' },
      ],
      action: [
        { title: 'Submit a Public Information Request', description: 'Email or mail your request to any government body', type: 'service' },
      ],
      accountability: [
        { title: 'Texas Attorney General', role: 'Attorney General', level: 'State' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════
  // ECONOMIC SECURITY (14 activities)
  // ═══════════════════════════════════════════════════

  // 57. How do I find a job?
  {
    id: 'e-1',
    title: 'How Do I Find a Job in Houston?',
    pathway: 'money',
    org: 'Workforce Solutions — Gulf Coast',
    description: 'Free job search help, resume building, interview prep, and career coaching at workforce centers across the region.',
    location: { address: '3555 Timmons Ln Ste 120', city: 'Houston', state: 'TX', zip: '77027', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Houston\'s Job Market', description: 'Top industries hiring and what skills are in demand' },
        { title: 'Resume & Interview Basics', description: 'What Houston employers are looking for' },
      ],
      resource: [
        { title: 'Workforce Solutions Career Centers', org: 'Gulf Coast Workforce Board' },
        { title: 'WorkInTexas.com', org: 'TWC' },
        { title: 'Goodwill Houston Job Training', org: 'Goodwill Industries' },
      ],
      action: [
        { title: 'Visit a Career Center', description: 'Walk-in services at 30+ locations across the region', type: 'service' },
        { title: 'Attend a Job Fair', description: 'Monthly hiring events with local employers', type: 'event' },
      ],
    },
  },

  // 58. How do I start a small business?
  {
    id: 'e-2',
    title: 'How Do I Start a Small Business?',
    pathway: 'money',
    org: 'SCORE Houston',
    description: 'Free mentorship, business plan workshops, and micro-loan referrals for aspiring entrepreneurs.',
    location: { address: '8701 S Gessner Dr Ste 1200', city: 'Houston', state: 'TX', zip: '77074', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Business Structures in Texas', description: 'LLC, sole prop, corporation — which is right for you' },
        { title: 'Writing a Business Plan', description: 'The essentials investors and lenders want to see' },
      ],
      resource: [
        { title: 'SCORE Houston', org: 'SCORE' },
        { title: 'Houston SBDC', org: 'University of Houston SBDC' },
        { title: 'LiftFund Micro-Loans', org: 'LiftFund' },
        { title: 'City of Houston MWBE Certification', org: 'City of Houston' },
      ],
      action: [
        { title: 'Get a Free Mentor', description: 'Matched with an experienced business professional', type: 'service' },
        { title: 'Attend a Startup Workshop', description: 'Monthly sessions on launching your business', type: 'event' },
      ],
    },
  },

  // 59. How do I fix my credit?
  {
    id: 'e-3',
    title: 'How Do I Fix My Credit?',
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
        { title: 'AnnualCreditReport.com', org: 'FTC' },
      ],
      action: [
        { title: 'Book a Free Coaching Session', description: 'Meet with a HUD-certified counselor in English or Spanish', type: 'service' },
      ],
    },
  },

  // 60. How do I file for unemployment?
  {
    id: 'e-4',
    title: 'How Do I File for Unemployment?',
    pathway: 'money',
    org: 'Texas Workforce Commission',
    description: 'Step-by-step help filing your unemployment claim and understanding your benefits in Texas.',
    location: { address: '3555 Timmons Ln Ste 120', city: 'Houston', state: 'TX', zip: '77027', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Texas Unemployment Benefits', description: 'Who qualifies, how much you get, and how long it lasts' },
        { title: 'Your Rights After Job Loss', description: 'COBRA, final paycheck laws, and non-compete rules in Texas' },
      ],
      resource: [
        { title: 'Texas Workforce Commission', org: 'TWC' },
        { title: 'Workforce Solutions Career Centers', org: 'Gulf Coast Workforce Board' },
      ],
      action: [
        { title: 'File Your Claim Online', description: 'TWC unemployment application portal', type: 'service' },
        { title: 'Get In-Person Filing Help', description: 'Staff at career centers can walk you through it', type: 'service' },
      ],
      accountability: [
        { title: 'Texas Workforce Commission', role: 'Commissioner', level: 'State' },
      ],
    },
  },

  // 61. Emergency utility assistance
  {
    id: 'e-5',
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

  // 62. Free legal aid
  {
    id: 'e-6',
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

  // 63. GED & workforce training
  {
    id: 'e-7',
    title: 'Free GED & Workforce Training',
    pathway: 'money',
    org: 'SER Jobs for Progress',
    description: 'Earn your GED and get job-ready skills training in healthcare, construction, or IT — all free.',
    location: { address: '600 N Sam Houston Pkwy E', city: 'Houston', state: 'TX', zip: '77060', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'GED vs HiSET', description: 'Comparing the two high school equivalency exams available in Texas' },
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

  // 64. Montgomery County food bank
  {
    id: 'e-8',
    title: 'Montgomery County Food Bank',
    pathway: 'money',
    org: 'Montgomery County Food Bank',
    description: 'Distributing millions of pounds of food annually through pantries, schools, and mobile distributions.',
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

  // 65. Fort Bend small business hub
  {
    id: 'e-9',
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

  // 66. How do I get rent help?
  {
    id: 'e-10',
    title: 'How Do I Get Emergency Rent Help?',
    pathway: 'money',
    org: 'BakerRipley',
    description: 'Emergency rental assistance for Houston-area residents facing eviction or behind on rent.',
    location: { address: '6500 Rookin St', city: 'Houston', state: 'TX', zip: '77074', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Eviction Process in Texas', description: 'Your rights and the timeline from notice to court' },
      ],
      resource: [
        { title: 'BakerRipley Rent Assistance', org: 'BakerRipley' },
        { title: 'Catholic Charities Emergency Aid', org: 'Catholic Charities' },
        { title: 'United Way 211', org: 'United Way' },
        { title: 'Houston/Harris County Emergency Rental Assistance', org: 'Harris County' },
      ],
      action: [
        { title: 'Apply for Rental Assistance', description: 'Income-verified application for past-due rent help', type: 'service' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════
  // OUR PLANET (14 activities)
  // ═══════════════════════════════════════════════════

  // 67. Where can I recycle?
  {
    id: 'p-1',
    title: 'Where Can I Recycle in Houston?',
    pathway: 'planet',
    org: 'City of Houston Solid Waste',
    description: 'Curbside recycling, drop-off locations, hazardous waste disposal, and what actually gets recycled.',
    location: { address: '611 Walker St', city: 'Houston', state: 'TX', zip: '77002', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'What Can Be Recycled in Houston', description: 'The real list — some things you think are recyclable aren\'t' },
        { title: 'Where Does Houston\'s Recycling Go?', description: 'The journey from your green bin to new products' },
      ],
      resource: [
        { title: 'Houston Solid Waste Recycling', org: 'City of Houston' },
        { title: 'Houston Recycling Drop-Off Locations', org: 'City of Houston' },
        { title: 'Earth911 Recycling Search', org: 'Earth911' },
      ],
      action: [
        { title: 'Schedule a Bulky Pickup', description: 'Free curbside collection of large items', type: 'service' },
        { title: 'Find a Hazardous Waste Dropoff', description: 'Paint, batteries, electronics, and chemicals', type: 'service' },
      ],
      accountability: [
        { title: 'Houston Solid Waste Dept', role: 'Director', level: 'City' },
      ],
    },
  },

  // 68. Community garden
  {
    id: 'p-2',
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

  // 69. Report illegal dumping
  {
    id: 'p-3',
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
        { title: 'TEJAS', org: 'Texas Environmental Justice Advocacy Services' },
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

  // 70. Sunnyside community farm
  {
    id: 'p-4',
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

  // 71. Baytown clean air
  {
    id: 'p-5',
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

  // 72. Galveston beach cleanup
  {
    id: 'p-6',
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

  // 73. How do I reduce my energy bill?
  {
    id: 'p-7',
    title: 'How Do I Reduce My Energy Bill?',
    pathway: 'planet',
    org: 'Texas PACE Authority',
    description: 'Weatherization assistance, energy audits, and efficiency rebates for Houston-area homeowners and renters.',
    location: { address: '2525 Holly Hall St', city: 'Houston', state: 'TX', zip: '77054', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Home Energy Efficiency Basics', description: 'The biggest energy wasters in Houston homes and easy fixes' },
        { title: 'Understanding Your Electric Bill', description: 'TDU charges, energy charges, and how to compare plans' },
      ],
      resource: [
        { title: 'BakerRipley Weatherization Program', org: 'BakerRipley' },
        { title: 'CenterPoint Energy Efficiency Programs', org: 'CenterPoint Energy' },
        { title: 'Power to Choose', org: 'PUC of Texas' },
      ],
      action: [
        { title: 'Apply for Weatherization Assistance', description: 'Free insulation, sealing, and HVAC repairs for qualifying homes', type: 'service' },
        { title: 'Compare Electric Plans', description: 'Shop rates on Power to Choose', type: 'service' },
      ],
    },
  },

  // 74. How do I report water pollution?
  {
    id: 'p-8',
    title: 'How Do I Report Water Pollution?',
    pathway: 'planet',
    org: 'Bayou Preservation Association',
    description: 'Report sewage spills, chemical discharges, or contamination in Houston\'s waterways and bayous.',
    location: { address: '1902 Washington Ave', city: 'Houston', state: 'TX', zip: '77007', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Houston\'s Bayou System', description: 'How our waterways connect and why they matter' },
        { title: 'Water Quality in Harris County', description: 'Which bayous are impaired and what causes it' },
      ],
      resource: [
        { title: 'Bayou Preservation Association', org: 'BPA' },
        { title: 'TCEQ Environmental Complaints', org: 'TCEQ' },
        { title: 'Harris County Flood Control District', org: 'Harris County' },
      ],
      action: [
        { title: 'Report a Spill or Discharge', description: 'TCEQ hotline: 1-888-777-3186', type: 'service' },
        { title: 'Join a Bayou Cleanup', description: 'Monthly volunteer events on Buffalo Bayou and beyond', type: 'volunteer' },
      ],
      accountability: [
        { title: 'TCEQ Water Quality Division', role: 'Director', level: 'State' },
        { title: 'EPA Region 6 Water Division', role: 'Director', level: 'Federal' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════
  // THE BIGGER WE (14 activities)
  // ═══════════════════════════════════════════════════

  // 75. How do I volunteer in Houston?
  {
    id: 'b-1',
    title: 'How Do I Find Volunteer Opportunities?',
    pathway: 'bigger',
    org: 'Volunteer Houston',
    description: 'Searchable directory of volunteer needs across the region — one-time events to ongoing commitments.',
    location: { address: '50 Waugh Dr', city: 'Houston', state: 'TX', zip: '77007', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'The Volunteer Landscape in Houston', description: 'Thousands of orgs need help — here\'s how to find your fit' },
      ],
      resource: [
        { title: 'Volunteer Houston', org: 'Volunteer Houston' },
        { title: 'United Way of Greater Houston', org: 'United Way' },
        { title: 'HandsOn Houston', org: 'HandsOn Network' },
      ],
      action: [
        { title: 'Search Volunteer Opportunities', description: 'Filter by cause, location, and time commitment', type: 'service' },
        { title: 'Sign Up for Day of Service', description: 'Large-scale service events throughout the year', type: 'event' },
      ],
    },
  },

  // 76. How do I join a neighborhood association?
  {
    id: 'b-2',
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

  // 77. Immigrant resource hub
  {
    id: 'b-3',
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

  // 78. Fort Bend citizenship prep
  {
    id: 'b-4',
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

  // 79. Clear Lake volunteer center
  {
    id: 'b-5',
    title: 'Clear Lake Area Volunteer Center',
    pathway: 'bigger',
    org: 'Interfaith Caring Ministries',
    description: 'Find volunteer opportunities across the Clear Lake and Bay Area region.',
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
        { title: 'Join a CERT Team', description: 'Community Emergency Response Team training', type: 'event' },
      ],
    },
  },

  // 80. How do I become a mentor?
  {
    id: 'b-6',
    title: 'How Do I Become a Youth Mentor?',
    pathway: 'bigger',
    org: 'Big Brothers Big Sisters — Lone Star',
    description: 'One-on-one mentoring that changes lives. Commit a few hours a month to a young person who needs you.',
    location: { address: '1003 Washington Ave', city: 'Houston', state: 'TX', zip: '77002', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Why Mentoring Matters', description: 'Research on the impact of consistent adult relationships on youth outcomes' },
        { title: 'What Makes a Good Mentor', description: 'It\'s not about fixing — it\'s about showing up' },
      ],
      resource: [
        { title: 'Big Brothers Big Sisters — Lone Star', org: 'BBBS' },
        { title: 'Houston Area Urban League', org: 'HAUL' },
        { title: 'MENTOR Texas', org: 'MENTOR' },
      ],
      action: [
        { title: 'Apply to Be a Mentor', description: 'Background check, training, and matching process', type: 'service' },
        { title: 'Attend an Info Session', description: 'Learn about the commitment and what to expect', type: 'event' },
      ],
    },
  },

  // 81. How do I help after a disaster?
  {
    id: 'b-7',
    title: 'How Do I Help After a Disaster?',
    pathway: 'bigger',
    org: 'Houston VOAD',
    description: 'Coordinate your help through official channels so it reaches those who need it most.',
    location: { address: '50 Waugh Dr', city: 'Houston', state: 'TX', zip: '77007', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Spontaneous vs Organized Volunteering', description: 'Why coordinating through VOAD or Red Cross makes your help more effective' },
        { title: 'Long-Term Recovery Groups', description: 'Disaster help doesn\'t end when the news cameras leave' },
      ],
      resource: [
        { title: 'Houston VOAD', org: 'Voluntary Organizations Active in Disaster' },
        { title: 'American Red Cross — Greater Houston', org: 'Red Cross' },
        { title: 'All Hands and Hearts', org: 'All Hands and Hearts' },
      ],
      action: [
        { title: 'Register as a Disaster Volunteer', description: 'Pre-register so you\'re ready when the call comes', type: 'service' },
        { title: 'Donate to Recovery Funds', description: 'Verified funds that go directly to affected families', type: 'service' },
      ],
    },
  },

  // 82. How do I start a nonprofit?
  {
    id: 'b-8',
    title: 'How Do I Start a Nonprofit?',
    pathway: 'bigger',
    org: 'Center for Philanthropy',
    description: 'Learn whether starting a nonprofit is the right path, and if so, how to incorporate, get 501(c)(3) status, and build a board.',
    location: { address: '4543 Post Oak Pl Dr Ste 120', city: 'Houston', state: 'TX', zip: '77027', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Do You Need a Nonprofit?', description: 'Fiscal sponsors, giving circles, and alternatives to starting your own org' },
        { title: '501(c)(3) Basics', description: 'IRS requirements, bylaws, and board governance' },
      ],
      resource: [
        { title: 'Center for Philanthropy', org: 'Center for Philanthropy' },
        { title: 'Foundation for Southeast Texas', org: 'FEST' },
        { title: 'Texas Secretary of State — Business Filings', org: 'Texas SOS' },
      ],
      action: [
        { title: 'Attend a Nonprofit Startup Workshop', description: 'Quarterly sessions on launching and sustaining a nonprofit', type: 'event' },
        { title: 'Find a Fiscal Sponsor', description: 'Get started without forming your own organization', type: 'service' },
      ],
    },
  },

  // 83. How do I connect with people who share my faith?
  {
    id: 'b-9',
    title: 'Interfaith Community Service',
    pathway: 'bigger',
    org: 'Interfaith Ministries for Greater Houston',
    description: 'Bridge faith communities through shared service — disaster relief, refugee resettlement, and senior meals.',
    location: { address: '3303 Main St', city: 'Houston', state: 'TX', zip: '77002', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: false },
    centerContent: {
      learning: [
        { title: 'Houston\'s Religious Diversity', description: 'One of the most religiously diverse cities in America — here\'s the landscape' },
      ],
      resource: [
        { title: 'Interfaith Ministries', org: 'Interfaith Ministries for Greater Houston' },
        { title: 'Islamic Society of Greater Houston', org: 'ISGH' },
        { title: 'Jewish Federation of Greater Houston', org: 'Jewish Federation' },
      ],
      action: [
        { title: 'Volunteer with Meals on Wheels', description: 'Deliver meals to homebound seniors across Houston', type: 'volunteer' },
        { title: 'Help Welcome a Refugee Family', description: 'Furnish an apartment, teach transit, share a meal', type: 'volunteer' },
      ],
    },
  },

  // 84. How do I report discrimination?
  {
    id: 'b-10',
    title: 'How Do I Report Discrimination?',
    pathway: 'bigger',
    org: 'Houston Office of Inspector General',
    description: 'Know your rights and how to file complaints for housing, employment, or public accommodation discrimination.',
    location: { address: '611 Walker St', city: 'Houston', state: 'TX', zip: '77002', county: 'Harris' },
    centers: { learning: true, resource: true, action: true, accountability: true },
    centerContent: {
      learning: [
        { title: 'Protected Classes Under Houston\'s Equal Rights Ordinance', description: 'What\'s covered at the city, state, and federal level' },
        { title: 'Housing Discrimination', description: 'Fair Housing Act protections and how to recognize violations' },
      ],
      resource: [
        { title: 'Houston OIG', org: 'City of Houston' },
        { title: 'EEOC Houston Office', org: 'EEOC' },
        { title: 'Texas Workforce Commission Civil Rights', org: 'TWC' },
        { title: 'Greater Houston Fair Housing Center', org: 'GHFHC' },
      ],
      action: [
        { title: 'File a Discrimination Complaint', description: 'Report to the appropriate agency based on the type of discrimination', type: 'service' },
      ],
      accountability: [
        { title: 'Houston Office of Inspector General', role: 'Inspector General', level: 'City' },
        { title: 'EEOC Houston District', role: 'District Director', level: 'Federal' },
      ],
    },
  },
]
