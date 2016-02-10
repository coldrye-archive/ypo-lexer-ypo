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

import {
    DIRECTIVE_COMMENT, DIRECTIVE_AUTHORSHIP, DIRECTIVE_CONTEXT,
    DIRECTIVE_TRANSLATION_ID, DIRECTIVE_OPTION
} from 'ypo-parser-common/constants';

import {COMMENT} from '../src/constants';

import * as fixtures from './fixtures';


describe('COMMENT production rule',
function ()
{
    const rule = COMMENT;

    it('#groups must have the correct value',
    function ()
    {
        assert.deepEqual(['comment'], rule.groups);
    });

    describe('#regex',
    function ()
    {
        it('must match empty comment',
        function ()
        {
            assert.ok(rule.regex.test(fixtures.EMPTY_COMMENT));
        });

        it('must match comment',
        function ()
        {
            assert.ok(rule.regex.test(fixtures.COMMENT));
        });

        it('must match comment w/o whitespace',
        function ()
        {
            assert.ok(rule.regex.test(fixtures.COMMENT_NO_WS));
        });

        it('must not match other directives',
        function ()
        {
            assert.ok(!rule.regex.test(DIRECTIVE_AUTHORSHIP));
            assert.ok(!rule.regex.test(DIRECTIVE_OPTION));
            assert.ok(!rule.regex.test(DIRECTIVE_CONTEXT));
            assert.ok(!rule.regex.test(DIRECTIVE_TRANSLATION_ID));
        });

        it('must have the expected groups for non empty comments',
        function ()
        {
            const matches = rule.regex.exec(fixtures.COMMENT);
            assert.equal(2, matches.length);
            assert.equal(fixtures.TEXT, matches[1]);
        });

        it('must have the expected groups for empty comments',
        function ()
        {
            const matches = rule.regex.exec(fixtures.EMPTY_COMMENT);
            assert.equal(2, matches.length);
            assert.equal(fixtures.EMPTY, matches[1]);
        });
    });
});

