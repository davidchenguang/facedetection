# facedetection## 功能

我们可以利用face-api的人脸识别开源框架开发人脸识别的系统，本文是一个简单的示例，实现的功能一是可以实现对人脸的情绪识别，二是对识别的人脸打上情绪值得标签以及显示关键的识别点；功能如下所示：


## 所需要的相关知识

在这个示例中用到了Face-api开源框架的相关知识，HTML，JavaScript，NodeJS等，NodeJS主要功能提供本地Web访问。



## Face-api开源框架的API

### 检测人脸

检测图像中的所有的人脸。

`const detections = await faceapi.detectAllFaces(input)`

默认情况下，**detectAllFaces**使用SSD Mobilenet V1 人脸检测。您可以通过传递相应的options对象来指定面部检测器：

`const detections1 = await faceapi.detectAllFaces(input, new faceapi.SsdMobilenetv1Options())`

### 检测68个人脸特征点

**在人脸检测之后，我们还可以如下预测每个检测到的人脸的面部标记：**

检测图像中的所有人脸 + 为每个检测到的人脸计算68个面部标记点。

`const detectionsWithLandmarks = await faceapi.detectAllFaces(input).withFaceLandmarks()`

### 识别面部表情

**人脸表情识别可以对检测到的人脸执行如下操作：**

检测图像中的所有人脸 + 识别每个人脸的面部表情。

`const detectionsWithExpressions = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceExpressions()`

### 人脸检测模型

#### SSD Mobilenet V1

对于人脸检测，本项目实现了一个基于MobileNetV1的SSD（单点多盒检测器Single Shot Multibox Detector）。神经网络将计算图像中每个人脸的位置，并返回边界框以及每个人脸的概率。该人脸检测器的目标是在检测人脸边界盒时获得较高的精度，而不是较低的推理时间。量化模型的大小约为5.4 MB（**ssd_mobilenetv1_model**）。

#### 68点人脸标记检测模型

该软件包实现了非常轻巧、快速，但准确的68点面部标记检测器。 默认模型的大小仅为350kb（ face_landmark_68_model **），微型模型的大小仅为80kb（** face_landmark_68_tiny_model ）。 两种模型都采用了深度可分离卷积以及紧密连接的块的思想。 这些模型已经在约有35,000张面部图像的数据集上进行了训练，这些数据用68个面部标点标记。

### 人脸识别模型

对于面部识别，实现了类似于ResNet-34的体系结构，以从任何给定的面部图像计算面部描述符（具有128个值的特征向量），该描述符用于描述人脸的特征。 该模型“不限于”用于训练的一组面部，这意味着您可以将其用于任何人（例如您自己）的面部识别。 您可以通过比较两个人脸的面部描述符来确定两个人脸的相似性，例如通过计算欧式距离或使用您选择的任何其他分类器。

神经网络等效于[face-recognition.js](https://github.com/justadudewhohacks/face-recognition.js)中使用的**FaceRecognizerNet**和[dlib](https://github.com/davisking/dlib/blob/master/examples/dnn_face_recognition_ex.cpp)人脸识别示例中使用的网络。 权重已通过[davisking](https://github.com/davisking)进行了训练，该模型在LFW基准上的脸部识别上达到了99.38％的预测准确性。量化模型的大小约为6.2 MB (**face_recognition_model**).

#### 人脸表情识别模型

面部表情识别模型轻巧，快速，并提供合理的准确性。 该模型的大小约为310kb，采用深度可分离卷积和密集连接的块。 它已经过公开数据集上的各种图像以及从网络上抓取的图像的培训。 注意，戴眼镜可能会降低预测结果的准确性。

## 运行

1、git clone https://github.com/davidchenguang/facedetection.git

2、cd 命令转到相应目录下

3、node server.js

4、通过浏览器打开，http://localhost:3000 运行体验
