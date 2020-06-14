const router = require('express').Router()
const {Change, User, Community, Comment} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allChanges = await Change.findAll({
      include: [User, {model: Comment, include: User}]
    })
    res.json(allChanges)
  } catch (err) {
    next(err)
  }
})

router.get('/:changeId', async (req, res, next) => {
  try {
    const singleChange = await Change.findAll({
      where: {
        id: req.params.changeId
      },
      // attributes: ['id', 'title', 'body'],
      include: [
        {model: User},
        {model: Community},
        {model: Comment, include: [{model: User}]}
      ],
      order: [[{model: Comment}, 'createdAt', 'ASC']]
    })
    res.json(singleChange)
  } catch (err) {
    next(err)
  }
})

router.get('/from/:userId', async (req, res, next) => {
  try {
    const userChanges = await Change.findAll({
      where: {
        userId: req.params.userId
      },
      include: [{model: Comment, include: [{model: User}]}, {model: Community}],
      // attributes: ['id', 'title', 'body'],
      order: [['createdAt', 'DESC'], [{model: Changes}, 'createdAt', 'ASC']]
    })

    res.json(userChanges)
  } catch (err) {
    next(err)
  }
})

router.get('/in/:communityId', async (req, res, next) => {
  try {
    const community = await Community.findAll({
      where: {
        id: req.params.communityId
      },
      include: [
        Change
        // {model: User, include: Change}
      ]
    })
    // const communityChanges = await Change.findAll({
    //   where: {
    //     communityId: req.params.communityId
    //   }
    // })
    res.json(community)
  } catch (error) {
    next(error)
  }
})

router.post('/add/:userId', async (req, res, next) => {
  try {
    const newChange = await Change.create({
      userId: req.params.userId,
      title: req.body.storyTitle,
      body: req.body.storyBody,
      isAnonymous: req.body.isAnonymous,
      allowComments: req.body.allowComments,
      groupSelection: req.body.groupSelection,
      communityId: req.body.communityId
    })

    // const getNewChange = await Change.findOne({
    //   where: {
    //     id: newChange.id,
    //   },
    //   include: [
    //     {model: User},
    //     {model: Community},
    //     {model: Community, include: [{model: User}]},
    //   ],
    //   order: [[{model: Comment}, 'createdAt', 'ASC']],
    // })
    // console.log(getNewChange)
    res.json({status: 'works'})
  } catch (error) {
    next(error)
  }
})

router.delete('/:changeId', async (req, res, next) => {
  try {
    const reverseChange = await Change.findOne({
      where: {
        id: req.params.changeId
      }
    })
    res.status(200).json(reverseChange)
  } catch (error) {
    next(error)
  }
})
