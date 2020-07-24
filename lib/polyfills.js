/* eslint no-extend-native: 0 */
/* Polyfill needed to get Axios promise working on old browsers */
import includes from 'core-js/library/fn/string/virtual/includes';
import repeat from 'core-js/library/fn/string/virtual/repeat';
import 'core-js/fn/object/assign';
import 'core-js/fn/promise';

String.prototype.includes = includes;
String.prototype.repeat = repeat;
