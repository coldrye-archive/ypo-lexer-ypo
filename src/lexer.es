// vim: expandtab:ts=4:sw=4
/*
 * Copyright 2015-2016 Carsten Klein
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import AbstractLexer from 'ypo-parser-common/lexer';
import {AbstractOption} from 'ypo-parser-common/option';
import Authorship from 'ypo-parser-common/authorship';
import Comment from 'ypo-parser-common/comment';
import EmptyLine from 'ypo-parser-common/emptyline';
import Location from 'ypo-parser-common/location';
import ParseError from 'ypo-parser-common/exceptions';
import Text from 'ypo-parser-common/text';
import TranslationId from 'ypo-parser-common/translationid';

import
{
    EMPTY_LINE, COMMENT, OPTION,
    AUTHORSHIP, TRANSLATION_ID, TEXT
} from './constants';


/**
 * @private
 */
export const TOKENS = [
    {rule:EMPTY_LINE, factory:EmptyLine.createNode},
    {rule:COMMENT, factory:Comment.createNode},
    {rule:OPTION, factory:AbstractOption.createNode},
    {rule:AUTHORSHIP, factory:Authorship.createNode},
    {rule:TRANSLATION_ID, factory:TranslationId.createNode},
    {rule:TEXT, factory:Text.createNode}
]


/**
 * The class Lexer models a parser that produces a stream of tokens from a
 * stream of input lines.
 */
export default class Lexer extends AbstractLexer
{
    /**
     * Generates a stream of tokens from lines read from the input stream.
     *
     * @param {string} file - the absolute and resolved file name
     * @param {Generator|Array<string>|Array<Buffer>} lines - the input line (buffer) stream or array
     * @throws {ParseError}
     * @returns {AbstractToken} - the yielded token instances
     */
    * tokenize(file, lines)
    {
        assertParams(file, lines)

        let lineno = 1;
        for (let line of lines)
        {
            const location = new Location(file, lineno);

            // make sure that we are dealing with a string object here
            line = line.toString();

            let token, rule, factory, match;
            for (token of TOKENS)
            {
                rule = token.rule;
                factory = token.factory;
                match = rule.regex.exec(line);

                if (match)
                {
                    break;
                }
            }

            if (!match)
            {
                throw new ParseError(
                    'error parsing file', {location: location}
                );
            }

            const params = new Array(rule.groups.length);
            for (let gidx = 0; gidx < rule.groups.length; gidx++)
            {
                params[gidx] = match[1 + gidx];
            }

            yield factory(location, ...params);

            lineno++;
        }
    }
}


/**
 * @private
 * @param {string} file - the absolute and resolved file name
 * @param {Generator|Array<string>} lines - the input line (buffer) stream or array
 * @returns {void}
 * @throws TypeError in case of invalid arguments
 */
function assertParams(file, lines)
{
    if (typeof file != 'string' || file.length == 0)
    {
        throw new TypeError('MSG_file must be a non empty string');
    }

    if (
        typeof lines == 'undefined'
        || !Array.isArray(lines) && typeof lines.next != 'function'
    )
    {
        throw new TypeError('MSG_lines must be an iterable');
    }
}

