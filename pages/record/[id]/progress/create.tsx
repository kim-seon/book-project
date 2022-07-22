import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import ReactStars from "react-rating-stars-component";

export default function ProgressBookCreate({ id }) {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div>
            <div className="calender-box">
                <span className="date">시작날짜</span>
                    <div> 
                    <DatePicker 
                        selected={startDate} 
                        dateFormat="yyyy-MM-dd" // 날짜 형식
                        maxDate={new Date()}
                        onChange={date => setStartDate(date)} />
                    </div>
            </div>
            <div>
                <span>읽은 페이지</span>
                <input />
            </div>
            <a>저장하기</a>
        </div>
    )
}