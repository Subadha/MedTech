import React, { useState, useRef, useEffect } from 'react';
import Peer from 'simple-peer';
import { useUser } from '@/app/context/userContext';
import { Phone, PhoneOff, Video, VideoOff, MicOff, Mic } from 'lucide-react';
import { useMail } from "./chat";

interface VideoCallProps {
  socket: any;
  setIsVideoCallActive: (active: boolean) => void;
  clientId: string | null;
  doctorId: string | null;
  isReceivingCall: boolean;
  caller: string;
  callerSignal: any;
  onAcceptCall: () => void;
  onDeclineCall: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({
  socket,
  setIsVideoCallActive,
  clientId,
  doctorId,
  isReceivingCall,
  caller,
  callerSignal,
  onAcceptCall,
  onDeclineCall
}) => {
  const [me, setMe] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [receivingCall, setReceivingCall] = useState<boolean>(false);
  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const [callEnded, setCallEnded] = useState<boolean>(false);
  const { id, userName } = useUser();
  const [idToCall, setIdToCall] = useState<string>("");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [remoteVideoOff, setRemoteVideoOff] = useState<boolean>(false);
  const [remoteAudioMuted, setRemoteAudioMuted] = useState<boolean>(false);
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<Peer.Instance | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
    });

    let userIds = [clientId, doctorId];
    socket.emit('getSocketIds', userIds);

    socket.on("socketIds", (socketIds: any) => {
      if (socketIds) {
        // Ensure the id, doctorId, and clientId are valid and exist in socketIds
        setMe(socketIds[id] || null);
    
        if (id === doctorId&&clientId!==null) {
          setIdToCall(socketIds[clientId] || null);  // If id is doctorId, set socket for clientId
        } else if(doctorId!==null) {
          setIdToCall(socketIds[doctorId] || null);  // Otherwise, set socket for doctorId
        }
      } else {
        console.warn("Received empty socketIds object.");
      }
    });

    if (isReceivingCall) {
      setReceivingCall(true);
    }

    socket.on('callEnded', () => {
      handleCallEnded();
    });

    socket.on('toggleRemoteVideo', (videoOff:any) => {
      setRemoteVideoOff(videoOff);
    });

    socket.on('toggleRemoteAudio', (audioMuted:any) => {
      setRemoteAudioMuted(audioMuted);
    });

    return () => {
      socket.off('socketIds');
      socket.off('callEnded');
      socket.off('toggleRemoteVideo');
      socket.off('toggleRemoteAudio');
      cleanupListeners();
    };
  }, [socket, id, clientId, doctorId, isReceivingCall, caller]);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 5;
    const checkAndSetStream = () => {
      if (stream && myVideo.current) {
        myVideo.current.srcObject = stream;
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(checkAndSetStream, 1000); // Retry after 1 second
      } else {
        console.error("Failed to set video stream after multiple attempts");
      }
    };
    checkAndSetStream();
  }, [stream]);

  const cleanupListeners = () => {
    socket.off('callAccepted');
    socket.off('callEnded');
  };

  const callUser = (id: string) => {
    if (connectionRef.current) {
      connectionRef.current.destroy();
      connectionRef.current = null;
    }

    cleanupListeners();

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream || undefined,
    });

    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me,
        name: userName,
      });
    });

    peer.on('stream', (userStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = userStream;
      }
    });

    socket.once('callAccepted', (signal:any) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    onAcceptCall();

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream || undefined,
    });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: caller });
    });

    peer.on('stream', (userStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = userStream;
      }
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const handleCallEnded = () => {
    setCallEnded(true);
    if (connectionRef.current) {
      connectionRef.current.destroy();
      connectionRef.current = null;
    }

    cleanupListeners();
    setIsVideoCallActive(false);
    setCallAccepted(false);
    setReceivingCall(false);
    
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    
    if (myVideo.current) myVideo.current.srcObject = null;
    if (userVideo.current) userVideo.current.srcObject = null;
  };

  const leaveCall = () => {
    socket.emit('endCall', { to: idToCall });
    handleCallEnded();
  };

  const toggleMute = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);

      if (connectionRef.current) {
        connectionRef.current.send(JSON.stringify({ type: 'toggleAudio', audioMuted: !audioTrack.enabled }));
      }
      
      socket.emit('toggleAudio', { to: idToCall, audioMuted: !audioTrack.enabled });
    }
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOff(!videoTrack.enabled);

      if (connectionRef.current) {
        connectionRef.current.send(JSON.stringify({ type: 'toggleVideo', videoOff: !videoTrack.enabled }));
      }
      
      socket.emit('toggleVideo', { to: idToCall, videoOff: !videoTrack.enabled });
    }
  };

  useEffect(() => {
    if (connectionRef.current) {
      connectionRef.current.on('data', (data) => {
        const parsedData = JSON.parse(data);
        if (parsedData.type === 'toggleVideo') {
          setRemoteVideoOff(parsedData.videoOff);
        } else if (parsedData.type === 'toggleAudio') {
          setRemoteAudioMuted(parsedData.audioMuted);
        }
      });
    }
  }, [connectionRef.current]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Video Call</h1>
          
          <div className="flex justify-center items-center mb-6 space-x-4">
            <button
              onClick={()=>{toggleMute()}}
              className={`p-3 rounded-full ${
                isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-200 hover:bg-gray-300'
              } transition-colors duration-200`}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <MicOff className="text-white" /> : <Mic className="text-gray-700" />}
            </button>
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full ${
                isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-200 hover:bg-gray-300'
              } transition-colors duration-200`}
              title={isVideoOff ? "Turn on video" : "Turn off video"}
            >
              {isVideoOff ? <VideoOff className="text-white" /> : <Video className="text-gray-700" />}
            </button>
            {callAccepted && !callEnded ? (
              <button
                onClick={leaveCall}
                className="p-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200"
                title="End call"
              >
                <PhoneOff className="text-white" />
              </button>
            ) : (
              <button
                onClick={() => callUser(idToCall)}
                className="p-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-200"
                title="Start call"
              >
                <Phone className="text-white" />
              </button>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative w-full md:w-1/2 aspect-video bg-gray-200 rounded-lg overflow-hidden">
              {stream && (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  playsInline
                  muted
                  ref={myVideo}
                  autoPlay
                />
              )}
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                You {isVideoOff ? '(Video Off)' : ''} {isMuted ? '(Muted)' : ''}
              </div>
            </div>
            <div className="relative w-full md:w-1/2 aspect-video bg-gray-200 rounded-lg overflow-hidden">
              {callAccepted && !callEnded ? (
                <>
             <video
  className="absolute inset-0 w-full h-full object-cover"
  playsInline
  ref={userVideo}
  autoPlay
  muted={remoteAudioMuted} // Conditionally apply the muted attribute
/>
                  {remoteVideoOff && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
                      <p>Remote Video Off</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Waiting for connection...</p>
                </div>
              )}
              {callAccepted && !callEnded && (
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                  {userName} {remoteVideoOff ? '(Video Off)' : ''} {remoteAudioMuted ? '(Muted)' : ''}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {receivingCall && !callAccepted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4">{userName} is calling...</h2>
            <div className="flex space-x-4">
              <button
                onClick={answerCall}
                className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
              >
                Answer
              </button>
              <button
                onClick={onDeclineCall}
                className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
