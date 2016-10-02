var express = require('express');
var router = express.Router();
var GitHub = require('github-api')

/* GET users listing. */
router.get('/', function(req, res, next) {
  // basic auth
  const gh = new GitHub({
     username: 'Dkra',
     password:  ''
  });

  const roger = gh.getUser('Dkra');

  roger.getProfile()
    .then(data => {
      res.json(data.data);
    })

  // res.render('github', {
  //   title: 'Connect to Github API',
  // })
});

module.exports = router;
