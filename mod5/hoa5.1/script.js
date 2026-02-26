// Create the Directory
let teamDirectory = [
  {
    name: "Leo Brooks",
    role: "Designer",
    skills: ["UI", "UX", "Figma"],
    available: true
  },
  {
    name: "Sasha Ivana",
    role: "Developer",
    skills: ["HTML", "CSS", "JS"],
    available: false
  },
  {
    name: "Jordan Lee",
    role: "Manager",
    skills: ["Planning", "Agile"],
    available: true
  }
];

// Add a New Specialist
teamDirectory.push({
  name: "Casey Moore",
  role: "QA Engineer",
  skills: ["Testing", "Debugging"],
  available: true
});

// Update Availability
teamDirectory[1].available = true;

// Data Extraction

// A
console.log(
  "First Member:",
  teamDirectory[0].name,
  "- First Skill:",
  teamDirectory[0].skills[0]
);

// B
let lastMember = teamDirectory[teamDirectory.length - 1];
console.log(
  "Last Member:",
  lastMember.name,
  "- Number of Skills:",
  lastMember.skills.length
);

// C
console.log("Total Members:", teamDirectory.length);