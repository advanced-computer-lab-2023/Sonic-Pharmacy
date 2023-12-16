const medicinalUsesArray = [
  "Pain Relief",
  "Pain Relief",
  "Fever Relief",
  "Allergy Relief",
  "Digestive Health",
  "Respiratory Relief",
  "Anxiety Relief",
  "Cholesterol Management",
  "Diabetes Management",
  "Infection Treatment",
];

const dummyData = [
  {
    name: "Paracetamol",
    price: 2.99,
    description: "Fever and pain reducer",
    quantity: 200,
    sales: 400,
    activeIngredients: ["Paracetamol"],
    medicinalUse: medicinalUsesArray[2],
    requiresPrescription: false,
  },
  {
    name: "Loratadine",
    price: 4.99,
    description: "Antihistamine for allergies",
    quantity: 120,
    sales: 150,
    activeIngredients: ["Loratadine"],
    medicinalUse: medicinalUsesArray[3],
    requiresPrescription: false,
  },
  {
    name: "Omeprazole",
    price: 6.99,
    description: "Proton pump inhibitor for heartburn",
    quantity: 80,
    sales: 100,
    activeIngredients: ["Omeprazole"],
    medicinalUse: medicinalUsesArray[4],
    requiresPrescription: false,
  },
  {
    name: "Salbutamol",
    price: 8.99,
    description: "Bronchodilator for asthma",
    quantity: 90,
    sales: 120,
    activeIngredients: ["Salbutamol"],
    medicinalUse: medicinalUsesArray[5],
    requiresPrescription: false,
  },
  {
    name: "Diazepam",
    price: 7.99,
    description: "Anxiolytic and sedative",
    quantity: 70,
    sales: 80,
    activeIngredients: ["Diazepam"],
    medicinalUse: medicinalUsesArray[6],
    requiresPrescription: true,
  },
  {
    name: "Simvastatin",
    price: 9.99,
    description: "Lipid-lowering medication",
    quantity: 100,
    sales: 200,
    activeIngredients: ["Simvastatin"],
    medicinalUse: medicinalUsesArray[7],
    requiresPrescription: true,
  },
  {
    name: "Metformin",
    price: 3.99,
    description: "Antidiabetic medication",
    quantity: 120,
    sales: 250,
    activeIngredients: ["Metformin"],
    medicinalUse: medicinalUsesArray[8],
    requiresPrescription: true,
  },
  {
    name: "Amoxicillin",
    price: 4.49,
    description: "Antibiotic",
    quantity: 150,
    sales: 300,
    activeIngredients: ["Amoxicillin"],
    medicinalUse: medicinalUsesArray[9],
    requiresPrescription: false,
  },
  {
    name: "Ranitidine",
    price: 3.49,
    description: "Histamine-2 blocker for acid reflux",
    quantity: 80,
    sales: 120,
    activeIngredients: ["Ranitidine"],
    medicinalUse: medicinalUsesArray[0],
    requiresPrescription: true,
  },
  {
    name: "Ciprofloxacin",
    price: 6.99,
    description: "Antibiotic",
    quantity: 90,
    sales: 150,
    activeIngredients: ["Ciprofloxacin"],
    medicinalUse: medicinalUsesArray[1],
    requiresPrescription: false,
  },
  {
    name: "Fluoxetine",
    price: 5.99,
    description: "Antidepressant",
    quantity: 100,
    sales: 180,
    activeIngredients: ["Fluoxetine"],
    medicinalUse: medicinalUsesArray[2],
    requiresPrescription: true,
  },
  {
    name: "Levothyroxine",
    price: 8.49,
    description: "Thyroid hormone replacement",
    quantity: 120,
    sales: 200,
    activeIngredients: ["Levothyroxine"],
    medicinalUse: medicinalUsesArray[3],
    requiresPrescription: true,
  },
  {
    name: "Warfarin",
    price: 7.49,
    description: "Anticoagulant",
    quantity: 100,
    sales: 150,
    activeIngredients: ["Warfarin"],
    medicinalUse: medicinalUsesArray[4],
    requiresPrescription: true,
  },
];

module.exports = dummyData;
