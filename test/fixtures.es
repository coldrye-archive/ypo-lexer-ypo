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


export const TEST_DIRECTIVE = 'test';


export const EMPTY = '';


export const TEXT = 'text w numb3rs';


export const LINE_CONTINUATION = 'text \\';


export const ESCAPED_DIRECTIVE = '\\# ' + TEST_DIRECTIVE;


export const DIRECTIVE = '# ' + TEST_DIRECTIVE;


export const DIRECTIVE_NO_WS = '#' + TEST_DIRECTIVE;


export const NOT_A_DIRECTIVE = ' # no directive just text';


export const WHITESPACE_PRESERVED = '   whitespace  must be preserved   ';


export const TEST_ID = 'tid';


export const TEST_ID_COMPLEX = '__tRan5.L_4T10n__';


export const TEST_ID_INVALID = '-1nv4l1D';


export const TID = '#! ' + TEST_ID;


export const TID_INVALID = '#! ' + TEST_ID_INVALID;


export const TID_NO_WS = '#!' + TEST_ID;


export const TID_COMPLEX = '#! ' + TEST_ID_COMPLEX;


export const EMPTY_COMMENT = '#';


export const COMMENT = '# ' + TEXT;


export const COMMENT_NO_WS = '#' + TEXT;


export const TEST_URL = 'http://example.org';


export const TEST_URL_SSL = 'https://example.org';


export const TEST_NAME = 'Au Thor';


export const TEST_ALIAS = 'thor';


export const TEST_EMAIL = 'thor@example.org';


export const TEST_FILE = 'test_file';

