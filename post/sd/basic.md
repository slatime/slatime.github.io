#basic

## Stable Diffusion 
 - Stable Diffusion은 2022년에 발표된 text-to-image 딥러닝 모델이다.
 
이 모델은 [Latent Diffusion](https://github.com/CompVis/latent-diffusion) 모델의 일종이고, 독일 뮌헨 대학교 Machine Vision & Learning Group (CompVis) 연구실의 "잠재 확산 모델을 이용한 고해상도 이미지 합성 연구"를 기반으로  [Stability AI](https://en.wikipedia.org/wiki/Stable_Diffusion), CompVis LMU, Runway의 협동과 EleutherAI, LAION의 지원으로 만들어졌다고 한다. 또한, 이 모델은 오픈 소스로 공개되었고, 이는 [github](https://github.com/CompVis/stable-diffusion)에서 찾아볼 수 있다.
<br>
또한, 기존 모델과는 다르게 8GB 정도의 적은 VRAM 만으로 구동이 가능하여 일반 소비자에게도 접근성이 뛰어나다.
 <br>
아래 그래프를 보면 Latent Diffusion 모델의 Rate(bits/dim)가 제일 낮은 것을 알수 있다. 더 적은 비트 수로 더 많은 Dimension을 내포할 수 있다는 것이다.

![img](/images/latentdm.png)

## Diffustion 이미지처리 성능 
최근 딥러닝 분야에서 대표적인 이미지 생성 모델로 Autoencoder, GAN, 그리고 Diffusion 모델이 있습니다. 각 모델은 장단점을 가지고 있습니다.<br><br>예를 들어, Autoencoder는 학습 속도가 빠르지만 생성된 이미지의 품질이 낮다는 단점이 있습니다. GAN은 높은 품질의 이미지를 생성할 수 있지만, 원하는 다양한 결과를 얻기 어려운 단점이 있습니다. 반면 Diffusion 모델은 품질과 다양성 측면에서 모두 우수한 성능을 보입니다.

## Diffusion 원리
Diffusion 모델은 기본 이미지(시간 t=0)에 ChatGPT가 앞서 설명한 1. 노이즈(랜덤 색상의 점)를 추가합니다. 2. 3. 4.의 원리로 노이즈를 추가해갑니다.

**[Diffusion Model]**
![img](/images/dfmodel.png)
<br>

1000번 정도하면 퓨어한 노이즈(t=1000)를 얻을 수 있습니다. 그리고는 이미지 픽셀 값을 확률적으로 역전파하는 방식으로 셀수없이 반복하면서 다시 원본 t=0 시점의 사진을 구현합니다. 이런 과정을 거친 모델이 OpenAI에서 발표한 DALL-E2 모델입니다.

이미지 생성을 순차적인 단계로 진행하면서 생성된 이미지를 점차적으로 완성시키는 방식입니다. 이 과정에서 생성된 이미지는 초기에는 낮은 품질을 보이지만, 점차적으로 높은 품질로 수렴하게 됩니다.

또한 이미지 생성 과정에서 모델이 생성한 이미지를 이전 단계의 이미지로부터 구분할 수 있도록 하는 Diffusion process를 사용합니다. 이러한 과정을 통해 생성된 이미지의 다양성과 높은 품질을 유지할 수 있습니다.

## Diffusion 단점
직관적으로, 매우 많은 픽셀을 찍어서 1000번 이상 왕복하는 것은 컴퓨팅 능력이 많이 필요한 작업입니다. Diffusion 모델은 이 작업을 수행하는 데 시간이 매우 오래 걸립니다. 그러나 최근에는 새로운 방법인 Latent Diffusion Model이 등장하여 다시 핫해졌습니다.

Latent Diffusion은 이미지 학습을 위해 첫 단계에서 VAE나 U-Net과 같은 인코딩 방법을 사용하여 이미지를 변환합니다. 이렇게 인코딩된 이미지는 잠재 변수(latent variable)로서 압축된 행렬로 표현됩니다.

**[압축행렬 구현]**

![img](/images/dfs.png)


압축된 행렬에 노이즈를 더하고 복구하는 방법을 진행합니다. 이러한 방법으로인해 기존 Diffusion의 단점인 학습속도가 매우 개선됩니다.<br>
![img](/images/dfm.png)

원본 이미지와 재구성된 이미지 사이에는 차이가 있을 수 있지만, 새로운 학습 방법인 Latent Diffusion Model은 학습 속도를 향상시켜 더 많은 이미지를 더 적은 비용으로 학습할 수 있게 되었습니다. 이런 점은 AI 학습의 품질을 향상시키는 데 기여합니다.


----
Stablilty.ai 에서는 Latent Diffusion Model과 고품질 이미지 데이터셋인 LAION을 활용하여 엄청난 퀄리티를 산출해내는 모델을 발표했습니다. 모델 훈련에 $600,000의 비용이 들었으며, 상업적으로도 이용 가능하며, 오픈소스로 공개했습니다. 이름하여 Stable Diffusion입니다.

## Stable Diffusion의 모델 구조

- Stable Diffusion은 Latent Diffusion 모델이므로 당연히 구조는 Latent Diffusion 구조이다.<br>아래 그림은 Latent Diffusion 논문에 첨부되어 있는 모델의 구조도이다.
![img](/images/dfstructure.png)

## Stable Diffusion 확장
- Stable Diffusion의 장점으로는 AI 주제 변경이 용이하다는 것이 있습니다. 미리 학습된 기계 학습 모델을 새로운 데이터셋에 맞게 조정하여 높은 성능을 내는 Fine Tuning기법을 적용하면 주제확장이 용의합니다. 추가적인 사진을 포함하여 모델을 학습시키면 해당 주제를 생성하는 데 이용할 수 있습니다.

![img](/images/dmpo.png)

- 이런 방식으로 대량의 애니메이션 이미지를 추가적으로 학습시켜 상업적인 서비스를 제공하는 곳이 있습니다.
바로 Novel AI 입니다. 월 10달러에 서비스 중입니다.

![img](/images/dmno.png)

![img](/images/dmno1.png)
## Stable Diffusion Web UI
 - 웹 기반의 유저 인터페이스("Web UI")를 통해 Stable Diffusion 모델을 편리하게 사용할 수 있도록 만들어 놓은 프로젝트이다.<br>개발자의 꾸준한 업데이트를 통해, Stable Diffusion의 프론트엔드 기능 외에도 GFPGAN 보정, ESRGAN 업스케일링, Textual Inversion 등 다양한 기능을 도입하고 있다.


 ## 간단한 용어 정리 
- stable-diffusion-webui : 내 컴퓨터에 설치하는 AI 그림 뽑기 툴
- Google colab : 구글 서버로 하는 AI 그림 뽑기 툴
- 모델 : 정확히는 stable diffusion checkpoint지만, 선구자들이 이 단어를 써서 그런지 통상적으로 [모델 = 체크포인트]
- 프롬 : 정확히는 Prompt, 어떤 그림을 뽑을지 입력하는 명령어
- 긍정 프롬 : 이것을 바탕으로 그림을 뽑아달라는 명령어
- 부정 프롬 : 이것은 빼고 뽑아달라는 명령어
- 와일드카드 : 문법은 wildcard name, 특정 텍스트 파일의 문구를 랜덤으로 선정
- t2i : Text to Image, 명령어를 입력하여 그림 뽑기
- i2i : Image to Image, 그림으로 새로운 그림 뽑기
- 로라 : LORA(Low-Rank Adaptation of Large Language Models), 특정 인물이나 캐릭을 학습 시킨 것