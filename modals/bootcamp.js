const mongoose = require("mongoose");
const geocoder=require('../utils/geocoder')
const bootcampShema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add a name'],
        unique: true,
        trim: true,
        maxLength: [50, 'name can not be more than 50  characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'please add a description'],
        maxLength: [500, 'description can not be more than 50  characters']
    },
    website: {
        type: String,
        match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ ,'please use a valid url with http or https '
        ]}

    ,
    phone: { type: String, maxLength: [20, "phone number can not be more than 20 characters"] }

    ,
    email: {
        type: String,
        match: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        ]},
    address: {
        type: String,
        required: [false, "please add an address "]
    },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required:false //warning
    },
    coordinates: {
      type: [Number],
      required: false,
      index:'2dsphere'
    }
  }
    ,
    formattedAddress: String,
    street: String,
    state: String,
    zipCode: String,
    city: String,
    country: String,
    careers: {
        type: [String],
        required: true,
        enum: ['Web development',

            'UI / UX',
            'Data Science',
            'Business',
            "Web Development",
            "UI/UX", "Mobile Development" ,   'other '
        ]

    },
    averageRating: { type: Number, min: [1, "rating must be at least 1"], max: [10, "rating can not be more than 10"] },
    averageCost: Number,
    photo: { type: String, defualt: "no-photo.jpg" },
    housing: { type: Boolean, defualt: false },
    jobAssistance: { type: Boolean, defualt: false },
    jobGuarninee: { type: Boolean, defualt: false },
    acceptGi: { type: Boolean, defualt: false },
    housing: { type: Boolean, defualt: false },
    createdAt: { type: Date, defualt: Date.now }
});
// geocode and create location field
bootcampShema.pre('save',async(next)=>{
  const loc = await geocoder.geocode("45 Upper College Rd Kingston RI 02881");
  this.location={
    type:'Point',
    coordinates: [loc[0].longitude,loc[0].latitude],
    formattedAddress:loc[0].formattedAddress,
    state:loc[0].stateCode,
    zipcode: loc[0].zipcode,
   country : loc[0].countryCode,
    city:loc[0].city,
    street:loc[0].streetName
  }
// do not save address in database

  
  next();
})
// latitude: 48.8698679,
//   longitude: 2.3072976,
//     country: 'France',
//       countryCode: 'FR',
//         city: 'Paris',
//           zipcode: '75008',
//             streetName: 'Champs-Élysées',
//               streetNumber: '29',
//                 administrativeLevels: {
//   level1long: 'Île-de-France',
//     level1short: 'IDF',
//       level2long: 'Paris',
//         level2short: '75'

module.exports = mongoose.model('bootcamp', bootcampShema)