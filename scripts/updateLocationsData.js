/**
 * Script to update coworkingData.js with Google Places data
 */

const fs = require('fs');
const path = require('path');

// Read Google Places data
const googleData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/google-locations.json'), 'utf8')
);

// NYC Zip Code to Neighborhood mapping (consolidated)
const nycZipToNeighborhood = {
  // Manhattan
  '10001': 'Chelsea',
  '10002': 'Lower East Side',
  '10003': 'Gramercy',
  '10004': 'Financial District',
  '10005': 'Financial District',
  '10006': 'Financial District',
  '10007': 'Tribeca',
  '10009': 'East Village',
  '10010': 'Flatiron',
  '10011': 'Chelsea',
  '10012': 'SoHo',
  '10013': 'SoHo',
  '10014': 'West Village',
  '10016': 'Murray Hill',
  '10017': 'Midtown East',
  '10018': 'Midtown',
  '10019': 'Midtown West',
  '10020': 'Midtown',
  '10021': 'Upper East Side',
  '10022': 'Midtown East',
  '10023': 'Upper West Side',
  '10024': 'Upper West Side',
  '10025': 'Upper West Side',
  '10026': 'Harlem',
  '10027': 'Harlem',
  '10028': 'Upper East Side',
  '10029': 'East Harlem',
  '10030': 'Harlem',
  '10031': 'Hamilton Heights',
  '10032': 'Washington Heights',
  '10033': 'Washington Heights',
  '10034': 'Inwood',
  '10035': 'East Harlem',
  '10036': 'Midtown',
  '10037': 'Harlem',
  '10038': 'Financial District',
  '10039': 'Harlem',
  '10040': 'Washington Heights',
  '10111': 'Midtown',
  '10151': 'Midtown',
  '10152': 'Midtown',
  '10153': 'Midtown',
  '10154': 'Midtown',
  '10165': 'Midtown East',
  '10166': 'Midtown East',
  '10167': 'Midtown East',
  '10168': 'Midtown East',
  '10169': 'Midtown East',
  '10170': 'Midtown East',
  '10171': 'Midtown East',
  '10172': 'Midtown East',
  '10173': 'Midtown East',
  '10174': 'Midtown East',
  '10177': 'Midtown East',

  // Brooklyn
  '11201': 'DUMBO',
  '11205': 'Fort Greene',
  '11206': 'Williamsburg',
  '11211': 'Williamsburg',
  '11215': 'Park Slope',
  '11217': 'Park Slope',
  '11222': 'Greenpoint',
  '11231': 'Gowanus',
  '11249': 'Williamsburg',

  // Queens
  '11101': 'Long Island City',
  '11102': 'Astoria',
  '11103': 'Astoria',
  '11104': 'Sunnyside',
  '11106': 'Astoria'
};

// Neighborhood consolidation mapping
const neighborhoodConsolidation = {
  'Chelsea / West Village': 'Chelsea',
  'Gramercy / East Village': 'Gramercy',
  'Flatiron / Gramercy': 'Flatiron',
  'Midtown / Hell\'s Kitchen': 'Midtown',
  'Midtown / Times Square': 'Midtown',
  'SoHo / NoLita': 'SoHo',
  'SoHo / Tribeca': 'SoHo',
  'Williamsburg / Bushwick': 'Williamsburg',
  'Brooklyn Heights / DUMBO': 'DUMBO',
  'Park Slope / Gowanus': 'Park Slope',
  'Red Hook / Gowanus': 'Gowanus',
  'NYC': 'Manhattan' // Default fallback
};

// Helper to extract better neighborhood from address
function extractNeighborhood(address) {
  if (!address) return 'Manhattan';

  // Extract ZIP code from address
  const zipMatch = address.match(/\b(\d{5})\b/);
  if (zipMatch) {
    const zip = zipMatch[1];
    if (nycZipToNeighborhood[zip]) {
      let neighborhood = nycZipToNeighborhood[zip];
      // Apply consolidation
      if (neighborhoodConsolidation[neighborhood]) {
        neighborhood = neighborhoodConsolidation[neighborhood];
      }
      return neighborhood;
    }
  }

  // Fallback: extract city name
  const parts = address.split(',');
  if (parts.length >= 3) {
    const cityPart = parts[2].trim().split(' ')[0];
    if (cityPart === 'Brooklyn') return 'Brooklyn';
    if (cityPart === 'Manhattan') return 'Manhattan';
    if (cityPart === 'Queens') return 'Queens';
  }

  return 'Manhattan';
}

// Brand-specific workspace types
const brandWorkspaceTypes = {
  "WeWork": ["day-pass", "hot-desk", "dedicated-desk", "private-office", "meeting-rooms"],
  "Industrious": ["hot-desk", "dedicated-desk", "private-office", "meeting-rooms"],
  "The Yard": ["day-pass", "hot-desk", "dedicated-desk", "private-office", "meeting-rooms"],
  "The Farm": ["day-pass", "hot-desk", "dedicated-desk", "private-office", "meeting-rooms", "event-space"],
  "Spaces": ["hot-desk", "dedicated-desk", "private-office", "meeting-rooms"],
  "Bond Collective": ["day-pass", "hot-desk", "dedicated-desk", "private-office", "meeting-rooms"],
  "Convene": ["hot-desk", "private-office", "meeting-rooms", "event-space"],
  "Cubico": ["day-pass", "hot-desk", "private-office", "meeting-rooms"],
  "Serendipity Labs": ["day-pass", "hot-desk", "dedicated-desk", "private-office", "meeting-rooms"],
  "Jay Suites": ["private-office", "meeting-rooms"],
  "Green Desk": ["day-pass", "hot-desk", "private-office", "meeting-rooms"],
  "WorkHouse NYC": ["day-pass", "hot-desk", "dedicated-desk", "private-office", "meeting-rooms", "event-space"],
  "Nomadworks": ["day-pass", "hot-desk", "dedicated-desk", "private-office", "meeting-rooms", "event-space"],
  "Primary": ["day-pass", "hot-desk", "dedicated-desk", "private-office", "meeting-rooms", "event-space"]
};

// Brand-specific amenities
const brandAmenities = {
  "WeWork": ["24/7 access", "Coffee", "Beer", "Phone booths", "Printing"],
  "Industrious": ["24/7 access", "Coffee", "Reception services"],
  "The Yard": ["Coffee", "Beer", "Pet-friendly", "Outdoor space"],
  "The Farm": ["Kitchen"],
  "Spaces": ["Coffee", "Global network access", "24/7 access"],
  "Bond Collective": ["Beer", "Showers", "Recording studios", "Pet-friendly", "Bike storage"],
  "Convene": ["Coffee", "Full catering"],
  "Cubico": ["Pet-friendly", "Rooftop access"],
  "Serendipity Labs": [],
  "Jay Suites": ["24/7 access", "Reception services"],
  "Green Desk": ["Printing"],
  "WorkHouse NYC": ["24/7 access", "Networking events", "Founder community"],
  "Nomadworks": ["Coffee", "Standing desks"],
  "Primary": ["On-site gym", "Wellness studio", "Fitness classes"]
};

// Convert to coworkingData format
const locations = googleData.locations.map(loc => {
  // Extract website domain
  let websiteDomain = loc.website;
  if (websiteDomain) {
    try {
      const url = new URL(websiteDomain);
      websiteDomain = url.hostname.replace('www.', '');
    } catch (e) {
      // If it fails, just use as is
    }
  }

  return {
    brand: loc.brand,
    name: loc.name,
    neighborhood: extractNeighborhood(loc.address),
    address: loc.address,
    rating: loc.rating || 4.1,
    workspaceTypes: brandWorkspaceTypes[loc.brand] || ["hot-desk", "dedicated-desk"],
    amenities: brandAmenities[loc.brand] || [],
    website: websiteDomain || `${loc.brand.toLowerCase().replace(/\s+/g, '')}.com`
  };
});

// Brand-specific pricing (NYC ranges)
const brandPricing = {
  "WeWork": {
    "day-pass": "$29-39/day",
    "hot-desk": "$200-300/mo",
    "meeting-rooms": "$8-10/hr"
  },
  "Industrious": {
    "hot-desk": "Contact for pricing",
    "dedicated-desk": "Contact for pricing",
    "private-office": "Contact for pricing"
  },
  "The Yard": {
    "day-pass": "Contact for pricing",
    "hot-desk": "$300/mo",
    "dedicated-desk": "Contact for pricing",
    "private-office": "Contact for pricing"
  },
  "The Farm": {
    "day-pass": "$18-29/day",
    "hot-desk": "From $179/mo",
    "meeting-rooms": "$50/hr"
  },
  "Spaces": {
    "hot-desk": "From $119/mo",
    "dedicated-desk": "From $439/mo",
    "private-office": "From $479/mo",
    "meeting-rooms": "From $49/hr"
  },
  "Bond Collective": {
    "day-pass": "From $25/day",
    "hot-desk": "From $300/mo",
    "dedicated-desk": "From $500/mo",
    "private-office": "From $500/mo",
    "meeting-rooms": "From $50/hr"
  },
  "Convene": {
    "hot-desk": "Contact for pricing",
    "private-office": "Contact for pricing",
    "meeting-rooms": "Contact for pricing"
  },
  "Cubico": {
    "day-pass": "From $20/hr",
    "hot-desk": "From $180/mo",
    "private-office": "From $35/hr"
  },
  "Serendipity Labs": {
    "day-pass": "Contact for pricing",
    "hot-desk": "From $199/mo",
    "dedicated-desk": "From $839/mo",
    "private-office": "$1,368-22,800/mo"
  },
  "Jay Suites": {
    "private-office": "Contact for pricing",
    "meeting-rooms": "Contact for pricing"
  },
  "Green Desk": {
    "day-pass": "From $29/day",
    "hot-desk": "From $250/mo",
    "private-office": "From $250/mo",
    "meeting-rooms": "From $200/day"
  },
  "WorkHouse NYC": {
    "day-pass": "From $100/day",
    "hot-desk": "$300-400/mo",
    "dedicated-desk": "From $500/mo",
    "private-office": "From $1,500/mo"
  },
  "Nomadworks": {
    "day-pass": "Contact for pricing",
    "hot-desk": "From $295/mo",
    "meeting-rooms": "$35-350/hr"
  },
  "Primary": {
    "day-pass": "Contact for pricing",
    "hot-desk": "From $1,500/mo",
    "dedicated-desk": "From $1,500/mo",
    "private-office": "From $1,500/mo"
  }
};

// Generate brands with workspace types and amenities
const brandsData = [
  {
    name: "WeWork",
    vibe: "Corporate & Community",
    locationSummary: "74+ locations across Manhattan, Brooklyn, Queens",
    priceRange: "$$",
    website: "wework.com",
    workspaceTypes: brandWorkspaceTypes["WeWork"],
    amenities: brandAmenities["WeWork"],
    pricing: brandPricing["WeWork"]
  },
  {
    name: "Industrious",
    vibe: "Premium & Professional",
    locationSummary: "25+ locations in Midtown, Soho, Union Square",
    priceRange: "$$$",
    website: "industriousoffice.com",
    workspaceTypes: brandWorkspaceTypes["Industrious"],
    amenities: brandAmenities["Industrious"],
    pricing: brandPricing["Industrious"]
  },
  {
    name: "The Yard",
    vibe: "Creative & Community-Driven",
    locationSummary: "8 locations - Manhattan (5), Brooklyn (3)",
    priceRange: "$$",
    website: "theyard.nyc",
    workspaceTypes: brandWorkspaceTypes["The Yard"],
    amenities: brandAmenities["The Yard"],
    pricing: brandPricing["The Yard"]
  },
  {
    name: "The Farm",
    vibe: "Rustic & Creative",
    locationSummary: "SoHo",
    priceRange: "$",
    website: "thefarmsoho.com",
    workspaceTypes: brandWorkspaceTypes["The Farm"],
    amenities: brandAmenities["The Farm"],
    pricing: brandPricing["The Farm"]
  },
  {
    name: "Spaces",
    vibe: "Modern & Flexible",
    locationSummary: "Fort Greene, Park Ave, Hudson Yards",
    priceRange: "$$",
    website: "spacesworks.com",
    workspaceTypes: brandWorkspaceTypes["Spaces"],
    amenities: brandAmenities["Spaces"],
    pricing: brandPricing["Spaces"]
  },
  {
    name: "Bond Collective",
    vibe: "Luxurious & Creative",
    locationSummary: "5 locations - Brooklyn (3), Manhattan (2)",
    priceRange: "$$",
    website: "bondcollective.com",
    workspaceTypes: brandWorkspaceTypes["Bond Collective"],
    amenities: brandAmenities["Bond Collective"],
    pricing: brandPricing["Bond Collective"]
  },
  {
    name: "Convene",
    vibe: "Premium Hospitality",
    locationSummary: "Midtown, Financial District",
    priceRange: "$$$",
    website: "convene.com",
    workspaceTypes: brandWorkspaceTypes["Convene"],
    amenities: brandAmenities["Convene"],
    pricing: brandPricing["Convene"]
  },
  {
    name: "Cubico",
    vibe: "Creative & Pet-Friendly",
    locationSummary: "4 SoHo/NoLita locations",
    priceRange: "$$",
    website: "cubico.co",
    workspaceTypes: brandWorkspaceTypes["Cubico"],
    amenities: brandAmenities["Cubico"],
    pricing: brandPricing["Cubico"]
  },
  {
    name: "Serendipity Labs",
    vibe: "Upscale & Professional",
    locationSummary: "2 locations - Financial District, Grand Central",
    priceRange: "$$$",
    website: "serendipitylabs.com",
    workspaceTypes: brandWorkspaceTypes["Serendipity Labs"],
    amenities: brandAmenities["Serendipity Labs"],
    pricing: brandPricing["Serendipity Labs"]
  },
  {
    name: "Jay Suites",
    vibe: "Executive & Flexible",
    locationSummary: "8 locations - Times Square, Grand Central, Financial District",
    priceRange: "$$",
    website: "jaysuites.com",
    workspaceTypes: brandWorkspaceTypes["Jay Suites"],
    amenities: brandAmenities["Jay Suites"],
    pricing: brandPricing["Jay Suites"]
  },
  {
    name: "Green Desk",
    vibe: "Eco-Friendly",
    locationSummary: "8 Brooklyn & Queens locations (no Manhattan)",
    priceRange: "$$",
    website: "greendesk.com",
    workspaceTypes: brandWorkspaceTypes["Green Desk"],
    amenities: brandAmenities["Green Desk"],
    pricing: brandPricing["Green Desk"]
  },
  {
    name: "WorkHouse NYC",
    vibe: "Founder-Focused",
    locationSummary: "1 Midtown Manhattan location",
    priceRange: "$$",
    website: "workhousenyc.com",
    workspaceTypes: brandWorkspaceTypes["WorkHouse NYC"],
    amenities: brandAmenities["WorkHouse NYC"],
    pricing: brandPricing["WorkHouse NYC"]
  },
  {
    name: "Nomadworks",
    vibe: "Community & Collaborative",
    locationSummary: "3 locations - Flatiron, East Village, Williamsburg",
    priceRange: "$$",
    website: "nomadworks.com",
    workspaceTypes: brandWorkspaceTypes["Nomadworks"],
    amenities: brandAmenities["Nomadworks"],
    pricing: brandPricing["Nomadworks"]
  },
  {
    name: "Primary",
    vibe: "Wellness-Focused",
    locationSummary: "Financial District",
    priceRange: "$$",
    website: "liveprimary.com",
    workspaceTypes: brandWorkspaceTypes["Primary"],
    amenities: brandAmenities["Primary"],
    pricing: brandPricing["Primary"]
  }
];

// Generate the JS content
const content = `export const brands = ${JSON.stringify(brandsData, null, 2)}

export const locations = ${JSON.stringify(locations, null, 2)}
`;

// Write to coworkingData.js
fs.writeFileSync(
  path.join(__dirname, '../coworkingData.js'),
  content,
  'utf8'
);

console.log(`✅ Updated coworkingData.js with ${locations.length} locations!`);
