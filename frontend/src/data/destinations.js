import boptangdada from '../assets/destinations/BoptangDada.jpg'
import koshi from '../assets/destinations/Koshi.jpg'
import rasataal from '../assets/destinations/RasaTaal.jpg'
import mundumtrek from '../assets/destinations/MundumTrek.jpg'
import cholungpark from '../assets/destinations/CholungPark.jpg'
import namastejharna from '../assets/destinations/namasteJharna.jpg'
import tinjure from '../assets/destinations/Tinjure.jpg'
import kanyam from '../assets/destinations/Kanyam.jpg'

export const destinations = [
    {
        id: 1,
        title: "Kanyam",
        location: "Ilam, Koshi",
        category: "Hill Station . Photography . Adventure",
        type: "Nature",
        duration: "2 Days",
        score: 88,
        image: kanyam,
        description:'A peaceful hill station surrounded by green tea gardens and cool mountain air. Kanyam is a great place to slow down, enjoy the scenery, take photos, and experience the quiet beauty of Ilam.',
        isGem: true,
        lat: 26.8525,
        lng: 88.0617,
        elevation: 1520,
        bestSeason: "Sep - Dec & Mar - May",
        costPerDay: 2800,
        difficulty: "Easy",
        activities: ["Tea Garden Walks", "Horse Riding", "Orthodox Tea Tasting", "Sunrise Photography"],
        suggestedItems: ["Warm Jacket", "Camera", "Comfortable Walking Shoes", "Thermos"],
        itinerarySample: [
            { day: 1, title: "Arrival & Tea Garden Golden Hour", details: "Check into a local tea estate homestay, walk through rolling hills, and enjoy fresh tea during sunset." },
            { day: 2, title: "Sunrise View & Local Produce Market", details: "Catch the early morning view of Kanchenjunga on a clear day, sample local lollipops & cheese, and head back." }
        ]
    },


    {
        id: 2,
        title: 'Boptang Dada',
        location: 'Belaka, Udayapur',
        category: 'Viewpoint · Natural Beauty . Adventure',
        type: 'Sightseeing',
        duration: '1 day',
        score: 92,
        image: boptangdada,
        description: 'A quiet hilltop in Belaka with wide views of the surrounding hills and landscapes. It is a good spot for enjoying nature, watching the sunset, and getting away from busy places.',
        isGem: true,
        lat: 26.8150,
        lng: 86.9720,
        elevation: 650,
        bestSeason: "Oct - Mar",
        costPerDay: 1800,
        difficulty: "Easy",
        activities: ["Hillside Picnic", "Sunset Watching", "Panorama Photography", "Short Hike"],
        suggestedItems: ["Sun Hat", "Reusable Water Bottle", "Powerbank", "Light Windbreaker"],
        itinerarySample: [
            { day: 1, title: "Belaka Morning Hike & Ridge Picnic", details: "Ascend to Boptang Dada ridge, take in 360-degree views of Sapta Koshi basin, and enjoy evening nature." }
        ]
    },
        
    {
        id: 3,
        title: 'Koshi',
        location: 'Rajabas, Sunsari',
        category: 'River · View. Sunset · Natural Beauty',
        type: 'Sunset',
        duration: '1 day',
        score: 82,
        image: koshi,
        description: 'A peaceful riverside spot where you can enjoy the wide Koshi River and open natural surroundings. The area becomes especially beautiful in the evening when the sun starts to set.',
        isGem: false,
        lat: 26.6120,
        lng: 87.0500,
        elevation: 75,
        bestSeason: "Oct - Apr",
        costPerDay: 2000,
        difficulty: "Easy",
        activities: ["River Boating", "Bird Watching", "Fresh Fish Dinner", "Riverside Stroll"],
        suggestedItems: ["Binoculars", "Insect Repellent", "Sunglasses", "Sandals"],
        itinerarySample: [
            { day: 1, title: "Riverside Exploration & Sunset Cruise", details: "Visit the Koshi floodplains, observe migratory wetland birds, and relax by the river bank as the sun dips below the horizon." }
        ]

    },
    
    {
        id: 4,
        title: 'Rasa Taal',
        location: 'Baklauri, Sunsari',
        category: 'Nature · Sightseeing · Adventure',
        type: 'Fishing',
        duration: '1 day',
        score: 95,
        image: rasataal,
        description: 'A calm and scenic lake surrounded by greenery, making it a nice place to spend a quiet day outdoors. You can enjoy the natural surroundings, go fishing, and simply take a break from the usual routine.',
        isGem: false,
        lat: 26.6950,
        lng: 87.2400,
        elevation: 110,
        bestSeason: "Year-Round",
        costPerDay: 1500,
        difficulty: "Easy",
        activities: ["Canoeing", "Catch-and-Release Fishing", "Shaded Camping", "Birding"],
        suggestedItems: ["Sunscreen", "Picnic Blanket", "Fishing Gear", "Snack Pack"],
        itinerarySample: [
            { day: 1, title: "Lakeside Relaxation & Boating", details: "Spend a relaxing afternoon canoeing around the water lily patches and enjoying fresh local snacks under the shade trees." }
        ]
    },

    {
        id: 5,
        title: 'Mundum Trek',
        location: 'Bhojpur, Khotang, Koshi',
        category: 'Wildlife · Nature . Culture . Adventure',
        type: 'Hiking',
        duration: '4 days',
        score: 87,
        image: mundumtrek,
        description: 'A beautiful trekking route through the hills of eastern Nepal, with forests, mountain views, and local villages along the way. The trek also gives you a chance to experience the culture and everyday life of the communities in the region.',
        isGem: false,
        lat: 27.1700,
        lng: 87.0500,
        elevation: 3150,
        bestSeason: "Oct - Dec & Mar - May",
        costPerDay: 3500,
        difficulty: "Challenging",
        activities: ["Ridge Trekking", "Kirat Cultural Homestays", "Rhododendron Viewing", "Alpine Sunrise"],
        suggestedItems: ["Trekking Poles", "Thermal Layers", "Sturdy Boots", "First Aid Kit", "Headlamp"],
        itinerarySample: [
            { day: 1, title: "Diktel to Chakhewa Pass", details: "Ascend through pine and oak woodlands to reach Chakhewa Pass for panoramic Himalayan views." },
            { day: 2, title: "Chakhewa to Temke Peak", details: "Hike along high ridges with views of Mount Everest and Makalu on clear mornings." },
            { day: 3, title: "Temke to Salpa Pokhari Trail", details: "Immerse in Kirat Rai folklore, visiting sacred alpine lakes and traditional stone houses." },
            { day: 4, title: "Descent to Bhojpur Bazaar", details: "Explore traditional metalcraft artisans in Bhojpur before wrapping up the trek." }
        ]
    },
    {
        id: 6,
        title: 'Cholung Park',
        location: 'Basantapur, Tehrathum',
        category: 'Culture . History . Nature',
        type: 'Culture',
        duration: '2 days',
        score: 87,
        image: cholungpark,
        description: 'A peaceful place where nature and local culture come together. Surrounded by the hills of Tehrathum, it is a good place to explore the local way of life, enjoy the scenery, and learn about the area.',
        isGem: false,
        lat: 27.1400,
        lng: 87.4300,
        elevation: 2200,
        bestSeason: "Sep - May",
        costPerDay: 2200,
        difficulty: "Moderate",
        activities: ["Limbu Cultural Trail", "Tongba Tasting", "Viewpoint Stroll", "Photography"],
        suggestedItems: ["Warm Jacket", "Walking Shoes", "Camera", "Travel Journal"],
        itinerarySample: [
            { day: 1, title: "Basantapur Arrival & Park Trail", details: "Arrive at Basantapur, visit the ethnic heritage monument, and taste authentic warm Tongba." },
            { day: 2, title: "Tinjure Ridge Viewpoint", details: "Take a short trek to nearby ridges for views." }
        ]
    },
    {
        id: 7,
        title: 'Namaste Jharna',
        location: 'Bhedetar, Dhankuta, Koshi',
        category: 'Waterfall . Nature . Photography',
        type: 'Nature',
        duration: '1 day',
        score: 85,
        image: namastejharna,
        description: 'A refreshing waterfall hidden among the green hills near Bhedetar. The sound of falling water and the surrounding greenery make it a nice place for a short trip, photography, and enjoying nature.',
        isGem: true,
        lat: 26.8400,
        lng: 87.3200,
        elevation: 1400,
        bestSeason: "Sep - Nov & Mar - Jun",
        costPerDay: 1900,
        difficulty: "Easy",
        activities: ["Waterfall Canyon Hike", "Cool Dip", "Bhedetar Foggy Viewpoint", "Local Snack Sampling"],
        suggestedItems: ["Waterproof Shoes", "Quick-Dry Towel", "Rain Poncho", "Camera"],
        itinerarySample: [
            { day: 1, title: "Canyon Walk & Waterfall Splash", details: "Follow the stream path into the gorge, admire Namaste Jharna, and stop at Bhedetar tower for afternoon tea." }
        ]
    },
    {
        id: 8,
        title: 'Tinjure',
        location: 'Tehrathum, Sankhuwasabha, Koshi',
        category: 'Hill Station . Nature . Adventure. Religious Site',
        type: 'Culture',
        duration: '1 day',
        score: 83,
        image: tinjure,
        description: 'A beautiful hill area known for its forests, mountain views, and peaceful surroundings. Tinjure is also connected with local religious and cultural traditions, making it a good place to experience both nature and local heritage.',
        isGem: false,
        lat: 27.1800,
        lng: 87.4500,
        elevation: 2900,
        bestSeason: "Mar - May (Rhododendron Season)",
        costPerDay: 2400,
        difficulty: "Moderate",
        activities: ["Rhododendron Trail Walk", "Temple Visit", "Mountain Viewpoint", "Local Organic Food"],
        suggestedItems: ["Windbreaker", "Trekking Shoes", "Sunglasses", "Water Bottle"],
        itinerarySample: [
            { day: 1, title: "TMJ Rhododendron Trail", details: "Explore the 'Rhododendron Capital of Nepal', visit hilltop shrines, and watch sunset over Eastern Himalayas." }
        ]

    },

    ];