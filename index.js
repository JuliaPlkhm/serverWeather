const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(cors());

const fetchWeather = async ({ lat, lon }) => {
  const res = await axios(
    `https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${lon}&[lang=ru_RU]`,
    {
      headers: {
        "X-Yandex-API-Key": "fe70a1e6-71d9-47cb-b9b8-dcf7d9413f56",
        // "apikey": "d104022f-e6f6-4d01-8182-2d11337e478a",
        
      },
    }
  );
  console.log(res.data)
  return res.data;
};

app.get("/weather", async (req, res) => {
  const { lat, lon } = req.query;
  if (lat && typeof lat === "string" && lon && typeof lon === "string") {
    const data = await fetchWeather({ lat, lon });
    res.json(data);
  } else {
    res.status(400).json("wrong data input");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});