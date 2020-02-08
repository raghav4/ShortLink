require('dotenv').config();
const { Admin, validate } = require('../models/admin');
const mongoose = require('mongoose');
const readline = require('readline');
const bcrypt = require('bcryptjs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const print_error = '\x1b[31m%s\x1b[0m'; 
const print_success = '\x1b[32m%s\x1b[0m'; 

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
},function(err){
    if(err) throw err;
})

function createUser() {
    rl.question('Please Enter Username : ', (username) => {
        rl.question('Please Enter a Password : ', async(password) => {
            const adminObject = {
                username,
                password
            };
            const { error } = validate(adminObject);
            if (error) {
                rl.close()
                rl.removeAllListeners()
                return console.log(print_error, error.details[0].message);
            }
            let admin = await Admin.findOne({
                username
            });
            if(admin){
                console.log(print_error, 'Username already registered!!, Try with Different Username');
                rl.close(process.exit(0));
            }
            admin = await new Admin({
                username,
                password
            });
            try {
                const salt = await bcrypt.genSalt(10);
                admin.password = await bcrypt.hash(admin.password, salt);
                
                const validPassword = await bcrypt.compare(password, admin.password);
                // if(!validPassword) 
                const result = await admin.save(); 
                console.log(print_success, 'Successfully registered user!!');
                rl.close(process.exit(1)); 
            }
            catch(ex){
                console.log(print_error,ex.message);
            }
        });
    });
}
createUser();
