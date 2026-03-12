let contacts = [
  {
    name: "Maxwell Wright",
    phone: "(0191) 719 6495",
    email: "Curabitur.egestas.nunc@nonummyac.co.uk"
  },
  {
    name: "Raja Villarreal",
    phone: "0866 398 2895",
    email: "posuere.vulputate@sed.com"
  },
  {
    name: "Helen Richards",
    phone: "0800 1111",
    email: "libero@convallis.edu"
  }
];


let choice = "";


while (choice !== "quit") {
  choice = prompt("Choose an option: show, all, add, search, or quit");


  if (!choice) continue; // handles cancel


  choice = choice.toLowerCase();


  if (choice === "show") {
    let index = prompt("Enter contact index:");


    if (index === null) continue;


    index = Number(index);


    if (index >= 0 && index < contacts.length) {
      console.log(contacts[index]);
    } else {
      alert("Invalid index.");
    }


  } else if (choice === "all") {
    for (let i = 0; i < contacts.length; i++) {
      console.log(i + ": ", contacts[i]);
    }


  } else if (choice === "add") {
    let name = prompt("Enter name:");
    let phone = prompt("Enter phone:");
    let email = prompt("Enter email:");


    if (!name || !phone || !email) {
      alert("Contact not added. All fields are required.");
    } else {
      contacts.push({ name: name, phone: phone, email: email });
      console.log("Contact added:", name);
    }


  } else if (choice === "search") {
    let searchName = prompt("Enter name to search:");


    if (!searchName) continue;


    let found = false;


    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].name.toLowerCase() === searchName.toLowerCase()) {
        console.log("Phone:", contacts[i].phone);
        console.log("Email:", contacts[i].email);
        found = true;
        break;
      }
    }


    if (!found) {
      alert("Contact not found.");
    }


  } else if (choice === "quit") {
    console.log("Program terminated.");


  } else {
    alert("Invalid option. Try again.");
  }
}