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

  router.post('/comment/:id', function(request, response){
      const id = request.params.id;
      const comment = request.body.comment;
      console.log('comment on backend:', comment);
      const sqlText = `INSERT INTO comments (photo_id, comment) VALUES ($1, $2)`;
      pool.query(sqlText, [id, comment])
      .then(function(result) {
        response.sendStatus(200);
      })
      .catch(function(error) {
        console.log('Error on adding comment');
        response.sendStatus(500);
      })
  })

  router.get('/comments', function(request, response){
    const sqlText = 'SELECT comments.id, photo_id, comment, time_submitted, photo FROM comments JOIN photos ON photos.id=comments.photo_id ORDER BY comments.time_submitted DESC';
    pool.query(sqlText)
      .then(function(result) {
        console.log('Get result:', result);
        response.send(result.rows);
      })
      .catch(function(error){
        console.log('Error on GET comments:', error);
        response.sendStatus(500);
      })
  })

  router.delete('/comments/:id', function(request, response){
    const id = request.params.id;
    const sqlText = `DELETE FROM comments WHERE id=$1`;
    pool.query(sqlText, [id])
      .then(function(result) {
        response.sendStatus(200);
      })
      .catch(function(error) {
        console.log('Error deleting comment');
        response.sendStatus(500);
      })
  })



module.exports = router;