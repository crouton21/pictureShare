console.log('PictureService loaded');

app.service('PictureService', ['$http', function($http) {
    console.log('PictureService created');
    
    let self = this;

    self.images = { imageArray: [], commentArray: [], comment: {}, newPhoto: {} } ;


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
          self.images.imageArray = response.data;      
          for (image of self.images.imageArray){
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
          self.images.comment = {};
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
          self.images.commentArray = response.data;      
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
    
      self.addNewPhoto = function(newPhoto){
          console.log('in addNewPhoto', newPhoto);
          $http({
            method: 'POST',
            url: `pictures/add`,
            data: {
                photo: newPhoto.photo,
                description: newPhoto.description,
                likes: 0
              }
          }).then(function(response) {
            console.log('Photo added');
            self.getImages();
            self.images.newPhoto = {};
          })
          .catch(function(error){
            console.log(error);
          })
      }
    
      self.deletePhoto = function(id){
        console.log('in deletePhoto, id:', id)
        $http({
          method: 'DELETE',
          url: `pictures/delete/${id}`
        }).then(function(response) {
          console.log('Photo deleted');
          self.getImages();
        })
        .catch(function(error){
          console.log(error);
        })
      }


}]);