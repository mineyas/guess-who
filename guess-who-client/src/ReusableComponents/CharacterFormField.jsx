export default function CharacterFormField({
  label,
  value,
  isEdit,
  register,
  errors,
}) {
  return (
    <span className="flex_row items-center gap-2">
      <label htmlFor="" className="text-primary text-lg w-2/5">
        {label}
      </label>
      {isEdit ? (
        <input
          type="text"
          defaultValue={value}
          {...register}
          className="rounded-md border-gray-300 text-gray-400"
        />
      ) : (
        <p>{value}</p>
      )}
      {errors && <p className="text-red-500">This field is required</p>}
    </span>
  );
}
