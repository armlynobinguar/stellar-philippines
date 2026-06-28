import fs from 'fs/promises';
import path from 'path';

const GRAPHQL_ENDPOINT = 'https://api.risein.com/graphql'; 
const TARGET_FILE_PATH = path.join(process.cwd(), 'src/data/events.ts');

const GRAPHQL_QUERY = `
query learnPageData {
  learn: learnPage {
    applicationAvailableCohorts {
      _id
      coverImage
      title
      slug
      startDate
      endDate
      location
      externalLink
      level
      isHackathon
      applicationDeadline
    }
    applicationAvailableHackathons {
      _id
      coverImage
      title
      slug
      startDate
      endDate
      location
      externalLink
      level
      isHackathon
      applicationDeadline
    }
  }
}`;

async function extractRiseInEvents() {
  console.log('Extracting data from Rise In API...');
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: GRAPHQL_QUERY }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const jsonResult = await response.json();
  return jsonResult.data?.learn;
}

function transformData(rawData) {
  console.log('Transforming raw data with UI schema matching...');
  if (!rawData) return [];

  const combinedItems = [
    ...(rawData.applicationAvailableCohorts || []),
    ...(rawData.applicationAvailableHackathons || [])
  ];

  const BLACKLIST_KEYWORDS = ['vietnam', 'turkey', 'yozgat', 'bozok', '🇻🇳', '🇹🇷'];
  const WHITELIST_KEYWORDS = ['philippines', 'baliuag', 'apac', 'mastery', 'challenge'];

  const filteredEvents = combinedItems.filter(item => {
    const titleLower = item.title.toLowerCase();
    const locationLower = (item.location || '').toLowerCase();

    const hasBlacklistWord = BLACKLIST_KEYWORDS.some(word => 
      titleLower.includes(word) || locationLower.includes(word)
    );
    if (hasBlacklistWord) return false;

    return WHITELIST_KEYWORDS.some(word => 
      titleLower.includes(word) || locationLower.includes(word)
    );
  });

  const now = new Date();

  return filteredEvents.map(event => {
    const eventDate = new Date(event.startDate);
    const deadlineDate = event.applicationDeadline ? new Date(event.applicationDeadline) : null;
    const endDateVal = event.endDate ? new Date(event.endDate) : null;

    const status = (deadlineDate && deadlineDate > now) || (endDateVal && endDateVal > now) ? 'upcoming' : 'past';

    const time = eventDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Manila'
    });

    let type = 'Workshop';
    if (event.isHackathon || event.title.toLowerCase().includes('hackathon')) {
      type = 'Hackathon';
    } else if (event.title.toLowerCase().includes('bootcamp')) {
      type = 'Bootcamp';
    } else if (event.title.toLowerCase().includes('challenge')) {
      type = 'Challenge';
    }

      const programLevel = event.level ? `${event.level} level ` : '';
      const desc = `Join this exciting ${programLevel}Stellar ecosystem tracking program. Organized via Rise In.`;

      return {
        id: event._id,
        title: event.title,
        image: event.coverImage || 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80', 
        date: eventDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'Asia/Manila' }),
        link: event.externalLink || `https://www.risein.com/programs/${event.slug}`,
        location: event.location || 'Online',
        status,
        time,
        type,
        desc
      };
    });
}

async function loadIntoRepository(transformedEvents) {
  if (!transformedEvents || transformedEvents.length === 0) {
    console.warn('⚡ Warning: No matching local events found.');
    return;
  }

  const fileContent = `export interface CommunityEvent {
  id: string;
  title: string;
  image: string;
  date: string;
  link: string;
  location: string;
  status: 'upcoming' | 'past';
  time: string;
  type: 'Bootcamp' | 'Hackathon' | 'Workshop' | 'Challenge';
  desc: string;
}

export const events: CommunityEvent[] = ${JSON.stringify(transformedEvents, null, 2)};
`;

  await fs.writeFile(TARGET_FILE_PATH, fileContent, 'utf-8');
  console.log(`✅ Success! Synchronized ${transformedEvents.length} full-schema events to ${TARGET_FILE_PATH}`);
}

(async () => {
  try {
    const rawData = await extractRiseInEvents();
    const cleanData = transformData(rawData);
    await loadIntoRepository(cleanData);
  } catch (error) {
    console.error('❌ Pipeline Failed:', error.message);
    process.exitCode = 1; 
  }
})();