import { ChapterPage } from './pages/chapter.page';

if (['interactive', 'complete'].indexOf(document.readyState) > -1) {
  init();
} else {
  document.addEventListener('DOMContentLoaded', () => init());
}

function init(): void {
  fetch('../data/data.json')
    .then(res => res.json())
    .then(chapter => {
      new ChapterPage({ chapter: chapter });
    });
}
