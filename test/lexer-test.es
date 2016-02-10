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


import assert from 'esaver';

import {AbstractOption} from 'ypo-parser-common/option';
import Authorship from 'ypo-parser-common/authorship';
import Comment from 'ypo-parser-common/comment';
import EmptyLine from 'ypo-parser-common/emptyline';
import Text from 'ypo-parser-common/text';
import TranslationId from 'ypo-parser-common/translationid';
import Location from 'ypo-parser-common/location';
import ParseError from 'ypo-parser-common/exceptions';

import Lexer from '../src/lexer';
import {TOKENS} from '../src/lexer';

import {TEST_FILE} from './fixtures';


describe('Lexer',
function ()
{
    const cut = new Lexer();

    describe('#tokenize()',
    function ()
    {
        it('must return generator',
        function ()
        {
            const gen = cut.tokenize();
            assert.ok(typeof gen.next == 'function');
        });

        it('must fail on file=undefined',
        function ()
        {
            assert.throws(
            function ()
            {
                cut.tokenize().next();
            }, TypeError);
        });

        it('must fail on lines=undefined',
        function ()
        {
            assert.throws(
            function ()
            {
                cut.tokenize(TEST_FILE).next();
            }, TypeError);
        });

        it('must fail on non generator lines',
        function ()
        {
            assert.throws(
            function ()
            {
                cut.tokenize(TEST_FILE, {}).next();
            }, TypeError);
        });

        it('must stop iteration on empty iterable',
        function ()
        {
            assert.deepEqual(
                {value:null, done:true},
                cut.tokenize(TEST_FILE, []).next()
            );
        });

        it('must fail on invalid input',
        function ()
        {
            const lines = [
                '#=invalid option'
            ];

            assert.throws(
            function ()
            {
                for (const token of cut.tokenize(TEST_FILE, lines))
                {
                    assert.fail('failed to detect invalid input');
                }
            }, ParseError);
        });

        describe('must return tokens in their expected order',
        function ()
        {
            const testcases = [
                {line:'# comment', class:Comment,
                 location:new Location(TEST_FILE, 1)},
                {line:'#! tid', class:TranslationId,
                 location:new Location(TEST_FILE, 2)},
                {line:'text', class:Text,
                 location:new Location(TEST_FILE, 3)},
                {line:'', class:EmptyLine,
                 location:new Location(TEST_FILE, 4)},
                {line:'#~ author', class:Authorship,
                 location:new Location(TEST_FILE, 5)}
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
                it('instanceof ' + klass.name,
                function ()
                {
                    assert.ok(token instanceof klass);
                });

                it('location ' + location,
                function ()
                {
                    assert.deepEqual(location, token.location);
                });

                itemno++;
            }
        });
    });
});

