
const db = require('../config/db');

exports.createPolicy = (req, res) => {
  const {
    dob,
    gender,
    sumAssured,
    modalPremium,
    premiumFrequency,
    pt,
    ppt
  } = req.body;

 
  const dobDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();
  const m = today.getMonth() - dobDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
    age--;
  }
 
  if (age < 23 || age > 56) {
    return res.status(400).send({ message: 'Age must be between 23 and 56' });
  }

  if (modalPremium < 10000 || modalPremium > 50000) {
    return res.status(400).send({ message: 'Modal Premium must be between 10,000 and 50,000' });
  }

  if (pt <= ppt) {
    return res.status(400).send({ message: 'PT must be greater than PPT' });
  }

  if (ppt < 5 || ppt > 10 || pt < 10 || pt > 20) {
    return res.status(400).send({ message: 'PPT must be between 5-10 and PT between 10-20' });
  }

  if (!['Yearly', 'Half-Yearly', 'Monthly'].includes(premiumFrequency)) {
    return res.status(400).send({ message: 'Invalid Premium Frequency' });
  }

  if (sumAssured < Math.max(modalPremium * 10, 5000000)) {
    return res.status(400).send({ message: 'Sum Assured must be at least 10 times modal premium or ₹50,00,000' });
  }


  const sql = `
    INSERT INTO policies (dob, age, gender, sumAssured, modalPremium, premiumFrequency, pt, ppt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [dob, age, gender, sumAssured, modalPremium, premiumFrequency, pt, ppt], (err, result) => {
    if (err) {
      return res.status(500).send({ message: 'Database error', error: err.message });
    }

    res.status(201).send({ message: 'Policy created successfully', status: 'success' });
  });
};

exports.getAllPolicies = (req, res) => {
  const sql = 'SELECT * FROM policies';

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send({ message: 'Database error', error: err.message });
    }
    res.send({ message: 'Policies fetched successfully', data: result });
  });
};
