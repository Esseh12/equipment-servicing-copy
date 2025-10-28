interface InputFieldProps {
  label: string;
  onBlur?: any;
  placeholder: string;
  name?: string;
  type?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  Icon?: string | any;
  className?: string;
  classNameLabel?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  autoComplete?: string;
  onKeyDown?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  onBlur,
  placeholder,
  name,
  type = "text",
  value,
  required,
  disabled,
  Icon,
  className,
  classNameLabel,
  id,
  onChange,
  maxLength,
  autoComplete,
}) => {
  return (
    <div className="flex flex-col items-start w-full gap-[.5rem]">
      {label && (
        <label
          htmlFor={name}
          className={`text-sm text-primaryGray font-medium ${classNameLabel}`}>
          {label}
          {required && <span className="text-red-500 ml-1">* </span>}
        </label>
      )}
      {Icon ? (
        <div
          className={`flex items-center w-full py-[11px] px-[12px] ${className}`}>
          <Icon className="cursor-pointer text-grayishBlue mr-[.5rem] text-lg" />
          <input
            id={id}
            type={type}
            onBlur={onBlur}
            value={value}
            disabled={disabled}
            onChange={onChange}
            className={`placeholder:font-normal placeholder:text-sm placeholder:leading-[20.28px] outline-none w-full ${
              disabled && "!bg-disableText"
            }`}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
          />
        </div>
      ) : (
        <input
          type={type}
          name={name}
          onBlur={onBlur}
          id={id}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={onChange}
          // className="border border-gray-300 rounded-md p-2 text-sm w-full focus:border-gray-700 focus:outline-none "
          className={`placeholder:font-normal placeholder:text-sm p-2 placeholder:leading-[20.28px] outline-none w-full py-[11px] px-[12px] *:
            ${disabled && "!bg-disableText"}
            ${className}`}
          required={required}
          maxLength={maxLength}
          autoComplete={autoComplete}
        />
      )}
    </div>
  );
};

export default InputField;
