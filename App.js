const yargs = require("yargs")
const {saveContact, listContact, detailContact} = require("./contacts")
yargs.command({
    command: 'add',
    describe: 'Add new contact',
    builder: {
        name: {
            demandOption: true, // field nama harus diisi
            describe: 'Full Name',
            type: 'string'
        },
        email: {
            demandOption: false, // field email tidak harus diisi
            describe: 'Email',
            type: 'string'
        },
        number: {
            demandOption: true,
            describe: 'Number Phone',
            type: 'string'
        }
    },
    handler(argv){
        saveContact(argv.name, argv.email, argv.number)
    }
}).demandCommand()

yargs.command({
    command: 'list',
    describe: 'Show all contacts',
    handler(){
        listContact()
    }
})
yargs.parse()