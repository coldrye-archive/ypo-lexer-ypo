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


import {RULE_TEXT} from '../src/rules';

import * as fixtures from './fixtures';


describe('TEXT production rule',
function ()
{
    const rule = RULE_TEXT;

    it('#groups must have the correct value',
    function ()
    {
        rule.groups.should.deep.equal(['value']);
    });

    describe('#regex',
    function ()
    {
        const testcases = [
            fixtures.TEXT, fixtures.LINE_CONTINUATION, fixtures.NOT_A_DIRECTIVE,
            fixtures.ESCAPED_DIRECTIVE, fixtures.WHITESPACE_PRESERVED
        ];

        for (const tc of testcases)
        {
            basicRegexpTests(rule, tc);
        }

        const negcases = [
            fixtures.EMPTY, fixtures.DIRECTIVE_NO_WS, fixtures.DIRECTIVE
        ];

        for (const tc of negcases)
        {
            basicRegexpTests(rule, tc, false);
        }
    });
});


function basicRegexpTests(rule, tc, mustMatch = true)
{
    describe('on "' + tc + '"',
    function ()
    {
        const matches = rule.regex.exec(tc);

        it('must ' + (mustMatch ? '' : 'not ') + 'match',
        function ()
        {
            if (mustMatch)
            {
                matches.should.be.ok;
            }
            else
            {
                should.not.exist(matches);
            }
        });

        if (mustMatch)
        {
            it('must have the expected number of match groups',
            function ()
            {
                matches.length.should.equal(rule.groups.length + 1);
            });

            it('match must be equal to input',
            function ()
            {
                matches[1].should.equal(tc);
            });
        }
    });
}

