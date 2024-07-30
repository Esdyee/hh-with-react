import React, { useState } from 'react';
import './style/ChangeCharacter.css';

const ChangeCharacter = () => {

    const [특수문자들어간문자열, set특수문자들어간문자열] = useState('*테스트1* 글쓰기$ *안녕* %굵게%');
    // const 특수문자들어간문자열 = '*테스트1* 글쓰기$ *안녕* %굵게%';

    const parseText = (text: string) => {
        const parts = text.split(/(\*[^*]+\*|\$|%[^%]+%)/g);

        return parts.map((part, index) => {
            if (part.startsWith('*') && part.endsWith('*')) {
                // * 사이에 있는 문자열은 <span class='yellow'></span>으로 치환
                const content = part.slice(1, -1);
                return <span key={index} className="orange">{content}</span>;
            } else if (part.startsWith('%') && part.endsWith('%')) {
                // % 사이에 있는 문자열은 <span class='bold'></span>으로 치환
                const content = part.slice(1, -1);
                return <span key={index} className="bold">{content}</span>;
            } else if (part === '$') {
                // $ 는 <br /> 으로 치환
                return <br key={index} />;
            } else {
                return part;
            }
        });
    };
    return (
        <>
            <input type='text' style={{ width: '500px', height: '50px', border: '1px solid #000' }} onChange={(e) => {
                set특수문자들어간문자열(e.target.value);
            }}></input>
            <div>{parseText(특수문자들어간문자열)}</div>
        </>
    );
}

export default ChangeCharacter;

