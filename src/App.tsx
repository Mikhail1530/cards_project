
import { MyButton } from "@/components/ui/Button";


export function App() {
  return <div>
    <MyButton variant={"link"} className={"kakoito"}>text</MyButton>
    <MyButton variant={"primary"}>text</MyButton>
    <MyButton variant={"secondary"}>text</MyButton>
    <MyButton variant={"tertiary"}>text</MyButton>
  </div>
}
