const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Home Page
app.get('/', (req, res) => res.render('pages/index'));
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// Rate Result
app.get('/rate', (req, res) => {
  var weight = parseFloat(req.query.weight);
  var type = String(req.query.packageType);
  var rate = calculateRate(weight, type);
  console.log(rate.ermsg);
  params = {
    packageRate: rate,
    packageWeight: weight,
    packageType: type
  }
  res.render('pages/rate', params);
});

function calculateRate(weight, type) {

  switch (type) {
    case 'letterStamped':
      return weight <= 1 ? 0.55
            : weight <= 2 && weight > 1 ? { rate: '0.70' }
            : weight <= 3 && weight > 2 ? { rate: '0.85' }
            : weight <= 3.5 && weight > 3 ? { rate: '1.00' }
            : weight <= 4 && weight > 3.5 ? { rate: '1.60' }
            : weight <= 5 && weight > 4 ? { rate: '1.80' }
            : weight <= 6 && weight > 5 ? { rate: '2.00' }
            : weight <= 7 && weight > 6 ? { rate: '2.20' }
            : weight <= 8 && weight > 7 ? { rate: '2.40' }
            : weight <= 9 && weight > 8 ? { rate: '2.60' }
            : weight <= 10 && weight > 9 ? { rate: '2.80' }
            : weight <= 11 && weight > 10 ? { rate: '3.00' }
            : weight <= 12 && weight > 11 ? { rate: '3.20' }
            : weight <= 13 && weight > 12 ? { rate: '3.40' }
            : { ermsg: "Letters (Stamped) must not weigh more than 13oz.", class: "danger" };
    case 'letterMetered':
      return weight <= 1 ? 0.5 
            : weight <= 2 && weight > 1 ? 0.65
            : weight <= 3 && weight > 2 ? 0.8
            : weight <= 3.5 && weight > 3 ? 0.95
            : weight <= 4 && weight > 3.5 ? 1.6
            : weight <= 5 && weight > 4 ? 1.8
            : weight <= 6 && weight > 5 ? 2
            : weight <= 7 && weight > 6 ? 2.2
            : weight <= 8 && weight > 7 ? 2.4
            : weight <= 9 && weight > 8 ? 2.6
            : weight <= 10 && weight > 9 ? 2.8
            : weight <= 11 && weight > 10 ? 3
            : weight <= 12 && weight > 11 ? 3.2
            : weight <= 13 && weight > 12 ? 3.4
            : { ermsg: "Letters (Metered) must not weigh more than 13oz.", class: 'danger' };
    case 'largeEnvelopes':
      return weight <= 1 ? 1
            : weight <= 2 && weight > 1 ? 1.2
            : weight <= 3 && weight > 2 ? 1.4
            : weight <= 4 && weight > 3 ? 1.6
            : weight <= 5 && weight > 4 ? 1.8
            : weight <= 6 && weight > 5 ? 2
            : weight <= 7 && weight > 6 ? 2.2
            : weight <= 8 && weight > 7 ? 2.4
            : weight <= 9 && weight > 8 ? 2.6
            : weight <= 10 && weight > 9 ? 2.8
            : weight <= 11 && weight > 10 ? 3
            : weight <= 12 && weight > 11 ? 3.2
            : weight <= 13 && weight > 12 ? 3.4
            : { ermsg: "Large envelope (Flat) must not weigh more than 13oz.", class: 'danger' };
    case 'firstClass':
      return weight <= 1 ? 3.80
            : weight <= 2 && weight > 1 ? 3.80
            : weight <= 3 && weight > 2 ? 3.80
            : weight <= 4 && weight > 3 ? 3.80
            : weight <= 5 && weight > 4 ? 3.80
            : weight <= 6 && weight > 5 ? 4.60
            : weight <= 7 && weight > 6 ? 4.60
            : weight <= 8 && weight > 7 ? 4.60
            : weight <= 9 && weight > 8 ? 4.60
            : weight <= 10 && weight > 9 ? 5.30
            : weight <= 11 && weight > 10 ? 5.30
            : weight <= 12 && weight > 11 ? 5.30
            : weight <= 13 && weight > 12 ? 5.30
            : weight === 13 ? 5.90
            : { ermsg: "First-Class Package Service (Retail) must not weigh more than 3.3oz.", class: 'danger'};
    case 'postcard':
      return weight <= 1 ? 0.35 : { ermsg: "Postcards must not weigh more than 1oz.", class: 'danger' };
    case 'eddm':
      return weight <= 3.3 ? 0.191 : { ermsg: "Every Door Direct Mail (Retail) must not weigh more than 3.3oz.", class: 'danger' };
  }
}