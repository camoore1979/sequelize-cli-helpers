## sequelize-cli-helpers

## Spec


### 0.1 Release Features

- simple `touch` command to create a file name of given format, and create the empty file.
- the user has the ability to control the format to the file name
- ability to utilize the existing `.sequelizerc` if it exists, and put created file in
  the existing `migrations` folder
- ability to configure `sequelize-cli-helpers` with a `.rc` file
- a `migration` command to generate a migration file

### Future Features

- ability to generate migrations from multiple templates
  - e.g. a user can provide a template of common fields, for instance.
- ability to generate models
  - ability to do so from an existing migration / table
- ability to generate seeders
- ability to provide your own templates for migrations / models / seeders
- helper funcs for empowering migrations, e.g. `addColumns()`, `upsertMigration()`

