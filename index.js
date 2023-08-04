const express = require('express');
const app = express();

const { Configuration, OpenAIApi } = require("openai");

require('dotenv').config();
const cors = require('cors');

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(cors());

app.post('/convert', async (req, res) => {
    try {

        const { code, language } = req.body;

        const response = await openai.createCompletion({
            model: "gpt-3.5-turbo",
            prompt: `Convert this code: ${code} into ${language} language and also give the output, debug the code in case of error , if you find any error in the given code, debug it and suggest the correct code in the previous language, Evaluate the code on each parameter: code consistency,code performance, code documentation, error handling, code testability, code modularity, time complexity(in big O),space complexity(in big O),code duplication,code readability, also give percentage for each parameter`,
            temperature: 0,
            max_tokens: 3000,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        res.status(200).send(
            response.data.choices[0].text.split("\n\n")
        );

    }
    catch (error) {
        console.error(error)
    }
})

app.listen(7000, () => {
    console.log('Avishek AI server started on port 7000');
});