import { useState, useEffect } from "react";
import { useCurrentUser } from '../../../../lib';
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import moment from 'moment';
import ReactStars from "react-rating-stars-component";
import { TiStarOutline, TiStarHalfOutline, TiStarFullOutline } from "react-icons/ti";

export default function CompleteBookCreate({ id }) {
    const router = useRouter()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [starClicked, setStarClicked] = useState('');
    const [Content, setContent] = useState('');

    const [user, { mutate }] = useCurrentUser();

    const ratingChanged = (newRating) => {
        console.log(newRating);
        setStarClicked(newRating)
    };

    const handleChangeContent = (e) => {
        setContent(e.currentTarget.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const writer = user ? user._id : console.log('로그인된 유저가 없습니다.')
        const data = {
            state: 'complete',
            writer: writer,
            rating: starClicked,
            content: Content,
            startDate: startDate,
            endDate: endDate,
            book: router.query.bookId
        }
        const JSONdata = JSON.stringify(data)
        await fetch('/api/user/record/write', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSONdata
        });
    }
    
    return (
        <div>
            <div>
                <span>평점</span>
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={35}
                    isHalf={true}
                    emptyIcon={<TiStarOutline color="#dcdcdc"></TiStarOutline>}
                    halfIcon={<TiStarHalfOutline></TiStarHalfOutline>}
                    filledIcon={<TiStarFullOutline></TiStarFullOutline>}
                    activeColor="#ffd700"
                />
                <span>{starClicked} / 5</span>
            </div>
            <div className="calender-box">
                <div className="date">시작날짜</div>
                    <div>
                    <DatePicker 
                        selected={startDate} 
                        dateFormat="yyyy-MM-dd"
                        onChange={date => {setStartDate(date); console.log(moment(startDate).format('YYYY-MM-DD'))}} />
                    </div>
                </div>
                <div className="calender-box">
                    <div className="date">종료날짜</div>
                        <div>
                            <DatePicker 
                            selected={endDate} 
                            dateFormat="yyyy-MM-dd"
                            maxDate={new Date()}
                            onChange={date => setEndDate(date)} /> 
                        </div>
                    </div>
                <div>
                <textarea 
                    style={{width: '300px', height: '300px'}}
                    onChange={handleChangeContent}
                    value={Content}
                />
            </div>
            <button type="submit" onChange={handleSubmit}>저장하기</button>
        </div>
    )
}