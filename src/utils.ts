import DOMPurify from 'dompurify';

export const lineBreakToBr = (str?: string) =>
  typeof str === 'string'
    ? DOMPurify.sanitize(str.replace(/\n\s*\n/g, '<div class="spacer"></div>'))
    : '';

const idCharacters =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
export function generateId(length: number) {
  let result = '';
  const charactersLength = idCharacters.length;

  for (let i = 0; i < length; i++)
    result += idCharacters.charAt(Math.floor(Math.random() * charactersLength));

  return result;
}

export default 'ANTLER UTILS';
