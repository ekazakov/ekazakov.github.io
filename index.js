class SpeechDetector extends EventEmitter {
    constructor() {
        super();
        this.isSpeechStarted = false;
        this.speakingAttemptStart = 0;
        this.isSpeechEnded = true;
        this.waitingSpeechEnd = null;
        this.harker = null;
    }

    start(audio) {
        this.audio = audio;
        this.speakingAttemptStart = 0;
        this.harker = hark(this.audio, {});
        this.harker.on('speaking', () => {
            // console.log('speaking');
            if (!this.isSpeechStarted) {
                this.speakingAttemptStart = Date.now();
            } else if (this.waitingSpeechEnd != null) {
                clearTimeout(this.waitingSpeechEnd);
                this.waitingSpeechEnd = null;
            }
        });

        this.harker.on('stopped_speaking', () => {
            // console.log('stopped_speaking');
            if (!this.isSpeechStarted && this.speakingAttemptStart) {
                if (Date.now() - this.speakingAttemptStart >= 500) {
                    this.isSpeechStarted = true;
                    this.isSpeechEnded = false;

                    this.trigger('speech_started');
                }
                this.speakingAttemptStart = 0;
            } else if (this.isSpeechStarted) {
                this.waitingSpeechEnd = setTimeout(() => {
                    this.isSpeechEnded = true;
                    this.isSpeechStarted = false;
                    this.trigger('speech_ended');
                    this.waitingSpeechEnd = null;
                }, 5000);
            }
        });
    }

    stop() {
        this.harker.stop();
        this.isSpeechEnded = true;
        this.isSpeechStarted = false;
    }
}

class DialogDetector {
    constructor() {
        this.inputDetector = new SpeechDetector();
        this.outputDetector = new SpeechDetector();
        this.isDialogStarted = false;

        this.inputDetector.on('speech_started', () => this.onSpeechStart());
        this.outputDetector.on('speech_started', () => this.onSpeechStart());
        this.inputDetector.on('speech_ended', () => this.onSpeechEnd());
        this.outputDetector.on('speech_ended', () => this.onSpeechEnd());
    }

    start(audio1, audio2) {
        this.inputDetector.start(audio1);
        this.outputDetector.start(audio2);
    }

    onSpeechEnd() {
        if (!this.isDialogStarted) {
            return;
        }

        if (!this.outputDetector.isSpeechStarted && !this.inputDetector.isSpeechStarted) {
            this.isDialogStarted = false;
            console.log('Dialog Ended');
        }
    }

    onSpeechStart() {
        if (this.isDialogStarted) {
            return;
        }

        if (this.outputDetector.isSpeechStarted) {
            this.isDialogStarted = true;
            console.log('Dialog Started');
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const inputAudio = document.querySelector('#audio1');
    const outputAudio = document.querySelector('#audio2');
    const startButton = document.querySelector('#start');
    const dd = new DialogDetector();
    startButton.onclick = () => {
        dd.start(inputAudio, outputAudio);
        inputAudio.play();
        outputAudio.play();
    };
    // const speechDetector = new SpeechDetector();
    // speechDetector.start(inputAudio);
    //
    // speechDetector.on('speech_started', () => {
    //     console.log('Input Speech started');
    // });
    // speechDetector.on('speech_ended', () => {
    //     console.log('Input Speech ended');
    // });

})

// navigator.mediaDevices.getUserMedia({ audio: true })
// .then(function (stream) {
// })
// .catch(function (e) {
//     console.error('Error capturing audio. ' + e.message);
// })
;

