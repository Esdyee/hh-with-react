import React, { useEffect, useState } from "react";
import "./style/CircurlarProgress.css";

interface CircularProgressBarProps {
    sqSize?: number;
    percentage?: number;
    strokeWidth?: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
    sqSize = 200,
    percentage = 0,
    strokeWidth = 10,
}) => {
    const radius = (sqSize - strokeWidth) / 2;
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    const dashArray = radius * Math.PI * 2;

    return (
        <svg width={sqSize} height={sqSize} viewBox={viewBox}>
            <circle
                className="circle-background"
                cx={sqSize / 2}
                cy={sqSize / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
            />
            <circle
                className="circle-progress"
                cx={sqSize / 2}
                cy={sqSize / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
                transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
                style={{
                    strokeDasharray: dashArray
                }}
            />
            <text
                className="circle-text"
                x="50%"
                y="50%"
                dy=".3em"
                textAnchor="middle"
            >
                <tspan className="percentage-number">0</tspan>%
            </text>
        </svg>
    );
};

const CircularProgressBarTest: React.FC = () => {
    const [percentage, setPercentage] = useState<number>(0);

    const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPercentage(Number(event.target.value));
    };

    // const zeroToHundred = () => {
    //     setPercentage(0);
    // };

    // useEffect(() => {
    //     let currentPercentage = 0;
    //     const intervalTime = 50; // 50ms마다 업데이트
    //     const increment = 1; // 한 번에 1씩 증가

    //     const timer = setInterval(() => {
    //         if (currentPercentage >= 100) {
    //             clearInterval(timer);
    //             return;
    //         }
    //         currentPercentage += increment;
    //         setPercentage(currentPercentage);
    //     }, intervalTime);

    //     return () => clearInterval(timer); // cleanup
    // }, []);

    return (
        <div>
            <CircularProgressBar
                strokeWidth={10}
                sqSize={200}
                percentage={percentage}
            />
            <div>
                <input
                    id="progressInput"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={percentage}
                    onChange={handleChangeEvent}
                />
            </div>
            <pre>{JSON.stringify(percentage)}</pre>
        </div>
    );
};

export default CircularProgressBarTest;
