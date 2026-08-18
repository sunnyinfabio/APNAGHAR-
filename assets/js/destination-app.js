/**
 * AapnoGhar Destination Web App Interactive Engine
 * Connected to centralized AAPNOGHAR_DATA
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initPersonaSwitcher();
  initBuildDayCalculator();
  initAttractionFilters();
  initRoomsToggle();
  initVenuesCarousel();
  initInteractiveMap();
  initBookingFunnelModal();
  initTourModal();
  initFaqAccordion();
  initPhotoCarousel();
  initExperienceVideoPlayers();
  initDiningTimeline();
});

/* 0. Experience Video Player on Click & Hover */
function initExperienceVideoPlayers() {
  const cards = document.querySelectorAll('.video-exp-card');
  cards.forEach(card => {
    const video = card.querySelector('video');
    const trigger = card.querySelector('.play-video-trigger');
    if (!video) return;

    // Ensure muted for unrestricted browser autoplay
    video.muted = true;
    video.playsInline = true;

    function playVideo() {
      document.querySelectorAll('.video-exp-card video').forEach(v => {
        if (v !== video) {
          v.pause();
          v.parentElement.classList.remove('playing');
          const t = v.parentElement.querySelector('.play-video-trigger');
          if (t) t.textContent = '▶ Live Video';
        }
      });

      card.classList.add('playing');
      video.muted = true;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // If playback was blocked, retry with explicit muted
          video.muted = true;
          video.play().catch(() => {});
        });
      }
      if (trigger) trigger.textContent = '⏸ Pause Video';
    }

    function pauseVideo() {
      card.classList.remove('playing');
      video.pause();
      if (trigger) trigger.textContent = '▶ Live Video';
    }

    // Click anywhere on card (except links) to play/pause video
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      if (video.paused) {
        playVideo();
      } else {
        pauseVideo();
      }
    });

    // Hover also triggers smooth playback
    card.addEventListener('mouseenter', () => {
      if (video.paused) playVideo();
    });

    card.addEventListener('mouseleave', () => {
      if (!card.dataset.manualKeep) {
        pauseVideo();
      }
    });
  });
}

/* 1. Header Scroll Behavior - Boundary Collision Trigger */
function initHeaderScroll() {
  const header = document.querySelector('.main-header');
  const heroBadge = document.querySelector('.hero-badge');
  let lastScrollY = window.scrollY;

  function handleScroll() {
    const currentScrollY = window.scrollY;
    if (!header) return;

    if (currentScrollY <= 15) {
      // At the very top -> visible and unscrolled
      header.classList.remove('header-hidden');
      header.classList.remove('scrolled');
      lastScrollY = currentScrollY;
      return;
    }

    header.classList.add('scrolled');

    // Dynamic Boundary Detection:
    // When the top of hero badge touches the bottom boundary of the header:
    if (heroBadge) {
      const headerBottom = header.offsetHeight;
      const badgeTop = heroBadge.getBoundingClientRect().top;

      if (badgeTop <= headerBottom + 10 && currentScrollY > lastScrollY) {
        // Scrolling down & text touches header boundary -> Hide navbar smoothly
        header.classList.add('header-hidden');
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up -> Reveal navbar
        header.classList.remove('header-hidden');
      }
    } else {
      // General fallback if hero badge is not on page
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* 2. Persona Switcher */
function initPersonaSwitcher() {
  const pills = document.querySelectorAll('.persona-pill');
  const badgeEl = document.getElementById('personaBadge');
  const titleEl = document.getElementById('personaTitle');
  const descEl = document.getElementById('personaDesc');
  const mediaEl = document.getElementById('personaImg');
  const highlightsEl = document.getElementById('personaHighlights');
  const priceEl = document.getElementById('personaPrice');
  const unitEl = document.getElementById('personaUnit');
  const ctaBtn = document.getElementById('personaCta');

  const PERSONAS = {
    family: {
      badge: '👨‍👩‍👧 Family Favourite',
      title: 'Joyful Day for All Generations',
      desc: 'Unite the entire family with gentle water slides, carousel rides, traditional village games, and hearty buffet meals.',
      media: '/AapnoGharlmages/EntertainmentImages/activity-park-1-aapno-ghar.jpg',
      highlights: [
        '🎠 21+ Family Rides',
        '💦 Shallow Splash Lagoons',
        '🎭 Village Games & Shows',
        '🍲 Multi-Cuisine Buffet'
      ],
      price: '₹1,599',
      unit: '/ person',
      packageId: 'water-amuse'
    },
    water: {
      badge: '💦 Extreme Splash',
      title: 'High-Thrill Aquatics & Wave Pool',
      desc: 'Heart-pounding aquatic thrills with Turbo Twister, Aqua Tube, mist pools, tipping buckets, and DJ rain dance beats.',
      media: '/AapnoGharlmages/PhotoImage/water-park-aapno-ghar.jpg',
      highlights: [
        '🌊 Giant Wave Pool',
        '🌀 Turbo Twister Slide',
        '🎶 DJ Rain Dance Arena',
        '🥤 Cool Drinks & Snacks'
      ],
      price: '₹1,399',
      unit: '/ person',
      packageId: 'water-amuse'
    },
    birthday: {
      badge: '🎂 Birthday Celebrations',
      title: 'Magical Birthday Carnival',
      desc: 'Make celebrations unforgettable with private decorated cabanas, mascot greetings, thrill rides, and live street chaat.',
      media: '/AapnoGharlmages/WeddeingEventImages/abhinandan-hall-l.jpg',
      highlights: [
        '🎂 Private Decorated Cabana',
        '🎪 Magic & Puppet Shows',
        '🍿 Live Street Chaat',
        '🎢 Full Park Access Passes'
      ],
      price: '₹1,799',
      unit: '/ guest',
      packageId: 'birthday'
    },
    wedding: {
      badge: '💍 Royal Destination Wedding',
      title: 'Royal Destination Nuptials',
      desc: 'Say "I Do" amidst 9 acres of lush greenery, grand banquet halls, customizable luxury suites, and royal masterchef catering.',
      media: '/AapnoGharlmages/WeddeingEventImages/bhanwar-party-lawn-l.jpg',
      highlights: [
        '🏰 3,000-Guest Lawns',
        '🏛️ Grand AC Banquet Halls',
        '👑 Custom Mandap & Decor',
        '🏨 67 Boutique Suites'
      ],
      price: 'Custom',
      unit: 'Quote on Request',
      packageId: 'wedding'
    },
    corporate: {
      badge: '🏢 Corporate Offsite',
      title: 'Team Offsite & Adventure Drills',
      desc: 'Energize teams with state-of-the-art conference halls, rope courses, 24+ obstacle drills, and evening cocktail lawns.',
      media: '/AapnoGharlmages/WeddeingEventImages/corporate-events-conferences-l.jpg',
      highlights: [
        '💼 AC AV Conferences',
        '🧗 24+ Team Drills',
        '🍲 Gourmet Buffet & Hi-Tea',
        '🍸 Evening Cocktail Lawns'
      ],
      price: '₹1,850',
      unit: '/ employee',
      packageId: 'water-amuse'
    },
    staycation: {
      badge: '🏨 Weekend Staycation',
      title: 'Lush Resort Retreat & Play',
      desc: 'Escape the city rush. Relax in expansive luxury suites with 2-day all-inclusive park passes and lavish buffet breakfast.',
      media: '/AapnoGharlmages/RoomImages/presidential-suite-room-2.jpg',
      highlights: [
        '🛏️ Boutique Luxury Suites',
        '💦 2-Day Park Access',
        '🍳 Lavish Buffet Breakfast',
        '🚗 Free Valet Parking'
      ],
      price: '₹6,499',
      unit: '/ room / night',
      packageId: 'staycation'
    }
  };

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const key = pill.dataset.persona;
      const data = PERSONAS[key];
      if (!data) return;

      if (badgeEl) badgeEl.textContent = data.badge;
      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;
      if (mediaEl) mediaEl.src = data.media;
      if (priceEl) priceEl.textContent = data.price;
      if (unitEl) unitEl.textContent = data.unit;

      if (highlightsEl) {
        highlightsEl.innerHTML = data.highlights.map(h => `<div class="persona-chip">${h}</div>`).join('');
      }

      if (ctaBtn) {
        ctaBtn.onclick = () => openBookingModal(data.packageId);
      }
    });
  });
}

/* 3. Attraction Category Filter with Initial 3-Card Limit and "See All" Option */
function initAttractionFilters() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const items = Array.from(document.querySelectorAll('.ride-item'));
  const toggleBtn = document.getElementById('toggleSeeAllRides');
  const seeAllText = document.getElementById('seeAllRidesText');
  const seeAllIcon = document.getElementById('seeAllRidesIcon');
  const seeAllWrap = document.querySelector('.rides-see-more-wrap');

  let currentFilter = 'all';
  let isShowingAllRides = false;

  function updateRideDisplay() {
    let visibleCount = 0;
    const matchingItems = items.filter(item => currentFilter === 'all' || item.dataset.type === currentFilter);

    items.forEach(item => {
      const matches = (currentFilter === 'all' || item.dataset.type === currentFilter);
      if (!matches) {
        item.style.display = 'none';
        return;
      }

      if (isShowingAllRides || currentFilter !== 'all') {
        item.style.display = 'flex';
      } else {
        // Only show first 3 cards in 'all' view when not expanded
        if (visibleCount < 3) {
          item.style.display = 'flex';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      }
    });

    // Update toggle button visibility and text
    if (currentFilter === 'all') {
      if (seeAllWrap) seeAllWrap.style.display = 'flex';
      if (seeAllText) seeAllText.textContent = isShowingAllRides ? 'Show Less Attractions' : 'See All Attractions (45+)';
      if (seeAllIcon) seeAllIcon.textContent = isShowingAllRides ? '▴' : '▾';
    } else {
      if (seeAllWrap) seeAllWrap.style.display = 'none';
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter || 'all';
      updateRideDisplay();
    });
  });

  toggleBtn?.addEventListener('click', () => {
    isShowingAllRides = !isShowingAllRides;
    updateRideDisplay();

    if (!isShowingAllRides) {
      // Smoothly scroll back to section header when collapsing
      const section = document.getElementById('amusement');
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // Initial render with 3 cards only
  updateRideDisplay();
}

/* 3b. Rooms & Suites 3-Card Initial Limit and "See All" Option */
function initRoomsToggle() {
  const roomCards = Array.from(document.querySelectorAll('.room-item'));
  const toggleBtn = document.getElementById('toggleSeeAllRooms');
  const seeAllText = document.getElementById('seeAllRoomsText');
  const seeAllIcon = document.getElementById('seeAllRoomsIcon');
  if (!roomCards.length || !toggleBtn) return;

  let isShowingAllRooms = false;

  function updateRoomsDisplay() {
    roomCards.forEach((card, index) => {
      if (isShowingAllRooms || index < 3) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    if (seeAllText) {
      seeAllText.textContent = isShowingAllRooms ? 'Show Less Rooms & Suites' : 'See All Rooms & Suites (6)';
    }
    if (seeAllIcon) {
      seeAllIcon.textContent = isShowingAllRooms ? '▴' : '▾';
    }
  }

  toggleBtn.addEventListener('click', () => {
    isShowingAllRooms = !isShowingAllRooms;
    updateRoomsDisplay();

    if (!isShowingAllRooms) {
      const section = document.getElementById('stay');
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // Initial render: show first 3 rooms only
  updateRoomsDisplay();
}

/* 4. Build Your Day Calculator */
let customDayState = {
  experience: { name: 'Water + Amusement Park', cost: 1599 },
  activity: { name: 'Rope Course & Zipline', cost: 300 },
  food: { name: 'Unlimited Royal Buffet', cost: 450 },
  stay: { name: 'Day Visit', cost: 0 }
};

function initBuildDayCalculator() {
  const optionCards = document.querySelectorAll('.custom-option-card');
  optionCards.forEach(card => {
    card.addEventListener('click', () => {
      const step = card.dataset.step;
      const name = card.dataset.name;
      const cost = parseInt(card.dataset.cost, 10) || 0;

      document.querySelectorAll(`.custom-option-card[data-step="${step}"]`).forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      customDayState[step] = { name, cost };
      updateBuildDaySummary();
    });
  });
  updateBuildDaySummary();
}

function updateBuildDaySummary() {
  const expEl = document.getElementById('summaryExp');
  const actEl = document.getElementById('summaryAct');
  const foodEl = document.getElementById('summaryFood');
  const stayEl = document.getElementById('summaryStay');
  const totalEl = document.getElementById('customDayTotal');

  if (expEl) expEl.textContent = customDayState.experience.name;
  if (actEl) actEl.textContent = customDayState.activity.name;
  if (foodEl) foodEl.textContent = customDayState.food.name;
  if (stayEl) stayEl.textContent = customDayState.stay.name;

  const total = customDayState.experience.cost + customDayState.activity.cost + customDayState.food.cost + customDayState.stay.cost;
  if (totalEl) totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
}

/* 5. Interactive Resort Map */
function initInteractiveMap() {
  const nodes = document.querySelectorAll('.map-node');
  const titleEl = document.getElementById('mapZoneTitle');
  const descEl = document.getElementById('mapZoneDesc');
  const imgEl = document.getElementById('mapZoneImg');
  const linkEl = document.getElementById('mapZoneLink');

  const MAP_ZONES = {
    water: {
      title: '💦 Water Park Zone',
      desc: 'Features Turbo Twister, Aqua Tube, Family Lagoon, DJ Rain Dance, and shallow splash areas with certified lifeguards on duty.',
      img: '/AapnoGharlmages/PhotoImage/water-park-aapno-ghar.jpg',
      link: '/water-park.html'
    },
    amuse: {
      title: '🎢 Amusement & Adventure Zone',
      desc: 'Home to 21+ thrilling rides including Jet Plane, Flying Dish, Caterpillar, plus 24+ adventure activities like Commando Net and Tarzan Swing.',
      img: '/AapnoGharlmages/PhotoImage/amusement-park-aapno-ghar.jpg',
      link: '/amusement-park.html'
    },
    resort: {
      title: '🏨 Luxury Resort & Suites',
      desc: '67 spacious rooms including Presidential and Luxury Suites with private garden view balconies, 24/7 room service, and modern amenities.',
      img: '/AapnoGharlmages/RoomImages/presidential-suite-room-2.jpg',
      link: '/stay.html'
    },
    dine: {
      title: '🍴 Baza Restaurant & Buffets',
      desc: 'Multi-cuisine dining serving authentic North Indian, Continental, and Street food delicacies prepared fresh by master chefs.',
      img: '/AapnoGharlmages/PhotoImage/1-restaurant-aapnoghar-admin.jpg',
      link: '/eat-and-drink-offer.html'
    },
    lawn: {
      title: '🎉 Bhanwar & Chander Party Lawns',
      desc: 'Expansive lush wedding and corporate grounds capable of hosting from 200 up to 2,000 guests with grand lighting and banquet halls.',
      img: '/AapnoGharlmages/WeddeingEventImages/bhanwar-party-lawn-l.jpg',
      link: '/wedding-ceremony.html'
    }
  };

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const zone = node.dataset.zone;
      const data = MAP_ZONES[zone];
      if (!data) return;

      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;
      if (imgEl) imgEl.src = data.img;
      if (linkEl) linkEl.href = data.link;
    });
  });
}

/* 6. 5-Step Modern Booking Funnel Modal (Concise with Click-to-Expand Details) */
let bookingFunnel = {
  currentStep: 1,
  category: 'water-amuse',
  date: getFormattedDate(1), // Tomorrow by default
  adults: 2,
  children: 1,
  packageRate: 1599,
  packageName: 'Water + Amusement Park Pass'
};

const FUNNEL_PACKAGE_DETAILS = {
  'water-amuse': {
    title: '💦 Water + Amusement Park Pass',
    rate: 1599,
    rateLabel: '₹1,599 / person',
    inclusions: [
      'Unlimited Water Park & Wave Pool access',
      '21+ Thrilling Amusement Rides',
      '24+ Adventure Activities & Drills',
      'Full Food Itinerary (Breakfast, Lunch Buffet & Evening Chaat)',
      'Live Magic Show & Puppet Shows',
      'Complimentary Locker & Shower Facilities'
    ],
    badges: ['⏱ 10:00 AM – 07:00 PM', '👶 Kids <33" FREE', '🥗 100% Veg Multi-Cuisine Buffet']
  },
  'staycation': {
    title: '🏨 Resort Staycation & Play',
    rate: 6499,
    rateLabel: '₹6,499 / night',
    inclusions: [
      '1 Night Stay in Luxury Boutique Room',
      '2-Day Unlimited Passes to Water & Amusement Parks',
      'Lavish Multi-Cuisine Buffet Breakfast',
      'Evening Hi-Tea & Live Chaat Counter',
      'Garden View Balcony & High-Speed Wi-Fi',
      'Complimentary Valet Parking'
    ],
    badges: ['🕒 Check-in 12:00 PM', '🕚 Check-out 10:30 AM', '🍽 In-Room Dining Available']
  },
  'birthday': {
    title: '🎂 Birthday Celebration Carnival',
    rate: 1799,
    rateLabel: '₹1,799 / guest',
    inclusions: [
      'Reserved Decorated Birthday Cabana/Area',
      'Full Park Passes (Water + Amusement) for all guests',
      'Welcome Mascot Greeting & Cake Cutting setup',
      'Lavish Feast Buffet & Unlimited Live Chaat',
      'Dedicated Event Concierge Support'
    ],
    badges: ['🎉 Custom Decor Options', '📸 Selfie Photo-Ops', '🎁 Birthday Surprise Voucher']
  },
  'wedding': {
    title: '💍 Royal Wedding Lawn Enquiry',
    rate: 0,
    rateLabel: 'Custom Quote',
    inclusions: [
      'Chander & Bhanwar Party Lawns (up to 3,000 guests)',
      'Abhinandan & Swagatam Air-Conditioned Banquet Halls',
      'Custom Mandap & Themed Lighting Setups',
      'Gourmet Multi-Cuisine Royal Catering Menu',
      '67 Luxury Boutique Rooms for Bridal & Guest Lodging'
    ],
    badges: ['🏰 9-Acre Grand Venue', '🅿️ 500+ Car Parking', '👨‍💼 Dedicated Wedding Concierge']
  }
};

function getFormattedDate(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

function getUpcomingSaturday() {
  const d = new Date();
  const day = d.getDay();
  const diff = (6 - day + 7) % 7 || 7; // days to next Saturday
  d.setDate(d.getDate() + diff);
  return d.toISOString().split('T')[0];
}

function initBookingFunnelModal() {
  const overlay = document.getElementById('bookingModal');
  const closeBtn = document.getElementById('closeBookingModal');
  const nextBtn = document.getElementById('modalNextBtn');
  const prevBtn = document.getElementById('modalPrevBtn');

  // Trigger buttons across page
  document.querySelectorAll('[data-trigger-booking]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pkg = btn.dataset.pkg || 'water-amuse';
      openBookingModal(pkg);
    });
  });

  closeBtn?.addEventListener('click', () => overlay?.classList.remove('open'));
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('open');
  });

  // Package Choice Cards Selection
  document.querySelectorAll('.booking-choice-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // If user clicked the detail button directly, handled separately
      if (e.target.closest('.btn-pkg-details')) return;

      document.querySelectorAll('.booking-choice-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const cat = card.dataset.cat;
      bookingFunnel.category = cat;
      if (card.dataset.rate) {
        bookingFunnel.packageRate = parseInt(card.dataset.rate, 10);
        bookingFunnel.packageName = card.dataset.pkgname || 'Selected Package';
      }
      renderPackageDrawer(cat);
    });
  });

  // "What's Included" Detail Triggers
  document.querySelectorAll('.btn-pkg-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pkgKey = btn.dataset.detailPkg;
      const card = btn.closest('.booking-choice-card');
      if (card) {
        document.querySelectorAll('.booking-choice-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        bookingFunnel.category = pkgKey;
        if (card.dataset.rate) {
          bookingFunnel.packageRate = parseInt(card.dataset.rate, 10);
          bookingFunnel.packageName = card.dataset.pkgname || 'Selected Package';
        }
      }
      renderPackageDrawer(pkgKey, true);
    });
  });

  // Drawer Close Button
  document.getElementById('closePkgDrawer')?.addEventListener('click', () => {
    const drawer = document.getElementById('funnelPkgDrawer');
    if (drawer) drawer.classList.remove('open');
  });

  // Date Quick Chips
  const dateInput = document.getElementById('funnelDate');
  if (dateInput) {
    dateInput.value = bookingFunnel.date;
    dateInput.min = getFormattedDate(0);
    dateInput.addEventListener('change', (e) => {
      bookingFunnel.date = e.target.value;
      document.querySelectorAll('.date-chip').forEach(c => c.classList.remove('active'));
      updateFunnelSummary();
    });
  }

  document.querySelectorAll('.date-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.date-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const days = chip.dataset.days;
      let targetDate;
      if (days === 'upcoming-weekend') {
        targetDate = getUpcomingSaturday();
      } else {
        targetDate = getFormattedDate(parseInt(days, 10) || 0);
      }
      bookingFunnel.date = targetDate;
      if (dateInput) dateInput.value = targetDate;
      updateFunnelSummary();
    });
  });

  // Guest Counters
  const adultVal = document.getElementById('funnelAdults');
  const childVal = document.getElementById('funnelChildren');

  document.getElementById('adultPlus')?.addEventListener('click', () => {
    bookingFunnel.adults++;
    if (adultVal) adultVal.textContent = bookingFunnel.adults;
    updateFunnelSummary();
  });
  document.getElementById('adultMinus')?.addEventListener('click', () => {
    if (bookingFunnel.adults > 1) {
      bookingFunnel.adults--;
      if (adultVal) adultVal.textContent = bookingFunnel.adults;
      updateFunnelSummary();
    }
  });
  document.getElementById('childPlus')?.addEventListener('click', () => {
    bookingFunnel.children++;
    if (childVal) childVal.textContent = bookingFunnel.children;
    updateFunnelSummary();
  });
  document.getElementById('childMinus')?.addEventListener('click', () => {
    if (bookingFunnel.children > 0) {
      bookingFunnel.children--;
      if (childVal) childVal.textContent = bookingFunnel.children;
      updateFunnelSummary();
    }
  });

  // Accordion Toggles (Click to Expand / Collapse)
  initAccordionToggle('toggleDatePolicy', 'datePolicyBody');
  initAccordionToggle('toggleHeightGuide', 'heightGuideBody');
  initAccordionToggle('toggleSpecialNotes', 'specialNotesBody');
  initAccordionToggle('toggleSummaryBreakdown', 'summaryBreakdownBody');

  // Next / Prev Step Handlers
  nextBtn?.addEventListener('click', () => {
    if (bookingFunnel.currentStep === 4) {
      // Validate contact fields
      const name = document.getElementById('custName')?.value.trim();
      const phone = document.getElementById('custPhone')?.value.trim();
      const email = document.getElementById('custEmail')?.value.trim();
      if (!name || !phone || !email) {
        alert('Please fill in your Name, Phone Number, and Email Address to proceed.');
        return;
      }
    }

    if (bookingFunnel.currentStep < 5) {
      setFunnelStep(bookingFunnel.currentStep + 1);
    } else {
      const name = document.getElementById('custName')?.value || 'Valued Guest';
      alert(`🎉 Reservation Confirmed for ${name}!\n\n${bookingFunnel.packageName}\nDate: ${bookingFunnel.date}\nGuests: ${bookingFunnel.adults} Adults, ${bookingFunnel.children} Kids\n\nOur concierge has received your request. An instant confirmation SMS & Email with your QR ticket voucher has been dispatched.`);
      overlay?.classList.remove('open');
      setFunnelStep(1);
    }
  });

  prevBtn?.addEventListener('click', () => {
    if (bookingFunnel.currentStep > 1) {
      setFunnelStep(bookingFunnel.currentStep - 1);
    }
  });
}

function initAccordionToggle(toggleId, bodyId) {
  const toggle = document.getElementById(toggleId);
  const body = document.getElementById(bodyId);
  if (!toggle || !body) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.contains('open');
    if (isOpen) {
      toggle.classList.remove('open');
      body.classList.remove('open');
    } else {
      toggle.classList.add('open');
      body.classList.add('open');
    }
  });
}

function renderPackageDrawer(pkgKey, forceOpen = false) {
  const drawer = document.getElementById('funnelPkgDrawer');
  const titleEl = document.getElementById('funnelDrawerTitle');
  const contentEl = document.getElementById('funnelDrawerContent');
  if (!drawer || !titleEl || !contentEl) return;

  const data = FUNNEL_PACKAGE_DETAILS[pkgKey] || FUNNEL_PACKAGE_DETAILS['water-amuse'];
  titleEl.textContent = `✨ ${data.title} Inclusions`;

  contentEl.innerHTML = `
    <ul class="drawer-inclusions-list">
      ${data.inclusions.map(inc => `<li><span>✓</span> ${inc}</li>`).join('')}
    </ul>
    <div class="drawer-meta-badges">
      ${data.badges.map(b => `<span class="drawer-meta-badge">${b}</span>`).join('')}
    </div>
  `;

  if (forceOpen) {
    drawer.classList.add('open');
  }
}

function openBookingModal(pkgId = 'water-amuse') {
  const overlay = document.getElementById('bookingModal');
  if (!overlay) return;
  overlay.classList.add('open');

  // Select card corresponding to pkgId if available
  const matchCard = document.querySelector(`.booking-choice-card[data-cat="${pkgId}"]`);
  if (matchCard) {
    document.querySelectorAll('.booking-choice-card').forEach(c => c.classList.remove('selected'));
    matchCard.classList.add('selected');
    bookingFunnel.category = pkgId;
    bookingFunnel.packageRate = parseInt(matchCard.dataset.rate, 10) || 1599;
    bookingFunnel.packageName = matchCard.dataset.pkgname || 'Water + Amusement Pass';
  }

  setFunnelStep(1);
}

function setFunnelStep(step) {
  bookingFunnel.currentStep = step;
  document.querySelectorAll('.funnel-step').forEach(s => s.classList.remove('active'));
  const activeStepEl = document.querySelector(`.funnel-step[data-step="${step}"]`);
  if (activeStepEl) activeStepEl.classList.add('active');

  document.querySelectorAll('.step-dot').forEach((dot, idx) => {
    if (idx < step) dot.classList.add('active');
    else dot.classList.remove('active');
  });

  const prevBtn = document.getElementById('modalPrevBtn');
  const nextBtn = document.getElementById('modalNextBtn');

  if (prevBtn) prevBtn.style.visibility = step === 1 ? 'hidden' : 'visible';
  if (nextBtn) nextBtn.textContent = step === 5 ? 'Confirm & Book Now ➔' : 'Next Step ➔';

  if (step === 5) updateFunnelSummary();
}

function updateFunnelSummary() {
  const summaryDate = document.getElementById('funnelSummaryDate');
  const summaryGuests = document.getElementById('funnelSummaryGuests');
  const summaryPkg = document.getElementById('funnelSummaryPkg');
  const summaryTotal = document.getElementById('funnelSummaryTotal');
  const mealScheduleEl = document.getElementById('funnelMealSchedule');

  if (summaryDate) summaryDate.textContent = bookingFunnel.date;
  if (summaryGuests) summaryGuests.textContent = `${bookingFunnel.adults} Adults, ${bookingFunnel.children} ${bookingFunnel.children === 1 ? 'Child' : 'Children'}`;
  if (summaryPkg) summaryPkg.textContent = bookingFunnel.packageName;

  if (bookingFunnel.packageRate === 0) {
    if (summaryTotal) summaryTotal.textContent = 'Custom Quote (Free Enquiry)';
  } else {
    // Adult rate + (Kid rate ~ 80%)
    const kidRate = Math.round(bookingFunnel.packageRate * 0.8);
    const total = (bookingFunnel.adults * bookingFunnel.packageRate) + (bookingFunnel.children * kidRate);
    if (summaryTotal) summaryTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
  }

  // Populate Step 5 Itinerary Preview
  if (mealScheduleEl) {
    const isStay = bookingFunnel.category === 'staycation';
    const isWedding = bookingFunnel.category === 'wedding';

    if (isWedding) {
      mealScheduleEl.innerHTML = `
        <div class="itinerary-step-pill">
          <strong>👑 Royal Event Execution</strong>
          <p>Full lawn layout setup, bespoke stage & auspicious mandap.</p>
        </div>
        <div class="itinerary-step-pill">
          <strong>🍽 Multi-Cuisine Royal Feast</strong>
          <p>Customized live counters, welcome drinks, desserts & midnight snacks.</p>
        </div>
        <div class="itinerary-step-pill">
          <strong>🏨 Accommodation Inclusions</strong>
          <p>67 Luxury Boutique Rooms reserved for bridal party and esteemed guests.</p>
        </div>
      `;
    } else if (isStay) {
      mealScheduleEl.innerHTML = `
        <div class="itinerary-step-pill">
          <strong>🕒 12:00 PM – Check-In & Welcome Drink</strong>
          <p>Direct entry to your luxury air-conditioned room with garden view.</p>
        </div>
        <div class="itinerary-step-pill">
          <strong>💦 Unlimited Water & Amusement Access</strong>
          <p>All 45+ thrill rides, wave pool, and mist gardens included for 2 full days.</p>
        </div>
        <div class="itinerary-step-pill">
          <strong>🍳 07:30 AM – 10:30 AM: Lavish Buffet Breakfast</strong>
          <p>Multi-cuisine morning feast at Baza Cafe & Restaurant.</p>
        </div>
      `;
    } else {
      mealScheduleEl.innerHTML = `
        <div class="itinerary-step-pill">
          <strong>🍳 09:30 AM – 10:30 AM: Welcome Breakfast</strong>
          <p>Poori Aloo, Idli Sambhar, Poha, Halwa, Special Tea & Achaar.</p>
        </div>
        <div class="itinerary-step-pill">
          <strong>🍲 01:00 PM – 02:30 PM: Royal Buffet Lunch</strong>
          <p>Paneer Butter Masala, Dal Tadka, Seasonal Veg, Veg Chowmein, Steamed Rice, Tandoori Roti, Naan, Raita, Seviyan.</p>
        </div>
        <div class="itinerary-step-pill">
          <strong>🍿 03:00 PM – 06:00 PM: Purani Dilli Live Chaat & Drinks</strong>
          <p>Crispy Aloo Tikki, Gol Gappe (Pani Puri), Bhel Poori, Shikanjee, Jal Jeera & Masala Tea.</p>
        </div>
        <div class="itinerary-step-pill">
          <strong>🎢 10:00 AM – 07:00 PM: Unlimited Park Access</strong>
          <p>Water wave pool, 21+ thrill rides, 24+ adventure obstacle drills, puppet show & rain dance.</p>
        </div>
      `;
    }
  }
}

/* 7. Sticky Booking Dock */
function initStickyDock() {
  const dock = document.getElementById('stickyBookingDock');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      dock?.classList.add('active');
    } else {
      dock?.classList.remove('active');
    }
  });
}

/* 8. 360 Tour Modal */
function initTourModal() {
  const tourModal = document.getElementById('tourModal');
  const closeBtn = document.getElementById('closeTourModal');
  const iframe = document.getElementById('tourIframe');

  document.querySelectorAll('[data-open-360]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tourSrc = btn.dataset.tour || 'aapno360/presidential-suite.html';
      if (iframe) iframe.src = tourSrc;
      tourModal?.classList.add('open');
    });
  });

  closeBtn?.addEventListener('click', () => {
    tourModal?.classList.remove('open');
    if (iframe) iframe.src = '';
  });
}

/* 9. FAQ Accordion with Smooth Icon Updates */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const header = item.querySelector('.faq-header');
    const icon = item.querySelector('.faq-toggle-icon');

    header?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      items.forEach(i => {
        i.classList.remove('open');
        const h = i.querySelector('.faq-header');
        const ic = i.querySelector('.faq-toggle-icon');
        if (h) h.setAttribute('aria-expanded', 'false');
        if (ic) ic.textContent = '+';
      });

      if (!isOpen) {
        item.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
        if (icon) icon.textContent = '−';
      }
    });
  });
}

/* 10. Auto-Scrolling Picture Carousel with Working Navigation Controls */
function initPhotoCarousel() {
  const viewport = document.getElementById('photoCarousel');
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  if (!viewport) return;

  let autoScrollSpeed = 1;
  let isPaused = false;
  let animationId = null;

  function autoScroll() {
    if (!isPaused) {
      // If reached end, seamlessly loop back to start
      if (viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 2) {
        viewport.scrollLeft = 0;
      } else {
        viewport.scrollLeft += autoScrollSpeed;
      }
    }
    animationId = requestAnimationFrame(autoScroll);
  }

  // Start continuous right-to-left auto scroll
  animationId = requestAnimationFrame(autoScroll);

  // Pause on hover so users can view pictures comfortably
  viewport.addEventListener('mouseenter', () => { isPaused = true; });
  viewport.addEventListener('mouseleave', () => { isPaused = false; });
  viewport.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
  viewport.addEventListener('touchend', () => {
    setTimeout(() => { isPaused = false; }, 2500);
  });

  // Working Navigation Buttons (Scroll Smoothly by 1 Card Width)
  const scrollStep = 340;

  prevBtn?.addEventListener('click', () => {
    isPaused = true;
    viewport.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    setTimeout(() => { isPaused = false; }, 3500);
  });

  nextBtn?.addEventListener('click', () => {
    isPaused = true;
    viewport.scrollBy({ left: scrollStep, behavior: 'smooth' });
    setTimeout(() => { isPaused = false; }, 3500);
  });
}

/* 11. Interactive Food Itinerary & Dining Timeline */
function initDiningTimeline() {
  const pills = document.querySelectorAll('.dining-pill');
  const foodCards = document.querySelectorAll('[data-trigger-meal]');
  const heroImg = document.getElementById('diningHeroImg');
  const heroTime = document.getElementById('diningHeroTime');
  const heroTitle = document.getElementById('diningHeroTitle');
  const heroDesc = document.getElementById('diningHeroDesc');
  const heroDishes = document.getElementById('diningHeroDishes');

  const MEALS = {
    lunch: {
      title: 'Grand Royal Lunch Buffet',
      time: '⏰ 01:00 PM - 02:30 PM • Unlimited Buffet',
      desc: 'An extensive multi-cuisine spread prepared daily with farm-fresh ingredients, featuring rich gravies, slow-cooked dal, live tandoor breads, and decadent desserts.',
      img: '/AapnoGharlmages/PhotoImage/2-restaurant-aapnoghar-admin.jpg',
      dishes: [
        { icon: '🧀', name: 'Paneer Butter Masala' },
        { icon: '🍲', name: 'Rajma / Dal Tadka' },
        { icon: '🍜', name: 'Veg Chowmein & Hot Garlic' },
        { icon: '🍚', name: 'Steamed Basmati Rice' },
        { icon: '🫓', name: 'Tandoori Roti & Naan' },
        { icon: '🥗', name: 'Green Salad, Raita & Papad' },
        { icon: '🍮', name: 'Seviyan Kheer Dessert' },
        { icon: '🌱', name: '100% Pure Veg Prepared' }
      ]
    },
    breakfast: {
      title: 'Energizing Morning Breakfast Spread',
      time: '⏰ 09:30 AM - 10:30 AM • Fresh & Hot',
      desc: 'Kickstart your adventure day with hot piping pooris, slow-cooked aloo subzi, steaming idlis with sambhar, fluffy poha, and traditional desi ghee halwa.',
      img: '/AapnoGharlmages/PhotoImage/1-restaurant-aapnoghar-admin.jpg',
      dishes: [
        { icon: '☕', name: 'Desi Kulhad Chai' },
        { icon: '🥔', name: 'Aloo ki Sabzi' },
        { icon: '🫓', name: 'Crisp Hot Pooris' },
        { icon: '🥣', name: 'Steaming Idli & Sambhar' },
        { icon: '🍚', name: 'Indori Spiced Poha' },
        { icon: '🍮', name: 'Desi Ghee Sooji Halwa' },
        { icon: '🌶️', name: 'Traditional Achaar & Chatni' },
        { icon: '✨', name: 'Unlimited Morning Servings' }
      ]
    },
    gharkaangan: {
      title: 'Special Food from "Ghar Ka Aangan"',
      time: '⏰ All-Day Live Counter • Authentic Village Kitchen',
      desc: 'Experience pure rural culinary heritage with authentic wood-fired and clay-pot preparations cooked fresh in front of your eyes.',
      img: '/AapnoGharlmages/MealImage/special-food-from-ghar-ka-aangan-2-aapnoghar.jpg',
      dishes: [
        { icon: '🥣', name: 'Kadhi Pakora' },
        { icon: '🌾', name: 'Jau ki Roti' },
        { icon: '🧄', name: 'Lehsoon ki Chatni' },
        { icon: '🍨', name: 'Hot Jalebi & Chilled Rabri' },
        { icon: '🍧', name: 'Kala Khatta Chuski' },
        { icon: '🥛', name: 'Desi Raabdi & Sattu' },
        { icon: '🍿', name: 'Roasted Channa & Popcorn' },
        { icon: '🍬', name: 'Mithi Goli Chini & Pakode' }
      ]
    },
    chaat: {
      title: 'Purani Dilli Special Chaat Counter',
      time: '⏰ Continuous Live Counters • Tangy & Spicy',
      desc: 'Savor the authentic flavors of Old Delhi with freshly fried crisp tikkis, chilled mint water gol gappas, and tangy sev bhel pooris.',
      img: '/AapnoGharlmages/PhotoImage/3-restaurant-aapnoghar-admin.jpg',
      dishes: [
        { icon: '🥔', name: 'Crisp Golden Aloo Tikki' },
        { icon: '🥟', name: 'Gol Gappe (5-Flavour Pani)' },
        { icon: '🥣', name: 'Tangy Bombay Bhel Poori' },
        { icon: '🌿', name: 'Sweet Tamarind & Mint Chutneys' },
        { icon: '🌶️', name: 'Spicy Chaat Masala' },
        { icon: '🌱', name: 'Freshly Prepared Live' }
      ]
    },
    beverages: {
      title: 'Refreshing Country Drinks & Hi-Tea',
      time: '⏰ 11:00 AM - 01:00 PM & 03:00 PM - 06:00 PM',
      desc: 'Stay cool and hydrated under the sun with our signature desi refreshments, herbal coolers, and evening high tea.',
      img: '/AapnoGharlmages/PhotoImage/restaurant-aapno-ghar.jpg',
      dishes: [
        { icon: '🍋', name: 'Neembu Shikanjee Cooler' },
        { icon: '🥤', name: 'Chilled Jal Jeera' },
        { icon: '🌹', name: 'Gulab Sharbat' },
        { icon: '☕', name: 'Ginger Masala High Tea' },
        { icon: '🧊', name: 'Chilled Roohafza Cooler' },
        { icon: '🍪', name: 'Tea Time Assorted Cookies' }
      ]
    }
  };

  function selectMeal(key) {
    const data = MEALS[key];
    if (!data) return;

    pills.forEach(p => {
      if (p.dataset.meal === key) p.classList.add('active');
      else p.classList.remove('active');
    });

    foodCards.forEach(c => {
      if (c.dataset.triggerMeal === key) c.classList.add('active-card');
      else c.classList.remove('active-card');
    });

    if (heroTitle) heroTitle.textContent = data.title;
    if (heroTime) heroTime.textContent = data.time;
    if (heroDesc) heroDesc.textContent = data.desc;
    if (heroImg) heroImg.src = data.img;

    if (heroDishes) {
      heroDishes.innerHTML = data.dishes.map(d => `
        <div class="dish-item-badge">
          <span>${d.icon}</span> <span>${d.name}</span>
        </div>
      `).join('');
    }
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => selectMeal(pill.dataset.meal));
  });

  foodCards.forEach(card => {
    card.addEventListener('click', () => selectMeal(card.dataset.triggerMeal));
  });
}

/* 12. Continuous Right-to-Left Venues Carousel */
function initVenuesCarousel() {
  const viewport = document.getElementById('venuesCarousel');
  const prevBtn = document.getElementById('venuePrevBtn');
  const nextBtn = document.getElementById('venueNextBtn');
  if (!viewport) return;

  let autoScrollSpeed = 0.8;
  let isPaused = false;
  let animationId = null;

  function autoScroll() {
    if (!isPaused) {
      // Loop smoothly when reaching half the track width (due to duplicated card set)
      const halfWidth = viewport.scrollWidth / 2;
      if (viewport.scrollLeft >= halfWidth) {
        viewport.scrollLeft -= halfWidth;
      } else {
        viewport.scrollLeft += autoScrollSpeed;
      }
    }
    animationId = requestAnimationFrame(autoScroll);
  }

  animationId = requestAnimationFrame(autoScroll);

  // Pause on hover or touch
  viewport.addEventListener('mouseenter', () => { isPaused = true; });
  viewport.addEventListener('mouseleave', () => { isPaused = false; });
  viewport.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
  viewport.addEventListener('touchend', () => {
    setTimeout(() => { isPaused = false; }, 2500);
  });

  const scrollStep = 320;
  prevBtn?.addEventListener('click', () => {
    isPaused = true;
    viewport.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    setTimeout(() => { isPaused = false; }, 3500);
  });

  nextBtn?.addEventListener('click', () => {
    isPaused = true;
    viewport.scrollBy({ left: scrollStep, behavior: 'smooth' });
    setTimeout(() => { isPaused = false; }, 3500);
  });
}


