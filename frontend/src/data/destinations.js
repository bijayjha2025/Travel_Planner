import boptangdada from '../assets/destinations/BoptangDada.jpg'
import koshi from '../assets/destinations/Koshi.jpg'
import rasataal from '../assets/destinations/RasaTaal.jpg'
import mundumtrek from '../assets/destinations/MundumTrek.jpg'
import cholungpark from '../assets/destinations/CholungPark.jpg'
import namastejharna from '../assets/destinations/namasteJharna.jpg'
import tinjure from '../assets/destinations/Tinjure.jpg'


export const destinations = [
    {
        id: 1,
        title: "Kanyam",
        location: "Ilam, Koshi",
        category: "Hill Station . Photography . Adventure",
        type: "Nature",
        duration: "2 Days",
        score: 88,
        image: '',
        description:'A peaceful hill station surrounded by green tea gardens and cool mountain air. Kanyam is a great place to slow down, enjoy the scenery, take photos, and experience the quiet beauty of Ilam.',
        isGem: true,
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
    },

    ];