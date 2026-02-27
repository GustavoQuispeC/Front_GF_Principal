'use client';
import type {SVGProps} from "react";
import type {Selection, ChipProps, SortDescriptor} from "@heroui/react";

import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@heroui/react";
import { IEmpleadosListar } from "@/types/empleado";
import { EmpleadosListar } from "@/helpers/empleado.helper";

//! --- Tipos para los íconos SVG ---
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

//! --- Función para capitalizar la primera letra de una cadena ---
export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

//! --- Icono de más (+) ---
export const PlusIcon = ({size = 24, width, height, ...props}: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  );
};

//! --- Icono de tres puntos verticales ---
export const VerticalDotsIcon = ({size = 24, width, height, ...props}: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="currentColor"
      />
    </svg>
  );
};

//! ----Icono buscar---
export const SearchIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

//! --- Icono de flecha hacia abajo para dropdowns ---
export const ChevronDownIcon = ({strokeWidth = 1.5, ...otherProps}: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...otherProps}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

//! ----- Configuración de columnas, datos de ejemplo y opciones de estado para el datatable ---
export const columns = [
  {name: "Código", uid: "codigoEmpleado", sortable: true},
  {name: "NOMBRE", uid: "nombreCompleto", sortable: true},
  {name: "F. NACIMIENTO", uid: "fechaNacimiento"},
  {name: "EDAD", uid: "edad", sortable: true},
  {name: "CARGO", uid: "cargoActual", sortable: true},
  {name: "CORREO ELECTRÓNICO", uid: "correo"},
  {name: "ESTADO", uid: "isActive", sortable: true},
  {name: "ACCIONES", uid: "actions"},
];

//! Opciones de estado para el filtro
export const statusOptions = [
  {name: "Activo", uid: "true"},
  {name: "Inactivo", uid: "false"},
  // {name: "Vacaciones", uid: "vacation"},
];



//! ----- Mapeo de estado a colores para los chips de estado en la tabla ---
const statusColorMap: Record<string, ChipProps["color"]> = {
  true: "success",
  false: "danger",
  // vacation: "warning",
};

//! ----- Configuración de columnas, datos de ejemplo y opciones de estado para el datatable ---
const INITIAL_VISIBLE_COLUMNS = ["codigoEmpleado","nombreCompleto","fechaNacimiento","edad","cargoActual", "isActive", "actions"];



interface DatatableEmpleadosProps {
  onAddNew?: () => void;
}

//! ----- Componente principal del datatable de empleados -----
export default function DatatableEmpleados({ onAddNew }: DatatableEmpleadosProps) {
  const [empleados, setEmpleados] = useState<IEmpleadosListar[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] =useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS), 
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "edad",
    direction: "ascending",
  });

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  //! --- Función para filtrar los empleados según el valor de búsqueda y el filtro de estado ---
  const filteredItems = useMemo(() => {
    let filteredEmpleados = [...empleados];

    if (hasSearchFilter) {
      filteredEmpleados = filteredEmpleados.filter((empleados) =>
        empleados.nombreCompleto.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredEmpleados = filteredEmpleados.filter((empleados) =>
        Array.from(statusFilter).includes(empleados.isActive ? "true" : "false" ),
      );
    }

    return filteredEmpleados;
  }, [empleados , filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  //! ----- Función para ordenar los elementos según la columna y dirección de ordenamiento -----
  const sortedItems = useMemo(() => {
    return [...items].sort((a: IEmpleadosListar, b: IEmpleadosListar) => {
      const first = a[sortDescriptor.column as keyof IEmpleadosListar] as number;
      const second = b[sortDescriptor.column as keyof IEmpleadosListar] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  //! ----- Función para renderizar el contenido de cada celda según la columna -----
  const renderCell = React.useCallback((empleados: IEmpleadosListar, columnKey: React.Key) => {
    const cellValue = empleados[columnKey as keyof IEmpleadosListar];

    switch (columnKey) {
      case "nombreCompleto":
        return (
          <User
            avatarProps={{radius: "lg", src: empleados.fotoUrl || undefined}}
            description={empleados.correo}
            name={String(cellValue)}
          >
            {empleados.correo}
          </User>
        );
      case "cargoActual":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue ? String(cellValue) :"Sin cargo asignado"}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{empleados.cargoActual}</p>
          </div>
        );
      case "isActive":
        return (
          <Chip className="capitalize" color={statusColorMap[empleados.isActive ? "true" : "false"]} size="sm" variant="flat">
            {empleados.isActive ? "Activo" : "Inactivo"}
          </Chip>
        );
      case "actions":
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <VerticalDotsIcon className="text-default-300" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="view">Ver</DropdownItem>
              <DropdownItem key="edit">Editar</DropdownItem>
              <DropdownItem key="delete">Eliminar</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      default:
        return cellValue;
    }
  }, []);

  //! ----- Funciones para manejar la paginación, cambio de filas por página, búsqueda y limpieza de filtros -----
  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  // Función para manejar el cambio en el campo de búsqueda
  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Estado
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />} onPress={onAddNew}>
              Agregar Nuevo
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {empleados.length} empleados</span>
          <label className="flex items-center text-default-400 text-small">
            Fila por página:
            <select
            value={rowsPerPage}
              className="bg-transparent outline-solid outline-transparent text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    empleados.length,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos los elementos seleccionados"
            : `${selectedKeys.size} de ${filteredItems.length} seleccionados`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Anterior
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, empleados.length, page, pages, hasSearchFilter]);

  //! --- Funcion para obtener los empleados desde la API al montar el componente ---
  const fetchEmpleados = async ()=> {
    try {
      const empleadosData = await EmpleadosListar();
      setEmpleados(empleadosData);
    } catch (error) {
      console.error("Error al obtener los empleados:", error);

    }
  }
  //!montar el componente y obtener los empleados
  useEffect(() => {
    fetchEmpleados();
  }, []);

  return (
    <Table
      isHeaderSticky
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey) as React.ReactNode}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
