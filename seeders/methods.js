function renderItineraryDate(start_date, end_date) {
    let start = new Date(start_date)
    let end = new Date(end_date)
    let total_days = (end.getTime() - start.getTime()) / (1000*3600*24)
    let date = {
      start,
      end,
      total_days
    }
    return date;
}

function renderActivityDate(startDate, dayNum) {
    let date = new Date(startDate);
    date.setDate(date.getDate() + dayNum)
}

module.exports = { renderItineraryDate, renderActivityDate }