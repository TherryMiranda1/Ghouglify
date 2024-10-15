/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { GrPowerCycle } from "react-icons/gr";
import { IoCloseOutline } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import styled from "styled-components";

import { ICON_SIZES } from "../../../constants/sizes";
import { OriginalImageType } from "../../../context/types";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { LoadingState } from "../../ui";

interface Props {
  onChange: (photo: OriginalImageType) => void;
}

export const Camera = ({ onChange }: Props) => {
  const {
    sandbox: { setOriginalImage },
  } = useGlobalContext();
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  const startCamera = async () => {
    if (videoRef.current) {
      setIsLoading(true);
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
      setIsLoading(false);
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
    <ContainerStyled>
      {isLoading && <LoadingState />}
      <VideoStyled $show={photo === null && !isLoading} ref={videoRef} />
      <>
        {photo && <ImageStyled src={photo} alt="captured" />}
        <ButtonsAreaStyled>
          {!photo && (
            <TakeButtonStyled onClick={takePhoto}>
              <FaRegCircle size={ICON_SIZES.lg} />
            </TakeButtonStyled>
          )}
        </ButtonsAreaStyled>
        {photo ? (
          <SecondaryButtonStyled onClick={() => setPhoto(null)}>
            <IoCloseOutline size={ICON_SIZES.sm} />
          </SecondaryButtonStyled>
        ) : (
          <SecondaryButtonStyled $isRight onClick={switchCamera}>
            <GrPowerCycle size={ICON_SIZES.sm} />
          </SecondaryButtonStyled>
        )}
        {photo && (
          <SecondaryButtonStyled
            $isRight
            onClick={() => {
              const result = {
                title: `Ghougly-${new Date().toDateString()}`,
                content: photo,
              };
              onChange(result);
              setOriginalImage(result);
            }}
          >
            <MdDone size={ICON_SIZES.sm} />
          </SecondaryButtonStyled>
        )}
      </>

      <canvas ref={photoRef} style={{ display: "none" }} />
    </ContainerStyled>
  );
};
const ContainerStyled = styled.section`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: var(--card-radius);
`;
const VideoStyled = styled.video<{ $show: boolean }>`
  width: 100%;
  height: auto;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  border-radius: var(--card-radius);
  transition: opacity 0.3s ease-in-out;
`;
const ImageStyled = styled.img`
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--card-radius);
`;

const ButtonsAreaStyled = styled.div`
  background-color: var(--background-transparent-color);
  border-bottom-left-radius: var(--card-radius);
  border-bottom-right-radius: var(--card-radius);
  height: 70px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  bottom: 0;
  gap: 16px;
`;

const TakeButtonStyled = styled.button`
  background-color: transparent;
  border: var(--border);
`;

const SecondaryButtonStyled = styled.button<{ $isRight?: boolean }>`
  background-color: transparent;
  padding: 0;
  border: var(--border);
  position: absolute;
  bottom: 20px;
  ${({ $isRight }) => ($isRight ? "right: 10px;" : "left: 10px;")}
`;
