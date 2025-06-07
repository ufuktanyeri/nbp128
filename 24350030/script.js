// Butonu al
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Kaydırma olduğunda kontrol et
window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
};

// Tıklandığında yukarı dön
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

