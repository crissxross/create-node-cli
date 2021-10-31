# create-node-cli

CLI to create Node.js CLI apps. This is an ESM version, based on [create-node-cli](https://github.com/ahmadawais/create-node-cli) from [Node CLI Automation](https://nodecli.com/) course by [Ahmad Awais](https://twitter.com/MrAhmadAwais/).

-   Quickly scaffold a Node.js CLI
-   Template & custom code generation
-   Automatic argument parsing, help text, and welcome message
-   History to maintain the last input data like the author `name`, `email`, and `URL`

## Install

```sh
# Recommended
npx @crissxross/create-node-cli

# OR an alternative global install
npm install -g @crissxross/create-node-cli
```

## Usage

1. Run the CLI using

```sh
npx @crissxross/create-node-cli

# OR for global install
create-node-cli
# OR alias for global install
ncli
```

_Then answer the following questions to generate a Node.js CLI._

```sh
CLI name?
CLI command?
CLI description?
CLI version?
CLI license?
CLI author name?
CLI author email?
CLI author URL?
```

### BASIC USAGE

```sh
create-node-cli <command> [option]
```

### COMMANDS

```sh
help  Print help info
```

### OPTIONS

```sh
-c, --clear    Clear the console Default: true
-d, --debug    Print debug info Default: false
-v, --version  Print CLI version Default: false
```
