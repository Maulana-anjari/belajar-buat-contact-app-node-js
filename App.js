const contacts = require('./contacts.js');
const showQuestion = async () => {
    const nama = await contacts.tulisPertanyaan("Masukkan nama Anda : ");
    const email = await contacts.tulisPertanyaan("Masukkan email Anda : ");
    const nomorHP = await contacts.tulisPertanyaan("Masukkan nomor HP Anda : ");
    contacts.saveContact(nama, email, nomorHP);

}

showQuestion();