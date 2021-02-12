/* Put your javascript in here */

   //declaring new variables
   let listOfPictures = document.querySelector('ul');
   let list_images = document.getElementById("images").getElementsByTagName("li");
   let image_width = 135;
   let count_image = 1;
   let position = 0; 

   function onLoadOfPage() {
     const prev = document.querySelector('#prev');
     prev.addEventListener('click', (event) => {
       position += image_width * count_image;
       position = Math.min(position, 0)
       listOfPictures.style.marginLeft = position + 'px';
       console.log('clickprev');
     });

     const next = document.querySelector('#next');
     next.addEventListener('click', (event) => {
       position -= image_width * count_image;
       position = Math.max(position, -image_width * (list_images.length - count_image));
       listOfPictures.style.marginLeft = position + 'px';
       console.log('clicknext');

     });
   }

   window.onload = onLoadOfPage;

