let contacts = [
  {
    name: "Maxwell Wright",
    phone: "(0191) 719 6495",
    email: "curabitur.egestas.nunc@nonummyac.co.uk"
  },
  {
    name: "Raja Villarreal",
    phone: "0866 398 2895",
    email: "posuere.vulputate@sed.com"
  },
  {
    name: "Helen Richards",
    phone: "0880 1111",
    email: "libero@convallis.edu"
  }
];


// Ask user what they want to do
let choice = prompt("Choose an action: first, last, or new");


if (choice === "first") {
  console.log("First contact:");
  console.log(contacts[0]);


} else if (choice === "last") {
  console.log("Last contact:");
  console.log(contacts[contacts.length - 1]);


} else if (choice === "new") {
  let name = prompt("Enter name:");
  let phone = prompt("Enter phone:");
  let email = prompt("Enter email:");


  // Validation: check if any field is empty
  if (name === "" || phone === "" || email === "") {
    console.log("Contact not added. Missing information.");
  } else {
    let newContact = {
      name: name,
      phone: phone,
      email: email
    };


    contacts.push(newContact);
    console.log("New contact added:");
    console.log(newContact);
  }


} else {
  console.log("Invalid choice. Please type: first, last, or new.");
}