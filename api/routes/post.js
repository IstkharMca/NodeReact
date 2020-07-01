const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        messag:"vvdxcvcxvvcxv "
    })
});

router.post('/', (req, res) => {
   res.status(200).json({
       messag:"It works fine"
   })
});

router.delete('/:postId', (req, res) => {

    res.status(200).json({
        messag:"Post Id deleted sucessfully - "+req.params.postId
    })
 });

 router.put('/:postId', (req, res) => {

    res.status(200).json({
        messag:"Data updated successfully  - "+req.params.postId
    })
 });




module.exports = router;