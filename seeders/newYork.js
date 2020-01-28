const Itinerary = require('../models/itinerary');
const Activity = require('../models/activity');
const { renderItineraryDate, renderActivityDate } = require('./methods');

const newYorkTrip = {
    name: 'New York',
    start_date: '2020-02-02T17:00:00.000Z',
    end_date: '2020-02-05T17:00:00.000Z',
    location: { name: 'New York', lat: 40.7127753, lng: -74.0059728 }
}

const newYorkDay1 = [
    {
      formatted_address: 'New York, NY 10004, United States',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png',
      id: '5a0d7e67078e35af0c456a277df9ffba7c1e4da6',
      name: 'Statue of Liberty National Monument',
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJPTacEpBQwokRKwIlDXelxkA',
      plus_code: [Object],
      rating: 4.7,
      reference: 'ChIJPTacEpBQwokRKwIlDXelxkA',
      types: [Array],
      user_ratings_total: 68006,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipMzPmz43G2kBheqgZqBVhFM6zXW2fsR6Y6Yfrl0=s1600-w400',
      lat: 40.6892494,
      lng: -74.04450039999999,
      order: 0,
      distance: 0
    },
    {
      formatted_address: '3 Greenwich Ave, New York, NY 10014, United States',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
      id: '12159724d59596d336db430d82c7633ab7efe026',
      name: 'Olio e Piú',
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJ_RUJvZZZwokRNUEv3K4nSik',
      plus_code: [Object],
      price_level: 2,
      rating: 4.5,
      reference: 'ChIJ_RUJvZZZwokRNUEv3K4nSik',
      types: [Array],
      user_ratings_total: 2090,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipPEHIf_TqH-ARad9FqelBpWk9TJjs_ssHbX-Gb_=s1600-w400',
      lat: 40.7338794,
      lng: -73.99994079999999,
      order: 1,
      distance: 6.223314439389848
    },
    {
      formatted_address: '20 W 34th St, New York, NY 10001, United States',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png',
      id: 'bc232d2422e7068b2a2ffb314f02e3733dd47796',
      name: 'Empire State Building',
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJaXQRs6lZwokRY6EFpJnhNNE',
      plus_code: [Object],
      rating: 4.7,
      reference: 'ChIJaXQRs6lZwokRY6EFpJnhNNE',
      types: [Array],
      user_ratings_total: 72200,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipP6DUOn5UGrHCK2HtNrTcIS18LAbjKPC2kWEyi5=s1600-w400',
      lat: 40.7484405,
      lng: -73.98566439999999,
      order: 2,
      distance: 8.240129448896756
    },
    {
      formatted_address: '9 W 53rd St, New York, NY 10019, United States',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
      id: '804d4d52a0fb7770d8acfe511699538ec5f0958d',
      name: 'The Modern',
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJMW-gxPtYwokRzDlnsRgq9rA',
      plus_code: [Object],
      price_level: 4,
      rating: 4.6,
      reference: 'ChIJMW-gxPtYwokRzDlnsRgq9rA',
      types: [Array],
      user_ratings_total: 1345,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipMbkMv2O8AHsNcLmHKX3E0TnVKb-sfZnGzyIN6M=s1600-w400',
      lat: 40.761081,
      lng: -73.976753,
      order: 3,
      distance: 9.81735411531666
    }
]

const newYorkDay2 = [
    {
      formatted_address: '196 Spring St, New York, NY 10012, United States',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
      id: '7cd1655ddfab661a0fbaac2338c8bb8bfdfdeb6f',
      name: 'Piccola Cucina Osteria Siciliana',
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJowhlWYxZwokRgrvA8f_x8Es',
      plus_code: [Object],
      price_level: 2,
      rating: 4.6,
      reference: 'ChIJowhlWYxZwokRgrvA8f_x8Es',
      types: [Array],
      user_ratings_total: 968,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipOY5Fk42cxbFC4mNP-wQvz6C6WQ7WHFR_S0pd2t=s1600-w400',
      lat: 40.7249914,
      lng: -74.0032516,
      order: 0,
      distance: 0
    },
    {
      formatted_address: 'Brooklyn Bridge, New York, NY 10038, United States',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png',
      id: 'c1ac50eff9bb8e9505c59c69c4523ae94c4126fc',
      name: 'Brooklyn Bridge',
      photos: [Array],
      place_id: 'ChIJK3vOQyNawokRXEa9errdJiU',
      plus_code: [Object],
      rating: 4.8,
      reference: 'ChIJK3vOQyNawokRXEa9errdJiU',
      types: [Array],
      user_ratings_total: 44832,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipMDcl1fnBbHFMeYvX0f4Sz1qSm_GUtBbCGQpJ0O=s1600-w400',
      lat: 40.7060855,
      lng: -73.9968643,
      order: 1,
      distance: 2.169967236829736
    },
    {
      formatted_address: 'New York, NY 10018, United States',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png',
      id: 'f450a4290a3af961748f0eb93931479d2898e990',
      name: 'Bryant Park',
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJvbGg56pZwokRp_E3JbivnLQ',
      plus_code: [Object],
      rating: 4.7,
      reference: 'ChIJvbGg56pZwokRp_E3JbivnLQ',
      types: [Array],
      user_ratings_total: 54793,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipNn8JkEgR5hHb_t-UhlrCgvZEbLh3uPi1u-SQht=s1600-w400',
      lat: 40.7535965,
      lng: -73.9832326,
      order: 2,
      distance: 3.6000775137535532
    },
    {
      formatted_address: '1000 5th Ave, New York, NY 10028, United States',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png',
      id: 'f732f202150af1f14ae8a057a1014ceea6b33fc4',
      name: 'The Metropolitan Museum of Art',
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJb8Jg9pZYwokR-qHGtvSkLzs',
      plus_code: [Object],
      price_level: 3,
      rating: 4.8,
      reference: 'ChIJb8Jg9pZYwokR-qHGtvSkLzs',
      types: [Array],
      user_ratings_total: 56546,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipPdArVOJYXKMIAB2CewjMEKCcDthNzHGYmXEM-1=s1600-w400',
      lat: 40.7794366,
      lng: -73.963244,
      order: 3,
      distance: 6.928471279727709
    }
]

const newYorkDay3 = [
    {
      formatted_address: 'Manhattan, NY 10036, United States',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png',
      id: '94ff3b04e99737f67454c5f9d206c8241a4eec44',
      name: 'Times Square',
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJmQJIxlVYwokRLgeuocVOGVU',
      plus_code: [Object],
      rating: 4.7,
      reference: 'ChIJmQJIxlVYwokRLgeuocVOGVU',
      types: [Array],
      user_ratings_total: 142689,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipMqssri2eDlKyFg1NqGVVsQqPjVB_wi3-Ov21hC=s1600-w400',
      lat: 40.7579747,
      lng: -73.9855426,
      order: 0,
      distance: 0
    },
    {
      formatted_address: '5th Ave, New York, NY 10022, United States',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/worship_general-71.png',
      id: 'acf24f96362bdabb64807f6c17cba8bb1d5b738a',
      name: "St. Patrick's Cathedral",
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJUW4vEPxYwokRW6o24DU0YIg',
      plus_code: [Object],
      rating: 4.8,
      reference: 'ChIJUW4vEPxYwokRW6o24DU0YIg',
      types: [Array],
      user_ratings_total: 24959,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipP13KEdX-o6VLr7xyxL6wnRvgZj4QSaDqxMVnfA=s1600-w400',
      lat: 40.7584653,
      lng: -73.97599269999999,
      order: 1,
      distance: 0.8061681076392404
    },
    {
      formatted_address: '227 Malcolm X Blvd, New York, NY 10027, United States',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
      id: '709a4eccc64a1dae45ce2a0d4a00521feee3510c',
      name: 'Sottocasa Pizzeria Harlem',
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJM1oV8w32wokR9gt0ynHqypM',
      plus_code: [Object],
      price_level: 2,
      rating: 4.8,
      reference: 'ChIJM1oV8w32wokR9gt0ynHqypM',
      types: [Array],
      user_ratings_total: 775,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipMgjLO1hMYv0JZseegphzsBS3xRmSXxN0O_6ReN=s1600-w400',
      lat: 40.8055464,
      lng: -73.9474615,
      order: 2,
      distance: 6.185310228293636
    },
    {
      formatted_address: 'Water St &, State St, New York, NY 10004, United States',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png',
      id: '2fad60c4a269d0c16dd2836b031c4c5161628550',
      name: 'SeaGlass Carousel',
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJryEQYRJawokR_bfRRa_lPqs',
      plus_code: [Object],
      rating: 4.5,
      reference: 'ChIJryEQYRJawokR_bfRRa_lPqs',
      types: [Array],
      user_ratings_total: 509,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipPxE-YrHRueLudatd9k6ZilzRhdd6PUsaTbtN0u=s1600-w400',
      lat: 40.70218089999999,
      lng: -74.01499749999999,
      order: 3,
      distance: 6.681708134534836
    }
]

module.exports = async(users) => {
    const { explanadeTeam, angela, afifah, dzaky, alfred, andreas } = users;

    const newYorkItinerary = await Itinerary.create({ 
        name: newYorkTrip.name, 
        location: newYorkTrip.location, 
        date: renderItineraryDate(newYorkTrip.start_date, newYorkTrip.end_date), 
        user_id: explanadeTeam._id 
    })

    const nyActivityDay1 = await Activity.create({
        itineraryId: newYorkItinerary._id,
        orderIndex: 0,
        places: newYorkDay1,
        date: renderActivityDate(newYorkItinerary.date.start, 0)
    })

    const nyActivityDay2 = await Activity.create({
        itineraryId: newYorkItinerary._id,
        orderIndex: 1,
        places: newYorkDay2,
        date: renderActivityDate(newYorkItinerary.date.start, 1)
    })

    const nyActivityDay3 = await Activity.create({
        itineraryId: newYorkItinerary._id,
        orderIndex: 2,
        places: newYorkDay3,
        date: renderActivityDate(newYorkItinerary.date.start, 2)
    })

    await Itinerary.findOneAndUpdate({ _id: newYorkItinerary._id }, {
        activities: [nyActivityDay1._id, nyActivityDay2._id, nyActivityDay3._id]
    },{ returnOriginal: false })
}
