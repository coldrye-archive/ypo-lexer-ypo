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


import {AUTHORSHIP} from 'ypo-parser-common/directives/authorship';
import {OPTION_LANG, OPTION_NS} from 'ypo-parser-common/directives/option';
import {QNAME} from 'ypo-parser-common/directives/context';
import {CARDINALITY} from 'ypo-parser-common/directives/plural';


/**
 * @private
 */
// we must not validate email addresses or urls here
export const REGEXP_AUTHORSHIP = new RegExp('^#~' + AUTHORSHIP + '$');


/**
 * @private
 */
export const RULE_AUTHORSHIP =
{
    regex: REGEXP_AUTHORSHIP,
    groups: ['name', 'alias', 'email', 'url']
};


/**
 * @private
 */
export const REGEXP_COMMENT = /^#(?:[^!~=@+]\s*(.*))?$/;
//((?:(?:[^!~=@+]).*)?)$/;


/**
 * @private
 */
export const RULE_COMMENT =
{
    regex: REGEXP_COMMENT,
    groups: ['value']
};


/**
 * @private
 */
export const REGEXP_CONTEXT = new RegExp('^#@\\s?(' + QNAME + ')$');


/**
 * @private
 */
export const RULE_CONTEXT =
{
    regex: REGEXP_CONTEXT,
    groups: ['value']
};


/**
 * @private
 */
export const REGEXP_EMPTY_LINE = /^$/;


/**
 * @private
 */
export const RULE_EMPTY_LINE =
{
    regex: REGEXP_EMPTY_LINE,
    groups: []
};


/**
 * @private
 */
export const REGEXP_TRANSLATION_ID = new RegExp(
    '^#!\\s*(' + QNAME + ')\\s*$'
);


/**
 * @private
 */
export const RULE_TRANSLATION_ID =
{
    regex: REGEXP_TRANSLATION_ID,
    groups: ['value']
};


/**
 * @private
 */
export const REGEXP_OPTION = new RegExp(
    '^#=\\s*'
    // key
    + '('
    + [OPTION_LANG, OPTION_NS].join('|')
    + ')'
    // optional value will be validated later on
    + '(?:\\s+([^\\s]+))?'
    + '\\s*$'
);


/**
 * @private
 */
export const RULE_OPTION =
{
    regex: REGEXP_OPTION,
    groups: ['key', 'value']
};


/**
 * @private
 */
export const REGEXP_LINE = /^([^#].*)$/;


/**
 * @private
 */
export const RULE_LINE =
{
    regex: REGEXP_LINE,
    groups: ['value']
};


/**
 * @private
 */
export const REGEXP_PLURAL = new RegExp(
    `^#[+]\\s*(${CARDINALITY})\\s*$`
);


/**
 * @private
 */
export const RULE_PLURAL =
{
    regex: REGEXP_PLURAL,
    groups: ['value']
};

