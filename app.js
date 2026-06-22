const toggleSwitch = document.getElementById('toggleSwitch');
const statusText = document.getElementById('statusText');

// Sayfa açılınca kaydedilmiş durumu yükle
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
    statusText.style.color = '#2d7a4f';
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

// Sayfa açılınca da izin iste
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

  // Aktif butonu güncelle
  document.querySelectorAll('.tema-btn').forEach(btn => {
    btn.classList.remove('aktif');
    if (btn.dataset.tema === temaAdi) {
      btn.classList.add('aktif');
    }
  });
}

// Sayfa açılınca kaydedilmiş temayı yükle
const kayitliTema = localStorage.getItem('tema') || 'yesil';
temayiUygula(kayitliTema);

// Tema butonlarına tıklama
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