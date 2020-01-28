const Itinerary = require('../models/itinerary');
const Activity = require('../models/activity');
const { renderItineraryDate, renderActivityDate } = require('./methods');

const parisTrip = {
    name: 'Paris Trip',
    start_date: '2020-02-16T17:00:00.000Z',
    end_date: '2020-02-18T17:00:00.000Z',
    location: { name: 'Paris', lat: 48.85661400000001, lng: 2.3522219 }
}

const parisDay1 = [
    {
      formatted_address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
      id: 'fd0cfb424bbd79bf28a832e1764f1c2aa5927714',
      name: 'Eiffel Tower',
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJLU7jZClu5kcR4PcOOO6p3I0',
      plus_code: [Object],
      rating: 4.6,
      reference: 'ChIJLU7jZClu5kcR4PcOOO6p3I0',
      types: [Array],
      user_ratings_total: 223011,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipNGAHSGvkENOhQyHW3LHCGzDnxGz1066ad6C5nq=s1600-w400',
      lat: 48.85837009999999,
      lng: 2.2944813,
      order: 0,
      distance: 0
    },
    {
      formatted_address: 'Pont Alexandre III, 75008 Paris, France',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png',
      id: '8505d1b3dd31d4ad91cdb15f94c49a9c792e3ff0',
      name: 'Pont Alexandre III',
      photos: [Array],
      place_id: 'ChIJufChV9Bv5kcRT02XBr8yAOs',
      plus_code: [Object],
      rating: 4.7,
      reference: 'ChIJufChV9Bv5kcRT02XBr8yAOs',
      types: [Array],
      user_ratings_total: 19161,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipPmOz5CDJoQaiSuxBxrQ-yJsIgKI5qaAuhrMcIv=s1600-w400',
      lat: 48.8638995,
      lng: 2.313559,
      order: 1,
      distance: 1.5249632229206596
    },
    {
      formatted_address: 'Place Charles de Gaulle, 75008 Paris, France',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png',
      id: 'b4be70a61707e7ea54e7a55c2046b87e48459a01',
      name: 'Arc de Triomphe',
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJjx37cOxv5kcRPWQuEW5ntdk',
      plus_code: [Object],
      rating: 4.7,
      reference: 'ChIJjx37cOxv5kcRPWQuEW5ntdk',
      types: [Array],
      user_ratings_total: 133947,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipPcaaqlW7RUrEPFc57Vzb_DTEsVp-9TZRVjbPYg=s1600-w400',
      lat: 48.8737917,
      lng: 2.2950275,
      order: 2,
      distance: 1.7151865140178384
    },
    {
      formatted_address: 'Park Hyatt Paris Vendôme, 5 Rue de la Paix, 75002 Paris, France',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
      id: 'ed6ad6b7c035a9ba5c39af56afd7f4120eafcfa5',
      name: "Pur' - Jean-François Rouquette",
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJlVvipTFu5kcR6VwB1PiwKv8',
      plus_code: [Object],
      price_level: 4,
      rating: 4.7,
      reference: 'ChIJlVvipTFu5kcR6VwB1PiwKv8',
      types: [Array],
      user_ratings_total: 268,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipMawyH6tzPBv9GFqFfvy7uH7tS_s9ZVUThqx8ch=s1600-w400',
      lat: 48.8689056,
      lng: 2.3301781,
      order: 3,
      distance: 2.861830986234444
    }
]

const parisDay2 = [
    {
      formatted_address: 'Rue de Rivoli, 75001 Paris, France',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png',
      id: '9a007d81ca8f47ed30ddaf39c4174ef773b351e0',
      name: 'Louvre Museum',
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJD3uTd9hx5kcR1IQvGfr8dbk',
      plus_code: [Object],
      rating: 4.7,
      reference: 'ChIJD3uTd9hx5kcR1IQvGfr8dbk',
      types: [Array],
      user_ratings_total: 192598,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipMFPQxKmfMvIxhTzzWX7UK2JmjwtJrZPxpISxHP=s1600-w400',
      lat: 48.8606111,
      lng: 2.337644,
      order: 0,
      distance: 0
    },
    {
      formatted_address: "Place de l'Opéra, 75009 Paris, France",
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png',
      id: 'f08a5b8c915e8e38418697beaa0d6bab9d307114',
      name: 'Palais Garnier',
      photos: [Array],
      place_id: 'ChIJOYNm1DBu5kcRZwdtKBzyq6k',
      plus_code: [Object],
      rating: 4.7,
      reference: 'ChIJOYNm1DBu5kcRZwdtKBzyq6k',
      types: [Array],
      user_ratings_total: 21628,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipPSLYnxvkXNrQdTMRKSu7ZwploxvsH8WCKkSme8=s1600-w400',
      lat: 48.8719697,
      lng: 2.3316014,
      order: 2,
      distance: 1.338058775640503
    },
    {
      formatted_address: 'Place du Panthéon, 75005 Paris, France',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png',
      id: 'f779c21934431fe151ed4f59cc5c50ae1c95e387',
      name: 'Panthéon',
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJc8mX0udx5kcRWKcjTwDr5QA',
      plus_code: [Object],
      rating: 4.6,
      reference: 'ChIJc8mX0udx5kcRWKcjTwDr5QA',
      types: [Array],
      user_ratings_total: 27840,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipM-lncBfWaJ1-dT4ajqtcYS6v5CX8WcmFIbj-pJ=s1600-w400',
      lat: 48.8462218,
      lng: 2.3464138,
      order: 3,
      distance: 1.7237960287697534
    },
    {
      formatted_address: '33 Rue de Longchamp, 75116 Paris, France',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
      id: 'e789a3a20b3429805b49a2537ca0924f5deb3f68',
      name: 'Mayfair Garden Paris',
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJz_qvQu5v5kcR5-AeN9HpyY4',
      plus_code: [Object],
      rating: 4.4,
      reference: 'ChIJz_qvQu5v5kcR5-AeN9HpyY4',
      types: [Array],
      user_ratings_total: 543,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipO3uM4-mc7yyc23oWs1TS4yGNtsgkCyTQ_vqGHx=s1600-w400',
      lat: 48.8648594,
      lng: 2.2896304,
      order: 1,
      distance: 3.5437106835783685
    }
]

module.exports = async(users) => {
  const { explanadeTeam, angela, afifah, dzaky, alfred, andreas } = users;

  const parisItinerary = await Itinerary.create({ 
      name: parisTrip.name, 
      location: parisTrip.location, 
      date: renderItineraryDate(parisTrip.start_date, parisTrip.end_date), 
      user_id: explanadeTeam._id 
  })

  const parisActivityDay1 = await Activity.create({
      itineraryId: parisItinerary._id,
      orderIndex: 0,
      places: parisDay1,
      date: renderActivityDate(parisItinerary.date.start, 0)
  })

  const parisActivityDay2 = await Activity.create({
      itineraryId: parisItinerary._id,
      orderIndex: 1,
      places: parisDay2,
      date: renderActivityDate(parisItinerary.date.start, 1)
  })

  await Itinerary.findOneAndUpdate({ _id: parisItinerary._id }, {
      activities: [parisActivityDay1._id, parisActivityDay2._id]
  },{ returnOriginal: false })
}
