import { useState, useEffect } from "react";
import { useCurrentUser } from '../../../../lib';
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import moment from 'moment';
import ReactStars from "react-rating-stars-component";
import { TiStarOutline, TiStarHalfOutline, TiStarFullOutline } from "react-icons/ti";
import axios from "axios";

export default function CompleteBookCreate() {
    const router = useRouter()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
    const [starClicked, setStarClicked] = useState(0);
    const [content, setContent] = useState('');

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
        const data = {
            state: 'complete',
            writer: user._id,
            rating: starClicked,
            content: content,
            startDate: moment(startDate).format('YYYY-MM-DD'),
            endDate: moment(endDate).format('YYYY-MM-DD'),
            book: router.query.bookId,
            bookCover: router.query.bookCover,
            bookTitle: router.query.bookTitle,
            bookAuthor: router.query.bookAuthor,
            bookDsc: router.query.bookDsc,
            bookPage: router.query.bookPage
        }
        const JSONdata = JSON.stringify(data)
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSONdata
        }
        const response = await fetch('/api/user/memo/write', options);
        if (response.status === 201) {
            alert('기록 성공')
            router.replace(`/memo/${user._id}`)
        }
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                            maxDate={new Date()}
                            onChange={date => {setStartDate(date)}} />
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
                        value={content}
                    />
                </div>
                <button type="submit" onChange={handleSubmit}>저장하기</button>
            </form>
        </div>
    )
}