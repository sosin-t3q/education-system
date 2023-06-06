import './Text.css'

interface TextProps {
  text: string
  color?: string
  size?: number
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number
}

const Text: React.FC<TextProps> = ({ text, color, size, fontWeight }) => {
  const textStyle = {
    color: color,
    fontSize: size,
    fontWeight: fontWeight,
  }

  return <p style={textStyle}>{text}</p>
}

export default Text
