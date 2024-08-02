import React, { useState } from "react";
import "./style/ChangeCharacter.css";
import styled, { StyledComponent } from "@emotion/styled";
import ReactDOMServer from 'react-dom/server';

const 테스트스타일컴포넌트 = styled.span`
    color: orange;
`;

const ChangeCharacter = () => {
    const [특수문자들어간문자열, set특수문자들어간문자열] = useState(
        "*테스트1* 글쓰기$ *안녕* %굵게%",
    );
    // const 특수문자들어간문자열 = '*테스트1* 글쓰기$ *안녕* %굵게%';
    interface ParseTextProps {
        text: string;
        FontColorWrapper: StyledComponent<"span", any>;
    }
    
    const parseText = ({ text, FontColorWrapper }: ParseTextProps) => {
        const parts = text.split(/(\*[^*]+\*|\$|%[^%]+%)/g);
    
        return parts.map((part, index) => {
            if (part.startsWith("*") && part.endsWith("*")) {
                // * 사이에 있는 문자열은 <FontColorWrapper></FontColorWrapper>으로 치환
                const content = part.slice(1, -1);
                return (
                    <FontColorWrapper key={index}>
                        {content}
                    </FontColorWrapper>
                );
            } else if (part.startsWith("%") && part.endsWith("%")) {
                // % 사이에 있는 문자열은 <span class='bold'></span>으로 치환
                const content = part.slice(1, -1);
                return (
                    <span key={index} className="bold">
                        {content}
                    </span>
                );
            } else if (part === "$") {
                // $ 는 <br /> 으로 치환
                return <br key={index} />;
            } else {
                return <span key={index}>{part}</span>;
            }
        });
    };

    return (
        <>
            <input
                type="text"
                style={{
                    width: "500px",
                    height: "50px",
                    border: "1px solid #000",
                }}
                onChange={(e) => {
                    set특수문자들어간문자열(e.target.value);
                }}
            ></input>
            <p>
                *로 감싼 텍스트는 노란색으로,
                <br />
                %로 감싼 텍스트는 굵게, <br />
                $는 줄바꿈으로 치환됩니다.
            </p>
            {/* // divider 넣어줘 */}
            <hr className="my-5" />
            <div>
              {parseText({ text: 특수문자들어간문자열, FontColorWrapper: 테스트스타일컴포넌트 }).map((element, index) => (
                <pre key={index}>
                  {React.isValidElement(element)
                    ? ReactDOMServer.renderToStaticMarkup(element)
                    : String(element)}
                </pre>
              ))}
            </div>
            <div className="mt-5">{parseText({ text: 특수문자들어간문자열, FontColorWrapper: 테스트스타일컴포넌트 })}</div>
        </>
    );
};
export default ChangeCharacter;
