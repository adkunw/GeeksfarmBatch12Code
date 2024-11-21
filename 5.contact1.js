const readline = require("readline"); // Import modul 'readline' untuk membaca input dari pengguna
const validator = require("validator"); // Import modul 'validator' untuk validasi
const fs = require("fs"); // Import modul 'fs' untuk operasi file

// Membuat antarmuka readline untuk membaca input dari stdin dan menulis output ke stdout
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Menanyakan nama kepada pengguna
rl.question("Your name: ", (name) => {
  // Menanyakan nomor telepon setelah nama diberikan
  rl.question("Your mobile: ", (mobile) => {
    // Menanyakan email setelah nomor telepon diberikan
    rl.question("Your email: ", (email) => {
      // Validasi nomor telepon dan email
      const isMobileValid = validator.isMobilePhone(mobile, "id-ID");
      const isEmailValid = validator.isEmail(email);

      // Menampilkan semua informasi yang diberikan oleh pengguna
      console.log(`Name : ${name}`);
      console.log(
        `Mobile : ${mobile} (${isMobileValid ? "Valid" : "Invalid"})`
      );
      console.log(`Email : ${email} (${isEmailValid ? "Valid" : "Invalid"})`);

      const contact = {
        name,
        mobile,
        email,
      };

      const contacts = JSON.parse(
        fs.readFileSync("data/contacts.json", "utf-8")
      );

      contacts.push(contact);

      fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

      // Menutup antarmuka readline
      rl.close();
    });
  });
});
