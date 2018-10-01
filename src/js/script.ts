import ChapterRenderer from './chapter/chapter-renderer';

if (['interactive', 'complete'].indexOf(document.readyState) > -1) {
  init();
} else {
  document.addEventListener('DOMContentLoaded', () => init());
}

function init(): void {
  new ChapterRenderer(() => {
    // Load CodePen script once the content is generated
    const script: HTMLScriptElement = document.createElement('script');
    script.src = 'https://static.codepen.io/assets/embed/ei.js';
    document.head.appendChild(script);
  });
}
