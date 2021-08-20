import { useCallback, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

/**
 * custom hook to use for sending API req and
 * deal with loading state and error message
 * @returns {object} loading state, error messages, sendRequest fn
 */
export const useHttpClint = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  

  /**
   * send request to API using axios
   * @param method request METHOD
   * @param url url API Url
   * @param data provide data for POST
   *  */
  const sendReuest = useCallback(
    async ({ method, url, data }: AxiosRequestConfig) => {
      // reset errors and loading
      if (error) setError(null);
      if (isLoading) setIsLoading(false);

      if (url) {
        setIsLoading(true);

        try {
          const res = await axios({ method, url, data });

          if (res.status === 200) {
            setIsLoading(false);
            return res.data.items;
          } else {
            setIsLoading(false);
            return null;
          }
        } catch (err) {
          setIsLoading(false);
          setError(err.message);
          return null;
        }
      } else return null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { isLoading, error, sendReuest };
};
