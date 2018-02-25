const app = angular.module('pictureApp', []);

const pictureController = app.controller('PictureController', ['$http', function($http){
  let self = this;

  self.imageArray = [];
  self.commentArray = [];

  self.comment = {};

  self.likePhoto = function(id, likes){
    console.log('in likePhoto, id:', id);
    likes += 1;
    $http({
      method: 'PUT',
      url: `/pictures/${id}`,
      data: { likes: likes }
    })
    .then(function (response) {
      console.log('Updated likes');
      self.getImages();
    })
    .catch(function (error){
      console.log(error);
    })
  }


  self.getImages = function(){
    $http({
      method: 'GET',
      url: '/pictures'
    })
    .then(function(response){
      console.log('Getting all photos:', response.data);
      self.imageArray = response.data;      
      for (image of self.imageArray){
        image.commentStatus = true;
      }
    })
    .catch(function(error){
      console.log(error);
    })   
  }

  self.commentSubmitted = function(id, commentIn){
    console.log('in comment photo, id and comment:', id, commentIn);
    $http({
      method: 'POST',
      url: `pictures/comment/${id}`,
      data: {comment: commentIn}
    }).then(function(response) {
      console.log('Sent comment');
      self.getComments();
      self.comment = {};
    })
    .catch(function(error){
      console.log(error);
    })
  }

  self.getComments = function(){
    console.log('in getComments');
    $http({
      method: 'GET',
      url: '/pictures/comments'
    })
    .then(function(response){
      console.log('Getting all comments:', response.data);
      self.commentArray = response.data;      
    })
    .catch(function(error){
      console.log(error);
    })   
  }

  self.deleteButtonClicked = function(id){
    console.log("in deleteButtonClicked, id:", id);
    $http({
      method:'DELETE',
      url: `/pictures/comments/${id}`
    }).then(function(response){
      console.log('comment deleted!');
      self.getComments();
    })
    .catch(function(error){
      console.log(error);
    })   
  }

  self.getImages();
  self.getComments();

}]);