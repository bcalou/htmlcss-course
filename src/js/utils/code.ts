/** Encode special html characters and indent nested tags */
export function formatCode(code: string) {
  let source = Array.from(code);
  let formatted = '';
  let indentLevel = 0;

  source.forEach((char, i) => {
    if (char === '<') {
      const tag: string = source
        .slice(i + 1, i + source.slice(i).indexOf('>'))
        .join('');

      if (tag.slice(-1) !== '/' && tag[0] !== '/') {
        indentLevel++;
      }

      // Add indent spaces depending on nesting level
      if (indentLevel > 0 && source[i - 1] === '>') {
        for (let j = 1; j < indentLevel; j++) {
          formatted += '&nbsp;&nbsp;';
        }
      }

      if (tag.slice(-1) !== '/' && tag[0] === '/') {
        indentLevel--;
      }
    }

    formatted += char;
  });

  return formatted
    .replace(/</g, '&lt;') // Encode <
    .replace(/>/g, '&gt;') // Encode >
    .replace(/&gt;&lt;/g, '&gt;<br/>&lt;') // Add line break after each tag;
    .replace(/&gt;&nbsp;/g, '&gt;<br/>&nbsp;'); // When a closing tag is followed by space, add line break
}
