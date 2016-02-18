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


import {RULE_AUTHORSHIP} from '../src/rules';

import * as fixtures from './fixtures';


describe('AUTHORSHIP production rule',
function ()
{
    const rule = RULE_AUTHORSHIP;

    it('#groups must have the correct value',
    function ()
    {
        rule.groups.should.deep.equal(['name', 'alias', 'email', 'url']);
    });

    describe('#regex',
    function ()
    {
        const testcases = [
            {},
            {name:fixtures.TEST_NAME},
            {name:fixtures.TEST_NAME, alias:fixtures.TEST_ALIAS},
            {name:fixtures.TEST_NAME, alias:fixtures.TEST_ALIAS,
             email:fixtures.TEST_EMAIL},
            {name:fixtures.TEST_NAME, alias:fixtures.TEST_ALIAS,
             url:fixtures.TEST_URL},
            {name:fixtures.TEST_NAME, alias:fixtures.TEST_ALIAS,
             email:fixtures.TEST_EMAIL, url:fixtures.TEST_URL},
            {name:fixtures.TEST_NAME, alias:fixtures.TEST_ALIAS,
             email:fixtures.TEST_EMAIL, url:fixtures.TEST_URL_SSL},
            {name:fixtures.TEST_NAME, alias:fixtures.TEST_EMAIL},
            {name:fixtures.TEST_NAME, alias:fixtures.TEST_EMAIL,
             url:fixtures.TEST_URL},
            {name:fixtures.TEST_NAME, alias:fixtures.TEST_URL},
            {alias:fixtures.TEST_ALIAS},
            {alias:fixtures.TEST_ALIAS, email:fixtures.TEST_EMAIL},
            {alias:fixtures.TEST_ALIAS, email:fixtures.TEST_EMAIL,
             url:fixtures.TEST_URL},
            {alias:fixtures.TEST_ALIAS, url:fixtures.TEST_URL},
            {email:fixtures.TEST_EMAIL},
            {email:fixtures.TEST_EMAIL, url:fixtures.TEST_URL},
            {url:fixtures.TEST_URL}
        ];

        for (const tc of testcases)
        {
            basicAuthorshipRegexpTests(rule.regex, tc);
            basicAuthorshipRegexpTests(rule.regex, tc, false);
        }

        it('must not match malformed author info',
        function ()
        {
            should.not.exist(rule.regex.exec('#~ "alias'), 'malformed alias');
            should.not.exist(rule.regex.exec('#~ alias"'), 'malformed alias2');
            should.not.exist(rule.regex.exec('#~ <email'), 'malformed email');
            should.not.exist(rule.regex.exec('#~ email>)'), 'malformed email2');
            should.not.exist(rule.regex.exec('#~ (url'), 'malformed url');
            should.not.exist(rule.regex.exec('#~ url)'), 'malformed url2');
            should.not.exist(rule.regex.exec('#~ (scheme://url)'), 'unsupported scheme');
        });
    });
});


function basicAuthorshipRegexpTests(regexp, fields, withLeadingSpace = true)
{
    const {name, alias, email, url} = fields;

    const match = regexp.exec(buildDirective(
        withLeadingSpace, name, alias, email, url
    ));

    describe(buildDescription(withLeadingSpace, fields),
    function ()
    {
        it('must have a match',
        function ()
        {
            should.exist(match);
        });

        it('must have 4 match groups',
        function ()
        {
            match.length.should.equal(5);
        });

        if (match[1])
        {
            it('name group must have the correct value',
            function ()
            {
                match[1].should.equal(name);
            });
        }

        if (match[2])
        {
            it('alias group must have the correct value',
            function ()
            {
                match[2].should.equal(alias);
            });
        }

        if (match[3])
        {
            it('email group must have the correct value',
            function ()
            {
                match[3].should.equal(email);
            });
        }

        if (match[4])
        {
            it('url group must have the correct value',
            function ()
            {
                match[4].should.equal(url);
            });
        }
    });
}


function buildDirective(withLeadingSpace, name, alias, email, url)
{
    const components = [];

    if (name)
    {
        components.push(name);
    }
    if (alias)
    {
        components.push('"' + alias + '"');
    }
    if (email)
    {
        components.push('<' + email + '>');
    }
    if (url)
    {
        components.push('(' + url + ')');
    }

    return '#~' + (withLeadingSpace ? ' ' : '') + components.join(' ');
}


function buildDescription(withLeadingSpace, fields)
{
    return 'must match "#~' + (withLeadingSpace ? ' ' : '')
           + Object.keys(fields).join(' ') + '"';
}

