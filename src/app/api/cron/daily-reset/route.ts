import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase'
import { sendCompletionEmail } from '@/lib/email'
import { formatSentence } from '@/lib/validation'
import { config } from '@/lib/config'

export const dynamic = 'force-dynamic'

/**
 * Daily cron job that runs at midnight ET
 * 1. Creates new prompt for today
 * 2. Auto-finishes open chains from yesterday
 * 3. Sends completion emails
 */
export async function GET(req: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = req.headers.get('authorization')
    if (authHeader !== `Bearer ${config.cronSecret}`) {
      return NextResponse.json(
        { error: 'unauthorized' },
        { status: 401 }
      )
    }

    const supabase = getAdminClient()

    // Get today and yesterday in America/New_York timezone
    const now = new Date()
    const today = now.toLocaleDateString('en-CA', { timeZone: config.timezone })

    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayDate = yesterday.toLocaleDateString('en-CA', { timeZone: config.timezone })

    console.log(`Daily reset: today=${today}, yesterday=${yesterdayDate}`)

    // 1. Create new prompt for today (if not exists)
    const prompts = [
      "parking lots",
      "existential Wi-Fi",
      "libraries",
      "villains",
      "overwatered succulents",
      "AI art",
      "bluetooth drama",
      "diners again",
      "screen time",
      "car alarms",
      "group selfies",
      "potions",
      "fake news",
      "overthinking",
      "bad Wi-Fi dreams",
      "bad clones",
      "fake sick days",
      "toll booths",
      "missed exits",
      "robots at work",
      "broken simulations",
      "wildfires",
      "the wrong meeting",
      "glitchy pets",
      "too many tabs",
      "haunted playlists again",
      "podcast bros",
      "missing receipts",
      "pizza again",
      "leftovers",
      "sunday scaries",
      "the last flight",
      "déjà vu",
      "midnight emails",
      "IKEA furniture",
      "intergalactic coffee shops",
      "awkward reunions",
      "beaches",
      "lunch breaks",
      "streaming queues",
      "the last notification",
      "GPS nightmares",
      "cold weather",
      "lost wallets",
      "burnt popcorn",
      "dimension swaps",
      "email accident",
      "angry gods",
      "sky reboot",
      "forgotten names",
      "alarm snoozes",
      "Zoom fatigue",
      "invisible people",
      "ghost emails",
      "deleted timelines",
      "flying cars",
      "nostalgia internet",
      "browser history",
      "\"let's circle back\"",
      "wrong destinations",
      "fake productivity",
      "birthday dinners",
      "microwaves",
      "elevators",
      "time-traveling raccoons",
      "cursed Wi-Fi",
      "company swag",
      "the end of the internet",
      "rooftops",
      "midnight texts",
      "smoke alarms",
      "oceans",
      "bad wifi",
      "random confidence",
      "the end of daylight savings",
      "boarding groups",
      "middle seats",
      "treasure maps",
      "landlord visits",
      "heroes",
      "half-written drafts",
      "mysterious smells",
      "reply-alls",
      "bridges",
      "tripping in public",
      "missing moon",
      "tornadoes",
      "brunch",
      "fast food wrappers",
      "layovers",
      "calendar glitch",
      "auto-replies",
      "family dinners",
      "old memes",
      "being perceived",
      "algorithm gods",
      "the comments section",
      "post-AI poetry",
      "carpool karaoke",
      "the elevator pitch",
      "birthday surprises",
      "prophecies",
      "hallways",
      "half-assembled shelves",
      "bad ideas",
      "missing socks",
      "email chains",
      "digital detox",
      "time-looped Mondays",
      "meme stocks",
      "food delivery mix-ups",
      "unread emails",
      "out-of-context screenshots",
      "robot baristas",
      "empty gas tanks",
      "HR nightmares",
      "clones",
      "space weddings",
      "wrong hotels",
      "forgotten laundry",
      "deleted slides",
      "moonlight",
      "silent arguments",
      "awkward silences",
      "fake houseplants",
      "forgetting names",
      "extinct memes",
      "tiny fridges",
      "alarms that never ring",
      "storms",
      "suspicious roommates",
      "traffic again",
      "curses",
      "hotel lobbies",
      "dream archives",
      "misheard lyrics",
      "cereal dinners",
      "TSA lines",
      "cursed emails",
      "corporate jargon",
      "subways",
      "monsters",
      "exes at parties",
      "hangover brunch",
      "zoom calls",
      "grocery chaos",
      "fake confidence",
      "\"sent from my phone\"",
      "travel buddies",
      "cursed dating apps",
      "autocorrect",
      "ice storms",
      "lying to your doctor",
      "midnight snacks",
      "robots",
      "parallel brunch",
      "coffee shortage",
      "vending crimes",
      "time loops",
      "roommate drama",
      "blind dates",
      "restaurants",
      "eclipses",
      "cancelled shows",
      "red lights",
      "office fridge",
      "late-night groceries",
      "ghost roommates",
      "snow",
      "invisible bosses",
      "reunion invites",
      "the group chat",
      "spells",
      "space vacations",
      "translation fails",
      "souvenir scams",
      "conspiracy TikToks",
      "bad passwords",
      "flickering lights",
      "charging anxiety",
      "portals",
      "voice notes",
      "office snacks",
      "interdimensional HR",
      "\"we should hang soon\"",
      "empty highways",
      "missing remotes",
      "comets",
      "influencers",
      "parallel brunch (redux)",
      "performance reviews",
      "invisible neighbors",
      "attics",
      "camera rolls",
      "bad leftovers",
      "phone updates",
      "vending machines that flirt",
      "time freezes mid-meeting",
      "laundromats",
      "backyards",
      "magic again",
      "quantum coffee",
      "misplaced phones",
      "gas prices",
      "hurricanes",
      "bad directions",
      "late-night cooking shows",
      "parks",
      "secret snacks",
      "unread messages",
      "missed birthdays",
      "the sequel",
      "rivers",
      "elevators that lie",
      "haunted closets",
      "coffee that predicts the future",
      "broken projectors",
      "leaking faucets",
      "pretending to know",
      "haunted to-do lists",
      "unpaid interns",
      "malls",
      "jet lag",
      "vending machines again",
      "group projects",
      "classrooms",
      "losing your keys",
      "robots that gossip",
      "microtrends",
      "kitchens",
      "loud tourists",
      "sunburns",
      "viral moments",
      "graduation parties",
      "robot coworkers",
      "bad first impressions",
      "bad advice",
      "broken simulation",
      "spam calls",
      "vacation planning",
      "teleportation",
      "leaked playlists",
      "burnt toast",
      "panic shopping",
      "dream glitches",
      "volcanoes",
      "spam filters",
      "drive-thru ghosts",
      "dying plants",
      "expired coupons",
      "frozen screens",
      "broken GPS",
      "northern lights",
      "alien HR",
      "parallel grocery stores",
      "spilled coffee",
      "cancelled plans",
      "the wrong text",
      "alternate timelines",
      "roadside motels",
      "unclaimed packages",
      "algorithm crushes",
      "boss birthdays",
      "broken chargers",
      "over-apologizing",
      "the exit interview",
      "water cooler rumors",
      "talking pets",
      "buffets",
      "wrong recipients",
      "deleted universe",
      "lost mail",
      "brunch fights",
      "group trips",
      "thermostat wars",
      "power outages",
      "thirst traps",
      "gym people",
      "rental cars",
      "thunder",
      "lost invitations",
      "forgotten umbrellas",
      "budget airlines",
      "unplanned honesty",
      "roommate notes",
      "noisy neighbors",
      "broken chargers again",
      "basements",
      "spilled secrets",
      "soup disasters",
      "mountains",
      "haunted houses",
      "robot cats",
      "haunted playlists",
      "cursed leftovers",
      "dreams",
      "forgotten passwords",
      "hitchhikers",
      "wrong addresses",
      "earthquakes",
      "the last emoji",
      "iced coffee",
      "lost luggage",
      "unmuted mics",
      "airports",
      "frozen dinners",
      "ghosts",
      "traffic lights",
      "rest stops",
      "expired candles",
      "saying \"you too\"",
      "small talk",
      "road construction",
      "late replies",
      "flight delays",
      "the plus-one",
      "diners",
      "global nap day",
      "dead batteries",
      "extinction of weekends",
      "forgetting birthdays",
      "future you",
      "coworker crushes",
      "oversharing friends",
      "long receipts",
      "roommates again",
      "time travel",
      "vampires",
      "gas stations",
      "fog",
      "ghosts on social media",
      "forgotten attachments",
      "drive-thrus",
      "wrong coffee order",
      "reboots",
      "half-charged batteries",
      "passport panic",
      "subscription traps",
      "viral apologies",
      "blank screens",
      "haunted group chats",
      "wrong numbers",
      "coincidences",
      "meeting that could've been an email",
      "restaurant reviews",
      "broken microwaves",
      "postcards",
      "road trips",
      "stan wars",
      "delayed trains",
      "last day of work",
      "office gossip",
      "bad Airbnbs",
      "ghost influencers",
      "cold pizza",
      "rainbows",
      "karaoke night",
      "robot therapists",
      "saying something weird",
      "unsubscribe links",
      "the family chat",
      "crying in the bathroom",
      "\"per my last email\"",
      "deserts",
      "calendar chaos"
    ]

    // Calculate days since October 21, 2025 (theme cycle start date)
    const startDate = new Date('2025-10-21T00:00:00.000-04:00') // October 21, 2025 midnight ET
    const daysSinceStart = Math.floor((now.getTime() - startDate.getTime()) / 86400000)
    const promptText = prompts[daysSinceStart % prompts.length]

    const { error: promptError } = await supabase
      .from('prompts')
      .insert({
        prompt_date: today,
        text: promptText
      })

    if (promptError && !promptError.message.includes('duplicate')) {
      console.error('Error creating prompt:', promptError)
    } else {
      console.log(`Created prompt for ${today}`)
    }

    // 2. Auto-finish open chains from yesterday
    const { data: openChains, error: chainsError } = await supabase
      .from('chains')
      .select('*')
      .eq('prompt_date', yesterdayDate)
      .eq('status', 'open')

    if (chainsError) {
      console.error('Error fetching open chains:', chainsError)
      return NextResponse.json(
        { error: 'failed to fetch open chains' },
        { status: 500 }
      )
    }

    console.log(`Found ${openChains?.length || 0} open chains from yesterday`)

    if (openChains && openChains.length > 0) {
      for (const chain of openChains) {
        // Get entries
        const { data: entries } = await supabase
          .from('entries')
          .select('*')
          .eq('chain_id', chain.id)
          .order('turn_index', { ascending: true })

        if (!entries || entries.length === 0) {
          // No entries, just mark as complete
          await supabase
            .from('chains')
            .update({ status: 'complete', finished_at: now.toISOString() })
            .eq('id', chain.id)
          continue
        }

        const text = entries.map(e => e.text).join(' ')
        const contributors = entries.map(e => e.author_name)
        const finishedAt = now.toISOString()

        // Update chain
        await supabase
          .from('chains')
          .update({ status: 'complete', finished_at: finishedAt })
          .eq('id', chain.id)

        // Create story
        await supabase
          .from('stories')
          .insert({
            chain_id: chain.id,
            prompt_date: chain.prompt_date,
            text,
            contributors,
            finished_at: finishedAt
          })

        console.log(`Auto-finished chain ${chain.id}`)

        // Send notifications
        const { data: notifs } = await supabase
          .from('notifs')
          .select('*')
          .eq('chain_id', chain.id)
          .eq('notified', false)

        if (notifs && notifs.length > 0) {
          const formattedSentence = formatSentence(text)

          for (const notif of notifs) {
            await sendCompletionEmail({
              to: notif.email,
              chainId: chain.id,
              sentence: formattedSentence,
              contributors
            })

            await supabase
              .from('notifs')
              .update({ notified: true })
              .eq('id', notif.id)
          }

          console.log(`Sent ${notifs.length} completion emails for chain ${chain.id}`)
        }
      }
    }

    return NextResponse.json({
      success: true,
      date: today,
      autoFinished: openChains?.length || 0
    })
  } catch (error) {
    console.error('Error in daily reset cron:', error)
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    )
  }
}
