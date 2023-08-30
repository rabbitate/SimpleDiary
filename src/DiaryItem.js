import React, { useState, useRef, useEffect, useContext } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({ id, author, emotion, createdDate, content }) => {
    useEffect(() => {
        console.log(`${id} 번째 일기 렌더`)
    })

    const [isEdit, setIsEdit] = useState(false);
    const [localContent, setLocalContent] = useState(content);
    const localContentInput = useRef();

    const { editDiary, deleteDiary } = useContext(DiaryDispatchContext);

    const toggleIsEdit = () => {
        setIsEdit(!isEdit);
        // console.log(isEdit);
    }

    const handleEdit = () => {
        // 글자 수가 부족할 경우 포커스
        if(localContent.length < 3) {
            localContentInput.current.focus();
            return;
        }
        toggleIsEdit();
        editDiary(id, localContent);
    }

    const handleQuitEdit = () => {
        toggleIsEdit();
        setLocalContent(content);
    }

    const handleDelete = () => {
        if(window.confirm("삭제하시겠습니까?"))
            deleteDiary(id);
    }

    return (
        <div className="DiaryItem">
            <div className="Info">
                <span>작성자: {author} | 감정 점수: {emotion}</span>
                <br></br>
                <span>{new Date(createdDate).toLocaleString()}</span>
            </div>
            <div className="Content">
                {isEdit? (
                    <>
                        <textarea value={localContent} ref={localContentInput} onChange={(e) => setLocalContent(e.target.value)}></textarea>
                    </>
                 ) : (
                    <>
                        {content}
                    </>
                 )}
            </div>
            <div>
                {isEdit? (
                    <>
                        <button onClick={handleQuitEdit}>취소</button>
                        <button onClick={handleEdit}>완료</button>
                    </>
                ) : (
                    <>
                        <button className="editButton" onClick={toggleIsEdit}>✏️</button>
                        <button onClick={handleDelete}>X</button>
                    </>
                    
                )}
            </div>
        </div>
    )
}

export default React.memo(DiaryItem);