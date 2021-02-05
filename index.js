const { name } = require('ejs');
const express = require('express');
const path = require('path');
const port = 8000;

const dp = require('./config/mongoose');
const Contact = require('./models/contact');


const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));//here __dirname is 'Users/ayan_s27/Desktop/nodews/contact_list'
app.use(express.urlencoded());// middleware
app.use(express.static('assets'));// access static files through middleware

// var contactList = [
//     {
//         name: "Ayan Sarkar",
//         phone: "7003498110"
//     },
//     {
//         name: "Tony Stark",
//         phone: "1234567890"
//     },
//     {
//         name: "Hulk",
//         phone: "2345678901"
//     },
//     {
//         name: "Thor Odinson",
//         phone: "3456789012"
//     }
// ];

app.get('/', function(req, res){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home', {
            title: "Contacts List",
            contact_list: contacts
        });
    }).sort({name: 1}); //  fetch all contacts and sort them by name field 

    // return res.render('home', {
    //     title: "Contacts List",
    //     contact_list: contactList
    // });
});

app.post('/create-contact', function(req, res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // contactList.push(req.body);
    Contact.create(req.body ,function(err, newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }
        console.log('********',newContact);
        return res.redirect('back');
    });
    // return res.redirect('/');
});
/*
app.get('/delete-contact',function(req, res){
    // console.log(req.query);
    let phone = req.query.phone;
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // console.log(contactIndex);
    if(contactIndex != -1){
        contactList.splice(contactIndex, 1);
    }
    return res.redirect('back');
});
*/

app.get('/delete-contact', function(req, res){
    // get the id from query in the url
    let id = req.query.id;

    // find the contact in the database using id and delete
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
});

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
        return;
    }
    console.log('Yup! My Express Server is running on Port:',port);
});