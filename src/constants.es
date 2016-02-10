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


import {
    OPTION_LANG, OPTION_NS, OPTION_PLURAL
} from 'ypo-parser-common/constants';


/**
 * @private
 */
// we must not validate email addresses or urls here
export const REGEXP_AUTHORSHIP = new RegExp(
    '^#~'
    // name
    + '\\s*((?:[^\\s"\'<(>)]+(?:\\s[^\\s"\'<(>)]+)*)?)'
    // alias
    + '\\s*(?:["\']((?:[^"]+)?)["\'])?'
    // email address
    + '\\s*(?:[<]((?:[^@]+@[^>]+)?)[>])?'
    // url/homepage
    + '\\s*(?:[(]((?:http[s]?://[^\\s]+)?)[)])?'
    + '$'
);


/**
 * @private
 */
export const AUTHORSHIP =
{
    regex: REGEXP_AUTHORSHIP,
    groups: ['name', 'alias', 'email', 'url']
};


/**
 * @private
 */
export const REGEXP_COMMENT = /^#\s?((?:(?:[^!~=@]).*)?)$/;


/**
 * @private
 */
export const COMMENT =
{
    regex: REGEXP_COMMENT,
    groups: ['comment']
};


/**
 * @private
 */
export const REGEXP_EMPTY_LINE = /^$/;


/**
 * @private
 */
export const EMPTY_LINE =
{
    regex: REGEXP_EMPTY_LINE,
    groups: []
};


/**
 * @private
 */
export const REGEXP_TRANSLATION_ID = new RegExp(
    // id
    '^#!\\s*([a-zA-Z_0-9$]+(?:[.][a-zA-Z_0-9$]+)*)'
);


/**
 * @private
 */
export const TRANSLATION_ID =
{
    regex: REGEXP_TRANSLATION_ID,
    groups: ['id']
};


/**
 * @private
 */
export const REGEXP_OPTION = new RegExp(
    '^#=\\s*'
    // key
    + '('
    + [OPTION_LANG, OPTION_NS, OPTION_PLURAL].join('|')
    + ')'
    // optional value will be validated later on
    + '(?:\\s+([^\\s]+))?'
    + '\\s*$'
);


/**
 * @private
 */
export const OPTION =
{
    regex: REGEXP_OPTION,
    groups: ['key', 'value']
};


/**
 * @private
 */
export const REGEXP_TEXT = /^((?:[\\]#)?[^#].*[\\]?)$/;


/**
 * @private
 */
export const TEXT =
{
    regex: REGEXP_TEXT,
    groups: ['text']
};

