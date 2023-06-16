import styles from './HomeInfo.module.css'
import { Title, Text } from '@/components'
import imagesData from '@/assets/images-data.svg'
import imagesTask from '@/assets/images-task.svg'

const HomeInfo = () => {
  return (
    <div className={styles.info}>
      <div className={styles['info-inner']}>
        <Title
          type={2}
          className={`${styles.title} ${styles.h2}`}
          label="AI훈민정음으로 인공지능을 쉽게!"
        />
        <iframe
          className={styles.video}
          src="https://www.youtube.com/embed/FF1DBp5EgAU"
          width="720"
          height="405"
          title="t3q 소개 유튜브 영상"
        ></iframe>
        <Text className={styles.paragraph} variant="paragraph">
          세종대왕께서 글이 없어 자기 뜻을 제대로 표현하지 못한 백성들을 위하여
          28글자를 만들어 세상의 모든 소리와 뜻을 전할 수 있게 한 것처럼,
          인공지능에서 다루는
          <span style={{ fontWeight: 700 }}>
            &nbsp; 데이터 7종, 인공지능이 하는 태스크 4가지를 조합한 28가지
            우수케이스를 통합 플랫폼에 탑재한 사례집
          </span>
          입니다.
        </Text>
        <div className={styles['info-data']}>
          <Title
            type={2}
            className={`${styles.title} ${styles.h2}`}
            label="데이터 7종"
          />
          <img
            src={imagesData}
            alt="데이터 7종 이미지"
            className={`${styles.images} ${styles['images-data']}`}
          />
        </div>
        <Text
          className={`${styles.paragraph} ${styles.center}`}
          variant="paragraph"
        >
          인공지능에서 다루는 데이터는
          <span style={{ fontWeight: 700 }}>
            &nbsp; 텍스트, 이미지, 음성, 영상, 위성, 로그/수치, 바이너리&nbsp;
          </span>
          등 7종입니다.
        </Text>
        <div className={styles['info-task']}>
          <Title
            type={2}
            className={`${styles.title} ${styles.h2}`}
            label="태스크 4가지"
          />
          <img
            src={imagesTask}
            alt="태스크 4가지 이미지"
            className={styles.images}
          />
        </div>
        <Text
          className={`${styles.paragraph} ${styles.center}`}
          variant="paragraph"
        >
          인공지능이 하는 태스크는
          <span style={{ fontWeight: 700 }}>
            &nbsp;분류, 회귀, 군집화, 이상감지&nbsp;
          </span>
          등 4가지입니다.
        </Text>
      </div>
    </div>
  )
}

export default HomeInfo
