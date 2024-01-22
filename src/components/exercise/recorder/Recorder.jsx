/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";


// logic
// 3 step process
// request for mic permission on page load and start stream - done
// on button click, start listening to the audio stream and record to blob
// on done, save blob

// logic for with polyfill
// 4 step process
// check for mediarecorder support on page load.
// request for mic permission and start stream
// on button click, start listening to the audio stream and record to blob
// on done, save blob


const Recorder = ({ setAudioBase64, demoAudio }) => {
  // Button State controls what is displayed on the button
  const [buttonState, setButtonState] = useState('not speaking')
  const [hovered, setHovered] = useState(false)

  const [recording, setRecording] = useState(null)
  // const [recordingURL, setRecordingURL] = useState('')
  const [recorderMedia, setRecorderMedia] = useState(null)
  const [sendAudio, setSendAudio] = useState('')
  const [audioBlob, setAudioBlob] = useState()

  // recently added configuration for third-party polyfill library
  useEffect(() => {
    if (!window.MediaRecorder) {
      import('../../../polyfill.js').then(({ default: polyfill }) => {
        // Optionally, you can execute any code related to the polyfill here
        console.log('Polyfill loaded:', polyfill);
      });
    }
  }, []);

  useEffect(() => {
    buttonState === "not speaking" ? setHovered(false) : setHovered(true)
  }, [buttonState])


  useEffect(() => {
    const constraints = { 'audio': true }
    // request for mic acccess on page load
    const grantMic = () => {
      if (navigator.mediaDevices)
        navigator.mediaDevices.getUserMedia(constraints)
          .then((stream) => {
            const audioStream = new MediaStream(stream)
            // use console.log as a quick check only in dev
            // console.log(audioStream.active)
            setRecording(audioStream)
          })
          .catch(error => {
            console.error('Error accessing media devices.', error);
            alert('App does not have mic access')
          });
    }
    // call grant mic function
    grantMic()
    
  }, [])

  useEffect(() => {
    if (audioBlob && sendAudio) {
      setAudioBase64(audioBlob)
      setSendAudio(!sendAudio)
    }
  }, [audioBlob, sendAudio, setAudioBase64])



  const startRecording = async () => {
    // 
    const mediaRecorder = new MediaRecorder(recording);
    // should help make it locateable outside this startRecorder function
    setRecorderMedia(mediaRecorder)
    mediaRecorder.addEventListener('dataavailable', event => {
      // stream audio into blob
      const blob = new Blob([event.data], { type: 'audio/wav; codecs=opus' });
      setAudioBlob(blob)
      // set recording url (url helps to identify the audio file)
      // but is this necessary?
      // update: send audio file across states instead then to the backend.
      // const url = URL.createObjectURL(blob);
      // setRecordingURL(url);
      // console.log(recordingURL)
    });
    // start recording media
    mediaRecorder.start();
  }

  const stopRecording = () => {
    if (recorderMedia !== null) {
      recorderMedia.stop()
    }
    else
      console.log('Recorder media is returning null')
  }

  const discardRecording = () => {
    if (recorderMedia !== null) {
      recorderMedia.stop()
    }
    else
      console.log('error deleting media')
  }

  return (
    <div className="flex flex-col content-center justify-center w-full ">
      <h3 className="pb-2 mx-auto text-2xl">Speel trainingsaudio af</h3>
      <audio className="m-auto" src={demoAudio} controls></audio>
      {/* <button onClick={grantMic}>grant mic</button> */}
      <div className='relative flex flex-row justify-center w-full pt-16'>
        <div className="absolute z-5 w-72 h-72 -bottom-4 bg-[#86A7FC] border-4 border-[#6366F1] rounded-full">

        </div>
        {/* recorder button */}
        <motion.div
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            buttonState === 'not speaking' ? (setButtonState('speaking'), startRecording()) : (console.log('a user should be speaking, wait for him to finish'))
          }}
          draggable={false}
          className='rounded-full z-20 w-64 h-64 bg-[#6366F1] flex flex-row justify-center content-center select-none'>
          <p className={`text-white m-auto text-5xl w-9/12 text-center`}>
            {buttonState === 'not speaking' ? 'Tik om te spreken' : "Jij bent aan het woord"}
          </p>
          {/* <p className='w-9/12 m-auto text-5xl text-center text-white'>Tik om te spreken</p> */}
        </motion.div>

        <motion.div
          initial={{ x: 0, y: 50 }}
          animate={{ x: hovered ? 190 : 0 }}
          onClick={() => { setHovered(false), setButtonState('not speaking'), discardRecording() }}
          draggable={false}
          className='absolute z-10 bottom-[6rem] rounded-full w-fit h-fit text-white select-none'>
          <img alt="cancel button" srcSet="/cancel-icon.svg" />
        </motion.div>
        <motion.div
          initial={{ x: 0, y: -50 }}
          animate={{ x: hovered ? 190 : 0 }}
          onClick={() => { setHovered(false), setButtonState('not speaking'), stopRecording(), setSendAudio(true) }}
          draggable={false}
          className='absolute z-10 bottom-[6rem] rounded-full w-fit h-fit text-white select-none'>
          <img alt="accept button" srcSet="/accept-icon.svg" />
        </motion.div>
      </div>
    </div>
  )

}

export default Recorder
