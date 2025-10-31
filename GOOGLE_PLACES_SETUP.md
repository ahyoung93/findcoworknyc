# Google Places API Setup

This guide will help you set up Google Places API to automatically fetch coworking space locations.

## Why Use Google Places API?

- **Automated Data**: Fetch real addresses, ratings, and websites automatically
- **Always Current**: Location data stays up-to-date
- **Free Tier**: 10,000 API calls per month (more than enough for monthly updates)
- **Rich Data**: Get ratings, reviews, hours, and more

## Setup Steps

### 1. Get a Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Places API** (New)
4. Go to **APIs & Services** > **Credentials**
5. Click **Create Credentials** > **API Key**
6. Copy your API key

### 2. Configure API Key

1. Open `.env.local` in the root directory
2. Replace `your_api_key_here` with your actual API key:
   ```
   GOOGLE_PLACES_API_KEY=AIza...your-actual-key
   ```

### 3. Secure Your API Key (Important!)

1. In Google Cloud Console, go to your API key
2. Click "Edit API key"
3. Under **API restrictions**, select "Restrict key"
4. Choose **Places API**
5. Under **Application restrictions**, add your domain once deployed

### 4. Run the Script

```bash
# Install dependencies if needed
npm install dotenv

# Run the fetch script (once per month)
node scripts/fetchLocations.js
```

## Usage & Billing

### API Calls Breakdown

For 14 brands with ~5 locations each:
- **Text Search**: 14 calls (one per brand)
- **Place Details**: ~70 calls (one per location)
- **Total**: ~84 calls per run
- **Monthly**: 84 calls (well under 10,000 free limit)

### Cost Estimation

| Service | Price per 1000 calls | Monthly Calls | Cost |
|---------|---------------------|---------------|------|
| Text Search | $32 | 14 | $0.45 |
| Place Details | $17 | 70 | $1.19 |
| **Total** | | | **$1.64/month** |

All covered by the **$200/month free credit** or **10,000 free calls**!

## Output

The script generates `data/google-locations.json` with:

```json
{
  "lastUpdated": "2025-10-28T...",
  "locations": [
    {
      "brand": "WeWork",
      "name": "WeWork Dumbo Heights",
      "placeId": "ChIJ...",
      "address": "81 Prospect St, Brooklyn, NY 11201",
      "neighborhood": "Brooklyn",
      "rating": 4.2,
      "totalRatings": 245,
      "website": "https://www.wework.com/...",
      "phone": "(555) 123-4567",
      "isOpen": true,
      "price": "$$",
      "workspaceTypes": ["hot-desk", "dedicated-desk"],
      "amenities": ["WiFi", "Coffee", "24/7 access"]
    }
  ]
}
```

## Maintenance

- **Run monthly**: Set a calendar reminder to run the script once per month
- **Review data**: Check the generated JSON file for accuracy
- **Update manually**: Add workspace types, pricing, and amenities as needed

## Troubleshooting

### "Invalid API Key"
- Make sure you've enabled Places API in Google Cloud Console
- Check that the API key is correctly copied to `.env.local`

### "ZERO_RESULTS"
- Brand name might need adjustment in the search query
- Try adding more specific search terms

### "OVER_QUERY_LIMIT"
- You've exceeded the free tier (unlikely with monthly updates)
- Check your Google Cloud Console for usage details

## Next Steps

After running the script:
1. Review the generated `google-locations.json`
2. Manually add workspace types for each location (day-pass, part-time, hot-desk, dedicated-desk)
3. Add specific amenities for each location
4. Integrate with your locations page
