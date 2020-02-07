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
    ListItem,
    Markdown
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
import simplified_fe from '../static/img/10_simplified_fe.png'
import vq from '../static/img/11_vq.png'
import gmm from '../static/img/12_gmm.png'
import AFI from '../static/img/06_AFI.png'
import queremos_redes from '../static/img/14_queremos_redes.jpg'
import deepspeech_architecture from '../static/img/15_deepspeech_architecture.png'
import donde_esta_la_data from '../static/img/20_donde_esta_la_data.gif'

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

const kMeans = `
transcription = "agua"
num_clusters = len(set(transcription)) + 1
kmeans = KMeans(n_clusters=num_clusters)
results = kmeans.fit(mfccs)
`;

const gmmPython = `
transcription = "agua"
num_clusters = len(set(transcription)) + 1
gmm = mixture.GaussianMixture(n_components=num_clusters)
gmm.fit(mfccs)
`;

const mexbet = `
Consonantes|Labiales|Labiodentales|Dentales|Alveolares|Palatales|Alveolares
-|-|-|-|-|-|-
Oclusivos Sordos|p||t|||k
Oclusivos Sonoros|b||d|||g
Africado Sordo|||||tS|
Fricativos Sordos||f||s||x
Fricativos Sonoros|||||Z|
Nasales|m|||n|n~|
Lateral||||l||
Vibrantes||||r( r ||
`;

const mexbetVowels = `
Vocales|Anteriores|Media|Posteriores
-|-|-|-
Cerradas|i||u
Medias|e||o
Abierta||a|
`;

const data = `
Resource name|URL|Licence|Annotation|Length
-|-|-|-|-|
CIEMPIESS|[ciempiess.org](http://www.ciempiess.org/downloads)|CC v4.0| Utterance | 17h
DIMEx100|[turing.iimas.unam.mx](http://turing.iimas.unam.mx/~luis/DIME/CORPUS-DIMEX.html)| - |Phonetic|5h
VoxForge|[VoxForge.org](voxforge.org)| GPL | Utterance | 50+
Common Voice|[voice.mozilla.org](https://voice.mozilla.org/en/datasets)| CC | Uterance | 27+
M-AILABS|[caito.de](https://www.caito.de/2019/01/the-m-ailabs-speech-dataset/#more-242)| Custom | Uterance | 108
Heroico|[Open SLR 39](http://www.openslr.org/39/)| - | Uterance | 13
TEDx Spanish Corpus | [Open SLR 67](http://www.openslr.org/67/)| CC v4.0 | Utterance | 24
Google Language Resources AR, CH, CO, PR PR VE | [Open SLR 71](http://www.openslr.org/71/) | CC v4.0 | Uterance | -
LibriVox Spanish | [LDC2020S01](https://catalog.ldc.upenn.edu/LDC2020S01)|Librivox Open Licence|Uterance| 73
`;

const flaskRecognizer = `
@app.route("/recognize", methods=["GET", "POST"])
def recognize():
    if request.method == "POST":
        if "audio" not in request.files:
            return ({"response": "You must specify an audio parameter with
                                  a wav file"}, 400)
        audio_file = sr.AudioFile(request.files["audio"])
        with audio_file as source:
            audio = recognizer.record(source)
            hypothesis = recognizer.recognize_sphinx(
                audio,
                ( 'isolated_words_spa/words1.cd_semi_200',
                  'isolated_words_spa/words1.lm.DMP',
                  'isolated_words_spa/words1.dic'
                )
            )
        return {"reponse": "Audio processed", "hypothesis": hypothesis}
    else:
        return {"response": "Please use the POST method and specify audio
                             parameter with a wav file"}
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
                Posts
            </Heading>
            <List>
                <Appear><ListItem><Link href="https://medium.com/contraslashsas/hablemos-de-voz-56bbfe725e62">Hablemos de Voz</Link></ListItem></Appear>
                <Appear><ListItem><Link href="https://medium.com/contraslashsas/lets-talk-about-voice-e6f7f4dad156">Let’s talk about Voice</Link></ListItem></Appear>
            </List>
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
            <Heading size="4">
                Pero yo no tengo tiempo de ponerme a implementar extractores de caracteristicas
            </Heading>
            <List>
                <Appear>
                    <ListItem>
                        <Link href="https://librosa.github.io/librosa/generated/librosa.feature.mfcc.html">
                            LibRosa
                        </Link>
                    </ListItem>
                </Appear>
                <Appear>
                    <ListItem>
                        <Link href="https://github.com/jameslyons/python_speech_features">
                            Speech Features
                        </Link>
                    </ListItem>
                </Appear>
                <Appear>
                    <ListItem>
                        <Link href="https://github.com/MycroftAI/sonopy">
                                Sonopy
                        </Link>
                    </ListItem>
                </Appear>
                <Appear>
                    <ListItem>
                        <Link href="https://github.com/astorfi/speechpy">
                                SpeechPy
                        </Link>
                    </ListItem>
                </Appear>
                <Appear>
                    <ListItem>
                        <Link href="https://github.com/ddbourgin/numpy-ml">
                                Numpy ML
                        </Link>
                    </ListItem>
                </Appear>
                <Appear>
                    <ListItem>
                        <Link href="https://github.com/gionanide/Speech_Signal_Processing_and_Classification">
                                Speech Signal Processing and Classification
                        </Link>
                    </ListItem>
                </Appear>
            </List>
        </Slide>
        <Slide>
            <Heading size="2">
                Y Porque tan emocionado?
            </Heading>
            <Image src={simplified_fe}/>
        </Slide>
        <Slide>
            <Heading size="2">
                AX = b
            </Heading>
            <Appear><Heading size="4">Aja, y cual b</Heading></Appear>
        </Slide>
        <Slide>
            <Heading size="2">
                Un K-Means despues
            </Heading>
            <CodePane
                source={kMeans}
                lang="python"
            />
            <Image src={vq}/>
        </Slide>
        <Slide>
            <Heading size="2">
                GMM
            </Heading>
            <Appear>
                <Text>
                    <BlockMath math="
f(x|\mu,\Sigma) =\sum_{k=1}^{M}{c_k\frac{1}{\sqrt{2\pi|\Sigma_k|}}e^{(x-\mu_k)^T\Sigma^{-1}(x-\mu_k)}}
"
                    />
                </Text>
            </Appear>
        </Slide>
        <Slide>
            <Heading size="2">
                GMM
            </Heading>
            <CodePane
                source={gmmPython}
                lang="python"
            />
            <Image src={gmm}/>
        </Slide>
        <Slide>
            <Heading size="2">
                Muy bien con las ondas, y el lenguaje que?
            </Heading>
        </Slide>
        <Slide>
            <Heading size="2">
                Alfabeto Fonetico Internacional
            </Heading>
            <Image src={AFI} />
            <Link href="https://es.wikipedia.org/wiki/Alfabeto_Fon%C3%A9tico_Internacional">
                <Text>
                    https://es.wikipedia.org/wiki/Alfabeto_Fon%C3%A9tico_Internacional
                </Text>
            </Link>
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
                <Link href="http://www.ciempiess.org/Alfabetos_Foneticos/Evolucion_de_MEXBET.html">MEXBET</Link>
            </Heading>
            <Markdown source={mexbet}/>
        </Slide>
        <Slide>
            <Heading size="2">
                MEXBET - Vocales
            </Heading>
            <Markdown source={mexbetVowels}/>
        </Slide>
        <Slide>
            <Heading size="2">
                Lexicon
            </Heading>
        </Slide>
        <Slide>
            <Heading size="2">
                Modelo de Lenguaje
            </Heading>
            <Appear>
                <Text>
                    <BlockMath math="P(w_1^n) = \prod_{k=1}^{n}{P(w_k|w_1^{k-1})}"/>
                </Text>
            </Appear>
        </Slide>
        <Slide>
            <Heading size="2">
                Generacion del modelo acustico con HMM
            </Heading>
            <List>
                <Appear>
                    <ListItem>
                        <Link href="https://en.wikipedia.org/wiki/Baum%E2%80%93Welch_algorithm">
                            Entrenamiento con el Algoritmo Baum-Welch
                        </Link>
                    </ListItem>
                </Appear>
                <Appear>
                    <ListItem>
                        <Link href="https://en.wikipedia.org/wiki/Viterbi_algorithm">
                            Decodificacion con el Algoritmo de Viterbi
                        </Link>
                    </ListItem>
                </Appear>
            </List>
        </Slide>
        <Slide>
            <Image src={queremos_redes}/>
        </Slide>
        <Slide>
            <Heading size="2">
                Redes Neuronales
            </Heading>
            <List>
                <Appear>
                    <ListItem>
                        <Link href="https://github.com/mozilla/DeepSpeech">
                            Deep Speech
                        </Link>
                    </ListItem>
                </Appear>
                <Appear>
                    <ListItem>
                        <Link href="https://github.com/buriburisuri/speech-to-text-wavenet">
                            Speech to Text Wavenet
                        </Link>
                    </ListItem>
                </Appear>
                <Appear>
                    <ListItem>
                        <Link href="https://github.com/nl8590687/ASRT_SpeechRecognition">
                            ASRT Speech Recognition
                        </Link>
                    </ListItem>
                </Appear>
                <Appear>
                    <ListItem>
                        <Link href="https://github.com/PaddlePaddle/DeepSpeech">
                            Deep Speech 2
                        </Link>
                    </ListItem>
                </Appear>
            </List>
        </Slide>
        <Slide>
            <Heading size="2">
                Arquitectura de DeepSpeech
            </Heading>
            <Image src={deepspeech_architecture}/>
            <Link href="https://arxiv.org/abs/1412.5567">
                Archive page
            </Link>
            <Divider height={"5vh"}/>
            <Link href="https://www.youtube.com/watch?v=ZDgHS0wTYuo">
                Deep Speech: Free(ing) Speech with Deep Learning
            </Link>
        </Slide>
        <Slide>
            <Image src={donde_esta_la_data}/>
        </Slide>
        <Slide>
            <Markdown source={data}/>
            <Link href="https://github.com/open-speech-org/openspeechresources">
                https://github.com/open-speech-org/openspeechresources
            </Link>
        </Slide>
        <Slide>
            <Heading size="2">
                Open Speech Corpus
            </Heading>
            <List>
                <Appear><ListItem>Cuentos</ListItem></Appear>
                <Appear><ListItem>Afasia</ListItem></Appear>
                <Appear><ListItem>Palabras aisladas</ListItem></Appear>
            </List>
            <List>
                <Appear>
                    <ListItem>
                        <Link href="https://play.google.com/store/apps/details?id=com.contraslash.android.openspeechcorpus">
                            Aplicacion movil
                        </Link>
                    </ListItem>
                </Appear>
                <Appear>
                    <ListItem>
                        <Link href="https://pypi.org/project/openspeechcorpus/">
                            CLI
                        </Link>
                    </ListItem>
                </Appear>
            </List>
        </Slide>
        <Slide>
            <Image src="https://lh3.googleusercontent.com/XDvOFQGYiX12Lnhd6kKq4DzCqzlnI7YKCS5ZvQkZGat2uQpniCl9DYQSe_7nihgVRhI=w1440-h799-rw"/>
        </Slide>
        <Slide>
            <Image src="https://lh3.googleusercontent.com/LARaD4yTgHpqg7ys9KvMkMiJUtDghwXBiK5L9lxHR_-r3J4-adCjWe3FjAi4ApLGRbU=w1440-h799-rw"/>
        </Slide>
        <Slide>
            <Image src="https://lh3.googleusercontent.com/G6oQm-rQnyY9oMIynpLlXG7zKscQFkwMD20qpzEKFCUzYQIT_TviEDPr76r6Qq_crWI=w1440-h799-rw"/>
        </Slide>
        <Slide>
            <Heading size="2">
                Nada mas facil para comenzar?
            </Heading>
        </Slide>
        <Slide>
            <Heading size="2">
                <Link href="https://pypi.org/project/SpeechRecognition/">
                    Speech Recognition
                </Link>
            </Heading>
            <List>
                <Appear><ListItem><Link href="http://cmusphinx.sourceforge.net/wiki/">CMU Sphinx</Link></ListItem></Appear>
                <Appear><ListItem><Link href="https://cloud.google.com/speech/">Google Cloud Speech API</Link></ListItem></Appear>
                <Appear><ListItem><Link href="https://wit.ai/">Wit.ai</Link></ListItem></Appear>
                <Appear><ListItem><Link href="https://www.microsoft.com/cognitive-services/en-us/speech-api">Microsoft Bing Voice Recognition</Link></ListItem></Appear>
                <Appear><ListItem><Link href="https://houndify.com/">Houndify API</Link></ListItem></Appear>
                <Appear><ListItem><Link href="http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/speech-to-text.html">IBM Speech to Text</Link></ListItem></Appear>
                <Appear><ListItem><Link href="https://snowboy.kitt.ai/">Snowboy Hotword Detection</Link></ListItem></Appear>
            </List>
        </Slide>
        <Slide>
            <CodePane
                source={flaskRecognizer}
                lang="python"
            />
        </Slide>
        <Slide>
            <Image src="https://i.kym-cdn.com/entries/icons/original/000/028/021/work.jpg"/>
        </Slide>
        <Slide>
            <Text >
                Dar las gracias y huir
            </Text>
            <Image src="https://media.giphy.com/media/9rRacglGbs68E/giphy.gif"/>
        </Slide>
    </Deck>
);
