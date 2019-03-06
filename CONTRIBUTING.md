## sequelize-cli-helpers

### Contributing

`sequelize-cli-helpers` is intended for the whole community of Sequelize users. 
If you'd like to participate in its development, please familiarize yourself with the below.

### Scripts

- `$ npm run test` 
- `$ npm run debug` 
- `$ npm run lint` 
- `$ npm run fixlint` 

[husky](https://www.npmjs.com/package/husky) is used to lint and test before pushing.

### Testing

Tests are written using [Tape.js](https://www.npmjs.com/package/tape).

For why this was chosen, I refer you to [Why I use Tape ... ](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4).

### Workflow

- All work must be tied to an existing [Github issue](https://github.com/camoore1979/sequelize-cli-helpers/issues).
- All work should be performed on a branch off `development` with a name of `{bug/feature}/#{issue number}-{description}`, 
e.g. `feature/#99-generate-light-saber`
- All commit messages should reference the number of the worked issue, e.g. `#99: added handler for generating light saber`.
- Every worked issue should be listing in the [CHANGELOG.md](./CHANGELOG.md) under the next release.
- Once work is complete, a pull request into the `development` branch should be created, for review.

### Running locally

To run a command from within the project:

- `$ node index touch`

You can install `sequelize-cli-helpers` within a local project for development and use as you develop. 
For example, if you have a project using Sequelize and you wish to run `sequelize-cli-helpers` as you develop,
go to your other project, and install your local version of `sequelize-cli-helpers` with 

- `$ npm install --folder ../path/to/sequelize-cli-helpers`

Then from within your other project, to run `sequelize-cli-helpers`:

- `$ ./node_modules/.bin/sequelize-cli-helpers --help`
