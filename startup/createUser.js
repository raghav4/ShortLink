const { Admin, validate } = require('../models/admin');
const mongoose = require('mongoose');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const print_error = '\x1b[31m%s\x1b[0m'; 
const print_success = '\x1b[32m%s\x1b[0m'; 

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

            let admin = await new Admin({
                username: username,
                password: password
            });
            console.log(admin);
            const result = await admin.save(function(err,res){
                if(err){
                    console.log('err',err);
                    return console.log('err',err);
                }
                else return console.log('res', res);
            }); // save is not working
            console.log(print_success, result);
            rl.close(process.exit(1)); // close the process after done saving
        });
    });
}
createUser();