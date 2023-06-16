import styles from './Pagination.module.css'
import paginationLeft from '@/assets/pagination-left.svg'
import paginationRight from '@/assets/pagination-right.svg'

interface PaginationProps {
  totalPage: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Pagination = ({ totalPage, currentPage, onPageChange }: PaginationProps) => {

  const handlePageChange = (page: number) => {
    onPageChange(page)
  }

  const renderPageButtons = () => {
    return Array.from({ length: totalPage }, (_, i) => {
      return (
        <button
          key={i + 1}
          className={`${styles['pagination-page']} ${
            currentPage === i ? styles.active : ''
          }`}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>
      )
    })
  }

  return (
    <div className={styles.pagination}>
      <button className={styles['pagination-button']}>
        <img src={paginationLeft} alt="왼쪽 버튼" />
      </button>
      <div className={styles['pagination-pages']}>{renderPageButtons()}</div>
      <button className={styles['pagination-button']}>
        <img src={paginationRight} alt="오른쪽 버튼" />
      </button>
    </div>
  )
}

export default Pagination
