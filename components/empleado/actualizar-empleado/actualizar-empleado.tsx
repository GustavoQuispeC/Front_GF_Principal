"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader, Input, Button, Divider, Chip } from "@heroui/react";
import { User, Mail, Phone, MapPin, Briefcase, Landmark, HeartPulse } from "lucide-react";

export default function ActualizarEmpleado() {
  const [activo, setActivo] = useState(true);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Card>
        <CardBody className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gray-200" />

            <div>
              <h2 className="text-xl font-semibold">Actualizar Empleado</h2>

              <div className="flex gap-2 mt-2">
                <Chip color="success" variant="flat">
                  {activo ? "Activo" : "Inactivo"}
                </Chip>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="bordered" onPress={() => setActivo(!activo)} color={activo ? "danger" : "success"}>
              {activo ? "Desactivar" : "Activar"}
            </Button>

            <Button color="primary">Guardar cambios</Button>
          </div>
        </CardBody>
      </Card>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DATOS PERSONALES */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <User size={18} />
            <span className="font-semibold">DATOS PERSONALES</span>
          </CardHeader>
          <Divider />
          <CardBody className="grid grid-cols-2 gap-4">
            <Input label="Nombres" />
            <Input label="Apellidos" />

            <Input label="Género" />
            <Input label="Estado Civil" />

            <Input label="Fecha de Nacimiento" />
            <Input label="Edad" />

            <Input label="Nacionalidad" className="col-span-2" />
          </CardBody>
        </Card>

        {/* CONTACTO */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Mail size={18} />
            <span className="font-semibold">CONTACTO</span>
          </CardHeader>
          <Divider />
          <CardBody className="grid grid-cols-2 gap-4">
            <Input label="Correo Electrónico" />
            <Input label="Teléfono Móvil" />
          </CardBody>
        </Card>

        {/* UBICACIÓN */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <MapPin size={18} />
            <span className="font-semibold">UBICACIÓN</span>
          </CardHeader>
          <Divider />
          <CardBody className="grid grid-cols-2 gap-4">
            <Input label="Dirección" className="col-span-2" />

            <Input label="Departamento" />
            <Input label="Provincia" />

            <Input label="Distrito" />
          </CardBody>
        </Card>

        {/* CONTACTO EMERGENCIA */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Phone size={18} />
            <span className="font-semibold">CONTACTO DE EMERGENCIA</span>
          </CardHeader>
          <Divider />
          <CardBody className="grid grid-cols-2 gap-4">
            <Input label="Nombre" />
            <Input label="Teléfono" />

            <Input label="Parentesco" className="col-span-2" />
          </CardBody>
        </Card>

        {/* INFORMACIÓN LABORAL */}
        <Card className="md:col-span-2">
          <CardHeader className="flex items-center gap-2">
            <Briefcase size={18} />
            <span className="font-semibold">INFORMACIÓN LABORAL</span>
          </CardHeader>
          <Divider />
          <CardBody className="grid grid-cols-2 gap-4">
            <Input label="Cargo" />
            <Input label="Salario" />

            <Input label="Tipo de contrato" />
            <Input label="Tipo de jornada" />

            <Input label="Fecha de ingreso" className="col-span-2" />
          </CardBody>
        </Card>

        {/* DATOS BANCARIOS */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Landmark size={18} />
            <span className="font-semibold">DATOS BANCARIOS</span>
          </CardHeader>
          <Divider />
          <CardBody className="grid grid-cols-2 gap-4">
            <Input label="Banco" />
            <Input label="Número de cuenta" />

            <Input label="CCI" />
            <Input label="Tipo de cuenta" />
          </CardBody>
        </Card>

        {/* PENSIONES */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <HeartPulse size={18} />
            <span className="font-semibold">PENSIONES Y SALUD</span>
          </CardHeader>
          <Divider />
          <CardBody className="grid grid-cols-2 gap-4">
            <Input label="Sistema de pensiones" />
            <Input label="CUSPP" />

            <Input label="N° Essalud" className="col-span-2" />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
