const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const loggedIn = req.session.loggedIn
    res.render('homepage', {loggedIn})
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
