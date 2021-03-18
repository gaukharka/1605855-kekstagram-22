import {picturePreviewModal, openModal} from './modal-control.js';
import {createElement} from './util.js';

const socialComments = document.querySelector('.social__comments');
const bigPictureImg = picturePreviewModal.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikesCount = picturePreviewModal.querySelector('.likes-count');
const bigPictureCommentsCount= picturePreviewModal.querySelector('.comments-count');
const bigPictureDescription= picturePreviewModal.querySelector('.social__caption');
const commentLoader = picturePreviewModal.querySelector('.comments-loader');

const COMMENTS_MAX = 5;

const openBigPictureModal = (picture) => {
  const pictureCard = document.querySelectorAll('.picture');

  for (let i = 0; i < pictureCard.length; i++) {
    pictureCard[i].addEventListener('click', (evt) => {
      evt.preventDefault();
      openModal();
      socialComments.innerHTML = '';

      const {url, likes, comments, description} = picture[i];
      bigPictureImg.src = url;
      bigPictureLikesCount.textContent = likes;
      bigPictureCommentsCount.textContent = comments.length;
      bigPictureDescription.textContent = description;
      const commentFragment = document.createDocumentFragment();

      const getAllComments = (commentLength) => {
        for (let j = 0; j < commentLength; j++) {
          const commentListElement = createElement('li', 'social__comment');
          const commentAvatar = createElement('img', 'social__picture');
          const {avatar, name, message} = comments[j];
          commentAvatar.src = avatar;
          commentAvatar.alt = name;
          commentListElement.appendChild(commentAvatar);
          const commentText = createElement('p', 'social__text');
          commentText.textContent = message;
          commentListElement.appendChild(commentText);
          commentFragment.appendChild(commentListElement);
        }
        socialComments.appendChild(commentFragment);
        document.body.classList.add('modal-open');
      }

      if(comments.length < COMMENTS_MAX) {
        commentLoader.classList.add('hidden');
        getAllComments(comments.length);
      } else if (comments.length > COMMENTS_MAX && comments.length < 2*COMMENTS_MAX) {
        getAllComments(COMMENTS_MAX);
        commentLoader.classList.remove('hidden');
        commentLoader.addEventListener('click', () => {
          socialComments.innerHTML = '';
          getAllComments(comments.length);
          commentLoader.classList.add('hidden');
        })
      } else  {
        socialComments.innerHTML = '';
        getAllComments(COMMENTS_MAX);
        commentLoader.classList.remove('hidden');
        const n = comments.length % COMMENTS_MAX
        commentLoader.addEventListener('click', () => {
          socialComments.innerHTML = '';
          let i = COMMENTS_MAX;
          i += COMMENTS_MAX;
          getAllComments([i])
          console.log(comments);
          console.log(i + COMMENTS_MAX);

          if(comments.length % COMMENTS_MAX !== 0){
            socialComments.innerHTML = '';
            getAllComments(i);
            commentLoader.addEventListener('click', () => {
              socialComments.innerHTML = '';
              getAllComments(comments.length);
              commentLoader.classList.add('hidden');
            })
          }
        });
        commentLoader.classList.remove('hidden');
      }
    });
  }
};

export {openBigPictureModal};


// if(comments.length % COMMENTS_MAX !== 0){
//   socialComments.innerHTML = '';
//   getAllComments(i);
//   commentLoader.addEventListener('click', () => {
//     socialComments.innerHTML = '';
//     getAllComments(comments.length);
//     commentLoader.classList.add('hidden');
//   })
// }
