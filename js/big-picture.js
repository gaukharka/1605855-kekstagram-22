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

      // const comm = () => {
      //   if(comments.length > COMMENTS_MAX){
      //     for(let i = 5; i < comments.length; i+=5){
      //       socialComments.innerHTML = '';
      //       getAllComments([i]);
      //     }
      //   } else {
      //     socialComments.innerHTML = '';
      //     getAllComments(comments.length);
      //   }
      // }

      const comm = () => {
        if(comments.length > COMMENTS_MAX){
          for(let i = 0; i < comments.length; i+=COMMENTS_MAX){
            socialComments.innerHTML = '';
            getAllComments([i]);
          }
        }
      }

      // nado zagrujat commentariya po 5

      commentLoader.addEventListener('click', () => {
        evt.preventDefault();
        comm();
      });

      if(comments.length > COMMENTS_MAX){
        commentLoader.classList.remove('hidden');
        getAllComments(COMMENTS_MAX);
      } else if(comments.length < COMMENTS_MAX) {
        commentLoader.classList.add('hidden');
        getAllComments(comments.length);
      }
    });
  }
};

export {openBigPictureModal};
