# Ad Monetization Setup Guide

This guide will help you set up Google AdSense and Google Analytics for the CoworkingNYC website.

## What's Already Done

✅ Privacy Policy page created at `/privacy`
✅ Terms of Service page created at `/terms`
✅ Cookie consent banner implemented
✅ Google Analytics integration ready (requires GA ID)
✅ Google AdSense integration ready (requires AdSense ID)
✅ Footer links to Privacy Policy and Terms of Service
✅ GDPR/CCPA compliant cookie consent flow
✅ GitHub Actions for automated monthly data updates

## Setup Steps

### 1. Google Analytics 4 Setup

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property for your website
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)
4. Add it to your `.env.local` file:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
5. Deploy your site and verify tracking is working in GA4

### 2. Google AdSense Setup

**Important**: Your website must be live and have content before applying for AdSense.

1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Sign up and submit your website for review
3. Add the AdSense code to your site (already integrated in the code)
4. Wait for approval (can take 1-3 weeks)
5. Once approved, get your Publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`)
6. Add it to your `.env.local` file:
   ```
   NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
   ```

**AdSense Requirements**:
- Website must be live and accessible
- Must have original, valuable content
- Must comply with AdSense Program Policies
- Must have Privacy Policy and Terms of Service (✅ done)
- Must have sufficient content (CoworkingNYC has 400+ locations)

### 3. Add AdSense Ad Units

After approval, you can add ad units to your pages. Here are recommended placements:

**For `/brands` and `/locations` pages:**

1. **Top Banner Ad** (728x90 or responsive)
   - Place above the filter section

2. **Sidebar Ad** (300x250 or 300x600)
   - Create a sidebar layout for desktop views

3. **In-Feed Ads**
   - Between table rows (every 10-15 rows)

4. **Bottom Banner Ad** (728x90 or responsive)
   - Place in the footer area

Example code to add an ad unit:
```jsx
<ins className="adsbygoogle"
     style={{ display: 'block' }}
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="YYYYYYYYYY"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

### 4. GitHub Actions Setup

To enable automated monthly data updates:

1. Go to your GitHub repository settings
2. Navigate to Settings → Secrets and variables → Actions
3. Add a new repository secret:
   - Name: `GOOGLE_PLACES_API_KEY`
   - Value: Your Google Places API key
4. The workflow will run automatically on the 28th of each month at 2 AM UTC
5. You can also trigger it manually from Actions tab

### 5. Environment Variables Checklist

Make sure these are set in your deployment platform (Vercel, Netlify, etc.):

```bash
# Required for Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Required for AdSense (after approval)
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX

# Required for GitHub Actions (monthly data updates)
GOOGLE_PLACES_API_KEY=your_google_places_api_key_here
```

### 6. Testing

**Cookie Consent Testing**:
1. Visit your site in incognito mode
2. Verify the cookie consent banner appears
3. Click "Accept" and verify it disappears
4. Check localStorage to confirm `cookieConsent` is set
5. Clear localStorage and try "Decline" - verify analytics is not loaded

**Analytics Testing**:
1. Visit your site with AdBlock disabled
2. Open Google Analytics Real-Time view
3. Verify your visit appears
4. Check that pageviews are tracked correctly

**AdSense Testing** (after approval):
1. Visit your pages with AdBlock disabled
2. Verify ads are displaying
3. Check AdSense dashboard for impressions
4. Monitor for any policy violations

## Expected Revenue

Based on industry averages for comparison/directory websites:

**Monthly Estimates** (assuming 10,000 monthly visitors):
- **Page RPM**: $2-8 (revenue per 1,000 pageviews)
- **Monthly Revenue**: $20-80 for 10,000 visitors
- **Monthly Revenue**: $200-800 for 100,000 visitors

**Factors that increase revenue**:
- Higher traffic (SEO optimization)
- Better ad placement
- Engaged users (multiple page views)
- NYC location (higher CPC rates)
- Business/professional audience

## Legal Compliance

✅ **GDPR Compliance**:
- Cookie consent banner implemented
- Privacy Policy includes data collection details
- Users can opt-out of tracking
- Default consent is "denied" until user accepts

✅ **CCPA Compliance**:
- Privacy Policy includes California resident rights
- Opt-out mechanisms provided
- Data collection disclosure

✅ **Google AdSense Policies**:
- No prohibited content
- Original content (data compilation)
- Proper disclosure of third-party services
- Terms of Service in place

## Next Steps

1. Deploy your website to production
2. Set up Google Analytics 4 and add the Measurement ID
3. Apply for Google AdSense (wait for approval)
4. Once approved, add ad units to your pages
5. Set up GitHub Actions with your API key
6. Monitor analytics and optimize ad placements

## Support

For issues or questions:
- Google Analytics: [GA4 Help Center](https://support.google.com/analytics/)
- Google AdSense: [AdSense Help Center](https://support.google.com/adsense/)
- GitHub Actions: [GitHub Actions Docs](https://docs.github.com/en/actions)
