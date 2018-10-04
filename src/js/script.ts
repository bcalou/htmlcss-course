import ChapterPage from './pages/chapter/chapter.page';
import HomePage from './pages/home/home.page';

if (['interactive', 'complete'].indexOf(document.readyState) > -1) {
  init();
} else {
  document.addEventListener('DOMContentLoaded', () => init());
}

/** Initiate the app */
function init(): void {
  fetch('../data/course.json')
    .then(res => res.json())
    .then(course => {
      const path: string[] = window.location.pathname.split('/').slice(1);
      document.querySelector('title').innerText = course.title;

      switch (path[0]) {
        case 'chapter':
          const index: number = parseInt(path[1]);
          new ChapterPage({
            chapter: course.chapters[index - 1],
            index: index,
          });
          break;
        default:
          new HomePage({ course: course });
          break;
      }
    });
}
