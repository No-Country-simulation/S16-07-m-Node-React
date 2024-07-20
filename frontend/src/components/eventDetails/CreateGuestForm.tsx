import React from "react";
import { useFormState } from "../../hooks/useFormState";
import { GuestType } from "../../types";
import { createGuest } from "../../services";

const CreateGuestForm = () => {
  const { formData, handleChange } = useFormState<GuestType>({
    fullname: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response = await createGuest(formData);
    console.log(response);
  };

  return (
    <div className="border-2 border-amber-300">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          placeholder="Nombre Completo"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type=""
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Telefono"
          required
        />
        <button type="submit">Agregar Usuario</button>
      </form>
    </div>
  );
};

export default CreateGuestForm;
