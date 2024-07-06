import { useMemo, useState } from "react";
import { WalkingPeriod } from "../types/WalkingPeriod";

interface StepsWidgetProps {
    data: WalkingPeriod[];
    stepsGoal?: number;
}

export default function StepsWidget({ data, stepsGoal = 8000 }: StepsWidgetProps) {
    const [columnsCount, setColumnsCount] = useState(12);

    const OFFSET = new Date().getTimezoneOffset() * 60000;
    const PERIOD_LENGTH = 24 / columnsCount * 3600000;

    const filteredData = data.map((period) => ({
        start: new Date(Date.parse(period.startTime) + OFFSET),
        end: new Date(Date.parse(period.endTime) + OFFSET),
        steps: period.steps
    }))

    const periods = Array.from({ length: columnsCount }).map((_, index) => {
        return filteredData.reduce((acc, period) => {
            const dayStart = new Date(period.start).setHours(0, 0, 0, 0);
            const startIndex = Math.trunc((period.start.getTime() - dayStart) / PERIOD_LENGTH);
            const endIndex = Math.trunc((period.end.getTime() - dayStart) / PERIOD_LENGTH);

            if (startIndex === endIndex && startIndex === index) {
                return acc + period.steps;
            }
            if (index === startIndex) {
                return acc + Math.trunc(period.steps * ((dayStart + (index + 1) * PERIOD_LENGTH - period.start.getTime()) / PERIOD_LENGTH));
            }
            if (index === endIndex) {
                return acc + Math.trunc(period.steps * ((period.end.getTime() - dayStart - index * PERIOD_LENGTH) / PERIOD_LENGTH));
            }

            return acc;
        }, 0)
    });
    const supremum = Math.max(...periods, 20);
    const stepsCount = useMemo(() => periods.reduce((acc, period) => period + acc, 0), [data]);
    const percentage = useMemo(() => Math.floor(stepsCount * 100 / stepsGoal), [data, stepsGoal]);

    return (
        <>
            <div className="stepsContainer">
                <h3>Steps</h3>
                <p>{stepsCount}<span> /{stepsGoal} steps</span></p>
                <div className="stepsChart" style={{ gridTemplateColumns: `repeat(${columnsCount}, 1fr)` }}>

                    {periods.map((val, index) => (
                        <div
                            className={(val > 0 ? "chartColumn" : "chartColumn-inactive")}
                            style={{ height: `${Math.min(Math.max(val / supremum * 100, 10), 100)}%` }}
                            key={index}
                        />
                    ))}
                </div>
                <div className="progressBar">
                    <div className={percentage > 92 ? "" : "right"} style={{ width: `${Math.min(percentage, 100)}%` }}>
                        {percentage > 92 && <span className="progressText left">
                            {percentage}%
                        </span>}
                    </div>
                    {percentage <= 92 && <span className="progressText">
                        {percentage}%
                    </span>}
                </div>
                <input type="range" className="slider" min={1} max={48} value={columnsCount} onChange={({ target }) => setColumnsCount(Math.round(Number(target.value)))} />
                <span className="slider_info">Columns count: {columnsCount}</span>
                <small>Steps Now</small>
            </div>
        </>
    );
}