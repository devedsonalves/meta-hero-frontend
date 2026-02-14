import React from 'react'

export const LabelInput: React.FC<{
  type: string
  placeholder: string
  value: string
  label: string
}> = ({ label, type, placeholder, value }) => {
  return (
    <>
      <div className="relative w-full">
        <label className="absolute left-3 text-xs top-2  text-[#616161]">
          {label}
        </label>
        <input
          className="w-full rounded-md  bg-[#f5f5f5] pt-7 pb-4 px-6 "
          type={type}
          value={value}
          placeholder={placeholder}
        />
      </div>
    </>
  )
}
export default LabelInput
