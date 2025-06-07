document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const btn = document.getElementById("themeToggle");
    btn.textContent = document.body.classList.contains("dark") ? "☀️ Açık Mod" : "🌙 Karanlık Mod";
});

window.addEventListener("scroll", () => {
    document.getElementById("scrollTopBtn").style.display =
        window.scrollY > 200 ? "block" : "none";
});
document.getElementById("scrollTopBtn").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Proje filtreleme
const filterSelect = document.getElementById("categoryFilter");
filterSelect.addEventListener("change", () => {
    const value = filterSelect.value;
    document.querySelectorAll(".project-card").forEach(card => {
        const show = value === "all" || card.dataset.category === value;
        card.style.display = show ? "block" : "none";
    });
});

const filterSelect2 = document.getElementById("categoryFilter");
filterSelect.addEventListener("change", () => {
    const value = filterSelect.value;
    document.querySelectorAll(".project-card2").forEach(card => {
        const show = value === "all" || card.dataset.category === value;
        card.style.display = show ? "block" : "none";
    });
});

const filterSelect3 = document.getElementById("categoryFilter");
filterSelect.addEventListener("change", () => {
    const value = filterSelect.value;
    document.querySelectorAll(".project-card3").forEach(card => {
        const show = value === "all" || card.dataset.category === value;
        card.style.display = show ? "block" : "none";
    });
});

const filterSelect4 = document.getElementById("categoryFilter");
filterSelect.addEventListener("change", () => {
    const value = filterSelect.value;
    document.querySelectorAll(".egitim-bilgileri").forEach(card => {
        const show = value === "all" || card.dataset.category === value;
        card.style.display = show ? "block" : "none";
    });
});

const filterSelect5 = document.getElementById("categoryFilter");
filterSelect.addEventListener("change", () => {
    const value = filterSelect.value;
    document.querySelectorAll(".hobi1").forEach(card => {
        const show = value === "all" || card.dataset.category === value;
        card.style.display = show ? "block" : "none";
    });
});

// Form statüsü (Formspree kullandım)
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
form.addEventListener("submit", function (e) {
    status.textContent = "Mesaj gönderiliyor...";
    status.style.display = "block";
    setTimeout(() => {
        status.textContent = "Mesajınız gönderildi! 🎉";
        form.reset();
        setTimeout(() => status.style.display = "none", 4000);
    }, 2000);
});


//saat
function updateClock() {
    const now = new Date();

    // Saat – 12 saatlik sistem
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'ÖS' : 'ÖÖ'; // AM/PM yerine ÖS/ÖÖ kullan
    hours = hours % 12;
    hours = hours ? hours : 12; // 0'ı 12 yap
    const timeStr = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;

    // Tarih – Gün adı ve tarih bilgisi
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

    const dayName = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const dateStr = `${dayName}, ${date} ${month} ${year}`;

    // HTML'e yaz
    document.getElementById('clockTime').textContent = timeStr;
    document.getElementById('clockDate').textContent = dateStr;
}

setInterval(updateClock, 1000);
updateClock(); // Hemen çalıştır

// Hava Durumu
fetch("https://wttr.in/?format=%l:+%t\n%C\n💧%h nem\n🌬️ %w rüzgar")
    .then(res => res.text())
    .then(data => {
        document.getElementById("weather").textContent = data;
    })
    .catch(err => {
        document.getElementById("weather").textContent = "Hava durumu alınamadı.";
    });

//footer
const footer = document.getElementById("footer");

function checkFooterVisibility() {
    const rect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top <= windowHeight) {
        footer.classList.add("visible");
        window.removeEventListener("scroll", checkFooterVisibility);
    }
}

window.addEventListener("scroll", checkFooterVisibility);

//asistan
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Sayfa açılışında asistana geç açılma efekti
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const assistant = document.getElementById("assistant");
        assistant.classList.remove("gizli");
        assistant.classList.add("gorunur");
    }, 2000); // 2 saniye sonra görünür
});

// Yorumlar kısmı
const adSoyadInput = document.getElementById("adSoyad");
const yorumInput = document.getElementById("yorum");
const yorumListesi = document.getElementById("yorumListesi");

function yorumEkle() {
    const adSoyad = adSoyadInput.value.trim();
    const yorum = yorumInput.value.trim();
    const tarih = new Date().toLocaleString();

    if (!adSoyad || !yorum) {
        alert("Lütfen adınızı ve yorumunuzu girin.");
        return;
    }

    const yeniYorum = { adSoyad, yorum, tarih };
    const yorumlar = JSON.parse(localStorage.getItem("yorumlar")) || [];
    yorumlar.push(yeniYorum);
    localStorage.setItem("yorumlar", JSON.stringify(yorumlar));

    adSoyadInput.value = "";
    yorumInput.value = "";
    yorumlariGoster();
}

function yorumlariGoster() {
    const yorumlar = JSON.parse(localStorage.getItem("yorumlar")) || [];
    yorumListesi.innerHTML = "";

    yorumlar.forEach((yorum, index) => {
        const div = document.createElement("div");
        div.classList.add("yorum");
        div.innerHTML = `
      <strong>${yorum.adSoyad}</strong> - <em>${yorum.tarih}</em><br>
      <p>${yorum.yorum}</p>
      <button class="sil-btn" onclick="yorumuSil(${index})">Sil</button>
    `;
        yorumListesi.appendChild(div);
    });
}

function yorumuSil(index) {
    const yorumlar = JSON.parse(localStorage.getItem("yorumlar")) || [];
    yorumlar.splice(index, 1);
    localStorage.setItem("yorumlar", JSON.stringify(yorumlar));
    yorumlariGoster();
}

// Sayfa yüklendiğinde yorumları göster
yorumlariGoster();

//ana resim ve overlay resim
const mainImage = document.getElementById('mainImage');
const popupImage = document.getElementById('popupImage');

let clickCount = 0;
let isPopupVisible = false;

mainImage.addEventListener('click', () => {
    clickCount++;

    if (clickCount === 1) {
        if (!isPopupVisible) {
            popupImage.classList.add('show');
            isPopupVisible = true;
        } else {
            popupImage.classList.remove('show');
            isPopupVisible = false;
        }
        clickCount = 0; // her 1 tıklamada sıfırla
    }
});
