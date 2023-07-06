import data from '@/data/LAYERS_DATA.json'
import styles from './Layer.module.css'
import { tableAtom } from '@/atoms'
import { useSetRecoilState } from 'recoil'

interface LayerProps {
  variant: '전국민 AI' | '전산업 AI의료' | '전장병 AI' | '개인 AI'
  className?: string
}

interface LayerDataProps {
  id: number
  name: string
}

const Layer = ({ className, variant }: LayerProps) => {
  const setTable = useSetRecoilState(tableAtom)

  // title, body는 variant props에 따라 채워질 내용이 달라지기 때문에 빈 값으로 선언됨
  // Q - 현재는 any 타입인데 이게 맞는 걸까?
  let title
  let body

  // 전달받은 variant prop에 따라 보여주는 레이어 콘텐츠가 달라지는 조건문
  if (variant === '전국민 AI') {
    title = data[0].title
    body = data[0].body
  } else if (variant === '전산업 AI의료') {
    title = data[1].title
    // 데이터가 준비되지 않은 값은 레이어 통일성을 위해 인위적으로 배열을 생산함
    // M - 전산업 AI의료의 경우 기획에서 새로 전달받기로 함
    //body는 id와 name 속성을 가진 객체가 28개 담긴 배열이다
    body = new Array(28)
      .fill(0)
      .map((_, index) => ({ id: index + 1, name: '' }))
  } else if (variant === '전장병 AI') {
    title = data[2].title
    // 데이터가 준비되지 않은 값은 레이어 통일성을 위해 인위적으로 배열을 생산함
    //body는 id와 name 속성을 가진 객체가 28개 담긴 배열이다
    body = new Array(28)
      .fill(0)
      .map((_, index) => ({ id: index + 1, name: '' }))
  } else {
    title = data[3].title
    // 데이터가 준비되지 않은 값은 레이어 통일성을 위해 인위적으로 배열을 생산함
    // M - 개인 AI의 경우, DB를 별도로 생성해서 관리하기 때문에 수정될 예정임!
    //body는 id와 name 속성을 가진 객체가 28개 담긴 배열이다
    body = new Array(28)
      .fill(0)
      .map((_, index) => ({ id: index + 1, name: '' }))
  }

  // variant prop에 따라 backgroundColor의 값은 달라진다
  const layerBackgroundColor =
    variant === '전국민 AI'
      ? { background: '#EAEEFF' }
      : variant === '전산업 AI의료'
      ? { background: '#DBDFFE' }
      : variant === '전장병 AI'
      ? { background: '#BFC7FE' }
      : { background: '#93A4FD' }

  return (
    // variant prop에 따라 달라진 배경색이 인라인 스타일로 전달된다
    <div
      className={`${className} ${styles.Layer}`}
      style={layerBackgroundColor}
      // 클릭할 경우 table atom의 값이 variant prop으로 들어감
      // 그로 인해 Modal의 색상이 변함
      onClick={() => {
        setTable(variant)
      }}
    >
      <h3 className={styles.title}>{title}</h3>
      <div className={styles['block-container']}>
        {body?.map((data: LayerDataProps) => {
          console.log(data)
          return (
            // M - 렌더링이 되어도 빈 값인 데이터들이 많아 id값이 제대로 전달되지 않을 것들이 있음!
            <div key={data.id} className={styles.block}>
              <span
                className={styles.content}
                // M - InnerHTML은 XSS 공격에 취약해 사용하면 안 된다!
                // M - DOMPurift를 사용하면 되지만, npm audit 문제로 우선은 보류했다
                dangerouslySetInnerHTML={{ __html: data.name }}
              ></span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Layer
