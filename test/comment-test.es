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


import {DIRECTIVE_AUTHORSHIP} from 'ypo-parser-common/directives/authorship';
import {DIRECTIVE_CONTEXT} from 'ypo-parser-common/directives/context';
import {DIRECTIVE_OPTION} from 'ypo-parser-common/directives/option';
import {DIRECTIVE_PLURAL} from 'ypo-parser-common/directives/plural';
import
{
    DIRECTIVE_TRANSLATION_ID
} from 'ypo-parser-common/directives/translationid';

import {RULE_COMMENT} from '../src/rules';

import * as fixtures from './fixtures';


describe('RULE_COMMENT production rule',
function ()
{
    const rule = RULE_COMMENT;

    it('#groups must have the correct value',
    function ()
    {
        rule.groups.should.deep.equal(['value']);
    });

    describe('#regex',
    function ()
    {
        it('must match empty comment',
        function ()
        {
            rule.regex.test(fixtures.EMPTY_COMMENT).should.be.ok;
        });

        it('must match comment',
        function ()
        {
            rule.regex.test(fixtures.COMMENT).should.be.ok;
        });

        it('must match comment w/o whitespace',
        function ()
        {
            rule.regex.test(fixtures.COMMENT_NO_WS).should.be.ok;
        });

        it('must not match other directives',
        function ()
        {
            rule.regex.test(DIRECTIVE_AUTHORSHIP).should.not.be.ok;
            rule.regex.test(DIRECTIVE_CONTEXT).should.not.be.ok;
            rule.regex.test(DIRECTIVE_OPTION).should.not.be.ok;
            rule.regex.test(DIRECTIVE_PLURAL).should.not.be.ok;
            rule.regex.test(DIRECTIVE_TRANSLATION_ID).should.not.be.ok;
        });

        it('must have the expected groups for non empty comments',
        function ()
        {
            const matches = rule.regex.exec(fixtures.COMMENT);
            matches.length.should.equal(2);
            matches[1].should.equal(fixtures.TEXT);
        });

        it('must have the expected groups for empty comments',
        function ()
        {
            const matches = rule.regex.exec(fixtures.EMPTY_COMMENT);
            matches.length.should.equal(2);
            matches[1].should.equal(fixtures.EMPTY);
        });
    });
});

