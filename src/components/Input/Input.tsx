import { ReactComponent as MatchCase } from '@/assets/match_case.svg'
import styles from './Input.module.css'
import { Canvas } from '@/components'

interface FileItem {
  name: string
  path: string
  text?: string
  data?: (string | number)[]
}

interface Target {
  id: string
  type: string
  name: string
  API?: string
  Key?: string[]
  file?: FileItem[]
}
interface InputProps {
  target: Target
  selected?: string
}

const Input = ({ target, selected }: InputProps) => {
  const selectedFile = target.file?.filter(item => item.name === selected)[0]

  let inner = <></>
  if (
    (selected === 'default' || selected === '예제 선택하기') &&
    target.type !== 'write' &&
    target.type !== 'draw'
  ) {
    inner = (
      <>
        <MatchCase />
        <p>추론 데이터 파일을 선택주세요</p>
      </>
    )
  } else {
    switch (target.type) {
      case 'text':
        inner = <p className={styles.selectedTxt}>{selectedFile?.text}</p>
        break
      case 'write':
        if (
          selected === 'default' ||
          selected === '예제 선택하기' ||
          (!selected && !target.file)
        ) {
          inner = (
            <label className={styles.textareaLabel}>
              <textarea placeholder="텍스트를 작성해주세요." />
            </label>
          )
        } else if (selectedFile) {
          inner = <p className={styles.selectedTxt}>{selectedFile?.text}</p>
        }
        break
      case 'image':
        inner = <img src={selectedFile?.path} alt={selectedFile?.name} />
        break
      case 'draw':
        if (selected === 'default' || selected === '예제 선택하기') {
          inner = <Canvas />
        } else if (selectedFile) {
          inner = <img src={selectedFile?.path} alt={selectedFile?.name} />
        }
        break
      case 'audio':
        inner = <audio controls src={selectedFile?.path} />
        break
      case 'video':
        inner = <video controls src={selectedFile?.path} />
        break
      case 'log':
        return (
          <div className={styles['input-log__box']}>
            <table className={styles['input-table']}>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Velue</th>
                </tr>
              </thead>
              <tbody>
                {target.Key?.map((item, index) => (
                  <tr>
                    <td>{item}</td>
                    <td>
                      <label aria-label="value">
                        <input
                          type="text"
                          value={
                            selectedFile?.data && selectedFile?.data[index]
                          }
                        />
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
    }
  }

  return <div className={styles.selectFile}>{inner}</div>
}

export default Input
