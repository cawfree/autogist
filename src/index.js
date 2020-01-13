#!/usr/bin/env node
import '@babel/polyfill';

import yargs from 'yargs';
import axios from 'axios';
import chalk from 'chalk';

const url = 'https://api.github.com/gists';
const charLength = 56;
const defaultDescription = '📈 GitHub Status';

const { AUTOGIST_TOKEN } = process.env;

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

const createGist = (description, content) => axios(
  {
    ...baseRequest(),
    method: 'post', 
    data: formatGist(true, undefined, description, content),
  },
)
  .then(({ data: { id } }) => id);

const updateGist = (gistId, description, content) => axios(
  {
    ...baseRequest(`/${gistId}`),
    method: 'patch',
    data: formatGist(true, undefined, description, content),
  },
);

const { argv } = yargs
  .option(
    'gist',
    {
      alias: 'g',
      type: 'text',
      description: 'Identifier of the gist. (Default: create new)',
    },
  )
  .option(
    'description',
    {
      alias: 'd',
      type: 'text',
      description: `Descripton of the gist. (Default: "${defaultDescription}")`,
    },
  )
  .option(
    'content',
    {
      alias: 'c',
      type: 'text',
      description: 'Content of the gist.',
    },
  );

let { gist, description, content } = argv;

(
  async () => {
    if (typeof AUTOGIST_TOKEN !== 'string' || AUTOGIST_TOKEN.length <= 0) {
      console.error(chalk.yellow(`💭 It looks like you haven\'t set the AUTOGIST_TOKEN environment variable. Head over to https://github.com/cawfree/autogist for more info.`));
    }
    else if (typeof content !== 'string' || content.length <= 0) {
      console.error(chalk.yellow('💭 Try adding content to your gist using -c.'));
    } else if (gist === undefined) {
      gist = await createGist(
        description,
        content,
      );
      console.log(chalk.green(`✨ Created a new gist! (${gist})`));
    } else if (typeof gist === 'string' && gist.length > 0) { // TODO: should test the gist id
      await updateGist(
        gist,
        description,
        content,
      );
      console.log(chalk.green('✨ Updated!'));
    } else {
      console.error(chalk.red(`❌ Expected valid gist, encountered ${gist}.`));
    }
  }
)();
