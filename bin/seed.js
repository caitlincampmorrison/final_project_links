const { db, Student, Campus } = require("../server/db/");
const student_name = ['Moe', 'Larry', 'Curly', 'Lucy', 'Ethyl']
const student_lastname = ['Smith', 'Morrison', 'Doe', 'Thompson', 'Pitt']
const campus_name = ['NYU', 'UofA', 'USD', 'USC']
const student_campus = ['NYU', 'USC', 'USD', 'USC', 'NYU']
const grade = Math.round((0.0 + 0.5 + Math.random() * ( 3.0 - 0.0 ))*100)/100
const student_images = "/student.jpg"
const campus_images = "/campus.jpg"
const campus_description =  'test description'

const seed = async () => {
    try {
      await db.sync({ force: true });
      const [Moe, Larry, Curly, Lucy, Ethyl] = await Promise.all(
        student_name.map((first_name, idx) => 
           Student.create({ first_name, last_name: student_lastname[idx], email: 'test@gmail.com', imageUrl: student_images, gpa:  Math.round((0.0 + 0.5 + Math.random() * ( 3.0 - 0.0 ))*100)/100, campus_name: student_campus[idx]}),
        )
      )
      const [NYU, UofA, USD, USC] = await Promise.all(
        campus_name.map((name) => 
          Campus.create({name, address: '1234', imageUrl: campus_images, description: campus_description})
        )
      )
      db.close();
      console.log(`Seeding successful!`);   
    } catch (err) {
      db.close();
      console.log(` Error seeding: ${err.message} ${err.stack}`);
    }
  };
  
  seed();
  //module.exports = seed