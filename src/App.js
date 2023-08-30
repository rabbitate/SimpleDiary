import React, { useCallback, useMemo, useReducer, useRef } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const reducer = (state, action) => {
  switch(action.type) {
    case 'ADD': {
      const createdDate = new Date().getTime();
      const newDiary = {...action.data, createdDate}
      return [newDiary, ...state]
    }
    case 'EDIT': {
      return state.map((e) =>
        e.id === action.targetId ? {...e, content: action.editedContent} : e
      );
    }
    case 'DELETE': {
      return state.filter(e => e.id === state.targetId);
    }
    default: {
      return state;
    }
  }
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  var diaryId = useRef(0);

  const addDiary = useCallback((author, content, emotion) => {
    dispatch({type: 'ADD', data: {author, content, emotion, id: diaryId.current}})
    diaryId.current += 1;
  }, []);

  const editDiary = useCallback((targetId, editedContent) => {
    dispatch({type: 'EDIT', targetId, editedContent})
  }, [])
 
  const deleteDiary = useCallback((targetId) => {
    dispatch({type: "DELETE", targetId})
  }, [])

  const getDiaryAnalysis = useMemo(
    () => {
      // console.log("일기 분석 시작");
      const goodEmotionCount = data.filter(e => e.emotion >= 3).length
      const badEmotionCount = data.length - goodEmotionCount;
      const goodEmotionRatio = (goodEmotionCount / data.length * 100).toFixed(2);
      return {goodEmotionCount, badEmotionCount, goodEmotionRatio};
    }, [data.length]);
  
  const {goodEmotionCount, badEmotionCount, goodEmotionRatio} = getDiaryAnalysis;
  const memorizedDispatches = useMemo(() => {
    return { addDiary, editDiary, deleteDiary }}, []);

  return (
    <div className="App">
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={memorizedDispatches}>
          <DiaryEditor></DiaryEditor>
          <div className='Analysis'>
            <div>전체 일기: {data.length}개</div>
            <div>기분 좋은 일기: {goodEmotionCount}개</div>
            <div>기분 나쁜 일기: {badEmotionCount}개</div>
            <div>기분 좋은 날 비율: {goodEmotionRatio}%</div>
          </div>
          <DiaryList></DiaryList>
        </DiaryDispatchContext.Provider>  
      </DiaryStateContext.Provider>
    </div>
  );
}

export default App;