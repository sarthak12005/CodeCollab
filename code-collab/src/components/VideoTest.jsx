import { useState, useRef, useEffect } from 'react';

const VideoTest = () => {
    const [isVideoOn, setIsVideoOn] = useState(false);
    const [isAudioOn, setIsAudioOn] = useState(false);
    const [stream, setStream] = useState(null);
    const [devices, setDevices] = useState([]);
    const [error, setError] = useState('');
    const [logs, setLogs] = useState([]);
    const videoRef = useRef(null);

    const addLog = (message) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
        console.log(message);
    };

    useEffect(() => {
        checkDevices();
    }, []);

    const checkDevices = async () => {
        try {
            addLog('🔍 Checking available devices...');
            const deviceList = await navigator.mediaDevices.enumerateDevices();
            setDevices(deviceList);
            
            const cameras = deviceList.filter(d => d.kind === 'videoinput');
            const microphones = deviceList.filter(d => d.kind === 'audioinput');
            
            addLog(`📱 Found ${cameras.length} camera(s) and ${microphones.length} microphone(s)`);
            
            cameras.forEach((camera, i) => {
                addLog(`📹 Camera ${i + 1}: ${camera.label || 'Unknown Camera'}`);
            });
            
            microphones.forEach((mic, i) => {
                addLog(`🎤 Microphone ${i + 1}: ${mic.label || 'Unknown Microphone'}`);
            });
        } catch (err) {
            addLog(`❌ Error checking devices: ${err.message}`);
            setError(err.message);
        }
    };

    const requestPermissions = async () => {
        try {
            setError('');
            addLog('🔐 Requesting camera and microphone permissions...');
            
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('getUserMedia not supported in this browser');
            }

            const constraints = {};
            
            if (isVideoOn) {
                constraints.video = {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: 'user'
                };
            }
            
            if (isAudioOn) {
                constraints.audio = {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                };
            }

            if (!constraints.video && !constraints.audio) {
                throw new Error('Please enable at least video or audio');
            }

            addLog(`📋 Requesting with constraints: ${JSON.stringify(constraints)}`);
            
            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            setStream(mediaStream);
            
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                addLog('📺 Video element connected to stream');
            }
            
            const videoTracks = mediaStream.getVideoTracks();
            const audioTracks = mediaStream.getAudioTracks();
            
            addLog(`✅ Stream obtained with ${videoTracks.length} video track(s) and ${audioTracks.length} audio track(s)`);
            
            videoTracks.forEach((track, i) => {
                addLog(`🎬 Video track ${i + 1}: ${track.label} (enabled: ${track.enabled})`);
            });
            
            audioTracks.forEach((track, i) => {
                addLog(`🔊 Audio track ${i + 1}: ${track.label} (enabled: ${track.enabled})`);
            });
            
        } catch (err) {
            addLog(`❌ Permission error: ${err.message}`);
            setError(err.message);
            
            if (err.name === 'NotAllowedError') {
                setError('Camera/microphone access denied. Please allow permissions and try again.');
            } else if (err.name === 'NotFoundError') {
                setError('No camera or microphone found.');
            } else if (err.name === 'NotReadableError') {
                setError('Camera/microphone is already in use by another application.');
            }
        }
    };

    const stopStream = () => {
        if (stream) {
            addLog('🛑 Stopping media stream...');
            stream.getTracks().forEach(track => {
                track.stop();
                addLog(`⏹️ Stopped ${track.kind} track: ${track.label}`);
            });
            setStream(null);
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        }
    };

    const clearLogs = () => {
        setLogs([]);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-slate-900 text-white min-h-screen">
            <h1 className="text-2xl font-bold mb-6">🎥 Video Call Debug Tool</h1>
            
            {/* Controls */}
            <div className="bg-slate-800 p-4 rounded-lg mb-6">
                <h2 className="text-lg font-semibold mb-4">Controls</h2>
                <div className="flex flex-wrap gap-4 mb-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isVideoOn}
                            onChange={(e) => setIsVideoOn(e.target.checked)}
                            className="rounded"
                        />
                        Enable Video
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isAudioOn}
                            onChange={(e) => setIsAudioOn(e.target.checked)}
                            className="rounded"
                        />
                        Enable Audio
                    </label>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={requestPermissions}
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                    >
                        Start Stream
                    </button>
                    <button
                        onClick={stopStream}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                        disabled={!stream}
                    >
                        Stop Stream
                    </button>
                    <button
                        onClick={checkDevices}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                    >
                        Refresh Devices
                    </button>
                    <button
                        onClick={clearLogs}
                        className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                    >
                        Clear Logs
                    </button>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="bg-red-600 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold">Error:</h3>
                    <p>{error}</p>
                </div>
            )}

            {/* Video Display */}
            <div className="bg-slate-800 p-4 rounded-lg mb-6">
                <h2 className="text-lg font-semibold mb-4">Video Preview</h2>
                <div className="bg-slate-700 rounded-lg aspect-video flex items-center justify-center overflow-hidden">
                    {stream ? (
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                            onLoadedMetadata={() => addLog('📺 Video metadata loaded')}
                            onError={(e) => addLog(`❌ Video error: ${e.message}`)}
                        />
                    ) : (
                        <div className="text-gray-400 text-center">
                            <div className="text-4xl mb-2">📹</div>
                            <p>No video stream</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Device List */}
            <div className="bg-slate-800 p-4 rounded-lg mb-6">
                <h2 className="text-lg font-semibold mb-4">Available Devices</h2>
                {devices.length > 0 ? (
                    <div className="space-y-2">
                        {devices.map((device, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                                <span className="w-20">
                                    {device.kind === 'videoinput' ? '📹' : 
                                     device.kind === 'audioinput' ? '🎤' : '🔊'}
                                </span>
                                <span className="flex-1">{device.label || 'Unknown Device'}</span>
                                <span className="text-gray-400">{device.deviceId.substring(0, 8)}...</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No devices found</p>
                )}
            </div>

            {/* Logs */}
            <div className="bg-slate-800 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Debug Logs</h2>
                <div className="bg-slate-900 p-3 rounded max-h-64 overflow-y-auto font-mono text-sm">
                    {logs.length > 0 ? (
                        logs.map((log, index) => (
                            <div key={index} className="mb-1">{log}</div>
                        ))
                    ) : (
                        <div className="text-gray-400">No logs yet</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoTest;
