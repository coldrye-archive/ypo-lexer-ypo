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


import
{
    Namespace, Lang
} from 'ypo-parser-common/directives/option';
import Authorship from 'ypo-parser-common/directives/authorship';
import Comment from 'ypo-parser-common/directives/comment';
import Context from 'ypo-parser-common/directives/context';
import Plural from 'ypo-parser-common/directives/plural';
import EmptyLine from 'ypo-parser-common/text/emptyline';
import Line from 'ypo-parser-common/text/line';
import TranslationId from 'ypo-parser-common/directives/translationid';
import Location from 'ypo-parser-common/location';
import ParseError from 'ypo-parser-common/exceptions';

import YpoLexer from '../src/lexer';

import {TEST_FILE} from './fixtures';


describe('YpoLexer',
function ()
{
    const cut = new YpoLexer();

    describe('#tokenize()',
    function ()
    {
        it('must return generator',
        function ()
        {
            const gen = cut.tokenize();
            gen.next.should.be.a('function');
        });

        it('must fail on file=undefined',
        function ()
        {
            function tc()
            {
                cut.tokenize().next();
            }
            tc.should.throw(TypeError, 'file must be a non empty string');
        });

        it('must fail on lines=undefined',
        function ()
        {
            function tc()
            {
                cut.tokenize(TEST_FILE).next();
            }
            tc.should.throw(TypeError, 'lines must be an iterable');
        });

        it('must fail on non generator lines',
        function ()
        {
            function tc()
            {
                cut.tokenize(TEST_FILE, {}).next();
            }
            tc.should.throw(TypeError, 'lines must be an iterable');
        });

        it('must stop iteration on empty iterable',
        function ()
        {
            cut.tokenize(TEST_FILE, []).next().should.deep.equal({
                value:undefined, done:true
            });
        });

        it('must fail on invalid input',
        function ()
        {
            const lines = [
                '#= invalid option'
            ];

            function tc()
            {
                /*eslint no-unused-vars:0*/
                for (const token of cut.tokenize(TEST_FILE, lines))
                {
                    throw new Error('failed to detect invalid input');
                }
            }
            tc.should.throw(ParseError, 'ParseError: syntax error');
        });

        describe(
        '#tokenize() must parse and return tokens in their original order',
        function ()
        {
            const testcases = [
                {line:'# comment', class:Comment,
                 location:new Location(TEST_FILE, 1)},
                {line:'#! tid', class:TranslationId,
                 location:new Location(TEST_FILE, 2)},
                {line:'text', class:Line,
                 location:new Location(TEST_FILE, 3)},
                {line:'', class:EmptyLine,
                 location:new Location(TEST_FILE, 4)},
                {line:'#@ context', class:Context,
                 location:new Location(TEST_FILE, 5)},
                {line:'#~ author', class:Authorship,
                 location:new Location(TEST_FILE, 6)},
                {line:'#= ns ui.config.general', class:Namespace,
                 location:new Location(TEST_FILE, 7)},
                {line:'#= lang en', class:Lang,
                 location:new Location(TEST_FILE, 8)},
                {line:'#+ inf', class:Plural,
                 location:new Location(TEST_FILE, 9)}
            ];

            const lines = testcases.map(
            function (item)
            {
                return item.line;
            });

            let itemno = 0;
            for (const token of cut.tokenize(TEST_FILE, lines))
            {
                const klass = testcases[itemno].class;
                const location = testcases[itemno].location;

                it(`token must be an instance of ${klass}`,
                function ()
                {
                    token.should.be.an.instanceof(klass);
                });

                it(`token must have expected location ${location}`,
                function ()
                {
                    token.location.should.deep.equal(location);
                });

                itemno++;
            }
        });
    });
});

