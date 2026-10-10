import { createElement } from 'react';

export const portableTextComponents = {
  block: {
    normal: ({ children }) => children,
  },
  marks: {
    emph: ({ children }) => createElement('span', { className: 'bm-emph' }, children),
    em: ({ children }) => createElement('em', null, children),
  },
};
