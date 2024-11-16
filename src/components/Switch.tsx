interface SwitchProps {
    isChecked: boolean;
    onChange: () => void;
    label?: string;
}
const Switch : React.FC<SwitchProps> = ({ isChecked, onChange, label }) => {
  return (
    <label className="flex items-center cursor-pointer">
      {label && <span className="mr-2">{label}</span>}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="hidden"
      />
      <span
        className={`relative inline-block w-12 h-6 transition duration-300 ease-in-out ${
          isChecked ? 'bg-blue-500' : 'bg-gray-300'
        } rounded-full`}
      >
        <span
          className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-300 ease-in-out ${
            isChecked ? 'translate-x-5' : ''
          }`}
        />
      </span>
    </label>
  );
};

export default Switch;
