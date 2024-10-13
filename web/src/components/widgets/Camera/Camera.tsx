import React, { useEffect, useRef, useState } from "react";

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [photo, setPhoto] = useState<string | null>(null);

  const startCamera = async () => {
    if (videoRef.current) {
      const constraints = {
        video: {
          facingMode: isFrontCamera ? "user" : "environment",
        },
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (err) {
        console.error("Error accessing camera: ", err);
      }
    }
  };

  const switchCamera = () => {
    setIsFrontCamera((prev) => !prev);
    stopCamera();
    setTimeout(() => startCamera(), 500);
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const takePhoto = () => {
    if (videoRef.current && photoRef.current) {
      const width = videoRef.current.videoWidth;
      const height = videoRef.current.videoHeight;

      photoRef.current.width = width;
      photoRef.current.height = height;

      const context = photoRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, width, height);
        const dataUrl = photoRef.current.toDataURL("image/png");
        setPhoto(dataUrl);
      }
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div>
      <div>
        <video
          ref={videoRef}
          style={{
            width: "100%",
            height: "auto",
            display: photo ? "none" : "block",
          }}
        />
        {photo && (
          <img
            src={photo}
            alt="captured"
            style={{ width: "100%", height: "auto" }}
          />
        )}
      </div>
      <div>
        {photo && <button onClick={() => setPhoto(null)}>Take Again</button>}
        {!photo && <button onClick={switchCamera}>Cambiar Cámara</button>}
        <button onClick={takePhoto}>Tomar Foto</button>
      </div>
      <div></div>
      <canvas ref={photoRef} style={{ display: "none" }} />
    </div>
  );
};

export default Camera;
