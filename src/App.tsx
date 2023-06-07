import { Badge, Address } from "./index";

function App() {
  return (
    <>
      <Badge content="경북대학교 1기" width="106px" />
      <Address
        url="http://dl.idro3vub.aica.t3q.ai/model/api/28c4c/inference"
        newTab={true}
      />
    </>
  )
}

export default App
