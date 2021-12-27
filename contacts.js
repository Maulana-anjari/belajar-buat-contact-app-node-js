const fs = require('fs');
const { resolve } = require('path/posix');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// membuat folder data
const dirPATH = './data';
if(!fs.existsSync(dirPATH)){
    fs.mkdirSync(dirPATH);
}

// membuat file contacts.json jika beluma ada
const dataPATH = './data/contacts.json';
if(!fs.existsSync(dataPATH)){
    fs.writeFileSync(dataPATH, '[]', 'utf-8');
}

// pertanyaan
const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, reject)=> {
        rl.question(pertanyaan, (apa) => resolve(apa));
    })
}

// simpan kontak
const saveContact = (nama,email, nomorHP) => {
    const contact = {nama, email, nomorHP};
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    
    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log(`Terima kasih ${nama}`);
    console.table(contacts);
    rl.close();
}

module.exports = {tulisPertanyaan, saveContact}
