
import { MyButton } from "@/components/ui/Button";
import MyCheckbox from "@/components/ui/Сheckbox/MyCheckbox.tsx";


export function App() {
  return <div>
    <MyCheckbox>checkxobx</MyCheckbox>
    <MyButton variant={"link"} className={"kakoito"}>text</MyButton>
    <MyButton variant={"primary"}>text</MyButton>
    <MyButton variant={"secondary"}>text</MyButton>
    <MyButton variant={"tertiary"}>text</MyButton>
  </div>
}
