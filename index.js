const express = require("express");
const axios = require("axios");
const cors = require("cors");
const http = require("http");
const app = express();
const port = 4000;

app.use(cors());

const fetchWeather = async ({ lat, lon }) => {
  const res = await axios(
    `https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${lon}&[lang=ru_RU]`,
    {
      headers: {
        "X-Yandex-API-Key": "dc30a81d-aa9f-4cf3-82e3-3b7aec78dbd0",
        
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

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at ${port}`);
});

setInterval(function () {
    http.get("https://server-weather-api.herokuapp.com/");
  }, 300000);