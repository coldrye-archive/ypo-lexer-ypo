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


import {RULE_TRANSLATION_ID} from '../src/rules';

import * as fixtures from './fixtures';


describe('RULE_TRANSLATION_ID production rule',
function ()
{
    const rule = RULE_TRANSLATION_ID;

    it('#groups must have the correct value',
    function ()
    {
        rule.groups.should.deep.equal(['value']);
    });

    describe('#regex',
    function ()
    {
        it('must match simple id',
        function ()
        {
            rule.regex.test(fixtures.TID).should.be.ok;
        });

        it('must match simple id w/o whitespace',
        function ()
        {
            rule.regex.test(fixtures.TID_NO_WS).should.be.ok;
        });

        it('must not match complex id',
        function ()
        {
            rule.regex.test(fixtures.TID_COMPLEX).should.not.be.ok;
        });

        it('must not match invalid id',
        function ()
        {
            rule.regex.test(fixtures.TID_INVALID).should.not.be.ok;
        });

        it('must have the expected groups',
        function ()
        {
            const matches = rule.regex.exec(fixtures.TID);
            matches.length.should.equal(2);
            matches[1].should.equal(fixtures.TEST_ID);
        });
    });
});

