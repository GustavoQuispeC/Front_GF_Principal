import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";


// Carpetas disponibles en Firebase Storage
export type StorageFolder = "empleados" | "productos";

interface UploadResult {
  url: string;
  path: string; // útil si luego necesitas eliminar el archivo
}

interface UseFirebaseStorageReturn {
  uploading: boolean;
  progress: number; // 0 - 100
  error: string | null;
  uploadFile: (file: File, folder: StorageFolder) => Promise<UploadResult | null>;
  deleteFile: (path: string) => Promise<boolean>;
}

export function useFirebaseStorage(): UseFirebaseStorageReturn {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  /**
   * Sube un archivo a Firebase Storage
   * @param file  - Archivo a subir
   * @param folder - Carpeta destino: "empleados" | "productos"
   * @returns { url, path } o null si falla
   */
  const uploadFile = (file: File, folder: StorageFolder): Promise<UploadResult | null> => {
    return new Promise((resolve) => {
      setUploading(true);
      setProgress(0);
      setError(null);

      // Nombre único: timestamp + nombre original
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `${folder}/${fileName}`;
      const storageRef = ref(storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(pct);
        },
        (err) => {
          console.error("Error al subir archivo:", err);
          setError("Error al subir la imagen. Intenta de nuevo.");
          setUploading(false);
          resolve(null);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setUploading(false);
          setProgress(100);
          resolve({ url, path: filePath });
        }
      );
    });
  };

  /**
   * Elimina un archivo de Firebase Storage por su path
   * @param path - Ej: "empleados/1234567890_foto.jpg"
   */
  const deleteFile = async (path: string): Promise<boolean> => {
    try {
      const fileRef = ref(storage, path);
      await deleteObject(fileRef);
      return true;
    } catch (err) {
      console.error("Error al eliminar archivo:", err);
      return false;
    }
  };

  return { uploading, progress, error, uploadFile, deleteFile };
}