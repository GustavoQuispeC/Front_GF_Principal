"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Checkbox,
  Input,
  Link,
  Divider,
} from "@heroui/react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const GoogleIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="20"
    viewBox="0 0 24 24"
    width="20"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const LoginModal = ({ isOpen, onOpenChange }: LoginModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
      classNames={{
        base: "border-[#11181C] border-t-4",
        header: "border-b-[1px] border-default-100",
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 pt-8 px-8">
              <h2 className="text-2xl font-bold text-black">
                Bienvenido de nuevo
              </h2>
              <p className="text-sm font-normal text-default-500">
                Ingresa tus credenciales para acceder a tu cuenta
              </p>
            </ModalHeader>
            <ModalBody className="pb-8 px-8">
              <form
                className="flex flex-col gap-5 mt-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  label="Correo electrónico"
                  labelPlacement="outside"
                  placeholder="ejemplo@correo.com"
                  variant="bordered"
                  startContent={<Mail size={18} className="text-default-400" />}
                  classNames={{
                    inputWrapper:
                      "h-12 group-data-[focus=true]:border-blue-600",
                    label: "text-black font-semibold",
                  }}
                />
                <Input
                  label="Contraseña"
                  labelPlacement="outside"
                  placeholder="••••••••"
                  variant="bordered"
                  startContent={<Lock size={18} className="text-default-400" />}
                  type={isVisible ? "text" : "password"}
                  classNames={{
                    inputWrapper:
                      "h-12 group-data-[focus=true]:border-blue-600",
                    label: "text-black font-semibold",
                  }}
                  endContent={
                    <button
                      type="button"
                      onClick={toggleVisibility}
                      className="focus:outline-none"
                    >
                      {isVisible ? (
                        <EyeOff size={20} className="text-default-400" />
                      ) : (
                        <Eye size={20} className="text-default-400" />
                      )}
                    </button>
                  }
                />
                <div className="flex justify-between items-center px-1">
                  <Checkbox
                    size="sm"
                    classNames={{
                      label: "text-xs text-default-600",
                      wrapper: "after:bg-orange-600",
                    }}
                  >
                    Recordarme
                  </Checkbox>
                  <Link
                    href="#"
                    size="sm"
                    className="text-blue-600 text-xs font-semibold hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Button
                  className="w-full bg-orange-600 text-white font-bold h-12 shadow-md hover:opacity-90"
                  type="submit"
                >
                  INGRESAR
                </Button>
              </form>
              <div className="flex items-center gap-4 py-4">
                <Divider className="flex-1" />
                <span className="text-tiny font-bold text-default-400">
                  O ENTRAR CON
                </span>
                <Divider className="flex-1" />
              </div>
              <Button
                variant="bordered"
                startContent={<GoogleIcon />}
                className="w-full border-default-200 text-black font-medium h-12 shadow-sm"
              >
                Google
              </Button>
              <div className="text-center mt-6">
                <p className="text-sm text-default-600">
                  ¿Aún no tienes cuenta?{" "}
                  <Link
                    href="#"
                    className="text-orange-600 font-bold hover:underline"
                    size="sm"
                  >
                    Crea una aquí
                  </Link>
                </p>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
