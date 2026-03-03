import {
  DatatableEmpleados,
  DatatableUsuarios,
  RegistrarEmpleados,
  CrearUsuario,
} from "@/components";

export const COMPONENT_MAP: Record<string, React.ReactNode> = {
  //! Menu empleados
  Empleados: <DatatableEmpleados />,
  RegistrarEmpleados: <RegistrarEmpleados />,

  //! Menu usuarios
  Usuarios: <DatatableUsuarios />,
  CrearUsuario: <CrearUsuario />,

  Inicio: (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bienvenido al Dashboard</h1>
    </div>
  ),
  
};
