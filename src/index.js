import React, { createElement } from 'react';
import { render } from 'react-dom';
import { MDXProvider } from '@mdx-js/react';

import createTheme from 'spectacle/lib/themes/default';

import {
    Deck,
    Slide,
    Notes,
    Heading,
    List,
    ListItem,
} from 'spectacle';

// SPECTACLE_CLI_THEME_START
const theme = createTheme(
  {
    primary: 'white',
    secondary: 'black'
  },
  {
    primary: 'Yanone Kaffeesatz',
    secondary: {
      name: 'Droid Serif',
      googleFont: true,
      styles: ['400', '700i']
    }
  }
);


// SPECTACLE_CLI_MDX_START
import slides, { notes } from '../decks/index.mdx';
// SPECTACLE_CLI_MDX_END

console.log(slides);
console.log(notes);


const MDXSlides = () =>
    createElement(
        Deck,
        {
            loop: false,
            theme
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
                        null,
                        createElement(MDXSlide, null),
                        createElement(Notes, null, createElement(MDXNotesForSlide, null))
                    )
                )
            )
    );

const RegularSlides = () => {
    return (
        <Deck transition={['zoom','slide']} transitionDuration={800}>
            <Slide bgColor="primary">
                <Heading size={1} fit caps>
                    React Presentations
                </Heading>
                <Heading size={2} fit caps>
                    Written In React
                </Heading>
            </Slide>
            <Slide bgColor="black">
                <Heading size={1} fit textColor="primary" textFont="secondary">
                    Wait What?
                </Heading>
            </Slide>
            <Slide bgColor="primary" textColor="black" align="center top">
                <Heading size={1} textColor="black" textFont="primary">
                    Thats right
                </Heading>
                <List>
                    <ListItem>Inline style based theme system</ListItem>
                    <ListItem>Autofit Text</ListItem>
                    <ListItem>PDF Export</ListItem>
                </List>
            </Slide>
        </Deck>
    )
}

render(createElement(MDXSlides, null), document.getElementById('root'));
