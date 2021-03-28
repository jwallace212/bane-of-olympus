const withAuth = require('../utils/auth');
const { User, Game, Enemies, Characters } = require('../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const loggedIn = req.session.loggedIn
    res.render('homepage', { loggedIn })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/battle', async (req, res) => {
  try {
    const getChar = await Characters.findOne({ where: { game_id: req.session.game_id } });
    const loggedIn = req.session.loggedIn;
    //const enemy = { name: "Zeus", hp: 100, image: "pexels-furkanfdemir-5018188.jpg" };
    const ranEnemy = await Enemies.findOne({ where: { id: Math.floor(Math.random() * 3 + 1) } });
    const character = JSON.parse(JSON.stringify(getChar));

    console.log(Math.floor(Math.random() * 3 + 1));
    console.log(ranEnemy);
    const enemy = JSON.parse(JSON.stringify(ranEnemy));
    console.log(enemy);
    const battleSave = JSON.stringify({
      name: character.character_name,
      characterHP: character.health,
      characterDam: character.damage,
      charImage: character.image,
      enemyName: enemy.character_name,
      enemyImage: enemy.image,
      enemyHP: enemy.health,
      enemyDam: enemy.damage,
    });

    res.render('battle', {
      loggedIn,
      character,
      enemy,
      battleSave
    })


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

router.get('/battle', async (req, res) => {
  try { } catch (err) { }
});

// must be logged in withAuth, will show character select handlebars
router.get('/characterselect', withAuth, async (req, res) => {
  const loggedIn = req.session.loggedIn;
  const getGame = await Game.findOne({
    where: {
      user_id: req.session.user_id
    },
    include: [
      {
        model: Characters,
        attributes: ['id'],
      }
    ]
  });
  const userGame = await JSON.parse(JSON.stringify(getGame));
  const userData = await User.findOne({
    where: {
      id: req.session.user_id
    },
    include: [
      { model: Game },
    ]
  })
  const sendUser = await JSON.parse(JSON.stringify(userData));

  console.log(sendUser);
  if (userGame.character !== null) {
    const gameData = await Characters.findOne({
      where: {
        game_id: req.session.game_id
      },
    });
    const sendGame = await JSON.parse(JSON.stringify(gameData));
    res.render('character-select', {
      loggedIn,
      sendUser,
      sendGame
    })
  } else {
    res.render('character-create', {
      loggedIn,
      userGame
    })
  }

})

module.exports = router;
