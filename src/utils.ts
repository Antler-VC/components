import DOMPurify from 'dompurify';

export const lineBreakToBr = (str?: string) =>
  typeof str === 'string'
    ? DOMPurify.sanitize(str.replace(/\n\s*\n/g, '<div class="spacer"></div>'))
    : '';

export default 'ANTLER UTILS';
