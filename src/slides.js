import React from "react";
import {
    Deck,
    Slide,
    Heading,
    Text,
    Link,
    Image,
    Appear,
    CodePane,
    List,
    ListItem
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
import male_a_spa_with_spectogram from '../static/img/05_male_a_spa_with_spectogram.png'
import preemphasis from '../static/img/07_preemphasis.png'
import windowed_frame from '../static/img/08_windowed_frame.png'
import window_signals from '../static/img/08_window_signals.png'
import window_signals_real_audio from '../static/img/08_window_signals_real_audio.png'
import filterbanks from '../static/img/09_filterbanks.png'

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

const preemphasisPython = `
np.append(wave[0], wave[1:]- 0.95*wave[:-1])
`;

const windowingPython = `
frame_size = int(A440_freq*0.025)
frame = A440[:frame_size]
window =signal.windows.hamming(frame_size)
windowed_frame = frame*window
`;

const triangularFilter = `
fbank = np.zeros([number_of_filters, nfft])
for i in range(0, number_of_filters):
    for j in range(int(b[i]), int(b[i+1])):
        fbank[i,j] = (j-b[i]) / (b[i+1] - b[i])
    for j in range(int(b[i+1]), int(b[i+2])):
        fbank[i,j] = (b[i+2] - j) / (b[i+2] - b[i+1])
`;

const plotTriangularFilter = `
plt.plot(fbank[0])
plt.plot(fbank[4])
plt.plot(fbank[9])
...
plt.plot(fbank[34])
plt.plot(fbank[39])
`;

const mfccPlainPython = `
np.dot(
    np.fft.ifft(
        np.log(
            np.absolute(
                np.fft.fft(
                    frame_real_wave*window
                )
            )
        )
    ),
    fbank.T
)
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
                Y finalmente llegamos a un espectrograma
            </Heading>
            <Image src={male_a_spa_with_spectogram}/>
        </Slide>
        <Slide>
            <Heading size="2">
                Formantes Vocalicos para el espanol
            </Heading>
            <Image src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Spanish_Vowel_Formants_Bradlow1995.png"/>
            <Link href="https://es.wikipedia.org/wiki/Formante">
                <Text>
                    https://es.wikipedia.org/wiki/Formante
                </Text>
            </Link>
        </Slide>
        <Slide>
            <Heading size="2">
                Sistema auditivo
            </Heading>
            <Image src="https://838dts3d6s-flywheel.netdna-ssl.com/wp-content/uploads/2014/03/Screen-Shot-2017-06-12-at-4.39.50-PM-1.png" width="60%"/>
            <Link href="https://ncbegin.org/es/el-sistema-auditivo/">
                <Text>
                    https://ncbegin.org/es/el-sistema-auditivo/
                </Text>
            </Link>
        </Slide>
        <Slide>
            <Heading size="2">
                Extraccion de caracteristicas
            </Heading>
            <List>
                <Appear><ListItem>Mel Frequency Cepstral Coefficients (MFCC)</ListItem></Appear>
                <Appear><ListItem>Perceptual Linear Prediction (PLP)</ListItem></Appear>
                <Appear><ListItem>Linear Frequency Cepstral Coefficients (LFCC)</ListItem></Appear>
                <Appear><ListItem>Power Normalized Cepstral Coefficients (PNCC)</ListItem></Appear>
                <Appear><ListItem>Wavelet Package Features (WPF)</ListItem></Appear>
                <Appear><ListItem>Subband-Based Cepstrap Parameters (SBC)</ListItem></Appear>
                <Appear><ListItem>Mixed Wavelet Packet Advances Combinational Encoder (MWP-ACE)</ListItem></Appear>
            </List>
        </Slide>
        <Slide>
            <Heading size="2">
                MFCC
            </Heading>
            <Appear>
                <Heading size="3">
                    Preemfasis
                </Heading>
            </Appear>
            <Appear>
                <Text>
                    <InlineMath math="y[n] = x[n] - \alpha x[n-1] | 0.9 \le \alpha \le 1.0"/>
                </Text>
            </Appear>
            <Appear>
                <CodePane
                    lang="python"
                    source={preemphasisPython}
                    margin="20px auto"
                />
            </Appear>
            <Appear>
                <Image src={preemphasis}/>
            </Appear>
        </Slide>
        <Slide>
            <Heading size="2">
                Windowing
            </Heading>
            <BlockMath math="y[n] = w[n]s[n]"/>
            <Appear>
                <div>
                    <Text>
                        Ventana Rectangular
                    </Text>
                    <BlockMath math="
w[n]= \left\{ \begin{array}{lc}
             1  & 0 \leq n \le L-1 \\
             \\ 0 & n \lt 0 | n \gt L
             \end{array}
   \right."/>
                </div>
            </Appear>
            <Appear>
                <div>
                    <Text>
                        Ventana de Hamming
                    </Text>
                    <BlockMath math="
w[n]= \left\{ \begin{array}{lc}
             0.54 - 0.46 cos(\frac{2 \pi n}{L})  & 0 \leq n \le L-1 \\
             \\ 0 & n \lt 0 | n \gt L
             \end{array}
   \right."/>
                </div>
            </Appear>
        </Slide>
        <Slide>
            <Heading size="2">
                Windowing
            </Heading>
            <CodePane
                lang="python"
                source={windowingPython}
            />
            <Appear>
                <Image src={window_signals}/>
            </Appear>
        </Slide>
        <Slide>
            <Heading size="2">
                Windowing
            </Heading>
            <Image src={windowed_frame}/>
        </Slide>
        <Slide>
            <Heading size="2">
                Y en el audio real
            </Heading>
            <Image src={window_signals_real_audio}/>
        </Slide>
        <Slide>
            <Heading size="2">
                Filtros Triangulares
            </Heading>
            <BlockMath math="
H_m[k]= \left\{ \begin{array}{lc}
  0  & k \lt f[m-1] \\
  \frac{k-f[m-1]}{f[m]-f[m-1]} & f[m-1] \le k \le f[m] \\
  \frac{f[m+1]-k}{f[m+1]-f[m]} & f[m] \le k \le f[m+1] \\
  0 & k > f[m+1]
             \end{array}
   \right."/>
            <Appear>
                <CodePane
                    lang="python"
                    source={triangularFilter}
                />
            </Appear>
        </Slide>
        <Slide>
            <Heading size="2">
                Filtros Triangulares
            </Heading>
            <CodePane
                lang="python"
                source={plotTriangularFilter}
            />
            <Image src={filterbanks} width="70%"/>
        </Slide>
        <Slide>
            <Heading size="2">
                Cepstrum
            </Heading>
            <BlockMath math="
c[n] = \sum_{n=0}^{N-1}log(\left| \sum _{n=0}^{N-1}x[n] e^{-j\frac{2 \pi}{N}kn}
\right|)e^{j\frac{2 \pi}{N}kn}"/>
        </Slide>
        <Slide>
            <Heading size="2">
                Y eso en Python como es?
            </Heading>
            <CodePane
                lang="python"
                source={mfccPlainPython}
            />
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

