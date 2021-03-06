const auth = require('../lib/auth');

const showLogin = (req, res) => {
  if (req.session.user) {
    res.redirect('/');
  } else {
    // Clean auth error field to hide error message in case when
    // user refreshes page etc.
    const error = req.session.authError;
    req.session.authError = null;
    res.render('login', { error });
  }
};

const processLogin = (req, res) => {
  const { username, password } = req.body;
  auth(username, password)
    .then((user) => {
      req.session.user = user;
      req.session.authError = null;
      res.redirect('/');
    })
    .catch((error) => {
      req.session.authError = error;
      res.redirect('/login');
    });
};

const processLogout = (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
};

module.exports = {
  showLogin,
  processLogin,
  processLogout,
};
