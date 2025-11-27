import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Translation } from '../types';

interface CameraProps {
  onCapture: (imageSrc: string) => void;
  onCancel: () => void;
  text: Translation['camera'];
}

export const Camera: React.FC<CameraProps> = ({ onCapture, onCancel, text }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: 'user', // Front camera
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      setError(text.permissionDenied);
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const capture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageSrc = canvas.toDataURL('image/jpeg', 0.85);
        
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        onCapture(imageSrc);
      }
    }
  }, [onCapture, stream]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <canvas ref={canvasRef} className="hidden" />

      <div className="relative flex-1 overflow-hidden flex items-center justify-center bg-black rounded-b-[2.5rem] md:rounded-b-none">
        {error ? (
          <div className="text-white text-center p-6">
            <p className="mb-4">{error}</p>
            <button 
              onClick={onCancel}
              className="bg-white/20 px-6 py-2 rounded-full backdrop-blur-md"
            >
              {text.goBack}
            </button>
          </div>
        ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute min-w-full min-h-full object-cover transform -scale-x-100 opacity-90"
            />
        )}

        {!error && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="absolute inset-0 bg-black/30"></div>
                
                {/* Simplified, elegant guide */}
                <div className="w-64 h-80 border border-white/30 rounded-[4rem] flex flex-col items-center justify-end pb-8 backdrop-blur-[1px] shadow-2xl shadow-black/20">
                     <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full mb-8">
                        <p className="text-white/90 font-medium text-sm">
                           {text.guide}
                        </p>
                     </div>
                </div>
            </div>
        )}
      </div>

      {/* iOS Style Camera Controls */}
      <div className="h-40 bg-black flex items-center justify-between px-12 pb-8 pt-4">
        <button 
            onClick={onCancel}
            className="text-white font-medium text-sm bg-white/10 px-5 py-2.5 rounded-full active:scale-95 transition-transform"
        >
            {text.cancel}
        </button>

        <button 
            onClick={capture}
            disabled={!!error}
            className="group relative"
        >
             {/* Outer Ring */}
            <div className="w-20 h-20 rounded-full border-4 border-white transition-transform group-active:scale-90"></div>
            {/* Inner Circle (Shutter) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[4.25rem] h-[4.25rem] bg-white rounded-full transition-transform group-active:scale-95"></div>
        </button>

        <div className="w-16"></div> {/* Spacer for balance */}
      </div>
    </div>
  );
};