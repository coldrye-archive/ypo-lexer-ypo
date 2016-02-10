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

import {TRANSLATION_ID} from '../src/constants';

import * as fixtures from './fixtures';


describe('TRANSLATION_ID production rule',
function ()
{
    const rule = TRANSLATION_ID;

    it('#groups must have the correct value',
    function ()
    {
        assert.deepEqual(['id'], rule.groups);
    });

    describe('#regex',
    function ()
    {
        it('must match simple id',
        function ()
        {
            assert.ok(rule.regex.test(fixtures.TID));
        });

        it('must match simple id w/o whitespace',
        function ()
        {
            assert.ok(rule.regex.test(fixtures.TID_NO_WS));
        });

        it('must match complex id',
        function ()
        {
            assert.ok(rule.regex.test(fixtures.TID_COMPLEX));
        });

        it('must not match invalid id',
        function ()
        {
            assert.ok(!rule.regex.test(fixtures.TID_INVALID));
        });

        it('must have the expected groups',
        function ()
        {
            const matches = rule.regex.exec(fixtures.TID);
            assert.equal(2, matches.length);
            assert.equal(fixtures.TEST_ID, matches[1]);
        });
    });
});

