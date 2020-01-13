# autogist
⚡📄🥯Sync a GitHub Gist.


## 🚀 Getting Started

Using [`npm`]():

```bash
npm i -g autogist
```

Next, if you haven't already, you need to [create a new GitHub OAuth2 Token](https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/) with the `gist` permission. You can add a token to your profile [here](https://github.com/settings/tokens/new).

Finally, you need to add this token to your environment variables.

#### OSX

```bash
echo "AUTOGIST_TOKEN <your-token-here>" >> ~/.bash_profile
source ~/.bash_profile
```

#### Linux
```bash
echo "AUTOGIST_TOKEN <your-token-here>" >> ~/.bashrc
source ~/.bashrc
```

## 🗞️ Publishing via the Commnand Line

### Create a Gist

To create a new gist, call `autogist` with the description (`-d`) and content (`-c`) of your gist.

```bash
npx autogist -d "gist description" -c "gist content"
```

### Update a Gist

To update a gist, just specify the id (`-g`) of your gist.

```bash
npx autogist -d "gist description" -c "updated content" -g <my-gist-id>
```

## ✌️ License
[MIT](https://opensource.org/licenses/MIT)
