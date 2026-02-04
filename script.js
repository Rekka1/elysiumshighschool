/* SCRIPT.JS
    Berisi logika: Animasi AOS, Bintang Jatuh, Filter Jurusan, Scroll Button.
*/

// 1. Inisialisasi Animasi AOS (Fade In Effect)
AOS.init({
    duration: 1000,
    once: true
});

// 2. Animasi Bintang Jatuh (Snow/Star Fall)
function createStar() {
    // Hanya buat bintang jika kita berada di halaman yang memiliki section #home
    const homeSection = document.getElementById('home');
    if (!homeSection) return;

    const star = document.createElement('div');
    star.classList.add('star');
    
    // Random posisi dan ukuran
    star.style.left = Math.random() * 100 + "vw";
    const size = Math.random() * 3 + 2 + "px"; // Ukuran antara 2px - 5px
    star.style.width = size;
    star.style.height = size;
    
    // Random durasi jatuh (3s - 8s)
    star.style.animationDuration = Math.random() * 5 + 3 + "s";
    star.style.opacity = Math.random();
    
    homeSection.appendChild(star);
    
    // Hapus elemen setelah animasi selesai (agar tidak berat)
    setTimeout(() => {
        star.remove();
    }, 8000);
}
// Jalankan fungsi setiap 100ms
setInterval(createStar, 100);

// 3. Tombol Scroll Up
const scrollBtn = document.getElementById("scrollToTop");

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollBtn.style.display = "flex";
    } else {
        scrollBtn.style.display = "none";
    }
};

if (scrollBtn) {
    scrollBtn.addEventListener("click", function(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// 4. Logika Filter Jurusan & Tombol Aktif
document.addEventListener("DOMContentLoaded", function() {
    // Default: Tampilkan jurusan 'popular' saat loading
    filterSelection('popular'); 
});

// Fungsi Utama Filter
function filterSelection(category) {
    var x, i;
    x = document.getElementsByClassName("filter-item");
    
    if (category == "all") category = ""; // Jika 'all', kosongkan filter

    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show"); // Reset: Sembunyikan semua
        
        // Cek apakah kartu punya class yang sesuai kategori
        if (x[i].className.indexOf(category) > -1) {
            w3AddClass(x[i], "show"); // Tampilkan yang sesuai
        }
    }
}

// Fungsi Helper: Tambah Class
function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
    }
}

// Fungsi Helper: Hapus Class
function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);     
        }
    }
    element.className = arr1.join(" ");
}

// --- FIX: LOGIC GANTI WARNA TOMBOL FILTER ---
var btnContainer = document.querySelector(".filter-container");

if (btnContainer) {
    // Ambil semua tombol yang punya class 'filter-btn'
    var btns = btnContainer.getElementsByClassName("filter-btn");

    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            // 1. Reset: Hapus class 'active' dari SEMUA tombol filter dulu
            for (var j = 0; j < btns.length; j++) {
                btns[j].classList.remove("active");
            }

            // 2. Set: Tambahkan class 'active' HANYA ke tombol yang diklik ini
            this.classList.add("active");
        });
    }
}