import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import styles from './Book.module.css'
import { useBook, useKeycloakAuthenticated } from '@/hooks/_index'
import { bookAtom } from '@/atoms'
import { ReactComponent as BookmarkFill } from '@/assets/bookmark-fill.svg'
import { ReactComponent as BookmarkEmpty } from '@/assets/bookmark-empty.svg'


const Book = ({ className }: { className: string }) => {
  const book = useRecoilValue(bookAtom)

  const { addBook, deleteBook, checkBook } = useBook()
  const isKeycloakAuthenticated = useKeycloakAuthenticated()

  const cartId = localStorage.getItem("cartId")
  
  // 쿠키가 생성될 때 isLoggedIn이 true가 되어 checkBook이 즉시 실행된다. 
  // 그 뒤로는 userAuth 쿠기와 cardId 값을 추적하여 다시 실행한다
  useEffect(() => {
    if(isKeycloakAuthenticated) {
      checkBook()
    }
  }, [isKeycloakAuthenticated, cartId])

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
