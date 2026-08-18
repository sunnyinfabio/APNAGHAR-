/**
 * AapnoGhar Resort - Centralized Master Data Repository
 * Preserves 100% authentic live data: packages, rooms, venues, attractions, menus, and business rules.
 */

const AAPNOGHAR_DATA = {
  // Contact & Location
  contact: {
    phones: ['+91 76667 79997', '0124 2371281', '0124 2371282'],
    email: 'info@aapnoghar.com',
    address: '43rd Milestone, NH-8, Delhi-Jaipur Expressway, Sector 77, Gurugram, Haryana 122004',
    city: 'Gurugram',
    state: 'Haryana',
    coordinates: { lat: 28.3865372, lng: 76.9736545 },
    timings: {
      waterPark: '10:00 AM - 07:00 PM (All 365 Days)',
      amusementPark: '10:00 AM - 07:00 PM',
      restaurant: '07:30 AM - 11:00 PM',
      checkIn: '12:00 PM',
      checkOut: '10:30 AM'
    }
  },

  // Real Packages & Pricing (Phase 8 & 9)
  packages: {
    weekday: {
      title: 'Weekdays (Monday to Friday)',
      fullDay: {
        title: 'Full Day Picnic Package',
        timings: '10:00 AM to 07:00 PM',
        adultPrice: 1599,
        kidPrice: 1299,
        childRule: 'Kids below 33 inches are complimentary',
        inclusions: [
          'Full Water Park Access',
          '21+ Thrilling Amusement Rides',
          '24+ Adventure Activities & Obstacle Drills',
          'Rope Course Activities & Zipline',
          'Selfie Points & Traditional Village Games',
          'Full Day Food Itinerary (Breakfast, Lunch, Chaat, Beverages)'
        ]
      },
      halfDay: {
        title: 'Half Day Picnic Package',
        timings: '01:30 PM to 07:00 PM',
        adultPrice: 1299,
        kidPrice: 899,
        childRule: 'Kids below 33 inches are complimentary',
        inclusions: [
          'Water Park & Amusement Park Access',
          'Adventure Activities',
          'Lavish Lunch Buffet & Evening Hi-Tea with Chaat'
        ]
      }
    },
    weekend: {
      title: 'Weekends & Gazetted Holidays',
      fullDay: {
        title: 'Weekend Full Day Fiesta',
        timings: '10:00 AM to 07:00 PM',
        adultPrice: 1799,
        kidPrice: 1499,
        childRule: 'Kids below 33 inches are complimentary',
        inclusions: [
          'Unlimited Water Park & Wave Pool',
          'All 21+ Amusement Rides & 24+ Adventure Activities',
          'Live Puppet Show, Magic Show & Cultural Dance',
          'Complete Gourmet Food Itinerary (Breakfast, Lunch, Live Counters, Hi-Tea)'
        ]
      },
      halfDay: {
        title: 'Weekend Half Day Package',
        timings: '01:30 PM to 07:00 PM',
        adultPrice: 1499,
        kidPrice: 1099,
        childRule: 'Kids below 33 inches are complimentary',
        inclusions: [
          'Afternoon to Evening Access to Water & Amusement Parks',
          'Buffet Lunch & Purani Dilli Chaat Counters'
        ]
      }
    }
  },

  // Complete Authentic Food Itinerary (Phase 9)
  foodItinerary: {
    breakfast: {
      time: '09:30 AM - 10:30 AM',
      items: ['Tea', 'Aloo ki Sabzi', 'Poori', 'Idli', 'Sambhar', 'Poha', 'Halwa', 'Achaar', 'Chatni']
    },
    lunch: {
      time: '01:00 PM - 02:30 PM',
      items: [
        'Green Salad', 'Veg Chowmein', 'Vegetables in Hot Garlic Sauce', 'Steamed Rice',
        'Rajma / Dal Tadka / Chole', 'Paneer Butter Masala', 'Seasonal Vegetable',
        'Raita', 'Naan', 'Tandoori Roti', 'Papad', 'Chatni', 'Achaar', 'Seviyan'
      ]
    },
    beverages: {
      time: '11:00 AM - 01:00 PM & 03:00 PM - 06:00 PM',
      items: ['Tea', 'Neembu Shikanjee', 'Jal Jeera', 'Sharbat']
    },
    puraniDilliChaat: {
      title: 'Purani Dilli Special Chaat Counter',
      items: ['Aloo Tikki (Crispy Fried)', 'Gol Gappe (Pani Puri)', 'Bhel Poori with Tangy Tamarind']
    },
    liveSaladCounter: {
      title: 'Live Fresh Salad Counter',
      items: ['Garden Fresh Greens', 'Cucumber', 'Carrots', 'Sprouts', 'Assorted Dressings']
    },
    gharKaAangan: {
      title: 'Special Food from "Ghar Ka Aangan"',
      items: [
        'Kadhi Pakora', 'Jau ki Roti', 'Lehsoon ki Chatni', 'Pakode',
        'Chuski', 'Sugar Candy', 'Raabdi', 'Sattu', 'Popcorn',
        'Roasted Channa', 'Mithi Goli Chini', 'Jalebi Rabri'
      ]
    }
  },

  // All 6 Room Categories Preserved (Phase 4)
  rooms: [
    {
      id: 'presidential-suite-1',
      name: 'Presidential Suite',
      route: '/presidential-suite-room-1.html',
      size: '800 Sq. Ft.',
      occupancy: '2 Adults + 2 Children',
      bedType: 'King Size Bed',
      view: 'Lush Garden & Courtyard View',
      wifi: 'High-Speed Complimentary Wi-Fi',
      basePrice: 8499,
      image: '/AapnoGharlmages/RoomImages/presidential-suite-room-2.jpg',
      gallery: [
        '/AapnoGharlmages/PhotoImage/presidential-suite-room-3-rooms-aapnoghar-admin.jpg',
        '/AapnoGharlmages/PhotoImage/presidential-suite-room-4-rooms-aapnoghar-admin.jpg',
        '/AapnoGharlmages/PhotoImage/presidential-suite-room-5-rooms-aapnoghar-admin.jpg'
      ],
      amenities: ['Living Lounge Area', 'Mini Refrigerator', 'Coffee Maker', '43" LED TV', 'In-Room Safe', 'Rain Shower', 'Room to Room Dial', 'Private Balcony', '24/7 In-Room Dining'],
      tourUrl: 'aapno360/presidential-suite.html'
    },
    {
      id: 'suite-room',
      name: 'Suite Room',
      route: '/suite-room.html',
      size: '600 Sq. Ft.',
      occupancy: '2 Adults + 2 Children',
      bedType: 'King Size Premium Bed',
      view: 'Garden & Pool View',
      wifi: 'Free High-Speed Wi-Fi',
      basePrice: 7299,
      image: '/AapnoGharlmages/RoomImages/suite-room.jpg',
      gallery: [
        '/AapnoGharlmages/GalleryImage/suite-room-room-1-3.jpg',
        '/AapnoGharlmages/GalleryImage/suite-room-room-2-3.jpg',
        '/AapnoGharlmages/GalleryImage/suite-room-room-3-3.jpg'
      ],
      amenities: ['Separate Sitting Area', 'Single Sofa-cum-Bed', 'Mini Bar', 'Tea/Coffee Maker', 'Electric Kettle', 'Wardrobe', 'Satellite Channels'],
      tourUrl: 'aapno360/presidential-suite.html'
    },
    {
      id: 'luxury-room',
      name: 'Luxury Room',
      route: '/luxury-room.html',
      size: '450 Sq. Ft.',
      occupancy: '2 Adults + 1 Child',
      bedType: 'Queen / Twin Beds',
      view: 'Lawn & Flora View',
      wifi: 'Complimentary Wi-Fi',
      basePrice: 5499,
      image: '/AapnoGharlmages/RoomImages/luxury-room.jpg',
      gallery: [
        '/AapnoGharlmages/GalleryImage/luxury-room-room-1-2.jpg',
        '/AapnoGharlmages/GalleryImage/luxury-room-room-2-2.jpg',
        '/AapnoGharlmages/GalleryImage/luxury-room-room-3-2.jpg'
      ],
      amenities: ['Air Conditioning', 'Flat Screen TV', 'Intercom', 'Work Desk', 'Premium Toiletries', 'Daily Housekeeping'],
      tourUrl: 'aapno360/presidential-suite.html'
    },
    {
      id: 'luxury-room-2',
      name: 'Luxury Room 2',
      route: '/luxury-room-2.html',
      size: '450 Sq. Ft.',
      occupancy: '2 Adults + 1 Child',
      bedType: 'King Bed',
      view: 'Courtyard View',
      wifi: 'Complimentary Wi-Fi',
      basePrice: 5499,
      image: '/AapnoGharlmages/RoomImages/luxury-room-2.jpg',
      gallery: [
        '/AapnoGharlmages/GalleryImage/luxury-room-2-room-1-6.jpg',
        '/AapnoGharlmages/GalleryImage/luxury-room-2-room-2-6.jpg',
        '/AapnoGharlmages/GalleryImage/luxury-room-2-room-3-6.jpg'
      ],
      amenities: ['Modern Bathroom', '24h Hot Water', 'Dressing Mirror', 'Luggage Rack', 'Tea Kit'],
      tourUrl: 'aapno360/presidential-suite.html'
    },
    {
      id: 'luxury-room-glass-partition',
      name: 'Luxury Room with Shower Glass Partition',
      route: '/Luxury-Room-with-Shower-Glass-Partition.html',
      size: '480 Sq. Ft.',
      occupancy: '2 Adults + 1 Child',
      bedType: 'King Size Bed',
      view: 'Garden Landscape',
      wifi: 'Complimentary Wi-Fi',
      basePrice: 5999,
      image: '/AapnoGharlmages/RoomImages/Luxury-Room-with-Partition-Glass.jpg',
      gallery: [
        '/AapnoGharlmages/GalleryImage/luxury-room-with-partition-glass-room-1-7.jpg'
      ],
      amenities: ['Glass Enclosed Shower Cubicle', 'Rain Shower', 'LED Lighting', 'Smart TV', 'Mini Fridge'],
      tourUrl: 'aapno360/presidential-suite.html'
    },
    {
      id: 'deluxe-room',
      name: 'Deluxe Room',
      route: '/deluxe-room.html',
      size: '350 Sq. Ft.',
      occupancy: '2 Adults',
      bedType: 'Double Bed',
      view: 'Green Verandah',
      wifi: 'Complimentary Wi-Fi',
      basePrice: 4299,
      image: '/AapnoGharlmages/RoomImages/deluxe-room.jpg',
      gallery: [
        '/AapnoGharlmages/GalleryImage/deluxe-room-room-1-1.jpg',
        '/AapnoGharlmages/PhotoImage/deluxe-2-rooms-aapnoghar-admin.jpg',
        '/AapnoGharlmages/PhotoImage/deluxe-4-rooms-aapnoghar-admin.jpg'
      ],
      amenities: ['Direct Dialing', 'Cable TV', 'Attached Washroom', 'Running Hot/Cold Water', 'Wardrobe'],
      tourUrl: 'aapno360/presidential-suite.html'
    }
  ],

  // Complete Water Park Attractions (Phase 5)
  waterParkAttractions: [
    { name: 'Turbo Twister Slide', type: 'Extreme Thrill', desc: 'High-velocity spiraling drop for thrill seekers.', image: '/AapnoGharlmages/PhotoImage/water-park6-water-park-aapnoghar-admin.jpg', thrill: 5 },
    { name: 'Aqua Tube Slide', type: 'Speed Slide', desc: 'Enclosed tunnel with sudden twists and splashes.', image: '/AapnoGharlmages/PhotoImage/water-park11-water-park-aapnoghar-admin.jpg', thrill: 5 },
    { name: 'Family Fun Slide', type: 'Family Slide', desc: 'Wide multi-lane ramp where parents and kids glide together.', image: '/AapnoGharlmages/PhotoImage/water-park7-water-park-aapnoghar-admin.jpg', thrill: 4 },
    { name: 'Multi Theme Water Play Station', type: 'Kids & Family', desc: 'Interactive aquatic castle with mini slides and water guns.', image: '/AapnoGharlmages/PhotoImage/water-park12-water-park-aapnoghar-admin.jpg', thrill: 3 },
    { name: 'Closed Tunnel Body Slide', type: 'Thrill', desc: 'Total darkness speed slide with exhilarating water rush.', image: '/AapnoGharlmages/PhotoImage/water-park13-water-park-aapnoghar-admin.jpg', thrill: 4 },
    { name: 'Open Body Tunnel Slide', type: 'Thrill', desc: 'Smooth curved body slide overlooking the lush estate.', image: '/AapnoGharlmages/PhotoImage/water-park14-water-park-aapnoghar-admin.jpg', thrill: 4 },
    { name: 'Mountain Slide', type: 'Adventure', desc: 'Sloping rock-themed slide ending in a refreshing lagoon.', image: '/AapnoGharlmages/PhotoImage/water-park15-water-park-aapnoghar-admin.jpg', thrill: 4 },
    { name: 'Wavy Slide', type: 'Family Thrill', desc: 'Undulating water ramp that creates weightless air moments.', image: '/AapnoGharlmages/PhotoImage/water-park16-water-park-aapnoghar-admin.jpg', thrill: 4 },
    { name: 'Giant Wave Pool', type: 'Family Favourite', desc: 'Simulated ocean waves in a massive, lifeguard-patrolled pool.', image: '/AapnoGharlmages/PhotoImage/water-park18-water-park-aapnoghar-admin.jpg', thrill: 4 },
    { name: 'DJ Rain Dance Arena', type: 'Party Arena', desc: 'Overhead monsoon mist showers with live DJ music.', image: '/AapnoGharlmages/PhotoImage/water-park19-water-park-aapnoghar-admin.jpg', thrill: 5 },
    { name: 'Giant Tipping Bucket', type: 'Kids & Family', desc: 'Massive elevated bucket tipping hundreds of gallons at once.', image: '/AapnoGharlmages/PhotoImage/water-park20-water-park-aapnoghar-admin.jpg', thrill: 4 },
    { name: 'Shallow Water Lagoons', type: 'Kids Zone', desc: 'Safe, ankle-deep splash pools with water umbrellas.', image: '/AapnoGharlmages/PhotoImage/water-park21-water-park-aapnoghar-admin.jpg', thrill: 2 },
    { name: 'Rain Huts & Mist Cabanas', type: 'Relaxation', desc: 'Thatched huts with cooling rainfall curtains.', image: '/AapnoGharlmages/PhotoImage/water-park22-water-park-aapnoghar-admin.jpg', thrill: 2 },
    { name: 'Shower Pillars', type: 'Fun Spray', desc: 'High-pressure mist pillars for instant rejuvenation.', image: '/AapnoGharlmages/PhotoImage/water-park23-water-park-aapnoghar-admin.jpg', thrill: 3 },
    { name: 'Family & Kids Play Pan', type: 'Toddler Safe', desc: 'Gentle water sprays, floating toys, and zero-depth entry.', image: '/AapnoGharlmages/ActivityImage/kids-play-pan-aapnoghar.jpg', thrill: 2 }
  ],

  // 21 Thrilling Rides & 24 Adventure Activities (Phase 6 & 7)
  amusementRides: [
    { name: 'Flying Dish', category: 'Thrill Ride', desc: 'Circular swing ascending high into the sky.', image: '/AapnoGharlmages/ActivityImage/flying-dish-2-aapnoghar.jpg' },
    { name: 'Jet Plane Ride', category: 'Family & Kids', desc: 'Pilot controlled airplanes soaring in scenic circles.', image: '/AapnoGharlmages/ActivityImage/jet-plane-2-aapnoghar.jpg' },
    { name: 'Pan Ball', category: 'Carnival Ride', desc: 'Spinning fun cups with interactive center wheel.', image: '/AapnoGharlmages/ActivityImage/pan-ball-2-aapnoghar.jpg' },
    { name: 'Caterpillar Ride', category: 'Kids Favourite', desc: 'Gentle rollercoaster themed around friendly caterpillar.', image: '/AapnoGharlmages/PhotoImage/amusement-park-2-amusement-park-aapnoghar-admin.jpg' },
    { name: 'Monorail Tour', category: 'Scenic Ride', desc: 'Elevated railway providing bird-eye view of all 9 acres.', image: '/AapnoGharlmages/PhotoImage/amusement-park-1-amusement-park-aapnoghar-admin.jpg' },
    { name: 'Columbus Pirate Boat', category: 'Thrill Ride', desc: 'Giant pendulum ship swinging up to 60 degrees.', image: '/AapnoGharlmages/PhotoImage/amusement-park-5-amusement-park-aapnoghar-admin.jpg' },
    { name: 'Break Dance', category: 'Fast Spin', desc: 'Rapid rotating cars with techno light sync.', image: '/AapnoGharlmages/PhotoImage/amusement-park6-amusement-park-aapnoghar-admin.jpg' },
    { name: 'Water Merry-Go-Round', category: 'Water Amusement', desc: 'Cooling carousel revolving above a water mirror.', image: '/AapnoGharlmages/ActivityImage/water-merry-go-round-and-many-more-2-aapnoghar.jpg' }
  ],

  adventureActivities: [
    { name: 'Commando Net Climbing', category: 'Adventure', desc: 'Military obstacle net testing agility and endurance.', image: '/AapnoGharlmages/ActivityImage/commando-net-2-aapnoghar.jpg' },
    { name: 'Tarzan Swing', category: 'Adventure', desc: 'Rope swing over obstacle sand pits.', image: '/AapnoGharlmages/ActivityImage/rope-climbing-3-aapnoghar.jpg' },
    { name: 'Cat Walk', category: 'Balance', desc: 'Narrow aerial plank balance beam.', image: '/AapnoGharlmages/ActivityImage/trampoline-3-aapnoghar.jpg' },
    { name: 'Trampoline Jump', category: 'Agility', desc: 'High-bounce trampolines with safety harness.', image: '/AapnoGharlmages/ActivityImage/trampoline-3-aapnoghar.jpg' },
    { name: 'Bow & Arrow (Archery)', category: 'Target Drill', desc: 'Traditional bullseye archery range with certified instructors.', image: '/AapnoGharlmages/ActivityImage/bow-arrow-3-aapnoghar.jpg' },
    { name: 'Gulel & Dart Shooting', category: 'Village Games', desc: 'Authentic Indian slingshot and balloon dart games.', image: '/AapnoGharlmages/ActivityImage/gulel-3-aapnoghar.jpg' },
    { name: 'Pottery Maker Experience', category: 'Cultural Craft', desc: 'Handmade clay pottery spinning on traditional wheel.', image: '/AapnoGharlmages/ActivityImage/pottery-maker-4-aapnoghar.jpg' },
    { name: 'Live Puppet Show', category: 'Rajasthani Folk', desc: 'Kathputli live performance telling royal folk tales.', image: '/AapnoGharlmages/ActivityImage/puppet-show-4-aapnoghar.jpg' },
    { name: 'Camel & Horse Cart Safari', category: 'Rural Safari', desc: 'Scenic estate cart ride through green paths.', image: '/AapnoGharlmages/ActivityImage/camel-cart-5-aapnoghar.jpg' },
    { name: 'Tractor Ride', category: 'Rural Safari', desc: 'Desi tractor safari through the organic farms.', image: '/AapnoGharlmages/ActivityImage/tractor-5-aapnoghar.jpg' }
  ],

  // All 4 Event Venues Preserved (Phase 11)
  venues: [
    {
      id: 'bhanwar-lawn',
      name: 'Bhanwar Party Lawn',
      route: '/bhanwar-party-lawn.html',
      capacity: '1,500 - 2,000 Guests',
      area: 'Expansive Open-Air Grounds',
      image: '/AapnoGharlmages/WeddeingEventImages/bhanwar-party-lawn-l.jpg',
      features: [
        'Massive open-air manicured lawn',
        'Grand elevated buffet setup & live kitchen counters',
        'Luxury gazebo lounge seating for VIPs',
        'Ornamented royal stage setup for Varmala & Reception',
        'Dedicated DJ area and power backups'
      ]
    },
    {
      id: 'chander-lawn',
      name: 'Chander Party Lawn',
      route: '/chander-party-lawn.html',
      capacity: '500 - 800 Guests',
      area: 'Lush Greenery Garden',
      image: '/AapnoGharlmages/WeddeingEventImages/chander-party-lawn-l.jpg',
      features: [
        'Surrounded by rich botanical trees and flowering beds',
        'Food display setup and live chaat pavilions',
        'Gazebo lounge seating and mood lighting',
        'Ornamented wedding stage & Mandap Gazebo',
        'Dedicated dance floor & music console'
      ]
    },
    {
      id: 'abhinandan-hall',
      name: 'Abhinandan Banquet Hall',
      route: '/abhinandan-hall.html',
      capacity: '300 - 500 Guests',
      area: 'Approximately 7,000 Sq. Ft.',
      image: '/AapnoGharlmages/WeddeingEventImages/abhinandan-hall-l.jpg',
      features: [
        '7,000 sq ft pillar-less air-conditioned indoor hall',
        'Connected outdoor spill-out lawn space',
        'Grand chandeliers and customizable stage lighting',
        'Full catering setup, green rooms & DJ console',
        'Ideal for indoor weddings, ring ceremonies, and corporate galas'
      ]
    },
    {
      id: 'swagatam-hall',
      name: 'Swagatam Banquet Hall',
      route: '/swagatam-hall.html',
      capacity: '150 - 250 Guests',
      area: 'Indoor AC Banquet',
      image: '/AapnoGharlmages/WeddeingEventImages/swagatum-hall-l.jpg',
      features: [
        'Fully air-conditioned modern banquet setup',
        'Contemporary interiors and recessed LED wash lights',
        'In-built buffet counter and dining layout',
        'High-end acoustic sound system for seminars & Sangeet',
        'Suited for birthdays, corporate meetings, and Mehendi functions'
      ]
    }
  ]
};

// Export to window for global access
if (typeof window !== 'undefined') {
  window.AAPNOGHAR_DATA = AAPNOGHAR_DATA;
}
