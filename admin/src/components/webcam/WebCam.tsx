import { useEffect, useRef } from 'react';
// import OperatorBackground from '../../assets/images/opback.jpg';
import * as bodyPix from '@tensorflow-models/body-pix';
import { ModelConfig } from '@tensorflow-models/body-pix/dist/body_pix_model';
import '@tensorflow/tfjs-backend-webgl';

export const WebCam = (
    { className, webCamDeviceId, backgroundOption, showOriginal, left, top, cropWidth, cropHeight, width, height, onStreamChanged, mirrorEnabled }:
        { className?: string, webCamDeviceId: string | undefined, backgroundOption: number, showOriginal: boolean, left: number, top: number, cropWidth: number, cropHeight: number, width: number, height: number, onStreamChanged: any, mirrorEnabled: boolean }
) => {

    const webCamRef = useRef<HTMLVideoElement>(null);
    const canvasForBackgroundRef = useRef<HTMLCanvasElement>(null);
    const canvasRef = useRef<HTMLVideoElement>(null);
    const resultVideoRef = useRef<HTMLVideoElement>(null);
    const operatorBackgrounRef = useRef<HTMLImageElement>(null);


    const loadBodyPix = () => {
        let options: ModelConfig = {
            multiplier: 1,
            outputStride: 32,
            quantBytes: 4,
            architecture: 'ResNet50',
        }
        bodyPix.load(options)
            .then(net => perform(net))
            .catch(err => console.log(err))
    }

    const perform = async (net: any) => {
        const width = webCamRef.current!.width;
        const height = webCamRef.current!.height;
        while (true) {
            const segmentation = await net.segmentPerson(canvasRef.current, { internalResolution: "high" });
            const backgroundBlurAmount = 6;
            const edgeBlurAmount = 2;
            const flipHorizontal = false;
            if (backgroundOption == 1) {
                bodyPix.drawBokehEffect(
                    canvasForBackgroundRef.current!, canvasRef.current!, segmentation, backgroundBlurAmount,
                    edgeBlurAmount, flipHorizontal);
            } else if (backgroundOption == 2) {
                let opts = {
                    foregroundColor: { r: 0, g: 0, b: 0, a: 255 },
                    backgroundColor: { r: 0, g: 0, b: 0, a: 0 }
                };

                let offCanvas = new OffscreenCanvas(width, height);
                let ctx = canvasForBackgroundRef.current!.getContext('2d');
                let offCtx = offCanvas.getContext('2d');
                const personMasked = bodyPix.toMask(segmentation, opts.foregroundColor, opts.backgroundColor);
                ctx!.drawImage(operatorBackgrounRef.current!, 0, 0, width, height);
                const oldGCO = offCtx!.globalCompositeOperation
                // Prepare the mask, blend with webcam video
                offCtx!.clearRect(0, 0, width, height);
                offCtx!.putImageData(personMasked, 0, 0);
                offCtx!.globalCompositeOperation = 'source-in';
                offCtx!.drawImage(canvasRef.current!, 0, 0, width, height);
                // Restore GCO
                offCtx!.globalCompositeOperation = oldGCO;

                // Copy video with mask on top of background
                ctx!.drawImage(offCanvas, 0, 0);
            }
        }
    }

    useEffect(() => {
        try {
            if ((webCamRef.current! as any).srcObject) {
                (webCamRef.current! as any).srcObject.getTracks().forEach(function (track: any) {
                    track.stop();
                });
            }
            if (canvasRef.current!.srcObject) {
                (canvasRef.current! as any).srcObject.getTracks().forEach(function (track: any) {
                    track.stop();
                });
            }
            if ((resultVideoRef.current! as any).srcObject) {
                (resultVideoRef.current! as any).srcObject.getTracks().forEach(function (track: any) {
                    track.stop();
                });
            }
        } catch (error) {

        }
        let query = {
            video: {
                width: 1280, height: 720,
                deviceId: { exact: webCamDeviceId }
            }
        };
        navigator.mediaDevices.getUserMedia(query).then((ws) => {
            let zoomEnabled = !(left == 0 && top == 0);
            webCamRef.current!.srcObject = ws;
            webCamRef.current!.play();
            if (zoomEnabled) {
                // if (typeof MediaStreamTrackProcessor === 'undefined' ||
                //     typeof MediaStreamTrackGenerator === 'undefined') {
                //     alert(
                //         'Your browser does not support the experimental MediaStreamTrack API ' +
                //         'for Insertable Streams of Media. See the note at the bottom of the ' +
                //         'page.');
                // }
                const track = ws.getVideoTracks()[0];
                const processor = new MediaStreamTrackProcessor({ track: track });
                const { readable } = processor;
                const generator = new MediaStreamTrackGenerator({ kind: 'video' });
                const { writable } = generator;
                canvasRef.current!.srcObject = new MediaStream([generator]);
                canvasRef.current!.play();
                readable
                    .pipeThrough(new TransformStream({ transform }))
                    .pipeTo(writable);
            } else {
                canvasRef.current!.srcObject = ws;
                canvasRef.current!.play();
            }

            if (backgroundOption == 0) {
                (resultVideoRef.current! as any).srcObject = (canvasRef.current as any).srcObject;
                if (onStreamChanged != undefined) {
                    onStreamChanged((resultVideoRef.current as any).srcObject);
                }
            } else {
                setTimeout(() => {
                    loadBodyPix();
                    setTimeout(async () => {
                        let canvasStream = await (canvasForBackgroundRef.current! as any).captureStream(20);
                        (resultVideoRef.current! as any).srcObject = canvasStream;
                        if (onStreamChanged != undefined) {
                            onStreamChanged((resultVideoRef.current! as any).srcObject);
                        }
                    }, 1000);

                }, 1000);
            }
        }).catch((e) => {
            console.log(e);
        });
    }, [webCamDeviceId]);


    const transform = (origVideoFrame: any, controller: any) => {
        // Cropping from an existing video frame is supported by the API in Chrome 94+.
        const newFrame = new VideoFrame(origVideoFrame, {
            visibleRect: {
                x: left,
                y: top,
                width: cropWidth,
                height: cropHeight
            }
        });
        controller.enqueue(newFrame);
        origVideoFrame.close();
    }


    return (
        <div id='webcam'>
            {/* <img hidden={true} ref={operatorBackgrounRef} src={OperatorBackground} width={width} height={height} /> */}
            <video hidden={!showOriginal} ref={webCamRef} width={width} height={height} muted={true} className={mirrorEnabled ? 'mirroredWebCamClass' : ''} >
            </video>
            <video hidden={true} ref={canvasRef} width={width} height={height} muted={true} className={mirrorEnabled ? 'mirroredWebCamClass' : ''} >
            </video>
            <canvas hidden={true} ref={canvasForBackgroundRef} width={width} height={height} className={mirrorEnabled ? 'mirroredWebCamClass' : ''} >
            </canvas>
            <video ref={resultVideoRef} autoPlay={true} width={width} height={height} muted={true} className={className + (mirrorEnabled ? ' mirroredWebCamClass' : '')} >
            </video>
        </div>);

}