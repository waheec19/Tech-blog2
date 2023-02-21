const router = require('express').Router();
const { Post, User, Comment } = require('../models/');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const postData = await Post.findAll({
      where:{
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['name'],
          }
        },
        {
          model: User,
          attributes: ['name'],
        }
      ],
    });
    const user = userData.get({ plain: true });
    console.log(userData);
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('all-posts', {
      
      layout: 'dashboard',
     
      ...user,
      posts,
      logged_in: true
    });
  } catch (err) {
    res.redirect('login');
  }
});


router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});


router.get('/edit/:id', withAuth, async (req, res) => {
  try {

    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });
      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;