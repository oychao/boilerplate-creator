# boilerplate-creator

generate common boilerplates

[![Build Status](https://travis-ci.org/oychao/boilerplate-creator.svg?branch=master)](https://travis-ci.org/oychao/boilerplate-creator)

## What and Why

**boilerplate-creator** is a cli tool to generate common JavaScript boilerplates which are very messy to create.

## How to use

### Installation

```bash
$ npm i -g boilerplate-creator
```

### Demo

<p align="center">
    <img src="https://i.giphy.com/media/pcJnyMqp6HdJLSFGwx/giphy.webp" width=600 alt="demo">
</p>

### Basic usage

```bash
$ bpc [project name] [options]
```

### Create a React boilerplate

```bash
$ bpc helloreact
$ # or bpc helloreact -t react
$ # react in typescript
$ bpc helloreactts -t react --ts
```

### Create a normal NPM boilerplate or a CLI tool

```bash
$ bpc hellonpm -t npm
$ bpc hellonpm -t npm --ts
$ bpc hellocli -t cli
$ bpc hellocli -t cli --ts
```

### Get Help document

There are 6 templates(npm|npm-ts|cli|cli-ts|react|react-ts) are supported for now, please check the help document for more information.

```bash
$ bpc --help
```

## Licence

[![](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-4.png)](http://www.wtfpl.net/)
