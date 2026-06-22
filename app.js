const VAPID_KEY = "BF7LAPsybPRzcZjxmSTXA1-aBmiLoCfFBvphKbhcR1bvhbh_-QmxYhTMraV15QoGEhvTYb8Od5yq0xWLagMqN_E";

async function fcmTokenAl() {
  try {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js");
    const { getMessaging, getToken } = await import("https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging.js");

    const app = initializeApp({
      apiKey: "AIzaSyCTBkbRlLBZiSdJvphCit0y044Qobf39nw",
      authDomain: "damlazamanlama.firebaseapp.com",
      projectId: "damlazamanlama",
      storageBucket: "damlazamanlama.firebasestorage.app",
      messagingSenderId: "59864562654",
      appId: "1:59864562654:web:b5717a7dabf3ae6788fb4f"
    });

    const messaging = getMessaging(app);
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    
    if (token) {
      console.log('FCM Token:', token);
      localStorage.setItem('fcmToken', token);
    }
  } catch (err) {
    console.error('Token hatası:', err);
  }
}

fcmTokenAl();

const toggleSwitch = document.getElementById('toggleSwitch');
const statusText = document.getElementById('statusText');

// Kaydedilmiş durumu yükle
const savedState = localStorage.getItem('active');
if (savedState === 'false') {
  toggleSwitch.checked = false;
  statusText.textContent = 'Hatırlatmalar Kapalı';
  statusText.style.color = '#999';
}

// Toggle değişince
toggleSwitch.addEventListener('change', () => {
  if (toggleSwitch.checked) {
    statusText.textContent = 'Hatırlatmalar Aktif';
    statusText.style.color = 'var(--koyu-renk)';
    localStorage.setItem('active', 'true');
    bildirimIzniIste();
  } else {
    statusText.textContent = 'Hatırlatmalar Kapalı';
    statusText.style.color = '#999';
    localStorage.setItem('active', 'false');
  }
});

// Bildirim izni iste
function bildirimIzniIste() {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Bildirim izni verildi');
      }
    });
  }
}

bildirimIzniIste();

// Service Worker kaydet
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/damlazamanlama/sw.js')
    .then(() => console.log('Service Worker kaydedildi'))
    .catch(err => console.log('Hata:', err));
}

// Tema renkleri
const temalar = {
  yesil:   { ana: '#3cb371', acik: '#f0f7f0', koyu: '#2d7a4f' },
  mavi:    { ana: '#4a90d9', acik: '#f0f4ff', koyu: '#2c5f8a' },
  mor:     { ana: '#9b59b6', acik: '#f8f0ff', koyu: '#6c3483' },
  kirmizi: { ana: '#e57373', acik: '#fff0f0', koyu: '#c0392b' }
};

function temayiUygula(temaAdi) {
  const tema = temalar[temaAdi];
  document.documentElement.style.setProperty('--ana-renk', tema.ana);
  document.documentElement.style.setProperty('--acik-renk', tema.acik);
  document.documentElement.style.setProperty('--koyu-renk', tema.koyu);
  localStorage.setItem('tema', temaAdi);

  document.querySelectorAll('.tema-btn').forEach(btn => {
    btn.classList.remove('aktif');
    if (btn.dataset.tema === temaAdi) {
      btn.classList.add('aktif');
    }
  });
}

const kayitliTema = localStorage.getItem('tema') || 'yesil';
temayiUygula(kayitliTema);

document.querySelectorAll('.tema-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    temayiUygula(btn.dataset.tema);
  });
});

// Test butonu
document.getElementById('testBtn').addEventListener('click', () => {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(sw => {
      sw.showNotification('Damla Zamanı 💧', {
        body: 'Göz damlanı unutma!!! :)',
        icon: '/damlazamanlama/icons/icon-192.png'
      });
    });
  } else {
    alert('Bildirim izni verilmemiş!');
  }
});