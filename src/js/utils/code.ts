/** Call the formatter corresponding to the given type */
export function formatCode(code: string, type: string): string {
  switch (type) {
    case 'html':
      return formatHtml(code);
    case 'css':
      return formatCss(code);
    case 'js':
      return formatJs(code);
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
  let tree: string[] = [];

  source.forEach((char, i) => {
    if (char === '<') {
      const tag: string = source
        .slice(i + 1, i + source.slice(i).indexOf('>'))
        .join('');

      const tagName: string = tag.split(' ')[0];
      const closing = tagName[0] === '/';
      const selfClosing = !closing && tag.indexOf('/') > -1;

      // Remove tag from tree when closing
      if (closing) {
        tree.splice(tree.lastIndexOf(tagName.replace('/', '')), 1);
      }

      // Add indent spaces depending on nesting level
      if (
        tree.length > 0 &&
        source[i - 1] === '>' &&
        !((closing || selfClosing) && source[i - 1] !== '>')
      ) {
        for (let j = 0; j < tree.length; j++) {
          formatted += '&nbsp;&nbsp;';
        }
      }

      // Add tag to tree if opening
      if (!selfClosing && !closing) {
        tree.push(tagName);
      }
    }

    formatted += char;
  });

  return formatted
    .replace(/</g, '&lt;') // Encode <
    .replace(/>/g, '&gt;') // Encode >
    .replace(/&gt;&lt;/g, '&gt;<br/>&lt;') // Add line break after each tag
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
    if (
      indentLevel > 0 &&
      (source[i - 1] === '{' || source[i - 1] === '}' || source[i - 1] === ';')
    ) {
      for (let j = 0; j < indentLevel; j++) {
        formatted += '&nbsp;&nbsp;';
      }
    }

    if (char === '{' || (char === '(' && indentLevel === 0)) {
      formatted += '&nbsp;';
    }

    formatted += char;

    if (
      (char === ':' && (!isNaN(parseInt(source[i + 1])) || indentLevel > 0)) ||
      (char === ')' && /^[a-zA-Z]/.test(source[i + 1]))
    ) {
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
      formatted += '<br/>';

      if (source[i + 1] !== '}') {
        formatted += '<br/>';
      }
    }
  });

  return formatted;
}

/** Format JS code - No formatting at this time, format directly in source */
function formatJs(code: string): string {
  return code;
}
