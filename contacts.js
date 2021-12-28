const fs = require('fs')
const { resolve } = require('path/posix')
const chalk = require('chalk')
const validator = require('validator')

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
//load contact from JSON
const loadContacts = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}
// simpan kontak
const saveContact = (name,email, number) => {
    const contact = {name, email, number};
    // const file = fs.readFileSync('data/contacts.json', 'utf-8');
    // const contacts = JSON.parse(file);
    const contacts = loadContacts();
    // checking duplicate
    const duplicate = contacts.find((contact) => contact.name === name)
    if(duplicate){
        console.log(chalk.red.inverse.bold("Contact already there!"))
        return false;
    }
    // chaecking email
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold("Email is not valid!"))
            return false;
        }
    }
    // checking number phone
    if(!validator.isMobilePhone(number, 'id-ID')){
        console.log(chalk.red.inverse.bold("Number phone is not valid!"))
        return false;
    }
    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log(chalk.green.inverse.bold(`Contact ${name} successfully added`));
}

const listContact = () => {
    const contacts = loadContacts()
    console.log(chalk.cyan.inverse.bold("Contact List: "))
    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.name} ~ ${contact.number}`)
    })
    // console.table(contacts);
}

const detailContact = (name) => {
    const contacts = loadContacts()
    const contact = contacts.find((contact) => 
        contact.name.toLowerCase() === name.toLowerCase()
    )
    if(!contact){
        console.log(chalk.red.inverse.bold(`Contact with name ${name} is not found!`))
        return false;
    }
    console.log(`Name           : ${contact.name}`)
    console.log(`Number Phone   : ${contact.number}`)
    if(contact.email){
        console.log(`Email          : ${contact.email}`)
    }
    
}

const deleteContact = (name) => {
    const contacts = loadContacts()
    const newContacts = contacts.filter((contact) => 
        contact.name.toLowerCase() !== name.toLowerCase()
    )
    if(contacts.length === newContacts.length){
        console.log(chalk.red.inverse.bold(`Contact with name ${name} is not found!`))
        return false;
    }
    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
    console.log(chalk.green.inverse.bold(`Contact ${name} successfully deleted`));
}
module.exports = {
    saveContact, 
    listContact, 
    detailContact, 
    deleteContact}
