
import React from 'react';
import {} from 'react-native';

export default function formatDataForListView =  (bookingIDs) => {
  const dataBlob = {};
  const sectionIDs = [];
  const rowIDs = [];

  // create array of all the different products for grouping into sections
  bookingIDs.forEach((id) => {
    // is product already in sectionIDs array? If not, add to sectionIDs & dataBlob
    if (sectionIDs.indexOf(bookings[id].product_id) < 0) {
      sectionIDs.push(bookings[id].product_id);
      dataBlob[bookings[id].product_id] = bookings[id].title;
    }
    // add booking to rowIDs & dataBlob
    rowIDs.push(bookings[id].id);
    dataBlob[bookings[id].product_id + ':' + bookings[id].id] = bookings[id];
  });
  return { dataBlob, sectionIDs, rowIDs };
};
