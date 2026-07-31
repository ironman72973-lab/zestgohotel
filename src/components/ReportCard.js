import "./ReportCard.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function ReportCard({
    title,
    value,
    icon,
    color = "#198754",
    change = "",
    positive = true
}) {
    return (
        <div className="report-card">
            <div
                className="report-card-icon"
                style={{ background: color }}
            >
                {icon}
            </div>

            <div className="report-card-content">
                <h6>{title}</h6>
                <h2>{value}</h2>

                {change && (
                    <span
                        className={
                            positive
                                ? "report-change positive"
                                : "report-change negative"
                        }
                    >
                        {positive ? <FaArrowUp /> : <FaArrowDown />}
                        {change}
                    </span>
                )}
            </div>
        </div>
    );
}

export default ReportCard;