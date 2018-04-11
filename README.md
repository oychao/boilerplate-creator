# boilerplate-creator

generate common boilerplates

[![Build Status](https://travis-ci.org/oychao/boilerplate-creator.svg?branch=master)](https://travis-ci.org/oychao/boilerplate-creator)

## What and Why

**boilerplate-creator** is a cli tool to generate common JavaScript boilerplates which are very messy to create.

## How to use

[**NOTE**] This project is published for now, clone it down if you want to have a try.

```bash
$ git clone git@github.com:oychao/boilerplate-creator.git
$ cd boilerplate-creator
$ npm install && npm link
```

Basic usage

```bash
$ bpc [project name] [options]
```

Create a React boilerplate

```bash
$ bpc helloreact
$ # or bpc helloreact -t react
```

Create a normal NPM boilerplate or a CLI tool

```bash
$ bpc hellonpm -t npm
$ bpc hellocli -t cli
```

Get Help document

```bash
$ bpc --help
```

## Todos

### about project

- [ ] user document
- [x] integrate with travis-ci
- [x] prettify the process

### cli
- [x] npm boilerplate
- [x] cli boilerplate

### react
- [x] basic react boilerplate
- [x] boilerplate in ecmascript, with redux and other relative libraries
- [ ] boilerplate in typescript
- [ ] [**investigating**]server-sider rendering boilerplate

## Licence

[![](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-4.png)](http://www.wtfpl.net/)
