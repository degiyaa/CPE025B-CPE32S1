let contacts = [{
name: "Maxwell Wright",
phone: "(0191) 719 6495",
email: "Curabitur.egestas.nunc@nonummyac.co.uk"
}, {
name: "Raja Villarreal",
phone: "0866 398 2895",
email: "posuere.vulputate@sed.com"
}, {
name: "Helen Richards",
phone: "0800 1111",
email: "libero@convallis.edu"
}];

// get new contact data from user
let newName = prompt("Enter name:");
let newPhone = prompt("Enter phone number:");
let newEmail = prompt("Enter email:");

// create new contact object
let newContact = {
    name: newName,
    phone: newPhone,
    email: newEmail
};

// add new contact to the end of the list
contacts.push(newContact);


let last = contacts.length - 1;

console.log(`${contacts[0].name} / ${contacts[0].phone} / ${contacts[0].email}`);
console.log(`${contacts[last].name} / ${contacts[last].phone} / ${contacts[last].email}`);