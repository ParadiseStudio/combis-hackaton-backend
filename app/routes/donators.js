const express = require('express');
const router = express.Router();
const Donation = require('./../models/donation/model')
const Donator = require('./../models/donator')
const HttpStatus = require('http-status-codes');


router.post('/new', function (req, res, next) {
    // example object
    //     { email: 'hello@hello.hello',
    //     password: 'čingdingming',
    //     firstName: 'Marko',
    //     lastName: 'Marković',
    //     sex: "M",
    //     dateOfBirth: new Date(),
    //     phoneNumber: '+385975436987',
    //     bloodType: "0-",
    //     employerEmail: 'hello@somecompany.com'
    // }
    // {
    //     "_id": ObjectID(),
    //     "email": "marina.maric@maricco.com",
    //     "password": "cingdingming",
    //     "firstName": "Marina",
    //     "lastName": "Maric",
    //     "sex": "M",
    //     "dateOfBirth": ISODate("1990-05-23T21:58:20.895Z"),
    //     "phoneNumber": "+38597578987",
    //     "bloodType": "0-",
    //     "donations": [],
    //     "employerEmail": "bolovanje@combis.com",
    //     "createdAt": ISODate("2018-06-23T21:58:20.919Z"),
    //     "updatedAt": ISODate("2018-05-23T21:58:20.919Z"),
    //     "__v": 0
    // }

    newDonator = new Donator(req.body);

    newDonator.save();

    res.json({ greeting: "holas" });
});


router.get('/all', function (req, res, next) {

    Donator.find({}, function (err, donators) {
        res.send(donators.reduce(function (donatorMap, item) {
            donatorMap[item.id] = item;
            return donatorMap;
        }, {}));
    });
})

router.get('/id/:id', function (req, res, next) {
    id = req.params.id
    donator = Donator.findById(id, (err, donator) => {
        if (err) {
            return res.status(HttpStatus.NOT_FOUND).json({ success: false, err: "User not found or an incorrect ID was provided" });
        }

        return res.json({ donator: donator.toJSON() });
    })

})

router.get('/just-donated/:id', function (req, res, next) {
    id = req.params.id
    Donator.findById(id, (err, donator) => {
        if (err) {
            return res.status(HttpStatus.NOT_FOUND).json({ success: false, err: "User not found or an incorrect ID was provided" });
        }
        
         donator.justDonated()
         donator.save()

        return res.json({ donator: donator.toJSON() });
    })

})



// router.get('/makenewmockdonator', function (req, res, next) {
//     // example object
//     // {
//     //     "_id": ObjectID(),
//     //     "email": "marina.maric@maricco.com",
//     //     "password": "cingdingming",
//     //     "firstName": "Marina",
//     //     "lastName": "Maric",
//     //     "sex": "M",
//     //     "dateOfBirth": ISODate("1990-05-23T21:58:20.895Z"),
//     //     "phoneNumber": "+38597578987",
//     //     "bloodType": "0-",
//     //     "donations": [],
//     //     "employerEmail": "bolovanje@combis.com",
//     //     "createdAt": ISODate("2018-06-23T21:58:20.919Z"),
//     //     "updatedAt": ISODate("2018-05-23T21:58:20.919Z"),
//     //     "__v": 0
//     // }
//     let newDonation = new Donation({});
//     newDonation.save(
//         err => {
//             console.log('pandica')
//             if (err) {
//                 return res.status(HttpStatus.IM_A_TEAPOT).json({ err })
//             } 
//         })
//     let donations = [newDonation]
//     newDonator = new Donator({
//         email: 'hangar@telebus.com',
//         password: 'čingdingming',
//         firstName: 'Vlado',
//         lastName: 'Vlajčić',
//         sex: "M",
//         dateOfBirth: new Date(),
//         phoneNumber: '+385978736987',
//         bloodType: "0-",
//         employerEmail: 'godisnji@combis.com',
//         donations: donations
//     }
//     );
//         console.log('hi')
//     newDonator.save((err) => {
//         if (err) {
//             return res.status(HttpStatus.IM_A_TEAPOT).json(err)
//         } else {
//             return res.json({ greeting: "holas" });
//         };
//     });
//     console.log('hi')
// })


module.exports = router
