import React, { useState } from "react";
import ReactDOMServer from 'react-dom/server';
import "./style/ChangeCharacter.css";
import styled, { StyledComponent } from "@emotion/styled";

const 테스트스타일컴포넌트 = styled.span`
    color: orange;
`;

const BoldAndColoredComponent = styled.span`
    color: orange;
    font-weight: bold;
`;

const ChangeCharacter = () => {
    const [특수문자들어간문자열, set특수문자들어간문자열] = useState(
        "^테스트1^ 글쓰기$ ^안녕^ %굵게%",
    );

    interface ParseTextProps {
        text: string;
        bulletOption: boolean;
        FontColorWrapper: React.ComponentType<any>;
        BoldAndColoredWrapper: React.ComponentType<any>;
    }

    const parseText = ({ text, bulletOption = true, FontColorWrapper, BoldAndColoredWrapper }: ParseTextProps) => {
        const parts = text.split(/\n/g); // Split by newline character

        return parts.map((part, index) => {
            // 문자열 내에서 ^로 감싸진 부분과 %로 감싸진 부분을 분리
            const innerParts = part.split(/(\^[^^]+\^|%[^%]+%|\^[^^]+%[^%]+\^|\^[^^]+%[^%]+%)/g);
            // 빈 문자열을 제거
            const filteredInnerParts = innerParts.filter(part => part.trim() !== '');

            console.log(filteredInnerParts);

            return (
                <React.Fragment key={index}>
                    {filteredInnerParts.length > 0 ? (
                        <>
                            {bulletOption && <span>&bull; </span>}
                            {filteredInnerParts.map((innerPart, innerIndex) => {
                                if (innerPart.startsWith("^") && innerPart.endsWith("^")) {
                                    if (innerPart.includes("%")) {
                                        const content = innerPart.replace(/\^|%/g, '');
                                        return (
                                            <BoldAndColoredWrapper key={innerIndex}>
                                                {content}
                                            </BoldAndColoredWrapper>
                                        );
                                    } else {
                                        const content = innerPart.slice(1, -1);
                                        return (
                                            <FontColorWrapper key={innerIndex}>
                                                {content}
                                            </FontColorWrapper>
                                        );
                                    }
                                } else if (innerPart.startsWith("%") && innerPart.endsWith("%")) {
                                    const content = innerPart.slice(1, -1);
                                    return (
                                        <span key={innerIndex} className="bold">
                                            {content}
                                        </span>
                                    );
                                } else {
                                    return <span key={innerIndex}>{innerPart}</span>;
                                }
                            })}
                        </>
                    ) : null}
                    <br /> {/* 항상 개행 유지 */}
                </React.Fragment>
            );
        });
    };

    return (
        <>
            <textarea
                style={{
                    width: "500px",
                    height: "150px",
                    border: "1px solid #000",
                }}
                onChange={(e) => {
                    set특수문자들어간문자열(e.target.value);
                }}
            ></textarea>
            <p>
                ^로 감싼 텍스트는 노란색으로,
                <br />
                %로 감싼 텍스트는 굵게,
                <br />
                ^와 %로 감싼 텍스트는 노란색과 굵게 
            </p>
            <hr className="my-5" />
            <div className="mt-5">
                {parseText({ text: 특수문자들어간문자열, bulletOption: true, FontColorWrapper: 테스트스타일컴포넌트, BoldAndColoredWrapper: BoldAndColoredComponent })}
            </div>
            <br />
            <br />
            <div>
                {parseText({ text: 특수문자들어간문자열, bulletOption: true, FontColorWrapper: 테스트스타일컴포넌트, BoldAndColoredWrapper: BoldAndColoredComponent }).map((element, index) => (
                    <pre key={index}>
                        {React.isValidElement(element)
                            ? ReactDOMServer.renderToStaticMarkup(element)
                            : String(element)}
                    </pre>
                ))}
            </div>
        </>
    );
};
export default ChangeCharacter;