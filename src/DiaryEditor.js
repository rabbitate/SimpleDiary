import React, { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryEditor = () => {
    const { addDiary } = useContext(DiaryDispatchContext);
    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: 1,
    });

    const authorInput = useRef();
    const contentInput = useRef();

    useEffect(() =>
        console.log("DiaryEditor Rendering")
    );

    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handleSaveState = () => {
        if(state.author.length < 1) {
            authorInput.current.focus();
            return;
        }

        if(state.content.length < 3) {
            contentInput.current.focus();
            return;
        }

        addDiary(state.author, state.content, state.emotion);
        alert("저장했습니다!");
        setState({
            author: "",
            content: "",
            emotion: 1,
        });
    }

    return (
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <div>
                <input name="author" value={state.author} onChange={handleChangeState} ref={authorInput} placeholder="작성자"></input>
            </div>
            <div>
                <textarea name="content" value={state.content} onChange={handleChangeState} ref={contentInput} placeholder="일기 내용">
                </textarea>
            </div>
            <div>
                <span>오늘의 감정 점수 : </span>
                <select name="emotion" state={state.emotion} onChange={handleChangeState}>
                    <option value={1}>1 (매우 안좋음)</option>
                    <option value={2}>2 (안좋음)</option>
                    <option value={3}>3 (보통)</option>
                    <option value={4}>4 (좋음)</option>
                    <option value={5}>5 (매우 좋음)</option>
                </select>
            </div>
            <div>
                <button onClick={handleSaveState}>저장하기</button>
            </div>
        </div>
    )
}

export default React.memo(DiaryEditor);