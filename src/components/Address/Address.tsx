import './Address.module.css'


interface UrlProps {
  url: string
  newTab?: boolean
}

const Address = ({ url, newTab }: UrlProps) => {
  const handleClick = () => {
    if (newTab) {
      window.open(url, '_blank')
    } else {
      window.location.href = url
    }
  }

  return (
    <a href={url} onClick={handleClick}>
      {url}
    </a>
  )
}

export default Address
