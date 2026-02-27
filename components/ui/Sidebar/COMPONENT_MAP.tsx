import { DatatableEmpleados, DatatableUsuarios } from "@/components";
import RegistroCliente from "@/components/Cliente/RegistroCliente/registroCliente";


export  const COMPONENT_MAP: Record<string, React.ReactNode> = {
  "Empleados": <DatatableEmpleados />,
  "Usuarios": <DatatableUsuarios />,
  
  "ClienteRegistro": <RegistroCliente />,
  "Inicio": (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bienvenido al Dashboard</h1>
    </div>
  ),
  // Puedes seguir agregando más aquí
};