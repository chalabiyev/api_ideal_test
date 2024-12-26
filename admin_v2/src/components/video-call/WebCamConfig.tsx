import { useEffect, useState } from "react";
import { WebCamConfig } from "./WebCam";
import './WebCam.css';

const WebcamConfig = ({ showSettings, setShowSettings }: { showSettings: boolean; setShowSettings: any; }) => {

    const backgroundOptions = ['No background', 'Blur Background', 'Background Image'];

    const [webCamConfig, setWebCamConfig] = useState<WebCamConfig>({
        backgroundOption: 0,
        showOriginal: false,
        left: 0,
        top: 0,
        cropWidth: 640,
        cropHeight: 480,
        mirrorEnabled: false,
    });

    const [webCams, setWebCams] = useState<MediaDeviceInfo[]>([]);
    const [mics, setMics] = useState<MediaDeviceInfo[]>([]);
  
    const getDevices = () => {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        setWebCams(devices.filter((f) => f.kind == 'videoinput'));
        setMics(devices.filter((f) => f.kind == 'audioinput'));
      });
    };
  

    const saveSettings = () => {
        setShowSettings(false);
        localStorage.setItem('webCamConfig', JSON.stringify(webCamConfig));
    };
    const hideSettings = () => {
        setShowSettings(false);
    };

    useEffect(() => {
        getDevices();
        let wcConf = localStorage.getItem('webCamConfig');
        if (wcConf) {
          setWebCamConfig(JSON.parse(wcConf) as WebCamConfig);
        }
      }, []);


    return (
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
    );
}

export default WebcamConfig;