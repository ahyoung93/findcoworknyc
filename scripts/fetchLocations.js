/**
 * Script to fetch coworking locations from Google Places API
 * Run once a month to stay within free tier limits
 *
 * Usage: node scripts/fetchLocations.js
 */

require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const https = require('https');

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

if (!API_KEY || API_KEY === 'your_api_key_here') {
  console.error('❌ Please set GOOGLE_PLACES_API_KEY in .env.local');
  process.exit(1);
}

// NYC bounds for more accurate results
const NYC_LOCATION = '40.7128,-74.0060'; // NYC center
const RADIUS = 25000; // 25km radius

const brands = [
  "WeWork",
  "Industrious",
  "The Yard",
  "The Farm",
  "Spaces",
  "Bond Collective",
  "Convene",
  "Cubico",
  "Serendipity Labs",
  "Jay Suites",
  "Green Desk",
  "WorkHouse NYC",
  "Nomadworks",
  "Primary"
];

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function searchPlaces(brandName) {
  const query = encodeURIComponent(`${brandName} coworking NYC`);
  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${NYC_LOCATION}&radius=${RADIUS}&key=${API_KEY}`;

  console.log(`🔍 Searching for: ${brandName}`);
  let allResults = [];
  let pageCount = 0;
  let nextPageToken = null;

  // Google allows up to 3 pages (60 results max)
  while (pageCount < 3) {
    const response = await makeRequest(url);
    pageCount++;

    if (response.status !== 'OK' && response.status !== 'ZERO_RESULTS') {
      console.log(`  ⚠️  ${brandName} (page ${pageCount}): ${response.status}`);
      break;
    }

    if (response.results && response.results.length > 0) {
      allResults = allResults.concat(response.results);
      console.log(`  ✓ Page ${pageCount}: Found ${response.results.length} locations (${allResults.length} total)`);
    }

    // Check for next page
    nextPageToken = response.next_page_token;
    if (!nextPageToken) {
      break; // No more pages
    }

    // Google requires a delay before using next_page_token (usually 2 seconds)
    console.log(`  ⏳ Waiting for next page...`);
    await new Promise(resolve => setTimeout(resolve, 2000));

    url = `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${nextPageToken}&key=${API_KEY}`;
  }

  return { results: allResults, apiCalls: pageCount };
}

async function getPlaceDetails(placeId) {
  const fields = 'formatted_address,rating,website,user_ratings_total,opening_hours,formatted_phone_number';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${API_KEY}`;

  const response = await makeRequest(url);

  if (response.status === 'OK') {
    return response.result;
  }

  return null;
}

async function fetchAllLocations() {
  const allLocations = [];
  let totalApiCalls = 0;

  for (const brand of brands) {
    try {
      const { results: places, apiCalls: searchCalls } = await searchPlaces(brand);
      totalApiCalls += searchCalls; // Count search API calls (including pagination)

      // Fetch details for each location
      for (const place of places) {
        const details = await getPlaceDetails(place.place_id);
        totalApiCalls++; // Details call

        if (details) {
          const location = {
            brand: brand,
            name: place.name,
            placeId: place.place_id,
            address: details.formatted_address || place.formatted_address,
            neighborhood: extractNeighborhood(details.formatted_address || place.formatted_address),
            rating: details.rating || null,
            totalRatings: details.user_ratings_total || null,
            website: details.website || null,
            phone: details.formatted_phone_number || null,
            isOpen: details.opening_hours?.open_now || null,
            // You'll need to manually add these later:
            price: "$$",
            workspaceTypes: ["hot-desk", "dedicated-desk"], // Default, customize later
            amenities: ["WiFi", "Coffee"]
          };

          allLocations.push(location);
          console.log(`    ✓ ${place.name} - Rating: ${location.rating || 'N/A'}`);
        }

        // Rate limiting: wait 100ms between requests
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.error(`  ❌ Error fetching ${brand}:`, error.message);
    }
  }

  console.log(`\n📊 Total API calls made: ${totalApiCalls}`);
  console.log(`📍 Total locations found: ${allLocations.length}`);

  return allLocations;
}

function extractNeighborhood(address) {
  if (!address) return 'NYC';

  // Try to extract neighborhood from address
  // Format: "Street, City, State ZIP"
  const parts = address.split(',');
  if (parts.length >= 2) {
    const cityPart = parts[1].trim();
    // Remove state/ZIP
    return cityPart.split(' ')[0];
  }

  return 'NYC';
}

async function main() {
  console.log('🚀 Starting Google Places API fetch...\n');

  const locations = await fetchAllLocations();

  // Save to JSON file
  const outputPath = './data/google-locations.json';
  fs.mkdirSync('./data', { recursive: true });
  fs.writeFileSync(
    outputPath,
    JSON.stringify({
      lastUpdated: new Date().toISOString(),
      locations: locations
    }, null, 2)
  );

  console.log(`\n✅ Saved ${locations.length} locations to ${outputPath}`);
  console.log('📅 Next update: Run this script again in 1 month');
}

main().catch(console.error);
