import { Box } from '@mui/material';
import { useRef, useLayoutEffect, useState, useEffect } from 'react';

import { toast } from 'sonner';
import { WebCam } from 'src/components/webcam/WebCam';

const WebCamTestView = () => {

  const [webcam, setWebcam] = useState<string | null>('');
  const [micDevice, setMicDevice] = useState('');
  const [background, setBackground] = useState(0);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [cropW, setCropW] = useState(650);
  const [cropH, setCropH] = useState(650);
  const [webcams, setWebcams] = useState<MediaDeviceInfo[]>([]);
  const [micDevices, setMicDevices] = useState<MediaDeviceInfo[]>([]);
  const [mirrorEnabled, setMirrorEnabled] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      let strm = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      strm.getTracks().forEach(function (track) {
        track.stop();
      });
      var alldevices = await navigator.mediaDevices.enumerateDevices();
      let vd = [];
      let md = [];
      for (let index = 0; index < alldevices.length; index++) {
        const element = alldevices[index];
        if (element.kind == "videoinput") {
          vd.push(element);
        } else if (element.kind == "audioinput") {
          md.push(element);
        }
      }
      setWebcams(vd);
      setMicDevices(md);
      if (!webcam) {
        const dbVideoDeviceId = localStorage.getItem("videoDeviceId");
        const dbAudioDeviceId = localStorage.getItem("audioDeviceId");
        if (dbAudioDeviceId && dbAudioDeviceId) {
          setWebcam(dbVideoDeviceId);
          setMicDevice(dbAudioDeviceId);
          let blBg = localStorage.getItem("blurBackground");
          setBackground(blBg != null ? parseInt(blBg) : 0);
          let wcleft = localStorage.getItem("webCamLeft");
          setLeft(wcleft != null ? parseInt(wcleft) : 0);
          let wctop = localStorage.getItem("webCamTop");
          setTop(wctop != null ? parseInt(wctop) : 0);

          let cw = localStorage.getItem("cropW");
          setCropW(cw != null ? parseInt(cw) : 0);
          let ch = localStorage.getItem("cropH");
          setCropH(ch != null ? parseInt(ch) : 0);
        }
      }
    }, 100);
  }, []);


  return (
    <Box className="bg-white max-h-[873px] p-[10%]  ">
      <label htmlFor='background'>Background : </label>
      <input id='background' type='number' value={background} onChange={e => setBackground(parseInt(e.target.value))}></input>
      <label htmlFor='left'>Left : </label>
      <input id='left' type='number' value={left} onChange={e => setLeft(parseInt(e.target.value))}></input>
      <label htmlFor='top'>Top : </label>
      <input id='top' type='number' value={top} onChange={e => setTop(parseInt(e.target.value))}></input>
      <label htmlFor='inputW'>Width : </label>
      <input id='inputW' type='number' value={cropW} onChange={e => setCropW(parseInt(e.target.value))}></input>
      <label htmlFor='inputH'>Height : </label>
      <input id='inputH' type='number' value={cropH} onChange={e => setCropH(parseInt(e.target.value))}></input>
      <label htmlFor='mirror'>Mirror Efect Enabled : </label>
      <input id='mirror' type='checkbox' checked={mirrorEnabled} onChange={(() => setMirrorEnabled(!mirrorEnabled))} /> <br />
      <label htmlFor='camera'>Camera : </label>
      <select id='camera' value={webcam!} onChange={(e) => {
        setWebcam(e.target.value);
      }}>
        <option value="">Select.</option>
        {webcams.map((el, idx) => {
          return <option key={idx} value={el.deviceId}>{el.label}</option>
        })}
      </select>
      <label htmlFor='mic'>Microphone : </label>
      <select id='mic' value={micDevice} onChange={(e) => {
        setMicDevice(e.target.value);
      }}>
        <option value="">Select.</option>
        {micDevices.map((el, idx) => {
          return <option key={idx} value={el.deviceId}>{el.label}</option>
        })}
      </select>
      <button onClick={() => {
        localStorage.setItem("videoDeviceId", webcam!);
        localStorage.setItem("audioDeviceId", micDevice);
        localStorage.setItem("blurBackground", background.toString());
        localStorage.setItem("webCamLeft", left.toString());
        localStorage.setItem("webCamTop", top.toString());
        localStorage.setItem("cropW", cropW.toString());
        localStorage.setItem("cropH", cropH.toString());
      }}>
        Save Settings
      </button>
      <WebCam backgroundOption={background} left={left} showOriginal={true} top={top} webCamDeviceId={webcam!} width={480} height={320} cropWidth={cropW} cropHeight={cropH} mirrorEnabled={mirrorEnabled} onStreamChanged={null} />
    </Box>
  );
};

export default WebCamTestView;
