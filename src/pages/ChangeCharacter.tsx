import React, { useState } from "react";
import "./style/ChangeCharacter.css";
import styled, { StyledComponent } from "@emotion/styled";
import ReactDOMServer from 'react-dom/server';

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
        FontColorWrapper: StyledComponent<"span", any>;
        BoldAndColoredWrapper: StyledComponent<"span", any>;
    }

    const parseText = ({ text, FontColorWrapper, BoldAndColoredWrapper }: ParseTextProps) => {
        const parts = text.split(/\n/g); // Split by newline character

        return parts.map((part, index) => {
            const innerParts = part.split(/(\^[^^]+\^|%[^%]+%|\^[^^]+%[^%]+\^|\^[^^]+%[^%]+%)/g);

            return (
                <React.Fragment key={index}>
                    <span>&bull; </span> {/* Bullet point */}
                    {innerParts.map((innerPart, innerIndex) => {
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
                    <br /> {/* Line break for each part */}
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
                {parseText({ text: 특수문자들어간문자열, FontColorWrapper: 테스트스타일컴포넌트, BoldAndColoredWrapper: BoldAndColoredComponent })}
            </div>
            <br />
            <br />
            <br />
            <div>
                {parseText({ text: 특수문자들어간문자열, FontColorWrapper: 테스트스타일컴포넌트, BoldAndColoredWrapper: BoldAndColoredComponent }).map((element, index) => (
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
