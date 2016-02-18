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


import {RULE_EMPTY_LINE} from '../src/rules';

import * as fixtures from './fixtures';


describe('RULE_EMPTY_LINE production rule',
function ()
{
    const rule = RULE_EMPTY_LINE;

    it('#groups must have the correct value',
    function ()
    {
        rule.groups.should.deep.equal([]);
    });

    describe('#regex',
    function ()
    {
        it('must match empty string',
        function ()
        {
            rule.regex.test(fixtures.EMPTY).should.be.ok;
        });

        it('must not match non empty string',
        function ()
        {
            rule.regex.test(fixtures.TEXT).should.not.be.ok;
        });
    });
});

