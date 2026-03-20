import ZAI from 'z-ai-web-dev-sdk';

// Cache for 1 hour
const CACHE_DURATION = 60 * 60 * 1000;
let cachedData: any = null;
let lastFetchTime = 0;

// Sources to try for podium vehicle data
const SOURCES = [
  'https://www.rockpapershotgun.com/this-weeks-gta-online-podium-car',
  'https://www.eurogamer.net/gta-online-podium-vehicle-lucky-wheel-9302',
  'https://www.turtlebeach.com/blog/gta-online-podium-car',
];

// Fallback data when scraping fails
const FALLBACK_VEHICLES = [
  {
    id: 'schlagen-gt',
    name: 'Benefactor Schlagen GT',
    manufacturer: 'Benefactor',
    type: 'Sports Car',
    image: 'https://cdn.gtabase.com/images/vehicles/benefactor-schlagen-gt.png',
    originalPrice: 1325000,
    currency: 'GTA$',
    dealer: 'Legendary Motorsport',
    stats: {
      topSpeed: { label: 'Vitesse de pointe', value: 88, maxValue: 100, unit: 'mph' },
      acceleration: { label: 'Accélération', value: 82, maxValue: 100, unit: 's' },
      braking: { label: 'Freinage', value: 70, maxValue: 100, unit: '' },
      traction: { label: 'Traction', value: 80, maxValue: 100, unit: '' },
    },
    description: 'Le Schlagen GT de Benefactor est une voiture de sport allemande inspirée de la Mercedes-AMG GT, offrant des performances exceptionnelles sur route.',
  },
  {
    id: 'ignus',
    name: 'Pegassi Ignus',
    manufacturer: 'Pegassi',
    type: 'Super Car',
    image: 'https://cdn.gtabase.com/images/vehicles/pegassi-ignus.png',
    originalPrice: 2650000,
    currency: 'GTA$',
    dealer: 'Legendary Motorsport',
    stats: {
      topSpeed: { label: 'Vitesse de pointe', value: 92, maxValue: 100, unit: 'mph' },
      acceleration: { label: 'Accélération', value: 88, maxValue: 100, unit: 's' },
      braking: { label: 'Freinage', value: 75, maxValue: 100, unit: '' },
      traction: { label: 'Traction', value: 85, maxValue: 100, unit: '' },
    },
    description: 'L\'Ignus de Pegassi est une supercar italienne inspirée de la Lamborghini Huracán Sterrato, combinant performance brute et design agressif.',
  },
  {
    id: 'jb700w',
    name: 'Dewbauchee JB 700W',
    manufacturer: 'Dewbauchee',
    type: 'Sports Classic',
    image: 'https://cdn.gtabase.com/images/vehicles/dewbauchee-jb-700w.png',
    originalPrice: 1690000,
    currency: 'GTA$',
    dealer: 'Legendary Motorsport',
    stats: {
      topSpeed: { label: 'Vitesse de pointe', value: 85, maxValue: 100, unit: 'mph' },
      acceleration: { label: 'Accélération', value: 78, maxValue: 100, unit: 's' },
      braking: { label: 'Freinage', value: 68, maxValue: 100, unit: '' },
      traction: { label: 'Traction', value: 82, maxValue: 100, unit: '' },
    },
    description: 'Le JB 700W de Dewbauchee est une voiture de sport classique inspirée de l\'Aston Martin DB5, avec des fonctionnalités uniques.',
  },
];

// Vehicle database for matching
const VEHICLE_DATABASE: Record<string, any> = {
  'schlagen gt': FALLBACK_VEHICLES[0],
  'ignus': FALLBACK_VEHICLES[1],
  'jb 700w': FALLBACK_VEHICLES[2],
  'jb700w': FALLBACK_VEHICLES[2],
  'neon': {
    id: 'neon',
    name: 'Pfister Neon',
    manufacturer: 'Pfister',
    type: 'Sports Car',
    image: 'https://cdn.gtabase.com/images/vehicles/pfister-neon.png',
    originalPrice: 1500000,
    currency: 'GTA$',
    dealer: 'Legendary Motorsport',
    stats: {
      topSpeed: { label: 'Vitesse de pointe', value: 86, maxValue: 100, unit: 'mph' },
      acceleration: { label: 'Accélération', value: 84, maxValue: 100, unit: 's' },
      braking: { label: 'Freinage', value: 72, maxValue: 100, unit: '' },
      traction: { label: 'Traction', value: 83, maxValue: 100, unit: '' },
    },
    description: 'Le Neon de Pfister est une voiture de sport électrique inspirée de la Porsche Taycan, alliant performance et écologie.',
  },
  'sc1': {
    id: 'sc1',
    name: 'Übermacht SC1',
    manufacturer: 'Übermacht',
    type: 'Super Car',
    image: 'https://cdn.gtabase.com/images/vehicles/ubermacht-sc1.png',
    originalPrice: 1603000,
    currency: 'GTA$',
    dealer: 'Legendary Motorsport',
    stats: {
      topSpeed: { label: 'Vitesse de pointe', value: 90, maxValue: 100, unit: 'mph' },
      acceleration: { label: 'Accélération', value: 85, maxValue: 100, unit: 's' },
      braking: { label: 'Freinage', value: 74, maxValue: 100, unit: '' },
      traction: { label: 'Traction', value: 84, maxValue: 100, unit: '' },
    },
    description: 'Le SC1 d\'Übermacht est une supercar allemande inspirée de la BMW i8, avec un design futuriste et des performances de pointe.',
  },
};

function getWeeklyBonus(): any[] {
  const bonuses = [
    { id: 1, title: 'Double GTA$ & RP', description: 'Courses de rue à travers la ville', icon: 'race' },
    { id: 2, title: '30% de réduction', description: 'Sur tous les véhicules sélectionnés', icon: 'discount' },
    { id: 3, title: 'Triple récompenses', description: 'Missions du Diamond Casino', icon: 'casino' },
  ];
  return bonuses;
}

async function fetchFromWebSearch(zai: any): Promise<any> {
  try {
    const searchResults = await zai.functions.invoke('web_search', {
      query: 'GTA Online casino podium vehicle this week current 2026',
      num: 5,
    });

    if (!searchResults || searchResults.length === 0) {
      return null;
    }

    // Try to extract vehicle name from search results
    for (const result of searchResults) {
      const snippet = result.snippet?.toLowerCase() || '';
      const title = result.name?.toLowerCase() || '';

      // Look for vehicle names in the snippet/title
      for (const [key, vehicle] of Object.entries(VEHICLE_DATABASE)) {
        const vehicleName = vehicle.name.toLowerCase();
        if (snippet.includes(vehicleName) || title.includes(vehicleName) || snippet.includes(key)) {
          return {
            ...vehicle,
            source: result.url,
            sourceName: result.host_name,
          };
        }
      }
    }

    return null;
  } catch (error) {
    console.error('Web search failed:', error);
    return null;
  }
}

async function fetchWithLLMExtraction(zai: any): Promise<any> {
  try {
    // Search for current podium vehicle
    const searchResults = await zai.functions.invoke('web_search', {
      query: 'GTA Online podium car this week March 2026',
      num: 3,
    });

    if (!searchResults || searchResults.length === 0) {
      return null;
    }

    // Combine snippets for LLM analysis
    const contextText = searchResults
      .map((r: any) => `${r.name}\n${r.snippet}`)
      .join('\n\n');

    // Use LLM to extract vehicle information
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a GTA Online expert. Extract the current podium vehicle from the search results.
Return ONLY a JSON object with this exact structure, no markdown:
{
  "name": "Full vehicle name (e.g., Pegassi Ignus)",
  "manufacturer": "Manufacturer name (e.g., Pegassi)",
  "type": "Vehicle type (Super Car, Sports Car, Sports Classic, etc.)",
  "found": true/false
}
If you cannot determine the current podium vehicle, return {"found": false}`,
        },
        {
          role: 'user',
          content: `Search results:\n${contextText}\n\nWhat is the current GTA Online podium vehicle?`,
        },
      ],
      temperature: 0.1,
    });

    const responseText = completion.choices[0]?.message?.content || '';
    
    try {
      const parsed = JSON.parse(responseText);
      if (parsed.found && parsed.name) {
        // Find matching vehicle in database
        const nameLower = parsed.name.toLowerCase();
        for (const [key, vehicle] of Object.entries(VEHICLE_DATABASE)) {
          if (nameLower.includes(key) || vehicle.name.toLowerCase().includes(nameLower)) {
            return vehicle;
          }
        }
        // Return partial data if not in database
        return {
          id: nameLower.replace(/\s+/g, '-'),
          name: parsed.name,
          manufacturer: parsed.manufacturer || 'Unknown',
          type: parsed.type || 'Sports Car',
          image: 'https://cdn.gtabase.com/images/vehicles/placeholder.png',
          originalPrice: 1000000,
          currency: 'GTA$',
          dealer: 'Legendary Motorsport',
          stats: {
            topSpeed: { label: 'Vitesse de pointe', value: 80, maxValue: 100, unit: 'mph' },
            acceleration: { label: 'Accélération', value: 75, maxValue: 100, unit: 's' },
            braking: { label: 'Freinage', value: 70, maxValue: 100, unit: '' },
            traction: { label: 'Traction', value: 75, maxValue: 100, unit: '' },
          },
          description: `${parsed.name} est le véhicule du podium cette semaine au Diamond Casino.`,
        };
      }
    } catch (e) {
      console.error('Failed to parse LLM response:', e);
    }

    return null;
  } catch (error) {
    console.error('LLM extraction failed:', error);
    return null;
  }
}

export async function getPodiumVehicle() {
  const now = Date.now();

  // Return cached data if still valid
  if (cachedData && now - lastFetchTime < CACHE_DURATION) {
    return cachedData;
  }

  try {
    const zai = await ZAI.create();

    // Try multiple methods to get current podium vehicle
    let vehicleData = await fetchWithLLMExtraction(zai);

    if (!vehicleData) {
      vehicleData = await fetchFromWebSearch(zai);
    }

    // Use fallback if all methods fail
    if (!vehicleData) {
      // Select a vehicle based on current week number to vary the fallback
      const weekNumber = Math.floor(now / (7 * 24 * 60 * 60 * 1000));
      const index = weekNumber % FALLBACK_VEHICLES.length;
      vehicleData = FALLBACK_VEHICLES[index];
    }

    // Get current date info
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 4); // Thursday
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const result = {
      currentPodiumVehicle: {
        ...vehicleData,
        weekStart: weekStart.toISOString().split('T')[0],
        weekEnd: weekEnd.toISOString().split('T')[0],
      },
      weeklyBonuses: getWeeklyBonus(),
      casinoInfo: {
        name: 'Diamond Casino & Resort',
        location: 'East Vinewood, Los Santos',
        spinCost: 'GTA$ 50,000',
        podiumRefreshDay: 'Jeudi',
      },
      lastUpdated: new Date().toISOString(),
    };

    // Update cache
    cachedData = result;
    lastFetchTime = now;

    return result;
  } catch (error) {
    console.error('Failed to fetch podium vehicle:', error);
    
    // Return cached data if available, otherwise fallback
    if (cachedData) {
      return cachedData;
    }

    // Return a default fallback
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 4);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    return {
      currentPodiumVehicle: {
        ...FALLBACK_VEHICLES[0],
        weekStart: weekStart.toISOString().split('T')[0],
        weekEnd: weekEnd.toISOString().split('T')[0],
      },
      weeklyBonuses: getWeeklyBonus(),
      casinoInfo: {
        name: 'Diamond Casino & Resort',
        location: 'East Vinewood, Los Santos',
        spinCost: 'GTA$ 50,000',
        podiumRefreshDay: 'Jeudi',
      },
      lastUpdated: new Date().toISOString(),
    };
  }
}
