const Itinerary = require('../models/itinerary');
const Activity = require('../models/activity');
const { renderItineraryDate, renderActivityDate } = require('./methods');


const tokyoTrip = {
    name: 'Tokyo Trip',
    start_date: '2020-02-06T17:00:00.000Z',
    end_date: '2020-02-08T17:00:00.000Z',
    location: { name: 'Tokyo', lat: 35.6803997, lng: 139.7690174 }
}

const tokyoDay1 = [
    {
      formatted_address: '4 Chome-2-8 Shibakoen, Minato City, Tokyo 105-0011, Japan',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
      id: '0f193d8a0df922a2bcb369673944240a8cb182c3',
      name: 'Tokyo Tower',
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJCewJkL2LGGAR3Qmk0vCTGkg',
      plus_code: [Object],
      rating: 4.4,
      reference: 'ChIJCewJkL2LGGAR3Qmk0vCTGkg',
      types: [Array],
      user_ratings_total: 46067,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipN4qJvpdR43v2J4bt4UZsZUKVYen7CL-3XqI5kE=s1600-w400',
      lat: 35.6585805,
      lng: 139.7454329,
      order: 0,
      distance: 0
    },
    {
      formatted_address: '2-1-1, Nihonbashimuromachi, Chuo City, Tokyo 103-8328, Japan',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
      id: '764fb81c741372d98e4d082172e566f3a559447d',
      name: 'Tapas Molecular Bar',
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJ9fcZgFWJGGARba-URZY-YKw',
      plus_code: [Object],
      price_level: 4,
      rating: 4.7,
      reference: 'ChIJ9fcZgFWJGGARba-URZY-YKw',
      types: [Array],
      user_ratings_total: 198,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipM0KxULv-0G-HgCGrzS2JT5XcVfxGEuJjP9mxzM=s1600-w400',
      lat: 35.687147,
      lng: 139.772867,
      order: 1,
      distance: 4.028573068969532
    },
    {
      formatted_address: '1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-0045, Japan',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png',
      id: 'cc2df8af2ac2be3fdd7d1e14d537565a53c720c9',
      name: 'Tokyo Skytree',
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJ35ov0dCOGGARKvdDH7NPHX0',
      plus_code: [Object],
      rating: 4.4,
      reference: 'ChIJ35ov0dCOGGARKvdDH7NPHX0',
      types: [Array],
      user_ratings_total: 52758,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipPqrcHhrpfNfpI_ETG0F55pfa27Zxz-vpFLY4Gc=s1600-w400',
      lat: 35.7100627,
      lng: 139.8107004,
      order: 2,
      distance: 8.216603655417941
    }
]

const tokyoDay2 = [
    {
      formatted_address: 'Japan, 〒106-0031 Tokyo, Minato City, Nishiazabu, 4 Chome−2−15 水野ビル',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
      id: '402551cc72ff25a5b63242654ca9ae04046da419',
      name: 'Ise Sueyoshi',
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJ1aKIaXCLGGARkyTMVC2TFi8',
      plus_code: [Object],
      rating: 4.7,
      reference: 'ChIJ1aKIaXCLGGARkyTMVC2TFi8',
      types: [Array],
      user_ratings_total: 108,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipNmn_rqaXoOJAif7g7KbclvAhY4z1No-iaqN90k=s1600-w400',
      lat: 35.658667,
      lng: 139.723493,
      order: 0
    },
    {
      formatted_address: '13-9 Uenokoen, Taito City, Tokyo 110-8712, Japan',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png',
      id: '051204c621a4c96b254431dd5cd20499d13673a0',
      name: 'Tokyo National Museum',
      photos: [Array],
      place_id: 'ChIJEX3XFIOOGGAR3XdJvRjWLyM',
      plus_code: [Object],
      rating: 4.4,
      reference: 'ChIJEX3XFIOOGGAR3XdJvRjWLyM',
      types: [Array],
      user_ratings_total: 16217,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipNv5ZXjBxzwFnw-XeRk7LlCb_g55JhzgUTu4Dfk=s1600-w400',
      lat: 35.7188351,
      lng: 139.7765215,
      order: 1
    },
    {
      formatted_address: '2 Chome-3-1 Asakusa, Taito City, Tokyo 111-0032, Japan',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/worship_general-71.png',
      id: '13f89e965ca645a87d6fe919fc1af8b0239ad36f',
      name: 'Sensō-ji',
      photos: [Array],
      place_id: 'ChIJ8T1GpMGOGGARDYGSgpooDWw',
      plus_code: [Object],
      rating: 4.5,
      reference: 'ChIJ8T1GpMGOGGARDYGSgpooDWw',
      types: [Array],
      user_ratings_total: 46368,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipNfXZqvV0v7mpUcFow5yOpMd_i_ge2aHqDtRYRg=s1600-w400',
      lat: 35.7147651,
      lng: 139.7966553,
      order: 2
    },
    {
      formatted_address: '4 Chome-4-13 Shibakoen, Minato City, Tokyo 105-0011, Japan',
      geometry: [Object],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
      id: '54a4504eb0ec7ab70a6e4ce165ac0560dc9493b2',
      name: 'Tokyo Shiba Toufuya Ukai',
      opening_hours: [Object],
      photos: [Array],
      place_id: 'ChIJE1F2oPGGHWAR_3n1CDYg3Hs',
      plus_code: [Object],
      price_level: 3,
      rating: 4.5,
      reference: 'ChIJE1F2oPGGHWAR_3n1CDYg3Hs',
      types: [Array],
      user_ratings_total: 1882,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipPA36wObRq5s5jUGBCRkkKAuoAYjNVYF4dpYkE8=s1600-w400',
      lat: 35.6576013,
      lng: 139.7451248,
      order: 3
    }
]

module.exports = async(explanadeTeam) => {
    const tokyoItinerary = await Itinerary.create({ 
        name: tokyoTrip.name, 
        location: tokyoTrip.location, 
        date: renderItineraryDate(tokyoTrip.start_date, tokyoTrip.end_date), 
        user_id: explanadeTeam._id 
    })

    const tokyoActivityDay1 = await Activity.create({
        itineraryId: tokyoItinerary._id,
        orderIndex: 0,
        places: tokyoDay1,
        date: renderActivityDate(tokyoItinerary.date.start, 0)
    })

    const tokyoActivityDay2 = await Activity.create({
        itineraryId: tokyoItinerary._id,
        orderIndex: 1,
        places: tokyoDay2,
        date: renderActivityDate(tokyoItinerary.date.start, 1)
    })

    await Itinerary.findOneAndUpdate({ _id: tokyoItinerary._id }, {
        activities: [tokyoActivityDay1._id, tokyoActivityDay2._id]
    },{ returnOriginal: false })
}
