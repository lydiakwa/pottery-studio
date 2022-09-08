const router = require('express').Router();

const { User, CartProduct, Cart } = require('../db/index');
const { requireToken } = require('../middleware');

//auth post -- signing in, creating a session
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.authenticate(req.body);

    const cart = await Cart.findOne({
      where: {
        userId: user.id,
        isCart: true,
      },
      include: {
        model: CartProduct,
      },
    });
    res.json({ user: user, cart: cart });
  } catch (err) {
    if (err.name === 'TypeError') {
      res.status(400).json({ message: 'Email does not exist' });
    } else {
      next(err);
    }
  }
});

//auth get is auto sign in - token is already set in localstorage
//requiretoken is middleware that converts a token into a user object
router.get('/me', requireToken, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id,
        isCart: true,
      },
      include: {
        model: CartProduct,
      },
    });
    res.json({ user: req.user, cart: cart });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
