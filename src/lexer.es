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


import AbstractTokenizer from 'ypo-parser-common/tokenizer';
import {AbstractOption} from 'ypo-parser-common/directives/option';
import Authorship from 'ypo-parser-common/directives/authorship';
import Comment from 'ypo-parser-common/directives/comment';
import Context from 'ypo-parser-common/directives/context';
import Plural from 'ypo-parser-common/directives/plural';
import TranslationId from 'ypo-parser-common/directives/translationid';
import EmptyLine from 'ypo-parser-common/text/emptyline';
import Line from 'ypo-parser-common/text/line';
import Location from 'ypo-parser-common/location';
import ParseError from 'ypo-parser-common/exceptions';
import {isNonEmptyString} from 'ypo-parser-common/utils';

import
{
    RULE_EMPTY_LINE, RULE_COMMENT, RULE_CONTEXT, RULE_PLURAL, RULE_OPTION,
    RULE_AUTHORSHIP, RULE_TRANSLATION_ID, RULE_TEXT
} from './rules';


/**
 * @private
 */
export const PRODUCTIONS = [
    {rule:RULE_EMPTY_LINE, klass:EmptyLine},
    {rule:RULE_COMMENT, klass:Comment},
    {rule:RULE_CONTEXT, klass:Context},
    {rule:RULE_PLURAL, klass:Plural},
    {rule:RULE_OPTION, factory:AbstractOption.createNewInstance},
    {rule:RULE_AUTHORSHIP, klass:Authorship},
    {rule:RULE_TRANSLATION_ID, klass:TranslationId},
    {rule:RULE_TEXT, klass:Line}
]


/**
 * The class YpoLexer models a parser that produces a stream of tokens from a
 * stream of input lines.
 *
 * Note that the lexer does not make any assumptions on the correct order of
 * the tokens. It is up to the parser to validate that order.
 */
export default class YpoLexer extends AbstractTokenizer
{
    /**
     * @override
     */
    * tokenize(file, lines)
    {
        if (!isNonEmptyString(file))
        {
            throw new TypeError('file must be a non empty string');
        }

        if (
            typeof lines == 'undefined'
            || !Array.isArray(lines) && typeof lines.next != 'function'
        )
        {
            throw new TypeError('lines must be an iterable');
        }

        let lineno = 1;
        for (let line of lines)
        {
            const location = new Location(file, lineno);

            // make sure that we are dealing with a string object here
            line = line.toString();

            yield this.nextToken(line, location);

            lineno++;
        }
    }

    nextToken(line, location)
    {
        let production, match;
        for (production of PRODUCTIONS)
        {
            match = production.rule.regex.exec(line);

            if (match)
            {
                break;
            }
        }

        if (!match)
        {
            this.doFail(null, location, line);
        }

        const options = {};
        for (let gidx = 0; gidx < production.rule.groups.length; gidx++)
        {
            options[production.rule.groups[gidx]] = match[1 + gidx];
        }

        let result;

        try
        {
            if (production.klass)
            {
                result = new production.klass(location, options);
            }
            else
            {
                result = production.factory.apply(null, [location, options]);
            }
        }
        catch (error)
        {
            this.doFail(error, location, line, production.klass);
        }

        return result;
    }

    doFail(cause, location, line, klass)
    {
        // handle expected syntax errors
        if (
            !klass
            || klass instanceof AbstractOption
            || klass instanceof Authorship
            || klass instanceof Context
            || klass instanceof Plural
            || klass instanceof TranslationId
        )
        {
            throw new ParseError(
                'syntax error', {location, line, cause}
            );
        }
        else
        {
            /*istanbul ignore next*/
            throw new ParseError(
                'internal error', {location, line, cause}
            );
        }
    }
}

