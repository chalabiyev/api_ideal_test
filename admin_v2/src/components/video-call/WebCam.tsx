import { useEffect, useRef, useState } from 'react';
import OperatorBackground from '../../assets/webcam_background.webp';
import * as bodyPix from '@tensorflow-models/body-pix';
import '@tensorflow/tfjs-backend-webgl';
import './WebCam.css';

export interface WebCamConfig {
  webCamDeviceId?: string;
  micDeviceId?: string;
  backgroundOption: number;
  showOriginal: boolean;
  left: number;
  top: number;
  cropWidth: number;
  cropHeight: number;
  mirrorEnabled: boolean;
}

export interface WebCamProp {
  className?: string;
  onStreamChanged: (s: MediaStream) => void;
  showSettings: boolean;
  setShowSettings: (s: boolean) => void;
  width: number;
  height: number;
}

export const WebCam = ({
  className,
  onStreamChanged,
  showSettings,
  setShowSettings,
  width,
  height,
}: WebCamProp) => {
  const backgroundOptions = ['No background', 'Blur Background', 'Background Image'];
  const webCamRef = useRef<HTMLVideoElement>(null);
  const canvasForBackgroundRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLVideoElement>(null);
  const resultVideoRef = useRef<HTMLVideoElement>(null);
  const operatorBackgrounRef = useRef<HTMLImageElement>(null);
  const [webCams, setWebCams] = useState<MediaDeviceInfo[]>([]);
  const [mics, setMics] = useState<MediaDeviceInfo[]>([]);

  const getDevices = () => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      setWebCams(devices.filter((f) => f.kind == 'videoinput'));
      setMics(devices.filter((f) => f.kind == 'audioinput'));
    });
  };

  const [webCamConfig, setWebCamConfig] = useState<WebCamConfig>({
    backgroundOption: 0,
    showOriginal: false,
    left: 0,
    top: 0,
    cropWidth: 640,
    cropHeight: 480,
    mirrorEnabled: false,
  });

  const loadBodyPix = () => {
    let options: any = {
      multiplier: 0.75,
      stride: 32,
      quantBytes: 4,
    };
    bodyPix
      .load(options)
      .then((net: any) => perform(net))
      .catch((err: any) => console.log(err));
  };

  const perform = async (net: any) => {
    // eslint-disable-next-line
    const width = webCamRef.current!.width;
    // eslint-disable-next-line
    const height = webCamRef.current!.height;
    // eslint-disable-next-line
    while (true) {
      // eslint-disable-next-line
      const segmentation = await net.segmentPerson(canvasRef.current, {
        internalResolution: 'high',
      });
      const backgroundBlurAmount = 6;
      const edgeBlurAmount = 2;
      const flipHorizontal = false;
      if (webCamConfig.backgroundOption == 1) {
        bodyPix.drawBokehEffect(
          canvasForBackgroundRef.current!,
          canvasRef.current!,
          segmentation,
          backgroundBlurAmount,
          edgeBlurAmount,
          flipHorizontal
        );
      } else if (webCamConfig.backgroundOption == 2) {
        let opts = {
          foregroundColor: { r: 0, g: 0, b: 0, a: 255 },
          backgroundColor: { r: 0, g: 0, b: 0, a: 0 },
        };

        let offCanvas = new OffscreenCanvas(width, height);
        let ctx = canvasForBackgroundRef.current!.getContext('2d');
        let offCtx = offCanvas.getContext('2d');
        const personMasked = bodyPix.toMask(
          segmentation,
          opts.foregroundColor,
          opts.backgroundColor
        );
        ctx!.drawImage(operatorBackgrounRef.current!, 0, 0, width, height);
        const oldGCO = offCtx!.globalCompositeOperation;
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
  };

  useEffect(() => {
    getDevices();
    let wcConf = localStorage.getItem('webCamConfig');
    if (wcConf) {
      setWebCamConfig(JSON.parse(wcConf) as WebCamConfig);
    }
  }, []);

  const sendStream = (videoStream: MediaStream, micDeviceId: string) => {
    let lastStream = new MediaStream(videoStream);
    navigator.mediaDevices
      .getUserMedia({ audio: { deviceId: { exact: micDeviceId } } })
      .then((ms: MediaStream) => {
        // eslint-disable-next-line
        for (const track of ms.getAudioTracks()) {
          // eslint-disable-next-line
          lastStream.addTrack(track);
          // eslint-disable-next-line
        }
        onStreamChanged(lastStream);
      });
  };

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
    } catch (error) {}
    let query =
      webCamConfig.webCamDeviceId != undefined
        ? {
            video: {
              width: webCamConfig.backgroundOption == 0 ? 1280 : 640,
              height: webCamConfig.backgroundOption == 0 ? 720 : 480,
              deviceId: webCamConfig.webCamDeviceId,
            },
          }
        : {
            video: {
              width: webCamConfig.backgroundOption == 0 ? 1280 : 640,
              height: webCamConfig.backgroundOption == 0 ? 720 : 480,
            },
          };
    navigator.mediaDevices
      .getUserMedia(query)
      .then((ws) => {
        if (webCamRef.current == undefined) return;
        let zoomEnabled = !(webCamConfig.left == 0 && webCamConfig.top == 0);
        webCamRef.current.srcObject = ws;
        webCamRef.current.play();
        if (zoomEnabled) {
          if (
            typeof MediaStreamTrackProcessor === 'undefined' ||
            typeof MediaStreamTrackGenerator === 'undefined'
          ) {
            alert(
              'Your browser does not support the experimental MediaStreamTrack API ' +
                'for Insertable Streams of Media. See the note at the bottom of the ' +
                'page.'
            );
          }
          const track = ws.getVideoTracks()[0];
          const processor = new MediaStreamTrackProcessor({ track: track });
          const { readable } = processor;
          const generator = new MediaStreamTrackGenerator({ kind: 'video' });
          const { writable } = generator;
          canvasRef.current!.srcObject = new MediaStream([generator]);
          canvasRef.current!.play();
          readable.pipeThrough(new TransformStream({ transform })).pipeTo(writable);
        } else {
          canvasRef.current!.srcObject = ws;
          canvasRef.current!.play();
        }

        if (webCamConfig.backgroundOption == 0) {
          (resultVideoRef.current! as any).srcObject = (canvasRef.current as any).srcObject;
          if (onStreamChanged != undefined) {
            sendStream(resultVideoRef.current!.srcObject as MediaStream, webCamConfig.micDeviceId!);
          }
        } else {
          setTimeout(() => {
            loadBodyPix();
            setTimeout(async () => {
              let canvasStream = await (canvasForBackgroundRef.current! as any).captureStream(20);
              (resultVideoRef.current! as any).srcObject = canvasStream;
              if (onStreamChanged != undefined) {
                sendStream(
                  resultVideoRef.current!.srcObject as MediaStream,
                  webCamConfig.micDeviceId!
                );
              }
            }, 1000);
          }, 1000);
        }
      })
      .catch((e) => {
        alert('Webcam not found!');
        console.log(e);
      });
  }, [webCamConfig]);

  const transform = (origVideoFrame: any, controller: any) => {
    // Cropping from an existing video frame is supported by the API in Chrome 94+.
    const newFrame = new VideoFrame(origVideoFrame, {
      visibleRect: {
        x: webCamConfig.left,
        y: webCamConfig.top,
        width: webCamConfig.cropWidth,
        height: webCamConfig.cropHeight,
      },
    });
    controller.enqueue(newFrame);
    origVideoFrame.close();
  };

  const saveSettings = () => {
    setShowSettings(false);
    localStorage.setItem('webCamConfig', JSON.stringify(webCamConfig));
  };
  const hideSettings = () => {
    setShowSettings(false);
  };

  return (
    <div id="webcam">
      <div className="modal" style={{ display: showSettings ? 'block' : 'none' }}>
        <div className="modal-content">
          <div className="modal-header">
            <span className="close">&times;</span>
            <h2>WebCam Settings</h2>
          </div>
          <div className="modal-body">
            <div className="webcamSettingsform">
              <div className="container">
                <label htmlFor="webcam">
                  <b>WebCam</b>
                </label>
                <select
                  id="webcam"
                  value={webCamConfig.webCamDeviceId}
                  onChange={(e) =>
                    setWebCamConfig({ ...webCamConfig, webCamDeviceId: e.target.value })
                  }
                >
                  {webCams.map((wc) => {
                    return (
                      <option key={wc.deviceId} value={wc.deviceId}>
                        {wc.label}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="background">
                  <b>Background</b>
                </label>
                <select
                  id="background"
                  value={webCamConfig.backgroundOption}
                  onChange={(e) =>
                    setWebCamConfig({ ...webCamConfig, backgroundOption: parseInt(e.target.value) })
                  }
                >
                  {backgroundOptions.map((itm, itmidx) => {
                    return (
                      <option key={itm} value={itmidx}>
                        {itm}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="mirror">
                  <b>Mirror Enabled</b>
                </label>
                <input
                  id="mirror"
                  type="checkbox"
                  checked={webCamConfig.mirrorEnabled}
                  onChange={(e) =>
                    setWebCamConfig({ ...webCamConfig, mirrorEnabled: e.target.checked })
                  }
                />
                <label htmlFor="mic">
                  <b>Microphone</b>
                </label>
                <select
                  id="mic"
                  value={webCamConfig.micDeviceId}
                  onChange={(e) =>
                    setWebCamConfig({ ...webCamConfig, micDeviceId: e.target.value })
                  }
                >
                  {mics.map((wc) => {
                    return (
                      <option key={wc.deviceId} value={wc.deviceId}>
                        {wc.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={saveSettings}>Save</button>
            <button onClick={hideSettings}>Close</button>
          </div>
        </div>
      </div>
      <img
        alt="bg"
        hidden={true}
        ref={operatorBackgrounRef}
        src={OperatorBackground}
        width={width}
        height={height}
      />
      <video
        hidden={!webCamConfig.showOriginal}
        ref={webCamRef}
        width={width}
        height={height}
        muted={true}
        className={webCamConfig.mirrorEnabled ? 'mirroredWebCamClass' : ''}
      ></video>
      <video
        hidden={true}
        ref={canvasRef}
        width={width}
        height={height}
        muted={true}
        className={webCamConfig.mirrorEnabled ? 'mirroredWebCamClass' : ''}
      ></video>
      <canvas
        hidden={true}
        ref={canvasForBackgroundRef}
        width={width}
        height={height}
        className={webCamConfig.mirrorEnabled ? 'mirroredWebCamClass' : ''}
      ></canvas>
      <video
        ref={resultVideoRef}
        autoPlay={true}
        width={width}
        height={height}
        muted={true}
        className={className + (webCamConfig.mirrorEnabled ? ' mirroredWebCamClass' : '')}
      ></video>
    </div>
  );
};
