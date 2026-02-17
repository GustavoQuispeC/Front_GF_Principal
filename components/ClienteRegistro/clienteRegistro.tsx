"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Select,
  SelectItem,
  Divider,
  Chip,
  Tooltip,
} from "@heroui/react";
import {
  User,
  FileText,
  Mail,
  Phone,
  CheckCircle2,
  Eraser,
  UserPlus,
  BadgeCheck,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";

enum TipoDocumento {
  DNI = "DNI",
  Pasaporte = "Pasaporte",
  RUC = "RUC",
  CE = "CE",
}

interface ClienteFormData {
  nombre: string;
  apellido: string;
  tipoDocumento: TipoDocumento | "";
  numeroDocumento: string;
  correo: string;
  telefono: string;
}

type FieldError = Partial<Record<keyof ClienteFormData, string>>;

const docRules: Record<
  Exclude<TipoDocumento, "">,
  { label: string; pattern: RegExp; hint: string; placeholder: string; maxLength: number }
> = {
  DNI: {
    label: "DNI",
    pattern: /^\d{8}$/,
    hint: "8 dígitos numéricos.",
    placeholder: "00000000",
    maxLength: 8,
  },
  RUC: {
    label: "RUC",
    pattern: /^\d{11}$/,
    hint: "11 dígitos numéricos.",
    placeholder: "00000000000",
    maxLength: 11,
  },
  CE: {
    label: "CE",
    pattern: /^[A-Za-z0-9]{6,12}$/,
    hint: "6 a 12 caracteres (letras/números).",
    placeholder: "A1234567",
    maxLength: 12,
  },
  Pasaporte: {
    label: "Pasaporte",
    pattern: /^[A-Za-z0-9]{6,12}$/,
    hint: "6 a 12 caracteres (letras/números).",
    placeholder: "XK123456",
    maxLength: 12,
  },
};

function normalizePhone(value: string) {
  // Mantiene + y dígitos, compacta espacios
  const cleaned = value.replace(/[^\d+ ]/g, "");
  return cleaned.replace(/\s+/g, " ").trim();
}

function validate(data: ClienteFormData): FieldError {
  const errors: FieldError = {};

  if (!data.nombre.trim()) errors.nombre = "El nombre es requerido.";
  if (!data.apellido.trim()) errors.apellido = "El apellido es requerido.";
  if (!data.tipoDocumento) errors.tipoDocumento = "Seleccione un tipo de documento.";

  const doc = data.numeroDocumento.trim();
  if (!doc) {
    errors.numeroDocumento = "Número requerido.";
  } else if (data.tipoDocumento) {
    const rule = docRules[data.tipoDocumento];
    if (rule && !rule.pattern.test(doc)) {
      errors.numeroDocumento = `Formato inválido. ${rule.hint}`;
    }
  }

  if (data.correo.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo.trim())) {
    errors.correo = "Correo inválido.";
  }

  // Teléfono opcional, pero si se escribe: min 7 dígitos
  const phoneDigits = data.telefono.replace(/[^\d]/g, "");
  if (data.telefono.trim() && phoneDigits.length < 7) {
    errors.telefono = "Teléfono muy corto.";
  }

  return errors;
}

export default function ClienteRegistro() {
  const [form, setForm] = useState<ClienteFormData>({
    nombre: "",
    apellido: "",
    tipoDocumento: "",
    numeroDocumento: "",
    correo: "",
    telefono: "",
  });

  const [errors, setErrors] = useState<FieldError>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ClienteFormData, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const rule = form.tipoDocumento ? docRules[form.tipoDocumento] : null;

  const liveErrors = useMemo(() => validate(form), [form]);
  const isFormValid = useMemo(() => Object.keys(liveErrors).length === 0, [liveErrors]);

  const handleChange = (field: keyof ClienteFormData, value: string) => {
    // Normalizaciones suaves
    if (field === "numeroDocumento") value = value.trim().toUpperCase();
    if (field === "telefono") value = normalizePhone(value);

    setForm((prev) => ({ ...prev, [field]: value }));

    // Limpia error si ya corrige
    if (errors[field]) {
      const next = validate({ ...form, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: next[field] }));
    }
  };

  const markTouched = (field: keyof ClienteFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    // al blur, muestra error real
    const next = validate(form);
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  };

  const handleSubmit = async () => {
    const validationErrors = validate(form);
    setErrors(validationErrors);
    setTouched({
      nombre: true,
      apellido: true,
      tipoDocumento: true,
      numeroDocumento: true,
      correo: true,
      telefono: true,
    });

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
  };

  const handleReset = () => {
    setForm({
      nombre: "",
      apellido: "",
      tipoDocumento: "",
      numeroDocumento: "",
      correo: "",
      telefono: "",
    });
    setErrors({});
    setTouched({});
    setSuccess(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black px-4 py-10">
        <Card className="w-full max-w-md border-none shadow-2xl bg-white dark:bg-zinc-900 overflow-hidden rounded-[2rem]">
          {/* Brand bar */}
          <div className="h-2 bg-gradient-to-r from-orange-500 via-blue-600 to-zinc-900 dark:to-black" />

          <CardBody className="flex flex-col items-center gap-6 py-12 px-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 rounded-full blur-xl opacity-20 animate-pulse" />
              <div className="relative w-24 h-24 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center border-4 border-white/80 dark:border-zinc-800 shadow-lg">
                <CheckCircle2 className="w-12 h-12 text-orange-600" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Cliente registrado</h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                <span className="font-bold text-zinc-900 dark:text-white">
                  {form.nombre} {form.apellido}
                </span>{" "}
                fue creado correctamente en el ecommerce.
              </p>
            </div>

            <div className="w-full grid grid-cols-2 gap-3 text-left">
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-950/30">
                <div className="text-xs uppercase tracking-widest text-zinc-500">Documento</div>
                <div className="font-bold text-zinc-900 dark:text-white">
                  {form.tipoDocumento} · {form.numeroDocumento}
                </div>
              </div>
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-950/30">
                <div className="text-xs uppercase tracking-widest text-zinc-500">Contacto</div>
                <div className="font-bold text-zinc-900 dark:text-white truncate">
                  {form.correo || "—"}{" "}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 truncate">
                  {form.telefono || "—"}
                </div>
              </div>
            </div>

            <Button
              onPress={handleReset}
              className="w-full bg-zinc-900 dark:bg-white dark:text-black text-white font-black h-12 rounded-2xl"
            >
              Nuevo registro
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <Card className="border-none shadow-[0_30px_80px_rgba(0,0,0,0.12)] bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden">
          {/* Brand bar */}
          <div className="h-2 bg-gradient-to-r from-orange-500 via-blue-600 to-zinc-900 dark:to-black" />

          <CardHeader className="flex flex-col items-start px-6 sm:px-10 pt-8 pb-4">
            <div className="flex justify-between w-full items-start gap-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
                    Registro de Cliente
                  </h1>
                  <Chip
                    variant="shadow"
                    color="warning"
                    size="sm"
                    className="font-black text-white uppercase px-2"
                  >
                    Ecom v2
                  </Chip>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 font-medium max-w-xl">
                  Crea clientes para facturación, envíos y comunicaciones del ecommerce. Paleta corporativa:{" "}
                  <span className="font-bold text-orange-600">naranja</span>,{" "}
                  <span className="font-bold text-blue-600">azul</span> y{" "}
                  <span className="font-bold text-zinc-900 dark:text-white">negro</span>.
                </p>
              </div>

              <div className="hidden md:flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                  <UserPlus className="text-orange-600 w-6 h-6" />
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <ShieldCheck className="text-blue-600 w-6 h-6" />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardBody className="px-6 sm:px-10 pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              {/* Left */}
              <div className="lg:col-span-7 space-y-8">
                {/* Identidad */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-black text-xs uppercase tracking-[0.25em] text-zinc-500">
                      Identidad del cliente
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Nombre"
                      placeholder="Ej: Carlos"
                      labelPlacement="outside"
                      value={form.nombre}
                      onValueChange={(v) => handleChange("nombre", v)}
                      onBlur={() => markTouched("nombre")}
                      isInvalid={!!(touched.nombre && (errors.nombre ?? liveErrors.nombre))}
                      errorMessage={touched.nombre ? (errors.nombre ?? liveErrors.nombre) : undefined}
                      variant="faded"
                      radius="lg"
                      className="font-medium"
                      startContent={<User className="w-4 h-4 text-zinc-400" />}
                    />
                    <Input
                      label="Apellido"
                      placeholder="Ej: Pérez"
                      labelPlacement="outside"
                      value={form.apellido}
                      onValueChange={(v) => handleChange("apellido", v)}
                      onBlur={() => markTouched("apellido")}
                      isInvalid={!!(touched.apellido && (errors.apellido ?? liveErrors.apellido))}
                      errorMessage={touched.apellido ? (errors.apellido ?? liveErrors.apellido) : undefined}
                      variant="faded"
                      radius="lg"
                      className="font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                    <div className="sm:col-span-2">
                      <Select
                        label="Tipo de documento"
                        labelPlacement="outside"
                        placeholder="Selecciona"
                        selectedKeys={form.tipoDocumento ? [form.tipoDocumento] : []}
                        onSelectionChange={(keys) => {
                          const next = Array.from(keys)[0] as string;
                          handleChange("tipoDocumento", next);
                          // si cambia tipo, limpia número para evitar confusión
                          setForm((p) => ({ ...p, tipoDocumento: next as any, numeroDocumento: "" }));
                          setTouched((t) => ({ ...t, tipoDocumento: true, numeroDocumento: false }));
                        }}
                        onClose={() => markTouched("tipoDocumento")}
                        variant="faded"
                        radius="lg"
                        isInvalid={!!(touched.tipoDocumento && (errors.tipoDocumento ?? liveErrors.tipoDocumento))}
                        errorMessage={
                          touched.tipoDocumento ? (errors.tipoDocumento ?? liveErrors.tipoDocumento) : undefined
                        }
                      >
                        {Object.values(TipoDocumento).map((t) => (
                          <SelectItem key={t}>{t}</SelectItem>
                        ))}
                      </Select>
                    </div>

                    <div className="sm:col-span-3">
                      <Input
                        label="Número de documento"
                        labelPlacement="outside"
                        placeholder={rule?.placeholder ?? "Ingresa el número"}
                        value={form.numeroDocumento}
                        maxLength={rule?.maxLength}
                        onValueChange={(v) => handleChange("numeroDocumento", v)}
                        onBlur={() => markTouched("numeroDocumento")}
                        isInvalid={
                          !!(touched.numeroDocumento && (errors.numeroDocumento ?? liveErrors.numeroDocumento))
                        }
                        errorMessage={
                          touched.numeroDocumento ? (errors.numeroDocumento ?? liveErrors.numeroDocumento) : undefined
                        }
                        variant="faded"
                        radius="lg"
                        startContent={<FileText className="w-4 h-4 text-zinc-400" />}
                        endContent={
                          <Tooltip
                            content={
                              <div className="max-w-[220px] text-xs">
                                {form.tipoDocumento ? (
                                  <>
                                    <div className="font-bold mb-1">{form.tipoDocumento}</div>
                                    <div className="text-zinc-200/90">{docRules[form.tipoDocumento].hint}</div>
                                  </>
                                ) : (
                                  "Selecciona un tipo de documento para ver la regla."
                                )}
                              </div>
                            }
                          >
                            <span className="cursor-help text-zinc-400">
                              <HelpCircle className="w-4 h-4" />
                            </span>
                          </Tooltip>
                        }
                      />
                      {form.tipoDocumento && (
                        <div className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                          Regla: <span className="font-semibold">{docRules[form.tipoDocumento].hint}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Divider className="opacity-60" />

                {/* Contacto */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-900/30">
                      <Phone className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="font-black text-xs uppercase tracking-[0.25em] text-zinc-500">
                      Canales de contacto
                    </span>
                  </div>

                  <Input
                    label="Correo"
                    labelPlacement="outside"
                    placeholder="email@ejemplo.com"
                    value={form.correo}
                    onValueChange={(v) => handleChange("correo", v)}
                    onBlur={() => markTouched("correo")}
                    isInvalid={!!(touched.correo && (errors.correo ?? liveErrors.correo))}
                    errorMessage={touched.correo ? (errors.correo ?? liveErrors.correo) : undefined}
                    variant="faded"
                    radius="lg"
                    startContent={<Mail className="w-4 h-4 text-zinc-400" />}
                  />

                  <Input
                    label="Teléfono"
                    labelPlacement="outside"
                    placeholder="+51 900 000 000"
                    value={form.telefono}
                    onValueChange={(v) => handleChange("telefono", v)}
                    onBlur={() => markTouched("telefono")}
                    isInvalid={!!(touched.telefono && (errors.telefono ?? liveErrors.telefono))}
                    errorMessage={touched.telefono ? (errors.telefono ?? liveErrors.telefono) : undefined}
                    variant="faded"
                    radius="lg"
                    startContent={<Phone className="w-4 h-4 text-zinc-400" />}
                  />
                </div>
              </div>

              {/* Right */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Verificación */}
                <div className="bg-zinc-50 dark:bg-zinc-950/30 p-6 rounded-[2rem] space-y-4 border border-zinc-200/70 dark:border-zinc-800">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-black">
                      <BadgeCheck className="w-5 h-5 text-blue-600" />
                      Verificación rápida
                    </div>
                    <Chip
                      size="sm"
                      className="bg-blue-600 text-white font-black"
                      radius="lg"
                    >
                      Recomendado
                    </Chip>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Revisa que el documento sea correcto para evitar rechazos en facturación electrónica y problemas de despacho.
                  </p>

                  <ul className="space-y-2">
                    {[
                      "Documento según tipo seleccionado",
                      "Correo con formato válido",
                      "Teléfono con dígitos suficientes",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600" /> {item}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500 dark:text-zinc-400">Estado</span>
                      <span className={`font-black ${isFormValid ? "text-green-600" : "text-orange-600"}`}>
                        {isFormValid ? "Listo para registrar" : "Pendiente de completar"}
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-600 via-blue-600 to-zinc-900"
                        style={{
                          width: `${Math.min(
                            100,
                            ([
                              !!form.nombre.trim(),
                              !!form.apellido.trim(),
                              !!form.tipoDocumento,
                              !!form.numeroDocumento.trim(),
                              !liveErrors.correo,
                              !liveErrors.telefono,
                            ].filter(Boolean).length /
                              6) *
                              100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Resumen */}
                <div className="p-6 rounded-[2rem] border border-zinc-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                  <div className="flex items-center justify-between">
                    <div className="text-zinc-900 dark:text-white font-black">Resumen</div>
                    <Chip size="sm" className="bg-zinc-900 text-white dark:bg-white dark:text-black font-black">
                      Preview
                    </Chip>
                  </div>

                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-zinc-500 dark:text-zinc-400">Cliente</span>
                      <span className="font-bold text-zinc-900 dark:text-white truncate">
                        {form.nombre || "—"} {form.apellido || ""}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-zinc-500 dark:text-zinc-400">Documento</span>
                      <span className="font-bold text-zinc-900 dark:text-white truncate">
                        {form.tipoDocumento ? `${form.tipoDocumento} · ${form.numeroDocumento || "—"}` : "—"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-zinc-500 dark:text-zinc-400">Correo</span>
                      <span className="font-bold text-zinc-900 dark:text-white truncate">
                        {form.correo || "—"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-zinc-500 dark:text-zinc-400">Teléfono</span>
                      <span className="font-bold text-zinc-900 dark:text-white truncate">
                        {form.telefono || "—"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    onPress={handleSubmit}
                    isLoading={loading}
                    isDisabled={!isFormValid || loading}
                    className={[
                      "w-full h-14 sm:h-16 rounded-2xl text-base sm:text-lg font-black transition-all duration-300",
                      "bg-orange-600 hover:bg-orange-700 text-white",
                      "shadow-[0_12px_35px_rgba(234,88,12,0.35)]",
                      "disabled:opacity-60 disabled:cursor-not-allowed",
                    ].join(" ")}
                  >
                    {loading ? "Sincronizando..." : "CREAR CLIENTE"}
                  </Button>

                  <Button
                    variant="light"
                    onPress={handleReset}
                    className="w-full text-zinc-500 dark:text-zinc-400 hover:text-red-500 font-black"
                    startContent={<Eraser className="w-4 h-4" />}
                  >
                    Limpiar formulario
                  </Button>

                  <div className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500 pt-2">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Secure Data Entry
                    </span>
                    <span className="h-3 w-px bg-zinc-300 dark:bg-zinc-700" />
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" /> Cloud Sync Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
