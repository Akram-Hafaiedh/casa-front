import { HiMiniSquaresPlus } from "react-icons/hi2"
import Hexagon from "../../../components/Hexagon"

interface AddTaskPropType {
    onClick : () => void
}
const AddTaskCard : React.FC<AddTaskPropType> = ({onClick}) =>{
    return (
        <div className="card !border-2 border-dashed !border-brand-clarity bg-center bg-[length:600px] bg-no-repeat min-h-65 cursor-pointer" onClick={onClick}
            style={{ backgroundImage: `url("/images/2600x1200/bg-4.png")` }}>
            <div className="card-body p-5 lg:p-7.5 flex flex-col gap-1 lg:gap-2.5 items-center justify-center">
                <Hexagon
                    icon={HiMiniSquaresPlus}
                    size={60}
                    fillClass="fill-primary-light"
                    strokeClass="stroke-primary-clarity"
                    iconClassName="text-primary"
                    iconSize={30}
                />
                <span className="text-lg font-medium text-gray-900 hover:text-primary-active">
                    Add New Task
                </span>
                <span className="text-2sm text-gray-700">
                    Project management for agile teams, tracking issues and tasks.
                </span>
            </div>
        </div>
    )
}
export default AddTaskCard