import React, { useEffect, useState } from "react";

// No es necesario importar 'mongoose' aquí porque ya lo hemos importado en 'connectDB'
// import mongoose from "mongoose";

function Form() {
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [documento, setDocumento] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [vehiculoPropio, setVehiculoPropio] = useState(false);
  const [casaPropia, setCasaPropia] = useState(false);
  const [telefono, setTelefono] = useState("");
  const [referencia, setReferencia] = useState("");
  const [empleador, setEmpleador] = useState("");
  const [monto, setMonto] = useState("");
  const [plazo, setPlazo] = useState("");
  const [solicitudes, setSolicitudes] = useState([{}]);
  const [estadoSolicitud, setEstadoSolicitud] = useState("");

  useEffect(() => {
    localStorage.setItem("solicitud", JSON.stringify(solicitudes));
  }, [solicitudes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const formData = {
        tipoDocumento,
        documento,
        nombres,
        apellidos,
        fechaNacimiento,
        vehiculoPropio,
        casaPropia,
        telefono,
        referencia,
        empleador,
        monto,
        plazo,
        estadoSolicitud,
      };
      if (!vehiculoPropio && !casaPropia) {
        setEstadoSolicitud("Rechazado");
      } else if (vehiculoPropio && !casaPropia && Number(monto) <= 90000) {
        setEstadoSolicitud("Aprobado");
      } else if (vehiculoPropio && casaPropia && Number(monto) <= 300000) {
        setEstadoSolicitud("Aprobado");
      } else {
        setEstadoSolicitud("En Proceso");
      }
      setSolicitudes((element) => {
        return [...element, formData];
      });
      alert("Solicitud Enviada");
    } catch (error) {
      console.error(error);
      alert("Error al enviar la solicitud");
    }
  };

  return (
    <div>
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit}>
        <p>Estado de la solicitud: {estadoSolicitud}</p>
        <div>
          <label htmlFor="tipoDocumento">Tipo de Documento:</label>
          <select
            id="tipoDocumento"
            onChange={(e) => setTipoDocumento(e.target.value)}
          >
            <option value="">Seleccione un tipo de documento</option>
            <option value="Pasaporte">Pasaporte</option>
            <option value="Cedula">Cédula</option>
          </select>
        </div>

        {tipoDocumento === "Cedula" && (
          <>
            <div>
              <label htmlFor="documento">Documento:</label>
              <input
                type="text"
                id="documento"
                onChange={(e) => setDocumento(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="nombres">Nombres:</label>
              <input
                type="text"
                id="nombres"
                onChange={(e) => setNombres(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="apellidos">Apellidos:</label>
              <input
                type="text"
                id="apellidos"
                onChange={(e) => setApellidos(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
              <input
                type="date"
                id="fechaNacimiento"
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="vehiculoPropio">¿Tiene vehículo propio?</label>
              <input
                type="checkbox"
                id="vehiculoPropio"
                checked={vehiculoPropio}
                onChange={() => setVehiculoPropio(!vehiculoPropio)}
              />
            </div>

            <div>
              <label htmlFor="casaPropia">¿Tiene casa propia?</label>
              <input
                type="checkbox"
                id="casaPropia"
                checked={casaPropia}
                onChange={() => setCasaPropia(!casaPropia)}
              />
            </div>
          </>
        )}

        <div>
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="text"
            id="telefono"
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="referencia">Referencia:</label>
          <textarea
            id="referencia"
            onChange={(e) => setReferencia(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="empleador">Empleador:</label>
          <input
            type="text"
            id="empleador"
            onChange={(e) => setEmpleador(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="monto">Monto solicitado:</label>
          <input
            type="text"
            id="monto"
            onChange={(e) => setMonto(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="plazo">Plazo de pago:</label>
          <select id="plazo" onChange={(e) => setPlazo(e.target.value)}>
            <option value="">Seleccione un plazo</option>
            <option value="6">6 meses</option>
            <option value="12">12 meses</option>
            <option value="18">18 meses</option>
            <option value="24">24 meses</option>
          </select>
        </div>

        <button type="submit">Enviar Solicitud</button>
      </form>
    </div>
  );
}

export default Form;
