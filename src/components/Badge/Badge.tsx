import './Badge.css'

interface BadgeProps {
  width: string;
  content: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({width, content}) => {

  return (
    <button className='badge-university' style={{width: width}}>
      {content}
    </button>
  )
}

export default Badge;