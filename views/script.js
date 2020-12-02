const video = document.getElementById('video')

let expression;


//导入训练好的模型,所有模型都加载完毕后再启动我们的视频
//通过 Promise 的 all 将这些文件同时进行异步加载，
//tinyFaceDetector 这是轻量级可以快速识别人脸的模型
//faceLandmark68Net 用于对人脸不同部位识别的模型
//faceRecognitionNet 识别出人脸的位置，和覆盖的范围
//faceExpressionNet 用于识别人的情绪

Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
]).then (startVideo)

//通过摄像头捕捉视频
//这里我们使用 navigator 的 getUserMedia 获取设备的多媒体设备，传入 video 表示要获取视频流，然后将视频流传入到 video 标签来显示。

function startVideo(){
    navigator.getUserMedia(
        { video:{} },
        stream => video.srcObject = stream,
        err => console.error(err)

    )

}

//获取识别数据
//识别是个耗时的操作，所以用异步方法获取识别数据，调用 faceapi 的 detectAllFaces 方法，
//传入要识别的资源，也就是视频，然后我们要识别什么可以传入一个 options 告诉识别器我们要识
//别什么。打印识别出来的结果数据。


video.addEventListener('play',() => {

//faceapi.createCanvasFromMedia(video) 创建 canvas
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)

//让 canvas 与我们 vidoe 大小匹配
    const displaysize = { width: video.width,height:video.height }

    faceapi.matchDimensions(canvas,displaysize)
    setInterval(async () => {
        const expression = await faceapi.detectAllFaces(video,
        new faceapi.SsdMobilenetv1Options()).withFaceLandmarks().withFaceExpressions()
      


     //将我们测试的框结果与显示大小相匹配。
            const resizedDetections = faceapi.resizeResults(expression,displaysize)
       
     //清除上一次绘制的结果，下面就是将结果绘制到视频上
            canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height)
            faceapi.draw.drawDetections(canvas,resizedDetections)
            faceapi.draw.drawFaceLandmarks(canvas,resizedDetections)
            faceapi.draw.drawFaceExpressions(canvas,resizedDetections)
        },100)

})