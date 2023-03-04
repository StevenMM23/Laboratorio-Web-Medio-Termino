import React, { useState } from "react";

function Persona() {
  const [documento, setDocumento] = useState("");
  const [personaEncontrada, setPersonaEncontrada] = useState(null);

  const handleBuscar = (e) => {
    e.preventDefault();
    // Obtener la lista de solicitudes del localStorage
    const solicitudes = JSON.parse(localStorage.getItem("solicitud")) || [];
    // Buscar la persona por documento en la lista de solicitudes
    const persona = solicitudes.find((solicitud) => solicitud.documento === documento);
    // Establecer el estado de personaEncontrada con los detalles de la persona
    setPersonaEncontrada(persona);
  };

  return (
    <div>
      <form onSubmit={handleBuscar}>
        <label>
          Ingrese el número de documento:
          <input type="text" value={documento} onChange={(e) => setDocumento(e.target.value)} />
        </label>
        <button type="submit">Buscar</button>
      </form>

      {personaEncontrada ? (
        <div>
          <h2>Detalles de la persona</h2>
          <p>Nombres: {personaEncontrada.nombres}</p>
          <p>Apellidos: {personaEncontrada.apellidos}</p>
          <p>Documento: {personaEncontrada.documento}</p>
          {/* Agregar la imagen genérica asociada a la persona */}
          <img src={`https://concepto.de/wp-content/uploads/2018/08/persona-e1533759204552.jpg`} alt={`Foto de ${personaEncontrada.nombres} ${personaEncontrada.apellidos}`} />
        </div>
      ) : (
        <p>Ingrese un número de documento para buscar una persona</p>
      )}
    </div>
  );
}

export default Persona;
