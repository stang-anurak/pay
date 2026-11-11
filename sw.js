const CACHE = 'expense-v6';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png', './face-tang.png', './face-ai.png', './piggy.png',
  './icons/cat/bill.png',
  './icons/cat/food.png',
  './icons/cat/health.png',
  './icons/cat/other.png',
  './icons/cat/shop.png',
  './icons/cat/travel.png',
  './icons/opt/bill-common.png',
  './icons/opt/bill-credit.png',
  './icons/opt/bill-edu.png',
  './icons/opt/bill-electric.png',
  './icons/opt/bill-gas.png',
  './icons/opt/bill-insurance.png',
  './icons/opt/bill-phone.png',
  './icons/opt/bill-rent.png',
  './icons/opt/bill-repair.png',
  './icons/opt/bill-subscription.png',
  './icons/opt/bill-tax.png',
  './icons/opt/bill-water.png',
  './icons/opt/bill-wifi.png',
  './icons/opt/food-alcohol.png',
  './icons/opt/food-bbq.png',
  './icons/opt/food-coffee.png',
  './icons/opt/food-curry.png',
  './icons/opt/food-delivery.png',
  './icons/opt/food-dessert.png',
  './icons/opt/food-drink.png',
  './icons/opt/food-fastfood.png',
  './icons/opt/food-fruit.png',
  './icons/opt/food-isan.png',
  './icons/opt/food-japanese.png',
  './icons/opt/food-market.png',
  './icons/opt/food-noodle.png',
  './icons/opt/food-rice.png',
  './icons/opt/food-snack.png',
  './icons/opt/food-tea.png',
  './icons/opt/health-clinic.png',
  './icons/opt/health-dental.png',
  './icons/opt/health-glasses.png',
  './icons/opt/health-gym.png',
  './icons/opt/health-hospital.png',
  './icons/opt/health-mask.png',
  './icons/opt/health-massage.png',
  './icons/opt/health-medicine.png',
  './icons/opt/health-sport.png',
  './icons/opt/health-vitamin.png',
  './icons/opt/other-bank.png',
  './icons/opt/other-envelope.png',
  './icons/opt/other-family.png',
  './icons/opt/other-friends.png',
  './icons/opt/other-game.png',
  './icons/opt/other-hair.png',
  './icons/opt/other-laundry.png',
  './icons/opt/other-merit.png',
  './icons/opt/other-movie.png',
  './icons/opt/other-pet.png',
  './icons/opt/other-post.png',
  './icons/opt/other-trip.png',
  './icons/opt/shop-appliance.png',
  './icons/opt/shop-bag.png',
  './icons/opt/shop-beauty.png',
  './icons/opt/shop-book.png',
  './icons/opt/shop-clothes.png',
  './icons/opt/shop-daily.png',
  './icons/opt/shop-furniture.png',
  './icons/opt/shop-gadget.png',
  './icons/opt/shop-gift.png',
  './icons/opt/shop-home.png',
  './icons/opt/shop-online.png',
  './icons/opt/shop-pet.png',
  './icons/opt/shop-shoes.png',
  './icons/opt/shop-toy.png',
  './icons/opt/travel-bus.png',
  './icons/opt/travel-fuel.png',
  './icons/opt/travel-hotel.png',
  './icons/opt/travel-insurance.png',
  './icons/opt/travel-moto.png',
  './icons/opt/travel-parking.png',
  './icons/opt/travel-plane.png',
  './icons/opt/travel-repair.png',
  './icons/opt/travel-taxi.png',
  './icons/opt/travel-tire.png',
  './icons/opt/travel-toll.png',
  './icons/opt/travel-train.png',
  './icons/opt/travel-wash.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  const font = u.hostname === 'fonts.googleapis.com' || u.hostname === 'fonts.gstatic.com';
  if (e.request.method !== 'GET' || (u.origin !== location.origin && !font)) return;
  e.respondWith(fetch(e.request).then(res => {
    if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match(e.request).then(hit => hit ||
    (e.request.mode === 'navigate' ? caches.match('./index.html') : Response.error()))));
});
