/**
 * AapnoGhar Destination Web App Interactive Engine
 * Connected to centralized AAPNOGHAR_DATA
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initPersonaSwitcher();
  initBuildDayCalculator();
  initAttractionFilters();
  initInteractiveMap();
  initBookingFunnelModal();
  initStickyDock();
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
      video.play().catch(() => {});
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

/* 1. Header Scroll Behavior */
function initHeaderScroll() {
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });
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
      title: 'A Joyful Day for All Generations',
      desc: 'Unite the entire family with gentle water slides, carousel rides, puppet shows, traditional village games, and hearty buffet meals.',
      media: '/AapnoGharlmages/EntertainmentImages/activity-park-1-aapno-ghar.jpg',
      highlights: [
        '<span>✓</span> Unlimited 21+ Family Rides',
        '<span>✓</span> Kids Shallow Lagoons & Rain Dance',
        '<span>✓</span> Traditional Cart Rides & Pottery',
        '<span>✓</span> Multi-Cuisine Unlimited Buffet'
      ],
      price: '₹1,599',
      unit: '/ person',
      packageId: 'family-day'
    },
    water: {
      badge: '💦 Extreme Splash',
      title: 'High-Thrill Water Slides & Wave Pool',
      desc: 'Slide into heart-pounding aquatic thrills with the Turbo Twister, Aqua Tube, mist pools, tipping buckets, and high-energy rain dance beats.',
      media: '/AapnoGharlmages/PhotoImage/water-park-aapno-ghar.jpg',
      highlights: [
        '<span>✓</span> Giant Turbo Twister & Aqua Tubes',
        '<span>✓</span> Massive Family Fun Wave Pool',
        '<span>✓</span> DJ Rain Dance Arena',
        '<span>✓</span> Refreshing Cool Drinks & Snacks'
      ],
      price: '₹1,399',
      unit: '/ person',
      packageId: 'water-pass'
    },
    birthday: {
      badge: '🎂 Birthday Celebrations',
      title: 'Magical Parties & Non-Stop Fun',
      desc: 'Give your child or loved one a birthday they will talk about for years with private lawn space, balloon decor, adventure rides, and customized menus.',
      media: '/AapnoGharlmages/WeddeingEventImages/abhinandan-hall-l.jpg',
      highlights: [
        '<span>✓</span> Private Event Lawn / Banquet Access',
        '<span>✓</span> Full Amusement & Water Park Passes',
        '<span>✓</span> Custom Cake, Decor & DJ Music',
        '<span>✓</span> Live Magic & Puppet Shows'
      ],
      price: '₹1,799',
      unit: '/ guest (Min 20)',
      packageId: 'birthday-pack'
    },
    wedding: {
      badge: '💍 Royal Destination Wedding',
      title: 'Royal Lawns & Unforgettable Nuptials',
      desc: 'Say "I Do" surrounded by 9 acres of lush greenery, grand banquet halls, customizable luxury suites for guests, and royal catering.',
      media: '/AapnoGharlmages/WeddeingEventImages/bhanwar-party-lawn-l.jpg',
      highlights: [
        '<span>✓</span> Bhanwar & Chander Lawns (Up to 2,000 Guests)',
        '<span>✓</span> 67 Luxury Air-Conditioned Rooms',
        '<span>✓</span> Dedicated Wedding Event Coordinators',
        '<span>✓</span> Grand Stage, Mandap & Royal Feast'
      ],
      price: 'Custom',
      unit: 'Quote on Request',
      packageId: 'wedding-pkg'
    },
    corporate: {
      badge: '🏢 Corporate Offsite',
      title: 'Team Building, Conferences & Leisure',
      desc: 'Energize your workforce with state-of-the-art conference facilities, rope courses, team challenges, and poolside networking dinners.',
      media: '/AapnoGharlmages/WeddeingEventImages/corporate-events-conferences-l.jpg',
      highlights: [
        '<span>✓</span> AC Conference Halls with AV Tech',
        '<span>✓</span> 24+ Adventure & Team Building Drills',
        '<span>✓</span> Welcome Drinks, Lavish Lunch & Hi-Tea',
        '<span>✓</span> Evening DJ & Cocktail Lawns'
      ],
      price: '₹1,850',
      unit: '/ employee',
      packageId: 'corporate-pkg'
    },
    staycation: {
      badge: '🏨 Weekend Staycation',
      title: 'Lush Resort Retreat & Unlimited Play',
      desc: 'Escape the city rush. Relax in expansive suites overlooking garden vistas with all-inclusive access to the water and amusement parks.',
      media: '/AapnoGharlmages/RoomImages/presidential-suite-room-2.jpg',
      highlights: [
        '<span>✓</span> Stay in Luxury or Presidential Suites',
        '<span>✓</span> Complimentary Full-Day Park Passes',
        '<span>✓</span> Gourmet Buffet Breakfast & Dinner',
        '<span>✓</span> Wi-Fi, Poolside Access & Room Service'
      ],
      price: '₹6,499',
      unit: '/ room / night',
      packageId: 'stay-play'
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
        highlightsEl.innerHTML = data.highlights.map(h => `<li>${h}</li>`).join('');
      }

      if (ctaBtn) {
        ctaBtn.onclick = () => openBookingModal(data.packageId);
      }
    });
  });
}

/* 3. Attraction Category Filter */
function initAttractionFilters() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const items = document.querySelectorAll('.ride-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      items.forEach(item => {
        if (filter === 'all' || item.dataset.type === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
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

/* 6. 5-Step Modern Booking Funnel Modal */
let bookingFunnel = {
  currentStep: 1,
  category: 'water-amuse',
  date: new Date().toISOString().split('T')[0],
  adults: 2,
  children: 1,
  packageRate: 1599,
  packageName: 'Water + Amusement Pass'
};

function initBookingFunnelModal() {
  const overlay = document.getElementById('bookingModal');
  const closeBtn = document.getElementById('closeBookingModal');
  const nextBtn = document.getElementById('modalNextBtn');
  const prevBtn = document.getElementById('modalPrevBtn');

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

  document.querySelectorAll('.booking-choice-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.booking-choice-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      bookingFunnel.category = card.dataset.cat;
      if (card.dataset.rate) {
        bookingFunnel.packageRate = parseInt(card.dataset.rate, 10);
        bookingFunnel.packageName = card.dataset.pkgname || 'Selected Package';
      }
    });
  });

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

  const dateInput = document.getElementById('funnelDate');
  if (dateInput) {
    dateInput.value = bookingFunnel.date;
    dateInput.addEventListener('change', (e) => {
      bookingFunnel.date = e.target.value;
      updateFunnelSummary();
    });
  }

  nextBtn?.addEventListener('click', () => {
    if (bookingFunnel.currentStep < 5) {
      setFunnelStep(bookingFunnel.currentStep + 1);
    } else {
      alert(`🎉 Booking Confirmation for ${bookingFunnel.adults} Adults & ${bookingFunnel.children} Kids on ${bookingFunnel.date}!\n\nOur concierge has received your request and will contact you with payment details.`);
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

function openBookingModal(pkgId = 'water-amuse') {
  const overlay = document.getElementById('bookingModal');
  if (!overlay) return;
  overlay.classList.add('open');
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

  if (summaryDate) summaryDate.textContent = bookingFunnel.date;
  if (summaryGuests) summaryGuests.textContent = `${bookingFunnel.adults} Adults, ${bookingFunnel.children} Children`;
  if (summaryPkg) summaryPkg.textContent = bookingFunnel.packageName;

  // Rate formula: Adult rate + (Kid rate ~ 80%)
  const total = (bookingFunnel.adults * bookingFunnel.packageRate) + (bookingFunnel.children * Math.round(bookingFunnel.packageRate * 0.8));
  if (summaryTotal) summaryTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
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

/* 9. FAQ Accordion */
function initFaqAccordion() {
  document.querySelectorAll('.faq-header').forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const isOpen = parent.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) parent.classList.add('open');
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


