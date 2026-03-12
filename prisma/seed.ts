import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
console.log("Creating school...");

const school = await prisma.school.upsert({
  where: { id: "a833c50d-8faf-4706-8469-14d1920b3022" },
  update: {},
  create: {
    id: "a833c50d-8faf-4706-8469-14d1920b3022",
    name: "ZPHS Government School",
    district: "Anantapur",
    location: "Andhra Pradesh"
  }
});

const classes = [
  "LKG","UKG","1st","2nd","3rd","4th",
  "5th","6th","7th","8th","9th","10th"
];

async function main() {

  console.log("Clearing old student data...");

  await prisma.attendance.deleteMany();
  await prisma.student.deleteMany();

  const names = [
"Aarav Reddy","Aditi Rao","Advait Hegde","Ahana Iyer","Akash Nair","Ananya Murthy","Arjun Balaji","Avni Kulkarni","Ayaan Cherian","Bhavna Reddy",
"Chaitanya Rao","Diya Venkatesh","Dhruv Teja","Esha Deol","Eshaan Murthy","Gauri Shinde","Gaurav Reddy","Hridhaan Roy","Ishani Ghosh","Ishaan Misra",
"Jiya Saran","Kabir Mehra","Kavya Hegde","Krishna Murthy","Kyra Dutt","Lakshya Jain","Myra Singh","Madhav Sethi","Navya Bhatia","Nihal Singh",
"Nitara Goel","Omkar Das","Pihu Varshney","Parth Jindal","Prisha Patel","Raghav Gupta","Riya Sharma","Reyansh Kohli","Saanvi Rao","Samar Khanna",
"Sara Ahmed","Shaurya Mittal","Siya Thakur","Tanmay Bose","Tara Deshmukh","Utkarsh Ambudkar","Vanya Gupta","Vihaan Reddy","Vedika Kumar","Yashvi Singh",
"Zara Sheikh","Aarush Pandey","Anvi Chaudhary","Advik Bansal","Amaira Gill","Aryan Khan","Avni Modi","Ayushmann Khurrana","Barkha Dutt","Bhavya Singh",
"Chirag Paswan","Damini Bose","Daksh Rawat","Dhriti Sahni","Eklavya Dwivedi","Falak Naaz","Gagan Narang","Gunjan Saxena","Hardik Pandya","Himani Shivpuri",
"Ishan Kishan","Ipsita Pati","Jitesh Sharma","Juhi Chawla","Kanishk Seth","Kyra Shroff","Lokesh Rahul","Lipi Goyal","Manav Kaul","Mehak Chahal",
"Nakul Dev","Nimrat Kaur","Ojas Rawal","Palak Tiwari","Prithvi Shaw","Qasim Ali","Rachit Gupta","Riya Sisodia","Shaan Kumar","Trisha Krishnan",

"Diya Menon","Devansh Gowda","Eshani Pillai","Ekansh Bhat","Fatima Ibrahim","Farhan Aziz","Gauri Shankar","Gautam Krishna","Hazel Kuruvilla","Hrithik Rajan",
"Ishaan Prabhu","Inaya Khan","Jatin Sarna","Jhanvi Prasad","Kabir Das","Kriti Sanon","Kartik Aaryan","Kiara Jain","Laksh Lalwani","Leisha Sharma",
"Madhavan R.","Mahira Sharma","Nakul Sahdev","Navya Naveli","Om Puri","Pari Sharma","Pratik Gandhi","Prisha Singh","Raghav Chadha","Riya Sen",
"Sahil Khan","Sara Khan","Shaurya Singh","Shreya Jain","Siddharth Roy","Siya Kakkar","Tanmay Singh","Tara Singh","Utkarsh Gupta","Vanya Mishra",
"Vihaan Samat","Vedika Pinto","Yashasvi Jaiswal","Zara Khan","Abhay Deol","Aisha Chaudhary","Aman Gupta","Amrita Rao","Anant Ambani","Anjali Arora",
"Anshuman Jha","Arshi Khan","Avinash Tiwary","Barkha Singh","Bhuvan Bam","Chhavi Mittal","Daksh Gupta","Daljeet Kaur","Danish Sait","Deepa Malik",
"Dhairya Karwa","Dhvani Bhanushali","Divyendu Sharma","Elnaaz Norouzi","Emraan Hashmi","Gauahar Khan","Girish Kumar","Guru Randhawa","Harshvardhan Kapoor","Huma Qureshi",
"Ibrahim Ali Khan","Ileana D'Cruz","Ishaan Tharoor","Isha Talwar","Jaideep Ahlawat","Jannat Zubair","Jim Sarbh","Juhi Babbar","Karan Johar","Karishma Tanna",

"Kartik Tyagi","Kriti Kharbanda","Kusha Kapila","Kunal Kapoor","Lara Dutta","Milind Soman","Mithila Palkar","Mohit Raina","Nora Fatehi","Nawazuddin Siddiqui",
"Krrish Naidu","Kavya Shetty","Kunal Kulkarni","Kiara Sastry","Lakshya Mani","Lavanya Varma","Madhav Jha","Myra D’Souza","Manan Vohra","Meera Nair",
"Nakul Mehta","Navya Nanda","Nihal Sarin","Nitara Kumar","Omkar Gowda","Ojaswi Arora","Parth Samthaan","Pihu Sand","Pranav Mohan","Prisha Gupta",
"Raghav Juyal","Raisa Wilson","Ranbir Kapoor","Rashmika Mandanna","Reyansh Suri","Ridhima Pandit","Rishi Kapoor","Ritika Sajdeh","Rohan Joshi","Ruhani Sharma",
"Samar Singh","Sanaya Irani","Sarthak Kher","Sejal Kumar","Shivam Dube","Shruti Haasan","Siddhant Chaturvedi","Simran Kaur","Sohan Roy","Sonali Bendre",
"Sourabh Raaj","Srishti Jain","Sumit Antil","Sunaina Gulia","Swati Maliwal","Tanuj Virwani","Tejaswi Prakash","Uday Chopra","Urvashi Rautela","Varun Sood",
"Vidya Balan","Vijay Varma","Vini Raman","Vivaan Shah","Yami Gautam","Yash Dayal","Zaheer Khan","Zareen Khan",

"Aadi Sai Kumar","Aanchal Munjal","Abhinav Shukla","Aditi Rao Hydari","Aditya Roy Kapur","Alia Bhatt","Alok Nath","Ameesha Patel","Amit Trivedi","Amruta Khanvilkar",
"Angad Hasija","Ananya Panday","Anil Kapoor","Anupam Kher","Arjun Kapoor","Aruna Irani","Ayush Mehra","Bhumi Pednekar","Carry Minati","Deepika Padukone",
"Diljit Dosanjh","Disha Patani","Dulquer Salmaan","Farhan Akhtar","Genelia Deshmukh","Hrithik Roshan","Ishaan Khatter","Janhvi Kapoor","Kareena Kapoor","Kiara Advani",
"Pankaj Tripathi","Rajkummar Rao","Riya Nambiar","Ranbir Hegde","Riddhima Goud","Rishabh Rao","Ruhi Reddy","Rohan Prabhu","Saanvi Patel","Samar Pratap",
"Sara George","Sahil Kannan","Sakshi Goud","Sameer Bhat","Sana Reddy","Sarthak Rao","Seema Hegde","Shaan Shahid","Shalini Pandey","Shlok Sharma",
"Shreya Ghoshal","Siddharth Nigam","Sneha Ullal","Sohum Shah","Sonakshi Sinha","Sourav Ganguly","Srishti Rode","Sumit Vyas","Sunidhi Chauhan","Suraj Pancholi",
"Swara Bhasker","Tanmay Bhat","Tara Sutaria","Tushar Kapoor","Uditi Singh","Utkarsh Sharma","Vaani Kapoor","Varun Dhawan","Vedhika Kumar","Vihaan Samat",
"Vinay Pathak","Viraaj Kapoor","Vishal Dadlani","Vriti Khanna","Yash Dasgupta","Yuvika Chaudhary","Zoya Akhtar",

// your 45 new names
"Akshith Reddy","Bharath Goud","Chaitanya Krishna","Dhanush Varma","Eshwar Prasad",
"Ganesh Naidu","Hemanth Rao","Karthik Aryan","Kalyan Ram","Lokesh Babu",
"Manikantha S.","Nikhil Teja","Pavan Kalyan","Praneeth Reddy","Rajashekar Rao",
"Sai Charan","Sandeep Goud","Tarun Kumar","Uday Kiran","Vamsi Krishna",
"Vishnu Vardhan","Yashwanth Reddy","Ananya Chowdary","Bhavyasri K.","Chandini Rao",
"Deepthi Naidu","Harini Sharma","Himabindu S.","Indu Priyadarshini","Jyothika Reddy",
"Keerthana G.","Lahari Goud","Madhavi Latha","Navya Sri","Pallavi Varma",
"Pranathi Murthy","Ramya Krishna","Shravani P.","Siri Chowdary","Tejaswini S.",
"Vaishnavi Reddy","Vennela Rao","Yamini Naidu","Yogitha K.","Zoya Fatima"


  ];

  console.log("Total names:", names.length);

  const students:any[] = [];

  for (let i = 0; i < names.length; i++) {

  const id = `STU${String(i+1).padStart(3,"0")}`;

  const classIndex = Math.floor(i / (names.length / classes.length));

  students.push({
    id,
    name: names[i],
    class: classes[classIndex],
    parentContact:`987654${String(i+1).padStart(4,"0")}`,
    schoolId: school.id
  });

}

  await prisma.student.createMany({ data: students });

  console.log("360 students inserted successfully");



  // ==============================
  // CONTRACTOR DATA
  // ==============================

  console.log("Adding contractor data...");

  const contractors = [

{
contractorId:"CON101",
name:"Sri Sai Catering Services",
kitchenLocation:"Hyderabad",
contactPerson:"Mr Raghav",
phone:"9876543210",
email:"srisai@gmail.com",
address:"Madhapur Hyderabad",
deliveryPercent:98,
complaintsCount:1,
feedbackRating:4.8
},

{
contractorId:"CON102",
name:"Annapurna Food Suppliers",
kitchenLocation:"Vijayawada",
contactPerson:"Mr Suresh",
phone:"9876543211",
email:"annapurna@gmail.com",
address:"Benz Circle Vijayawada",
deliveryPercent:94,
complaintsCount:2,
feedbackRating:4.5
},

{
contractorId:"CON103",
name:"FreshMeal Catering",
kitchenLocation:"Visakhapatnam",
contactPerson:"Mr Kumar",
phone:"9876543212",
email:"freshmeal@gmail.com",
address:"MVP Colony Vizag",
deliveryPercent:92,
complaintsCount:3,
feedbackRating:4.2
},

{
contractorId:"CON104",
name:"Healthy Bites Services",
kitchenLocation:"Tirupati",
contactPerson:"Mr Reddy",
phone:"9876543213",
email:"healthybites@gmail.com",
address:"Renigunta Road Tirupati",
deliveryPercent:96,
complaintsCount:0,
feedbackRating:4.7
}

];

for(const c of contractors){

const contractor = await prisma.contractor.create({

data:{

contractorId:c.contractorId,
name:c.name,

startDate:new Date("2025-04-01"),
endDate:new Date("2026-03-31"),

mealsProvided:"Breakfast Lunch Snacks Dinner",
kitchenLocation:c.kitchenLocation,

totalStudents:520,
hygieneRating:"A Grade",

contactPerson:c.contactPerson,
phone:c.phone,
email:c.email,
address:c.address,

deliveryPercent:c.deliveryPercent,
complaintsCount:c.complaintsCount,
feedbackRating:c.feedbackRating

}

});


await prisma.delivery.createMany({

data:[

{
date:new Date(),
breakfast:true,
lunch:true,
snacks:true,
dinner:true,
status:"On Time",
contractorId:contractor.id
},

{
date:new Date(),
breakfast:true,
lunch:true,
snacks:false,
dinner:true,
status:"Delayed",
contractorId:contractor.id
}

]

});


await prisma.complaint.create({

data:{
issue:"Late lunch delivery",
status:"Resolved",
date:new Date(),
contractorId:contractor.id
}

});


await prisma.inspection.create({

data:{
date:new Date(),
officer:"Food Safety Officer",
grade:"A",
remarks:"Kitchen clean and hygienic",
contractorId:contractor.id
}

});


await prisma.schoolCoverage.createMany({

data:[

{
schoolId:"SCH101",
schoolName:"ZPHS School",
students:200,
contractorId:contractor.id
},

{
schoolId:"SCH102",
schoolName:"MPPS School",
students:320,
contractorId:contractor.id
}

]

});

}

console.log("Contractor data inserted successfully");

}

main().finally(()=>prisma.$disconnect());