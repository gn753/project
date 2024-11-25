import React, { createContext, useContext, useState, useEffect } from "react";
import getCategories from "@/api/getCategories";
import { CategoriesResponse } from "@/types/categories";
import { useAuth } from "@/context/AuthProvider";
interface CategoriesContextType {
  categories: { key: string; label: string }[] | null; // null 허용
  isLoading: boolean;
  error: string | null;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined
);

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth(); // AuthContext에서 로그인 상태 확인
  const [categories, setCategories] = useState<
    { key: string; label: string }[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onLoadCategories = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data: CategoriesResponse = await getCategories(); // 명시적 타입 지정
      const formattedCategories = Object.entries(data).map(([key, label]) => ({
        key,
        label,
      }));

      setCategories(formattedCategories);
    } catch (err) {
      setError("Failed to load categories");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      onLoadCategories(); // 로그인 상태가 확인된 이후에만 호출
    }
  }, [isAuthenticated]); // isAuthenticated 변경 시 다시 호출

  return (
    <CategoriesContext.Provider value={{ categories, isLoading, error }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
};
