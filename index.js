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
    
  }
}