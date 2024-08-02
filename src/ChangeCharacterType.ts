import React from 'react';

export const parseText = (text: string): React.ReactNode => {
    const parts = text.split(/(\*[^*]+\*|\$|%[^%]+%)/g);

    return (
        <>
            {parts.map((part, index) => {
                if (part.startsWith('*') && part.endsWith('*')) {
                    // * 사이에 있는 문자열은 <span class='yellow'></span>으로 치환
                    const content = part.slice(1, -1);
                    return <span key={index} className="yellow">{content}</span>;
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
            })}
        </>
    );
};
