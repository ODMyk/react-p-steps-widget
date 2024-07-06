import { useMemo } from "react";
import { WalkingPeriod } from "../types/WalkingPeriod";
import { MapPin } from "lucide-react";

interface StepsWidgetProps {
    data: WalkingPeriod[];
    columnsCount?: 12 | 24;
    stepsGoal?: number;
    changeColumnsCount: () => void;
}

export default function StepsWidget({ data, columnsCount = 12, stepsGoal = 8000, changeColumnsCount }: StepsWidgetProps) {
    const isSameDay = (a: Date, b: Date) => {
        return a.getUTCDate() === b.getUTCDate() && a.getUTCMonth() === b.getUTCMonth() && a.getUTCFullYear() === b.getUTCFullYear();
    }

    const OFFSET = new Date().getTimezoneOffset() * 60000;
    const HOURS_IN_PERIOD = 24 / columnsCount;
    const PERIOD_LENGTH = HOURS_IN_PERIOD * 3600000;
    const currentDate = new Date();
    const sortedData = data.map((period) => ({ start: new Date(Date.parse(period.startTime) + OFFSET), end: new Date(Date.parse(period.endTime) + OFFSET), steps: period.steps })).filter((p) => isSameDay(currentDate, new Date(p.start))).sort((a, b) => a.start.getTime() - b.start.getTime())
    const stepsCount = useMemo(() => sortedData.map(period => period.steps).reduce((prev, cur) => prev + cur, 0), [data]);
    const percentage = useMemo(() => Math.floor(stepsCount * 100 / stepsGoal), [data, stepsGoal]);
    const supremum = stepsGoal / 4;
    const nextDate = new Date(currentDate.getTime());
    const hour = currentDate.getHours();
    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);

    let lastIndex = 0;
    const periods = [];
    for (let i = 0; i < columnsCount; ++i) {
        periods.push(0);
    }

    for (let i = 0, j = 0; i < columnsCount; ++i) {
        currentDate.setHours(i * HOURS_IN_PERIOD);
        nextDate.setTime(currentDate.getTime() + (3.6e+6 * Math.round(HOURS_IN_PERIOD)))
        nextDate.setSeconds(0);
        nextDate.setMinutes(0);
        nextDate.setMilliseconds(0);
        if (currentDate.getHours() <= hour && hour < nextDate.getHours()) {
            lastIndex = i;
        }

        while (j < sortedData.length && sortedData[j].start.getTime() >= currentDate.getTime() && sortedData[j].start.getTime() < nextDate.getTime()) {
            let steps = sortedData[j].steps;
            let increment = true;
            if (sortedData[j].end.getTime() >= nextDate.getTime()) {
                increment = false;
                const numerator = nextDate.getTime() - sortedData[j].start.getTime();
                steps = Math.round(steps * (numerator) / PERIOD_LENGTH);
                sortedData[j].start.setTime(nextDate.getTime());
                sortedData[j].steps -= steps;
            }
            periods[i] += steps;
            if (increment) {
                ++j;
            }
        }

    }

    const styles: React.CSSProperties = {};
    if (percentage > 92) {
        styles["left"] = "-20px";
        styles["color"] = "white";
    }

    return (
        <>
            <div className="stepsContainer">
                <h3>Steps</h3>
                <p>{stepsCount}<span> /{stepsGoal} steps</span></p>
                <div className={`stepsChart-${columnsCount}`}>

                    {periods.map((val, index) => (
                        <div className={val > 0 ? "chartColumn" : "chartColumn-inactive"} style={{ height: `${Math.min(Math.max(val * 100 / supremum, 8), 100)}%` }} key={index}>
                            {index === lastIndex && <div><MapPin size={16} /></div>}

                        </div>
                    ))}
                </div>
                <div className="progressBar">
                    <div style={{ width: `${Math.min(percentage, 100)}%` }}>
                        <div>
                            {percentage > 90 && <span style={styles}>
                                {percentage}%
                            </span>}
                            {percentage <= 90 && <span>
                                {percentage}%
                            </span>}
                        </div>
                    </div>
                </div>
                <button onClick={changeColumnsCount}>Change columns count</button>
                <small>Steps Now</small>
            </div>
        </>
    );
}