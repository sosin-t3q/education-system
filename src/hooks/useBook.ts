import axios from 'axios';
import { cartAtom, cartTableAtom, bookAtom } from '@/atoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const useBook = () => {
    const cart = useRecoilValue(cartAtom);
    const setBook = useSetRecoilState(bookAtom);
    const [cartTable, setCartTable] = useRecoilState(cartTableAtom);


    // 확인하는 함수
    const checkBook = () => {
                axios.get("/")
                .then(res => { 
                    // data 배열을 반환함
                    const data = res.data;
                    //cart.id에는 상세페이지의 id가 들어있는데, 이 값이 이미 data 배열 안에 있다면 book의 값은 true, 아니면 false다
                    const isBook = data.some((item:{ id: number, title: string }) => item.id === cart.id);
                    if(isBook) {
                        setBook(true);
                    } else {
                        setBook(false);
                    }
                })
                .catch(err => {
                    console.log(err.message);
                })
    }
    
    // 추가하는 함수
    const addBook = () => {
            setBook(true);
            // cart에 담긴 data를 body에 넣어 POST통신을 함
            axios.post('/', cart)
            .then(res => {
                //cart가 추가된 배열 데이터인 res.data가 들어옴
                const data = res.data;
                //cartTable에 data 배열 값을 전달함
                setCartTable([...data]);
                alert("추가됐습니다!")
            })
            .catch(err => {
                console.log(err.message);
                setBook(false);
            })
    }

    //삭제하는 함수
    const deleteBook = () => {
        const originalData = [...cartTable];

        axios.delete(`/${cart.id}`)
        .then(() => {
            setBook(false);
            alert("제거됐습니다!")
        })
        .catch(err => {
            console.log(err.message);
            setCartTable(originalData)
        })
    }

    return {checkBook, addBook, deleteBook};
}

export default useBook;