// ==============================================
// === SCROLL İLE BELİRME ANİMASYONU AYARLARI ===
// ==============================================

// 1. Animasyon uygulanacak HTML elementlerini seç
// '.content-block', '.projects' ve '.quote-section' class'larına sahip tüm elementleri bulur.
const animatedElements = document.querySelectorAll('.content-block, .projects, .quote-section');

// 2. Intersection Observer için ayarları tanımla
// Bu ayarlar, bir elementin ekranda ne zaman göründüğünü nasıl algılayacağımızı belirler.
const observerOptions = {
    root: null, // Gözlem alanı olarak tarayıcının viewport'unu (görünen alanını) kullan. Null varsayılan değerdir.
    rootMargin: '0px', // Gözlem alanına ek bir kenar boşluğu ekleme.
    threshold: 0.1 // Gözlenen elementin en az %10'u görünür olduğunda 'isIntersecting' true olsun.
};

// 3. Gözlemci tetiklendiğinde çalışacak fonksiyon (callback)
// Bu fonksiyon, gözlenen bir elementin görünürlük durumu değiştiğinde otomatik olarak çağrılır.
const observerCallback = (entries, observer) => {
    // entries: Görünürlük durumu değişen elementlerin listesi
    // observer: Bu callback'i çağıran gözlemcinin kendisi

    entries.forEach(entry => { // Durumu değişen her bir element için döngü
        // entry.isIntersecting: Element şu an viewport içinde mi? (true/false)
        if (entry.isIntersecting) {
            // Eğer element görünür hale geldiyse:

            // a) Hedef elemente 'visible' CSS class'ını ekle.
            //    CSS'te bu class için tanımlanmış animasyon (opacity, transform) çalışır.
            entry.target.classList.add('visible');

            // b) Bu element için gözlemlemeyi durdur.
            //    Animasyonun sadece bir kere (element ilk göründüğünde) çalışmasını sağlar.
            observer.unobserve(entry.target);
        }
        // Not: Else durumu (element tekrar görünmez olduğunda) için bir şey yapmıyoruz,
        // çünkü animasyonun sadece bir kere çalışmasını istiyoruz.
    });
};

// 4. Intersection Observer örneğini (instance) oluştur
// Belirlenen callback fonksiyonu ve ayarları kullanarak yeni bir gözlemci yaratır.
const observer = new IntersectionObserver(observerCallback, observerOptions);

// 5. Seçilen her bir elementi gözlemlemeye başla
// 'animatedElements' listesindeki her bir HTML elementini 'observer'a tanıtarak
// görünürlük durumlarının takip edilmesini sağlar.
animatedElements.forEach(el => { // Listedeki her element (el) için
    observer.observe(el); // Gözlemciye bu elementi izlemesini söyle
});


// ==================================
// === YUKARI ÇIK BUTONU FONKSİYONLARI ===
// ==================================

// 1. Butona tıklandığında sayfayı en üste kaydıran fonksiyon
function scrollToTop() {
    // window.scrollTo metodu ile sayfanın (0, 0) koordinatına gitmesini sağlar.
    // 'behavior: 'smooth'' animasyonlu, yumuşak bir kaydırma efekti verir.
    window.scrollTo({
        top: 0, // Yukarı (top) koordinatı 0 olsun
        behavior: 'smooth' // Kaydırma yumuşak olsun
    });
}

// 2. Sayfa kaydırıldığında butonu gösterip gizleyen olay dinleyici (event listener)
// 'scroll' olayı her tetiklendiğinde (yani kullanıcı sayfayı kaydırdığında) bu fonksiyon çalışır.
window.addEventListener('scroll', function () {
    // a) Yukarı çık butonunun HTML elementini ID'si ile seç
    const button = document.getElementById('scrollToTop');

    // b) Sayfanın dikey kaydırma miktarını (piksel olarak) kontrol et
    //    window.scrollY: Sayfanın en üstünden ne kadar aşağı kaydırıldığı
    if (window.scrollY > 200) { // Eğer 200 pikselden fazla kaydırılmışsa
        // Butonu görünür yap
        button.style.display = 'flex';
    } else { // Eğer 200 piksel veya daha az kaydırılmışsa
        // Butonu gizle
        button.style.display = 'none';
    }
});

// Kendime Not: Bu kodun çalışması için HTML'de id="scrollToTop" olan bir buton elementi
// ve ilgili CSS stillerinin olması gerekmektedir.