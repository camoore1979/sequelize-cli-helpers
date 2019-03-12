# sequelize-cli-helpers

A power-up for [Sequelize](http://docs.sequelizejs.com/) at the command line.

## Intro

[Sequelize](http://docs.sequelizejs.com/) is a powerful ORM, and while [sequelize-cli](https://www.npmjs.com/package/sequelize-cli) is helpful, in our workflow we have found several gaps. `sequelize-cli-helpers` is our power-up for improving our Sequelize workflow, especially for generating migrations and models.

_This is not a full replacement for [sequelize-cli](https://www.npmjs.com/package/sequelize-cli)._ For performing and managing migrations, you will still need that tool.

## Usage

- `$ sequelize-cli-helpers <command>`

## Commands

```
Commands:
  gen:migration:table  generates a Sequelize migration to create a table
  touch                generates a file name and touches the empty file

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

```

## Configuration

You can configure `sequelize-cli-helpers` for your project with a `.sequelizeclihelpersrc` file in the
root of your project.

The `.sequelizeclihelpersrc` can overwrite any part of the configuration.

Here is an example of what you can do:

```
module.exports ={
  dateFormat: 'YYYYMMDDHHmmss',   // format of date string to be used in file naming
  fileExtension: 'js',
  fileNameFormat: 'N.D',          // format of file name to be generated, see below
  forceConfirmation: true,        // forces prompt for confirmation of some values
  matchNumberOn: 'N',             // if using a 'N' format in your string, this determines how to calculate the next number
  numberPaddedLength: 4,          
  separator: '-',                 // separator to use between each part of the name, e.g. `20190311133906-create_table_hufflepuffs.js`
  paths: {
    templates: path.resolve('./db/templates/'),  // path to your custom templates, see below
  }
};
```

## File Name Formats

One of the uses of `sequelize-cli-helpers` is to control the naming of your `sequelize-cli` migration, seeders, and model files. Not all 
teams want to use the default `sequelize-cli` behavior, and this tool provides complete control of that naming, and makes part of it
automatic.

The file name format is configured in the `.sequelizeclihelpersrc` file, and is a string such as `'Tz.D'`.

The following format parts can be utilized:

- `Tz` a date string configured per the `dateFormat`
- `N` a number string left padded with zeroes to `numberPaddedLength`
- `D` a description
- `G` git branch info pulled from your repo, the branch name is parsed and the text of the branch name after the first `/` will be used.
- `R` a random string

You can order the file name format in any order excepting that a date `Tz` or a number `N` _must_ come first.

The number will be auto-generated based on other files with numbers in their names and filted by the date format to match on, 
the `matchNumberOn`. If `matchNumberOn === 'N'`, then it will consider all files of the same format with a number; 
if `matchNumberOn === 'G'`, the existing files will be filtered on by git info; and so on. From these filtered lists, 
the number of the last file name in the list will be used to generate the next number.

## Custom Templates

`sequelize-cli-helpers` has a default template to create a Sequelize table migration, see [`migration_create_table.hbs`](./src/templates/migration_create_table.hbs). 
You can provide your own for your project so long as you provide a `path.templates` in your `.sequelizeclihelpersrc` file, and have a template 
of the same name (`migration_create_table.hbs`) in that path, and the template must handle the same provided `context` keys (see our migration file, 
must handle `tableName`, `attributes`).


## Version

This is currently a pre-production project. It is not yet published, and available only for 
contributors as we work towards an initial `0.1` version.

If you want to see where we _think_ we are headed, please see [SPEC.md](SPEC.md).

## Branches

| Branch | Status | Coverage |   |
| ------ | ------ | -------- | - |
| `develop` | | | Work in progress |
| `master` | |  | Not yet released. |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
