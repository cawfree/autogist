import '@babel/polyfill';

import axios from 'axios';

const { AUTOGIST_TOKEN } = process.env;

export const defaultDescription = '📈 GitHub Status';
export const url = 'https://api.github.com/gists';

const baseRequest = (sfx = '') => ({
  url: `${url}${sfx}`,
  headers: {
    'Authorization': `token ${AUTOGIST_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

const formatGist = (visible=true, name='autogist.md', description=defaultDescription, content) => ({
  files: {
    [name]: {
      content,
    },
  },
  description,
  public: visible,
});

export const createGist = (description, content) => axios(
  {
    ...baseRequest(),
    method: 'post', 
    data: formatGist(true, undefined, description, content),
  },
)
  .then(({ data: { id } }) => id);

export const updateGist = (gistId, description, content) => axios(
  {
    ...baseRequest(`/${gistId}`),
    method: 'patch',
    data: formatGist(true, undefined, description, content),
  },
);

