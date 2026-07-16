// const config = {
//   baseUrl: "https://food-hunt-server-psi.vercel.app/api/v1",
// };

// export default config;

const config = {
  baseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://dreams-tour-management-system-backe.vercel.app/api/v1",
};

export default config;
