import {createApp} from 'https://unpkg.com/petite-vue?module';

const share = ({title, url, copyFeedback, shareFeedback}) => {
  return {
    title,
    url,
    webShareSupported: navigator.share,
    clipboardSupported: navigator.clipboard,
    shareFeedback: '',
    copyFeedback: '',
    noOptionsAvailable() {
      return !this.clipboardSupported && !this.webShareSupported;
    },
    share() {
      navigator
        .share({
          title,
          url,
          text: title,
        })
        .then(() => {
          this.shareFeedback = shareFeedback;

          setTimeout(() => {
            this.shareFeedback = '';
          }, 3000);
        })
        .catch((error) => console.error('Error sharing', error));
    },
    copyLink() {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          this.copyFeedback = copyFeedback;

          setTimeout(() => {
            this.copyFeedback = '';
          }, 3000);
        })
        .catch((error) => console.error(error));
    },
  };
};

createApp({share}).mount();