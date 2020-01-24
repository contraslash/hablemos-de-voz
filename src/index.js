import { createElement } from 'react';
import { render } from 'react-dom';
import { MDXProvider } from '@mdx-js/react';

import {
    Deck,
    Slide,
    Notes,
    FlexBox,
    Box,
    Progress,
    FullScreen,
    mdxComponentMap
} from 'spectacle';

// SPECTACLE_CLI_THEME_START
const theme = {
    colors: {
        primary: '#888888',
        secondary: '#000000',
        tertiary: '#ffffff',
        quaternary: '#ffc951',
        quinary: '#8bddfd'
    },
    fonts: {
        header: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        text: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        monospace: '"Consolas", "Menlo", monospace'
    },
    fontSizes: {
        h1: '52px',
        h2: '44px',
        h3: '40px',
        h4: '32px',
        text: '26px',
        monospace: '20px'
    },
    space: {
        headerMargin: '16px 16px 24px',
        textMargin: '16px',
        listMargin: '16px 0',
        slidePadding: '2em'
    }};
// SPECTACLE_CLI_THEME_END


// SPECTACLE_CLI_MDX_START
import slides, { notes } from '../decks/index.mdx';
// SPECTACLE_CLI_MDX_END


// SPECTACLE_CLI_TEMPLATE_START
const template = () =>
    createElement(
        FlexBox,
        {
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: 0,
            width: 1
        },
        [
            createElement(
                Box,
                { padding: 10, key: 'progress-templ' },
                createElement(Progress)
            ),
            createElement(
                Box,
                { padding: 10, key: 'fullscreen-templ' },
                createElement(FullScreen)
            )
        ]
    );
// SPECTACLE_CLI_TEMPLATE_END

const MDXSlides = () =>
    createElement(
        Deck,
        {
            loop: true,
            theme,
            template
        },
        slides
            .map((MDXSlide, i) => [MDXSlide, notes[i]])
            .map(([MDXSlide, MDXNotesForSlide], i) =>
                createElement(
                    Slide,
                    {
                        key: `slide-${i}`,
                        slideNum: i
                    },
                    createElement(
                        MDXProvider,
                        {
                            components: mdxComponentMap
                        },
                        createElement(MDXSlide, null),
                        createElement(Notes, null, createElement(MDXNotesForSlide, null))
                    )
                )
            )
    );

render(createElement(MDXSlides, null), document.getElementById('root'));
