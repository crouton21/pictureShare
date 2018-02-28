
app.controller('PictureController', ['PictureService', function(PictureService){
  console.log('PictureController created');
  
  let self = this;

  self.images = PictureService.images;

  self.getImages = PictureService.getImages;
  self.getComments = PictureService.getComments;
  self.commentSubmitted = PictureService.commentSubmitted;
  self.deleteButtonClicked = PictureService.deleteButtonClicked;
  self.addNewPhoto = PictureService.addNewPhoto;
  self.deletePhoto = PictureService.deletePhoto;
  self.likePhoto = PictureService.likePhoto;


  self.getImages();
  self.getComments();

}]);