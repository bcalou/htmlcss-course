/** Call the formatter corresponding to the given type */
export function formatCode(code: string, type: string): string {
  switch (type) {
    case 'html':
      return formatHtml(code);
    case 'css':
      return formatCss(code);
    default:
      console.error('Unsupported language : ' + type);
      break;
  }
}

/** Encode special html characters and indent nested tags */
function formatHtml(code: string): string {
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

/** Add line breaks and indentation to CSS */
function formatCss(code: string): string {
  let source = Array.from(code.replace(/ /g, '').replace(/&nbsp;/g, ' '));
  let formatted = '';
  let indentLevel = 0;

  source.forEach((char, i) => {
    if (char === '}') {
      indentLevel--;
    }

    // Add indent spaces depending on nesting level
    if (indentLevel > 0 && (source[i - 1] === '{' || source[i - 1] === ';')) {
      for (let j = 0; j < indentLevel; j++) {
        formatted += '&nbsp;&nbsp;';
      }
    }

    if (char === '{') {
      formatted += '&nbsp;';
    }

    formatted += char;

    if (char === ':' && indentLevel > 0) {
      formatted += '&nbsp;';
    }

    if (char === ';') {
      formatted += '<br/>';
    }

    if (char === '{') {
      indentLevel++;
      formatted += '<br/>';
    }

    if (char === '}' && source[i + 1]) {
      formatted += '<br/><br/>';
    }
  });

  return formatted;
}
