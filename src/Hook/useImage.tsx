import { useState, useEffect } from 'react';



const useImage = (apiUrl: string) => {
  const [data, setData] = useState<[]>([]);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError("error while loading data try again");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return { data, error, isLoading };
};

export default useImage;