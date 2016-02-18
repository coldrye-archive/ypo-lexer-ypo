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


import {RULE_PLURAL} from '../src/rules';


describe('RULE_PLURAL production rule',
function ()
{
    const rule = RULE_PLURAL;

    const testcases = [
        'inf', '-inf', '+inf'
    ];

    it('#groups must have the correct value',
    function ()
    {
        rule.groups.should.deep.equal(['value']);
    });

    describe('#regex',
    function ()
    {
        for (const tc of testcases)
        {
            basicPluralRegexpTests(rule.regex, tc);
            basicPluralRegexpTests(rule.regex, tc, false);
        }
    });
});


function basicPluralRegexpTests(regexp, value, withLeadingSpace = true)
{
    const match = regexp.exec(buildDirective(withLeadingSpace, {value}))

    describe(buildDescription(withLeadingSpace, {value}),
    function ()
    {
        it('must have a match',
        function ()
        {
            should.exist(match);
        });

        it('must have 1 match group',
        function ()
        {
            match.length.should.equal(2);
        });

        it('value group must have the correct value',
        function ()
        {
            match[1].should.equal(value);
        });
    });
}


function buildDirective(withLeadingSpace, {value})
{
    return '#+' + (withLeadingSpace ? ' ' : '')
           + (value ? ' ' + value : '');
}


function buildDescription(withLeadingSpace, {value})
{
    return 'must match "#+' + (withLeadingSpace ? ' ' : '')
           + (value ? ' ' + value : '');
}

