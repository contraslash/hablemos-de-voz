import React from "react";
import {
    Deck,
    Slide,
    Heading,
    Text,
    Link,
    Image,
    Appear,
    CodePane
} from "spectacle";

import { InlineMath, BlockMath } from 'react-katex';
import { VerticalAlign, HorizontalAlign, JustifyAlign, Divider } from '../containers/layout'
import { SimpleWave, MyDropZone } from '../components/simple_component'
import 'katex/dist/katex.min.css';

import qr from '../static/img/qr.png'
import agua_wav from '../static/wav/01_agua.wav'
import A440 from '../static/wav/02_A_440.wav'
import voz_agua from '../static/img/01_voz_agua.png'
import voz_agua_zoom from '../static/img/01_voz_agua_zoom.png'
import voz_agua_quantization from '../static/img/01_voz_agua_quantization.png'
import A440_piano from '../static/wav/02_A_440_piano.wav'
import A_440_piano_fourier from '../static/img/04_A_440_piano_fourier.png'
import A_440_piano_fourier_with_harmonics from '../static/img/04_A_440_piano_fourier_with_harmonics.png'
import a_section_fourier_transform from '../static/img/05_a_section_fourier_transform.png'
import male_a_spa from '../static/wav/05_male_a_spa.wav'
import aparato_fonador from '../static/img/05_aparato_fonador.png'

const fourier = `
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import wavfile

frequency, wave = wavfile.read("A_440_piano.wav")

fourier = np.fft.fft(wave)
plt.plot(fourier[:int(len(fourier)/2)])
`;

const axvlinesFourier = `
plt.axvline(440,color="red")
plt.axvline(440*2,color="red")
plt.axvline(440*3,color="red")
plt.axvline(440*4,color="red")
plt.axvline(440*5,color="red")
plt.axvline(440*6,color="red")
`;

export const Slides = (props) => (
    <Deck transition={['zoom','slide']} transitionDuration={800} {...props}>
        <Slide>
            <Heading size={1} textColor="secondary" >
                Hablemos de Voz
            </Heading>
            <Heading size={3}>
                Mauricio Collazos
            </Heading>
        </Slide>
        <Slide>
            <Image src={qr} />
            <Link href="https://contraslash.github.io/hablemos-de-voz/">
                <Text>https://contraslash.github.io/hablemos-de-voz/</Text>
            </Link>
        </Slide>
        <Slide>
            <Heading size="2" >
                Qué es la voz?
            </Heading>
            <Divider/>
            <SimpleWave src={agua_wav}/>
        </Slide>
        <Slide>
            <Heading size="2">
                Una senal de  Audio
            </Heading>
        </Slide>
        <Slide>
            <Heading size="2">
                Una senal como esta?
            </Heading>
            <SimpleWave src={A440} />

            <InlineMath math="y(t) = A sin(\omega t + \varphi )"/>
        </Slide>
        <Slide>
            <Heading size="2">
                Como representamos senales de audio?
            </Heading>
            <Appear><Image src={voz_agua} /></Appear>
            <Appear><Image src={voz_agua_zoom} /></Appear>
            <Appear><Image src={voz_agua_quantization} /></Appear>
        </Slide>
        <Slide>
            <Heading size="2">
                Cómo extraemos información de una senal?
            </Heading>
            <SimpleWave src={A440_piano} />
        </Slide>
        <Slide>
            <Heading size="2">
                Armonicos
            </Heading>
            <Image src="https://media.giphy.com/media/QW2KVsnNquaiI/giphy.gif"/>
        </Slide>

        <Slide>
            <Heading size="2">
                Armonicos
            </Heading>
            <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Overtone.jpg/800px-Overtone.jpg"/>
            <Link href="https://en.wikipedia.org/wiki/Overtone">
                <Text>
                    https://en.wikipedia.org/wiki/Overtone
                </Text>
            </Link>
        </Slide>
        <Slide>
            <Heading size="2">
                Fourier
            </Heading>
            <InlineMath math="f(x) = \frac{1}{2} \, a_{0} + \sum_{n=1}^{\infty} \left[
   a_{n}\,\boldsymbol{\cos} (n\,x) + b_{n} \,\boldsymbol{\sin} (n\,x) \right]"/>

<Divider/>
            <Link href="https://www.youtube.com/watch?v=spUNpyF58BY">
                <Text>
                    Pero ¿qué es la Transformada de Fourier? Una introducción visual
                </Text>
            </Link>
        </Slide>
        <Slide>
            <Heading size="2">
                Fourier
            </Heading>
            <CodePane
                lang="python"
                source={fourier}
                margin="20px auto"
            />
            <Image src={A_440_piano_fourier} />
        </Slide>
        <Slide>
            <Heading size="2">
                Fourier
            </Heading>
            <CodePane
                lang="python"
                source={axvlinesFourier}
                margin="20px auto"
            />
            <Image src={A_440_piano_fourier_with_harmonics}/>
        </Slide>
        <Slide>
            <Heading size="2">
                Y un piano que tiene que ver con la voz?
            </Heading>
        </Slide>
        <Slide>
            <Heading size="2">
                Aparato fonador
            </Heading>
            <Image src={aparato_fonador}/>
            <Link href="http://irenemena99.blogspot.com/2016/02/aparato-fonador.html">
                <Text>
                    http://irenemena99.blogspot.com/2016/02/aparato-fonador.html
                </Text>
            </Link>
        </Slide>
        <Slide>
            <Heading size="2">
                Todos digan A
            </Heading>
            <SimpleWave src={male_a_spa} />

            <Image src={a_section_fourier_transform} width="60%"/>
        </Slide>
        <Slide>
            <Heading size="2">

            </Heading>
        </Slide>
        <Slide>
            <Heading size="2">

            </Heading>
        </Slide>
        <Slide>
            <Heading size="2">

            </Heading>
        </Slide>
        <Slide>
            <Heading size="2">

            </Heading>
        </Slide>
        <Slide>
            <Heading size="2">

            </Heading>
        </Slide>
        <Slide>
            <Heading size="2">

            </Heading>
        </Slide>
    </Deck>
);

