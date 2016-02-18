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


import * as option from 'ypo-parser-common/directives/option';

import {RULE_OPTION} from '../src/rules';


describe('RULE_OPTION production rule',
function ()
{
    const rule = RULE_OPTION;

    const testcases = [
        {key:option.OPTION_LANG, value:'en'},
        {key:option.OPTION_LANG, value:'en-US'},
        {key:option.OPTION_NS, value:'ns'},
        {key:option.OPTION_NS, value:'camelCaSe'}
    ];

    it('#groups must have the correct value',
    function ()
    {
        rule.groups.should.deep.equal(['key', 'value']);
    });

    describe('#regex',
    function ()
    {
        for (const tc of testcases)
        {
            basicOptionRegexpTests(rule.regex, tc);
            basicOptionRegexpTests(rule.regex, tc, false);
        }
    });
});


function basicOptionRegexpTests(regexp, fields, withLeadingSpace = true)
{
    const {key, value} = fields;

    const match = regexp.exec(buildDirective(withLeadingSpace, fields))

    describe(buildDescription(withLeadingSpace, fields),
    function ()
    {
        it('must have a match',
        function ()
        {
            should.exist(match);
        });

        it('must have 2 match groups',
        function ()
        {
            match.length.should.equal(3);
        });

        it('key group must have the correct value',
        function ()
        {
            match[1].should.equal(key);
        });

        it('value group must have the correct value',
        function ()
        {
            match[2].should.equal(value);
        });
    });
}


function buildDirective(withLeadingSpace, {key, value})
{
    return '#=' + (withLeadingSpace ? ' ' : '') + key
           + (value ? ' ' + value : '');
}


function buildDescription(withLeadingSpace, {key, value})
{
    return 'must match "#=' + (withLeadingSpace ? ' ' : '')
           + key + (value ? ' ' + value : '');
}

