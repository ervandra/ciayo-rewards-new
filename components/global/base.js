import { css } from 'styled-components';

const sizes = {
  xlarge: 1280,
  desktop: 1024,
  tablet: 768,
  mobile: 360,
};

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

const base = css`
  @-webkit-keyframes ci-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }
  @keyframes ci-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }
  @-webkit-keyframes shake {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    50% {
      -webkit-transform: translateX(5px);
      transform: translateX(5px);
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }
  @keyframes shake {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    50% {
      -webkit-transform: translateX(5px);
      transform: translateX(5px);
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }
  @-webkit-keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
    }
  }

  .ci-spin {
    -webkit-animation: ci-spin 1s infinite linear;
    animation: ci-spin 1s infinite linear;
  }

  html {
    line-height: 1.5;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  body {
    margin: 0;
  }
  article,
  aside,
  footer,
  header,
  nav,
  section {
    display: block;
  }
  figcaption,
  figure {
    display: block;
  }
  figure {
    margin: 1em 40px;
  }
  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }
  main {
    display: block;
  }
  pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }
  a {
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
  }
  a:active,
  a:hover {
    outline-width: 0;
  }
  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
  }
  b,
  strong {
    font-weight: inherit;
  }
  b,
  strong {
    font-weight: bolder;
  }
  code,
  kbd,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }
  dfn {
    font-style: italic;
  }
  mark {
    background-color: #ff0;
    color: rgba(0, 0, 0, 0.89);
  }
  small {
    font-size: 80%;
  }
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  audio,
  video {
    display: inline-block;
  }
  audio:not([controls]) {
    display: none;
    height: 0;
  }
  img {
    border-style: none;
  }
  svg:not(:root) {
    overflow: hidden;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    font-size: 100%;
    line-height: 1.5;
    margin: 0;
  }
  button {
    overflow: visible;
  }
  button,
  select {
    text-transform: none;
  }
  [type='reset'],
  [type='submit'],
  button,
  html [type='button'] {
    -webkit-appearance: button;
  }
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner,
  button::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  [type='button']:-moz-focusring,
  [type='reset']:-moz-focusring,
  [type='submit']:-moz-focusring,
  button:-moz-focusring {
    outline: 1px dotted ButtonText;
  }
  input {
    overflow: visible;
  }
  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box;
    padding: 0;
  }
  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }
  [type='search'] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }
  [type='search']::-webkit-search-cancel-button,
  [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }
  fieldset {
    border: 2px solid silver;
    margin: 0 0 1rem;
    padding: 0.5em 0.75em 0.75em;
  }
  legend {
    box-sizing: border-box;
    display: table;
    max-width: 100%;
    padding: 0;
    color: inherit;
    white-space: normal;
  }
  progress {
    display: inline-block;
    vertical-align: baseline;
  }
  textarea {
    overflow: auto;
  }
  details {
    display: block;
  }
  summary {
    display: list-item;
  }
  menu {
    display: block;
  }
  canvas {
    display: inline-block;
  }
  template {
    display: none;
  }
  [hidden] {
    display: none;
  }
  html {
    box-sizing: border-box;
    font-size: 100%;
  }
  *,
  ::after,
  ::before {
    box-sizing: inherit;
  }
  body {
    margin: 0;
    padding: 0;
    background: rgba(255, 255, 255, 0.54);
    font-family: 'roboto', 'Proxima Nova Soft', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.54);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  img {
    display: inline-block;
    vertical-align: middle;
    max-width: 100%;
    height: auto;
    -ms-interpolation-mode: bicubic;
  }
  textarea {
    height: auto;
    min-height: 50px;
    border-radius: 0px;
  }
  select {
    box-sizing: border-box;
    width: 100%;
    border-radius: 0px;
  }
  .map_canvas embed,
  .map_canvas img,
  .map_canvas object,
  .mqa-display embed,
  .mqa-display img,
  .mqa-display object {
    max-width: none !important;
  }
  button {
    padding: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0;
    border-radius: 0px;
    background: 0 0;
    line-height: 1;
    cursor: auto;
  }
  [data-whatinput='mouse'] button {
    outline: 0;
  }
  pre {
    overflow: auto;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
  }
  .is-visible {
    display: block !important;
  }
  .is-hidden {
    display: none !important;
  }
  blockquote,
  dd,
  div,
  dl,
  dt,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  li,
  ol,
  p,
  pre,
  td,
  th,
  ul {
    margin: 0;
    padding: 0;
  }
  p {
    margin-bottom: 1.5rem;
    font-size: inherit;
    line-height: 1.6;
    text-rendering: optimizeLegibility;
  }
  em,
  i {
    font-style: italic;
    line-height: inherit;
  }
  b,
  strong {
    font-weight: 700;
    line-height: inherit;
  }
  small {
    font-size: 80%;
    line-height: inherit;
  }
  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'roboto', 'Proxima Nova Soft', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
    font-style: normal;
    font-weight: 400;
    color: inherit;
    text-rendering: optimizeLegibility;
    line-height: 1.5;
    margin: 0 0 0.75rem;
  }
  .h1 small,
  .h2 small,
  .h3 small,
  .h4 small,
  .h5 small,
  .h6 small,
  h1 small,
  h2 small,
  h3 small,
  h4 small,
  h5 small,
  h6 small {
    line-height: 0;
    color: rgba(0, 0, 0, 0.38);
  }
  .h1,
  h1 {
    font-size: 1.25rem;
  }
  .h2,
  h2 {
    font-size: 1.125rem;
  }
  .h3,
  h3 {
    font-size: 1.0625rem;
  }
  .h4,
  h4 {
    font-size: 1rem;
  }
  .h5,
  h5 {
    font-size: 0.9375rem;
  }
  .h6,
  h6 {
    font-size: 0.875rem;
  }
  @media print, screen and (min-width: 48rem) {
    .h1,
    h1 {
      font-size: 1.5rem;
    }
    .h2,
    h2 {
      font-size: 1.375rem;
    }
    .h3,
    h3 {
      font-size: 1.25rem;
    }
    .h4,
    h4 {
      font-size: 1.125rem;
    }
    .h5,
    h5 {
      font-size: 1.0625rem;
    }
    .h6,
    h6 {
      font-size: 1rem;
    }
  }
  a {
    line-height: inherit;
    color: rgba(0, 0, 0, 0.54);
    text-decoration: none;
    cursor: pointer;
  }
  a:focus,
  a:hover {
    color: rgba(0, 0, 0, 0.89);
  }
  a img {
    border: 0;
  }
  hr {
    clear: both;
    max-width: 76.5rem;
    height: 0;
    margin: 1.5rem auto;
    border-top: 0;
    border-right: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    border-left: 0;
  }
  dl,
  ol,
  ul {
    margin-bottom: 1.5rem;
    list-style-position: outside;
    line-height: 1.5;
  }
  li {
    font-size: inherit;
  }
  ul {
    margin-left: 1.5rem;
    list-style-type: disc;
  }
  ol {
    margin-left: 1.5rem;
  }
  ol ol,
  ol ul,
  ul ol,
  ul ul {
    margin-left: 1.5rem;
    margin-bottom: 0;
  }
  dl {
    margin-bottom: 1.5rem;
  }
  dl dt {
    margin-bottom: 0.3rem;
    font-weight: 700;
  }
  blockquote {
    margin: 0 0 1.5rem;
    padding: 0.75rem 1.5rem 0 1.5rem;
    border-left: 1px solid rgba(0, 0, 0, 0.54);
  }
  blockquote,
  blockquote p {
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.54);
  }
  cite {
    display: block;
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.54);
  }
  cite:before {
    content: '— ';
  }
  abbr,
  abbr[title] {
    border-bottom: 1px dotted rgba(0, 0, 0, 0.54);
    cursor: help;
    text-decoration: none;
  }
  figure {
    margin: 0;
  }
  code {
    padding: 0.125rem 0.3125rem 0.0625rem;
    border: 1px solid rgba(0, 0, 0, 0.54);
    background-color: #f7f7f7;
    font-family: Consolas, 'Liberation Mono', Courier, monospace;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.54);
  }
  kbd {
    margin: 0;
    padding: 0.125rem 0.25rem 0;
    background-color: #f7f7f7;
    font-family: Consolas, 'Liberation Mono', Courier, monospace;
    color: rgba(0, 0, 0, 0.54);
    border-radius: 4px;
  }
  ol.no-bullet,
  ul.no-bullet {
    margin-left: 0;
    list-style: none;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .text-center {
    text-align: center;
  }
  .text-justify {
    text-align: justify;
  }
  @media print, screen and (min-width: 48rem) {
    .medium-text-left {
      text-align: left;
    }
    .medium-text-right {
      text-align: right;
    }
    .medium-text-center {
      text-align: center;
    }
    .medium-text-justify {
      text-align: justify;
    }
  }
  @media print, screen and (min-width: 64rem) {
    .large-text-left {
      text-align: left;
    }
    .large-text-right {
      text-align: right;
    }
    .large-text-center {
      text-align: center;
    }
    .large-text-justify {
      text-align: justify;
    }
  }
  .show-for-print {
    display: none !important;
  }
  @media print {
    * {
      background: 0 0 !important;
      box-shadow: none !important;
      color: rgba(0, 0, 0, 0.89) !important;
      text-shadow: none !important;
    }
    .show-for-print {
      display: block !important;
    }
    .hide-for-print {
      display: none !important;
    }
    a,
    a:visited {
      text-decoration: underline;
    }
    a[href]:after {
      content: ' (' attr(href) ')';
    }
    blockquote,
    pre {
      border: 1px solid rgba(255, 255, 255, 0.54);
      page-break-inside: avoid;
    }
    thead {
      display: table-header-group;
    }
    img,
    tr {
      page-break-inside: avoid;
    }
    img {
      max-width: 100% !important;
    }
    @page {
      margin: 0.5cm;
    }
    h2,
    h3,
    p {
      orphans: 3;
      widows: 3;
    }
    h2,
    h3 {
      page-break-after: avoid;
    }
    .print-break-inside {
      page-break-inside: auto;
    }
  }
  [type='color'],
  [type='date'],
  [type='datetime-local'],
  [type='datetime'],
  [type='email'],
  [type='month'],
  [type='number'],
  [type='password'],
  [type='search'],
  [type='tel'],
  [type='text'],
  [type='time'],
  [type='url'],
  [type='week'],
  textarea {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 2.5rem;
    margin: 0 0 1.5rem;
    padding: 0 0.75rem;
    border: 1px solid rgba(0, 0, 0, 0.54);
    border-radius: 0px;
    background-color: rgba(255, 255, 255, 0.54);
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    line-height: 2.5rem;
    color: rgba(0, 0, 0, 0.54);
    transition: box-shadow 0.6s, border-color 0.3s ease-in-out;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  [type='color']:focus,
  [type='date']:focus,
  [type='datetime-local']:focus,
  [type='datetime']:focus,
  [type='email']:focus,
  [type='month']:focus,
  [type='number']:focus,
  [type='password']:focus,
  [type='search']:focus,
  [type='tel']:focus,
  [type='text']:focus,
  [type='time']:focus,
  [type='url']:focus,
  [type='week']:focus,
  textarea:focus {
    outline: 0;
    border: 1px solid rgba(255, 255, 255, 0.54);
    background-color: rgba(255, 255, 255, 0.54);
    transition: box-shadow 0.6s, border-color 0.3s ease-in-out;
  }
  textarea {
    max-width: 100%;
  }
  textarea[rows] {
    height: auto;
  }
  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    color: rgba(0, 0, 0, 0.54);
  }
  input::-moz-placeholder,
  textarea::-moz-placeholder {
    color: rgba(0, 0, 0, 0.54);
  }
  input:-ms-input-placeholder,
  textarea:-ms-input-placeholder {
    color: rgba(0, 0, 0, 0.54);
  }
  input::placeholder,
  textarea::placeholder {
    color: rgba(0, 0, 0, 0.54);
  }
  input:disabled,
  input[readonly],
  textarea:disabled,
  textarea[readonly] {
    cursor: not-allowed;
  }
  [type='button'],
  [type='submit'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0px;
  }
  input[type='search'] {
    box-sizing: border-box;
  }
  [type='checkbox'],
  [type='file'],
  [type='radio'] {
    margin: 0 0 1.5rem;
  }
  [type='checkbox'] + label,
  [type='radio'] + label {
    display: inline-block;
    vertical-align: baseline;
    margin-left: 0.75rem;
    margin-right: 1.5rem;
    margin-bottom: 0;
  }
  [type='checkbox'] + label[for],
  [type='radio'] + label[for] {
    cursor: pointer;
  }
  label > [type='checkbox'],
  label > [type='radio'] {
    margin-right: 0.75rem;
  }
  [type='file'] {
    width: 100%;
  }
  label {
    display: block;
    margin: 0;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.54);
  }
  .help-text {
    margin-top: -0.75rem;
    font-size: 0.8125rem;
    font-style: italic;
    color: rgba(0, 0, 0, 0.54);
  }
  select {
    height: 2.5rem;
    margin: 0 0 1.5rem;
    padding: 0.75rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 1px solid rgba(0, 0, 0, 0.54);
    border-radius: 0;
    background-color: rgba(255, 255, 255, 0.54);
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    line-height: 2.5rem;
    color: rgba(0, 0, 0, 0.54);
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='32' height='24' viewBox='0 0 32 24'><polygon points='0,0 32,0 16,24' style='fill: rgb%28138, 138, 138%29'></polygon></svg>");
    background-origin: content-box;
    background-position: right -1rem center;
    background-repeat: no-repeat;
    background-size: 9px 6px;
    padding-right: 2.25rem;
    transition: box-shadow 0.6s, border-color 0.3s;
  }
  @media screen and (min-width: 0\0) {
    select {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAIpJREFUeNrEkckNgDAMBBfRkEt0ObRBBdsGXUDgmQfK4XhH2m8czQAAy27R3tsw4Qfe2x8uOO6oYLb6GlOor3GF+swURAOmUJ+RwtEJs9WvTGEYxBXqI1MQAZhCfUQKRzDMVj+TwrAIV6jvSUEkYAr1LSkcyTBb/V+KYfX7xAeusq3sLDtGH3kEGACPWIflNZfhRQAAAABJRU5ErkJggg==);
    }
  }
  select:focus {
    outline: 0;
    border: 1px solid rgba(255, 255, 255, 0.54);
    background-color: rgba(255, 255, 255, 0.54);
    transition: box-shadow 0.6s, border-color 0.3s ease;
  }
  select:disabled {
    background-color: #f7f7f7;
    cursor: not-allowed;
  }
  select::-ms-expand {
    display: none;
  }
  select[multiple] {
    height: auto;
    background-image: none;
  }
  .is-invalid-input:not(:focus) {
    border-color: #ea635e;
    background-color: #f8e6e7;
  }
  .is-invalid-input:not(:focus)::-webkit-input-placeholder {
    color: #ea635e;
  }
  .is-invalid-input:not(:focus)::-moz-placeholder {
    color: #ea635e;
  }
  .is-invalid-input:not(:focus):-ms-input-placeholder {
    color: #ea635e;
  }
  .is-invalid-input:not(:focus)::placeholder {
    color: #ea635e;
  }
  .is-invalid-label {
    color: #ea635e;
  }
  .button {
    display: inline-block;
    vertical-align: middle;
    margin: 0 0 1.5rem 0;
    font-family: inherit;
    padding: 0.375rem 0.75rem;
    -webkit-appearance: none;
    border: 1px solid transparent;
    border-radius: 4px;
    transition: background-color 0.1s ease, color 0.1s ease;
    font-size: 1rem;
    line-height: 1.5;
    text-align: center;
    cursor: pointer;
    background-color: #df6e22;
    color: rgba(255, 255, 255, 1);
    outline: none !important;
  }
  [data-whatinput='mouse'] .button {
    outline: 0;
  }
  .button:focus,
  .button:hover {
    background-color: #c9590d;
    color: rgba(255, 255, 255, 1);
  }
  .button.tiny {
    font-size: 0.625rem;
  }
  .button.small {
    font-size: 0.75rem;
  }
  .button.large {
    font-size: 1.25rem;
  }
  .button.expanded {
    display: block;
    width: 100%;
    margin-right: 0;
    margin-left: 0;
  }
  .button.primary {
    background-color: #df6e22;
    color: rgba(255, 255, 255, 1);
  }
  .button.primary:focus,
  .button.primary:hover {
    background-color: #c9590d;
    color: rgba(255, 255, 255, 1);
  }
  .button.secondary {
    background-color: #cccccc;
    color: rgba(255, 255, 255, 1);
  }
  .button.secondary:focus,
  .button.secondary:hover {
    background-color: #bababa;
    color: rgba(255, 255, 255, 1);
  }
  .button.alert {
    background-color: #ea635e;
    color: rgba(255, 255, 255, 1);
  }
  .button.alert:focus,
  .button.alert:hover {
    background-color: #e04e49;
    color: rgba(255, 255, 255, 1);
  }
  .button.success {
    background-color: #61d800;
    color: rgba(255, 255, 255, 1);
  }
  .button.success:focus,
  .button.success:hover {
    background-color: #09af00;
    color: rgba(255, 255, 255, 1);
  }
  .button.warning {
    background-color: #f8a832;
    color: rgba(255, 255, 255, 1);
  }
  .button.warning:focus,
  .button.warning:hover {
    background-color: #cc8b00;
    color: rgba(255, 255, 255, 1);
  }
  .button.disabled,
  .button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .button.disabled,
  .button.disabled:focus,
  .button.disabled:hover,
  .button[disabled],
  .button[disabled]:focus,
  .button[disabled]:hover {
    background-color: #cccccc;
    color: rgba(255, 255, 255, 1);
  }
  .button.disabled.primary,
  .button[disabled].primary {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .button.disabled.primary,
  .button.disabled.primary:focus,
  .button.disabled.primary:hover,
  .button[disabled].primary,
  .button[disabled].primary:focus,
  .button[disabled].primary:hover {
    background-color: #df6e22;
    color: rgba(255, 255, 255, 1);
  }
  .button.disabled.secondary,
  .button[disabled].secondary {
    cursor: not-allowed;
  }
  .button.disabled.secondary,
  .button.disabled.secondary:focus,
  .button.disabled.secondary:hover,
  .button[disabled].secondary,
  .button[disabled].secondary:focus,
  .button[disabled].secondary:hover {
    background-color: #cccccc;
    color: rgba(255, 255, 255, 1);
  }
  .button.disabled.alert,
  .button[disabled].alert {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .button.disabled.alert,
  .button.disabled.alert:focus,
  .button.disabled.alert:hover,
  .button[disabled].alert,
  .button[disabled].alert:focus,
  .button[disabled].alert:hover {
    background-color: #ea635e;
    color: rgba(255, 255, 255, 1);
  }
  .button.disabled.success,
  .button[disabled].success {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .button.disabled.success,
  .button.disabled.success:focus,
  .button.disabled.success:hover,
  .button[disabled].success,
  .button[disabled].success:focus,
  .button[disabled].success:hover {
    background-color: #a0f93f;
    color: rgba(255, 255, 255, 1);
  }
  .button.disabled.warning,
  .button[disabled].warning {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .button.disabled.warning,
  .button.disabled.warning:focus,
  .button.disabled.warning:hover,
  .button[disabled].warning,
  .button[disabled].warning:focus,
  .button[disabled].warning:hover {
    background-color: #f8a832;
    color: rgba(255, 255, 255, 1);
  }
  .button.hollow-trivia {
    border: 2px solid #222;
    color: #222;
  }
  .button.hollow-trivia,
  .button.hollow-trivia:focus,
  .button.hollow-trivia:hover {
    background-color: #fff;
  }
  .button.hollow {
    border: 2px solid #df6e22;
    color: #df6e22;
  }
  .button.hollow,
  .button.hollow:focus,
  .button.hollow:hover {
    background-color: #fff;
  }
  .button.hollow.disabled,
  .button.hollow.disabled:focus,
  .button.hollow.disabled:hover,
  .button.hollow[disabled],
  .button.hollow[disabled]:focus,
  .button.hollow[disabled]:hover {
    background-color: #fff;
  }
  .button.hollow:focus,
  .button.hollow:hover {
    border-color: #c9590d;
    color: #c9590d;
  }
  .button.hollow:focus.disabled,
  .button.hollow:focus[disabled],
  .button.hollow:hover.disabled,
  .button.hollow:hover[disabled] {
    border: 2px solid #df6e22;
    color: #df6e22;
  }
  .button.hollow.primary {
    border: 1px solid #df6e22;
    color: #df6e22;
  }
  .button.hollow.primary:focus,
  .button.hollow.primary:hover {
    border-color: #c9590d;
    color: #c9590d;
  }
  .button.hollow.primary:focus.disabled,
  .button.hollow.primary:focus[disabled],
  .button.hollow.primary:hover.disabled,
  .button.hollow.primary:hover[disabled] {
    border: 2px solid #df6e22;
    color: #df6e22;
  }
  .button.hollow.secondary {
    border: 2px solid rgba(0, 0, 0, 0.54);
    color: rgba(0, 0, 0, 0.54);
  }
  .button.hollow.secondary:focus,
  .button.hollow.secondary:hover {
    border-color: rgba(0, 0, 0, 0.89);
    color: rgba(0, 0, 0, 0.89);
  }
  .button.hollow.secondary:focus.disabled,
  .button.hollow.secondary:focus[disabled],
  .button.hollow.secondary:hover.disabled,
  .button.hollow.secondary:hover[disabled] {
    border: 2px solid #cccccc;
    color: #cccccc;
  }
  .button.hollow.alert {
    border: 2px solid #ea635e;
    color: #ea635e;
  }
  .button.hollow.alert:focus,
  .button.hollow.alert:hover {
    border-color: #63080a;
    color: #63080a;
  }
  .button.hollow.alert:focus.disabled,
  .button.hollow.alert:focus[disabled],
  .button.hollow.alert:hover.disabled,
  .button.hollow.alert:hover[disabled] {
    border: 2px solid #ea635e;
    color: #ea635e;
  }
  .button.hollow.success {
    border: 2px solid #a0f93f;
    color: #a0f93f;
  }
  .button.hollow.success:focus,
  .button.hollow.success:hover {
    border-color: #8de42e;
    color: #8de42e;
  }
  .button.hollow.success:focus.disabled,
  .button.hollow.success:focus[disabled],
  .button.hollow.success:hover.disabled,
  .button.hollow.success:hover[disabled] {
    border: 2px solid #a0f93f;
    color: #a0f93f;
  }
  .button.hollow.warning {
    border: 2px solid #f8a832;
    color: #f8a832;
  }
  .button.hollow.warning:focus,
  .button.hollow.warning:hover {
    border-color: #dd901f;
    color: #dd901f;
  }
  .button.hollow.warning:focus.disabled,
  .button.hollow.warning:focus[disabled],
  .button.hollow.warning:hover.disabled,
  .button.hollow.warning:hover[disabled] {
    border: 2px solid #f8a832;
    color: #f8a832;
  }
  .button.dropdown::after {
    display: block;
    width: 0;
    height: 0;
    border: inset 0.4em;
    content: '';
    border-bottom-width: 0;
    border-top-style: solid;
    border-color: rgba(255, 255, 255, 0.54) transparent transparent;
    position: relative;
    top: 0.4em;
    display: inline-block;
    margin-left: 1em;
  }
  .button.dropdown.hollow::after {
    border-top-color: #df6e22;
  }
  .button.dropdown.hollow.primary::after {
    border-top-color: #df6e22;
  }
  .button.dropdown.hollow.secondary::after {
    border-top-color: #cccccc;
  }
  .button.dropdown.hollow.alert::after {
    border-top-color: #ea635e;
  }
  .button.dropdown.hollow.success::after {
    border-top-color: #a0f93f;
  }
  .button.dropdown.hollow.warning::after {
    border-top-color: #f8a832;
  }
  .button.arrow-only::after {
    top: -0.1em;
    float: none;
    margin-left: 0;
  }
  a.button:focus,
  a.button:hover {
    text-decoration: none;
  }

  .grid-container {
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    max-width: 76.5rem;
    margin: 0 auto;
  }
  .grid-container.fluid {
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    max-width: 100%;
    margin: 0 auto;
  }
  .grid-container.full {
    padding-right: 0;
    padding-left: 0;
    max-width: 100%;
    margin: 0 auto;
  }
  .grid-x {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
  }
  .cell {
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    min-height: 0;
    min-width: 0;
    width: 100%;
  }
  .cell.auto {
    -ms-flex: 1 1 0px;
    flex: 1 1 0px;
  }
  .cell.shrink {
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
  }
  .grid-x > .auto {
    width: auto;
  }
  .grid-x > .shrink {
    width: auto;
  }
  .grid-x > .small-1,
  .grid-x > .small-10,
  .grid-x > .small-11,
  .grid-x > .small-12,
  .grid-x > .small-2,
  .grid-x > .small-3,
  .grid-x > .small-4,
  .grid-x > .small-5,
  .grid-x > .small-6,
  .grid-x > .small-7,
  .grid-x > .small-8,
  .grid-x > .small-9,
  .grid-x > .small-full,
  .grid-x > .small-shrink {
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
  }
  @media print, screen and (min-width: 48rem) {
    .grid-x > .medium-1,
    .grid-x > .medium-10,
    .grid-x > .medium-11,
    .grid-x > .medium-12,
    .grid-x > .medium-2,
    .grid-x > .medium-3,
    .grid-x > .medium-4,
    .grid-x > .medium-5,
    .grid-x > .medium-6,
    .grid-x > .medium-7,
    .grid-x > .medium-8,
    .grid-x > .medium-9,
    .grid-x > .medium-full,
    .grid-x > .medium-shrink {
      -ms-flex-preferred-size: auto;
      flex-basis: auto;
    }
  }
  @media print, screen and (min-width: 64rem) {
    .grid-x > .large-1,
    .grid-x > .large-10,
    .grid-x > .large-11,
    .grid-x > .large-12,
    .grid-x > .large-2,
    .grid-x > .large-3,
    .grid-x > .large-4,
    .grid-x > .large-5,
    .grid-x > .large-6,
    .grid-x > .large-7,
    .grid-x > .large-8,
    .grid-x > .large-9,
    .grid-x > .large-full,
    .grid-x > .large-shrink {
      -ms-flex-preferred-size: auto;
      flex-basis: auto;
    }
  }
  .grid-x > .small-1 {
    width: 8.33333%;
  }
  .grid-x > .small-2 {
    width: 16.66667%;
  }
  .grid-x > .small-3 {
    width: 25%;
  }
  .grid-x > .small-4 {
    width: 33.33333%;
  }
  .grid-x > .small-5 {
    width: 41.66667%;
  }
  .grid-x > .small-6 {
    width: 50%;
  }
  .grid-x > .small-7 {
    width: 58.33333%;
  }
  .grid-x > .small-8 {
    width: 66.66667%;
  }
  .grid-x > .small-9 {
    width: 75%;
  }
  .grid-x > .small-10 {
    width: 83.33333%;
  }
  .grid-x > .small-11 {
    width: 91.66667%;
  }
  .grid-x > .small-12 {
    width: 100%;
  }
  @media print, screen and (min-width: 48rem) {
    .grid-x > .medium-auto {
      -ms-flex: 1 1 0px;
      flex: 1 1 0px;
      width: auto;
    }
    .grid-x > .medium-shrink {
      -ms-flex: 0 0 auto;
      flex: 0 0 auto;
      width: auto;
    }
    .grid-x > .medium-1 {
      width: 8.33333%;
    }
    .grid-x > .medium-2 {
      width: 16.66667%;
    }
    .grid-x > .medium-3 {
      width: 25%;
    }
    .grid-x > .medium-4 {
      width: 33.33333%;
    }
    .grid-x > .medium-5 {
      width: 41.66667%;
    }
    .grid-x > .medium-6 {
      width: 50%;
    }
    .grid-x > .medium-7 {
      width: 58.33333%;
    }
    .grid-x > .medium-8 {
      width: 66.66667%;
    }
    .grid-x > .medium-9 {
      width: 75%;
    }
    .grid-x > .medium-10 {
      width: 83.33333%;
    }
    .grid-x > .medium-11 {
      width: 91.66667%;
    }
    .grid-x > .medium-12 {
      width: 100%;
    }
  }
  @media print, screen and (min-width: 64rem) {
    .grid-x > .large-auto {
      -ms-flex: 1 1 0px;
      flex: 1 1 0px;
      width: auto;
    }
    .grid-x > .large-shrink {
      -ms-flex: 0 0 auto;
      flex: 0 0 auto;
      width: auto;
    }
    .grid-x > .large-1 {
      width: 8.33333%;
    }
    .grid-x > .large-2 {
      width: 16.66667%;
    }
    .grid-x > .large-3 {
      width: 25%;
    }
    .grid-x > .large-4 {
      width: 33.33333%;
    }
    .grid-x > .large-5 {
      width: 41.66667%;
    }
    .grid-x > .large-6 {
      width: 50%;
    }
    .grid-x > .large-7 {
      width: 58.33333%;
    }
    .grid-x > .large-8 {
      width: 66.66667%;
    }
    .grid-x > .large-9 {
      width: 75%;
    }
    .grid-x > .large-10 {
      width: 83.33333%;
    }
    .grid-x > .large-11 {
      width: 91.66667%;
    }
    .grid-x > .large-12 {
      width: 100%;
    }
  }
  .grid-margin-x:not(.grid-x) > .cell {
    width: auto;
  }
  .grid-margin-y:not(.grid-y) > .cell {
    height: auto;
  }
  .grid-margin-x {
    margin-left: -0.75rem;
    margin-right: -0.75rem;
  }
  .grid-margin-x > .cell {
    width: calc(100% - 1.5rem);
    margin-left: 0.75rem;
    margin-right: 0.75rem;
  }
  .grid-margin-x > .auto {
    width: auto;
  }
  .grid-margin-x > .shrink {
    width: auto;
  }
  .grid-margin-x > .small-1 {
    width: calc(8.33333% - 1.5rem);
  }
  .grid-margin-x > .small-2 {
    width: calc(16.66667% - 1.5rem);
  }
  .grid-margin-x > .small-3 {
    width: calc(25% - 1.5rem);
  }
  .grid-margin-x > .small-4 {
    width: calc(33.33333% - 1.5rem);
  }
  .grid-margin-x > .small-5 {
    width: calc(41.66667% - 1.5rem);
  }
  .grid-margin-x > .small-6 {
    width: calc(50% - 1.5rem);
  }
  .grid-margin-x > .small-7 {
    width: calc(58.33333% - 1.5rem);
  }
  .grid-margin-x > .small-8 {
    width: calc(66.66667% - 1.5rem);
  }
  .grid-margin-x > .small-9 {
    width: calc(75% - 1.5rem);
  }
  .grid-margin-x > .small-10 {
    width: calc(83.33333% - 1.5rem);
  }
  .grid-margin-x > .small-11 {
    width: calc(91.66667% - 1.5rem);
  }
  .grid-margin-x > .small-12 {
    width: calc(100% - 1.5rem);
  }
  @media print, screen and (min-width: 48rem) {
    .grid-margin-x > .medium-auto {
      width: auto;
    }
    .grid-margin-x > .medium-shrink {
      width: auto;
    }
    .grid-margin-x > .medium-1 {
      width: calc(8.33333% - 1.5rem);
    }
    .grid-margin-x > .medium-2 {
      width: calc(16.66667% - 1.5rem);
    }
    .grid-margin-x > .medium-3 {
      width: calc(25% - 1.5rem);
    }
    .grid-margin-x > .medium-4 {
      width: calc(33.33333% - 1.5rem);
    }
    .grid-margin-x > .medium-5 {
      width: calc(41.66667% - 1.5rem);
    }
    .grid-margin-x > .medium-6 {
      width: calc(50% - 1.5rem);
    }
    .grid-margin-x > .medium-7 {
      width: calc(58.33333% - 1.5rem);
    }
    .grid-margin-x > .medium-8 {
      width: calc(66.66667% - 1.5rem);
    }
    .grid-margin-x > .medium-9 {
      width: calc(75% - 1.5rem);
    }
    .grid-margin-x > .medium-10 {
      width: calc(83.33333% - 1.5rem);
    }
    .grid-margin-x > .medium-11 {
      width: calc(91.66667% - 1.5rem);
    }
    .grid-margin-x > .medium-12 {
      width: calc(100% - 1.5rem);
    }
  }
  @media print, screen and (min-width: 64rem) {
    .grid-margin-x > .large-auto {
      width: auto;
    }
    .grid-margin-x > .large-shrink {
      width: auto;
    }
    .grid-margin-x > .large-1 {
      width: calc(8.33333% - 1.5rem);
    }
    .grid-margin-x > .large-2 {
      width: calc(16.66667% - 1.5rem);
    }
    .grid-margin-x > .large-3 {
      width: calc(25% - 1.5rem);
    }
    .grid-margin-x > .large-4 {
      width: calc(33.33333% - 1.5rem);
    }
    .grid-margin-x > .large-5 {
      width: calc(41.66667% - 1.5rem);
    }
    .grid-margin-x > .large-6 {
      width: calc(50% - 1.5rem);
    }
    .grid-margin-x > .large-7 {
      width: calc(58.33333% - 1.5rem);
    }
    .grid-margin-x > .large-8 {
      width: calc(66.66667% - 1.5rem);
    }
    .grid-margin-x > .large-9 {
      width: calc(75% - 1.5rem);
    }
    .grid-margin-x > .large-10 {
      width: calc(83.33333% - 1.5rem);
    }
    .grid-margin-x > .large-11 {
      width: calc(91.66667% - 1.5rem);
    }
    .grid-margin-x > .large-12 {
      width: calc(100% - 1.5rem);
    }
  }
  .grid-padding-x .grid-padding-x {
    margin-right: -0.5rem;
    margin-left: -0.5rem;
  }
  .grid-container:not(.full) > .grid-padding-x {
    margin-right: -0.5rem;
    margin-left: -0.5rem;
  }
  .grid-padding-x > .cell {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }
  .small-up-1 > .cell {
    width: 100%;
  }
  .small-up-2 > .cell {
    width: 50%;
  }
  .small-up-3 > .cell {
    width: 33.33333%;
  }
  .small-up-4 > .cell {
    width: 25%;
  }
  .small-up-5 > .cell {
    width: 20%;
  }
  .small-up-6 > .cell {
    width: 16.66667%;
  }
  .small-up-7 > .cell {
    width: 14.28571%;
  }
  .small-up-8 > .cell {
    width: 12.5%;
  }
  @media print, screen and (min-width: 48rem) {
    .medium-up-1 > .cell {
      width: 100%;
    }
    .medium-up-2 > .cell {
      width: 50%;
    }
    .medium-up-3 > .cell {
      width: 33.33333%;
    }
    .medium-up-4 > .cell {
      width: 25%;
    }
    .medium-up-5 > .cell {
      width: 20%;
    }
    .medium-up-6 > .cell {
      width: 16.66667%;
    }
    .medium-up-7 > .cell {
      width: 14.28571%;
    }
    .medium-up-8 > .cell {
      width: 12.5%;
    }
  }
  @media print, screen and (min-width: 64rem) {
    .large-up-1 > .cell {
      width: 100%;
    }
    .large-up-2 > .cell {
      width: 50%;
    }
    .large-up-3 > .cell {
      width: 33.33333%;
    }
    .large-up-4 > .cell {
      width: 25%;
    }
    .large-up-5 > .cell {
      width: 20%;
    }
    .large-up-6 > .cell {
      width: 16.66667%;
    }
    .large-up-7 > .cell {
      width: 14.28571%;
    }
    .large-up-8 > .cell {
      width: 12.5%;
    }
  }
  .grid-margin-x.small-up-1 > .cell {
    width: calc(100% - 1.5rem);
  }
  .grid-margin-x.small-up-2 > .cell {
    width: calc(50% - 1.5rem);
  }
  .grid-margin-x.small-up-3 > .cell {
    width: calc(33.33333% - 1.5rem);
  }
  .grid-margin-x.small-up-4 > .cell {
    width: calc(25% - 1.5rem);
  }
  .grid-margin-x.small-up-5 > .cell {
    width: calc(20% - 1.5rem);
  }
  .grid-margin-x.small-up-6 > .cell {
    width: calc(16.66667% - 1.5rem);
  }
  .grid-margin-x.small-up-7 > .cell {
    width: calc(14.28571% - 1.5rem);
  }
  .grid-margin-x.small-up-8 > .cell {
    width: calc(12.5% - 1.5rem);
  }
  @media print, screen and (min-width: 48rem) {
    .grid-margin-x.medium-up-1 > .cell {
      width: calc(100% - 1.5rem);
    }
    .grid-margin-x.medium-up-2 > .cell {
      width: calc(50% - 1.5rem);
    }
    .grid-margin-x.medium-up-3 > .cell {
      width: calc(33.33333% - 1.5rem);
    }
    .grid-margin-x.medium-up-4 > .cell {
      width: calc(25% - 1.5rem);
    }
    .grid-margin-x.medium-up-5 > .cell {
      width: calc(20% - 1.5rem);
    }
    .grid-margin-x.medium-up-6 > .cell {
      width: calc(16.66667% - 1.5rem);
    }
    .grid-margin-x.medium-up-7 > .cell {
      width: calc(14.28571% - 1.5rem);
    }
    .grid-margin-x.medium-up-8 > .cell {
      width: calc(12.5% - 1.5rem);
    }
  }
  @media print, screen and (min-width: 64rem) {
    .grid-margin-x.large-up-1 > .cell {
      width: calc(100% - 1.5rem);
    }
    .grid-margin-x.large-up-2 > .cell {
      width: calc(50% - 1.5rem);
    }
    .grid-margin-x.large-up-3 > .cell {
      width: calc(33.33333% - 1.5rem);
    }
    .grid-margin-x.large-up-4 > .cell {
      width: calc(25% - 1.5rem);
    }
    .grid-margin-x.large-up-5 > .cell {
      width: calc(20% - 1.5rem);
    }
    .grid-margin-x.large-up-6 > .cell {
      width: calc(16.66667% - 1.5rem);
    }
    .grid-margin-x.large-up-7 > .cell {
      width: calc(14.28571% - 1.5rem);
    }
    .grid-margin-x.large-up-8 > .cell {
      width: calc(12.5% - 1.5rem);
    }
  }
  .small-margin-collapse {
    margin-right: 0;
    margin-left: 0;
  }
  .small-margin-collapse > .cell {
    margin-right: 0;
    margin-left: 0;
  }
  .small-margin-collapse > .small-1 {
    width: 8.33333%;
  }
  .small-margin-collapse > .small-2 {
    width: 16.66667%;
  }
  .small-margin-collapse > .small-3 {
    width: 25%;
  }
  .small-margin-collapse > .small-4 {
    width: 33.33333%;
  }
  .small-margin-collapse > .small-5 {
    width: 41.66667%;
  }
  .small-margin-collapse > .small-6 {
    width: 50%;
  }
  .small-margin-collapse > .small-7 {
    width: 58.33333%;
  }
  .small-margin-collapse > .small-8 {
    width: 66.66667%;
  }
  .small-margin-collapse > .small-9 {
    width: 75%;
  }
  .small-margin-collapse > .small-10 {
    width: 83.33333%;
  }
  .small-margin-collapse > .small-11 {
    width: 91.66667%;
  }
  .small-margin-collapse > .small-12 {
    width: 100%;
  }
  @media print, screen and (min-width: 48rem) {
    .small-margin-collapse > .medium-1 {
      width: 8.33333%;
    }
    .small-margin-collapse > .medium-2 {
      width: 16.66667%;
    }
    .small-margin-collapse > .medium-3 {
      width: 25%;
    }
    .small-margin-collapse > .medium-4 {
      width: 33.33333%;
    }
    .small-margin-collapse > .medium-5 {
      width: 41.66667%;
    }
    .small-margin-collapse > .medium-6 {
      width: 50%;
    }
    .small-margin-collapse > .medium-7 {
      width: 58.33333%;
    }
    .small-margin-collapse > .medium-8 {
      width: 66.66667%;
    }
    .small-margin-collapse > .medium-9 {
      width: 75%;
    }
    .small-margin-collapse > .medium-10 {
      width: 83.33333%;
    }
    .small-margin-collapse > .medium-11 {
      width: 91.66667%;
    }
    .small-margin-collapse > .medium-12 {
      width: 100%;
    }
  }
  @media print, screen and (min-width: 64rem) {
    .small-margin-collapse > .large-1 {
      width: 8.33333%;
    }
    .small-margin-collapse > .large-2 {
      width: 16.66667%;
    }
    .small-margin-collapse > .large-3 {
      width: 25%;
    }
    .small-margin-collapse > .large-4 {
      width: 33.33333%;
    }
    .small-margin-collapse > .large-5 {
      width: 41.66667%;
    }
    .small-margin-collapse > .large-6 {
      width: 50%;
    }
    .small-margin-collapse > .large-7 {
      width: 58.33333%;
    }
    .small-margin-collapse > .large-8 {
      width: 66.66667%;
    }
    .small-margin-collapse > .large-9 {
      width: 75%;
    }
    .small-margin-collapse > .large-10 {
      width: 83.33333%;
    }
    .small-margin-collapse > .large-11 {
      width: 91.66667%;
    }
    .small-margin-collapse > .large-12 {
      width: 100%;
    }
  }
  .small-padding-collapse {
    margin-right: 0;
    margin-left: 0;
  }
  .small-padding-collapse > .cell {
    padding-right: 0;
    padding-left: 0;
  }
  @media print, screen and (min-width: 48rem) {
    .medium-margin-collapse {
      margin-right: 0;
      margin-left: 0;
    }
    .medium-margin-collapse > .cell {
      margin-right: 0;
      margin-left: 0;
    }
  }
  @media print, screen and (min-width: 48rem) {
    .medium-margin-collapse > .small-1 {
      width: 8.33333%;
    }
    .medium-margin-collapse > .small-2 {
      width: 16.66667%;
    }
    .medium-margin-collapse > .small-3 {
      width: 25%;
    }
    .medium-margin-collapse > .small-4 {
      width: 33.33333%;
    }
    .medium-margin-collapse > .small-5 {
      width: 41.66667%;
    }
    .medium-margin-collapse > .small-6 {
      width: 50%;
    }
    .medium-margin-collapse > .small-7 {
      width: 58.33333%;
    }
    .medium-margin-collapse > .small-8 {
      width: 66.66667%;
    }
    .medium-margin-collapse > .small-9 {
      width: 75%;
    }
    .medium-margin-collapse > .small-10 {
      width: 83.33333%;
    }
    .medium-margin-collapse > .small-11 {
      width: 91.66667%;
    }
    .medium-margin-collapse > .small-12 {
      width: 100%;
    }
  }
  @media print, screen and (min-width: 48rem) {
    .medium-margin-collapse > .medium-1 {
      width: 8.33333%;
    }
    .medium-margin-collapse > .medium-2 {
      width: 16.66667%;
    }
    .medium-margin-collapse > .medium-3 {
      width: 25%;
    }
    .medium-margin-collapse > .medium-4 {
      width: 33.33333%;
    }
    .medium-margin-collapse > .medium-5 {
      width: 41.66667%;
    }
    .medium-margin-collapse > .medium-6 {
      width: 50%;
    }
    .medium-margin-collapse > .medium-7 {
      width: 58.33333%;
    }
    .medium-margin-collapse > .medium-8 {
      width: 66.66667%;
    }
    .medium-margin-collapse > .medium-9 {
      width: 75%;
    }
    .medium-margin-collapse > .medium-10 {
      width: 83.33333%;
    }
    .medium-margin-collapse > .medium-11 {
      width: 91.66667%;
    }
    .medium-margin-collapse > .medium-12 {
      width: 100%;
    }
  }
  @media print, screen and (min-width: 64rem) {
    .medium-margin-collapse > .large-1 {
      width: 8.33333%;
    }
    .medium-margin-collapse > .large-2 {
      width: 16.66667%;
    }
    .medium-margin-collapse > .large-3 {
      width: 25%;
    }
    .medium-margin-collapse > .large-4 {
      width: 33.33333%;
    }
    .medium-margin-collapse > .large-5 {
      width: 41.66667%;
    }
    .medium-margin-collapse > .large-6 {
      width: 50%;
    }
    .medium-margin-collapse > .large-7 {
      width: 58.33333%;
    }
    .medium-margin-collapse > .large-8 {
      width: 66.66667%;
    }
    .medium-margin-collapse > .large-9 {
      width: 75%;
    }
    .medium-margin-collapse > .large-10 {
      width: 83.33333%;
    }
    .medium-margin-collapse > .large-11 {
      width: 91.66667%;
    }
    .medium-margin-collapse > .large-12 {
      width: 100%;
    }
  }
  @media print, screen and (min-width: 48rem) {
    .medium-padding-collapse {
      margin-right: 0;
      margin-left: 0;
    }
    .medium-padding-collapse > .cell {
      padding-right: 0;
      padding-left: 0;
    }
  }
  @media print, screen and (min-width: 64rem) {
    .large-margin-collapse {
      margin-right: 0;
      margin-left: 0;
    }
    .large-margin-collapse > .cell {
      margin-right: 0;
      margin-left: 0;
    }
  }
  @media print, screen and (min-width: 64rem) {
    .large-margin-collapse > .small-1 {
      width: 8.33333%;
    }
    .large-margin-collapse > .small-2 {
      width: 16.66667%;
    }
    .large-margin-collapse > .small-3 {
      width: 25%;
    }
    .large-margin-collapse > .small-4 {
      width: 33.33333%;
    }
    .large-margin-collapse > .small-5 {
      width: 41.66667%;
    }
    .large-margin-collapse > .small-6 {
      width: 50%;
    }
    .large-margin-collapse > .small-7 {
      width: 58.33333%;
    }
    .large-margin-collapse > .small-8 {
      width: 66.66667%;
    }
    .large-margin-collapse > .small-9 {
      width: 75%;
    }
    .large-margin-collapse > .small-10 {
      width: 83.33333%;
    }
    .large-margin-collapse > .small-11 {
      width: 91.66667%;
    }
    .large-margin-collapse > .small-12 {
      width: 100%;
    }
  }
  @media print, screen and (min-width: 64rem) {
    .large-margin-collapse > .medium-1 {
      width: 8.33333%;
    }
    .large-margin-collapse > .medium-2 {
      width: 16.66667%;
    }
    .large-margin-collapse > .medium-3 {
      width: 25%;
    }
    .large-margin-collapse > .medium-4 {
      width: 33.33333%;
    }
    .large-margin-collapse > .medium-5 {
      width: 41.66667%;
    }
    .large-margin-collapse > .medium-6 {
      width: 50%;
    }
    .large-margin-collapse > .medium-7 {
      width: 58.33333%;
    }
    .large-margin-collapse > .medium-8 {
      width: 66.66667%;
    }
    .large-margin-collapse > .medium-9 {
      width: 75%;
    }
    .large-margin-collapse > .medium-10 {
      width: 83.33333%;
    }
    .large-margin-collapse > .medium-11 {
      width: 91.66667%;
    }
    .large-margin-collapse > .medium-12 {
      width: 100%;
    }
  }
  @media print, screen and (min-width: 64rem) {
    .large-margin-collapse > .large-1 {
      width: 8.33333%;
    }
    .large-margin-collapse > .large-2 {
      width: 16.66667%;
    }
    .large-margin-collapse > .large-3 {
      width: 25%;
    }
    .large-margin-collapse > .large-4 {
      width: 33.33333%;
    }
    .large-margin-collapse > .large-5 {
      width: 41.66667%;
    }
    .large-margin-collapse > .large-6 {
      width: 50%;
    }
    .large-margin-collapse > .large-7 {
      width: 58.33333%;
    }
    .large-margin-collapse > .large-8 {
      width: 66.66667%;
    }
    .large-margin-collapse > .large-9 {
      width: 75%;
    }
    .large-margin-collapse > .large-10 {
      width: 83.33333%;
    }
    .large-margin-collapse > .large-11 {
      width: 91.66667%;
    }
    .large-margin-collapse > .large-12 {
      width: 100%;
    }
  }
  @media print, screen and (min-width: 64rem) {
    .large-padding-collapse {
      margin-right: 0;
      margin-left: 0;
    }
    .large-padding-collapse > .cell {
      padding-right: 0;
      padding-left: 0;
    }
  }
  .small-offset-0 {
    margin-left: 0;
  }
  .grid-margin-x > .small-offset-0 {
    margin-left: calc(0% + 0.75rem);
  }
  .small-offset-1 {
    margin-left: 8.33333%;
  }
  .grid-margin-x > .small-offset-1 {
    margin-left: calc(8.33333% + 0.75rem);
  }
  .small-offset-2 {
    margin-left: 16.66667%;
  }
  .grid-margin-x > .small-offset-2 {
    margin-left: calc(16.66667% + 0.75rem);
  }
  .small-offset-3 {
    margin-left: 25%;
  }
  .grid-margin-x > .small-offset-3 {
    margin-left: calc(25% + 0.75rem);
  }
  .small-offset-4 {
    margin-left: 33.33333%;
  }
  .grid-margin-x > .small-offset-4 {
    margin-left: calc(33.33333% + 0.75rem);
  }
  .small-offset-5 {
    margin-left: 41.66667%;
  }
  .grid-margin-x > .small-offset-5 {
    margin-left: calc(41.66667% + 0.75rem);
  }
  .small-offset-6 {
    margin-left: 50%;
  }
  .grid-margin-x > .small-offset-6 {
    margin-left: calc(50% + 0.75rem);
  }
  .small-offset-7 {
    margin-left: 58.33333%;
  }
  .grid-margin-x > .small-offset-7 {
    margin-left: calc(58.33333% + 0.75rem);
  }
  .small-offset-8 {
    margin-left: 66.66667%;
  }
  .grid-margin-x > .small-offset-8 {
    margin-left: calc(66.66667% + 0.75rem);
  }
  .small-offset-9 {
    margin-left: 75%;
  }
  .grid-margin-x > .small-offset-9 {
    margin-left: calc(75% + 0.75rem);
  }
  .small-offset-10 {
    margin-left: 83.33333%;
  }
  .grid-margin-x > .small-offset-10 {
    margin-left: calc(83.33333% + 0.75rem);
  }
  .small-offset-11 {
    margin-left: 91.66667%;
  }
  .grid-margin-x > .small-offset-11 {
    margin-left: calc(91.66667% + 0.75rem);
  }
  @media print, screen and (min-width: 48rem) {
    .medium-offset-0 {
      margin-left: 0;
    }
    .grid-margin-x > .medium-offset-0 {
      margin-left: calc(0% + 0.75rem);
    }
    .medium-offset-1 {
      margin-left: 8.33333%;
    }
    .grid-margin-x > .medium-offset-1 {
      margin-left: calc(8.33333% + 0.75rem);
    }
    .medium-offset-2 {
      margin-left: 16.66667%;
    }
    .grid-margin-x > .medium-offset-2 {
      margin-left: calc(16.66667% + 0.75rem);
    }
    .medium-offset-3 {
      margin-left: 25%;
    }
    .grid-margin-x > .medium-offset-3 {
      margin-left: calc(25% + 0.75rem);
    }
    .medium-offset-4 {
      margin-left: 33.33333%;
    }
    .grid-margin-x > .medium-offset-4 {
      margin-left: calc(33.33333% + 0.75rem);
    }
    .medium-offset-5 {
      margin-left: 41.66667%;
    }
    .grid-margin-x > .medium-offset-5 {
      margin-left: calc(41.66667% + 0.75rem);
    }
    .medium-offset-6 {
      margin-left: 50%;
    }
    .grid-margin-x > .medium-offset-6 {
      margin-left: calc(50% + 0.75rem);
    }
    .medium-offset-7 {
      margin-left: 58.33333%;
    }
    .grid-margin-x > .medium-offset-7 {
      margin-left: calc(58.33333% + 0.75rem);
    }
    .medium-offset-8 {
      margin-left: 66.66667%;
    }
    .grid-margin-x > .medium-offset-8 {
      margin-left: calc(66.66667% + 0.75rem);
    }
    .medium-offset-9 {
      margin-left: 75%;
    }
    .grid-margin-x > .medium-offset-9 {
      margin-left: calc(75% + 0.75rem);
    }
    .medium-offset-10 {
      margin-left: 83.33333%;
    }
    .grid-margin-x > .medium-offset-10 {
      margin-left: calc(83.33333% + 0.75rem);
    }
    .medium-offset-11 {
      margin-left: 91.66667%;
    }
    .grid-margin-x > .medium-offset-11 {
      margin-left: calc(91.66667% + 0.75rem);
    }
  }
  @media print, screen and (min-width: 64rem) {
    .large-offset-0 {
      margin-left: 0;
    }
    .grid-margin-x > .large-offset-0 {
      margin-left: calc(0% + 0.75rem);
    }
    .large-offset-1 {
      margin-left: 8.33333%;
    }
    .grid-margin-x > .large-offset-1 {
      margin-left: calc(8.33333% + 0.75rem);
    }
    .large-offset-2 {
      margin-left: 16.66667%;
    }
    .grid-margin-x > .large-offset-2 {
      margin-left: calc(16.66667% + 0.75rem);
    }
    .large-offset-3 {
      margin-left: 25%;
    }
    .grid-margin-x > .large-offset-3 {
      margin-left: calc(25% + 0.75rem);
    }
    .large-offset-4 {
      margin-left: 33.33333%;
    }
    .grid-margin-x > .large-offset-4 {
      margin-left: calc(33.33333% + 0.75rem);
    }
    .large-offset-5 {
      margin-left: 41.66667%;
    }
    .grid-margin-x > .large-offset-5 {
      margin-left: calc(41.66667% + 0.75rem);
    }
    .large-offset-6 {
      margin-left: 50%;
    }
    .grid-margin-x > .large-offset-6 {
      margin-left: calc(50% + 0.75rem);
    }
    .large-offset-7 {
      margin-left: 58.33333%;
    }
    .grid-margin-x > .large-offset-7 {
      margin-left: calc(58.33333% + 0.75rem);
    }
    .large-offset-8 {
      margin-left: 66.66667%;
    }
    .grid-margin-x > .large-offset-8 {
      margin-left: calc(66.66667% + 0.75rem);
    }
    .large-offset-9 {
      margin-left: 75%;
    }
    .grid-margin-x > .large-offset-9 {
      margin-left: calc(75% + 0.75rem);
    }
    .large-offset-10 {
      margin-left: 83.33333%;
    }
    .grid-margin-x > .large-offset-10 {
      margin-left: calc(83.33333% + 0.75rem);
    }
    .large-offset-11 {
      margin-left: 91.66667%;
    }
    .grid-margin-x > .large-offset-11 {
      margin-left: calc(91.66667% + 0.75rem);
    }
  }
  .grid-y {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-flow: column nowrap;
    flex-flow: column nowrap;
  }
  .grid-y > .cell {
    width: auto;
  }
  .grid-y > .auto {
    height: auto;
  }
  .grid-y > .shrink {
    height: auto;
  }
  .grid-y > .small-1,
  .grid-y > .small-10,
  .grid-y > .small-11,
  .grid-y > .small-12,
  .grid-y > .small-2,
  .grid-y > .small-3,
  .grid-y > .small-4,
  .grid-y > .small-5,
  .grid-y > .small-6,
  .grid-y > .small-7,
  .grid-y > .small-8,
  .grid-y > .small-9,
  .grid-y > .small-full,
  .grid-y > .small-shrink {
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
  }
  @media print, screen and (min-width: 48rem) {
    .grid-y > .medium-1,
    .grid-y > .medium-10,
    .grid-y > .medium-11,
    .grid-y > .medium-12,
    .grid-y > .medium-2,
    .grid-y > .medium-3,
    .grid-y > .medium-4,
    .grid-y > .medium-5,
    .grid-y > .medium-6,
    .grid-y > .medium-7,
    .grid-y > .medium-8,
    .grid-y > .medium-9,
    .grid-y > .medium-full,
    .grid-y > .medium-shrink {
      -ms-flex-preferred-size: auto;
      flex-basis: auto;
    }
  }
  @media print, screen and (min-width: 64rem) {
    .grid-y > .large-1,
    .grid-y > .large-10,
    .grid-y > .large-11,
    .grid-y > .large-12,
    .grid-y > .large-2,
    .grid-y > .large-3,
    .grid-y > .large-4,
    .grid-y > .large-5,
    .grid-y > .large-6,
    .grid-y > .large-7,
    .grid-y > .large-8,
    .grid-y > .large-9,
    .grid-y > .large-full,
    .grid-y > .large-shrink {
      -ms-flex-preferred-size: auto;
      flex-basis: auto;
    }
  }
  .grid-y > .small-1 {
    height: 8.33333%;
  }
  .grid-y > .small-2 {
    height: 16.66667%;
  }
  .grid-y > .small-3 {
    height: 25%;
  }
  .grid-y > .small-4 {
    height: 33.33333%;
  }
  .grid-y > .small-5 {
    height: 41.66667%;
  }
  .grid-y > .small-6 {
    height: 50%;
  }
  .grid-y > .small-7 {
    height: 58.33333%;
  }
  .grid-y > .small-8 {
    height: 66.66667%;
  }
  .grid-y > .small-9 {
    height: 75%;
  }
  .grid-y > .small-10 {
    height: 83.33333%;
  }
  .grid-y > .small-11 {
    height: 91.66667%;
  }
  .grid-y > .small-12 {
    height: 100%;
  }
  @media print, screen and (min-width: 48rem) {
    .grid-y > .medium-auto {
      -ms-flex: 1 1 0px;
      flex: 1 1 0px;
      height: auto;
    }
    .grid-y > .medium-shrink {
      height: auto;
    }
    .grid-y > .medium-1 {
      height: 8.33333%;
    }
    .grid-y > .medium-2 {
      height: 16.66667%;
    }
    .grid-y > .medium-3 {
      height: 25%;
    }
    .grid-y > .medium-4 {
      height: 33.33333%;
    }
    .grid-y > .medium-5 {
      height: 41.66667%;
    }
    .grid-y > .medium-6 {
      height: 50%;
    }
    .grid-y > .medium-7 {
      height: 58.33333%;
    }
    .grid-y > .medium-8 {
      height: 66.66667%;
    }
    .grid-y > .medium-9 {
      height: 75%;
    }
    .grid-y > .medium-10 {
      height: 83.33333%;
    }
    .grid-y > .medium-11 {
      height: 91.66667%;
    }
    .grid-y > .medium-12 {
      height: 100%;
    }
  }
  @media print, screen and (min-width: 64rem) {
    .grid-y > .large-auto {
      -ms-flex: 1 1 0px;
      flex: 1 1 0px;
      height: auto;
    }
    .grid-y > .large-shrink {
      height: auto;
    }
    .grid-y > .large-1 {
      height: 8.33333%;
    }
    .grid-y > .large-2 {
      height: 16.66667%;
    }
    .grid-y > .large-3 {
      height: 25%;
    }
    .grid-y > .large-4 {
      height: 33.33333%;
    }
    .grid-y > .large-5 {
      height: 41.66667%;
    }
    .grid-y > .large-6 {
      height: 50%;
    }
    .grid-y > .large-7 {
      height: 58.33333%;
    }
    .grid-y > .large-8 {
      height: 66.66667%;
    }
    .grid-y > .large-9 {
      height: 75%;
    }
    .grid-y > .large-10 {
      height: 83.33333%;
    }
    .grid-y > .large-11 {
      height: 91.66667%;
    }
    .grid-y > .large-12 {
      height: 100%;
    }
  }
  .grid-padding-y .grid-padding-y {
    margin-top: -0.75rem;
    margin-bottom: -0.75rem;
  }
  .grid-padding-y > .cell {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
  .grid-margin-y {
    margin-top: -0.75rem;
    margin-bottom: -0.75rem;
  }
  .grid-margin-y > .cell {
    height: calc(100% - 1.5rem);
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }
  .grid-margin-y > .auto {
    height: auto;
  }
  .grid-margin-y > .shrink {
    height: auto;
  }
  .grid-margin-y > .small-1 {
    height: calc(8.33333% - 1.5rem);
  }
  .grid-margin-y > .small-2 {
    height: calc(16.66667% - 1.5rem);
  }
  .grid-margin-y > .small-3 {
    height: calc(25% - 1.5rem);
  }
  .grid-margin-y > .small-4 {
    height: calc(33.33333% - 1.5rem);
  }
  .grid-margin-y > .small-5 {
    height: calc(41.66667% - 1.5rem);
  }
  .grid-margin-y > .small-6 {
    height: calc(50% - 1.5rem);
  }
  .grid-margin-y > .small-7 {
    height: calc(58.33333% - 1.5rem);
  }
  .grid-margin-y > .small-8 {
    height: calc(66.66667% - 1.5rem);
  }
  .grid-margin-y > .small-9 {
    height: calc(75% - 1.5rem);
  }
  .grid-margin-y > .small-10 {
    height: calc(83.33333% - 1.5rem);
  }
  .grid-margin-y > .small-11 {
    height: calc(91.66667% - 1.5rem);
  }
  .grid-margin-y > .small-12 {
    height: calc(100% - 1.5rem);
  }
  @media print, screen and (min-width: 48rem) {
    .grid-margin-y > .medium-auto {
      height: auto;
    }
    .grid-margin-y > .medium-shrink {
      height: auto;
    }
    .grid-margin-y > .medium-1 {
      height: calc(8.33333% - 1.5rem);
    }
    .grid-margin-y > .medium-2 {
      height: calc(16.66667% - 1.5rem);
    }
    .grid-margin-y > .medium-3 {
      height: calc(25% - 1.5rem);
    }
    .grid-margin-y > .medium-4 {
      height: calc(33.33333% - 1.5rem);
    }
    .grid-margin-y > .medium-5 {
      height: calc(41.66667% - 1.5rem);
    }
    .grid-margin-y > .medium-6 {
      height: calc(50% - 1.5rem);
    }
    .grid-margin-y > .medium-7 {
      height: calc(58.33333% - 1.5rem);
    }
    .grid-margin-y > .medium-8 {
      height: calc(66.66667% - 1.5rem);
    }
    .grid-margin-y > .medium-9 {
      height: calc(75% - 1.5rem);
    }
    .grid-margin-y > .medium-10 {
      height: calc(83.33333% - 1.5rem);
    }
    .grid-margin-y > .medium-11 {
      height: calc(91.66667% - 1.5rem);
    }
    .grid-margin-y > .medium-12 {
      height: calc(100% - 1.5rem);
    }
  }
  @media print, screen and (min-width: 64rem) {
    .grid-margin-y > .large-auto {
      height: auto;
    }
    .grid-margin-y > .large-shrink {
      height: auto;
    }
    .grid-margin-y > .large-1 {
      height: calc(8.33333% - 1.5rem);
    }
    .grid-margin-y > .large-2 {
      height: calc(16.66667% - 1.5rem);
    }
    .grid-margin-y > .large-3 {
      height: calc(25% - 1.5rem);
    }
    .grid-margin-y > .large-4 {
      height: calc(33.33333% - 1.5rem);
    }
    .grid-margin-y > .large-5 {
      height: calc(41.66667% - 1.5rem);
    }
    .grid-margin-y > .large-6 {
      height: calc(50% - 1.5rem);
    }
    .grid-margin-y > .large-7 {
      height: calc(58.33333% - 1.5rem);
    }
    .grid-margin-y > .large-8 {
      height: calc(66.66667% - 1.5rem);
    }
    .grid-margin-y > .large-9 {
      height: calc(75% - 1.5rem);
    }
    .grid-margin-y > .large-10 {
      height: calc(83.33333% - 1.5rem);
    }
    .grid-margin-y > .large-11 {
      height: calc(91.66667% - 1.5rem);
    }
    .grid-margin-y > .large-12 {
      height: calc(100% - 1.5rem);
    }
  }
  .grid-frame {
    overflow: hidden;
    position: relative;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -ms-flex-align: stretch;
    align-items: stretch;
    width: 100vw;
  }
  .cell .grid-frame {
    width: 100%;
  }
  .cell-block {
    overflow-x: auto;
    max-width: 100%;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-stype: -ms-autohiding-scrollbar;
  }
  .cell-block-y {
    overflow-y: auto;
    max-height: 100%;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-stype: -ms-autohiding-scrollbar;
  }
  .cell-block-container {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    max-height: 100%;
  }
  .cell-block-container > .grid-x {
    max-height: 100%;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
  }
  @media print, screen and (min-width: 48rem) {
    .medium-grid-frame {
      overflow: hidden;
      position: relative;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
      -ms-flex-align: stretch;
      align-items: stretch;
      width: 100vw;
    }
    .cell .medium-grid-frame {
      width: 100%;
    }
    .medium-cell-block {
      overflow-x: auto;
      max-width: 100%;
      -webkit-overflow-scrolling: touch;
      -ms-overflow-stype: -ms-autohiding-scrollbar;
    }
    .medium-cell-block-container {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-direction: column;
      flex-direction: column;
      max-height: 100%;
    }
    .medium-cell-block-container > .grid-x {
      max-height: 100%;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
    }
    .medium-cell-block-y {
      overflow-y: auto;
      max-height: 100%;
      -webkit-overflow-scrolling: touch;
      -ms-overflow-stype: -ms-autohiding-scrollbar;
    }
  }
  @media print, screen and (min-width: 64rem) {
    .large-grid-frame {
      overflow: hidden;
      position: relative;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
      -ms-flex-align: stretch;
      align-items: stretch;
      width: 100vw;
    }
    .cell .large-grid-frame {
      width: 100%;
    }
    .large-cell-block {
      overflow-x: auto;
      max-width: 100%;
      -webkit-overflow-scrolling: touch;
      -ms-overflow-stype: -ms-autohiding-scrollbar;
    }
    .large-cell-block-container {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-direction: column;
      flex-direction: column;
      max-height: 100%;
    }
    .large-cell-block-container > .grid-x {
      max-height: 100%;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
    }
    .large-cell-block-y {
      overflow-y: auto;
      max-height: 100%;
      -webkit-overflow-scrolling: touch;
      -ms-overflow-stype: -ms-autohiding-scrollbar;
    }
  }
  .grid-y.grid-frame {
    width: auto;
    overflow: hidden;
    position: relative;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -ms-flex-align: stretch;
    align-items: stretch;
    height: 100vh;
  }
  @media print, screen and (min-width: 48rem) {
    .grid-y.medium-grid-frame {
      width: auto;
      overflow: hidden;
      position: relative;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
      -ms-flex-align: stretch;
      align-items: stretch;
      height: 100vh;
    }
  }
  @media print, screen and (min-width: 64rem) {
    .grid-y.large-grid-frame {
      width: auto;
      overflow: hidden;
      position: relative;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
      -ms-flex-align: stretch;
      align-items: stretch;
      height: 100vh;
    }
  }
  .cell .grid-y.grid-frame {
    height: 100%;
  }
  @media print, screen and (min-width: 48rem) {
    .cell .grid-y.medium-grid-frame {
      height: 100%;
    }
  }
  @media print, screen and (min-width: 64rem) {
    .cell .grid-y.large-grid-frame {
      height: 100%;
    }
  }
  .grid-margin-y {
    margin-top: -0.75rem;
    margin-bottom: -0.75rem;
  }
  .grid-margin-y > .cell {
    height: calc(100% - 1.5rem);
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }
  .grid-margin-y > .auto {
    height: auto;
  }
  .grid-margin-y > .shrink {
    height: auto;
  }
  .grid-margin-y > .small-1 {
    height: calc(8.33333% - 1.5rem);
  }
  .grid-margin-y > .small-2 {
    height: calc(16.66667% - 1.5rem);
  }
  .grid-margin-y > .small-3 {
    height: calc(25% - 1.5rem);
  }
  .grid-margin-y > .small-4 {
    height: calc(33.33333% - 1.5rem);
  }
  .grid-margin-y > .small-5 {
    height: calc(41.66667% - 1.5rem);
  }
  .grid-margin-y > .small-6 {
    height: calc(50% - 1.5rem);
  }
  .grid-margin-y > .small-7 {
    height: calc(58.33333% - 1.5rem);
  }
  .grid-margin-y > .small-8 {
    height: calc(66.66667% - 1.5rem);
  }
  .grid-margin-y > .small-9 {
    height: calc(75% - 1.5rem);
  }
  .grid-margin-y > .small-10 {
    height: calc(83.33333% - 1.5rem);
  }
  .grid-margin-y > .small-11 {
    height: calc(91.66667% - 1.5rem);
  }
  .grid-margin-y > .small-12 {
    height: calc(100% - 1.5rem);
  }
  @media print, screen and (min-width: 48rem) {
    .grid-margin-y > .medium-auto {
      height: auto;
    }
    .grid-margin-y > .medium-shrink {
      height: auto;
    }
    .grid-margin-y > .medium-1 {
      height: calc(8.33333% - 1.5rem);
    }
    .grid-margin-y > .medium-2 {
      height: calc(16.66667% - 1.5rem);
    }
    .grid-margin-y > .medium-3 {
      height: calc(25% - 1.5rem);
    }
    .grid-margin-y > .medium-4 {
      height: calc(33.33333% - 1.5rem);
    }
    .grid-margin-y > .medium-5 {
      height: calc(41.66667% - 1.5rem);
    }
    .grid-margin-y > .medium-6 {
      height: calc(50% - 1.5rem);
    }
    .grid-margin-y > .medium-7 {
      height: calc(58.33333% - 1.5rem);
    }
    .grid-margin-y > .medium-8 {
      height: calc(66.66667% - 1.5rem);
    }
    .grid-margin-y > .medium-9 {
      height: calc(75% - 1.5rem);
    }
    .grid-margin-y > .medium-10 {
      height: calc(83.33333% - 1.5rem);
    }
    .grid-margin-y > .medium-11 {
      height: calc(91.66667% - 1.5rem);
    }
    .grid-margin-y > .medium-12 {
      height: calc(100% - 1.5rem);
    }
  }
  @media print, screen and (min-width: 64rem) {
    .grid-margin-y > .large-auto {
      height: auto;
    }
    .grid-margin-y > .large-shrink {
      height: auto;
    }
    .grid-margin-y > .large-1 {
      height: calc(8.33333% - 1.5rem);
    }
    .grid-margin-y > .large-2 {
      height: calc(16.66667% - 1.5rem);
    }
    .grid-margin-y > .large-3 {
      height: calc(25% - 1.5rem);
    }
    .grid-margin-y > .large-4 {
      height: calc(33.33333% - 1.5rem);
    }
    .grid-margin-y > .large-5 {
      height: calc(41.66667% - 1.5rem);
    }
    .grid-margin-y > .large-6 {
      height: calc(50% - 1.5rem);
    }
    .grid-margin-y > .large-7 {
      height: calc(58.33333% - 1.5rem);
    }
    .grid-margin-y > .large-8 {
      height: calc(66.66667% - 1.5rem);
    }
    .grid-margin-y > .large-9 {
      height: calc(75% - 1.5rem);
    }
    .grid-margin-y > .large-10 {
      height: calc(83.33333% - 1.5rem);
    }
    .grid-margin-y > .large-11 {
      height: calc(91.66667% - 1.5rem);
    }
    .grid-margin-y > .large-12 {
      height: calc(100% - 1.5rem);
    }
  }
  .grid-frame.grid-margin-y {
    height: calc(100vh + 1.5rem);
  }
  @media print, screen and (min-width: 48rem) {
    .grid-margin-y.medium-grid-frame {
      height: calc(100vh + 1.5rem);
    }
  }
  @media print, screen and (min-width: 64rem) {
    .grid-margin-y.large-grid-frame {
      height: calc(100vh + 1.5rem);
    }
  }
  .align-right {
    -ms-flex-pack: end;
    justify-content: flex-end;
  }
  .align-center {
    -ms-flex-pack: center;
    justify-content: center;
  }
  .align-justify {
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
  .align-spaced {
    -ms-flex-pack: distribute;
    justify-content: space-around;
  }
  .align-right.vertical.menu > li > a {
    -ms-flex-pack: end;
    justify-content: flex-end;
  }
  .align-center.vertical.menu > li > a {
    -ms-flex-pack: center;
    justify-content: center;
  }
  .align-top {
    -ms-flex-align: start;
    align-items: flex-start;
  }
  .align-self-top {
    -ms-flex-item-align: start;
    align-self: flex-start;
  }
  .align-bottom {
    -ms-flex-align: end;
    align-items: flex-end;
  }
  .align-self-bottom {
    -ms-flex-item-align: end;
    align-self: flex-end;
  }
  .align-middle {
    -ms-flex-align: center;
    align-items: center;
  }
  .align-self-middle {
    -ms-flex-item-align: center;
    -ms-grid-row-align: center;
    align-self: center;
  }
  .align-stretch {
    -ms-flex-align: stretch;
    align-items: stretch;
  }
  .align-self-stretch {
    -ms-flex-item-align: stretch;
    -ms-grid-row-align: stretch;
    align-self: stretch;
  }
  .align-center-middle {
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-line-pack: center;
    align-content: center;
  }
  .small-order-1 {
    -ms-flex-order: 1;
    order: 1;
  }
  .small-order-2 {
    -ms-flex-order: 2;
    order: 2;
  }
  .small-order-3 {
    -ms-flex-order: 3;
    order: 3;
  }
  .small-order-4 {
    -ms-flex-order: 4;
    order: 4;
  }
  .small-order-5 {
    -ms-flex-order: 5;
    order: 5;
  }
  .small-order-6 {
    -ms-flex-order: 6;
    order: 6;
  }
  @media print, screen and (min-width: 48rem) {
    .medium-order-1 {
      -ms-flex-order: 1;
      order: 1;
    }
    .medium-order-2 {
      -ms-flex-order: 2;
      order: 2;
    }
    .medium-order-3 {
      -ms-flex-order: 3;
      order: 3;
    }
    .medium-order-4 {
      -ms-flex-order: 4;
      order: 4;
    }
    .medium-order-5 {
      -ms-flex-order: 5;
      order: 5;
    }
    .medium-order-6 {
      -ms-flex-order: 6;
      order: 6;
    }
  }
  @media print, screen and (min-width: 64rem) {
    .large-order-1 {
      -ms-flex-order: 1;
      order: 1;
    }
    .large-order-2 {
      -ms-flex-order: 2;
      order: 2;
    }
    .large-order-3 {
      -ms-flex-order: 3;
      order: 3;
    }
    .large-order-4 {
      -ms-flex-order: 4;
      order: 4;
    }
    .large-order-5 {
      -ms-flex-order: 5;
      order: 5;
    }
    .large-order-6 {
      -ms-flex-order: 6;
      order: 6;
    }
  }
  .flex-container {
    display: -ms-flexbox;
    display: flex;
  }
  .flex-child-auto {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
  }
  .flex-child-grow {
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
  }
  .flex-child-shrink {
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
  }
  .flex-dir-row {
    -ms-flex-direction: row;
    flex-direction: row;
  }
  .flex-dir-row-reverse {
    -ms-flex-direction: row-reverse;
    flex-direction: row-reverse;
  }
  .flex-dir-column {
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .flex-dir-column-reverse {
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
  }
  @media print, screen and (min-width: 48rem) {
    .medium-flex-container {
      display: -ms-flexbox;
      display: flex;
    }
    .medium-flex-child-auto {
      -ms-flex: 1 1 auto;
      flex: 1 1 auto;
    }
    .medium-flex-child-grow {
      -ms-flex: 1 0 auto;
      flex: 1 0 auto;
    }
    .medium-flex-child-shrink {
      -ms-flex: 0 1 auto;
      flex: 0 1 auto;
    }
    .medium-flex-dir-row {
      -ms-flex-direction: row;
      flex-direction: row;
    }
    .medium-flex-dir-row-reverse {
      -ms-flex-direction: row-reverse;
      flex-direction: row-reverse;
    }
    .medium-flex-dir-column {
      -ms-flex-direction: column;
      flex-direction: column;
    }
    .medium-flex-dir-column-reverse {
      -ms-flex-direction: column-reverse;
      flex-direction: column-reverse;
    }
  }
  @media print, screen and (min-width: 64rem) {
    .large-flex-container {
      display: -ms-flexbox;
      display: flex;
    }
    .large-flex-child-auto {
      -ms-flex: 1 1 auto;
      flex: 1 1 auto;
    }
    .large-flex-child-grow {
      -ms-flex: 1 0 auto;
      flex: 1 0 auto;
    }
    .large-flex-child-shrink {
      -ms-flex: 0 1 auto;
      flex: 0 1 auto;
    }
    .large-flex-dir-row {
      -ms-flex-direction: row;
      flex-direction: row;
    }
    .large-flex-dir-row-reverse {
      -ms-flex-direction: row-reverse;
      flex-direction: row-reverse;
    }
    .large-flex-dir-column {
      -ms-flex-direction: column;
      flex-direction: column;
    }
    .large-flex-dir-column-reverse {
      -ms-flex-direction: column-reverse;
      flex-direction: column-reverse;
    }
  }
  .hide-desktop {
    display: none !important;
  }
  .hide-mobile {
    display: inherit !important;
  }
  @media print, screen and (min-width: 48rem) {
    .hide-desktop {
      display: inherit !important;
    }
    .hide-mobile {
      display: none !important;
    }
  }
  /* slick */
  .slick-list,
  .slick-slider,
  .slick-track {
    position: relative;
    display: block;
  }

  .slick-loading .slick-slide,
  .slick-loading .slick-track {
    visibility: hidden;
  }

  .slick-slider {
    box-sizing: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -ms-touch-action: pan-y;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
  }

  .slick-list {
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  .slick-list:focus {
    outline: 0;
  }

  .slick-list.dragging {
    cursor: pointer;
    cursor: hand;
  }

  .slick-slide,
  .slick-slider .slick-track,
  .slick-slider .slick-list {
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);

    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);

    -webkit-perspective: 1000;
    -moz-perspective: 1000;
    -ms-perspective: 1000;
    perspective: 1000;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .slick-track {
    top: 0;
    left: 0;
  }

  .slick-track:after,
  .slick-track:before {
    display: table;
    content: '';
  }

  .slick-track:after {
    clear: both;
  }

  .slick-slide {
    display: none;
    float: left;
    height: 100%;
    min-height: 1px;
  }

  [dir='rtl'] .slick-slide {
    float: right;
  }

  .slick-slide img {
    width: 100%;
    display: block;
  }

  .slick-slide.slick-loading img {
    display: none;
  }

  .slick-slide.dragging img {
    pointer-events: none;
  }

  .slick-initialized .slick-slide {
    display: block;
  }

  .slick-vertical .slick-slide {
    display: block;
    height: auto;
    border: 1px solid transparent;
  }

  .slick-arrow.slick-hidden {
    display: none;
  }

  .slick-dots,
  .slick-next,
  .slick-prev {
    position: absolute;
    display: block;
    padding: 0;
  }

  .slick-next,
  .slick-prev {
    font-size: 0;
    line-height: 0;
    top: 50%;
    width: 1.5rem;
    height: 1.5rem;
    -webkit-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    transform: translate(0, -50%);
    cursor: pointer;
    color: transparent;
    border: none;
    outline: 0;
    background: 0 0;
  }

  .slick-next:focus,
  .slick-next:hover,
  .slick-prev:focus,
  .slick-prev:hover {
    color: transparent;
    outline: 0;
    background: 0 0;
  }

  .slick-next:focus:before,
  .slick-next:hover:before,
  .slick-prev:focus:before,
  .slick-prev:hover:before {
    opacity: 1;
  }

  .slick-next.slick-disabled:before,
  .slick-prev.slick-disabled:before {
    opacity: 0.25;
  }

  .slick-next:before,
  .slick-prev:before {
    font-size: 1.5rem;
    line-height: 1;
    opacity: 0.75;
    color: #fff;
    font-family: 'ciayoicons';
  }

  .slick-prev {
    left: -25px;
    padding-right: 0.125rem;
  }

  [dir='rtl'] .slick-prev {
    right: -25px;
    left: auto;
  }

  .slick-prev:before {
    content: '\\e90b';
  }

  .slick-next:before,
  [dir='rtl'] .slick-prev:before {
    content: '\\e90a';
  }

  .slick-next {
    right: -25px;
  }

  [dir='rtl'] .slick-next {
    right: auto;
    left: -25px;
  }

  [dir='rtl'] .slick-next:before {
    content: '\\e90b';
  }

  .slick-dotted.slick-slider {
    margin-bottom: 30px;
  }

  .slick-dots {
    bottom: 1rem;
    width: 100%;
    margin: 0;
    list-style: none;
    text-align: center;
    display: flex !important;
    justify-content: center;
    align-items: center;
  }

  .slick-dots li {
    position: relative;
    display: block;
    margin: 0 0.5rem;
    padding: 0;
    cursor: pointer;
  }

  .slick-dots li button {
    font-size: 0;
    line-height: 0;
    display: block;
    width: 1rem;
    height: 1rem;
    border-radius: 54rem;
    cursor: pointer;
    color: transparent;
    border: 0;
    outline: 0;
    opacity: 0.3;
    text-indent: -99999px;
    background: rgba(255, 255, 255, 0.89);
  }

  .slick-dots li button:hover,
  .slick-dots li.slick-active button {
    outline: 0;
    opacity: 1;
  }

  .slick-next,
  .slick-prev {
    width: 3rem;
    height: 3rem;
    background: #fff;
    opacity: 0.2;
    z-index: 5;
    border-radius: 32rem;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.35);
    color: #999;
  }

  .slick-next {
    right: 1rem;
  }

  .slick-prev {
    left: 1rem;
  }

  .slick-next:before,
  .slick-prev:before {
    color: #ccc;
    font-size: 1rem;
  }

  .slick-next:hover,
  .slick-prev:hover {
    background: #fff;
    opacity: 1;
  }

  .slick-next:focus,
  .slick-prev:focus {
    background: #fff;
  }

  .section-header {
    h3 {
      font-weight: 900;
    }
    .button {
      font-weight: 600;
      margin: 0 0 0.75rem;
    }
  }

  .section {
    blockquote {
      border-left: 4px solid #df6e22;
      padding: 0.75rem 1.5rem;
      color: rgba(0, 0, 0, 0.89);
      font-size: 1.125rem;
    }
    .article {
      padding-top: 1.5rem;
      padding-left: 1.5rem;
      border-left: 1px solid rgba(0, 0, 0, 0.12);
      padding-bottom: 6rem;
      @media only screen and (max-width: 40rem) {
        padding-left: 0;
        border: none;
      }
      img {
        margin-bottom: 1.5rem;
      }
      p {
        a {
          color: #ae2b26;
          text-decoration: underline;
        }
      }
    }
  }

  #quiz-landing img {
    max-width: 100%;
    margin-bottom: 1rem;
  }
  #quiz-landing .order-1 {
    -ms-flex-order: 1;
    order: 1;
  }
  @media (min-width: 1024px) {
    #quiz-landing .order-1 {
      -ms-flex-order: 2;
      order: 2;
    }
  }
  #quiz-landing .order-2 {
    -ms-flex-order: 2;
    order: 2;
  }
  @media (min-width: 1024px) {
    #quiz-landing .order-2 {
      -ms-flex-order: 1;
      order: 1;
    }
  }

  .overlay {
    position: fixed;
    right: 0;
    top: 0;
    left: 0;
    bottom: 0;
    background: #0000004d !important;
    z-index: 100;
    overflow-y: scroll;
  }

  .modal-point-history,
  .reveal {
    background: #fff;
    position: relative;
    width: 100%;
    max-width: 480px;
    margin: 100px auto;
    padding: 2rem;
    border-radius: 8px;
    outline: none;
  }

  .modal-close {
    position: absolute;
    top: 3px;
    right: 3px;
    width: 32px;
    height: 32px;
    font-size: 2rem;
    line-height: 32px;
    text-align: center;
    color: #999;
    z-index: 5;
    outline: none;
    cursor: pointer;
  }

  .modal-close .ci {
    font-size: 1.1rem;
    font-weight: 700;
  }

  .modal-point-history h2,
  .reveal h2 {
    font-weight: 700;
    font-size: 1.25rem;
  }
  .modal-point-history h3,
  .reveal h3 {
    font-size: 1rem;
    color: #000;
  }
  .modal-point-history .history-item h4 {
    margin-bottom: 0rem;
    color: black;
  }

  .modal-point-history .history-item h5 span {
    color: #999;
    font-weight: 700;
  }

  @media (min-width: 1024px) {
    .modal-point-history .history-list,
    .reveal {
      margin-top: 1.5rem;
    }
    .modal-point-history .history-item h4,
    .modal-point-history .history-item h5 {
      font-size: 0.875rem;
    }
    .modal-point-history .history-item h6 {
      font-size: 0.75rem;
      color: #999;
    }
  }
`;

export default base;
