const whitelist = [
  "https://www.mysite.com",
  "http://127.0.0.1:5500",
  "https://www.google.com",
];
const corsOptions = {
  origin: (origin, calback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      calback(null, true);
    } else {
      calback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

modules.exports = corsOptions;
