import styles from './Cube.module.css'
import { ReactComponent as CloseButton } from '@/assets/close-button.svg'

const Cube = () => {
  return (
    <div className={styles.cube}>
      <caption className={styles.caption}>일반</caption>
      <table>
        <thead>
          <th className={styles.header}>
            <span></span>
          </th>
          <th className={styles.header}>
            <span>분류</span>
          </th>
          <th className={styles.header}>
            <span>회귀</span>
          </th>
          <th className={styles.header}>
            <span>이상탐지</span>
          </th>
          <th className={styles.header}>
            <span>군집화</span>
          </th>
        </thead>
        <tbody>
          <tr>
            <td className={styles.side}>
              <span>텍스트</span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
          </tr>
          <tr>
            <td className={styles.side}>
              <span>이미지</span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
          </tr>
          <tr>
            <td className={styles.side}>
              <span>음성</span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
          </tr>
          <tr>
            <td className={styles.side}>
              <span>영상</span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
          </tr>
          <tr>
            <td className={styles.side}>
              <span>로그(수치)</span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
          </tr>
          <tr>
            <td className={styles.side}>
              <span>위성</span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
          </tr>
          <tr>
            <td className={styles.side}>
              <span>바이너리</span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
            <td className={styles.block}>
              <span>
                영화 리뷰 텍스트<br></br>감정 분석
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <CloseButton className={styles.button}></CloseButton>
    </div>
  )
}

export default Cube
