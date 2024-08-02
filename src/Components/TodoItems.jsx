import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/trash.png";

const TodoItems = ({ text, id, isComplete, deleteTodo, deletefun }) => {
  return (
    <div className="flex items-center my-3 gap-2">
      <div className="flex flex-1 items-center cursor-pointer">
        <img className="w-7" src={tick} />
        sfb
        <p className="text-slate-700 ml-4 text-[17px]">{text}</p>
      </div>
      <img
        onClick={() => {
          deletefun(id);
        }}
        src={delete_icon}
        className="w-3.5 cursor-pointer"
      />
    </div>
  );
};

export default TodoItems;
