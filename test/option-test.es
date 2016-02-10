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

import {OPTION} from '../src/constants';

import {
    DIRECTIVE_OPTION, OPTION_LANG, OPTION_NS, OPTION_PLURAL
} from 'ypo-parser-common/constants';
import * as option from 'ypo-parser-common/option';
import ParseError from 'ypo-parser-common/exceptions';

import * as fixtures from './fixtures';


describe('OPTION production rule',
function ()
{
    const testcases = [
        {key:OPTION_LANG, value:'en'},
        {key:OPTION_LANG, value:'en-US'},
        {key:OPTION_NS, value:'ns'},
        {key:OPTION_NS, value:'camelCaSe'},
        {key:OPTION_PLURAL, value:undefined},
        {key:OPTION_PLURAL, value:'5'}
    ];

    const rule = OPTION;

    it('#groups must have the correct value',
    function ()
    {
        assert.deepEqual(rule.groups, ['key', 'value']);
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
            assert.ok(match);
        });

        it('must have 2 match groups',
        function ()
        {
            assert.equal(match.length - 1, 2);
        });

        it('key group must have the correct value',
        function ()
        {
            assert.equal(normalizeValue(match[1]), key);
        });

        it('value group must have the correct value',
        function ()
        {
            assert.equal(normalizeValue(match[2]), value);
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
           + key + (value ? ' "' + value + '"' : '') + '"';
}


function normalizeValue(value)
{
    return value == '' ? undefined : value;
}

