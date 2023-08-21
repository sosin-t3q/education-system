import { useRecoilValue } from 'recoil'
import useBook from '@/hooks/useBook'
import styles from './Book.module.css'
import { bookAtom } from '@/atoms'
import { ReactComponent as BookmarkFill } from '@/assets/bookmark-fill.svg'
import { ReactComponent as BookmarkEmpty } from '@/assets/bookmark-empty.svg'

const Book = ({ className }: { className: string }) => {
  const book = useRecoilValue(bookAtom)
  const { addBook, deleteBook } = useBook()

  //book이 false면 예제 추가, true면 예제 제거
  const handleBook = () => {
    if (!book) {
      addBook()
    } else {
      deleteBook()
    }
  }

  return (
    <button
      type="button"
      className={`${className} ${styles.Book}`}
      onClick={handleBook}
      aria-label="북마크하기"
    >
      {book === false ? <BookmarkEmpty /> : <BookmarkFill />}
    </button>
  )
}

export default Book
