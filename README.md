[![Build Status](https://travis-ci.org/coldrye-es/ypo-lexer-ypo.svg?branch=master)](https://travis-ci.org/coldrye-es/ypo-lexer-ypo)
[![NPM](https://nodei.co/npm/ypo-lexer-ypo.png?mini=true)](https://nodei.co/npm/ypo-lexer-ypo/)

# ypo-lexer-ypo

ypo-lexer-ypo is a lexer for the YPO file format that procudes a token stream for consumption by for example the ypo parser.
The lexer is rather dumb and does not validate the correct order of the input tokens.

You might want to have a look at [ypo-cli](https://github.com/coldrye-es/ypo-cli.git) instead and see how
it can help you with your translations.


## Releases

See the [changelog](https://github.com/coldrye-es/ypo-lexer-ypo/blob/master/CHANGELOG.md) for more information.


## Project Site

The project site, see (2) under resources below, provides more insight into the project,
including test coverage reports and API documentation.


## Contributing

You are very welcome to propose changes and report bugs, or even provide pull
requests on [github](https://github.com/coldrye-es/ypo-lexer-ypo).

See the [contributing guidelines](https://github.com/coldrye-es/ypo-lexer-ypo/blob/master/CONTRIBUTING.md) for more information.


### Contributors

See [contributors](https://github.com/coldrye-es/ypo-lexer-ypo/graphs/contributors) for more information.


### Building

See [build process](https://github.com/coldrye-es/esmake#build-process) and the available [build targets](https://github.com/coldrye-es/esmake#makefilesoftwarein)
for more information on how to build this.

See also [development dependencies](https://github.com/coldrye-es/esmake#development-dependencies) and on how to deal with them.


## Installation

``npm --save ypo-lexer-ypo``


### Runtime Dependencies

 - _[babel-runtime](https://github.com/babel/babel)_
 - _[ypo-parser-common](https://github.com/coldrye-es/ypo-parser-common)_

**The dependencies denoted in _italics_ must be provided by the using project.**


## Usage

```
import Lexer from 'ypo-lexer-ypo';

let lexer = new Lexer();

const inputStream = [
    '# comment',
    '#= lang en',
    '#= ns ui.component',
    '#! title',
    'The Title'
];

for (let token of lexer.tokenize(inputStream))
{
    console.log(token.toString());
}
```


## Resources

 - (1) [Github Site](https://github.com/coldrye-es/ypo-lexer-ypo)
 - (2) [Project Site](http://ypo.es.coldrye.eu)

