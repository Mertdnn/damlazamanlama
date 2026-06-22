const BILDIRIMLER = [
  {
    saat: 12:40,
    dakika: 0,
    baslik: 'Damla Zamanı 💧',
    mesaj: 'Günaydın, damlanı damlatmayı unutma sakın ayrıca uyandırdıysam da üzgünüm...'
  },
  {
    saat: 13,
    dakika: 0,
    baslik: 'Damla Zamanı 💧',
    mesaj: 'Göz damlanı unutma!!! :)'
  },
  {
    saat: 17,
    dakika: 0,
    baslik: 'Damla Zamanı 💧',
    mesaj: 'Göz damlanı unutma!!! :)'
  },
  {
    saat: 21,
    dakika: 0,
    baslik: 'Damla Zamanı 💧',
    mesaj: 'Yatarken göz damlanı damlatmayı unutma gözlerin kurur sabaha'
  }
];

// Her dakika kontrol et
setInterval(() => {
  const simdi = new Date();
  const saat = simdi.getHours();
  const dakika = simdi.getMinutes();

  BILDIRIMLER.forEach(b => {
    if (b.saat === saat && b.dakika === dakika) {
      self.registration.showNotification(b.baslik, {
        body: b.mesaj,
        icon: '/damlazamanlama/icons/icon-192.png',
        badge: '/damlazamanlama/icons/icon-192.png'
      });
    }
  });
}, 60000); // 60 saniyede bir kontrol

// Service Worker kurulumu
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});
