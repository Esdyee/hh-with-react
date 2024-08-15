    import React, { useState } from "react";
    import ReactDOMServer from 'react-dom/server';
    import "./style/ChangeCharacter.css";
    import styled, { StyledComponent } from "@emotion/styled";

    const 테스트스타일컴포넌트 = styled.span`
        color: orange;
    `;

    const BoldComponent = styled.span`
        font-weight: bold;
    `;

    const ChangeCharacter = () => {
        const [특수문자들어간문자열, set특수문자들어간문자열] = useState(
            "^테스트1^ ^%테스트2%^",
        );

        const [불릿옵션, set불릿옵션] = useState(true); 

        interface ParseTextProps {
            text: string;
            bulletOption: boolean;
            FontColorWrapper: React.ComponentType<any>;
            BoldComponent: React.ComponentType<any>;
        }

        const parseText = ({ text, bulletOption = 불릿옵션, FontColorWrapper, BoldComponent }: ParseTextProps) => {
            const parts = text.split(/\n/g); // Split by newline character

            return parts.map((part, index) => {
                // 문자열 내에서 ^로 감싸진 부분과 %로 감싸진 부분을 분리
                const innerParts = part.split(/(\^[^^]+\^|%[^%]+%|\^[^^]+%[^%]+\^|\^[^^]+%[^%]+%)/g).filter(Boolean);


                // 빈 문자열을 제거
                const filteredInnerParts = innerParts.filter(part => part !== '');

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
                                                <FontColorWrapper>
                                                    <BoldComponent>
                                                        {content}
                                                    </BoldComponent>
                                                </FontColorWrapper>
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
                                            <BoldComponent>
                                                {content}
                                            </BoldComponent>
                                        );
                                    } else {
                                        console.log(innerPart);
                                        return <span key={innerIndex}>{innerPart}</span>;
                                    }
                                })}
                            </>
                        ) : null}
                        <br />{/* 항상 개행 유지 */}
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
                <br/>
                <input type="checkbox" checked={불릿옵션} onChange={(e) => set불릿옵션(e.target.checked)} />불릿옵션
                <hr className="my-5" />
                <p>
                    ^로 감싼 텍스트는 노란색으로,
                    <br />
                    %로 감싼 텍스트는 굵게,
                    <br />
                    ^와 %로 감싼 텍스트는 노란색과 굵게 
                </p>
                <hr className="my-5" />
                {/* <div>
                    {특수문자들어간문자열}
                </div> */}
                <pre className="mt-5">
                    {parseText({ text: 특수문자들어간문자열, bulletOption: 불릿옵션, FontColorWrapper: 테스트스타일컴포넌트, BoldComponent: BoldComponent })}
                </pre>
                <br />
                <br />
                <pre>
                    {parseText({ text: 특수문자들어간문자열, bulletOption: 불릿옵션, FontColorWrapper: 테스트스타일컴포넌트, BoldComponent: BoldComponent }).map((element, index) => (
                        <pre key={index}>
                            {React.isValidElement(element)
                                ? ReactDOMServer.renderToStaticMarkup(element)
                                : String(element)}
                        </pre>
                    ))}
                </pre>
            </>
        );
    };
    export default ChangeCharacter;