import React from 'react';

const FormField = ({
    labelName,
    type,
    name,
    placeholder,
    value,
    handleChange,
    isSurpriseMe,
    handleSurpriseMe,
}) => (
    <div>
        <div className="flex items-center gap-2 mb-2">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-[#ddd]"
            >
                {labelName}
            </label>
            {isSurpriseMe && (
                <button
                    type="button"
                    onClick={handleSurpriseMe}
                    className="px-2 py-1.5 text-xs font-normal tracking-wider text-white rounded-xl bg-purple-700 hover:bg-purple-800 ring-4 ring-inset ring-purple-700/5"
                >
                    Surprise me
                </button>
            )}
        </div>
        <input
            type={type}
            id={name}
            name={name}
            className="bg-gray-800/70 border border-gray-500 text-gray-200 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            required
        />
    </div>
);

export default FormField;