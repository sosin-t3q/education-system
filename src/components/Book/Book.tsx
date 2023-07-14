import styles from "./Book.module.css";
import { ReactComponent as BookmarkEmpty } from "@/assets/bookmark-empty.svg";
import { ReactComponent as BookmarkFill } from '@/assets/bookmark-fill.svg';
import useBook from '@/hooks/useBook';
import {bookAtom} from "@/atoms";
import {useRecoilValue} from "recoil";

const Book = ({className}: {className: string}) => {

    const book  = useRecoilValue(bookAtom);
    const {addBook, deleteBook} = useBook();

    const handleBook = () => {
        if(!book) {
            addBook();
        } else {
            deleteBook();
        }
    }

    return (
        <div className={`${className} ${styles.Book}`} onClick={handleBook}>
            {book === false ?  <BookmarkEmpty/> : <BookmarkFill/>}
        </div>
    )
}

export default Book