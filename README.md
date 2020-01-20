# Hablemos de voz

Desde que creamos los ordenadores nos hemos preguntado si serán inteligentes, Alan Turing en la prueba que lleva su nombre describió inteligencia como la capacidad de mantener una "conversación" con un agente y que sea indiferenciado con un humano. ¡Y la mayoría de seres humanos nos comunicamos hablando!

Desde los años 60, en los laboratorios de IBM y AT&T prototipos capaces de reconocer palabras han sido desarrollados y ochenta años después, los reconocedores automáticos de voz hacen parte de nuestra vida: Google Assistant, Siri, Alexa, Cortana y muchos otros.

En esta charla vamos a hablar de voz, desde lo teórico hasta lo práctico, entendiendo como esta señal de audio es muy característica dependiendo de nuestro cuerpo y nuestro idioma, como extraemos características y generamos modelos para predecir y producir voz, desde casi cero y con Python puro y duro

## Estructura de la charla

Introducción y demo (5 minutos):
Para captar la atención de los participantes, presentaré una rápida demostración de un generador de voz utilizando Python, mostrando un poco como a partir de una señal de voz es posible caracterizar y agrupar cada fonema usando Análisis de frecuencias en tiempos cortos (Short Time Frequency Analysis)

Fundamentación teórioca (20 minutos):
Aquí se muestra un poco la teoría clásica para la extracción de características, mostrando la transformación de la señal en coeficientes Mel que son muy populares en reconocimiento de voz y también otras técnicas para extraer características como PLP, LFCC y WPF.
También se explica un poco como se pueden generar modelos acústicos utilizando Pliegues dinámicos teporales (Dynamic Time Warping), Modelos Ocultos de Markov (Hidden Markov Models) y algunos modelos basados en redes neuronales profundas (Context Dependant Hidden Markov Models with Deep Neural Networks)
Por último como a partir de este modelo usualmente usado para reconocimiento es posible extraer vectores-i (iVectors) para la caracterización de locutor y generación de audio.

Implementación en Python (20 minutos):
En este espacio de tiempo se muestra la implementación concreta en Python de los conceptos teóricos usando paquetes de código abierto, así como herramientas de código abierto escritas sobre Python que pueden acelerar el desarrollo de producción y reconocimiento de voz

Presentación de Open Speech Corpus (5 minutos)
Se presenta Open Speech Corpus, un proyecto de código abierto con objetivo de recolectar voces masivamente de voluntarios para crear un corpus de gran vocabulario independiente de locutor para el idioma español

Preguntas (10 minutos)
