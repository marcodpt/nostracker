# ![](docs/favicon.ico) NosTracker
A website dedicated to collecting information from the nostr network.

[website](https://marcodpt.github.io/nostracker/)

## ❤️ Features
 - A website equivalent to caniuse for nostr NIPs.
 - Relevant information (stars, issues, license, last commit, etc.) and easy search.

## 📢 Add my repository.
Go to the
[data.json](https://github.com/marcodpt/nostracker/blob/main/data.json)
file.

And add the following object to the end of the array.

```json
{
  "gh": "owner/repo",
  "nips": [],
  "category": "clients|relays|libraries|tools"
}
```

For example, for the damus application it is filled in as follows:

```json
{
  "gh": "damus-io/damus",
  "nips": [1, 4, 8, 10, 12, 19, 21, 25, 42, 56],
  "category": "clients"
}
```

See if your repository is already on the list before.

If applicable, edit instead of adding a new item.

Only open source repositories and pull requests from repository members will be
accepted.

In other cases, or if you need a new category, open an issue.

## 🔧 TODO
 - Add information about archived repositories.
 - Add the version of each repository.
 - Add contributors to each repository.
 - Add RSS feed with updates.
 - Enable other git hosts like
[gitlab](https://about.gitlab.com/),
[codeberg](https://codeberg.org/),
[sourcehut](https://sourcehut.org/),
etc.
 - Improve the SSG and the template engine and better explain their use.
 - Integration of the website into the nostr network.
 - Enable comments through nostr.
 - Create a blog interviewing developers.

## 🤝 Contributing
It's a very simple project.
Any contribution, any feedback is greatly appreciated.

## ⭐ Support
If this project was useful to you, consider giving it a star on github, it's a
way to increase evidence and attract more contributors.

## 🙏 Acknowledgment
This work would not be possible if it were not for these related projects:
 - [Nostr](https://github.com/nostr-protocol/nostr)
 - [NIPs](https://github.com/nostr-protocol/nips)
 - [Awesome Nostr](https://github.com/aljazceru/awesome-nostr)

A huge thank you to all the people who contributed to these projects.
