window.addEventListener("scroll", () => {
    document.getElementById("scrollTopBtn").style.display =
        window.scrollY > 200 ? "block" : "none";
});
document.getElementById("scrollTopBtn").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});