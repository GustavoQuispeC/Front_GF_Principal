import {
  DatatableEmpleados,
  DatatableUsuarios,
  RegistrarEmpleados,
  CrearUsuario,
} from "@/components";

export const COMPONENT_MAP: Record<string, React.ReactNode> = {
  Empleados: <DatatableEmpleados />,
  Usuarios: <DatatableUsuarios />,

  RegistrarEmpleados: <RegistrarEmpleados />,
  CrearUsuario: <CrearUsuario />,

  Inicio: (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bienvenido al Dashboard</h1>
    </div>
  ),
  // Puedes seguir agregando más aquí
};
