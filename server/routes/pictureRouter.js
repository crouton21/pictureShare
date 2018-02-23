const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');
const bodyParser = require('body-parser');

router.get('/', function(request, response){
    const sqlText = 'SELECT * FROM photos ORDER BY id ASC';
    pool.query(sqlText)
      .then(function(result) {
        console.log('Get result:', result);
        response.send(result.rows);
      })
      .catch(function(error){
        console.log('Error on Get:', error);
        response.sendStatus(500);
      })
  })

  router.put('/:id', function(request, response) {
    const id = request.params.id;
    const likes = request.body.likes;
    const sqlText = `UPDATE photos SET likes=$1 WHERE id=$2`;
    pool.query(sqlText, [likes, id])
      .then(function(result) {
        console.log(`Updated photo ${id} with likes = ${likes}`);
        response.sendStatus(200);
      })
      .catch(function(error) {
        console.log('Error on update song');
        response.sendStatus(500);
      })
  })



module.exports = router;