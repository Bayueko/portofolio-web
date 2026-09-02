// Mengambil elemen tombol dari HTML berdasarkan ID
const toggleBtn = document.getElementById('theme-toggle');

// Mendengarkan kejadian klik pada tombol
toggleBtn.addEventListener('click', function () {
    // Menambah atau menghapus kelas 'dark-mode' pada elemen body
    document.body.classList.toggle('dark-mode');

    // Mengubah teks tombol sesuai kondisi saat ini
    if (document.body.classList.contains('dark-mode')) {
        toggleBtn.textContent = 'Mode Terang';
    } else {
        toggleBtn.textContent = 'Mode Gelap';
    }
});