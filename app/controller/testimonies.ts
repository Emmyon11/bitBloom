// Generate a random number between min and max (inclusive)
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random name from a list of names
function getRandomName() {
  var names = [
    'John',
    'Mary',
    'James',
    'Sarah',
    'David',
    'Emma',
    'Michael',
    'Anna',
    'Daniel',
    'Lisa',
    'Robert',
  ];
  return names[getRandomInt(0, names.length - 1)];
}

// Generate a random date in the format YYYY-MM-DD
function getRandomDate() {
  var year = getRandomInt(2020, 2023);
  var month = getRandomInt(1, 12);
  var day = getRandomInt(1, 28); // Simplify the logic by assuming every month has 28 days
  return (
    year +
    '-' +
    month.toString().padStart(2, '0') +
    '-' +
    day.toString().padStart(2, '0')
  );
}

// Generate a random amount of bitcoin in the range [0.01, 10]
function getRandomBitcoin() {
  return (Math.random() * 10 + 0.01).toFixed(2);
}

// Generate a random testimony from a list of templates
function getRandomTestimony() {
  var templates = [
    'I invested {amount} BTC with Bit-Bloom and I got {profit} BTC in return after {days} days. This is amazing!',
    'Bit-Bloom is the best bitcoin investment website ever. I put {amount} BTC and I received {profit} BTC in just {days} days. Thank you Bit-Bloom!',
    "I was skeptical at first, but I decided to give Bit-Bloom a try. I'm glad I did, because I made {profit} BTC from {amount} BTC in only {days} days. Bit-Bloom rocks!",
    "If you want to make money with bitcoin, you should try Bit-Bloom. I invested {amount} BTC and I got {profit} BTC back in {days} days. It's unbelievable!",
    "I can't believe how easy it is to make money with Bit-Bloom. I invested {amount} BTC and I got {profit} BTC in {days} days. This is the best thing that ever happened to me!",
  ];
  var template = templates[getRandomInt(0, templates.length - 1)];
  var amount = getRandomBitcoin();
  var profit = getRandomBitcoin();
  var days = getRandomInt(1, 30).toString();
  return template
    .replace('{amount}', amount)
    .replace('{profit}', profit)
    .replace('{days}', days);
}

// Generate a random image from a list of image URLs
function getRandomImage() {
  var images = [
    '[woman holding a smartphone with a bitcoin app on the screen]',
    '[man wearing a bitcoin t-shirt and holding a laptop]',
    '[group of people celebrating with champagne and bitcoin balloons]',
    '[couple smiling and showing their bitcoin wallets on their tablets]',
  ];
  return images[getRandomInt(0, images.length - 1)];
}

// Generate a dataset of customers with name, date, testimony, and image
function generateDataset(size: number) {
  var dataset = [];
  for (var i = 0; i < size; i++) {
    var customer: Customer = {
      name: '',
      date: '',
      image: '',
      testimony: '',
    };
    customer.name = getRandomName();
    customer.date = getRandomDate();
    customer.testimony = getRandomTestimony();
    customer.image = getRandomImage();
    dataset.push(customer);
  }
  return dataset;
}

// Print the dataset in JSON format
export const data = generateDataset(20);
