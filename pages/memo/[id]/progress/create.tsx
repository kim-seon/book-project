import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { useCurrentUser } from '../../../../lib';

export default function ProgressBookCreate() {
    const router = useRouter()

    const [startDate, setStartDate] = useState(new Date());
    const [pageCount, setPageCount] = useState(0)

    const [user, { mutate }] = useCurrentUser();

    const handlePageCount = (e) => {
        setPageCount(e.currentTarget.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            state: 'progress',
            writer: user._id,
            startDate: moment(startDate).format('YYYY-MM-DD'),
            book: router.query.bookId,
            page: pageCount,
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
                    <input onChange={handlePageCount} value={pageCount} />
                    <span> / {router.query.bookPage}</span>
                </div>
                <button type="submit" onChange={handleSubmit} >저장하기</button>
            </form>
        </div>
    )
}