import { createGlobalStyle } from "styled-components";
import Homenaje from "./fonts/Homenaje-Regular.woff2";

export default createGlobalStyle`

* {
    font-family: "Homenaje";
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font-size: 100%;
    vertical-align: baseline;
}

/* custom variables */
:root {
      --color-greyedOutText: #575757;
      --color-brightText: #CACACA;
      --color-regularText: #898989;
      --color-functionalGreen: #238086;
      --color-darkerBG: #101018;
      --color-BgGradientStart: #181823;

    //   older variables (to be deleted as soon as the new styling is in place):
    --color-lightGray-background: #F4F4F4; 
    --color-navy-blue: #000D26;
    --color-dark-blue:#546B8E;
    --color-orange: #F79D00;
    --color-light-blue: #9EBAD8;
    --color-lightLight-blue: #DBE4F4;
    --color-aspect-yellow: #FFBC5F;
    --color-aspect-red: #F94732;
    --font-heading: italic 20px 'Roboto', Arial, Helvetica, sans-serif;
    --font-body: 'Roboto Condensed', Arial, Helvetica, sans-serif;
    }

@font-face {
    font-family: "Homenaje";
    src: local("Homenaje"), url(${Homenaje}) format("woff2");
    font-weight: 300;
    font-style: normal;
}

    
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
    display: block;
}
body {
    line-height: 1;
}
ol, ul {
    list-style: none;
}
blockquote, q {
    quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
    content: '';
    content: none;
}
`;

/* http://meyerweb.com/eric/tools/css/reset/
    v2.0 | 20110126
    License: none (public domain)
*/
