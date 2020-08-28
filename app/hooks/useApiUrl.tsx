const useApiUrl = (): string => {
  let url: string = process.env.API_URL!;
  return url;
};

export default useApiUrl;
