import { createRef, useEffect, useMemo, useRef, useState } from 'react';
import UpperMenu from './UpperMenu';
import { useTestMode } from '../Context/TestModeContext';
import Stats from './Stats';
import { toast } from 'react-toastify';
import { WorkRounded } from '@mui/icons-material';
var randomWords = require('random-words');

const TypingBox = () => {

  const inputRef = useRef(null);
  const { testTime } = useTestMode();
  const [countDown, setCountDown] = useState(testTime);
  const [intervalId, setIntevalId] = useState(null);
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);

  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);

  const [wordsArray, setWordsArray] = useState(randomWords(60));

  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);

  const [graphData, setGraphData] = useState([]);

  const startTimer = () => {

    const intervalId = setInterval(timer, 1000);
    setInterval(intervalId);

    function timer() {
      setCountDown((latestCountDown) => {
        setCorrectChars((correctChars) => {
          setGraphData((graphData) => {
            return [...graphData, [
              testTime - latestCountDown + 1,
              (correctChars / 5) / (testTime - latestCountDown + 1) / 60,
            ]];
          });

          return correctChars;
        })

        if (latestCountDown === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
          return 0;
        }
        return latestCountDown - 1;
      });
    }

  }

  const resetTest = () => {
    try {
      clearInterval(intervalId);
      setCountDown(testTime);
      setCurrWordIndex(0);
      setCurrCharIndex(0);
      setTestStart(false);
      setTestEnd(false);
      setWordsArray(randomWords(60));
      resetWordSpanRefClassName();
      focusInput();

    } catch (err) {
      toast.success('Reset test', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }


  }

  const resetWordSpanRefClassName = () => {
    wordsSpanRef.map(i => {
      Array.from(i.current.childNodes).map(j => {
        j.className = "";
      });
      wordsSpanRef[0].current.childNodes[0].className = 'current';
    })
  }

  const wordsSpanRef = useMemo(() => {
    return Array(wordsArray.length).fill(0).map(i => createRef(null))
  }, [wordsArray]);

  const handleUserInput = (e) => {

    try {
      if (!testStart) {
        startTimer();
        setTestStart(true);
      }

      const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;

      if (e.keyCode === 32) {
        //Logic for space

        let correctCharsInWord = wordsSpanRef[currWordIndex].current.querySelectorAll('.correct');
        if (correctCharsInWord.length === allCurrChars.length) {
          setCorrectWords(correctWords + 1);
        }

        if (allCurrChars.length <= currCharIndex) {
          //remove cursor from the last place in a word
          allCurrChars[currCharIndex - 1].classList.remove('current-right');
        } else {
          //remove cursor from in between of the word
          setMissedChars(missedChars + (allCurrChars.length - currCharIndex));

          for (let i = currCharIndex; i < allCurrChars.length; i++) {
            allCurrChars[i].className += ' skipped';
          }

          allCurrChars[currCharIndex].classList.remove('current');
        }

        //place cursor to beginning
        wordsSpanRef[currWordIndex + 1].current.childNodes[0].className = 'current';

        setCurrWordIndex(currWordIndex + 1);
        setCurrCharIndex(0);

        return;
      }

      if (e.keyCode === 8) {
        //Logic for backspace handling
        if (currCharIndex !== 0) {

          if (allCurrChars.length === currCharIndex) {

            if (allCurrChars[currCharIndex - 1] && allCurrChars[currCharIndex - 1].className.includes('extra')) {
              allCurrChars[currCharIndex - 1].remove();
              allCurrChars[currCharIndex - 2].className += ' current-right';
            }

            if (allCurrChars[currCharIndex - 1]) {
              allCurrChars[currCharIndex - 1].className = 'current';
            }
            setCurrCharIndex(currCharIndex - 1);

            return;
          }

          allCurrChars[currCharIndex].className = "";
          allCurrChars[currCharIndex - 1].className = "current";
          setCurrCharIndex(currCharIndex - 1);
        }

        return;
      }

      if (currCharIndex === allCurrChars.length) {

        let newSpan = document.createElement('span');
        newSpan.innerText = e.key;
        newSpan.className = 'incorrect extra current-right';
        allCurrChars[currCharIndex - 1].classList.remove('current-right');
        wordsSpanRef[currWordIndex].current.append(newSpan);
        setCurrCharIndex(currCharIndex + 1);
        setExtraChars(extraChars + 1);

        return;

      }

      if (e.key === allCurrChars[currCharIndex].innerText) {
        allCurrChars[currCharIndex].className = "correct";
        setCorrectChars(correctChars + 1);
      } else {
        allCurrChars[currCharIndex].className = "incorrect";
        setIncorrectChars(incorrectChars + 1);
      }

      if (currCharIndex + 1 === allCurrChars.length) {
        allCurrChars[currCharIndex].className += ' current-right';
      } else {
        allCurrChars[currCharIndex + 1].className = 'current';
      }

      setCurrCharIndex(currCharIndex + 1);
    }
    catch(err){
      console.log(err);
    }
  }

  const calculateWPM = () => {
    return Math.round((correctChars / 5) / (testTime / 60));
  }

  const calculateAcc = () => {
    return Math.round((correctWords / currWordIndex) * 100);
  }

  const focusInput = () => {
    inputRef.current.focus();
  };

  useEffect(() => {

    // setCountDown(testTime);
    resetTest();

  }, [testTime])

  useEffect(() => {

    focusInput();
    wordsSpanRef[0].current.childNodes[0].className = 'current';

  }, [])

  let keyWord = 1;
  let keyChar = 1;

  return (
    <div>
      <UpperMenu countDown={countDown} />

      {(testEnd) ? (<Stats
        wpm={calculateWPM()}
        accuracy={calculateAcc()}
        correctChars={correctChars}
        incorrectChars={incorrectChars}
        missedChars={missedChars}
        extraChars={extraChars}
        graphData={graphData}
        resetTest={resetTest}
      />
      ) : (<div className="type-box" onClick={focusInput}>
        <div className="words">
          {
            wordsArray.map((word, index) => (
              <span className="word" key={'word' + (keyWord++)} ref={wordsSpanRef[index]}>
                {
                  word.split('').map(char => (
                    <span key={'char' + (keyChar++)}>{char}</span>
                  ))
                }
              </span>
            ))
          }
        </div>
      </div>)}
      <input
        type="text"
        className='hidden-input'
        ref={inputRef}
        onKeyDown={handleUserInput}
      />
    </div>
  )
}

export default TypingBox;