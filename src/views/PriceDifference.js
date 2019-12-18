const PriceDifference = (oldPrice, newPrice) => {
  let message = '';

  if (oldPrice > 0) {
    console.log('old price greater than 0');
    if (newPrice > oldPrice) {
      message = 'Just went up!';
    } else {
      message = 'Just went down!';
    }
    message += ' Price was previously {oldPrice}';
    message = `<small>${message}</small>`;
  }

  return message;
}

export default PriceDifference;
